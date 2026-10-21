import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bot, Send, User, RotateCcw, ThumbsUp, ThumbsDown, CheckCircle2, ShieldCheck, Heart, X, MessageSquare, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api/apiClient';

interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

interface DynamicForm {
  formId: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'live_agent' | 'system';
  text: string;
  timestamp: string;
  citations?: Array<{ title?: string; source?: string }>;
  form?: DynamicForm;
  rated?: 'up' | 'down' | null;
}

export default function HostedChatWidget() {
  const { companySlug = 'slt', agentSlug = 'customer-care' } = useParams<{ companySlug: string; agentSlug: string }>();
  const navigate = useNavigate();

  const [agentName, setAgentName] = useState('Connect AI Assistant');
  const [brandName, setBrandName] = useState('SLT-MOBITEL');
  const [brandMark, setBrandMark] = useState('SM');
  const [suggestedPrompts, setSuggestedPrompts] = useState([
    'Explore Fiber packages',
    'Check my bill',
    'Technical help',
    'Talk to a person',
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState<Record<string, boolean>>({});
  const [formInputValues, setFormInputValues] = useState<Record<string, Record<string, string>>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initConversation = () => {
    setIsEscalated(false);
    setFormSubmissions({});
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: 'Hi! I’m your SLT-Mobitel AI customer assistant. How can I help you today?',
        timestamp: new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date()),
        citations: [{ title: 'SLT Knowledge Base 2026' }],
      },
    ]);
  };

  useEffect(() => {
    if (agentSlug === 'sales-guide') {
      setAgentName('Broadband Sales Guide');
      setSuggestedPrompts(['Compare unlimited packages', 'New connection offers', 'Talk to sales specialist']);
    } else {
      setAgentName('Connect AI Customer Assistant');
      setSuggestedPrompts(['Explore Fiber packages', 'Check my bill', 'Technical help', 'Talk to a person']);
    }
    initConversation();
  }, [companySlug, agentSlug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Handle User Message Send
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    // Simulated Smart Agent Routing matching MVP backend rules
    setTimeout(() => {
      const lower = query.toLowerCase();
      let botReply = 'Thanks for reaching out. I can assist with broadband packages, billing questions, technical troubleshooting, or connect you with a live agent.';
      let citations: Array<{ title: string }> | undefined = undefined;
      let formAction: DynamicForm | undefined = undefined;

      if (/human|person|agent|live|talk/.test(lower)) {
        botReply = 'Of course. I’ve recorded your request to speak with a human support agent.';
        setIsEscalated(true);
      } else if (/bill|payment|charge|due|pay/.test(lower)) {
        botReply = 'Your current monthly billing balance for account SLT-0112445892 is LKR 3,450.00. Payment is due by the 28th. You can settle online via our quick portal.';
        citations = [{ title: 'Billing Policy KB-SLT-BILL-003' }, { title: 'SLT E-Bill Portal' }];
      } else if (/fiber|package|plan|buy|connection|upgrade/.test(lower)) {
        botReply = 'I can recommend the right high-speed broadband option for you. Share a few details and our sales team will assist you immediately:';
        formAction = {
          formId: 'sales_interest',
          title: 'Tell us what you need',
          description: 'Only the essentials—we’ll use these details to configure your package.',
          submitLabel: 'Submit Details',
          fields: [
            { name: 'name', label: 'Your Full Name', type: 'text', required: true },
            { name: 'contact', label: 'Mobile or Email', type: 'text', required: true },
            { name: 'location', label: 'City / Area', type: 'text', required: false },
          ],
        };
      } else if (/technical|internet|slow|fault|router|los/.test(lower)) {
        botReply = 'Let’s troubleshoot this together. Please check your optical ONU router: is the PON light solid green, or is the LOS light blinking red?';
        citations = [{ title: 'Router Troubleshooting Guide KB-SLT-SUPP-002' }];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date()),
        citations,
        form: formAction,
      };

      setMessages((prev) => {
        const next = [...prev, botMsg];
        if (lower.includes('human') || lower.includes('person') || lower.includes('agent')) {
          next.push({
            id: `notice-${Date.now()}`,
            sender: 'system',
            text: 'Your request has been placed in the live-agent queue. You can continue typing while you wait.',
            timestamp: new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date()),
          });
        }
        return next;
      });

      setIsSending(false);
    }, 650);
  };

  // Submit Feedback (Thumbs Up / Down)
  const handleFeedback = (msgId: string, rating: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, rated: rating } : m))
    );
  };

  // Submit Inline Form
  const handleFormSubmit = (e: React.FormEvent, formId: string) => {
    e.preventDefault();
    setFormSubmissions((prev) => ({ ...prev, [formId]: true }));

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-form-resp-${Date.now()}`,
          sender: 'bot',
          text: 'Thank you! Your details have been securely recorded. Our specialist team will reach out to you.',
          timestamp: new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date()),
        },
      ]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-6 font-sans">
      <div className="w-full max-w-5xl h-[92vh] sm:h-[86vh] bg-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Aside Brand Panel (Desktop) */}
        <aside className="hidden md:flex md:col-span-4 bg-gradient-to-b from-[#081a34] via-[#0c2448] to-[#081a34] text-white p-8 flex-col justify-between border-r border-indigo-950/60 relative">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                {brandMark}
              </div>
              <div>
                <strong className="text-sm font-black tracking-tight block">{brandName}</strong>
                <span className="text-[11px] text-slate-300">Customer care, made simple</span>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                AVAILABLE 24/7
              </span>
              <h1 className="text-2xl font-black text-white leading-tight">
                Answers that move you forward.
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Ask a question, explore broadband packages, or get guided technical support—all in one secure conversation.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-slate-800 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Assistant Online</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Grounded & isolated conversation</span>
            </div>
          </div>
        </aside>

        {/* Right Chat Card */}
        <main className="col-span-12 md:col-span-8 flex flex-col h-full bg-slate-50 relative overflow-hidden">
          
          {/* Header */}
          <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-black text-slate-900">{agentName}</h2>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-semibold">Online · replies instantly</span>
                </div>
              </div>
            </div>

            <button
              onClick={initConversation}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Start New Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </header>

          {/* Messages Feed */}
          <section className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-slate-200/70 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                Today
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === 'user' ? 'justify-end' : m.sender === 'system' ? 'justify-center' : 'justify-start'
                }`}
              >
                {m.sender === 'system' ? (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium text-center max-w-md shadow-2xs">
                    {m.text}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    {m.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs mt-1">
                        AI
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          m.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p>{m.text}</p>

                        {/* Grounded Source Citations */}
                        {m.citations && m.citations.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                            <span className="font-bold text-slate-500">Sources:</span>{' '}
                            {m.citations.map((c, i) => c.title || `Reference ${i + 1}`).join(' · ')}
                          </div>
                        )}

                        {/* Dynamic Inline Customer Form */}
                        {m.form && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <h4 className="font-bold text-slate-900 text-xs">{m.form.title}</h4>
                            {m.form.description && (
                              <p className="text-[11px] text-slate-500">{m.form.description}</p>
                            )}

                            {formSubmissions[m.form.formId] ? (
                              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Details submitted securely</span>
                              </div>
                            ) : (
                              <form onSubmit={(e) => handleFormSubmit(e, m.form!.formId)} className="space-y-2 pt-1">
                                {m.form.fields.map((field) => (
                                  <div key={field.name}>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                      {field.label} {field.required && '*'}
                                    </label>
                                    <input
                                      type={field.type || 'text'}
                                      required={field.required}
                                      value={formInputValues[m.form!.formId]?.[field.name] || ''}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setFormInputValues((prev) => ({
                                          ...prev,
                                          [m.form!.formId]: {
                                            ...(prev[m.form!.formId] || {}),
                                            [field.name]: val,
                                          },
                                        }));
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                                    />
                                  </div>
                                ))}
                                <button
                                  type="submit"
                                  className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs mt-1"
                                >
                                  {m.form.submitLabel || 'Submit'}
                                </button>
                              </form>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Message Meta & Feedback Buttons */}
                      <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
                        <span>{m.timestamp}</span>

                        {m.sender === 'bot' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleFeedback(m.id, 'up')}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${
                                m.rated === 'up' ? 'text-indigo-600 font-bold' : 'text-slate-400'
                              }`}
                              title="Helpful"
                            >
                              ♡
                            </button>
                            <button
                              onClick={() => handleFeedback(m.id, 'down')}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${
                                m.rated === 'down' ? 'text-rose-600 font-bold' : 'text-slate-400'
                              }`}
                              title="Not helpful"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </section>

          {/* Suggested Prompts Strip */}
          <div className="px-4 py-2 bg-white/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-600 text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Composer Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Type your message…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Legal AI Disclaimer */}
          <div className="py-1 px-4 bg-slate-100 text-center text-[10px] text-slate-400">
            AI responses can be inaccurate. Please verify important information.
          </div>
        </main>
      </div>
    </div>
  );
}
