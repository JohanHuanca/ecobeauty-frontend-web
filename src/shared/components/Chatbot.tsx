import { useState, useRef, useEffect } from "react";
import { HiX, HiPaperAirplane, HiSparkles, HiChatAlt2 } from "react-icons/hi";
import { useSupabaseAuth } from "../../core/services/useSupabaseAuth";
import { supabase } from "../../core/services/supabase";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export function Chatbot() {
  const { session, profile } = useSupabaseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // URL de N8N con workaround CORS
  const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
    "https://accesogpt.app.n8n.cloud/webhook/1ff189de-a622-4f18-8fcd-5a31bdb3562d";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cargar historial de chat cuando se abre el chatbot
  useEffect(() => {
    if (isOpen && session?.user?.id && messages.length === 0) {
      loadChatHistory();
    }
  }, [isOpen, session?.user?.id]);

  const loadChatHistory = async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoadingHistory(true);

      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const historyMessages: Message[] = data.map((chat) => ({
          id: chat.id.toString(),
          text: chat.message,
          sender: chat.sender as "user" | "agent",
          timestamp: new Date(chat.created_at),
        }));
        setMessages(historyMessages);
      } else {
        // Si no hay historial, mostrar mensaje de bienvenida
        const welcomeMessage: Message = {
          id: "welcome",
          text: profile?.full_name
            ? `¡Hola ${profile.full_name}! 👋 Soy tu asistente virtual de EcoBeauty. ¿En qué puedo ayudarte hoy?`
            : "¡Hola! 👋 Soy tu asistente virtual de EcoBeauty. ¿En qué puedo ayudarte hoy?",
          sender: "agent",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error("Error al cargar historial:", error);
      // Mostrar mensaje de bienvenida si hay error
      const welcomeMessage: Message = {
        id: "welcome",
        text: "¡Hola! 👋 Soy tu asistente virtual de EcoBeauty. ¿En qué puedo ayudarte hoy?",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const saveChatMessage = async (message: string, sender: "user" | "agent") => {
    if (!session?.user?.id) return;

  };

  const sendMessageToN8N = async (message: string): Promise<string> => {
    try {
      const userId = session?.user?.id || "anonymous";
      const useCorsProxy = import.meta.env.VITE_USE_CORS_PROXY === "true";
      const finalUrl = useCorsProxy 
        ? `https://corsproxy.io/?${encodeURIComponent(N8N_WEBHOOK_URL)}`
        : N8N_WEBHOOK_URL;

      const response = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: message,
          timestamp: new Date().toISOString(),
          user_name: profile?.full_name || null,
          user_email: session?.user?.email || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      return (
        data.response ||
        data.message ||
        "Lo siento, no pude procesar tu mensaje."
      );
    } catch (error) {
      console.error("Error al comunicarse con N8N:", error);
      return "Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta nuevamente.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Guardar mensaje del usuario en Supabase
    await saveChatMessage(userMessage.text, "user");
    
    setInputValue("");
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await sendMessageToN8N(userMessage.text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "agent",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Guardar respuesta del bot en Supabase
      await saveChatMessage(botMessage.text, "agent");
      
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "¿Qué cursos hay disponibles?",
    "¿Cómo crear jabón natural?",
    "Quiero hablar con un experto",
    "Ver tutoriales",
  ];

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  // No mostrar el chatbot si el usuario no está autenticado
  if (!session) {
    return null;
  }

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          aria-label="Abrir chat"
        >
          <HiChatAlt2 className="h-8 w-8" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
            !
          </span>
        </button>
      )}

      {/* Ventana del chatbot */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <HiSparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">EcoBeauty Assistant</h3>
                <p className="text-xs text-emerald-100">
                  {profile?.full_name || "Usuario"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              aria-label="Cerrar chat"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4">
            {isLoadingHistory ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                  <p className="text-sm text-gray-600">Cargando historial...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                          : "bg-white text-gray-800 shadow-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          message.sender === "user"
                            ? "text-emerald-100"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-md">
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick Actions - solo mostrar si no hay historial */}
          {messages.length <= 1 && !isLoadingHistory && (
            <div className="border-t border-gray-200 p-3">
              <p className="mb-2 text-xs font-semibold text-gray-600">
                Acciones rápidas:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="rounded-full border border-emerald-500 px-3 py-1 text-xs text-emerald-600 transition-all hover:bg-emerald-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Enviar mensaje"
              >
                <HiPaperAirplane className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
