import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Shield, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/authStore';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('superadmin@slt.lk');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Link */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-sm">
            E
          </div>
          <span className="font-extrabold text-lg tracking-tight">OmniAI <span className="text-xs text-purple-400 font-bold">SUPER ADMIN</span></span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </header>

      {/* Main Login Card (Matching Image 1) */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 my-16">
        
        {/* Left Column: Empower Your Workspace Promo */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-purple-400 p-1 flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Empower Your Workspace</h2>
              <p className="text-xs text-slate-500 mt-1">SLT Global Platform Super Admin Portal.</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Shield className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Own Workspace</h4>
                  <p className="text-[10px] text-slate-500">Create your own organization workspace, add institutions, and manage users.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <Bot className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Total Omnichannel</h4>
                  <p className="text-[10px] text-slate-500">Connect with customer via SLT WhatsApp, Messenger, Web, and SMS AI Gateway Router.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-[10px] text-slate-400 border-t border-slate-200/60">
            <span>Powered by SLT Global Platform Node 01</span>
          </div>
        </div>

        {/* Right Column: Super Admin Login Form */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Super Admin</h2>
            <p className="text-xs text-slate-500">Sign in with your company cloud to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Work Email"
              type="email"
              placeholder="superadmin@slt.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-purple-600"
                />
                <span>Keep me logged in</span>
              </label>

              <Link to="/forget-password" className="font-bold text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-2xl py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 font-black text-xs uppercase tracking-wider text-white shadow-lg"
            >
              SIGN IN
            </Button>
          </form>

          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase">OR</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { login(); navigate('/admin/dashboard'); }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2"
            >
              <span>Google</span>
            </button>
            <button
              onClick={() => { login(); navigate('/admin/dashboard'); }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2"
            >
              <span>Microsoft</span>
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2">
            <span>Don't have an admin account? </span>
            <Link to="/register-admin" className="font-bold text-purple-600 hover:underline">
              Register here
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
