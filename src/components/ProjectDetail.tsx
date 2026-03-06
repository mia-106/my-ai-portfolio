import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowLeft, MoveRight, Brain, Shield, Sparkles, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';
import mermaid from 'mermaid';
import InteractiveFlowChart from './InteractiveFlowChart';
import TerminalFlowChart from './TerminalFlowChart';

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    coverImage: string;
    screenshot?: string;
    architecture: string;
    architectureTitle?: string;
    architectureDescription?: string;
    challenges: { scenario: string; challenge: string; solution: string }[];
    highlights: string[];
    demoVideos?: {
      title: string;
      description: string;
      video: string;
      features: string[];
    }[];
    github?: string;
    demo?: string;
    capabilities?: {
      icon: string;
      label: string;
      labelEn: string;
      proof: string;
    }[];
    features?: {
      title: string;
      description: string;
      image?: string;
      diagram?: string;
      interactiveChart?: {
        title: string;
        description: string;
        nodes: {
          id: string;
          label: string;
          x: number;
          y: number;
          color: string;
          type: 'input' | 'process' | 'decision' | 'output';
        }[];
        connections: {
          from: string;
          to: string;
          label?: string;
          color: string;
        }[];
      };
      terminalFlow?: {
        title: string;
        description: string;
        steps: {
          node: {
            id: string;
            label: string;
            type: 'input' | 'process' | 'decision' | 'output';
            description?: string;
            code?: string;
          };
          delay: number;
          highlight?: string[];
        }[];
      };
      points?: string[];
    }[];
    productionEngineering?: {
      title: string;
      description: string;
      challenge: {
        title: string;
        content: string;
      };
      solution: {
        title: string;
        content: string;
      };
    };
    projectInsights?: {
      title: string;
      description: string;
      technicalGrowth: string[];
      productThinking: string[];
      keyLearnings: string[];
    };
  };
  onBack: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Shield, Sparkles, DollarSign
};

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const architectureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  // Separate effect for Mermaid rendering
  useEffect(() => {
    if (!project.architecture) {
      console.log('No architecture data found for', project.title);
      return;
    }
    
    console.log('Setting up Mermaid for', project.title);
    
    // Initialize Mermaid with updated config for better compatibility
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#ffffff', 
        primaryBorderColor: '#ffffff',
        lineColor: '#ffffff',
        sectionBkgColor: 'transparent',
        altSectionBkgColor: 'transparent',
        gridColor: 'transparent',
        secondaryColor: '#ffffff',
        tertiaryColor: '#ffffff',
        background: 'transparent',
        mainBkg: 'transparent',
        secondBkg: 'transparent',
        tertiaryBkg: 'transparent'
      },
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
        padding: 20
      }
    });

    // Simple render function
    const renderDiagram = async () => {
      if (!architectureRef.current) return;
      
      try {
        console.log('Rendering Mermaid diagram...');
        
        // Clear previous content
        architectureRef.current.innerHTML = '';
        
        // Create unique ID
        const diagramId = `mermaid-${project.id}-${Date.now()}`;
        
        // Render the diagram
        const { svg } = await mermaid.render(diagramId, project.architecture);
        architectureRef.current.innerHTML = svg;
        
        // Basic styling
        const svgElement = architectureRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = '100%';
          svgElement.style.height = 'auto';
          svgElement.style.margin = '0 auto';
          svgElement.style.display = 'block';
          svgElement.style.width = '100%';
        }
        
        console.log('Mermaid diagram rendered successfully');
      } catch (error) {
        console.error('Mermaid render error:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        if (architectureRef.current) {
          architectureRef.current.innerHTML = `
            <div class="text-white/20 text-center p-8">
              <p class="mb-2">架构图加载失败</p>
              <p class="text-xs text-white/10">错误: ${error instanceof Error ? error.message : String(error)}</p>
              <div class="mt-4 text-xs text-white/5">
                <pre class="whitespace-pre-wrap">${project.architecture}</pre>
              </div>
            </div>
          `;
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(renderDiagram, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [project.architecture, project.id, project.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#000] text-white selection:bg-white/20"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white transition-all"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to Projects</span>
      </button>

      {/* Hero Section */}
      {project.id !== 'xhs-content-engine' && (
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">
              Project Spotlight: 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-normal mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent overflow-visible"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto font-light"
          >
            {project.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {project.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white/60 font-medium">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => {
                console.log('Opening demo link:', project.demo);
                window.open(project.demo, '_blank', 'noopener,noreferrer');
              }}
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
            >
              Live Demo <MoveRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                console.log('Opening GitHub link:', project.github);
                window.open(project.github, '_blank', 'noopener,noreferrer');
              }}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" /> View Source
            </button>
          </motion.div>
        </div>
      </section>
      )}

      {/* Capabilities Cards */}
      {project.capabilities && project.capabilities.length > 0 && project.id !== 'xhs-content-engine' && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.capabilities?.map((cap, idx) => {
                const Icon = iconMap[cap.icon] || Brain;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] hover:border-white/20 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{cap.label}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {cap.proof}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Sections */}
      {project.features?.map((feature, idx) => (
        <section key={idx} className="py-24 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
              <div className="flex-1 space-y-8">
                <motion.h2
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  {feature.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-white/50 leading-relaxed font-light"
                >
                  {feature.description}
                </motion.p>
                <motion.ul
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {feature.points?.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 text-white/60">
                      <CheckCircle2 className="w-5 h-5 text-white/20" />
                      <span className="text-sm font-medium tracking-wide">{point}</span>
                    </li>
                  ))}
                </motion.ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 w-full relative group"
              >
                {/* Video Display */}
                <div className="relative">
                  {feature.title === 'AI 智能交互' ? (
                    /* Phone Mockup for Vertical Video */
                    <div className="flex justify-center items-center p-8 h-[600px]">
                      <div className="relative">
                        {/* Phone Frame */}
                        <div className="w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl border border-white/20">
                          {/* Phone Screen */}
                          <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>
                            {/* Video */}
                            <video
                              src="/project-screenshots/演示3.mp4"
                              className="w-full h-full object-cover rounded-[2rem]"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        </div>
                        {/* Phone Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] pointer-events-none"></div>
                      </div>
                    </div>
                  ) : feature.title === '事项记录系统' ? (
                    /* Phone Mockup for Vertical Video */
                    <div className="flex justify-center items-center p-8 h-[600px]">
                      <div className="relative">
                        {/* Phone Frame */}
                        <div className="w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl border border-white/20">
                          {/* Phone Screen */}
                          <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>
                            {/* Video */}
                            <video
                              src="/project-screenshots/演示2.mp4"
                              className="w-full h-full object-cover rounded-[2rem]"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        </div>
                        {/* Phone Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] pointer-events-none"></div>
                      </div>
                    </div>
                  ) : feature.title === '物理引擎模拟' ? (
                    /* Phone Mockup for Vertical Video */
                    <div className="flex justify-center items-center p-8 h-[600px]">
                      <div className="relative">
                        {/* Phone Frame */}
                        <div className="w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl border border-white/20">
                          {/* Phone Screen */}
                          <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>
                            {/* Video */}
                            <video
                              src="/project-screenshots/演示3.mp4"
                              className="w-full h-full object-cover rounded-[2rem]"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        </div>
                        {/* Phone Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] pointer-events-none"></div>
                      </div>
                    </div>
                  ) : (
                    /* Original Browser Mockup for other features */
                    <>
                      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        </div>
                        <div className="relative h-[calc(100%-40px)]">
                          {/* Terminal Flow Chart for YouTube Agentic RAG features */}
                          {feature.terminalFlow ? (
                            <TerminalFlowChart
                              title={feature.terminalFlow.title}
                              description={feature.terminalFlow.description}
                              steps={feature.terminalFlow.steps}
                              className="w-full h-full"
                            />
                          ) : feature.interactiveChart ? (
                            /* Fallback to Interactive Flow Chart */
                            <InteractiveFlowChart
                              title={feature.interactiveChart.title}
                              description={feature.interactiveChart.description}
                              nodes={feature.interactiveChart.nodes}
                              connections={feature.interactiveChart.connections}
                              className="w-full h-full"
                            />
                          ) : feature.diagram ? (
                            /* Fallback to Mermaid diagram */
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <div className="mermaid-wrapper w-full h-full flex items-center justify-center text-white/80 text-xs font-mono overflow-auto">
                                {feature.diagram}
                              </div>
                            </div>
                          ) : (
                            /* Video for specific features */
                            feature.title === '深度诊断' ? (
                              <video 
                                src="/project-screenshots/简历诊断.mp4" 
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : feature.title === '智感编辑器' ? (
                              <video 
                                src="/project-screenshots/简历修改.mp4" 
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : feature.title === '模拟面试' ? (
                              <video 
                                src="/project-screenshots/模拟面试.mp4" 
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            ) : (
                              /* Fallback for other features */
                              <div className="flex items-center justify-center h-full">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/10 font-bold">
                                  Visual Interface Output
                                </span>
                              </div>
                            )
                          )}
                        </div>
                        {/* Subtle hover effect for the "browser" */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Demo Videos Section */}
      {project.demoVideos && project.demoVideos.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  Live Demo
                </span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light max-w-2xl mx-auto">
                实际运行演示 - 展示系统的核心功能和技术实现
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {project.demoVideos.map((video, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group relative"
                >
                  <div className="relative aspect-video bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Video Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(45deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
                        backgroundSize: '50px 50px'
                      }} />
                    </div>
                    
                    {/* Video Element */}
                    <video
                      src={video.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs text-red-400 font-medium">LIVE</span>
                      </div>
                    </div>
                    
                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{video.description}</p>
                    </div>
                  </div>
                  
                  {/* Features Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {video.features.map((feature: string, featureIdx: number) => (
                      <span
                        key={featureIdx}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture Section */}
      {project.architecture && project.id !== 'xhs-content-engine' && (
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            {project.architectureTitle || 'Architecture & Data Flow'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 leading-relaxed mb-16 max-w-2xl mx-auto font-light"
          >
            {project.architectureDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-[3rem] overflow-hidden group"
            style={{
              background: 'transparent',
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
            }}
          >
             {/* Subtle glow effect */}
             <div className="absolute inset-0 opacity-30" style={{
               background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
               filter: 'blur(1px)'
             }} />
             
             {/* Mermaid Architecture Diagram */}
             <div 
                ref={architectureRef}
                className="relative flex items-center justify-center min-h-[400px]"
             />
             
             <div className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">
               System Architecture - {project.architectureTitle || 'Architecture Overview'}
             </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* XHS Content Engine - Complete Custom Page */}
      {project.id === 'xhs-content-engine' && (
        <>
          {/* Hero Section */}
          <section className="relative py-24 px-6 bg-[#050505] overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            {/* Enhanced Floating Orbs */}
            <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
            
            {/* Additional decorative elements */}
            <div className="absolute top-1/2 left-10 w-2 h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-y-1/2" />
            <div className="absolute top-1/2 right-10 w-2 h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-y-1/2" />
            
            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
                  {project.subtitle}
                </p>
                <p className="text-white/60 leading-relaxed max-w-3xl mx-auto">
                  {project.description}
                </p>
              </motion.div>

              {/* Tags with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap justify-center gap-3 mb-16"
              >
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 rounded-lg text-white/60 text-sm hover:border-white/20 hover:text-white/80 transition-all duration-300 backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Automation Pipeline Section */}
          <section className="relative py-24 px-6 bg-[#0a0a0a] overflow-hidden">
            {/* Section Transition Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
              }} />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  自动化流水线
                </h2>
                <p className="text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
                  Claude Code Skills 驱动的全链路自动化流程，从语音输入到视觉成品的工业级流水线
                </p>
              </motion.div>

              {/* Pipeline Flow with enhanced connections */}
              <div className="relative">
                {/* Enhanced Connection Lines */}
                <div className="absolute top-1/2 left-1/4 right-1/4 h-1px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/60 rounded-full -translate-y-1/2 shadow-lg shadow-white/20" />
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/60 rounded-full -translate-y-1/2 shadow-lg shadow-white/20" />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 relative z-10">
                {/* Skill 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl hover:from-white/[0.05] hover:to-white/[0.02] transition-all duration-300 backdrop-blur-sm group">
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center">
                        <span className="text-white/60 font-mono text-sm">01</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">voice2note</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed mb-6">
                      语音炼金术：从语音输入到结构化笔记的智能转换，包含主动追问机制确保准确性
                    </p>
                    <div className="bg-black/50 rounded-xl p-4 mb-6">
                      <img src="/project-screenshots/skill2.jpg" alt="voice2note 输出" className="w-full rounded-lg" />
                    </div>
                    <div className="space-y-2 text-sm text-white/40 font-mono">
                      <div>✓ Whisper 转录完成</div>
                      <div>✓ 主动追问已启动</div>
                      <div>✓ 结构化笔记已生成</div>
                    </div>
                  </div>
                </motion.div>

                {/* Skill 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl hover:from-white/[0.05] hover:to-white/[0.02] transition-all duration-300 backdrop-blur-sm group relative">
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center">
                        <span className="text-white/60 font-mono text-sm">02</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">analyzer_content</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed mb-6">
                      爆款分析器：七维模型解剖对标案例，提取可复制的成功模式
                    </p>
                    <div className="bg-black/50 rounded-xl p-4 mb-6">
                      <img src="/project-screenshots/skill1.jpg" alt="analyzer_content 输出" className="w-full rounded-lg" />
                    </div>
                    <div className="space-y-2 text-sm text-white/40 font-mono">
                      <div>✓ 模型库扫描完成</div>
                      <div>✓ 七维分析完成</div>
                      <div>✓ 爆款模式已提取</div>
                    </div>
                  </div>
                </motion.div>

                {/* Skill 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl hover:from-white/[0.05] hover:to-white/[0.02] transition-all duration-300 backdrop-blur-sm group relative">
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center">
                        <span className="text-white/60 font-mono text-sm">03</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">yy_director</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed mb-6">
                      内容总监：八阶段标准化流程，从选题诊断到视觉渲染的完整创作链路
                    </p>
                    <div className="bg-black/50 rounded-xl p-4 mb-6">
                      <img src="/project-screenshots/skill3.jpg" alt="yy_director 输出" className="w-full rounded-lg" />
                    </div>
                    <div className="space-y-2 text-sm text-white/40 font-mono">
                      <div>✓ 八阶段流水线执行</div>
                      <div>✓ Jinja2 模板渲染</div>
                      <div>✓ Playwright 截图完成</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">性能指标</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">60-120倍</div>
                    <div className="text-sm text-white/60">效率提升</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">30%</div>
                    <div className="text-sm text-white/60">准确率提升</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">5-10分钟</div>
                    <div className="text-sm text-white/60">单篇内容</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">100%</div>
                    <div className="text-sm text-white/60">视觉一致性</div>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>
          </section>

          {/* Technical Architecture Section */}
          <section className="py-24 px-6 bg-[#050505]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  技术架构
                </h2>
                <p className="text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
                  配置驱动的三层解耦架构，实现数据、逻辑、呈现的完全分离
                </p>
              </motion.div>

              {/* Architecture Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-12 rounded-[3rem] overflow-hidden"
                style={{
                  background: 'transparent',
                  boxShadow: '0 0 50px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                  filter: 'blur(1px)'
                }} />
                
                <div 
                  ref={architectureRef}
                  className="relative flex items-center justify-center min-h-[400px]"
                />
                
                <div className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold text-center">
                  系统架构 - 配置驱动设计
                </div>
              </motion.div>

            </div>
          </section>

          {/* Core Capabilities Section */}
          <section className="py-24 px-6 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  核心能力
                </h2>
                <p className="text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
                  突出 Skill 设计能力和提示词工程能力的技术创新
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.capabilities?.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.01] hover:from-white/[0.04] hover:to-white/[0.02] transition-all duration-300"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative p-6">
                      {/* Icon area */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-white/30 to-white/10 rounded-lg"></div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Title */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
                          {capability.label}
                        </h3>
                        <p className="text-xs text-white/40 font-mono uppercase tracking-wider">
                          {capability.labelEn}
                        </p>
                      </div>
                      
                      {/* Description */}
                      <p className="text-white/60 leading-relaxed text-sm line-clamp-3">
                        {capability.proof}
                      </p>
                      
                      {/* Bottom accent */}
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Project Reflection Section */}
          <section className="py-24 px-6 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-wide"
              >
                <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  项目反思
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 mb-20 max-w-2xl mx-auto font-light text-center tracking-wide leading-relaxed"
              >
                技术探索与工程实践的深度思考
              </motion.p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 技术架构的演进 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                        <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">01</span>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                      技术架构的<br/>演进
                    </h3>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-white/60 leading-relaxed text-sm">
                        • 从硬编码脚本到配置驱动的三层解耦架构<br/>
                        • 引入config.json动态配置、文件驱动数据流、Skill机制抽象<br/>
                        • Claude Code Skill机制：小型Agent Framework，有状态、有生命周期、有质量门禁<br/>
                        • 系统变得可维护、可扩展、可移植
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Prompt工程的边界 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                        <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">02</span>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                      Prompt工程的<br/>边界
                    </h3>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-white/60 leading-relaxed text-sm">
                        • 从单次交互优化到"Prompt系统工程"<br/>
                        • 主动追问机制、Phase Gate设计、质量门禁<br/>
                        • AI从被动执行到主动参与质量保证<br/>
                        • 七维爆款分析模型：结构化思维 + AI执行
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 工程实践的思考 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                        <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">03</span>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                      工程实践的<br/>思考
                    </h3>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-white/60 leading-relaxed text-sm">
                        • 60-120倍效率提升来自整个系统协同优化<br/>
                        • 语音转录准确率提升30%，影响后续所有环节<br/>
                        • 配置驱动架构：跨设备无缝迁移<br/>
                        • "一次设计，多处运行"的工程抽象价值
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          </>
      )}

      {/* Production Engineering Section */}
      {project.productionEngineering && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
            >
              {project.productionEngineering.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 mb-16 max-w-2xl font-light"
            >
              {project.productionEngineering.description}
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-10 bg-red-500/[0.02] border border-red-500/10 rounded-[2.5rem] hover:bg-red-500/[0.04] transition-all"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/60">The Challenge</span>
                </div>
                <h3 className="text-2xl font-bold mb-6">{project.productionEngineering.challenge.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">
                  {project.productionEngineering.challenge.content}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-10 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2.5rem] hover:bg-emerald-500/[0.04] transition-all"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/60">The Solution</span>
                </div>
                <h3 className="text-2xl font-bold mb-6">{project.productionEngineering.solution.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">
                  {project.productionEngineering.solution.content}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Project Insights Section */}
      {project.projectInsights && (
        <section className="py-24 px-6 bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-wide"
            >
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                {project.projectInsights.title}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 mb-20 max-w-2xl mx-auto font-light text-center tracking-wide leading-relaxed"
            >
              {project.projectInsights.description}
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Technical Growth */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                      <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">01</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                    技术能力<br/>提升
                  </h3>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    {project.projectInsights.technicalGrowth.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="w-0.5 h-0.5 rounded-full bg-white/20 mt-2 group-hover/item:bg-white/40 transition-colors" />
                        <span className="text-white/60 font-light leading-relaxed tracking-wide group-hover/item:text-white/70 transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Product Thinking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                      <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">02</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                    产品思维<br/>培养
                  </h3>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    {project.projectInsights.productThinking.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="w-0.5 h-0.5 rounded-full bg-white/20 mt-2 group-hover/item:bg-white/40 transition-colors" />
                        <span className="text-white/60 font-light leading-relaxed tracking-wide group-hover/item:text-white/70 transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Key Learnings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-black/20 border border-white/10 rounded-[1.5rem] hover:border-white/20 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
                      <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white/40 font-mono">03</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-light mb-8 tracking-wider text-white/80 group-hover:text-white/90 transition-colors">
                    核心收获
                  </h3>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    {project.projectInsights.keyLearnings.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="w-0.5 h-0.5 rounded-full bg-white/20 mt-2 group-hover/item:bg-white/40 transition-colors" />
                        <span className="text-white/60 font-light leading-relaxed tracking-wide group-hover/item:text-white/70 transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Spacer */}
      <div className="h-32" />
    </motion.div>
  );
}
