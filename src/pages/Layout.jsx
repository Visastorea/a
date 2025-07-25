
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, CheckSquare, LogOut } from "lucide-react";
import { User } from "@/api/entities";
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <style>
        {`
          :root {
            --primary-orange: #FF6B35;
            --primary-green: #2E7D32;
            --primary-blue: #1565C0;
            --accent-saffron: #FF9933;
            --text-dark: #1A1A1A;
            --text-medium: #4A4A4A;
            --text-light: #6B7280;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, var(--primary-orange), var(--primary-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .card-shadow {
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .india-flag-gradient {
            background: linear-gradient(to right, #FF9933 0%, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%, #138808 100%);
          }
        `}
      </style>
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 india-flag-gradient rounded-sm"></div>
              <div>
                <h1 className="text-xl font-bold gradient-text">VisaStore e-Visa</h1>
                <p className="text-xs text-gray-500">Plataforma Simplificada para Visto Indiano</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to={createPageUrl("VisaForm")} 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.includes(createPageUrl("VisaForm")) 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Formulário</span>
              </Link>
              <Link 
                to={createPageUrl("Applications")} 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname.includes(createPageUrl("Applications"))
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>Meus Pedidos</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative">
        {children}
      </main>
      
      <Toaster />

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 VisaStore.tur.br - Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Plataforma desenvolvida para simplificar seu pedido de e-Visa. Não somos afiliados ao Governo da Índia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
