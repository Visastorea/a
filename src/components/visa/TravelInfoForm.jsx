import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane } from "lucide-react";

export default function TravelInfoForm({ data, onChange }) {
  const handleInputChange = (field, value) => {
    onChange("travel_info", { ...data, [field]: value });
  };

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Plane className="w-5 h-5" />
          <span>Informações da Viagem</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Tipo de Visto *</Label>
            <Select
              value={data.visa_type || ""}
              onValueChange={(value) => handleInputChange("visa_type", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="Selecione o tipo de visto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tourist">Turismo</SelectItem>
                <SelectItem value="business">Negócios</SelectItem>
                <SelectItem value="medical">Tratamento Médico</SelectItem>
                <SelectItem value="conference">Conferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="port_of_arrival" className="text-sm font-medium text-gray-700">
              Porto de Chegada na Índia *
            </Label>
            <Input
              id="port_of_arrival"
              value={data.port_of_arrival || ""}
              onChange={(e) => handleInputChange("port_of_arrival", e.target.value)}
              placeholder="Ex: Delhi, Mumbai, Bangalore"
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_arrival_date" className="text-sm font-medium text-gray-700">
              Data Esperada de Chegada *
            </Label>
            <Input
              id="expected_arrival_date"
              type="date"
              value={data.expected_arrival_date || ""}
              onChange={(e) => handleInputChange("expected_arrival_date", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_departure_date" className="text-sm font-medium text-gray-700">
              Data Esperada de Partida *
            </Label>
            <Input
              id="expected_departure_date"
              type="date"
              value={data.expected_departure_date || ""}
              onChange={(e) => handleInputChange("expected_departure_date", e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="purpose_of_visit" className="text-sm font-medium text-gray-700">
              Propósito da Visita *
            </Label>
            <Textarea
              id="purpose_of_visit"
              value={data.purpose_of_visit || ""}
              onChange={(e) => handleInputChange("purpose_of_visit", e.target.value)}
              placeholder="Descreva detalhadamente o propósito da sua visita"
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="cities_to_visit" className="text-sm font-medium text-gray-700">
              Cidades a Visitar *
            </Label>
            <Input
              id="cities_to_visit"
              value={data.cities_to_visit || ""}
              onChange={(e) => handleInputChange("cities_to_visit", e.target.value)}
              placeholder="Ex: Delhi, Agra, Jaipur, Mumbai"
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="accommodation_details" className="text-sm font-medium text-gray-700">
              Detalhes da Acomodação *
            </Label>
            <Textarea
              id="accommodation_details"
              value={data.accommodation_details || ""}
              onChange={(e) => handleInputChange("accommodation_details", e.target.value)}
              placeholder="Nome do hotel, endereço completo ou detalhes da hospedagem"
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}