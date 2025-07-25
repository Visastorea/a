import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";
import { formatPhone } from "../utils/formatters";

export default function ReferencesForm({ data, onChange }) {
  const handleInputChange = (section, field, value) => {
    let formattedValue = value;
    if (field === "reference_phone") {
        formattedValue = formatPhone(value);
    }
    onChange(section, { ...data[section], [field]: formattedValue });
  };

  return (
    <div className="space-y-6">
      <Card className="card-shadow border-0">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Referência na Índia</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-sm text-gray-600 -mt-2">Pode ser o hotel onde você vai se hospedar ou um contato local, se tiver.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ref_india_name" className="text-sm font-medium text-gray-700">
                Nome da Referência (ou do Hotel) *
              </Label>
              <Input
                id="ref_india_name"
                value={data.reference_india?.reference_name || ""}
                onChange={(e) => handleInputChange("reference_india", "reference_name", e.target.value)}
                placeholder="Nome completo da pessoa ou hotel"
                className="transition-all duration-200 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ref_india_phone" className="text-sm font-medium text-gray-700">
                Telefone de Contato na Índia *
              </Label>
              <Input
                id="ref_india_phone"
                value={data.reference_india?.reference_phone || ""}
                onChange={(e) => handleInputChange("reference_india", "reference_phone", e.target.value)}
                placeholder="Telefone do hotel ou da pessoa"
                className="transition-all duration-200 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="ref_india_address" className="text-sm font-medium text-gray-700">
                Endereço da Referência *
              </Label>
              <Textarea
                id="ref_india_address"
                value={data.reference_india?.reference_address || ""}
                onChange={(e) => handleInputChange("reference_india", "reference_address", e.target.value)}
                placeholder="Endereço completo do hotel ou da pessoa na Índia"
                className="transition-all duration-200 focus:ring-2 focus:ring-cyan-500"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-shadow border-0">
        <CardHeader className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Referência no Brasil (Emergência)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
         <p className="text-sm text-gray-600 -mt-2">Um contato no seu país de origem para caso de emergência.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ref_country_name" className="text-sm font-medium text-gray-700">
                Nome do Contato de Emergência *
              </Label>
              <Input
                id="ref_country_name"
                value={data.reference_own_country?.reference_name || ""}
                onChange={(e) => handleInputChange("reference_own_country", "reference_name", e.target.value)}
                placeholder="Nome completo da referência"
                className="transition-all duration-200 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ref_country_phone" className="text-sm font-medium text-gray-700">
                Telefone do Contato *
              </Label>
              <Input
                id="ref_country_phone"
                value={data.reference_own_country?.reference_phone || ""}
                onChange={(e) => handleInputChange("reference_own_country", "reference_phone", e.target.value)}
                placeholder="(11) 99999-9999"
                className="transition-all duration-200 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="ref_country_address" className="text-sm font-medium text-gray-700">
                Endereço do Contato *
              </Label>
              <Textarea
                id="ref_country_address"
                value={data.reference_own_country?.reference_address || ""}
                onChange={(e) => handleInputChange("reference_own_country", "reference_address", e.target.value)}
                placeholder="Endereço completo do seu contato de emergência"
                className="transition-all duration-200 focus:ring-2 focus:ring-rose-500"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}