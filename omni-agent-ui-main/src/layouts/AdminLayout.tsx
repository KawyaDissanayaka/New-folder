import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Code2,
  SlidersHorizontal,
  Bot,
  Settings,
  Users,
  Bell,
  Search,
  Building2,
  ShieldCheck,
  LogOut,
  MessageSquare,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import ChatBotWidget from "../components/ChatBotWidget";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isAdminMode = location.pathname.startsWith("/admin");

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const companyNavItems = [
    { name: "Dash-Board", path: "/dashboard", icon: LayoutGrid },
    { name: "Live ChatBot", path: "/chat", icon: MessageSquare },
    { name: "Manage Customers", path: "/users", icon: Users },
    { name: "API", path: "/api", icon: Code2 },
    { name: "Channels", path: "/channels", icon: SlidersHorizontal },
    { name: "AI Agents", path: "/agents", icon: Bot },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const adminNavItems = [
    { name: "Super Admin Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
    { name: "Live ChatBot", path: "/admin/chat", icon: MessageSquare },
    { name: "Organization Mgmt", path: "/admin/organizations", icon: Building2 },
    { name: "API Management", path: "/admin/api", icon: Code2 },
    { name: "Channels Management", path: "/admin/channels", icon: SlidersHorizontal },
    { name: "AI Agent Management", path: "/admin/agents", icon: Bot },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const navItems = isAdminMode ? adminNavItems : companyNavItems;

  return (
    <div className="flex min-h-screen bg-slate-100/90 text-slate-800 font-sans relative">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* === SIDEBAR (Light Modern Theme) === */}
      <aside
        className={`w-[270px] bg-white text-slate-800 flex flex-col fixed h-full top-0 border-r border-slate-200 z-40 transition-transform duration-300 shadow-sm ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Primary Corporate Logo Header */}
        <div className="pt-5 pb-4 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <Link to="/" className="flex items-center gap-3">
            <img src="/slt-mobitel-logo.jpg" alt="SLT-Mobitel" className="h-8 object-contain" />
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 tracking-tight leading-none">OmniAI</span>
              <span className="text-[9px] font-bold text-indigo-600 tracking-wider uppercase mt-0.5">
                {isAdminMode ? "Super Admin" : "Workspace"}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => {
              setIsMobileSidebarOpen(false);
              navigate(isAdminMode ? "/dashboard" : "/admin/dashboard");
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200/60 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Switch to {isAdminMode ? "Company Mode" : "Super Admin Mode"}</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 pt-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`group flex items-center gap-3 h-10 w-full px-3 text-xs font-semibold transition-all duration-150 rounded-xl cursor-pointer ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-lg shrink-0 transition-all ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-indigo-600 group-hover:bg-indigo-50 group-hover:text-indigo-700"
                  }`}
                >
                  <Icon size={15} strokeWidth={2} />
                </div>
                <span className="truncate tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/40">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-600" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* === MAIN CONTENT AREA === */}
      <div className="flex-1 md:ml-[270px] flex flex-col min-h-screen w-full min-w-0 bg-gradient-mesh">
        {/* Top Navbar Header (Clean White Bar) */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            >
              <Menu size={18} />
            </button>

            <div className="relative w-40 sm:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search resources, agents, companies..."
                className="w-full h-9 pl-10 pr-4 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-xs font-semibold">
            {/* Innovation Partner Badge (Top Right Header) */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Partnered with</span>
              <div className="w-px h-4 bg-slate-200" />
              <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="h-6 object-contain" />
            </div>

            <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all cursor-pointer">
              <Bell size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-0.5 sm:mx-1" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                {isAdminMode ? "SA" : "CA"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-bold text-slate-900 leading-tight">
                  {isAdminMode ? "Super Admin" : "Company Admin"}
                </span>
                <span className="text-[10px] text-indigo-600 font-extrabold tracking-wider">
                  {isAdminMode ? "System Root" : "Acme Corp Workspace"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>

        {/* === CORPORATE FOOTER === */}
        <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600 text-xs">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Branding & Description */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <img src="/slt-mobitel-logo.jpg" alt="SLT-Mobitel" className="h-7 object-contain" />
                <div className="w-px h-5 bg-slate-300" />
                <img src="/the-embryo-logo.jpg" alt="The Embryo Innovation Centre" className="h-6 object-contain" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                OmniAI Platform is an enterprise multi-channel AI customer engagement platform developed in partnership with SLT-Mobitel &amp; The Embryo Innovation Centre.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>SLT Digital Innovation Centre</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link></li>
                <li><Link to="/chat" className="hover:text-indigo-600 transition-colors">Live ChatBot</Link></li>
                <li><Link to="/channels" className="hover:text-indigo-600 transition-colors">Omni Channels</Link></li>
                <li><Link to="/agents" className="hover:text-indigo-600 transition-colors">AI Agents</Link></li>
                <li><Link to="/api" className="hover:text-indigo-600 transition-colors">API Management</Link></li>
              </ul>
            </div>

            {/* Col 3: Resources & Compliance */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#docs" className="hover:text-indigo-600 transition-colors flex items-center gap-1">API Docs <ExternalLink size={12} /></a></li>
                <li><a href="#status" className="hover:text-indigo-600 transition-colors flex items-center gap-1">System Status <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1" /></a></li>
                <li><a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#security" className="hover:text-indigo-600 transition-colors flex items-center gap-1"><Shield size={12} /> Security &amp; ISO Compliance</a></li>
              </ul>
            </div>

            {/* Col 4: Support & Contact */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Support &amp; Location</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Sri Lanka Telecom PLC,<br />
                Lotus Road, P.O. Box 503,<br />
                Colombo 01, Sri Lanka.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <HelpCircle size={14} className="text-indigo-600" />
                <span>Support: support@slt.lk</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-slate-100 bg-slate-50 py-4 px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <p>© 2026 SLT-Mobitel &amp; The Embryo Innovation Centre. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy</a>
                <span>•</span>
                <a href="#terms" className="hover:text-slate-800 transition-colors">Terms</a>
                <span>•</span>
                <a href="#contact" className="hover:text-slate-800 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating ChatBot Assistant Widget */}
      <ChatBotWidget />
    </div>
  );
}
