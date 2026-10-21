import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Building2, User, CheckCircle2, ArrowRight, ShieldCheck, Lock, RotateCcw, Sparkles } from 'lucide-react';
import ToastContainer, { type ToastMessage } from '@/components/Toast';

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    adminEmail: '',
    liveAgentName: '',
    liveAgentEmail: '',
    acceptedTerms: false,
    otpCode: '',
  });

  // Generated Workspace result
  const [workspaceResult, setWorkspaceResult] = useState({
    tenantSlug: '',
    tenantId: '',
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.adminName || !formData.adminEmail || !formData.liveAgentName || !formData.liveAgentEmail) {
      addToast('Please complete all required fields.', 'error');
      return;
    }
    if (!formData.acceptedTerms) {
      addToast('Please agree to platform terms to proceed.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      addToast('Verification code sent to your work email.', 'success');
    }, 700);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otpCode || formData.otpCode.length < 4) {
      addToast('Please enter the verification code.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const slug = formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15);
      const generatedTenantId = `ten_${slug}_${Math.floor(1000 + Math.random() * 9000)}`;

      setWorkspaceResult({
        tenantSlug: `${slug}-workspace`,
        tenantId: generatedTenantId,
      });

      setStep(3);
      addToast('Tenant boundary generated and accounts provisioned!', 'success');
    }, 900);
  };

  const maskedEmail = formData.adminEmail
    ? formData.adminEmail.replace(/^(.{2}).*(@.*)$/, '$1***$2')
    : 'admin@company.com';

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Main Card */}
      <div className="relative z-10 max-w-5xl w-full mx-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Intro Panel */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#081a34] via-[#0c2448] to-[#081a34] text-white p-8 flex flex-col justify-between relative">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-md">
                SLT
              </div>
              <span className="font-black text-sm tracking-tight">SLT-MOBITEL</span>
            </Link>

            <div className="space-y-3 pt-4">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-cyan-300 border border-indigo-400/30 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure Company Onboarding</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight">
                Create your private AI operations workspace.
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Verify the company admin email once. We generate the tenant boundary and send secure Cognito invitations to both default users.
              </p>
            </div>

            {/* Starter Workspace Included Box */}
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3 text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                YOUR STARTER WORKSPACE INCLUDES
              </span>
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs">01</span>
                <div>
                  <strong className="text-white block">Company Admin Seat</strong>
                  <span className="text-slate-400 text-[11px]">Build agents, manage knowledge, tools, and teams.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs">01</span>
                <div>
                  <strong className="text-white block">Live Agent Seat</strong>
                  <span className="text-slate-400 text-[11px]">Accept and resolve live customer handoffs.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span>Encrypted at rest</span>
            <span>Server tenant ID</span>
            <span>Instant provisioning</span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          
          {/* Step Progress Dots */}
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-indigo-600' : step > 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 1 ? 'bg-indigo-600 text-white' : step > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span>Company</span>
              </div>
              <div className="w-6 h-px bg-slate-200" />
              <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-indigo-600' : step > 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 2 ? 'bg-indigo-600 text-white' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </span>
                <span>Verify</span>
              </div>
              <div className="w-6 h-px bg-slate-200" />
              <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span>Ready</span>
              </div>
            </div>

            <Link to="/login" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              Sign in
            </Link>
          </div>

          {/* Step 1: Company & Default Users */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 block">
                  STEP 1 OF 2
                </span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Company & Default Users</h2>
                <p className="text-xs text-slate-500">Use work emails that can receive Cognito user invitations.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Company Admin block */}
              <div className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    A
                  </span>
                  <span className="text-xs font-bold text-indigo-950">Default Company Admin</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Admin Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Admin Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@acme.com"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Live Agent block */}
              <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    L
                  </span>
                  <span className="text-xs font-bold text-emerald-950">Default Live Agent</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Live Agent Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sam Taylor"
                      value={formData.liveAgentName}
                      onChange={(e) => setFormData({ ...formData, liveAgentName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Live Agent Email</label>
                    <input
                      type="email"
                      required
                      placeholder="support@acme.com"
                      value={formData.liveAgentEmail}
                      onChange={(e) => setFormData({ ...formData, liveAgentEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 mt-0.5"
                />
                <span>I agree to the platform terms and acknowledge the tenant isolation notice.</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{isLoading ? 'Sending verification code...' : 'Send Verification Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Email OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 block">
                  STEP 2 OF 2
                </span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Verify your work email</h2>
                <p className="text-xs text-slate-500">
                  Enter the six-digit code sent to <strong className="text-slate-800 font-mono">{maskedEmail}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Verification Code (OTP)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={formData.otpCode}
                  onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                  className="w-full py-3.5 text-center font-mono text-2xl font-black tracking-widest bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-600 text-xs">
                After verification, temporary-password invitations are sent to the company admin and live agent.
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isLoading ? 'Creating secure boundary...' : 'Create Secure Workspace'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start over</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Workspace Ready */}
          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-2xl shadow-md">
                ✓
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">
                  WORKSPACE READY
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your company boundary is active.</h2>
                <p className="text-xs text-slate-500">Invitations were sent to both default users.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Workspace</span>
                <strong className="text-sm font-black text-slate-900 block">{workspaceResult.tenantSlug}</strong>
                <code className="text-xs font-mono text-indigo-600">{workspaceResult.tenantId}</code>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Continue to Admin Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-800 block">
                  Return to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
