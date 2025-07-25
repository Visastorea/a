import React, { useState, useEffect, useCallback } from "react";
import { VisaApplication } from "@/api/entities";
import { User } from "@/api/entities";
import { SendEmail } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save, Send, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { debounce } from "lodash";

import ProgressIndicator from "../components/visa/ProgressIndicator";
import PersonalInfoForm from "../components/visa/PersonalInfoForm";
import ParentsInfoForm from "../components/visa/ParentsInfoForm";
import AddressInfoForm from "../components/visa/AddressInfoForm";
import PassportInfoForm from "../components/visa/PassportInfoForm";
import ProfessionDetailsForm from "../components/visa/ProfessionDetailsForm";
import VisaDetailsForm from "../components/visa/VisaDetailsForm";
import PreviousVisaForm from "../components/visa/PreviousVisaForm";
import OtherInfoForm from "../components/visa/OtherInfoForm";
import ReferencesForm from "../components/visa/ReferencesForm";
import DocumentUpload from "../components/visa/DocumentUpload";
import ReviewForm from "../components/visa/ReviewForm";
import SuccessForm from "../components/visa/SuccessForm";
import HelpChatbot from "../components/visa/HelpChatbot";

export default function VisaForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [formData, setFormData] = useState({
    personal_info: {},
    parents_info: {},
    present_address: {},
    passport_info: {},
    profession_details: {},
    applicant_details: {},
    previous_visa_info: {},
    other_info: {},
    reference_india: {},
    reference_own_country: {},
    documents: {},
    application_status: "draft"
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [user, setUser] = useState(null);

  const saveDraft = async (data) => {
    try {
      if (applicationId) {
        await VisaApplication.update(applicationId, data);
      } else {
        const newApplication = await VisaApplication.create(data);
        setApplicationId(newApplication.id);
      }
      toast({
        title: "Rascunho salvo!",
        description: "Seu progresso foi salvo com sucesso.",
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao salvar rascunho:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seu progresso. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const debouncedSave = useCallback(debounce(saveDraft, 2000), [applicationId]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const userData = await User.me();
        setUser(userData);

        const drafts = await VisaApplication.filter({
          created_by: userData.email,
          application_status: "draft"
        }, "-created_date", 1);

        if (drafts.length > 0) {
          const draft = drafts[0];
          setFormData(draft);
          setApplicationId(draft.id);
          toast({
            title: "Rascunho recuperado!",
            description: "Continuamos de onde você parou.",
          });
        } else {
          setFormData(prev => ({
            ...prev,
            present_address: { ...prev.present_address, email: userData.email }
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar",
          description: "Houve um problema ao carregar os dados.",
          variant: "destructive",
        });
      }
      setLoading(false);
    };
    loadData();
  }, [toast]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      debouncedSave(formData);
    }
  }, [formData, debouncedSave]);

  const updateFormData = (section, newData) => {
    setFormData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const nextStep = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatApplicationForEmail = (data) => {
    return `
    NOVO PEDIDO DE E-VISA PARA ÍNDIA
    
    DADOS PESSOAIS:
    Nome: ${data.personal_info?.given_name || 'N/A'} ${data.personal_info?.surname || 'N/A'}
    Data de Nascimento: ${data.personal_info?.date_of_birth || 'N/A'}
    Nacionalidade: ${data.personal_info?.citizenship || 'N/A'}
    
    CONTATO:
    Email: ${data.present_address?.email || 'N/A'}
    Telefone: ${data.present_address?.mobile || 'N/A'}
    
    PASSAPORTE:
    Número: ${data.passport_info?.passport_number || 'N/A'}
    Validade: ${data.passport_info?.date_of_expiry || 'N/A'}
    
    VIAGEM:
    Tipo de Visto: ${data.applicant_details?.visa_type || 'N/A'}
    Data de Chegada: ${data.applicant_details?.expected_date_of_arrival || 'N/A'}
    Data de Saída: ${data.applicant_details?.expected_date_of_departure || 'N/A'}
    
    Status: Aguardando revisão
    Data do Pedido: ${new Date().toLocaleString('pt-BR')}
    `;
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    toast({ title: "Enviando seu pedido...", description: "Por favor, aguarde." });

    const finalData = { ...formData, application_status: "submitted" };

    try {
      if (applicationId) {
        await VisaApplication.update(applicationId, finalData);
      } else {
        const newApp = await VisaApplication.create(finalData);
        setApplicationId(newApp.id);
      }
      
      const emailBody = formatApplicationForEmail(finalData);
      
      await SendEmail({
        to: "suporte@visastore.tur.br",
        subject: `Novo Pedido de e-Visa Índia - Cliente: ${finalData.personal_info.given_name || 'N/A'}`,
        body: emailBody
      });
      
      toast({
        title: "Pedido enviado com sucesso!",
        description: "Seu pedido foi recebido e será processado pela nossa equipe.",
        variant: "success",
      });
      
      setCurrentStep(12);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      toast({
        title: "Erro no envio",
        description: "Houve um problema ao enviar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm data={formData.personal_info} onChange={updateFormData} />;
      case 2:
        return <ParentsInfoForm data={formData.parents_info} onChange={updateFormData} />;
      case 3:
        return <AddressInfoForm data={formData.present_address} onChange={updateFormData} />;
      case 4:
        return <PassportInfoForm data={formData.passport_info} onChange={updateFormData} expectedArrivalDate={formData.applicant_details?.expected_date_of_arrival} />;
      case 5:
        return <ProfessionDetailsForm data={formData.profession_details} onChange={updateFormData} />;
      case 6:
        return <VisaDetailsForm data={formData.applicant_details} onChange={updateFormData} />;
      case 7:
        return <PreviousVisaForm data={formData.previous_visa_info} onChange={updateFormData} />;
      case 8:
        return <OtherInfoForm data={formData.other_info} onChange={updateFormData} />;
      case 9:
        return <ReferencesForm data={formData} onChange={updateFormData} />;
      case 10:
        return <DocumentUpload data={formData.documents} onChange={updateFormData} />;
      case 11:
        return <ReviewForm formData={formData} />;
      case 12:
        return <SuccessForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Formulário de e-Visa para Índia
          </h1>
          <p className="text-gray-600">
            Preencha com atenção para garantir que seu visto seja processado sem problemas.
          </p>
        </div>

        {currentStep <= 11 && <ProgressIndicator currentStep={currentStep} />}
        <div className="mb-8">{renderCurrentForm()}</div>

        {currentStep <= 11 && (
          <div className="flex justify-between items-center bg-white rounded-xl card-shadow p-6">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" /> <span>Anterior</span>
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4">
               {currentStep < 11 ? (
                <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600 flex items-center space-x-2">
                  <span>Próximo</span> <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={submitApplication} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> <span>Enviar Pedido</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {currentStep <= 11 && (
        <Button
          onClick={() => setIsHelpOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <LifeBuoy className="w-7 h-7" />
        </Button>
      )}
      
      {currentStep <= 11 && <HelpChatbot isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
}