import React, { useState, useEffect } from 'react';
import { Building2, Search, CheckCircle2, XCircle, Filter, Download, ArrowLeft, Eye, Edit3, Trash2, ShieldCheck, Clock, UserCheck, AlertTriangle, Key, LogOut } from 'lucide-react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';

const API = 'http://localhost:3001';

export default function OrganizationManagement() {
  const [activeTab, setActiveTab] = useState<'tech' | 'finance' | 'edu' | 'healthcare' | 'manufacturing' | 'other'>('tech');
  const [viewMode, setViewMode] = useState<'active' | 'requests' | 'detail'>('active');
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrg, setDeletingOrg] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestsList, setRequestsList] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Fetch registrations from backend
  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await fetch(`${API}/api/registrations?status=pending`);
      const data = await res.json();
      setRequestsList(data);
    } catch {
      console.warn('Backend not reachable — using mock data');
      setRequestsList([
        { id: 101, companyName: 'Acme Global Systems Ltd', adminName: 'Arjuna Lakmal', email: 'arjuna.l@acmeglobal.com', date: '2023-11-20', industry: 'Technology', status: 'pending' },
        { id: 102, companyName: 'Nexus Telecommunications Ltd', adminName: 'Nimali Jayasinghe', email: 'nimali@nexustelecom.com', date: '2023-11-20', industry: 'Telecom', status: 'pending' },
        { id: 103, companyName: 'Lanka Retail Holdings', adminName: 'Kusal Mendis', email: 'kusal@lankaretail.lk', date: '2023-11-19', industry: 'E-commerce', status: 'pending' },
      ]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: number, companyName: string) => {
    try {
      await fetch(`${API}/api/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      setRequestsList((prev) => prev.filter((r) => r.id !== id));
      alert(`✅ Approved: ${companyName}`);
    } catch {
      alert(`✅ Approved: ${companyName} (offline mode)`);
      setRequestsList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleReject = async (id: number, companyName: string) => {
    try {
      await fetch(`${API}/api/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      setRequestsList((prev) => prev.filter((r) => r.id !== id));
      alert(`❌ Rejected: ${companyName}`);
    } catch {
      alert(`❌ Rejected: ${companyName} (offline mode)`);
      setRequestsList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Mock Active Companies grouped by Industry
  const companiesByIndustry = {
    tech: [
      { id: 1, name: 'ABC Company (pvt) LTD', email: 'abcCom@slt.lk', adminName: 'Isuru Lakmal', status: 'ACTIVE', lastLogin: '2 hours ago', industry: 'Technology', phone: '0112345757', location: 'Colombo', website: 'www.abc.lk' },
      { id: 2, name: 'Infiware Tec (pvt) LTD', email: 'kasun@infi.lk', adminName: 'Thirukumar Cathiyajini', status: 'ACTIVE', lastLogin: 'Yesterday, 14:20', industry: 'Technology', phone: '0112998877', location: 'Kandy', website: 'www.infi.lk' },
      { id: 3, name: 'Hemini Tec (pvt) LTD', email: 'hemini.m@partner.lk', adminName: 'Sanjan Dissanayake', status: 'DEACTIVATED', lastLogin: '12 Days ago', industry: 'Technology', phone: '0112443322', location: 'Galle', website: 'www.hemini.lk' },
    ],
    finance: [
      { id: 4, name: 'Jayawickrama Finance (pvt) LTD', email: 'jayawickrama@slt.lk', adminName: 'Gayan Dhanusha', status: 'ACTIVE', lastLogin: '5 hours ago', industry: 'Finance', phone: '0112776655', location: 'Colombo', website: 'www.jwfin.lk' },
      { id: 5, name: 'JK Company (pvt) LTD', email: 'jkcom@slt.lk', adminName: 'Dinesh Chandimal', status: 'ACTIVE', lastLogin: 'Yesterday, 14:20', industry: 'Finance', phone: '0112665544', location: 'Negombo', website: 'www.jkcom.lk' },
      { id: 6, name: 'Rammuthu Finance (pvt) LTD', email: 'rammuthu.f@partner.lk', adminName: 'Lasith Malinga', status: 'DEACTIVATED', lastLogin: '2 Days ago', industry: 'Finance', phone: '0112887766', location: 'Matara', website: 'www.rammuthu.lk' },
    ],
    edu: [
      { id: 7, name: 'Siyane Education Center', email: 'siyaneedu@slt.lk', adminName: 'Nimal Wijesinghe', status: 'ACTIVE', lastLogin: '3 hours ago', industry: 'Education', phone: '0112112233', location: 'Gampaha', website: 'www.siyane.lk' },
      { id: 8, name: 'Saniyo Edu (pvt) LTD', email: 'saniyoedu@slt.lk', adminName: 'Malaka Priyadarshana', status: 'ACTIVE', lastLogin: 'Yesterday, 14:20', industry: 'Education', phone: '0112334455', location: 'Kurunegala', website: 'www.saniyo.lk' },
      { id: 9, name: 'Asiri Edu (pvt) LTD', email: 'asiriedu.m@partner.lk', adminName: 'Yoshan Chamara', status: 'DEACTIVATED', lastLogin: '12 Days ago', industry: 'Education', phone: '0112556677', location: 'Jaffna', website: 'www.asiriedu.lk' },
    ],
    healthcare: [
      { id: 10, name: 'HSE Health Care', email: 'hsehealth@slt.lk', adminName: 'Dilshan Dhanuka', status: 'ACTIVE', lastLogin: '2 hours ago', industry: 'Health Care', phone: '0112991100', location: 'Colombo', website: 'www.hsehealth.lk' },
      { id: 11, name: 'Asiri PVT LTD', email: 'asiripvt@slt.lk', adminName: 'Dinesh Chandimal', status: 'ACTIVE', lastLogin: 'Yesterday, 14:20', industry: 'Health Care', phone: '0112992200', location: 'Colombo', website: 'www.asiri.lk' },
      { id: 12, name: 'SCB Health care', email: 'scb.h@partner.lk', adminName: 'Lasith Malinga', status: 'DEACTIVATED', lastLogin: '10 Days ago', industry: 'Health Care', phone: '0112993300', location: 'Kandy', website: 'www.scb.lk' },
    ],
    manufacturing: [],
    other: [],
  };

  const requestsList_unused = null; // replaced by state above


  const currentCompanies = companiesByIndustry[activeTab] || [];

  const handleOpenDelete = (company: any) => {
    setDeletingOrg(company);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    alert(`Organization "${deletingOrg?.name}" has been deleted.`);
  };

  const handleOpenDetail = (company: any) => {
    setSelectedOrg(company);
    setViewMode('detail');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Organization Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure user access, roles, and review new registration requests.</p>
        </div>

        <button
          onClick={() => alert('Exporting Full Organization List Report...')}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-xs hover:bg-slate-50 flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export List Report</span>
        </button>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('tech')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tech' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Technology
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'finance' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Finance
        </button>
        <button
          onClick={() => setActiveTab('edu')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'edu' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveTab('healthcare')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'healthcare' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Health Care
        </button>
        <button
          onClick={() => setActiveTab('manufacturing')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'manufacturing' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Manufacturing
        </button>
        <button
          onClick={() => setActiveTab('other')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'other' ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Other
        </button>
      </div>

      {/* View Switcher: Company Registration Requests Pill & Active Company Container */}
      {viewMode !== 'detail' && (
        <div className="space-y-4">
          
          {/* Top Requests Pill Button */}
          <div
            onClick={() => setViewMode(viewMode === 'requests' ? 'active' : 'requests')}
            className="p-3.5 rounded-2xl bg-purple-100 border border-purple-200 flex items-center gap-3 cursor-pointer hover:bg-purple-200/60 transition-all w-fit shadow-xs"
          >
            <Building2 className="w-5 h-5 text-purple-700" />
            <span className="text-xs font-black text-purple-900">Company Registration Requests</span>
            <span className="w-6 h-6 rounded-full bg-purple-700 text-white font-black text-xs flex items-center justify-center">
              {requestsList.length}
            </span>
          </div>

          {/* ===== REQUESTS VIEW ===== */}
          {viewMode === 'requests' && (
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100">
                    <Clock className="w-4 h-4 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Pending Registration Requests</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Review and approve or reject new company registrations</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewMode('active')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  ✕ Close
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-purple-50 text-purple-900 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 rounded-l-xl">Company</th>
                      <th className="py-3 px-4">Admin Contact</th>
                      <th className="py-3 px-4">Industry</th>
                      <th className="py-3 px-4">Requested Date</th>
                      <th className="py-3 px-4 text-center rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {requestsList.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                              {req.companyName.charAt(0)}
                            </div>
                            <div>
                              <span className="block font-black text-slate-900">{req.companyName}</span>
                              <span className="text-[10px] font-mono text-slate-400">{req.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="block font-semibold text-slate-800">{req.adminName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{req.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                            {req.industry}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-500">{req.date}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => alert(`✅ Approved: ${req.companyName}`)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] shadow-sm transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Approve
                            </button>
                            <button
                              onClick={() => alert(`❌ Rejected: ${req.companyName}`)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] shadow-sm transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                            <button
                              onClick={() => handleOpenDetail({ ...req, name: req.companyName, status: 'PENDING', lastLogin: 'N/A', website: '-', location: '-', phone: '-' })}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requestsList.length === 0 && (
                <div className="text-center py-12 space-y-3">
                  <UserCheck className="w-10 h-10 text-slate-300 mx-auto" />
                  <span className="text-xs font-bold text-slate-400 block">No Pending Requests</span>
                </div>
              )}
            </div>
          )}

          {/* Active Company Table Card */}
          {viewMode === 'active' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center gap-3">
                <Building2 className="w-4 h-4 text-indigo-700" />
                <h3 className="text-xs font-black text-indigo-950">Active Company</h3>
              </div>

              <button
                onClick={() => setViewMode('active')}
                className="px-4 py-1.5 rounded-xl bg-purple-900 text-white font-bold text-xs shadow-xs"
              >
                See all
              </button>
            </div>

            {/* Filter Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter by name, email or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none">
                  <option>All Roles</option>
                  <option>Super Admin</option>
                  <option>Org Admin</option>
                </select>
                <button className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>

            {/* Table View (Matching Images 1-6) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-purple-100/60 text-purple-950 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Company Identity</th>
                    <th className="py-3 px-4">Admin Name</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Login</th>
                    <th className="py-3 px-4 text-center rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {currentCompanies.map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-50">
                      <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {comp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block font-black text-slate-900">{comp.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{comp.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-700">{comp.adminName}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${
                          comp.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${comp.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {comp.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 font-mono">{comp.lastLogin}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenDetail(comp)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDetail(comp)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                            title="Edit Organization"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(comp)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Company"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {currentCompanies.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center space-y-3">
                        <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                        <span className="text-xs font-bold text-slate-400 block">No Companies Registered Yet</span>
                        <button className="px-4 py-2 rounded-xl bg-purple-900 text-white font-bold text-xs shadow-md">
                          + Add Company
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
          )}

          {/* Bottom Stats Banner (Matching Images 1-6 Bottom) */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL COMPANY</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900">{currentCompanies.length || 4}</h3>
                <span className="text-xs font-bold text-emerald-600">+12%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ACTIVE NOW</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900">3</h3>
                <span className="text-[10px] font-bold text-slate-400">On-duty</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AVG. APPROVAL TIME</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-black text-slate-900">14h</h3>
                <span className="text-[10px] font-bold text-emerald-600">-2h trend</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">SECURITY HEALTH</span>
              <h3 className="text-2xl font-black text-emerald-700">Optimal</h3>
            </div>
          </div>

        </div>
      )}

      {/* 3. Detailed Super Admin Organization Profile View (Matching Image 4 Bottom) */}
      {viewMode === 'detail' && selectedOrg && (
        <div className="space-y-6">
          
          <button
            onClick={() => setViewMode('active')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Organization Directory</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Organization Identity (6 cols) */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg">
                  {selectedOrg.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">{selectedOrg.name}</h2>
                  <span className="text-xs font-bold text-indigo-600">{selectedOrg.industry} Company</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">Admin Name</span>
                  <span className="font-bold text-slate-900">{selectedOrg.adminName}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">Email</span>
                  <span className="font-mono font-bold text-indigo-600">{selectedOrg.email}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">Web site</span>
                  <span className="font-mono text-slate-700">{selectedOrg.website}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">Location</span>
                  <span className="font-bold text-slate-900">{selectedOrg.location}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">Contact No</span>
                  <span className="font-mono font-bold text-slate-900">{selectedOrg.phone}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 mb-1">About The Organization</h4>
                <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectedOrg.name} is a leading technology-driven organization focusing on creating smarter, faster, and more reliable solutions. Connected to SLT Global AI Router node.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => alert('Session Terminated for Admin User!')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  Session Terminate This User
                </button>
                <button
                  onClick={() => alert('Changes Updated Successfully!')}
                  className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md"
                >
                  Update Changes
                </button>
              </div>
            </div>

            {/* Right Column: Account Metadata, Permissions, Login History (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Account Metadata Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">ACCOUNT METADATA</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-xl bg-indigo-950 text-white text-[10px] font-bold">Deactivate User</button>
                    <button className="px-3 py-1 rounded-xl border border-slate-300 text-slate-700 text-[10px] font-bold">Reset Access</button>
                    <button className="px-3 py-1 rounded-xl border border-red-300 text-red-600 text-[10px] font-bold">Remove User</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">Created On</span>
                    <span className="font-bold text-slate-900">October 12, 2021</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">Last Password Change</span>
                    <span className="font-bold text-slate-900">15 days ago</span>
                  </div>
                </div>
              </div>

              {/* Permissions Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Permissions</h3>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Profile Settings</span>
                      <span className="text-[9px] text-slate-400">Create and delete system folders</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">View Analytics</span>
                      <span className="text-[9px] text-slate-400">Access usage data dashboards</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Configure Omni Channel</span>
                      <span className="text-[9px] text-slate-400">Edit routing and load balancing</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">User Deletion</span>
                      <span className="text-[9px] text-slate-400">Capability to remove other admins</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Login History Table */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Login History</h3>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Export Log Report</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="text-slate-400 font-bold uppercase border-b border-slate-100">
                        <th className="py-2 px-2">DATE &amp; TIME</th>
                        <th className="py-2 px-2">LOCATION</th>
                        <th className="py-2 px-2">DEVICE ID</th>
                        <th className="py-2 px-2">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      <tr>
                        <td className="py-2 px-2 font-mono">2023-11-24 10:45 AM</td>
                        <td className="py-2 px-2">Colombo, SL</td>
                        <td className="py-2 px-2 font-mono text-slate-400">UM-PR1-12-KMC-AS</td>
                        <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">Success</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-mono">2023-11-23 09:12 PM</td>
                        <td className="py-2 px-2">Kandy, SL</td>
                        <td className="py-2 px-2 font-mono text-slate-400">UM-PR1-12-NEN-XS</td>
                        <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px]">Success</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-mono">2023-11-22 03:33 AM</td>
                        <td className="py-2 px-2 text-red-500 font-bold">Unrecognized</td>
                        <td className="py-2 px-2 font-mono text-slate-400">UM-PR1-12-UNK-ZZ</td>
                        <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[9px]">Blocked</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Delete Confirmation Modal (Matching Image 4 Top) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-slate-200 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-slate-900">DELETE COMPANY</h3>
            <p className="text-xs text-slate-500">Do you really want to delete this Company? This process can not be undone.</p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2.5 px-4 rounded-xl border border-red-400 text-red-600 font-bold text-xs hover:bg-red-50"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
