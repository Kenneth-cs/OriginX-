import React from 'react';
import { motion } from 'motion/react';
import { Download, Globe, Layers, Zap, Hexagon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Toaster, toast } from 'sonner';

// --- Utility for Tailwind ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- The Final Logo: Elegant Orbit ---
const OriginXLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="orbit1" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="orbit2" x1="85" y1="15" x2="15" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#bae6fd" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
      <radialGradient id="coreGlow" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" stopOpacity="0.4" />
        <stop offset="0.5" stopColor="#0284c7" stopOpacity="0.1" />
        <stop offset="1" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Subtle background glow */}
    <circle cx="50" cy="50" r="35" fill="url(#coreGlow)" />
    
    {/* Orbit 1 (Top-Left to Bottom-Right ellipse) */}
    <ellipse cx="50" cy="50" rx="38" ry="6" transform="rotate(45 50 50)" stroke="url(#orbit1)" strokeWidth="3" />
    
    {/* Orbit 2 (Top-Right to Bottom-Left ellipse) */}
    <ellipse cx="50" cy="50" rx="38" ry="6" transform="rotate(-45 50 50)" stroke="url(#orbit2)" strokeWidth="3" />
    
    {/* The Star Core */}
    <path d="M50 32 C50 48 48 50 32 50 C48 50 50 52 50 68 C50 52 52 50 68 50 C52 50 50 48 50 32 Z" fill="#ffffff" />
    <circle cx="50" cy="50" r="3" fill="#bae6fd" />
  </svg>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#050B14] text-neutral-100 font-sans selection:bg-sky-500/30 overflow-x-hidden">
      <Toaster theme="dark" />
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-sky-900/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#050B14]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <OriginXLogo className="w-8 h-8" />
          <span className="text-xl font-medium tracking-wide">OriginX</span>
        </div>
        <button 
          onClick={() => {
            toast.info("这是一个概念演示页面。在实际项目中，这里会下载由设计师从 Figma 导出的完整 PDF 手册。", {
              duration: 4000,
              position: "top-center"
            });
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/10 cursor-pointer"
        >
          <Download size={16} />
          下载完整品牌手册
        </button>
      </nav>

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center mt-12 mb-32">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 mb-12 drop-shadow-[0_0_60px_rgba(56,189,248,0.15)]"
            >
              <OriginXLogo className="w-full h-full" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight text-white mb-4">
                OriginX
              </h1>
              <h2 className="text-2xl md:text-3xl font-light tracking-[0.4em] text-neutral-400 mb-8 ml-3">
                源极科技
              </h2>
              
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-lg md:text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500">
                  源于智能 <span className="mx-4 text-white/20">/</span> 极于应用
                </p>
              </div>
              <p className="mt-6 text-sm text-neutral-500 tracking-widest uppercase">
                —— 赋能每一个垂直领域 ——
              </p>
            </motion.div>
          </div>

          {/* Brand Philosophy Section */}
          <div className="mb-32">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-sky-400 uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-sky-400"></span>
              Brand Philosophy
            </h3>
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-12 leading-tight">
                “始于本源，触达极境。”
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <p className="text-lg text-neutral-400 leading-relaxed font-light">
                  在人工智能爆发的奇点时代，“OriginX 源极科技” 诞生于对计算本质的敬畏。<br/><br/>
                  OriginX 的使命，就是将最基础的数据与算力（源），转化为不可估量的未来可能性（极）。
                </p>
                <div className="space-y-6 text-neutral-300 font-light leading-relaxed">
                  <div>
                    <strong className="text-white font-medium">源（Origin）</strong> 代表着万物之始、底层算力的发源地，是我们对底层技术毫不妥协的扎根。
                  </div>
                  <div>
                    <strong className="text-white font-medium">极（X）</strong> 代表着未知的象限、无限的变量，是我们利用 AI 拓展人类能力边界的极限探索。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Inspiration Section */}
          <div className="mb-32">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-sky-400 uppercase mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-sky-400"></span>
              Design Inspiration
            </h3>
            
            <div className="mb-12">
              <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                这款 Logo 的灵感直接溯源于理论物理学与天体物理学中的宏大意象，摒弃了传统互联网公司浮夸的声光电特效，用最极致的数学几何美学来表达 AI 算力的深邃。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Point 1 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <Zap size={20} />
                </div>
                <h4 className="text-xl font-medium text-white mb-4">1. 中心星核<br/><span className="text-sm text-neutral-500 font-normal">The Origin Core</span></h4>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p><strong className="text-sky-400 font-medium">视觉：</strong><span className="text-neutral-400">Logo 正中心的四角芒星，犹如太空中最明亮的类星体（Quasar），光芒虽然被极致压缩，但极其尖锐、凝练。</span></p>
                  <p><strong className="text-sky-400 font-medium">隐喻：</strong><span className="text-neutral-400">它象征着 AGI（通用人工智能）的“奇点”，也代表着强大的核心计算引擎（CPU/GPU Node）。它是绝对理性的中心，是一切数据流转发的唯一真理之源。</span></p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <Globe size={20} />
                </div>
                <h4 className="text-xl font-medium text-white mb-4">2. 交错轨道<br/><span className="text-sm text-neutral-500 font-normal">The X Orbits</span></h4>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p><strong className="text-sky-400 font-medium">视觉：</strong><span className="text-neutral-400">两条极其纤细、遵循严格黄金比例的椭圆弧线，以完美的 90 度夹角在三维空间中交错，自然地勾勒出字母“X”的轮廓。</span></p>
                  <p><strong className="text-sky-400 font-medium">隐喻：</strong><span className="text-neutral-400">这隐喻了神经网络的连接。宏观上它像行星绕行恒星的精密天体轨道；微观上像原子核外电子跃迁的量子轨迹。这种“宏观与微观的统一”展现了算法架构遵循第一性原理的严谨。</span></p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                  <Hexagon size={20} />
                </div>
                <h4 className="text-xl font-medium text-white mb-4">3. 隐晦的泛光<br/><span className="text-sm text-neutral-500 font-normal">Restrained Glow</span></h4>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p><strong className="text-sky-400 font-medium">视觉：</strong><span className="text-neutral-400">我们去掉了廉价的高亮发光滤镜，取而代之的是在星核背后极弱、极通透的一层深蓝径向渐变晕染。</span></p>
                  <p><strong className="text-sky-400 font-medium">隐喻：</strong><span className="text-neutral-400">这层克制的光晕就像宇宙中蕴含巨大质量的暗物质。它代表着源极科技虽然拥有极其恐怖的底层算力储备，但对外输出的服务却是稳定、安全、可控、不喧哗的。</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Color System */}
          <div className="mb-32">
             <h3 className="text-sm font-semibold tracking-[0.2em] text-sky-400 uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-sky-400"></span>
              Color Aesthetic
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-2xl font-medium mb-12 text-white">深空蓝与天际青</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-[#1e3a8a] shrink-0 shadow-[0_10px_30px_rgba(30,58,138,0.3)] border border-white/10"></div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-2">主色调 (Deep Space Indigo)</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">代表着对未知的探索、企业级的绝对安全感与稳重底色。</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-[#38bdf8] shrink-0 shadow-[0_10px_30px_rgba(56,189,248,0.3)] border border-white/10"></div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-2">高亮色 (Horizon Cyan)</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">在星芒和轨道的高光处点缀的一抹天际青，代表着科技的生命力、灵感闪现的瞬间以及 AI 带来的希望。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Mockups */}
          <div>
            <h3 className="text-2xl font-medium mb-8 text-white">垂直领域应用 Mockup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Software Dashboard Mockup */}
              <div className="bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-[#020617] px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  </div>
                  <div className="bg-white/5 rounded px-4 py-1 text-[10px] text-neutral-500 font-mono">
                    app.originx.ai / vertical-solutions
                  </div>
                  <div className="w-12"></div>
                </div>
                <div className="p-8 h-[320px] bg-gradient-to-b from-[#0f172a] to-[#020617] relative">
                  {/* Dashboard Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <OriginXLogo className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">OriginX Copilot</div>
                      <div className="text-blue-400/60 text-xs">Empowering Vertical Domains</div>
                    </div>
                  </div>
                  {/* Dashboard Content Skeletons */}
                  <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="col-span-2 space-y-4">
                      <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-32 bg-white/5 rounded-xl border border-white/5"></div>
                    </div>
                    <div className="col-span-1 bg-white/5 rounded-xl border border-white/5"></div>
                  </div>
                </div>
              </div>

              {/* Business Card Mockup */}
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-3xl flex items-center justify-center p-8 shadow-2xl relative overflow-hidden h-[400px] border border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                
                {/* Card Front */}
                <motion.div 
                  initial={{ rotateY: -15, rotateX: 10 }}
                  whileHover={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-[320px] h-[180px] bg-[#020617] rounded shadow-2xl relative z-10 border border-white/10 p-8 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <OriginXLogo className="w-10 h-10" />
                    <div className="text-right">
                      <div className="text-white text-sm font-medium tracking-wide">Alex Zhang</div>
                      <div className="text-sky-400 text-[10px] mt-1 font-mono">Product Director</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-white text-xl font-serif italic tracking-wide">OriginX</div>
                    <div className="text-neutral-500 text-xs tracking-[0.3em] mt-1">源极科技</div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center relative z-10">
        <OriginXLogo className="w-6 h-6 mx-auto mb-4 opacity-50" />
        <p className="text-xs text-neutral-600 tracking-widest font-mono">© 2026 ORIGINX.AI. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

