import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { History } from "lucide-react";

export default function PreviousVisaForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("previous_visa_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Informações de Visitas Anteriores</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já visitou a Índia anteriormente? *
            </Label>
            <RadioGroup
              value={data.previously_visited_india?.toString() || ""}
              onValueChange={(value) => handleInputChange("previously_visited_india", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="visited-india-yes" />
                <Label htmlFor="visited-india-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="visited-india-no" />
                <Label htmlFor="visited-india-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {data.previously_visited_india && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="previous_visa_number" className="text-sm font-medium text-gray-700">
                    Número do Visto Anterior
                  </Label>
                  <Input
                    id="previous_visa_number"
                    value={data.previous_visa_number || ""}
                    onChange={(e) => handleInputChange("previous_visa_number", e.target.value)}
                    placeholder="Número do visto anterior"
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previous_visa_type" className="text-sm font-medium text-gray-700">
                    Tipo do Visto Anterior
                  </Label>
                  <Input
                    id="previous_visa_type"
                    value={data.previous_visa_type || ""}
                    onChange={(e) => handleInputChange("previous_visa_type", e.target.value)}
                    placeholder="Tipo do visto anterior"
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previous_visa_place_issue" className="text-sm font-medium text-gray-700">
                    Local de Emissão do Visto Anterior
                  </Label>
                  <Input
                    id="previous_visa_place_issue"
                    value={data.previous_visa_place_issue || ""}
                    onChange={(e) => handleInputChange("previous_visa_place_issue", e.target.value)}
                    placeholder="Local onde foi emitido"
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previous_visa_date_issue" className="text-sm font-medium text-gray-700">
                    Data de Emissão do Visto Anterior
                  </Label>
                  <Input
                    id="previous_visa_date_issue"
                    type="date"
                    value={data.previous_visa_date_issue || ""}
                    onChange={(e) => handleInputChange("previous_visa_date_issue", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address_during_previous_visit" className="text-sm font-medium text-gray-700">
                    Endereço durante a visita anterior
                  </Label>
                  <Textarea
                    id="address_during_previous_visit"
                    value={data.address_during_previous_visit || ""}
                    onChange={(e) => handleInputChange("address_during_previous_visit", e.target.value)}
                    placeholder="Endereço onde ficou hospedado na Índia"
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="cities_previously_visited" className="text-sm font-medium text-gray-700">
                    Cidades visitadas anteriormente na Índia
                  </Label>
                  <Input
                    id="cities_previously_visited"
                    value={data.cities_previously_visited || ""}
                    onChange={(e) => handleInputChange("cities_previously_visited", e.target.value)}
                    placeholder="Ex: Delhi, Agra, Mumbai, Goa"
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já teve visto para a Índia anteriormente? *
            </Label>
            <RadioGroup
              value={data.had_india_visa?.toString() || ""}
              onValueChange={(value) => handleInputChange("had_india_visa", value === "true")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="had-visa-yes" />
                <Label htmlFor="had-visa-yes" className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="had-visa-no" />
                <Label htmlFor="had-visa-no" className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Você já teve algum visto rejeitado por qualquer país? *
            </Label>
            <RadioGroup
              value={data.visa_ever_rejected?.toString() || ""}
              onValueChange={(value) => handleInputChange("visa_ever_rejected", value === "true")}
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

          {data.visa_ever_rejected && (
            <div className="space-y-2">
              <Label htmlFor="visa_rejection_reason" className="text-sm font-medium text-gray-700">
                Razão da rejeição do visto
              </Label>
              <Textarea
                id="visa_rejection_reason"
                value={data.visa_rejection_reason || ""}
                onChange={(e) => handleInputChange("visa_rejection_reason", e.target.value)}
                placeholder="Explique a razão da rejeição do visto"
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                rows={3}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}