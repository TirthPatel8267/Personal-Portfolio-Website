import React from 'react';
import { motion } from 'motion/react';
import { Code2, BarChart3, Layout, Database, Globe, Cpu } from 'lucide-react';

const CircularSkill = ({ name, level, icon }: { name: string; level: number; icon: React.ReactNode; key?: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-cyan-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-white">{name}</div>
        <div className="text-[10px] text-slate-500 font-mono">{level}%</div>
      </div>
    </div>
  );
};

export default function About() {
 const stats = [
  { label: "Projects Completed", value: "5+" },
  { label: "Skills Learned", value: "10+" },
  { label: "Tools Used", value: "8+" },
  { label: "Learning Journey", value: "2+ Years" }
];

  const skills = [
    { name: "Python", level: 90, icon: <Code2 size={20} className="text-cyan-400" /> },
    { name: "C++", level: 85, icon: <Code2 size={20} className="text-blue-400" /> },
    { name: "Java", level: 80, icon: <Database size={20} className="text-emerald-400" /> },
    { name: "Power BI", level: 95, icon: <BarChart3 size={20} className="text-purple-400" /> },
    { name: "SQL", level: 85, icon: <Database size={20} className="text-blue-500" /> },
    { name: "Java Script", level: 80, icon: <Code2 size={20} className="text-yellow-400" /> }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden glass p-2">
              <img 
                src="https://picsum.photos/seed/tirth-about/600/800" 
                alt="Tirth Patel" 
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />
          </motion.div>

          <div className="flex-1">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">About Me</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Tirth Patel</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I am a B.Tech ICT student passionate about building modern web applications and data-driven solutions. 
I have worked on real-world projects like event booking systems, dashboards, and interactive websites. 
My focus is on creating fast, user-friendly, and scalable digital products.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              I enjoy combining creativity with problem-solving, whether it's designing clean user interfaces or analyzing data to extract meaningful insights. 
I am continuously learning and exploring new technologies to improve my skills.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">Expertise</h2>
            <h3 className="text-4xl font-bold text-white">Technical Proficiency</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {skills.map((skill, i) => (
              <CircularSkill key={i} name={skill.name} level={skill.level} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">Experience</h2>
            <h3 className="text-4xl font-bold text-white">My Journey</h3>
          </div>
          <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {[
  { year: "2026", title: "Building Real-World Projects", company: "Self Learning", desc: "Developing projects like Eventify and Pixel n Plate using modern technologies." },
  { year: "2025", title: "Learning Data Analytics", company: "Power BI & SQL", desc: "Creating dashboards and analyzing datasets." },
  { year: "2024", title: "Started Web Development", company: "Self Learning", desc: "Learning HTML, CSS, JavaScript and building projects." }
].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-black text-cyan-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl glass border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-white">{item.title}</div>
                    <time className="font-mono text-xs text-cyan-500">{item.year}</time>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">{item.company}</div>
                  <div className="text-sm text-slate-500">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-12 rounded-3xl glass bg-white/[0.01] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            I'm always looking for new challenges and opportunities to grow. If you're interested in working together or just want to chat about tech, don't hesitate to reach out.
          </p>
         <div className="flex flex-wrap justify-center gap-4">
  <a 
    href="mailto:tirthpatel8267@gmail.com"
    className="px-6 py-3 rounded-full bg-cyan-500 text-white font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]"
  >
    Email Me
  </a>

  <a 
    href="https://github.com/TirthPatel8267"
    target="_blank"
    className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
  >
    GitHub
  </a>

  <a 
    href="https://www.linkedin.com/in/tirth-patel-4884b028b"
    target="_blank"
    className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
  >
    LinkedIn
  </a>
</div>
        </div>
      </div>
    </div>
  );
}
