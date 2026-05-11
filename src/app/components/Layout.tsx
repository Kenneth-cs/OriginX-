import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Sparkles, Terminal, Menu, X } from 'lucide-react';
import { SEO } from './SEO';
import OriginXLogo from './Logo';

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
          <Link to="/" className="flex items-center gap-3.5 cursor-pointer group relative z-50" onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setMobileMenuOpen(false);
          }}>
            <div className="w-[42px] h-[42px] flex items-center justify-center transition-all group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <OriginXLogo className="w-full h-full" />
            </div>
            <div className="flex items-center gap-3 h-full border-l border-white/10 pl-3.5 py-1">
              <span className="text-xl font-bold tracking-[0.2em] text-white leading-none font-['Inter']">源极科技</span>
              <span className="text-sm font-medium tracking-[0.1em] uppercase text-slate-400 leading-none mt-[2px] font-['Space_Grotesk']">Origin<span className="text-blue-400">X</span></span>
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
            合作联系
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
              合作联系
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
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <OriginXLogo className="w-8 h-8" />
            <div className="flex items-center gap-2.5 border-l border-white/20 pl-3">
              <span className="text-sm font-bold tracking-[0.2em] text-slate-300 leading-none">源极科技</span>
              <span className="text-xs font-bold tracking-widest uppercase font-['Space_Grotesk'] text-slate-500 leading-none mt-[2px]">Origin<span className="text-blue-400">X</span></span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-500 text-xs font-mono">
            <div>佛山源极科技有限公司版权所有</div>
            <div className="w-[1px] h-3 bg-slate-600/50"></div>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              粤ICP备2026056609号-1
            </a>
          </div>
          <div className="flex gap-6 text-xs text-slate-500 font-mono">
            <Link to="#" className="hover:text-blue-400 transition-colors">/隐私政策</Link>
            <Link to="#" className="hover:text-blue-400 transition-colors">/服务条款</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}