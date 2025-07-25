import React, { useState, useEffect } from "react";
import { VisaApplication } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Calendar, Edit, Search, Filter, Eye, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useToast } from "@/components/ui/use-toast";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const loadApplications = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      const data = await VisaApplication.filter({
        created_by: userData.email
      }, "-created_date");
      
      setApplications(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar seus pedidos.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.personal_info?.given_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.personal_info?.surname || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.application_status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "submitted": return "bg-blue-100 text-blue-800";
      case "under_review": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "draft": return "Rascunho";
      case "submitted": return "Enviado";
      case "under_review": return "Em Análise";
      case "approved": return "Aprovado";
      case "rejected": return "Rejeitado";
      default: return "Desconhecido";
    }
  };

  const handleEditDraft = (applicationId) => {
    navigate(`${createPageUrl("VisaForm")}?edit=${applicationId}`);
  };

  const getProgressPercentage = (app) => {
    let completed = 0;
    const sections = ['personal_info', 'parents_info', 'present_address', 'passport_info', 
                    'profession_details', 'applicant_details', 'previous_visa_info', 
                    'other_info', 'reference_india', 'reference_own_country', 'documents'];
    
    sections.forEach(section => {
      if (app[section] && Object.keys(app[section]).length > 0) {
        completed++;
      }
    });
    
    return Math.round((completed / sections.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Meus Pedidos de Visto</h1>
            <p className="text-gray-600 mt-2">
              Acompanhe o status e continue preenchendo seus pedidos de e-Visa.
            </p>
          </div>
          <Link to={createPageUrl("VisaForm")}>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Novo Pedido</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="card-shadow border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID do pedido ou nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="submitted">Enviado</SelectItem>
                    <SelectItem value="under_review">Em Análise</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredApplications.length === 0 ? (
          <Card className="card-shadow border-0 text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {applications.length === 0 ? "Nenhum pedido por aqui ainda!" : "Nenhum resultado encontrado"}
              </h3>
              <p className="text-gray-600 mb-6">
                {applications.length === 0 
                  ? "Parece que você ainda não iniciou um pedido de visto. Vamos começar?"
                  : "Tente ajustar seus filtros de busca."
                }
              </p>
              {applications.length === 0 && (
                <Link to={createPageUrl("VisaForm")}>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Criar Primeiro Pedido
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="card-shadow border-0 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Pedido #{application.id.slice(-8).toUpperCase()}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(application.created_date), 'dd/MM/yyyy HH:mm')}</span>
                        </div>
                        {application.personal_info?.given_name && (
                          <span>• {application.personal_info.given_name} {application.personal_info.surname}</span>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(application.application_status)}>
                      {getStatusText(application.application_status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {application.application_status === 'draft' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progresso do preenchimento</span>
                        <span className="text-sm text-gray-600">{getProgressPercentage(application)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${getProgressPercentage(application)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Tipo de Visto:</span>
                      <p className="text-gray-600">{application.applicant_details?.visa_type || 'Não informado'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data Esperada de Chegada:</span>
                      <p className="text-gray-600">
                        {application.applicant_details?.expected_date_of_arrival 
                          ? format(new Date(application.applicant_details.expected_date_of_arrival), 'dd/MM/yyyy')
                          : 'Não informada'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Documentos:</span>
                      <p className="text-gray-600">
                        {(application.documents?.photo_url && application.documents?.passport_copy_url) 
                          ? 'Completos' 
                          : 'Pendentes'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                    {application.application_status === 'draft' ? (
                      <Button 
                        onClick={() => handleEditDraft(application.id)}
                        className="bg-orange-500 hover:bg-orange-600 flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Continuar Preenchendo</span>
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>Ver Detalhes</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Mensagens</span>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}