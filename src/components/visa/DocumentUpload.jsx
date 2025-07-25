import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, Check, Eye, Trash2 } from "lucide-react";
import { UploadFile } from "@/api/integrations";
import { useToast } from "@/components/ui/use-toast";

export default function DocumentUpload({ data, onChange }) {
  const [uploading, setUploading] = useState({ photo: false, passport: false });
  const [previews, setPreviews] = useState({});
  const { toast } = useToast();

  const validateFile = (file, type) => {
    const allowedTypes = {
      photo: ['image/jpeg', 'image/jpg', 'image/png'],
      passport: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    };
    
    const maxSizes = {
      photo: 1 * 1024 * 1024, // 1MB
      passport: 300 * 1024 // 300KB
    };

    if (!allowedTypes[type].includes(file.type)) {
      toast({
        title: "Formato de arquivo inválido",
        description: `Para a ${type === 'photo' ? 'foto' : 'cópia do passaporte'}, use apenas os formatos: ${allowedTypes[type].map(t => t.split('/')[1].toUpperCase()).join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSizes[type]) {
      toast({
        title: "Arquivo muito grande",
        description: `O arquivo deve ter no máximo ${type === 'photo' ? '1MB' : '300KB'}.`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file, type) => {
    if (!validateFile(file, type)) return;

    setUploading(prev => ({ ...prev, [type]: true }));
    toast({
        title: "Iniciando upload...",
        description: `Enviando o arquivo de ${type === 'photo' ? 'foto' : 'passaporte'}. Por favor, aguarde.`,
    });
    
    try {
      // Create preview URL for image files
      if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews(prev => ({ ...prev, [type]: reader.result }));
          };
          reader.readAsDataURL(file);
      } else {
         setPreviews(prev => ({ ...prev, [type]: null })); // No preview for PDF
      }


      const { file_url } = await UploadFile({ file });
      const fieldName = type === "photo" ? "photo_url" : "passport_copy_url";
      onChange("documents", { ...data, [fieldName]: file_url });
      
      toast({
        title: "Upload concluído!",
        description: `Seu arquivo de ${type === 'photo' ? 'foto' : 'passaporte'} foi enviado com sucesso.`,
        variant: "default"
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo. Por favor, verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
    }
    
    setUploading(prev => ({ ...prev, [type]: false }));
  };

  const removeFile = (type) => {
    const fieldName = type === "photo" ? "photo_url" : "passport_copy_url";
    onChange("documents", { ...data, [fieldName]: null });
    setPreviews(prev => ({ ...prev, [type]: null }));
    toast({
      title: "Arquivo removido",
      description: "Você pode enviar um novo arquivo se desejar.",
    });
  };

  const FileUploadCard = ({ type, title, description, requirements, currentUrl }) => {
    const fileUploaded = currentUrl || previews[type];
    
    return (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <FileImage className="w-12 h-12 mx-auto text-gray-400" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 mb-4">{description}</p>
              
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                {requirements.map((req, index) => (
                  <p key={index}>• {req}</p>
                ))}
              </div>

              {/* Preview Area */}
              {fileUploaded && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">Arquivo carregado</span>
                    </div>
                    <div className="flex space-x-2">
                      {previews[type] && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => window.open(previews[type], '_blank')}
                          className="h-8 w-8"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFile(type)}
                        className="text-red-600 hover:text-red-700 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {previews[type] && <img src={previews[type]} alt="Pré-visualização" className="mt-2 rounded-md max-h-32 mx-auto"/>}
                </div>
              )}
            </div>

            <div>
              <input
                type="file"
                accept={type === 'photo' ? 'image/jpeg, image/png' : 'image/jpeg, image/png, application/pdf'}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, type);
                }}
                className="hidden"
                id={`upload-${type}`}
              />
              <label htmlFor={`upload-${type}`}>
                <Button
                  type="button"
                  variant={currentUrl ? "secondary" : "default"}
                  className="cursor-pointer w-full"
                  disabled={uploading[type]}
                >
                  {uploading[type] ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      {currentUrl ? 'Substituir Arquivo' : 'Selecionar Arquivo'}
                    </>
                  )}
                </Button>
              </label>
            </div>
        </div>
  )};

  return (
    <Card className="card-shadow border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload de Documentos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadCard
            type="photo"
            title="Sua Foto 3x4"
            description="Foto recente, com fundo branco, estilo passaporte."
            requirements={[
              "Formato: JPEG ou PNG",
              "Tamanho: 10KB a 1MB",
              "Dimensões mínimas: 350x350 pixels",
              "Rosto nítido e centralizado"
            ]}
            currentUrl={data.photo_url}
          />

          <FileUploadCard
            type="passport"
            title="Cópia do Passaporte"
            description="Página com seus dados pessoais (foto, nome, etc)."
            requirements={[
              "Formato: PDF, JPEG ou PNG",
              "Tamanho: 10KB a 300KB",
              "Digitalização nítida e legível",
              "Todas as informações visíveis"
            ]}
            currentUrl={data.passport_copy_url}
          />
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Requisitos Importantes:</h4>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>Todos os documentos devem estar em formato digital.</li>
            <li>As imagens precisam ter boa qualidade e ser legíveis.</li>
            <li>Não são aceitos documentos com marcas d'água ou edições.</li>
            <li>A foto deve seguir os padrões internacionais para documentos.</li>
            <li>Você pode substituir os arquivos até o envio final do pedido.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}