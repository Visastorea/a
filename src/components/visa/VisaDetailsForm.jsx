import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from "lucide-react";

export default function VisaDetailsForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("applicant_details", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Plane className="w-5 h-5" />
          <span>Detalhes do Visto e Viagem</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Visto solicitado para *</Label>
            <Select
              value={data.visa_sought_for || ""}
              onValueChange={(value) => handleInputChange("visa_sought_for", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Para mim</SelectItem>
                <SelectItem value="family">Para família</SelectItem>
                <SelectItem value="group">Para grupo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Tipo de Visto *</Label>
            <Select
              value={data.visa_type || ""}
              onValueChange={(value) => handleInputChange("visa_type", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder="Selecione o tipo de visto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="e-tourist_visa">e-Tourist Visa</SelectItem>
                <SelectItem value="e-business_visa">e-Business Visa</SelectItem>
                <SelectItem value="e-medical_visa">e-Medical Visa</SelectItem>
                <SelectItem value="e-medical_attendant_visa">e-Medical Attendant Visa</SelectItem>
                <SelectItem value="e-conference_visa">e-Conference Visa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="port_of_arrival" className="text-sm font-medium text-gray-700">
              Aeroporto / Porto de Chegada à Índia *
            </Label>
            <Input
              id="port_of_arrival"
              value={data.port_of_arrival || ""}
              onChange={(e) => handleInputChange("port_of_arrival", e.target.value)}
              placeholder="Ex: Delhi, Mumbai, Bangalore, Chennai"
              className="transition-all duration-200 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port_of_departure" className="text-sm font-medium text-gray-700">
              Aeroporto / Porto de Saída da Índia *
            </Label>
            <Input
              id="port_of_departure"
              value={data.port_of_departure || ""}
              onChange={(e) => handleInputChange("port_of_departure", e.target.value)}
              placeholder="Ex: Delhi, Mumbai, Bangalore, Chennai"
              className="transition-all duration-200 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_date_of_arrival" className="text-sm font-medium text-gray-700">
              Data Esperada de Chegada à Índia *
            </Label>
            <Input
              id="expected_date_of_arrival"
              type="date"
              value={data.expected_date_of_arrival || ""}
              onChange={(e) => handleInputChange("expected_date_of_arrival", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_date_of_departure" className="text-sm font-medium text-gray-700">
              Data Esperada de Saída da Índia *
            </Label>
            <Input
              id="expected_date_of_departure"
              type="date"
              value={data.expected_date_of_departure || ""}
              onChange={(e) => handleInputChange("expected_date_of_departure", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Informações Importantes:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• e-Tourist Visa: Válido para turismo, visitas casuais, encontros não comerciais</li>
            <li>• e-Business Visa: Válido para estabelecer contatos comerciais, vendas/compras, etc.</li>
            <li>• e-Medical Visa: Válido para tratamento médico na Índia</li>
            <li>• e-Conference Visa: Válido para participar de conferências organizadas pelo Governo da Índia</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}