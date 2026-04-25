import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router';

// Make sure backend URL matches
const API_URL = '/api';

export function NewsList() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_URL}/news`);
      setNews(res.data);
    } catch (err: any) {
      setError('无法加载文章列表');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除这篇文章吗？操作不可恢复。')) return;
    
    try {
      const token = localStorage.getItem('originx_admin_token');
      await axios.delete(`${API_URL}/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNews(); // Reload after delete
    } catch (err: any) {
      alert('删除失败: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">资讯内容管理</h1>
          <p className="text-sm text-slate-400 mt-1">管理官网所有的行业洞察、产品动态与实验室探索文章。</p>
        </div>
        <Link 
          to="/admin/news/edit/new" 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> 新建文章
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="搜索文章..." 
              className="pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center items-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> 加载中...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-400">{error}</div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            暂无文章，点击右上角新建。
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-black/30 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">标题</th>
                <th className="px-6 py-4 font-medium">分类</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">发布日期</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">
                    <div className="line-clamp-1">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'published' ? (
                      <span className="flex items-center text-emerald-400 gap-1.5 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>已发布
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-400 gap-1.5 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>草稿
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                    {new Date(item.publish_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link to={`/admin/news/edit/${item.id}`} className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                      <Edit className="w-4 h-4" /> 编辑
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1">
                      <Trash2 className="w-4 h-4" /> 删除
                    </button>
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
