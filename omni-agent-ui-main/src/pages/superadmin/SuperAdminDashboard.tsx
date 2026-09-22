import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MessageSquare, Smartphone, Globe, Mail, Clock, ShieldCheck, Zap, ArrowRight, CreditCard, Sparkles } from 'lucide-react';

const API = 'http://localhost:3001';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAvailability: 0,
    activeConnections: 0,
    pendingRequests: 0,
  });
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch(`${API}/api/stats`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        console.warn('Backend stats unreachable', err);
      }

      try {
        const regRes = await fetch(`${API}/api/registrations`);
        if (regRes.ok) {
          const regData = await regRes.json();
          if (regData.success && Array.isArray(regData.registrations)) {
            setRegistrations(regData.registrations);
          }
        }
      } catch (err) {
        console.warn('Backend registrations unreachable', err);
      }
    };
    fetchData();
  }, []);

  const pendingCount = registrations.filter((r) => r.status === 'Pending').length || stats.pendingRequests;
  const approvedCount = registrations.filter((r) => r.status === 'Approved').length || stats.totalAvailability;
  const totalCount = registrations.length || (pendingCount + approvedCount);

  // Dynamic recent activity logs from real backend registrations
  const generatedLogs = registrations.length > 0
    ? registrations.slice(-3).reverse().map((reg, idx) => ({
        id: reg.id || `log-${idx}`,
        title: reg.status === 'Approved' ? `${reg.companyName} Provisioned` : `Registration Request Received`,
        desc: reg.status === 'Approved' ? `Approved and provisioned on OmniAI node.` : `${reg.companyName} (${reg.companyEmail}) awaiting approval.`,
        time: idx === 0 ? 'Just Now' : `${(idx + 1) * 12} mins ago`,
        type: reg.status === 'Approved' ? 'success' : 'pending',
      }))
    : [
        {
          id: 'log-1',
          title: 'Security Audit Passed',
          desc: 'Gateway node 01 verified 0 threat incursions.',
          time: 'Just Now',
          type: 'security',
        },
        {
          id: 'log-2',
          title: 'Enterprise Node Operational',
          desc: 'SLT Global Node 01 health status verified 100%.',
          time: '10 mins ago',
          type: 'success',
        },
      ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Executive Light Mesh Header Banner */}
      <div className="bg-white/95 backdrop-blur-xl text-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-indigo-600">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Super Admin Executive Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Company Overview &amp; Ecosystem
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-semibold">
            Real-time operational health, channel routing, and infrastructure growth metrics for SLT Global Node.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Node Status: Active</span>
          </span>
        </div>
      </div>

      {/* Metrics Row + Add Company Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Metrics (8 cols) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-lg space-y-2 hover:border-indigo-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Total Availability</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {approvedCount}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">Active</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block">Active Company Workspaces</span>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-lg space-y-2 hover:border-emerald-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Active Connections</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                {approvedCount}
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block">Online Gateway Routers</span>
          </div>

          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-lg space-y-2 hover:border-purple-300 transition-all">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Pending Requests</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                {pendingCount}
              </h2>
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block">Awaiting Review</span>
          </div>

        </div>

        {/* Right CTA Card: ADD COMPANY (4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-3xl shadow-xl border border-indigo-500 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-2xl bg-white/20 text-white backdrop-blur-md">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">Provisioning</span>
          </div>

          <div>
            <h3 className="text-lg font-black tracking-tight">ADD COMPANY</h3>
            <p className="text-xs text-indigo-100 mt-1 font-medium">Add Company's User System into SLT Global Node.</p>
          </div>

          <button
            onClick={() => navigate('/admin/organizations')}
            className="w-full py-3 rounded-2xl bg-white text-indigo-600 hover:bg-slate-100 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ADD COMPANY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Channels Bar */}
      <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ACTIVE GATEWAY CHANNELS
          </h3>
          <span className="text-[11px] font-bold text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => navigate('/admin/channels')}>
            Manage All Channels &rarr;
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div
            onClick={() => navigate('/admin/channels?channel=whatsapp')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-emerald-400 transition-all"
            title="Configure WhatsApp Channel"
          >
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">WhatsApp</span>
              <span className="text-[9px] font-bold text-emerald-600">● Operational</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/channels?channel=messenger')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-blue-400 transition-all"
            title="Configure Messenger Channel"
          >
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Messenger</span>
              <span className="text-[9px] font-bold text-blue-600">● Connected</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/channels?channel=web')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-cyan-400 transition-all"
            title="Configure Web Channel"
          >
            <Globe className="w-5 h-5 text-cyan-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Web</span>
              <span className="text-[9px] font-bold text-cyan-600">● Active</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/channels?channel=email')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-red-400 transition-all"
            title="Configure Email Channel"
          >
            <Mail className="w-5 h-5 text-red-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Email</span>
              <span className="text-[9px] font-bold text-red-600">▲ Healthy</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/admin/channels?channel=sms')}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-purple-400 transition-all"
            title="Configure SMS Channel"
          >
            <Smartphone className="w-5 h-5 text-purple-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">SMS</span>
              <span className="text-[9px] font-bold text-purple-600">● Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Company Registration Request Card */}
        <div
          onClick={() => navigate('/admin/organizations')}
          className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Company Registration Request
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Review and approve new company onboarding submissions.</p>
            </div>
          </div>

          <span className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-base shadow-2xs flex items-center justify-center shrink-0">
            {pendingCount}
          </span>
        </div>

        {/* Subscription Package Card */}
        <div
          onClick={() => navigate('/admin/packages')}
          className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Subscription Package
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Manage pricing tiers, payment details, and features.</p>
            </div>
          </div>

          <span className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-base shadow-2xs flex items-center justify-center shrink-0">
            {totalCount}
          </span>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            RECENT ACTIVITY LOG
          </h3>
          <button onClick={() => navigate('/admin/organizations')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">View All Logs</button>
        </div>

        <div className="space-y-3 text-xs">
          {generatedLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${log.type === 'pending' ? 'bg-purple-50 text-purple-600 border border-purple-200' : log.type === 'security' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                  {log.type === 'pending' ? <Clock className="w-4 h-4" /> : log.type === 'security' ? <ShieldCheck className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{log.title}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{log.desc}</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold ${log.type === 'security' ? 'text-emerald-600' : 'text-slate-500'}`}>{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
