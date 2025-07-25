import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send } from "lucide-react";
import { InvokeLLM } from "@/api/integrations";

export default function HelpChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const prompt = `Você é um assistente virtual especializado em ajudar usuários a preencher o formulário de e-Visa para a Índia. Seja conciso, amigável e direto ao ponto. Responda em português do Brasil. Pergunta do usuário: "${input}"`;
      
      const response = await InvokeLLM({ prompt });
      
      const botMessage = { sender: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao chamar LLM:", error);
      const errorMessage = {
        sender: "bot",
        text: "Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot /> <span>Assistente de Ajuda</span>
          </DialogTitle>
          <DialogDescription>
            Tem alguma dúvida sobre o preenchimento? Pergunte-me!
          </DialogDescription>
        </DialogHeader>
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && <Bot className="w-5 h-5 text-blue-600 flex-shrink-0" />}
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
               {msg.sender === "user" && <User className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start space-x-2 justify-start">
               <Bot className="w-5 h-5 text-blue-600 flex-shrink-0" />
               <div className="px-3 py-2 rounded-lg bg-white border">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="w-full flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua pergunta aqui..."
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}