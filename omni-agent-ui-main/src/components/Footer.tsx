import { Link } from 'react-router-dom';
import { Sparkles, ExternalLink, Shield, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 text-slate-600 text-xs relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: High Visibility Branding & Description */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-14 h-10 overflow-hidden flex items-center justify-center rounded-xl bg-white border border-slate-100">
              <img 
                src="/slt-mobitel-logo.jpg" 
                alt="SLT-MOBITEL" 
                className="w-full h-full object-cover scale-[1.5]" 
              />
            </div>
            <div className="w-px h-7 bg-slate-200" />
            <div className="h-9 w-28 overflow-hidden flex items-center justify-center rounded-lg bg-white">
              <img 
                src="/the-embryo-logo.jpg" 
                alt="The Embryo Innovation Centre" 
                className="w-full h-full object-contain scale-[1.25]" 
              />
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            OmniAI Platform is an enterprise multi-channel AI customer engagement platform developed in partnership with SLT-Mobitel &amp; The Embryo Innovation Centre.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-extrabold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>SLT Digital Innovation Centre</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><Link to="/home" className="hover:text-indigo-600 text-slate-600 transition-colors">Home Page</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-600 text-slate-600 transition-colors">Company Dashboard</Link></li>
            <li><Link to="/chat" className="hover:text-indigo-600 text-slate-600 transition-colors">Live ChatBot</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-600 text-slate-600 transition-colors">Pricing &amp; Plans</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600 text-slate-600 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 3: Resources & Compliance */}
        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button 
                onClick={() => alert("API Documentation v2.4\nComprehensive OpenAPI specs and SDK guides for SLT-Mobitel Developers.")} 
                className="hover:text-indigo-600 text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                API Docs <ExternalLink size={12} />
              </button>
            </li>
            <li>
              <button 
                onClick={() => alert("System Status: All Services Operational (100% Uptime)\n- WhatsApp Gateway: Online\n- Messenger Gateway: Online\n- SMS Gateway: Online")} 
                className="hover:text-indigo-600 text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                System Status <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1 animate-pulse" />
              </button>
            </li>
            <li><Link to="/terms" className="hover:text-indigo-600 text-slate-600 transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-600 text-slate-600 transition-colors">Privacy Policy</Link></li>
            <li>
              <button 
                onClick={() => alert("Security Compliance: ISO/IEC 27001 Certified & GDPR Compliant Data Encryption.")}
                className="hover:text-indigo-600 text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Shield size={12} className="text-indigo-600" /> Security &amp; ISO Compliance
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Location */}
        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">Support &amp; Location</h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">
            Sri Lanka Telecom PLC,<br />
            Lotus Road, P.O. Box 503,<br />
            Colombo 01, Sri Lanka.
          </p>
          <a 
            href="mailto:support@slt.lk" 
            className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
          >
            <HelpCircle size={14} />
            <span>Support: support@slt.lk</span>
          </a>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-200/80 bg-slate-100/70 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 font-semibold">
          <p>© 2026 SLT-Mobitel &amp; The Embryo Innovation Centre. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
