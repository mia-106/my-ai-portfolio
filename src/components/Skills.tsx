import { motion } from 'framer-motion';
import { Brain, Zap, Boxes, Globe, Code, MessageSquare } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

// 基于所有项目实际tags汇总的技能树

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & LLM',
    icon: <Brain className="w-5 h-5 text-white/60" />,
    skills: ['DeepSeek API', 'Claude Code Skills', '多 Agent 人设设计', 'LangGraph', 'BGE-M3', 'BGE Reranking'],
  },
  {
    title: '前端框架',
    icon: <Globe className="w-5 h-5 text-white/60" />,
    skills: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    title: '后端 & API',
    icon: <Zap className="w-5 h-5 text-white/60" />,
    skills: ['Python', 'FastAPI', 'Node.js', 'PGVector'],
  },
  {
    title: 'AI 工程技术',
    icon: <Boxes className="w-5 h-5 text-white/60" />,
    skills: ['Prompt Engineering', 'RAG', 'Hybrid Search', 'RRF Fusion', 'BM25 Search'],
  },
  {
    title: '专业工具',
    icon: <Code className="w-5 h-5 text-white/60" />,
    skills: ['Playwright', 'Jinja2', 'Matter.js', 'Chart.js', 'Zustand', 'Whisper'],
  },
  {
    title: '特色能力',
    icon: <MessageSquare className="w-5 h-5 text-white/60" />,
    skills: ['物理引擎', '时间可视化', '配置驱动架构', 'Claude Code Skill 机制'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[#000]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            技能树
          </h2>
          <p className="text-xl text-white/40 font-light">
            使用前沿技术构建 AI 解决方案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-white/10 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-xs font-medium bg-white/5 text-white/60 rounded-xl border border-white/5 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
