import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Bot, MessageSquare, ArrowRight, ShieldCheck, Zap, Globe, Smartphone, Database, Wrench, Headset, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 py-6 font-sans">
      
      {/* Co-Branding Banner Pill */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-xl px-5 py-2 rounded-full border border-slate-200/90 shadow-md">
          <div className="w-16 h-6 overflow-hidden flex items-center justify-center rounded-lg bg-white">
            <img src="/slt-mobitel-logo.jpg" alt="SLT Mobitel" className="w-full h-full object-cover scale-[1.5]" />
          </div>
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">SLT-MOBITEL</span>
          <div className="w-px h-4 bg-slate-300" />
          <div className="h-5 w-20 overflow-hidden flex items-center justify-center">
            <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Tenant-Isolated AI Customer Operations</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Every customer gets an answer.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Your teams stay in control.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold max-w-xl">
              Build AI agents grounded in your company Bedrock knowledge bases, connect approved MCP tools, and seamlessly move high-value conversations to a human—inside one governed workspace.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Create Company Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/chat/slt/customer-care"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>Try Customer Experience</span>
              </Link>
            </div>

            <div className="flex items-center gap-5 text-xs text-slate-500 font-semibold pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Admin included</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Live Agent seat</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Expand anytime</span>
            </div>
          </div>

          {/* Right Column: Interactive Product Window Preview Shell */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-left">
              {/* Window Title Bar */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[11px] text-slate-400 font-sans font-bold">slt-digital.omni.ai</span>
                <div className="w-8" />
              </div>

              {/* Preview Shell Interior */}
              <div className="grid grid-cols-12 text-xs">
                {/* Mini Sidebar */}
                <div className="col-span-4 bg-slate-950/50 p-4 border-r border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-white font-sans font-bold text-xs">
                    <span className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-[10px]">SM</span>
                    <span>SLT Workspace</span>
                  </div>
                  <nav className="space-y-1 text-slate-400 font-sans text-[11px] font-medium">
                    <div className="px-2 py-1 rounded-lg bg-indigo-600/30 text-cyan-300 font-bold">Overview</div>
                    <div className="px-2 py-1 hover:text-white">AI Agents</div>
                    <div className="px-2 py-1 hover:text-white">Knowledge</div>
                    <div className="px-2 py-1 hover:text-white">Tools & Forms</div>
                    <div className="px-2 py-1 hover:text-white">Live Agents</div>
                  </nav>
                </div>

                {/* Mini Main Area */}
                <div className="col-span-8 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 font-sans font-extrabold uppercase">GOOD MORNING</span>
                      <strong className="text-white font-sans text-xs block">Customer Operations</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-sans font-bold">
                      Operational
                    </span>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 font-sans block">Active Agents</span>
                      <b className="text-white text-sm">04</b>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 font-sans block">Resolution</span>
                      <b className="text-emerald-400 text-sm">89%</b>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 font-sans block">Handoffs</span>
                      <b className="text-cyan-400 text-sm">18</b>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-[10px] font-sans">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Live Stream</span>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="truncate"><strong>Care Assistant</strong> resolved customer fiber inquiry</span>
                      <span className="text-slate-500 shrink-0">Now</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="truncate"><strong>Live Agent</strong> accepted billing handoff</span>
                      <span className="text-slate-500 shrink-0">2m</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="truncate"><strong>Bedrock KB</strong> synchronized 14 documents</span>
                      <span className="text-slate-500 shrink-0">8m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Industry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
            ENTERPRISE GRADE ARCHITECTURE
          </span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <span>Telecom & Broadband</span>
            <span>Financial Services</span>
            <span>Healthcare</span>
            <span>Retail & E-commerce</span>
            <span>Public Sector</span>
          </div>
        </div>
      </div>

      {/* 4 Feature Pillars (From MVP) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
            ONE CONTROL PLANE
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            From first answer to human resolution
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Give every company a private operating boundary while your platform stays observable, grounded, and serverless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Agent Studio</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Configure main and specialist agents, prompts, Amazon Nova models, guardrails, and published customer URLs.
            </p>
            <Link to="/agents" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2">
              <span>Build an agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Grounded Knowledge</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Upload company documents into tenant-scoped S3 prefixes and Bedrock Knowledge Bases for RAG answers.
            </p>
            <Link to="/knowledge" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2">
              <span>Explore knowledge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Governed Tools</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Connect HTTPS APIs, AgentCore MCP capabilities, and structured interactive forms only to approved agents.
            </p>
            <Link to="/tools" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2">
              <span>See tool controls</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Headset className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">Human Handoff</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Route complex inquiries into a private company queue with presence, assignment, and full transcript history.
            </p>
            <Link to="/agent/console" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-2">
              <span>View live console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Enterprise Security & Tenant Boundary Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-indigo-900/50 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
              ENTERPRISE FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Isolation is an authorization rule, not a prompt.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tenant identity comes from verified Cognito claims and trusted URL mappings. The browser or client never decides which company data an agent can access.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">01</span>
                <span>Server-generated tenant IDs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">02</span>
                <span>Tenant-keyed data partitions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">03</span>
                <span>Immutable user assignment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">04</span>
                <span>Audited control-plane actions</span>
              </div>
            </div>
          </div>

          {/* Boundary Visual Card */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-indigo-500/30 p-6 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] text-slate-400 font-sans font-bold">COMPANY BOUNDARY</span>
              <strong className="text-cyan-300 font-bold">SLT-Mobitel Corp</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Identity:</span>
              <span className="text-emerald-400">Cognito claims verified</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Knowledge:</span>
              <span className="text-emerald-400">Private Bedrock KB + S3</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Tools:</span>
              <span className="text-emerald-400">Approved connections only</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Messages:</span>
              <span className="text-emerald-400">Tenant session encrypted</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
