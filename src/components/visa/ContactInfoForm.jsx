import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("contact_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>Informações de Contato</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="seu@email.com"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Telefone *
            </Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+55 11 99999-9999"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Endereço Completo *
            </Label>
            <Input
              id="address"
              value={data.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Rua, número, bairro"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Cidade *
            </Label>
            <Input
              id="city"
              value={data.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Nome da cidade"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state_province" className="text-sm font-medium text-gray-700">
              Estado/Província *
            </Label>
            <Input
              id="state_province"
              value={data.state_province || ""}
              onChange={(e) => handleInputChange("state_province", e.target.value)}
              placeholder="Ex: São Paulo"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code" className="text-sm font-medium text-gray-700">
              CEP *
            </Label>
            <Input
              id="postal_code"
              value={data.postal_code || ""}
              onChange={(e) => handleInputChange("postal_code", e.target.value)}
              placeholder="00000-000"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
              País *
            </Label>
            <Input
              id="country"
              value={data.country || ""}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Ex: Brasil"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}