import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShieldAlert, Loader2 } from 'lucide-react';
import axios from 'axios';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });

      if (res.data.token) {
        localStorage.setItem('originx_admin_token', res.data.token);
        navigate('/admin/news');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2 font-['Space_Grotesk']">
          OriginX Admin
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          管理控制台身份验证
        </p>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">账号</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-white transition-all"
              placeholder="admin"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-slate-400 font-medium">密码</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-white transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold tracking-wide hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '进入控制台'}
          </button>
        </form>
      </div>
    </div>
  );
}
