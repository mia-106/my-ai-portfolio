import { motion } from 'framer-motion';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/50 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ opacity: 0.7 }}
          className="text-lg font-bold tracking-[0.3em] uppercase cursor-pointer"
        >
          XL.HUANG
        </motion.div>

        <nav className="hidden md:flex items-center gap-12">
          {['Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase());
              }}
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('footer')}
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all"
        >
          Let's Talk
        </motion.button>
      </div>
    </motion.header>
  );
}
