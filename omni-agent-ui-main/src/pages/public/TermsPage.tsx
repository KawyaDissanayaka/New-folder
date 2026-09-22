import { useState } from 'react';
import { FileText, ShieldCheck, UserCheck, Key } from 'lucide-react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('definitions');

  const sections = [
    { id: 'definitions', label: '1. Definitions', icon: FileText },
    { id: 'access', label: '2. Access and Use', icon: ShieldCheck },
    { id: 'accounts', label: '3. User Accounts', icon: UserCheck },
    { id: 'roles', label: '4. Role Management', icon: Key },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      {/* Title Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Last Updated: June 30, 2026 | Please read these terms carefully before using our platform.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl text-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 sticky top-28">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-4 pb-3 border-b border-slate-200">
            Content Outline
          </h3>

          <nav className="space-y-2">
            {sections.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section Content Cards */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Definitions */}
          <div id="definitions" className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-indigo-600 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              1. Definitions
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <p>
                <strong className="text-slate-900 font-black">Omni Agent Store:</strong> Refers to the multi-tenant AI platform owned and operated by SLT Digital Lab for the creation and management of custom AI agents.
              </p>
              <p>
                <strong className="text-slate-900 font-black">User:</strong> You, or Your refers to any individual accessing a company workspace or using agents within an authorized tenant.
              </p>
              <p>
                <strong className="text-slate-900 font-black">Custom Agents:</strong> Specialized AI tools created, configured, and managed by individual company administrators for their specific business needs.
              </p>
              <p>
                <strong className="text-slate-900 font-black">Workspace:</strong> Refers to the isolated environment granted to a registered company for managing its users and agents.
              </p>
            </div>
          </div>

          {/* 2. Access and Use */}
          <div id="access" className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-indigo-600 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              2. Access and Use
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <p>
                Access to the platform is strictly restricted to registered company workspaces and their authorized members.
              </p>
              <p>
                • <strong className="text-slate-900 font-black">Workspace Registration:</strong> Companies must register and be approved by the system administrator to gain access.
              </p>
              <p>
                • <strong className="text-slate-900 font-black">Agent Management:</strong> Administrators within a workspace have the authority to create, configure, and delete custom AI agents.
              </p>
              <p>
                • <strong className="text-slate-900 font-black">User Access:</strong> Access to custom agents is granted based on the roles assigned by workspace administrators.
              </p>
              <p>
                • <strong className="text-slate-900 font-black">Resource Usage:</strong> Users must use the platform resources in compliance with these terms and their respective company policies.
              </p>
            </div>
          </div>

          {/* 3. User Accounts */}
          <div id="accounts" className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-indigo-600 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              3. User Accounts &amp; Credentials
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <p>
                Users are responsible for maintaining the confidentiality of their login credentials. Any activity conducted under a user account is the sole responsibility of the account holder.
              </p>
              <p>
                Workspaces must notify platform administrators immediately upon discovering any security breach or unauthorized access to their tenant.
              </p>
            </div>
          </div>

          {/* 4. Role Management */}
          <div id="roles" className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-indigo-600 mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600" />
              4. Role Management &amp; Governance
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <p>
                The platform enforces strict Role-Based Access Control (RBAC). Super Administrators maintain root system privileges while Company Admins govern isolated organization workspaces.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
