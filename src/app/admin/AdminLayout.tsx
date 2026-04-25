import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import { Settings, FileText, LogOut, ShieldAlert, Mailbox } from 'lucide-react';
import OriginXLogo from '../components/Logo';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('originx_admin_token');
    if (!token && location.pathname !== '/admin/login') {
      navigate('/admin/login', { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('originx_admin_token');
    navigate('/admin/login', { replace: true });
  };

  // If on login page, don't show the sidebar
  if (location.pathname === '/admin/login') {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <OriginXLogo className="w-5 h-5 mr-3" />
          <span className="font-bold text-white tracking-widest font-['Space_Grotesk']">OriginX Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/admin/news" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith('/admin/news') ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-4 h-4 mr-3" />
            资讯内容管理
          </Link>
          <Link 
            to="/admin/contacts" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith('/admin/contacts') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <Mailbox className="w-4 h-4 mr-3" />
            客户需求表单
          </Link>
          <Link 
            to="/admin/settings" 
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith('/admin/settings') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <Settings className="w-4 h-4 mr-3" />
            全站页面配置
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0a0a0a]">
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#111]">
          <h2 className="text-lg font-medium text-white">管理控制台</h2>
          <Link to="/" target="_blank" className="text-sm text-blue-400 hover:text-blue-300">
            查看官网主页 ↗
          </Link>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
