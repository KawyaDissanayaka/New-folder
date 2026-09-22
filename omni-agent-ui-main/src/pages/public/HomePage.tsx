import { useNavigate } from 'react-router-dom';
import { Sparkles, Bot, MessageSquare, ArrowRight, ShieldCheck, Zap, Globe, Smartphone } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-6 font-sans">
      
      {/* Co-Branding Banner Pill */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-full border border-slate-200/90 shadow-md">
          {/* SLT Mobitel Logo Box */}
          <div className="w-20 h-7 overflow-hidden flex items-center justify-center rounded-lg bg-white">
            <img src="/slt-mobitel-logo.jpg" alt="SLT Mobitel" className="w-full h-full object-cover scale-[1.5]" />
          </div>
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">SLT-MOBITEL</span>
          <div className="w-px h-5 bg-slate-300" />
          {/* Embryo Logo Box */}
          <div className="h-6 w-24 overflow-hidden flex items-center justify-center">
            <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="w-full h-full object-contain scale-[1.2]" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Experience the Power of{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
              Omni AI Agents
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold max-w-2xl">
            Transform customer engagement with our{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
              Omni Channel AI Platform
            </span>
            . Manage conversations across WhatsApp, Messenger, SMS, Web, and Email seamlessly from a unified intelligent workspace.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl border border-slate-200/90 shadow-lg flex items-center justify-between gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                  OMNI CHANNEL SUPPORT
                </span>
                <span className="text-xs font-black text-slate-900">
                  Connect all customer channels with AI agents
                </span>
              </div>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs shadow-md hover:shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Hero Mockup Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ONLINE 24/7</span>
            </div>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-md">
              <Bot className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Omni AI Assistant
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                Automating customer inquiries with contextual intelligence across multi-tenant workspaces.
              </p>
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-black text-slate-800">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><MessageSquare className="w-4 h-4" /></span>
                <span>WhatsApp Agent</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-black text-slate-800">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><MessageSquare className="w-4 h-4" /></span>
                <span>Messenger Agent</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-black text-slate-800">
                <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600"><Smartphone className="w-4 h-4" /></span>
                <span>SMS Agent</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-black text-slate-800">
                <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600"><Globe className="w-4 h-4" /></span>
                <span>Web Agent</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Grid Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">
            ENTERPRISE CAPABILITIES
          </span>
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-3">
            Why Choose Omni AI Platform?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 font-semibold">
            Engineered by SLT Digital Lab and The Embryo Innovation Centre for seamless organizational scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-lg space-y-4 hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Knowledge Base
            </h3>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              Index website URLs, documents, and corporate data to power specialized AI responses.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-lg space-y-4 hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Multi-Tenant Isolation
            </h3>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              Dedicated company sandboxes ensuring strict data governance and privacy protection.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 shadow-lg space-y-4 hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Omnichannel Gateway
            </h3>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              Route inquiries automatically to specialized agents across WhatsApp, Messenger, SMS, and Web.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
