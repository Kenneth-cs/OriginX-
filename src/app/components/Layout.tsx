import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Sparkles, Terminal, Menu, X } from 'lucide-react';
import { SEO } from './SEO';

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to handle smooth scrolling if already on Home
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-50 font-['Inter'] selection:bg-purple-500/30 overflow-hidden">
      <SEO />
      {/* Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} 
      />

      {/* Dynamic Glowing Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[180px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none z-0" />

      {/* Navbar (Glassmorphism) */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group relative z-50" onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setMobileMenuOpen(false);
          }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-slate-300">源极科技</span>
              <span className="text-xl font-bold tracking-widest uppercase font-['Space_Grotesk'] leading-none mt-0.5">Origin<span className="text-blue-400">X</span></span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/#vision" onClick={(e) => handleScroll(e, 'vision')} className="hover:text-white transition-colors">品牌理念</Link>
            <Link to="/#matrix" onClick={(e) => handleScroll(e, 'matrix')} className="hover:text-white transition-colors">业务矩阵</Link>
            <Link to="/#lab" onClick={(e) => handleScroll(e, 'lab')} className="hover:text-white transition-colors">创新实验</Link>
            <Link to="/brand" className={`transition-colors ${location.pathname === '/brand' ? 'text-white font-bold' : 'hover:text-white'}`}>关于源极</Link>
            <Link to="/news" className={`transition-colors flex items-center gap-1 ${location.pathname.startsWith('/news') ? 'text-blue-400 font-bold' : 'text-blue-400/80 hover:text-blue-300'}`}>
              <span className="relative flex h-1.5 w-1.5 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              源极视界
            </Link>
          </div>

          <Link to="/#terminal" onClick={(e) => handleScroll(e, 'terminal')} className="hidden md:flex px-6 py-2.5 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 items-center gap-2 group backdrop-blur-sm">
            联络中心
            <Terminal className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-slate-300 hover:text-white relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6">
            <Link to="/#vision" onClick={(e) => handleScroll(e, 'vision')} className="text-xl font-medium text-slate-300 hover:text-white border-b border-white/10 pb-4">品牌理念</Link>
            <Link to="/#matrix" onClick={(e) => handleScroll(e, 'matrix')} className="text-xl font-medium text-slate-300 hover:text-white border-b border-white/10 pb-4">业务矩阵</Link>
            <Link to="/#lab" onClick={(e) => handleScroll(e, 'lab')} className="text-xl font-medium text-slate-300 hover:text-white border-b border-white/10 pb-4">创新实验</Link>
            <Link to="/brand" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-slate-300 hover:text-white border-b border-white/10 pb-4">关于源极</Link>
            <Link to="/news" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-blue-400 hover:text-blue-300 border-b border-white/10 pb-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              源极视界
            </Link>
            <Link to="/#terminal" onClick={(e) => handleScroll(e, 'terminal')} className="mt-8 flex justify-center px-6 py-3 rounded-xl font-medium bg-white/10 border border-white/20 items-center gap-2">
              联络中心
              <Terminal className="w-5 h-5 text-blue-400" />
            </Link>
          </div>
        )}
      </nav>

      {/* Renders the current page route */}
      <Outlet />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020202] py-12 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest uppercase font-['Space_Grotesk'] text-slate-300 leading-none">Origin<span className="text-blue-400">X</span></span>
            </div>
          </div>
          <div className="text-slate-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} 源极科技. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-500 font-mono">
            <Link to="#" className="hover:text-blue-400 transition-colors">/Privacy</Link>
            <Link to="#" className="hover:text-blue-400 transition-colors">/Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}