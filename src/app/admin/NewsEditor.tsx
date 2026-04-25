import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';

const API_URL = 'http://localhost:3000/api';

export function NewsEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('行业洞察');
  const [status, setStatus] = useState('draft');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchNewsDetail();
    }
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const res = await axios.get(`${API_URL}/news/${id}`);
      const data = res.data;
      setTitle(data.title);
      setSummary(data.summary);
      setCategory(data.category);
      setStatus(data.status);
      setContent(data.content || '');
    } catch (err) {
      setError('加载文章失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !content) {
      setError('标题和正文不能为空');
      return;
    }
    
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('originx_admin_token');
      const payload = { title, summary, category, status, content };
      
      if (isNew) {
        await axios.post(`${API_URL}/news`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.put(`${API_URL}/news/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      navigate('/admin/news');
    } catch (err: any) {
      setError('保存失败: ' + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const token = localStorage.getItem('originx_admin_token');
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const imageUrl = `http://localhost:3000${res.data.url}`;
      setContent(prev => prev + `\n![图片](${imageUrl})\n`);
    } catch (err) {
      alert('图片上传失败');
    }
  };

  if (loading) {
    return <div className="p-12 flex justify-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <div className="max-w-5xl space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/news" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
            {isNew ? '新建文章' : '编辑文章'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setStatus(status === 'draft' ? 'published' : 'draft')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}
          >
            {status === 'published' ? '状态: 已发布' : '状态: 草稿'}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? '保存' : '保存更新'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">文章标题</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="输入引人注目的标题..."
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg font-medium"
              />
            </div>
            
            <div data-color-mode="dark">
              <label className="block text-sm font-medium text-slate-400 mb-2 flex justify-between items-center">
                <span>正文内容 (Markdown)</span>
                <label className="cursor-pointer text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded">
                  <ImageIcon className="w-3 h-3" />
                  插入图片
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                </label>
              </label>
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || '')}
                height={500}
                className="!bg-black/50 !border-white/10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">分类</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="行业洞察">行业洞察</option>
                <option value="产品动态">产品动态</option>
                <option value="实验室探索">实验室探索</option>
                <option value="公司新闻">公司新闻</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">列表摘要</label>
              <textarea 
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="简短的描述，将显示在新闻列表页..."
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
