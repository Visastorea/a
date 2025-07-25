import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function SuccessForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-shadow border-0 text-center">
        <CardContent className="p-12">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Pedido Enviado com Sucesso!
            </h1>
            <p className="text-gray-600 text-lg">
              Seu formulário de e-Visa foi recebido pela VisaStore
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-start space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Próximos Passos</h3>
                <p className="text-blue-800 text-sm mt-1">
                  Nossa equipe especializada irá revisar cuidadosamente todos os seus dados para garantir que seu pedido oficial seja enviado ao governo indiano com perfeição, sem erros que possam causar rejeição.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-blue-700">
              <p>• <strong>Revisão técnica:</strong> 1-2 dias úteis</p>
              <p>• <strong>Envio oficial:</strong> Após aprovação da revisão</p>
              <p>• <strong>Processamento governamental:</strong> 3-5 dias úteis</p>
              <p>• <strong>Resposta final:</strong> Por e-mail</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Importante:</strong> Não faça nenhuma reserva de passagem até receber a confirmação de aprovação do seu e-Visa.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>suporte@visastore.tur.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>WhatsApp: (11) 99999-9999</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link to={createPageUrl("Applications")}>
              <Button className="bg-orange-500 hover:bg-orange-600 w-full">
                Acompanhar Meus Pedidos
              </Button>
            </Link>
            <Link to={createPageUrl("VisaForm")}>
              <Button variant="outline" className="w-full">
                Fazer Novo Pedido
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}