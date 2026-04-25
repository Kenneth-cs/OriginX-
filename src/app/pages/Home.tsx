import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  FlaskConical, 
  HeartHandshake, 
  BarChart3, 
  MapPin, 
  Mail, 
  MessageSquare,
  Sparkles,
  Terminal,
  Users,
  ChevronRight,
  ArrowRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

const API_URL = 'http://localhost:3000/api';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export function Home() {
  const [activeTab, setActiveTab] = useState<'creator' | 'enterprise'>('creator');
  const [homeHero, setHomeHero] = useState<any>(null);

  // Form handling
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const onSubmit = async (data: any) => {
    try {
      setSubmitStatus('idle');
      const res = await axios.post(`${API_URL}/contacts`, data);
      setSubmitStatus('success');
      setSubmitMessage(res.data.message);
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitMessage(err.response?.data?.error || '提交失败，请稍后重试');
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/settings/home_hero`);
        setHomeHero(res.data.home_hero);
      } catch (err) {
        console.error("Failed to load home settings", err);
      }
    };
    fetchSettings();
  }, []);

  const heroData = homeHero || {
    "tag": "赋能每一个垂直领域",
    "title": {
      "line1_highlight": "源", "line1_white": "于智能",
      "line2_highlight": "极", "line2_white": "于应用"
    },
    "keywords": ["全域通用智能", "深耕场景落地", "定制化 AI 全栈解决方案"],
    "description": "数字化浪潮下，AI 早已不再是单一工具。我们跳出通用大模型的同质化内卷，以垂直场景深耕为核心，让智能能力深度渗透：下沉工业制造一线、洞见人文情感生活、赋能中小企业经营。",
    "quote": "—— 源极科技，源自技术本真，极致产品落地。"
  };

  return (
    <main className="relative z-10 pt-32">
        {/* 1. Hero Section (Center Aligned per request) */}
        <section id="vision" className="pt-20 pb-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center relative min-h-[85vh] justify-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm font-medium text-blue-400 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {heroData.tag}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.1] font-['Space_Grotesk']"
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 drop-shadow-sm">{heroData.title.line1_highlight}</span><span className="text-white">{heroData.title.line1_white}</span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-400 drop-shadow-sm">{heroData.title.line2_highlight}</span><span className="text-white">{heroData.title.line2_white}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10 text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider font-['Space_Grotesk']"
          >
            {heroData.keywords.map((kw: string, i: number) => (
              <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">{kw}</span>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl text-base md:text-lg text-slate-400 leading-relaxed"
          >
            <p className="mb-4">
              {heroData.description}
            </p>
            <p className="text-blue-400 font-mono text-sm opacity-80 mt-6 border-t border-white/5 pt-6 inline-block">
              {heroData.quote}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-12"
          >
            <a href="#matrix" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] text-white">
              开始探索矩阵
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#terminal" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-slate-300 hover:text-white">
              进入联络中心
            </a>
          </motion.div>
        </section>

        {/* 2. The Matrix (3 Columns, Glassmorphism, Glow Border) */}
        <section id="matrix" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-20">
              <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-3 block">01 / The Matrix</span>
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">三大业务矩阵</h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Matrix 1 */}
              <FadeIn delay={0.1}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <Cpu className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 font-['Space_Grotesk'] text-white relative z-10">
                    极智・工业
                  </h3>
                  <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm relative z-10">
                    以AI算力锚定本土制造，使产线自决策、品控自闭环、制造自优化。降本增效可见，范式重构可期。
                  </p>
                  <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-blue-500" /> 智能钣金切割系统
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-blue-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-blue-500" /> 制造数字化改造
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Matrix 2 */}
              <FadeIn delay={0.2}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <HeartHandshake className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 font-['Space_Grotesk'] text-white relative z-10">
                    源生・人文
                  </h3>
                  <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm relative z-10">
                    以AI解译情志、连接人心。探索东方智慧与当代情感需求的交汇处，让技术有温度、有共鸣。
                  </p>
                  <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-purple-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-purple-500" /> AI玄学系统
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-purple-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-purple-500" /> AI情感陪伴
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Matrix 3 */}
              <FadeIn delay={0.3}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <BarChart3 className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 font-['Space_Grotesk'] text-white relative z-10">
                    源效・商业
                  </h3>
                  <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm relative z-10">
                    将AI注入企业经营末梢，以轻量化工具替代繁冗流程。让增长有数可依、有据可循、有力可用。
                  </p>
                  <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-indigo-500" /> 智能财务系统
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-indigo-500" /> 轻量化 SaaS 工具
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-indigo-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-indigo-500" /> 定制化网站开发
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 3. The Lab */}
        <section id="lab" className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-md">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs font-mono mb-6 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  <FlaskConical className="w-4 h-4" />
                  ORIGINX LAB
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk'] text-white">源极实验室</h2>
                <div className="h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500 mb-8" />
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  聚焦前沿 AI 原型研发、小众场景创新、轻量化创意产品孵化。这里承载试验性技术、概念级项目与探索性产品。
                </p>
                <p className="text-sm text-slate-500 mb-10">
                  以极致研发沉淀技术底盘，持续拓宽 AI 应用的边界与可能性。
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {['未成熟 Demo', '创意试验项目', '小众垂直功能', '个人技术探索作品'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-black/20 text-xs md:text-sm text-slate-300 shadow-inner">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2} className="relative h-[300px] lg:h-[400px] rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20" />
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto border border-purple-500/30 rounded-full flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 border-[2px] border-t-purple-400 border-r-transparent border-b-blue-400 border-l-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ animationDuration: '3s' }} />
                    <FlaskConical className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="font-mono text-sm tracking-widest text-purple-300/80 uppercase mb-2">System Initializing</div>
                  <div className="flex gap-1 justify-center mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-200"></span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 5. The Identity (Now mostly pointing to /brand or shortened) */}
        <section id="identity" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-3 block">02 / The Identity</span>
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white">关于源极</h2>
            </FadeIn>

            <FadeIn delay={0.1} className="max-w-4xl mx-auto mb-20 text-center">
              <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed mb-10">
                “始于本源，触达极境。” 在人工智能爆发的奇点时代，“OriginX 源极科技” 诞生于对计算本质的敬畏。
              </p>
              <Link to="/brand" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-500/30 text-white font-medium hover:bg-gradient-to-r hover:from-blue-600/40 hover:to-purple-600/40 transition-all shadow-[0_0_20px_rgba(139,92,246,0.1)] group backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
                探索源极品牌精神与设计哲学
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.3} className="max-w-4xl mx-auto text-center space-y-8 bg-white/[0.02] border border-white/5 p-10 rounded-3xl backdrop-blur-sm">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-2 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white">AI时代「精锐协作体」</h3>
              <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                以 <span className="text-blue-300 font-medium bg-blue-500/10 px-2 py-0.5 rounded">产品架构师 + 全栈开发者</span> 为核心。<br/>
                信奉 AI 驱动生产力平权，以精简规模，创造更高密度的智能价值输出。
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                <div className="p-2"><div className="text-blue-400 font-mono font-bold mb-1">01. 想法</div><div className="text-xs text-slate-500">洞察需求本质</div></div>
                <div className="p-2"><div className="text-purple-400 font-mono font-bold mb-1">02. 原型</div><div className="text-xs text-slate-500">快速构建MVP</div></div>
                <div className="p-2"><div className="text-indigo-400 font-mono font-bold mb-1">03. 落地</div><div className="text-xs text-slate-500">全栈工程实现</div></div>
                <div className="p-2"><div className="text-cyan-400 font-mono font-bold mb-1">04. 验证</div><div className="text-xs text-slate-500">市场迭代闭环</div></div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 6. Terminal (Contact) */}
        <section id="terminal" className="py-32 relative z-10 border-t border-white/5 bg-[#050505]/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <FadeIn>
                <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-3 block flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> 03 / Terminal
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Space_Grotesk'] text-white">联络中心</h2>
                <p className="text-slate-400 text-sm md:text-base">开放合作・双向共生 —— 不局限传统甲乙双方模式，以解决真实问题为核心。</p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex items-center gap-3 text-xs md:text-sm font-mono text-slate-400 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-blue-400" />
                广东・佛山 | 扎根大湾区工业腹地
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Terminal Interface */}
              <FadeIn delay={0.1} className="lg:col-span-8 rounded-2xl bg-black/60 border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-xl">
                {/* Terminal Header */}
                <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> originx_terminal.sh
                  </span>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-white/10 bg-white/[0.02]">
                  <button 
                    onClick={() => setActiveTab('creator')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'creator' ? 'text-blue-400 border-b-[2px] border-blue-400 bg-blue-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    面向创作者 / 开发者
                  </button>
                  <button 
                    onClick={() => setActiveTab('enterprise')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'enterprise' ? 'text-purple-400 border-b-[2px] border-purple-400 bg-purple-500/5' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    面向企业 / 团队负责人
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow font-mono text-sm">
                  {activeTab === 'creator' ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                      <div className="flex gap-4"><div className="text-blue-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-blue-300">思想交流：</span>AI 方向 Coffee Chat（探索、碰撞、验证）</div></div>
                      <div className="flex gap-4"><div className="text-blue-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-blue-300">产品开发：</span>APP、小程序、Web、SaaS 等全栈开发</div></div>
                      <div className="flex gap-4"><div className="text-blue-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-blue-300">项目组队：</span>AIGC/开发方向的竞赛或项目合作、开源共建</div></div>
                      <div className="flex gap-4"><div className="text-blue-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-blue-300">互测互用：</span>产品互测、创意共创（互相反馈赋能）</div></div>
                      <div className="flex gap-4"><div className="text-blue-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-blue-300">入行指导：</span>AI 学习路径、工具落地、实践建议</div></div>
                      <div className="flex gap-4 mt-8"><div className="w-2 h-4 bg-blue-400 animate-pulse" /></div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                      <div className="flex gap-4"><div className="text-purple-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-purple-300">企业提效：</span>梳理业务流程，Agent 工作流搭建、自动化改造</div></div>
                      <div className="flex gap-4"><div className="text-purple-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-purple-300">产品选型：</span>模型/产品测试对比，构建评估标准输出建议</div></div>
                      <div className="flex gap-4"><div className="text-purple-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-purple-300">产业研究：</span>社媒数据分析、趋势追踪、桌面深度研究</div></div>
                      <div className="flex gap-4"><div className="text-purple-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-purple-300">内容赋能：</span>AI广告短片、宣传视频、高质产品视觉素材</div></div>
                      <div className="flex gap-4"><div className="text-purple-400 font-bold shrink-0">~ $</div><div className="text-slate-300"><span className="text-purple-300">培训分享：</span>团队 AI 工具培训与认知升级、场景实操教学</div></div>
                      <div className="flex gap-4 mt-8"><div className="w-2 h-4 bg-purple-400 animate-pulse" /></div>
                    </motion.div>
                  )}
                </div>
              </FadeIn>

              {/* Contact Form */}
              <FadeIn delay={0.3} className="lg:col-span-4 flex flex-col gap-4">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex-grow flex flex-col">
                  <h4 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    提交合作意向
                  </h4>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    留下您的联系方式与需求，我们的架构师将于 24 小时内与您联络。
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
                    <div>
                      <input 
                        type="text" 
                        placeholder="您的姓名 / 称呼 *" 
                        {...register("name", { required: true })}
                        className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      {errors.name && <span className="text-red-400 text-xs mt-1 block">这是必填项</span>}
                    </div>
                    
                    <div>
                      <input 
                        type="text" 
                        placeholder="公司名称 / 所在行业" 
                        {...register("company")}
                        className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <input 
                        type="text" 
                        placeholder="联系方式 (微信 / 手机号) *" 
                        {...register("contact_info", { required: true })}
                        className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      {errors.contact_info && <span className="text-red-400 text-xs mt-1 block">这是必填项</span>}
                    </div>

                    <div className="flex-grow">
                      <textarea 
                        placeholder="简单描述一下您的痛点或需求 *" 
                        {...register("requirement", { required: true })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none h-full"
                      />
                      {errors.requirement && <span className="text-red-400 text-xs mt-1 block">这是必填项</span>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '发送至源极节点'}
                    </button>

                    {submitStatus === 'success' && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2 mt-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {submitMessage}
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs mt-2">
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

    </main>
  );
}