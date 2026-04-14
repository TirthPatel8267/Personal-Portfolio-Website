import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ChevronUp,
  Sun,
  Moon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full glass text-slate-400 hover:text-white transition-all"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} className="text-slate-900" />}
    </motion.button>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-full glass text-white hover:bg-cyan-500 transition-all"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'py-4 glass-dark border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/"
          className="text-3xl font-bold tracking-tighter text-white group"
        >
          T<span className="text-cyan-500 group-hover:neon-glow transition-all">P</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${location.pathname === link.href ? 'text-cyan-500 neon-glow' : 'text-slate-400'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <ThemeToggle />
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button className="p-2 rounded-full glass text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] md:hidden glass-dark flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full glass text-white"
            >
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-3xl font-bold uppercase tracking-[0.2em] ${location.pathname === link.href ? 'text-cyan-500 neon-glow' : 'text-slate-300'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold tracking-tighter text-white">
          TP<span className="text-cyan-500">.</span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 Tirth Patel. Built with Passion & Precision.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
