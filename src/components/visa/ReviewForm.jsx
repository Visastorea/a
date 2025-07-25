
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function ReviewForm({ formData }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const getStatusBadge = (value) => {
    if (value === true) return <Badge className="bg-green-100 text-green-800">Sim</Badge>;
    if (value === false) return <Badge className="bg-gray-100 text-gray-800">Não</Badge>;
    return <Badge variant="outline">Não informado</Badge>;
  };

  const sections = [
    {
      title: "Dados Pessoais",
      icon: CheckCircle,
      color: "orange",
      data: formData.personal_info || {},
      fields: [
        { key: "full_name", label: "Nome Completo" },
        { key: "date_of_birth", label: "Data de Nascimento", format: formatDate },
        { key: "place_of_birth", label: "Local de Nascimento" },
        { key: "nationality", label: "Nacionalidade" },
        { key: "gender", label: "Gênero" },
        { key: "marital_status", label: "Estado Civil" },
        { key: "father_name", label: "Nome do Pai" },
        { key: "mother_name", label: "Nome da Mãe" }
      ]
    },
    {
      title: "Passaporte",
      icon: CheckCircle,
      color: "blue",
      data: formData.passport_info || {},
      fields: [
        { key: "passport_number", label: "Número do Passaporte" },
        { key: "passport_type", label: "Tipo de Passaporte" },
        { key: "issue_date", label: "Data de Emissão", format: formatDate },
        { key: "expiry_date", label: "Data de Expiração", format: formatDate },
        { key: "place_of_issue", label: "Local de Emissão" },
        { key: "issuing_authority", label: "Autoridade Emissora" }
      ]
    },
    {
      title: "Contato",
      icon: CheckCircle,
      color: "green",
      data: formData.contact_info || {},
      fields: [
        { key: "email", label: "Email" },
        { key: "phone", label: "Telefone" },
        { key: "address", label: "Endereço" },
        { key: "city", label: "Cidade" },
        { key: "state_province", label: "Estado/Província" },
        { key: "postal_code", label: "CEP" },
        { key: "country", label: "País" }
      ]
    },
    {
      title: "Viagem",
      icon: CheckCircle,
      color: "purple",
      data: formData.travel_info || {},
      fields: [
        { key: "visa_type", label: "Tipo de Visto" },
        { key: "port_of_arrival", label: "Porto de Chegada" },
        { key: "expected_arrival_date", label: "Data de Chegada", format: formatDate },
        { key: "expected_departure_date", label: "Data de Partida", format: formatDate },
        { key: "purpose_of_visit", label: "Propósito da Visita" },
        { key: "cities_to_visit", label: "Cidades a Visitar" },
        { key: "accommodation_details", label: "Detalhes da Acomodação" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="card-shadow border-0">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Revisão Final</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Verificação Final</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Por favor, revise todas as informações antes de enviar. 
                  Certifique-se de que todos os dados estão corretos e completos.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="border rounded-lg overflow-hidden">
                <div className={`bg-${section.color}-500 text-white px-4 py-3`}>
                  <h3 className="font-medium flex items-center space-x-2">
                    <section.icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.key} className="space-y-1">
                        <Label className="text-sm font-medium text-gray-600">
                          {field.label}
                        </Label>
                        <p className="text-sm text-gray-900">
                          {field.format 
                            ? field.format(section.data[field.key])
                            : section.data[field.key] || "Não informado"
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Background Information */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-red-500 text-white px-4 py-3">
                <h3 className="font-medium">Informações Adicionais</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Profissão</Label>
                    <p className="text-sm text-gray-900">
                      {formData.background_info?.profession || "Não informado"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Empregador</Label>
                    <p className="text-sm text-gray-900">
                      {formData.background_info?.employer || "Não informado"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Visitou a Índia antes?</Label>
                    {getStatusBadge(formData.background_info?.previous_visit_to_india)}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Visto rejeitado antes?</Label>
                    {getStatusBadge(formData.background_info?.previous_visa_rejected)}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Condenação criminal?</Label>
                    {getStatusBadge(formData.background_info?.criminal_conviction)}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-indigo-500 text-white px-4 py-3">
                <h3 className="font-medium">Documentos</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Foto do Requerente</Label>
                    {formData.documents?.photo_url ? (
                      <Badge className="bg-green-100 text-green-800">✓ Enviada</Badge>
                    ) : (
                      <Badge variant="destructive">✗ Não enviada</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-600">Cópia do Passaporte</Label>
                    {formData.documents?.passport_copy_url ? (
                      <Badge className="bg-green-100 text-green-800">✓ Enviada</Badge>
                    ) : (
                      <Badge variant="destructive">✗ Não enviada</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
