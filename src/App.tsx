import Header from './components/Header';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-white/20">
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </div>
  );
}

export default App;
