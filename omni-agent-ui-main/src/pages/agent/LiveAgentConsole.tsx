import React, { useState, useEffect, useRef } from 'react';
import { Headset, Power, MessageSquare, Send, User, CheckCircle2, Clock, Shield, Search, RefreshCw, AlertCircle, Check, X, PhoneCall } from 'lucide-react';
import { apiClient } from '@/api/apiClient';
import { useAuthStore } from '@/store/authStore';
import ToastContainer, { type ToastMessage } from '@/components/Toast';

export interface LiveSession {
  sessionId: string;
  customerName: string;
  publicAgentKey: string;
  channel: 'web' | 'whatsapp' | 'messenger' | 'sms';
  status: 'HANDOFF_REQUESTED' | 'HUMAN_ACTIVE' | 'CLOSED';
  handoffReason?: string;
  lastMessage: string;
  updatedAt: string;
  unreadCount?: number;
}

export interface LiveMessage {
  id: string;
  role: 'customer' | 'assistant' | 'live_agent' | 'system';
  text: string;
  createdAt: string;
  senderName?: string;
}

export default function LiveAgentConsole() {
  const { user } = useAuthStore();
  const [isOnline, setIsOnline] = useState(true);
  const [presenceLoading, setPresenceLoading] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [sessions, setSessions] = useState<LiveSession[]>([
    {
      sessionId: 'sess-a20c71b1',
      customerName: 'Kamal Perera',
      publicAgentKey: 'customer-care',
      channel: 'web',
      status: 'HANDOFF_REQUESTED',
      handoffReason: 'Customer explicitly requested human assistance with fiber router configuration',
      lastMessage: 'I need help setting up my Fiber ONU router.',
      updatedAt: 'Just now',
      unreadCount: 1,
    },
    {
      sessionId: 'sess-73b122d1',
      customerName: 'Dilini Fernando',
      publicAgentKey: 'customer-care',
      channel: 'whatsapp',
      status: 'HUMAN_ACTIVE',
      handoffReason: 'Billing dispute escalation',
      lastMessage: 'Can someone check my bill payment for September?',
      updatedAt: '5m ago',
      unreadCount: 0,
    },
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>('sess-a20c71b1');
  const [messagesMap, setMessagesMap] = useState<Record<string, LiveMessage[]>>({
    'sess-a20c71b1': [
      { id: 'm-1', role: 'customer', text: 'Hi, I need help setting up my Fiber ONU router. The internet is not working.', createdAt: '10:14 AM' },
      { id: 'm-2', role: 'assistant', text: 'I can help troubleshoot basic router settings. Would you like to speak with a human support agent?', createdAt: '10:14 AM' },
      { id: 'm-3', role: 'customer', text: 'Yes, please connect me to a live agent immediately.', createdAt: '10:15 AM' },
      { id: 'm-4', role: 'system', text: 'Customer requested human assistance. Session placed into company Live Agent Queue.', createdAt: '10:15 AM' },
    ],
    'sess-73b122d1': [
      { id: 'm-10', role: 'customer', text: 'Can someone check my bill payment for September? I paid via Genie app yesterday.', createdAt: '10:05 AM' },
      { id: 'm-11', role: 'live_agent', text: 'Hello Dilini, I am checking your transaction ID TXN-88219482 now.', createdAt: '10:06 AM', senderName: 'You' },
    ],
  });

  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.sessionId === activeSessionId) || sessions[0];
  const isWaiting = activeSession?.status === 'HANDOFF_REQUESTED';
  const currentMessages = activeSession ? (messagesMap[activeSession.sessionId] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Toggle Presence
  const togglePresence = async () => {
    setPresenceLoading(true);
    const targetState = !isOnline;

    try {
      const endpoint = targetState ? '/agent/presence/online' : '/agent/presence/offline';
      await apiClient.post(endpoint, {
        agentId: user?.id || 'agent-01',
        tenantId: user?.tenantId || 'slt',
      });
    } catch {
      // Fallback
    } finally {
      setIsOnline(targetState);
      setPresenceLoading(false);
      addToast(targetState ? 'You are now ONLINE and receiving customer handoffs.' : 'You are now OFFLINE.', targetState ? 'success' : 'info');
    }
  };

  // Accept Handoff Action
  const handleAcceptHandoff = () => {
    if (!activeSession) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === activeSession.sessionId
          ? { ...s, status: 'HUMAN_ACTIVE', unreadCount: 0 }
          : s
      )
    );

    const acceptNotice: LiveMessage = {
      id: `sys-${Date.now()}`,
      role: 'system',
      text: `Live Agent (${user?.name || 'Support Agent'}) accepted this conversation.`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeSession.sessionId]: [...(prev[activeSession.sessionId] || []), acceptNotice],
    }));

    addToast(`Conversation with ${activeSession.customerName} assigned to you!`, 'success');
  };

  // Close Conversation Action
  const handleCloseConversation = () => {
    if (!activeSession) return;
    if (!confirm(`Are you sure you want to close the chat with ${activeSession.customerName}?`)) return;

    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === activeSession.sessionId
          ? { ...s, status: 'CLOSED' }
          : s
      )
    );

    const closeNotice: LiveMessage = {
      id: `sys-${Date.now()}`,
      role: 'system',
      text: 'This customer conversation was closed and marked resolved by the support agent.',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeSession.sessionId]: [...(prev[activeSession.sessionId] || []), closeNotice],
    }));

    addToast('Conversation closed successfully.', 'info');
  };

  // Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSession || isWaiting) return;

    const newMsg: LiveMessage = {
      id: `msg-${Date.now()}`,
      role: 'live_agent',
      text: inputText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: 'You',
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeSession.sessionId]: [...(prev[activeSession.sessionId] || []), newMsg],
    }));

    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === activeSession.sessionId
          ? { ...s, lastMessage: inputText.trim(), updatedAt: 'Just now' }
          : s
      )
    );

    setInputText('');
  };

  const filteredSessions = sessions.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.customerName.toLowerCase().includes(q) || s.sessionId.toLowerCase().includes(q) || s.lastMessage.toLowerCase().includes(q);
  });

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col font-sans space-y-4 max-w-7xl mx-auto w-full">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Top Presence & Availability Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl border border-indigo-900/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-cyan-400 shadow-md">
            <Headset className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight">Live Agent Console</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-cyan-300 border border-indigo-400/30 text-[10px] font-black uppercase tracking-wider">
                Support Operator
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Signed in as: <strong className="text-white font-bold">{user?.name || 'Live Support Agent'}</strong> ({user?.email || 'agent@sltdigital.lk'})
            </p>
          </div>
        </div>

        {/* Presence Indicator & Controls */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 px-2">
            <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isOnline ? 'Receiving handoffs' : 'Not accepting chats'}
              </span>
            </div>
          </div>

          <button
            onClick={togglePresence}
            disabled={presenceLoading}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
              isOnline
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{presenceLoading ? 'Updating...' : isOnline ? 'Go Offline' : 'Go Online'}</span>
          </button>
        </div>
      </div>

      {/* Main Console Split Workspace */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column: Queued Customer Sessions */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">Handoff Queue</h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black">
                {sessions.length} Conversations
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search customers or sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredSessions.map((s) => {
              const active = s.sessionId === activeSessionId;
              const waiting = s.status === 'HANDOFF_REQUESTED';
              return (
                <div
                  key={s.sessionId}
                  onClick={() => setActiveSessionId(s.sessionId)}
                  className={`p-3.5 transition-all cursor-pointer flex items-start justify-between gap-2 ${
                    active ? 'bg-indigo-50/90 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">{s.customerName}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 text-[9px] font-mono uppercase font-bold">
                        {s.channel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{s.lastMessage}</p>
                    {s.handoffReason && (
                      <span className="text-[9px] text-amber-700 block truncate font-medium">
                        ⚠ {s.handoffReason}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-400">{s.updatedAt}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        waiting
                          ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                          : s.status === 'HUMAN_ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {waiting ? 'Waiting' : s.status === 'HUMAN_ACTIVE' ? 'Active' : 'Closed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Conversation Pane */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {activeSession ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    {activeSession.customerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-black text-slate-900">{activeSession.customerName}</h3>
                      <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 text-[9px] font-mono uppercase font-bold">
                        {activeSession.channel}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Session: {activeSession.sessionId} · Agent: {activeSession.publicAgentKey}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isWaiting ? (
                    <button
                      onClick={handleAcceptHandoff}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer animate-bounce"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Handoff</span>
                    </button>
                  ) : (
                    activeSession.status === 'HUMAN_ACTIVE' && (
                      <button
                        onClick={handleCloseConversation}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                      >
                        Close Chat
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-3">
                {isWaiting && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>This customer is waiting in the queue. Click <strong>Accept Handoff</strong> to start chatting.</span>
                    </div>
                    <button
                      onClick={handleAcceptHandoff}
                      className="px-3 py-1 rounded-xl bg-amber-600 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      Accept
                    </button>
                  </div>
                )}

                {currentMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === 'live_agent'
                        ? 'justify-end'
                        : m.role === 'customer'
                        ? 'justify-start'
                        : 'justify-center'
                    }`}
                  >
                    {m.role === 'system' ? (
                      <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-semibold text-center max-w-md">
                        {m.text}
                      </div>
                    ) : (
                      <div
                        className={`p-3 rounded-2xl max-w-[80%] text-xs shadow-2xs ${
                          m.role === 'live_agent'
                            ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                            : m.role === 'assistant'
                            ? 'bg-indigo-50 text-indigo-950 border border-indigo-200 rounded-bl-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        {m.role === 'assistant' && (
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
                            🤖 AI Assistant
                          </span>
                        )}
                        <p className="leading-relaxed">{m.text}</p>
                        <span
                          className={`text-[9px] block text-right mt-1 font-semibold ${
                            m.role === 'live_agent'
                              ? 'text-indigo-200'
                              : m.role === 'assistant'
                              ? 'text-indigo-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {m.role === 'live_agent' ? 'You' : m.role === 'customer' ? 'Customer' : 'AI'} · {m.createdAt}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    isWaiting
                      ? 'Accept handoff above to reply to customer...'
                      : activeSession.status === 'CLOSED'
                      ? 'This conversation is closed.'
                      : 'Type message to customer...'
                  }
                  disabled={isWaiting || activeSession.status === 'CLOSED'}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isWaiting || !inputText.trim() || activeSession.status === 'CLOSED'}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 text-xs">
              <MessageSquare className="w-10 h-10 mb-2" />
              <span>Select a customer session from the queue to start live assistance.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
