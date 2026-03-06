import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import ProjectDetail from './ProjectDetail';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 px-6 bg-[#000]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50">
              精选项目 / Selected Works
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="text-white">聚焦真实业务痛点，</span> <br />
            <span className="text-white/70 font-light">拒绝脆弱的玩具脚本。</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
            不满足于简单的单轮对话 API。在这里浏览我如何结合 <span className="text-white/80 font-medium">多智能体状态管理</span>、<span className="text-white/80 font-medium">高阶提示词工程</span> 与 <span className="text-white/80 font-medium">健壮的容错机制</span>，交付真正具备落地价值的 AI 产品闭环。
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all cursor-pointer"
              whileHover={{
                scale: 1.02,
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 30px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(255,255,255,0.1)"
                ],
                transition: { duration: 0.3 }
              }}
            >
              {/* Cover Image */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                
                {/* Floating Tags */}
                <div className="absolute top-8 left-8 flex flex-wrap gap-2 pointer-events-none">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white/70 text-[10px] uppercase tracking-wider rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light max-w-sm line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ChevronRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
              
              {/* Subtle hover border glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-[2.5rem] transition-colors pointer-events-none" />
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-2 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-[2.5rem] blur-md" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-[2.5rem] blur-lg" />
                <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 详情页 - 固定定位覆盖全屏 */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto"
          >
            <ProjectDetail
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
