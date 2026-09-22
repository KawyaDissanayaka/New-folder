import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { Sparkles, ArrowRight, Shield, MessageSquare, Zap, Cpu } from 'lucide-react';

export default function StartPage() {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center font-sans relative overflow-x-hidden bg-gradient-mesh selection:bg-indigo-500 selection:text-white">
      {/* STEP 1 SCREEN */}
      {step === 1 && (
        <div className="fixed inset-0 min-h-screen w-full bg-gradient-mesh flex flex-col justify-between items-center p-4 sm:p-8 md:p-10 overflow-y-auto z-10">
          
          {/* Floating Gateway Icons */}
          <div className="absolute top-12 left-8 md:left-24 z-0 pointer-events-none opacity-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-14 h-14 md:w-20 md:h-20 drop-shadow-md animate-pulse"
            />
          </div>
          <div className="absolute top-12 right-8 md:right-24 z-0 pointer-events-none opacity-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Messenger_logo_2020.svg"
              alt="Messenger"
              className="w-14 h-14 md:w-20 md:h-20 drop-shadow-md animate-pulse"
            />
          </div>

          {/* High-Visibility Co-Branding Header */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-5xl mx-auto pt-2 px-4 gap-4">
            {/* Primary Parent Brand Logo */}
            <div className="flex items-center gap-3 bg-white p-2.5 px-5 rounded-2xl shadow-md border border-slate-200">
              <img src="/slt-mobitel-logo.jpg" alt="SLT-MOBITEL" className="h-9 sm:h-11 object-contain" />
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 tracking-tight leading-none">SLT-MOBITEL</span>
                <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase mt-0.5">Sri Lanka Telecom PLC</span>
              </div>
            </div>

            {/* Innovation Partner Badge */}
            <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-2xl border border-slate-200 shadow-md">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest hidden sm:inline">Partnered with</span>
              <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="h-8 sm:h-10 object-contain" />
            </div>
          </div>

          {/* Main Title & Description Header */}
          <div className="relative z-10 text-center max-w-3xl mx-auto my-auto pt-6 pb-4">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 rounded-full text-indigo-700 text-xs font-extrabold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>SLT Innovation Centre Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Omni Channel AI Agent
            </h1>
            <p className="text-slate-700 text-base sm:text-lg font-bold mt-3 leading-relaxed">
              One Platform. Every Channel. Smarter Customer Support.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-2 max-w-2xl mx-auto leading-relaxed">
              Delivering secure, AI-powered customer support across Web, WhatsApp, SMS, and Facebook Messenger from one centralized platform.
            </p>
          </div>

          {/* 3 High Contrast Light Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto my-auto py-4">
            {/* Card 1 */}
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-4 border border-indigo-100 group-hover:scale-110 transition-transform">
                <Cpu size={32} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                AI Customer Assistant
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Provide intelligent, real-time assistance to customer service agents by understanding requests and automating tasks.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group">
              <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 mb-4 border border-purple-100 group-hover:scale-110 transition-transform">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                Multi-Channel Gateway
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Manage customer interactions seamlessly across Web, WhatsApp, SMS, and Facebook Messenger in real-time.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group">
              <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 mb-4 border border-emerald-100 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                Usage &amp; Analytics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Monitor message volume, response times, and customer satisfaction metrics with real-time visual dashboards.
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="relative z-10 my-auto pt-4 pb-6">
            <button
              onClick={() => setStep(2)}
              className="rounded-full px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Footer Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 pt-4">
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <span className="text-slate-300">•</span>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <span className="text-slate-300">•</span>
            <a href="/contact" className="hover:text-indigo-600 transition-colors">Support</a>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-bold">© 2026 SLT-MOBITEL &amp; The Embryo Innovation Centre.</span>
          </div>
        </div>
      )}

      {/* STEP 2 SCREEN */}
      {step === 2 && (
        <div className="fixed inset-0 min-h-screen w-full bg-gradient-mesh flex flex-col justify-between items-center p-4 sm:p-8 md:p-10 overflow-y-auto z-10">
          
          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-4xl mx-auto pt-2 px-4 gap-4">
            <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-2xl shadow-md border border-slate-200">
              <img src="/slt-mobitel-logo.jpg" alt="SLT-MOBITEL" className="h-9 sm:h-10 object-contain" />
              <div className="w-px h-6 bg-slate-200" />
              <span className="text-xs font-black text-slate-900">OmniAI Platform</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white p-2 px-3.5 rounded-2xl border border-slate-200 shadow-md">
                <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="h-8 object-contain" />
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                &larr; Back
              </button>
            </div>
          </div>

          {/* Header Title */}
          <div className="relative z-10 text-center max-w-3xl mx-auto pt-6 pb-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Select Your Access Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-bold mt-2">
              Choose your profile type to continue into the OmniAI workspace
            </p>
          </div>

          {/* 2 Portal Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mx-auto my-auto py-6">
            {/* Card 1: Internal Employee */}
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:border-indigo-300 transition-all duration-300">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-4 border border-indigo-100">
                <Shield size={40} />
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Internal Staff Portal
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-xs font-medium">
                For SLT-Mobitel internal customer service agents and system administrators.
              </p>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/login')}
                className="rounded-xl py-3.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Staff Login</span>
                <ArrowRight size={16} />
              </Button>
            </div>

            {/* Card 2: External Partner / Customer */}
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:border-indigo-300 transition-all duration-300">
              <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 mb-4 border border-purple-100">
                <Cpu size={40} />
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Enterprise Client Portal
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-xs font-medium">
                For corporate clients, business partners, and registered tenant accounts.
              </p>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/login')}
                className="rounded-xl py-3.5 font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Client Portal</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 pt-4">
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <span className="text-slate-300">•</span>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <span className="text-slate-300">•</span>
            <a href="/contact" className="hover:text-indigo-600 transition-colors">Support</a>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-bold">© 2026 SLT-MOBITEL &amp; The Embryo Innovation Centre.</span>
          </div>
        </div>
      )}
    </div>
  );
}
