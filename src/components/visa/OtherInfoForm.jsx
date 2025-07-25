import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function OtherInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("other_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Outras Informações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já serviu nas forças armadas/polícia/serviços de segurança/inteligência? *
            </Label>
            <RadioGroup
              value={data.military_civil_service?.toString() || ""}
              onValueChange={(value) => handleInputChange("military_civil_service", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="military-service-yes" />
                <Label htmlFor="military-service-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="military-service-no" />
                <Label htmlFor="military-service-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {data.military_civil_service && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="service_organization" className="text-sm font-medium text-gray-700">
                  Organização onde serviu
                </Label>
                <Input
                  id="service_organization"
                  value={data.service_organization || ""}
                  onChange={(e) => handleInputChange("service_organization", e.target.value)}
                  placeholder="Nome da organização"
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_rank" className="text-sm font-medium text-gray-700">
                  Posto/Rank
                </Label>
                <Input
                  id="service_rank"
                  value={data.service_rank || ""}
                  onChange={(e) => handleInputChange("service_rank", e.target.value)}
                  placeholder="Seu posto ou rank"
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_place" className="text-sm font-medium text-gray-700">
                  Local do serviço
                </Label>
                <Input
                  id="service_place"
                  value={data.service_place || ""}
                  onChange={(e) => handleInputChange("service_place", e.target.value)}
                  placeholder="Local onde serviu"
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_country" className="text-sm font-medium text-gray-700">
                  País do serviço
                </Label>
                <Input
                  id="service_country"
                  value={data.service_country || ""}
                  onChange={(e) => handleInputChange("service_country", e.target.value)}
                  placeholder="País onde serviu"
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_from_date" className="text-sm font-medium text-gray-700">
                  Data de início do serviço
                </Label>
                <Input
                  id="service_from_date"
                  type="date"
                  value={data.service_from_date || ""}
                  onChange={(e) => handleInputChange("service_from_date", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_to_date" className="text-sm font-medium text-gray-700">
                  Data de fim do serviço
                </Label>
                <Input
                  id="service_to_date"
                  type="date"
                  value={data.service_to_date || ""}
                  onChange={(e) => handleInputChange("service_to_date", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
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