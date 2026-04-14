import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github, Linkedin, Mail, ChevronRight, Globe, BarChart3, Cpu, Bot, Download, Star, GitBranch, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

const Hero = () => {
  const roles = [
    "I build fast & modern web applications",
    "Web Developer | Problem Solver",
    "Data Analytics Enthusiast"
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
      });
    });
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center text-center pt-20">
      <div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          Tirth <span className="text-cyan-400">Patel</span>
        </h1>

        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl text-slate-400 mb-10"
          >
            {roles[roleIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="flex gap-6 justify-center flex-wrap">
          <Link to="/projects" className="magnetic-btn px-6 py-3 bg-cyan-500 rounded-full text-white font-bold">
            View Projects
          </Link>

          <a href="/TIRTH PATEL RESUME.pdf" download className="magnetic-btn px-6 py-3 border rounded-full text-white flex items-center gap-2">
            Resume <Download size={18} />
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="https://github.com/TirthPatel8267" target="_blank">
            <Github className="text-white hover:text-cyan-400" />
          </a>
          <a href="https://www.linkedin.com/in/tirth-patel-4884b028b" target="_blank">
            <Linkedin className="text-white hover:text-cyan-400" />
          </a>
          <a href="mailto:tirthpatel8267@gmail.com">
            <Mail className="text-white hover:text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Startup Websites", icon: <Globe />, desc: "Modern business websites" },
    { title: "Dashboards", icon: <BarChart3 />, desc: "Data analytics dashboards" },
    { title: "Automation", icon: <Cpu />, desc: "Automate workflows" },
    { title: "AI Tools", icon: <Bot />, desc: "AI-powered apps" }
  ];

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl text-white mb-10">What I Can Build</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div key={i} className="p-6 glass rounded-xl hover:scale-105 transition">
            {s.icon}
            <h3 className="text-white mt-4">{s.title}</h3>
            <p className="text-slate-400 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const GithubFeed = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/TirthPatel8267/repos?per_page=4')
      .then(res => res.json())
      .then(setRepos);
  }, []);

  return (
    <section className="py-20">
      <h2 className="text-center text-white text-3xl mb-10">GitHub Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map(repo => (
          <a key={repo.id} href={repo.html_url} target="_blank" className="p-6 glass rounded-xl">
            <h3 className="text-white">{repo.name}</h3>
            <p className="text-slate-400 text-sm">{repo.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <GithubFeed />

      <section className="py-20 text-center">
        <h2 className="text-4xl text-white mb-6">Ready to Work Together?</h2>
        <Link to="/contact" className="px-6 py-3 bg-white text-black rounded-full font-bold">
          Contact Me
        </Link>
      </section>
    </>
  );
}