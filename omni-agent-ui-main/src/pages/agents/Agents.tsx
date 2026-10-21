import React, { useState, useEffect } from 'react';
import { Bot, Shield, Play, Terminal, Cpu, Database, CheckCircle2, AlertTriangle, RefreshCw, Send, Plus, ArrowLeft, Building2, X, ExternalLink, Edit2, Trash2, Sparkles, MessageSquare } from 'lucide-react';
import ToastContainer, { type ToastMessage } from '@/components/Toast';

export interface AIAgent {
  agentId: string;
  displayName: string;
  brandName: string;
  publicAgentKey: string;
  status: 'PUBLISHED' | 'DRAFT';
  modelId: string;
  knowledgeBaseRef?: string;
  toolIds: string[];
  enabledSubAgents: string[];
  welcomeMessage: string;
  systemPrompt: string;
  suggestedPrompts: string[];
}

export default function Agents() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      agentId: 'agent-care',
      displayName: 'Customer Care Specialist',
      brandName: 'SLT-MOBITEL',
      publicAgentKey: 'customer-care',
      status: 'PUBLISHED',
      modelId: 'amazon.nova-lite-v1:0',
      knowledgeBaseRef: 'kb-products',
      toolIds: ['tool-ticket', 'form-lead', 'tool-bill-lookup'],
      enabledSubAgents: ['general', 'sales', 'billing', 'technical', 'lead'],
      welcomeMessage: 'Hello! I am your SLT-Mobitel AI Care Assistant. How can I assist you with your broadband or services today?',
      systemPrompt: 'You are an official customer care assistant for SLT-Mobitel. Answer using approved grounded company information.',
      suggestedPrompts: ['Explore Fiber packages', 'Check my bill balance', 'Technical troubleshooting', 'Talk to a human agent'],
    },
    {
      agentId: 'agent-sales',
      displayName: 'Broadband & Enterprise Sales Guide',
      brandName: 'SLT-MOBITEL',
      publicAgentKey: 'sales-guide',
      status: 'DRAFT',
      modelId: 'amazon.nova-lite-v1:0',
      knowledgeBaseRef: 'kb-products',
      toolIds: ['form-lead', 'tool-order'],
      enabledSubAgents: ['general', 'sales', 'lead'],
      welcomeMessage: 'Welcome! Let us help you find the perfect high-speed broadband package for your home or business.',
      systemPrompt: 'Assist customers in choosing the optimal connectivity tier and collect lead details.',
      suggestedPrompts: ['Compare unlimited packages', 'New connection offers', 'Contact sales specialist'],
    },
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Test Drawer State
  const [showTestDrawer, setShowTestDrawer] = useState(false);
  const [testingAgent, setTestingAgent] = useState<AIAgent | null>(agents[0]);
  const [testMessages, setTestMessages] = useState<Array<{ id: number; sender: 'user' | 'bot'; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTestSending, setIsTestSending] = useState(false);

  // Create / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    brandName: 'SLT-MOBITEL',
    publicAgentKey: '',
    modelId: 'amazon.nova-lite-v1:0',
    knowledgeBaseRef: 'kb-products',
    suggestedPrompts: 'Explore packages, Check my bill, Technical help, Talk to person',
    welcomeMessage: 'Hi! How can I assist you today?',
    systemPrompt: 'Answer queries using approved knowledge bases and approved tool invocations.',
    toolIds: ['tool-ticket', 'form-lead'],
    enabledSubAgents: ['general', 'sales', 'billing', 'technical', 'lead'],
  });

  const availableKBs = [
    { id: 'kb-products', name: 'Products & Packages' },
    { id: 'kb-support', name: 'Support & Troubleshooting' },
    { id: 'kb-billing', name: 'Billing Policies' },
  ];

  const availableTools = [
    { id: 'tool-ticket', name: 'Create Support Ticket (MCP)' },
    { id: 'tool-order', name: 'Check Order & Fault Status (API)' },
    { id: 'form-lead', name: 'Sales Interest Form (Form)' },
    { id: 'tool-bill-lookup', name: 'Billing & Invoice Lookup (API)' },
  ];

  const openCreateModal = () => {
    setEditingAgent(null);
    setFormData({
      displayName: '',
      brandName: 'SLT-MOBITEL',
      publicAgentKey: '',
      modelId: 'amazon.nova-lite-v1:0',
      knowledgeBaseRef: 'kb-products',
      suggestedPrompts: 'Explore packages, Check my bill, Technical help, Talk to a person',
      welcomeMessage: 'Hello! I am your AI assistant. How can I help you today?',
      systemPrompt: 'Answer queries using approved knowledge bases and invoke authorized tools.',
      toolIds: ['tool-ticket', 'form-lead'],
      enabledSubAgents: ['general', 'sales', 'billing', 'technical', 'lead'],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (agent: AIAgent) => {
    setEditingAgent(agent);
    setFormData({
      displayName: agent.displayName,
      brandName: agent.brandName,
      publicAgentKey: agent.publicAgentKey,
      modelId: agent.modelId,
      knowledgeBaseRef: agent.knowledgeBaseRef || '',
      suggestedPrompts: agent.suggestedPrompts.join(', '),
      welcomeMessage: agent.welcomeMessage,
      systemPrompt: agent.systemPrompt,
      toolIds: agent.toolIds,
      enabledSubAgents: agent.enabledSubAgents,
    });
    setIsModalOpen(true);
  };

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName || !formData.publicAgentKey) {
      addToast('Please provide Agent Name and Public URL Key', 'error');
      return;
    }

    const cleanKey = formData.publicAgentKey.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const promptsArray = formData.suggestedPrompts
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const savedAgent: AIAgent = {
      agentId: editingAgent ? editingAgent.agentId : `agent-${Date.now()}`,
      displayName: formData.displayName,
      brandName: formData.brandName || 'SLT-MOBITEL',
      publicAgentKey: cleanKey,
      status: editingAgent ? editingAgent.status : 'DRAFT',
      modelId: formData.modelId,
      knowledgeBaseRef: formData.knowledgeBaseRef || undefined,
      toolIds: formData.toolIds,
      enabledSubAgents: formData.enabledSubAgents,
      welcomeMessage: formData.welcomeMessage,
      systemPrompt: formData.systemPrompt,
      suggestedPrompts: promptsArray,
    };

    if (editingAgent) {
      setAgents((prev) => prev.map((a) => (a.agentId === editingAgent.agentId ? savedAgent : a)));
      addToast(`AI Agent '${savedAgent.displayName}' updated!`, 'success');
    } else {
      setAgents((prev) => [savedAgent, ...prev]);
      addToast(`AI Agent '${savedAgent.displayName}' created!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handlePublish = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.agentId === agentId ? { ...a, status: 'PUBLISHED' } : a))
    );
    const agent = agents.find((a) => a.agentId === agentId);
    addToast(`Agent '${agent?.displayName}' is now PUBLISHED and live on public URL!`, 'success');
  };

  const handleDelete = (agentId: string) => {
    if (confirm('Delete this AI agent? Customer traffic to this public URL will be disconnected.')) {
      setAgents((prev) => prev.filter((a) => a.agentId !== agentId));
      addToast('AI Agent deleted', 'info');
    }
  };

  const startTestChat = (agent: AIAgent) => {
    setTestingAgent(agent);
    setTestMessages([
      { id: 1, sender: 'bot', text: agent.welcomeMessage },
    ]);
    setShowTestDrawer(true);
  };

  const handleSendTestMessage = (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = promptOverride || inputMessage.trim();
    if (!textToSend || !testingAgent) return;

    setTestMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setInputMessage('');
    setIsTestSending(true);

    setTimeout(() => {
      let reply = `[${testingAgent.displayName} - ${testingAgent.modelId}]: Thank you for your inquiry.`;
      const lower = textToSend.toLowerCase();

      if (lower.includes('package') || lower.includes('fiber') || lower.includes('plan')) {
        reply = `According to our grounded Bedrock Knowledge Base (${testingAgent.knowledgeBaseRef || 'KB-Products'}), SLT-Mobitel offers Fibre Flash 300Mbps (LKR 4,990) and Fibre Ultra 1Gbps (LKR 9,990) with zero line rental this month. Would you like me to open the sales form?`;
      } else if (lower.includes('bill') || lower.includes('balance') || lower.includes('pay')) {
        reply = `Invoking tool 'fetch_billing_summary'... Your current balance is LKR 3,450.00. Payment due by the 28th. Would you like a payment link?`;
      } else if (lower.includes('human') || lower.includes('person') || lower.includes('agent')) {
        reply = `I will transfer you to our live human support team right away. Escalate session created and routed to the Live Agent Queue!`;
      } else if (lower.includes('router') || lower.includes('troubleshoot') || lower.includes('fault')) {
        reply = `Knowledge Base Troubleshooting Guide: 1) Verify the PON light is solid green. 2) If LOS light is flashing red, fiber optical signal is disconnected. Would you like me to log a fault ticket?`;
      }

      setTestMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTestSending(false);
    }, 700);
  };

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto w-full">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-900/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-cyan-400 shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight">AI Agent Studio</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-cyan-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
                Amazon Nova & Bedrock
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Build and publish grounded AI agents with Bedrock knowledge bases, governed tools, and live handoff routing.
            </p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create AI Agent</span>
        </button>
      </div>

      {/* Agents Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">Configured AI Agents</h3>
            <p className="text-xs text-slate-500">Autonomous customer engagement and specialist routing endpoints</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black">
            {agents.length} Agents Configured
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5">Agent</th>
                <th className="py-3 px-5">Public Customer URL</th>
                <th className="py-3 px-5">Foundation Model</th>
                <th className="py-3 px-5">Knowledge & Tools</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {agents.map((agent) => (
                <tr key={agent.agentId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-black">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-sm font-black text-slate-900 block">{agent.displayName}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{agent.agentId} · {agent.brandName}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <a
                      href={`/chat/slt/${agent.publicAgentKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold group"
                    >
                      <span>/chat/slt/{agent.publicAgentKey}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </td>

                  <td className="py-4 px-5">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
                      {agent.modelId}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-700 block">
                        KB: <strong className="font-mono text-indigo-600">{agent.knowledgeBaseRef || 'None'}</strong>
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {agent.toolIds.length} Tools · {agent.enabledSubAgents.length} Sub-agents
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-max ${
                        agent.status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {agent.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => startTestChat(agent)}
                        className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Simulate / Test Agent"
                      >
                        <Play className="w-3 h-3" />
                        <span>Test</span>
                      </button>

                      {agent.status !== 'PUBLISHED' && (
                        <button
                          onClick={() => handlePublish(agent.agentId)}
                          className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={() => openEditModal(agent)}
                        className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Configure Agent"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(agent.agentId)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Agent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL: CREATE / EDIT AI AGENT === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {editingAgent ? 'Edit AI Agent' : 'Create AI Agent'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure prompt instructions, Bedrock model, knowledge, and tools</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveAgent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Customer Care Specialist"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Public URL Key * (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="customer-care"
                    value={formData.publicAgentKey}
                    onChange={(e) => setFormData({ ...formData, publicAgentKey: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Foundation Model
                  </label>
                  <select
                    value={formData.modelId}
                    onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  >
                    <option value="amazon.nova-lite-v1:0">Amazon Nova Lite (Fast & Cost Efficient)</option>
                    <option value="amazon.nova-pro-v1:0">Amazon Nova Pro (Complex Reasoning)</option>
                    <option value="anthropic.claude-3-haiku">Claude 3 Haiku (Bedrock)</option>
                    <option value="meta.llama3-8b-instruct">Llama 3 8B Instruct</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Connected Knowledge Base (RAG Grounding)
                </label>
                <select
                  value={formData.knowledgeBaseRef}
                  onChange={(e) => setFormData({ ...formData, knowledgeBaseRef: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="">None (No RAG grounding)</option>
                  {availableKBs.map((kb) => (
                    <option key={kb.id} value={kb.id}>
                      {kb.name} ({kb.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Suggested Prompts (Comma separated chips for customer chat)
                </label>
                <input
                  type="text"
                  placeholder="Explore packages, Check my bill, Technical help, Talk to person"
                  value={formData.suggestedPrompts}
                  onChange={(e) => setFormData({ ...formData, suggestedPrompts: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              {/* Tools Selection Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Authorized Governed Tools & Forms
                </label>
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  {availableTools.map((tool) => {
                    const isChecked = formData.toolIds.includes(tool.id);
                    return (
                      <label key={tool.id} className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, toolIds: [...formData.toolIds, tool.id] });
                            } else {
                              setFormData({ ...formData, toolIds: formData.toolIds.filter((id) => id !== tool.id) });
                            }
                          }}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                        />
                        <span>{tool.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Welcome Message
                </label>
                <textarea
                  rows={2}
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  System Prompt & Guardrail Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {editingAgent ? 'Save Changes' : 'Create Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === TEST SIMULATION DRAWER === */}
      {showTestDrawer && testingAgent && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">{testingAgent.displayName}</h3>
                <span className="text-[10px] text-slate-400 font-mono">Simulator · {testingAgent.modelId}</span>
              </div>
            </div>
            <button
              onClick={() => setShowTestDrawer(false)}
              className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
            >
              ×
            </button>
          </div>

          {/* Test Messages */}
          <div className="flex-1 p-4 bg-slate-50/50 overflow-y-auto space-y-3">
            {testMessages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isTestSending && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5 animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Thinking & querying Bedrock KB...</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Prompts Pills */}
          <div className="p-2 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {testingAgent.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendTestMessage(undefined, prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-[10px] font-bold whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Composer */}
          <form onSubmit={handleSendTestMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question or test tool invocation..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={isTestSending || !inputMessage.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
