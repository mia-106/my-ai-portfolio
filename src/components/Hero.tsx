import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#000]">
      {/* 细腻的背景元素 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/60">
              Hi, I'm 黄晓玲 · AI Application Engineer
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[1.1] text-white">
            <span className="text-white/50">驾驭大模型能力，</span> <br />
            构建真实产品。
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
        >
          非传统科班出身，但我利用 AI 赋予的 <span className="text-white font-medium">10 倍生产力</span>，在极短时间内独立交付了 4 个涵盖 <span className="text-white font-medium">LangGraph</span>、<span className="text-white font-medium">RAG</span> 与 <span className="text-white font-medium">现代 Web 架构</span> 的完整 AI 应用。我不只写代码，我用 AI 解决真实的业务痛点。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-8 py-4 bg-white text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            探索项目
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            联系我
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
