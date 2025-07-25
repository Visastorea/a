import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ParentsInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("parents_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Informações dos Pais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Father Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Pai</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="father_name" className="text-sm font-medium text-gray-700">
                Nome do Pai *
              </Label>
              <Input
                id="father_name"
                value={data.father_name || ""}
                onChange={(e) => handleInputChange("father_name", e.target.value)}
                placeholder="Nome completo do pai"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="father_birth_city" className="text-sm font-medium text-gray-700">
                Cidade de Nascimento do Pai *
              </Label>
              <Input
                id="father_birth_city"
                value={data.father_birth_city || ""}
                onChange={(e) => handleInputChange("father_birth_city", e.target.value)}
                placeholder="Cidade onde o pai nasceu"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="father_nationality" className="text-sm font-medium text-gray-700">
                Nacionalidade do Pai *
              </Label>
              <Input
                id="father_nationality"
                value={data.father_nationality || ""}
                onChange={(e) => handleInputChange("father_nationality", e.target.value)}
                placeholder="Nacionalidade atual do pai"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="father_previous_nationality" className="text-sm font-medium text-gray-700">
                Nacionalidade Anterior do Pai (se houver)
              </Label>
              <Input
                id="father_previous_nationality"
                value={data.father_previous_nationality || ""}
                onChange={(e) => handleInputChange("father_previous_nationality", e.target.value)}
                placeholder="Nacionalidade anterior do pai"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Mother Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Mãe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mother_name" className="text-sm font-medium text-gray-700">
                Nome da Mãe *
              </Label>
              <Input
                id="mother_name"
                value={data.mother_name || ""}
                onChange={(e) => handleInputChange("mother_name", e.target.value)}
                placeholder="Nome completo da mãe"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother_birth_city" className="text-sm font-medium text-gray-700">
                Cidade de Nascimento da Mãe *
              </Label>
              <Input
                id="mother_birth_city"
                value={data.mother_birth_city || ""}
                onChange={(e) => handleInputChange("mother_birth_city", e.target.value)}
                placeholder="Cidade onde a mãe nasceu"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother_nationality" className="text-sm font-medium text-gray-700">
                Nacionalidade da Mãe *
              </Label>
              <Input
                id="mother_nationality"
                value={data.mother_nationality || ""}
                onChange={(e) => handleInputChange("mother_nationality", e.target.value)}
                placeholder="Nacionalidade atual da mãe"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother_previous_nationality" className="text-sm font-medium text-gray-700">
                Nacionalidade Anterior da Mãe (se houver)
              </Label>
              <Input
                id="mother_previous_nationality"
                value={data.mother_previous_nationality || ""}
                onChange={(e) => handleInputChange("mother_previous_nationality", e.target.value)}
                placeholder="Nacionalidade anterior da mãe"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}