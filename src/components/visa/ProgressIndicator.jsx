import React from "react";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, name: "Dados Pessoais", description: "Informações básicas" },
  { id: 2, name: "Pais", description: "Informações dos pais" },
  { id: 3, name: "Endereço", description: "Endereço atual" },
  { id: 4, name: "Passaporte", description: "Detalhes do passaporte" },
  { id: 5, name: "Profissão", description: "Detalhes profissionais" },
  { id: 6, name: "Visto", description: "Detalhes do visto" },
  { id: 7, name: "Histórico", description: "Visitas anteriores" },
  { id: 8, name: "Outros", description: "Informações adicionais" },
  { id: 9, name: "Referências", description: "Contatos de referência" },
  { id: 10, name: "Documentos", description: "Upload de arquivos" },
  { id: 11, name: "Revisão", description: "Confirmar dados" }
];

export default function ProgressIndicator({ currentStep, onStepClick, completedSteps = [] }) {
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'available';
    return 'locked';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return "bg-green-500 text-white border-green-500";
      case 'current':
        return "bg-orange-500 text-white border-orange-500";
      case 'available':
        return "bg-blue-100 text-blue-600 border-blue-300 hover:bg-blue-200 cursor-pointer";
      case 'locked':
        return "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  const handleStepClick = (stepId) => {
    const status = getStepStatus(stepId);
    if (status === 'available' || status === 'completed' || status === 'current') {
      onStepClick && onStepClick(stepId);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl card-shadow p-6 mb-8">
      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isClickable = ['available', 'completed', 'current'].includes(status);
          
          return (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${getStepColor(status)}`}
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : status === 'locked' ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </Button>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${
                    status === 'current' ? "text-orange-600" : 
                    status === 'completed' ? "text-green-600" : 
                    status === 'available' ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-4 sm:w-8 mx-1 sm:mx-2 transition-all duration-300 ${
                    status === 'completed' || (status === 'current' && index < currentStep - 1) 
                      ? "bg-green-500" 
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Etapa {currentStep} de {steps.length} • Clique nas etapas já preenchidas para navegar
        </p>
      </div>
    </div>
  );
}