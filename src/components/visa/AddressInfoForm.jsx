import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { formatPhone } from "../utils/formatters";

export default function AddressInfoForm({ data, onChange }) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === "phone" || field === "mobile") {
      formattedValue = formatPhone(value);
    }
    onChange("present_address", { ...data, [field]: formattedValue });
    
    // Simple validation example
    if (field === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        setErrors(prev => ({...prev, email: "Ops, parece que este e-mail não é válido."}));
    } else {
        setErrors(prev => ({...prev, email: ""}));
    }
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Home className="w-5 h-5" />
          <span>Seu Endereço Atual</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="house_no_street" className="text-sm font-medium text-gray-700">
              Rua e Número *
            </Label>
            <Input
              id="house_no_street"
              value={data.house_no_street || ""}
              onChange={(e) => handleInputChange("house_no_street", e.target.value)}
              placeholder="Ex: Rua das Flores, 123"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="village_town_city" className="text-sm font-medium text-gray-700">
              Cidade *
            </Label>
            <Input
              id="village_town_city"
              value={data.village_town_city || ""}
              onChange={(e) => handleInputChange("village_town_city", e.target.value)}
              placeholder="Sua cidade"
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

          <div className="space-y-2">
            <Label htmlFor="state_province" className="text-sm font-medium text-gray-700">
              Estado *
            </Label>
            <Input
              id="state_province"
              value={data.state_province || ""}
              onChange={(e) => handleInputChange("state_province", e.target.value)}
              placeholder="Ex: São Paulo ou SP"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_zip_code" className="text-sm font-medium text-gray-700">
              CEP *
            </Label>
            <Input
              id="postal_zip_code"
              value={data.postal_zip_code || ""}
              onChange={(e) => handleInputChange("postal_zip_code", e.target.value)}
              placeholder="00000-000"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500">Ainda não temos busca por CEP, por favor preencha o endereço manualmente.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Telefone Fixo
            </Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(11) 3333-3333"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
              Celular (para contato) *
            </Label>
            <Input
              id="mobile"
              value={data.mobile || ""}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="(11) 99999-9999"
              className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Seu melhor e-mail *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="exemplo@email.com"
              className={`transition-all duration-200 focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'}`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}