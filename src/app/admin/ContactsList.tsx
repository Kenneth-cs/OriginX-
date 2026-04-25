import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';

const API_URL = '/api';

export function ContactsList() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('originx_admin_token');
      const res = await axios.get(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data);
    } catch (err: any) {
      setError('无法加载客户需求列表');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('originx_admin_token');
      await axios.put(`${API_URL}/contacts/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      alert('操作失败');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">客户需求表单</h1>
          <p className="text-sm text-slate-400 mt-1">查看并处理来自官网联络中心提交的客户需求和留言。</p>
        </div>
        <button 
          onClick={() => { setLoading(true); fetchContacts(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-white/10"
        >
          <RefreshCw className="w-4 h-4" /> 刷新
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 flex justify-center items-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> 加载中...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-400">{error}</div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            暂无客户留言提交。
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-black/30 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">客户姓名</th>
                <th className="px-6 py-4 font-medium">联系方式</th>
                <th className="px-6 py-4 font-medium">需求内容</th>
                <th className="px-6 py-4 font-medium">提交时间</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item) => (
                <tr key={item.id} className={`border-b border-white/5 transition-colors ${item.status === 'unread' ? 'bg-indigo-500/5' : 'hover:bg-white/[0.02]'}`}>
                  <td className="px-6 py-4">
                    {item.status === 'unread' ? (
                      <span className="flex items-center text-indigo-400 gap-1.5 text-xs font-bold">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>未读
                      </span>
                    ) : (
                      <span className="flex items-center text-slate-500 gap-1.5 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />已读
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {item.name}
                    {item.company && <span className="block text-xs text-slate-500 font-normal mt-0.5">{item.company}</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {item.contact_info}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-slate-400" title={item.requirement}>
                      {item.requirement}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status === 'unread' && (
                      <button 
                        onClick={() => markAsRead(item.id)} 
                        className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> 标为已读
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
