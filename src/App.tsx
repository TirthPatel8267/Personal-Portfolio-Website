/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import React from 'react';

// Components
import { Layout } from './components/Layout';
import { ThreeBackground } from './components/ThreeBackground';
import { Chatbot } from './components/Chatbot';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed bottom-8 right-24 z-50 w-14 h-14 rounded-full glass flex items-center justify-center text-white"
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? [10, 20, 10] : 10 }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            className="w-1 bg-cyan-500 rounded-full"
          />
        ))}
      </div>
    </motion.button>
  );
};

const CursorGlow = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 glow-mesh opacity-50" />
  );
};

const PageLoader = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-[2px] bg-cyan-500 w-48"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center font-mono text-sm tracking-widest text-cyan-500 uppercase"
            >
              Initializing Portfolio
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <PageLoader />
      <ThreeBackground />
      <CursorGlow />
      <MusicToggle />
      <Chatbot />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
