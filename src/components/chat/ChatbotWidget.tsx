import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { ChatMessage } from '../../types';
import { 
  Bot, 
  X, 
  Send, 
  Calendar, 
  MessageSquare
} from 'lucide-react';

interface ChatbotWidgetProps {
  onOpenBooking: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onOpenBooking }) => {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialBotMessage: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: t('chat.welcome'),
    timestamp: 'Ahora',
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);

  // Update welcome message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ ...prev[0], text: t('chat.welcome') }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: t('chat.prompt.services'), query: 'servicios' },
    { label: lang === 'es' ? '¿Qué modelo de LLM usas?' : 'What LLM model do you use?', query: 'modelo' },
    { label: t('chat.prompt.industry40'), query: 'industria40' },
    { label: t('chat.prompt.pricing'), query: 'tarifas' },
    { label: t('chat.prompt.book'), query: 'agendar' },
  ];

  const getSmartResponse = (query: string): { text: string; action?: 'open_booking' | 'contact_whatsapp' | 'call' } => {
    const q = query.toLowerCase();

    // LLM Model Query
    if (q.includes('modelo') || q.includes('llm') || q.includes('gemini') || q.includes('que ia') || q.includes('qué ia') || q.includes('model') || q.includes('inteligencia')) {
      return {
        text: lang === 'es'
          ? 'Estoy impulsado por Google Gemini (Gemini 1.5 Flash), orquestado con nuestra arquitectura corporativa de RAG Privado (Retrieval-Augmented Generation). Esto me permite consultar de forma instantánea la base de conocimiento y casos de éxito de ALPHA Digital Transformation con alta precisión y cumplimiento riguroso de privacidad GDPR.'
          : 'I am powered by Google Gemini (Gemini 1.5 Flash), orchestrated via our enterprise Private RAG (Retrieval-Augmented Generation) pipeline. This enables me to access ALPHA Digital Transformation\'s knowledge base and case studies with high precision and strict GDPR confidentiality.',
      };
    }

    if (q.includes('agend') || q.includes('cita') || q.includes('reunion') || q.includes('reunión') || q.includes('book') || q.includes('meeting') || q.includes('schedule')) {
      return {
        text: lang === 'es'
          ? '¡Excelente decisión! Ofrecemos una primera sesión de consultoría técnica de 30 minutos sin coste con un Senior Data Scientist e Ingeniero Industrial para evaluar la viabilidad de tu caso. Puedes hacer clic en el botón de abajo para elegir fecha y horario.'
          : 'Great decision! We offer an initial complimentary 30-minute technical session with a Senior Data Scientist and Industrial Engineer to assess feasibility. Click the button below to select your slot.',
        action: 'open_booking',
      };
    }

    if (q.includes('servicio') || q.includes('service') || q.includes('solucion') || q.includes('solución') || q.includes('que hacen')) {
      return {
        text: lang === 'es'
          ? 'En ALPHA Digital Transformation estructuramos nuestras soluciones de forma clara: 1) Business Intelligence & Dashboards ejecutivos, 2) Data Engineering & Lakehouses (Snowflake/Databricks), 3) Machine Learning & Forecasting Predictivo, 4) GenAI & Asistentes RAG Privados, 5) MLOps & Despliegue en Producción, y 6) Industria 4.0 & Mantenimiento Predictivo con IoT. ¿Te gustaría cotizar alguno?'
          : 'At ALPHA Digital Transformation we offer a progressive 6-tier portfolio: 1) Business Intelligence & Executive Dashboards, 2) Data Engineering & Cloud Lakehouses, 3) Machine Learning & Demand Forecasting, 4) Enterprise GenAI & Private RAG Agents, 5) Production MLOps, and 6) Industry 4.0 & Predictive Maintenance with IoT. Which one fits your goals?',
      };
    }

    if (q.includes('industria') || q.includes('4.0') || q.includes('fabrica') || q.includes('fábrica') || q.includes('mantenimiento') || q.includes('iot') || q.includes('plant')) {
      return {
        text: lang === 'es'
          ? 'Nuestro equipo une la visión de procesos de la Ingeniería Industrial con la IA más puntera. Ayudamos a plantas y fabricantes a reducir hasta un 45% las paradas imprevistas mediante sensórica IoT y algoritmos que detectan averías antes de que ocurran.'
          : 'Our team bridges Industrial Engineering process optimization with cutting-edge AI. We help manufacturers reduce unplanned downtime by up to 45% using IoT sensors and algorithms that detect anomalies before machine breakdown occurs.',
        action: 'open_booking',
      };
    }

    if (q.includes('precio') || q.includes('tarifa') || q.includes('coste') || q.includes('costo') || q.includes('pricing') || q.includes('rate') || q.includes('cuanto')) {
      return {
        text: lang === 'es'
          ? 'Trabajamos bajo dos modalidades muy claras: 1) Proyectos cerrados con PoC funcional en 4 semanas para validar retorno, o 2) Asignación de Squads técnicos dedicados por sprint. Evaluamos tu necesidad en la primera sesión técnica gratuita de 30 minutos y te entregamos propuesta en 24h.'
          : 'We offer two transparent models: 1) Fixed-scope projects with a 4-week proof of concept to validate ROI, or 2) Dedicated Senior Data Science squads. We evaluate your needs during our free 30-min discovery call and deliver a tailored scope within 24h.',
        action: 'open_booking',
      };
    }

    if (q.includes('contacto') || q.includes('telefono') || q.includes('teléfono') || q.includes('email') || q.includes('correo') || q.includes('phone')) {
      return {
        text: lang === 'es'
          ? 'Puedes escribirnos directamente a alpha.digital.ia@gmail.com o llamarnos al +34 641 012 046. ¡También respondemos de inmediato por WhatsApp en el botón verde de la pantalla!'
          : 'You can write to us directly at alpha.digital.ia@gmail.com or call +34 641 012 046. You can also chat immediately via WhatsApp using the floating green widget!',
        action: 'contact_whatsapp',
      };
    }

    // Default intelligent fallback
    return {
      text: lang === 'es'
        ? 'Gracias por tu consulta. Nuestros consultores Senior (Ingenieros Industriales con Máster en Big Data e IA) pueden revisar este reto en tu empresa. ¿Te gustaría agendar una reunión técnica de 30 min sin compromiso o hablar por WhatsApp (+34 641 012 046)?'
        : 'Thank you for your question. Our Senior technical leads (Industrial Engineers with Big Data & AI Masters) can evaluate this for your company. Would you like to schedule a 30-min discovery call or chat on WhatsApp (+34 641 012 046)?',
      action: 'open_booking',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate intelligent analysis & typing latency
    setTimeout(() => {
      const responseData = getSmartResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: responseData.action,
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Minimized Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="relative group flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Abrir asistente virtual"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-slate-950" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wide leading-tight">ALPHA AI</span>
            <span className="text-[10px] font-mono text-slate-900 font-semibold leading-tight">
              Gemini 1.5 Flash
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-slate-950 text-cyan-300">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[390px] h-[540px] max-h-[85vh] rounded-3xl bg-[#091124] border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0c1630] to-[#070d1e] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t('chat.header.name')}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    Gemini 1.5 Flash
                  </span>
                </h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t('chat.header.status')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button inside chat message */}
                  {msg.action === 'open_booking' && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenBooking();
                      }}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-[11px] text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 transition-all shadow-md active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Agendar Sesión Técnica (30 min)' : 'Schedule Technical Call (30 min)'}</span>
                    </button>
                  )}

                  {msg.action === 'contact_whatsapp' && (
                    <a
                      href="https://wa.me/34641012046"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-[11px] text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Abrir chat de WhatsApp' : 'Open WhatsApp chat'}</span>
                    </a>
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono p-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>{t('chat.typing')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 border-t border-slate-800 bg-slate-900/60 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.label)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-900 border border-slate-700/80 text-cyan-300 hover:border-cyan-400 hover:text-white shrink-0 transition-colors"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#070d1e] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t('chat.input.placeholder')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
