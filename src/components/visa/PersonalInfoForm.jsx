
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

export default function PersonalInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("personal_info", { ...data, [field]: value });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Dados Pessoais</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
              Sobrenome (conforme passaporte) *
            </Label>
            <Input
              id="surname"
              value={data.surname || ""}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              placeholder="Sobrenome"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="given_name" className="text-sm font-medium text-gray-700">
              Nome (conforme passaporte) *
            </Label>
            <Input
              id="given_name"
              value={data.given_name || ""}
              onChange={(e) => handleInputChange("given_name", e.target.value)}
              placeholder="Nome"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="other_names" className="text-sm font-medium text-gray-700">
              Outros nomes ou nomes anteriores (se houver)
            </Label>
            <Input
              id="other_names"
              value={data.other_names || ""}
              onChange={(e) => handleInputChange("other_names", e.target.value)}
              placeholder="Nomes anteriores ou outros nomes conhecidos"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">
              Data de Nascimento *
            </Label>
            <Input
              id="date_of_birth"
              type="date"
              max={today}
              value={data.date_of_birth || ""}
              onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="town_city_birth" className="text-sm font-medium text-gray-700">
              Cidade de Nascimento *
            </Label>
            <Input
              id="town_city_birth"
              value={data.town_city_birth || ""}
              onChange={(e) => handleInputChange("town_city_birth", e.target.value)}
              placeholder="Cidade onde nasceu"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country_birth" className="text-sm font-medium text-gray-700">
              País de Nascimento *
            </Label>
            <Input
              id="country_birth"
              value={data.country_birth || ""}
              onChange={(e) => handleInputChange("country_birth", e.target.value)}
              placeholder="País onde nasceu"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="citizenship" className="text-sm font-medium text-gray-700">
              Cidadania/Nacionalidade *
            </Label>
            <Input
              id="citizenship"
              value={data.citizenship || ""}
              onChange={(e) => handleInputChange("citizenship", e.target.value)}
              placeholder="Ex: Brasileira"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Gênero *</Label>
            <Select
              value={data.gender || ""}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-orange-500">
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
                <SelectItem value="transgender">Transgênero</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="religion" className="text-sm font-medium text-gray-700">
              Religião *
            </Label>
            <Input
              id="religion"
              value={data.religion || ""}
              onChange={(e) => handleInputChange("religion", e.target.value)}
              placeholder="Sua religião"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Qualificação Educacional *</Label>
            <Select
              value={data.educational_qualification || ""}
              onValueChange={(value) => handleInputChange("educational_qualification", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-orange-500">
                <SelectValue placeholder="Selecione sua qualificação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below_matriculation">Abaixo do Ensino Médio</SelectItem>
                <SelectItem value="matriculation">Ensino Médio</SelectItem>
                <SelectItem value="higher_secondary">Ensino Médio Superior</SelectItem>
                <SelectItem value="diploma">Diploma/Técnico</SelectItem>
                <SelectItem value="graduate">Graduação</SelectItem>
                <SelectItem value="post_graduate">Pós-graduação</SelectItem>
                <SelectItem value="doctorate">Doutorado</SelectItem>
                <SelectItem value="others">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="visible_identification_marks" className="text-sm font-medium text-gray-700">
              Marcas de identificação visíveis
            </Label>
            <Input
              id="visible_identification_marks"
              value={data.visible_identification_marks || ""}
              onChange={(e) => handleInputChange("visible_identification_marks", e.target.value)}
              placeholder="Ex: cicatriz no braço direito, tatuagem, etc."
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Conditional nationality field - only show if country_birth is not Brazil */}
          {data.country_birth && data.country_birth.toLowerCase() !== 'brasil' && data.country_birth.toLowerCase() !== 'brazil' && (
            <div className="space-y-2">
              <Label htmlFor="nationality_residence" className="text-sm font-medium text-gray-700">
                Nacionalidade por nascimento ou naturalização *
              </Label>
              <Input
                id="nationality_residence"
                value={data.nationality_residence || ""}
                onChange={(e) => handleInputChange("nationality_residence", e.target.value)}
                placeholder="Ex: Por nascimento"
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="country_citizenship_acquired" className="text-sm font-medium text-gray-700">
              Se naturalizado, país onde adquiriu cidadania
            </Label>
            <Input
              id="country_citizenship_acquired"
              value={data.country_citizenship_acquired || ""}
              onChange={(e) => handleInputChange("country_citizenship_acquired", e.target.value)}
              placeholder="País de naturalização"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="previously_lived_countries" className="text-sm font-medium text-gray-700">
              Países onde viveu por mais de 2 anos desde os 18 anos
            </Label>
            <Textarea
              id="previously_lived_countries"
              value={data.previously_lived_countries || ""}
              onChange={(e) => handleInputChange("previously_lived_countries", e.target.value)}
              placeholder="Liste os países onde viveu por mais de 2 anos"
              className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
