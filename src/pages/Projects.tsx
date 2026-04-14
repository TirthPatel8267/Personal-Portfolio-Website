import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

// ✅ REAL PROJECT DATA
const projectsData: Project[] = [
  {
    id: "eventify",
    title: "Eventify",
    description: "Event booking platform like BookMyShow",
    longDescription: "A full-stack event booking system where users can browse, book, and manage events easily.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/eventify.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  },
  {
    id: "pixel",
    title: "Pixel n Plate",
    description: "Cafe + gaming platform",
    longDescription: "A modern cafe website with gaming zone and event booking features.",
    tags: ["React", "Tailwind"],
    image: "/images/ewaste.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  },
  {
    id: "ewaste",
    title: "E-Waste Management",
    description: "Waste tracking system",
    longDescription: "Platform to manage and recycle electronic waste efficiently.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/ewaste.png",
    liveUrl:"https://ewaste-management-system-tau.vercel.app",
    githubUrl: "https://github.com/TirthPatel8267"
  },
  {
    id: "dashboard",
    title: "Power BI Dashboard",
    description: "Data analytics dashboard",
    longDescription: "Interactive dashboards built using Power BI for business insights.",
    tags: ["Power BI", "SQL"],
    image: "/images/dashboard.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  }
];

// 🔥 CARD COMPONENT (same premium)
const ProjectCard = ({ project, onClick }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="cursor-pointer rounded-3xl overflow-hidden glass"
    >
      <img src={project.image} className="w-full h-52 object-cover" />
      <div className="p-6">
        <h3 className="text-white text-xl font-bold">{project.title}</h3>
        <p className="text-slate-400 text-sm">{project.description}</p>
      </div>
    </motion.div>
  );
};

// 🔥 MODAL
const ProjectModal = ({ project, onClose }: any) => {
  return (
    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-black p-8 rounded-xl max-w-3xl w-full">
        <button onClick={onClose} className="float-right text-white">
          <X />
        </button>

        <h2 className="text-white text-3xl mb-4">{project.title}</h2>
        <p className="text-slate-400 mb-6">{project.longDescription}</p>

        <div className="flex gap-4">
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="bg-cyan-500 px-4 py-2 rounded text-white flex items-center gap-2">
            Live <ExternalLink size={16} />
          </a>
          <a href={project.githubUrl} target="_blank" className="border px-4 py-2 rounded text-white flex items-center gap-2">
            Code <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">

      <h1 className="text-4xl text-white mb-10">My Projects</h1>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {projectsData.map((p) => (
          <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}