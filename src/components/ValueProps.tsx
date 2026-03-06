import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Cpu, Rocket } from 'lucide-react';
import React, { useRef } from 'react';

const valueProps = [
  {
    title: '极速交付的工程流',
    description: '精通 Cursor/Claude 等 AI 编程工作流。能够跳出底层的语法纠缠，以架构师视角进行 Vibe Coding，将业务构想在几天内转化为部署上线的全栈产品。',
    icon: <Zap className="w-5 h-5 text-white" />,
    tag: 'VELOCITY',
  },
  {
    title: '复杂智能体编排',
    description: '不满足于简单的单轮对话 API 调用。深入理解并运用 LangGraph 状态机、多 Agent 协作机制与混合 RAG 架构，构建具有长期记忆和自主决策能力的复杂业务系统。',
    icon: <Cpu className="w-5 h-5 text-white" />,
    tag: 'INTELLIGENCE',
  },
  {
    title: '闭环产品思维',
    description: '具备从 0 到 1 的产品 Owner 意识。从 Prompt 调优、现代化 UI/UX 设计，到大模型异常输出的 Fallback 兜底。告别脆弱的玩具脚本，致力于交付体验完整、高可用性的产品级应用。',
    icon: <Rocket className="w-5 h-5 text-white" />,
    tag: 'OWNERSHIP',
  },
];

function Card({ prop, index }: { prop: typeof valueProps[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative group p-10 bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden transition-colors hover:border-white/10"
    >
      {/* 动态背景光晕 */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${(x as number + 0.5) * 100}% ${(y as number + 0.5) * 100}%, rgba(255,255,255,0.06) 0%, transparent 50%)`
          )
        }}
      />

      {/* 装饰性网格 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid" />

      {/* 标签 */}
      <div className="relative mb-12 flex justify-between items-start">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white/5">
          {prop.icon}
        </div>
        <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 group-hover:text-white/60 transition-colors">
          // {prop.tag}
        </span>
      </div>

      {/* 内容 */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
          {prop.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors">
          {prop.description}
        </p>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

export default function ValueProps() {
  return (
    <section className="py-32 px-6 bg-[#000] relative overflow-hidden">
      {/* 极简背景氛围 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6" 
          />
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold mb-4">
            Value Propositions
          </span>
          <h2 className="text-4xl font-extralight text-white tracking-[0.2em] mb-4">
            为何<span className="text-white/40 italic">选我？</span>
          </h2>
          <motion.div 
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {valueProps.map((prop, index) => (
            <Card key={index} prop={prop} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
