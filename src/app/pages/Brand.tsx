import React from "react";
import { motion } from "motion/react";
import { Hexagon, Sparkles, Box, Circle, ChevronLeft } from "lucide-react";
import { Link } from "react-router";

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

export function Brand() {
  return (
    <main className="relative z-10 pt-32 pb-32 min-h-screen max-w-5xl mx-auto px-6">
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors group text-sm font-mono"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        RETURN TO ORIGIN
      </Link>

      {/* Hero Section */}
      <FadeIn className="mb-24">
        <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">Brand Philosophy</span>
        <h1 className="text-5xl md:text-6xl font-black font-['Space_Grotesk'] text-white mb-8 leading-tight">
          始于<span className="text-blue-400">本源</span>，<br />
          触达<span className="text-purple-400">极境</span>。
        </h1>
        <div className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl font-light space-y-6">
          <p>
            在人工智能爆发的奇点时代，“OriginX 源极科技” 诞生于对计算本质的敬畏。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-400 font-['Space_Grotesk'] mb-3">源 Origin</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                代表着万物之始、底层算力的发源地，是我们对底层技术毫不妥协的扎根。
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-purple-400 font-['Space_Grotesk'] mb-3">极 X</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                代表着未知的象限、无限的变量，是我们利用 AI 拓展人类能力边界的极限探索。
              </p>
            </div>
          </div>
          <p className="pt-4 text-slate-400 italic text-base">
            "OriginX 的使命，就是将最基础的数据与算力（源），转化为不可估量的未来可能性（极）。"
          </p>
        </div>
      </FadeIn>

      {/* Design Inspiration */}
      <div className="space-y-32">
        <section>
          <FadeIn>
            <span className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-4 block">Design Inspiration</span>
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white mb-6">设计灵感与视觉解构</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-3xl mb-16">
              这款 Logo 的灵感直接溯源于理论物理学与天体物理学中的宏大意象，摒弃了传统互联网公司浮夸的声光电特效，用最极致的数学几何美学来表达 AI 算力的深邃。
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core 1 */}
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping opacity-20" />
                  <Sparkles className="w-6 h-6 text-blue-400 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">1. 中心星核<br/><span className="text-sm font-mono text-blue-400 mt-1 block">The Origin Core</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-slate-300">视觉：</strong>正中心的四角芒星，犹如太空中最明亮的类星体，光芒被极致压缩，极其尖锐、凝练。<br/><br/>
                  <strong className="text-slate-300">隐喻：</strong>象征 AGI 的“奇点”，代表源极强大的核心计算引擎。它是绝对理性的中心，是一切数据流转发的唯一真理之源。
                </p>
              </div>
            </FadeIn>

            {/* Core 2 */}
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 relative">
                  <Circle className="w-6 h-6 text-purple-400 absolute opacity-50 rotate-45" />
                  <Circle className="w-6 h-6 text-blue-400 absolute opacity-50 -rotate-45" />
                  <Hexagon className="w-5 h-5 text-white relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">2. 交错轨道<br/><span className="text-sm font-mono text-purple-400 mt-1 block">The X Orbits</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-slate-300">视觉：</strong>纤细、遵循严格黄金比例的椭圆弧线，以完美的 90 度夹角在三维空间中交错，自然勾勒出字母“X”。<br/><br/>
                  <strong className="text-slate-300">隐喻：</strong>隐喻 AI 神经网络的连接。宏观上像行星天体轨道，微观上像电子跃迁轨迹。展现算法架构遵循第一性原理的严谨。
                </p>
              </div>
            </FadeIn>

            {/* Core 3 */}
            <FadeIn delay={0.3}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md" />
                  <Box className="w-6 h-6 text-indigo-400 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">3. 隐晦的泛光<br/><span className="text-sm font-mono text-indigo-400 mt-1 block">Restrained Glow</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-slate-300">视觉：</strong>去掉廉价的高亮发光滤镜，取而代之的是星核背后极弱、极通透的一层深蓝径向渐变晕染。<br/><br/>
                  <strong className="text-slate-300">隐喻：</strong>真正的能量是内敛的。像宇宙中的暗物质或黑洞边缘的事件视界，代表着源极输出的服务稳定、安全、可控、不喧哗。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Color Aesthetic */}
        <section>
          <FadeIn>
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4 block">Color Aesthetic</span>
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white mb-10">色彩美学：深空蓝与天际青</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 p-8 rounded-3xl bg-[#0B0F19] border border-blue-900/50 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/30 blur-[50px] rounded-full" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">深空蓝</h3>
                  <span className="text-blue-400 font-mono text-sm block mb-6">Deep Space Indigo</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed z-10 relative">
                  代表着对未知的探索、企业级的绝对安全感与稳重底色。它是不容置疑的技术底盘，承载着所有复杂计算的基础。
                </p>
              </div>

              <div className="flex-1 p-8 rounded-3xl bg-gradient-to-br from-[#0F1E29] to-[#0A121A] border border-cyan-900/50 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 blur-[50px] rounded-full" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">天际青</h3>
                  <span className="text-cyan-400 font-mono text-sm block mb-6">Horizon Cyan</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed z-10 relative">
                  在星芒和轨道的高光处点缀的一抹亮色。它代表着科技的生命力、灵感闪现的瞬间，以及 AI 带来的生机与希望。
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </main>
  );
}