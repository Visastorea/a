import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";

export default function ProfessionDetailsForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("profession_details", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5" />
          <span>Detalhes Profissionais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="present_occupation" className="text-sm font-medium text-gray-700">
              Ocupação Atual *
            </Label>
            <Input
              id="present_occupation"
              value={data.present_occupation || ""}
              onChange={(e) => handleInputChange("present_occupation", e.target.value)}
              placeholder="Sua profissão atual"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employer_name" className="text-sm font-medium text-gray-700">
              Nome do Empregador *
            </Label>
            <Input
              id="employer_name"
              value={data.employer_name || ""}
              onChange={(e) => handleInputChange("employer_name", e.target.value)}
              placeholder="Nome da empresa/organização"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
              Cargo/Designação *
            </Label>
            <Input
              id="designation"
              value={data.designation || ""}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              placeholder="Seu cargo na empresa"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employer_phone" className="text-sm font-medium text-gray-700">
              Telefone do Empregador *
            </Label>
            <Input
              id="employer_phone"
              value={data.employer_phone || ""}
              onChange={(e) => handleInputChange("employer_phone", e.target.value)}
              placeholder="+55 11 3333-3333"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="employer_address" className="text-sm font-medium text-gray-700">
              Endereço do Empregador *
            </Label>
            <Textarea
              id="employer_address"
              value={data.employer_address || ""}
              onChange={(e) => handleInputChange("employer_address", e.target.value)}
              placeholder="Endereço completo da empresa"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="past_occupation" className="text-sm font-medium text-gray-700">
              Ocupação Anterior (se houver)
            </Label>
            <Input
              id="past_occupation"
              value={data.past_occupation || ""}
              onChange={(e) => handleInputChange("past_occupation", e.target.value)}
              placeholder="Profissão anterior"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="countries_visited_last_10_years" className="text-sm font-medium text-gray-700">
              Países visitados nos últimos 10 anos *
            </Label>
            <Textarea
              id="countries_visited_last_10_years"
              value={data.countries_visited_last_10_years || ""}
              onChange={(e) => handleInputChange("countries_visited_last_10_years", e.target.value)}
              placeholder="Liste os países que visitou nos últimos 10 anos"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="saarc_countries_visited" className="text-sm font-medium text-gray-700">
              Países SAARC visitados
            </Label>
            <Textarea
              id="saarc_countries_visited"
              value={data.saarc_countries_visited || ""}
              onChange={(e) => handleInputChange("saarc_countries_visited", e.target.value)}
              placeholder="Países SAARC (Afeganistão, Bangladesh, Butão, Maldivas, Nepal, Paquistão, Sri Lanka) que visitou"
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}