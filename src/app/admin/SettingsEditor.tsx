import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, Loader2, RefreshCw } from 'lucide-react';

const API_URL = '/api';

export function SettingsEditor() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/settings`);
      setSettings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (key: string, value: any) => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('originx_admin_token');
      await axios.put(`${API_URL}/settings/${key}`, { value }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: '保存成功！官网数据已实时更新。', type: 'success' });
      fetchSettings();
    } catch (err: any) {
      setMessage({ text: '保存失败: ' + (err.response?.data?.error || err.message), type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleJsonChange = (key: string, jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setSettings(prev => ({ ...prev, [key]: parsed }));
    } catch (e) {
      // Don't update state if JSON is invalid while typing
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">全站页面配置</h1>
        <p className="text-sm text-slate-400">
          通过直接修改以下的 JSON 结构，实时控制官网的 SEO 标签、首页文案以及板块内容。
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="p-12 flex justify-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Example Block 1: Global SEO */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
              <div className="font-medium text-purple-400 flex items-center gap-2">
                <div className="px-2 py-1 bg-purple-500/20 rounded text-xs font-mono border border-purple-500/30">global_seo</div>
                全局 SEO (默认标题与描述)
              </div>
              <button 
                onClick={() => handleSave('global_seo', settings['global_seo'] || { title: '源极科技 OriginX', description: '定制化AI解决方案' })}
                disabled={saving}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-md transition-colors"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                保存生效
              </button>
            </div>
            <div className="p-4 bg-black/30">
              <textarea 
                className="w-full h-40 bg-transparent text-slate-300 font-mono text-sm border border-white/10 rounded-lg p-4 focus:outline-none focus:border-purple-500"
                defaultValue={JSON.stringify(settings['global_seo'] || {
                  "title": "源极科技 OriginX | AI赋能工业与商业",
                  "description": "源极科技致力于垂直领域的AI落地，提供工业制造、人文情感、企业经营的全栈定制化智能解决方案。",
                  "keywords": ["AI", "源极科技", "大模型落地", "智能制造", "企业SaaS"]
                }, null, 2)}
                onChange={(e) => handleJsonChange('global_seo', e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
                * 请确保输入严格符合 JSON 格式（双引号包裹键名和字符串）。
              </p>
            </div>
          </div>

          {/* Example Block 2: Home Hero */}
          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
              <div className="font-medium text-blue-400 flex items-center gap-2">
                <div className="px-2 py-1 bg-blue-500/20 rounded text-xs font-mono border border-blue-500/30">home_hero</div>
                首页 - 顶部首屏展示区
              </div>
              <button 
                onClick={() => handleSave('home_hero', settings['home_hero'] || {})}
                disabled={saving}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-md transition-colors"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                保存生效
              </button>
            </div>
            <div className="p-4 bg-black/30">
              <textarea 
                className="w-full h-64 bg-transparent text-slate-300 font-mono text-sm border border-white/10 rounded-lg p-4 focus:outline-none focus:border-blue-500"
                defaultValue={JSON.stringify(settings['home_hero'] || {
                  "tag": "赋能每一个垂直领域",
                  "title": {
                    "line1_highlight": "源", "line1_white": "于智能",
                    "line2_highlight": "极", "line2_white": "于应用"
                  },
                  "keywords": ["全域通用智能", "深耕场景落地", "定制化 AI 全栈解决方案"],
                  "description": "数字化浪潮下，AI 早已不再是单一工具。我们跳出通用大模型的同质化内卷，以垂直场景深耕为核心，让智能能力深度渗透：下沉工业制造一线、洞见人文情感生活、赋能中小企业经营。",
                  "quote": "—— 源极科技，源自技术本真，极致产品落地。"
                }, null, 2)}
                onChange={(e) => handleJsonChange('home_hero', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
