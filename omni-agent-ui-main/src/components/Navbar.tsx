import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-slate-200 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo Header (SLT-MOBITEL Primary + OmniAI) */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2.5 bg-white p-1.5 px-3 rounded-2xl border border-slate-200 shadow-xs group-hover:border-indigo-300 transition-all">
            <div className="w-11 h-9 overflow-hidden flex items-center justify-center rounded-xl bg-white shrink-0">
              <img 
                src="/slt-mobitel-logo.jpg" 
                alt="SLT-MOBITEL" 
                className="w-full h-full object-cover scale-[1.5] group-hover:scale-[1.6] transition-transform duration-300" 
              />
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                SLT-MOBITEL
              </span>
              <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase mt-1">
                OmniAI Platform
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Partner Badge & CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Embryo Partner Badge */}
          <div className="flex items-center gap-2.5 bg-white p-1.5 px-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Partnered with</span>
            <div className="w-px h-5 bg-slate-200" />
            <div className="h-8 w-28 overflow-hidden flex items-center justify-center rounded-lg bg-white">
              <img 
                src="/the-embryo-logo.jpg" 
                alt="The Embryo Innovation Centre" 
                className="w-full h-full object-contain scale-[1.25]" 
              />
            </div>
          </div>

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-all flex items-center gap-1 hover:scale-105"
          >
            <span>Get Started</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
