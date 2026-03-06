import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="footer" className="relative py-32 px-8 bg-black border-t border-white/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)`,
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Contact Section */}
          <div id="contact" className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-sm font-medium tracking-wide">积极寻求机会</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <a
              href="mailto:18320555635@163.com"
              className="group inline-flex items-center gap-3 text-2xl font-light tracking-tight hover:text-white/80 transition-all duration-300"
            >
              <span className="text-white/40 group-hover:text-white/60 transition-colors">18320555635@</span>
              <span className="text-white font-bold group-hover:text-white/90 transition-colors">163.com</span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

          {/* Copyright */}
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
            <p className="mb-1">© 2026 HUANG XIAOLING</p>
            <p>AI ENGINEER • FULL STACK DEVELOPER</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
