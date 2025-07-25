import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

const validatePassport = (passportNumber) => {
  // Validação para passaporte brasileiro: 2 letras + 6 números
  const brazilianPassportRegex = /^[A-Z]{2}\d{6}$/;
  return brazilianPassportRegex.test(passportNumber);
};

export default function PassportInfoForm({ data, onChange, expectedArrivalDate }) {
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (field, value) => {
    onChange("passport_info", { ...data, [field]: value });
    
    if (field === 'passport_number') {
        if (value && !validatePassport(value)) {
            setErrors(prev => ({...prev, passport_number: "Formato de passaporte brasileiro inválido. Use 2 letras e 6 números (Ex: AB123456)."}));
        } else {
            setErrors(prev => ({...prev, passport_number: null}));
        }
    }
  };
  
  useEffect(() => {
    if (expectedArrivalDate && data.date_of_expiry) {
      const arrivalDate = new Date(expectedArrivalDate);
      const expiryDate = new Date(data.date_of_expiry);
      const sixMonthsAfterArrival = new Date(arrivalDate);
      sixMonthsAfterArrival.setMonth(sixMonthsAfterArrival.getMonth() + 6);
      
      if (expiryDate < sixMonthsAfterArrival) {
        setErrors(prev => ({...prev, date_of_expiry: "Seu passaporte deve ser válido por pelo menos 6 meses após a data de chegada à Índia."}));
      } else {
        setErrors(prev => ({...prev, date_of_expiry: null}));
      }
    }
  }, [expectedArrivalDate, data.date_of_expiry]);

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Informações do Passaporte</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="passport_number" className="text-sm font-medium text-gray-700">
              Número do Passaporte *
            </Label>
            <Input
              id="passport_number"
              value={data.passport_number || ""}
              onChange={(e) => handleInputChange("passport_number", e.target.value.toUpperCase())}
              placeholder="AB123456"
              className={`transition-all duration-200 focus:ring-2 ${errors.passport_number ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
            />
            {errors.passport_number && <p className="text-xs text-red-600 mt-1">{errors.passport_number}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Tipo de Passaporte *</Label>
            <Select
              value={data.passport_type || ""}
              onValueChange={(value) => handleInputChange("passport_type", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ordinary">Comum/Ordinário</SelectItem>
                <SelectItem value="diplomatic">Diplomático</SelectItem>
                <SelectItem value="official">Oficial/Serviço</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="place_of_issue" className="text-sm font-medium text-gray-700">
              Local de Emissão *
            </Label>
            <Input
              id="place_of_issue"
              value={data.place_of_issue || ""}
              onChange={(e) => handleInputChange("place_of_issue", e.target.value)}
              placeholder="Ex: São Paulo, Rio de Janeiro"
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_issue" className="text-sm font-medium text-gray-700">
              Data de Emissão *
            </Label>
            <Input
              id="date_of_issue"
              type="date"
              max={today}
              value={data.date_of_issue || ""}
              onChange={(e) => handleInputChange("date_of_issue", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_expiry" className="text-sm font-medium text-gray-700">
              Data de Expiração *
            </Label>
            <Input
              id="date_of_expiry"
              type="date"
              min={today}
              value={data.date_of_expiry || ""}
              onChange={(e) => handleInputChange("date_of_expiry", e.target.value)}
              className={`transition-all duration-200 focus:ring-2 ${errors.date_of_expiry ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
            />
            {errors.date_of_expiry && <p className="text-xs text-red-600 mt-1">{errors.date_of_expiry}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Possui passaporte de outra nacionalidade válido? *
            </Label>
            <RadioGroup
              value={data.any_other_valid_passport?.toString() || "false"}
              onValueChange={(value) => handleInputChange("any_other_valid_passport", value === "true")}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="other-passport-yes" />
                <Label htmlFor="other-passport-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="other-passport-no" />
                <Label htmlFor="other-passport-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {data.any_other_valid_passport && (
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="other_passport_details" className="text-sm font-medium text-gray-700">
                Detalhes do outro passaporte
              </Label>
              <Input
                id="other_passport_details"
                value={data.other_passport_details || ""}
                onChange={(e) => handleInputChange("other_passport_details", e.target.value)}
                placeholder="Número, país emissor e validade do outro passaporte"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div className="md:col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Importante:</strong> Seu passaporte deve ter pelo menos 6 meses de validade 
              a partir da data de chegada à Índia e pelo menos 2 páginas em branco para carimbos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}