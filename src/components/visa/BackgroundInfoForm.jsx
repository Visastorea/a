import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield } from "lucide-react";

export default function BackgroundInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("background_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Informações Adicionais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="profession" className="text-sm font-medium text-gray-700">
              Profissão *
            </Label>
            <Input
              id="profession"
              value={data.profession || ""}
              onChange={(e) => handleInputChange("profession", e.target.value)}
              placeholder="Sua profissão atual"
              className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employer" className="text-sm font-medium text-gray-700">
              Empregador *
            </Label>
            <Input
              id="employer"
              value={data.employer || ""}
              onChange={(e) => handleInputChange("employer", e.target.value)}
              placeholder="Nome da empresa/organização"
              className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já visitou a Índia anteriormente? *
            </Label>
            <RadioGroup
              value={data.previous_visit_to_india?.toString() || ""}
              onValueChange={(value) => handleInputChange("previous_visit_to_india", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="previous-visit-yes" />
                <Label htmlFor="previous-visit-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="previous-visit-no" />
                <Label htmlFor="previous-visit-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já teve algum visto rejeitado por qualquer país? *
            </Label>
            <RadioGroup
              value={data.previous_visa_rejected?.toString() || ""}
              onValueChange={(value) => handleInputChange("previous_visa_rejected", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="visa-rejected-yes" />
                <Label htmlFor="visa-rejected-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="visa-rejected-no" />
                <Label htmlFor="visa-rejected-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você possui alguma condenação criminal? *
            </Label>
            <RadioGroup
              value={data.criminal_conviction?.toString() || ""}
              onValueChange={(value) => handleInputChange("criminal_conviction", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="criminal-yes" />
                <Label htmlFor="criminal-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="criminal-no" />
                <Label htmlFor="criminal-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Importante:</strong> Todas as informações devem ser verdadeiras e precisas. 
            Informações falsas podem resultar na rejeição do visto e impedimento de futuras aplicações.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}