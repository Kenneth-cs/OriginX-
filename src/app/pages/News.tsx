import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import MDEditor from '@uiw/react-md-editor';
import { SEO } from "../components/SEO";

const API_URL = 'http://localhost:3000/api';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export function News() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch only published news for the list
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/news?status=published`);
        setNewsList(res.data);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Fetch full article when selected
  useEffect(() => {
    if (selectedId) {
      const fetchArticle = async () => {
        try {
          const res = await axios.get(`${API_URL}/news/${selectedId}`);
          setSelectedArticle(res.data);
        } catch (err) {
          console.error("Failed to load article", err);
        }
      };
      fetchArticle();
    } else {
      setSelectedArticle(null);
    }
  }, [selectedId]);

  return (
    <main className="relative z-10 pt-32 pb-32 min-h-screen max-w-5xl mx-auto px-6">
      {selectedArticle && (
        <SEO 
          title={`${selectedArticle.title} - 源极视界`} 
          description={selectedArticle.summary} 
        />
      )}
      {!selectedId ? (
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-4">源极视界</h1>
            <p className="text-slate-400 text-lg">最新产品动态、行业洞察与实验室探索记录。</p>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : newsList.length === 0 ? (
            <div className="py-20 text-center text-slate-500 border border-white/5 bg-white/[0.02] rounded-2xl">
              暂无已发布的文章，请前往管理后台发布。
            </div>
          ) : (
            <div className="space-y-8">
              {newsList.map((article, idx) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedId(article.id)}
                >
                  <div className="flex flex-wrap gap-4 items-center mb-4 text-sm font-mono">
                    <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-4 h-4" />
                      {new Date(article.publish_date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {article.summary}
                  </p>
                  <div className="flex items-center text-blue-400 font-medium text-sm gap-2">
                    阅读全文 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </FadeIn>
      ) : (
        <FadeIn>
          <button 
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            返回列表
          </button>
          
          {!selectedArticle ? (
            <div className="py-20 flex justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <article className="prose prose-invert prose-blue max-w-none">
              <div className="flex items-center gap-4 mb-8 text-sm font-mono">
                <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-500">{new Date(selectedArticle.publish_date).toLocaleDateString()}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white mb-10 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-lg mb-10">
                {selectedArticle.summary}
              </div>
              
              <div className="text-slate-300 leading-loose text-lg" data-color-mode="dark">
                <MDEditor.Markdown source={selectedArticle.content} style={{ backgroundColor: 'transparent' }} />
              </div>
            </article>
          )}
        </FadeIn>
      )}
    </main>
  );
}
