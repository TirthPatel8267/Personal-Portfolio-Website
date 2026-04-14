import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  longDescription: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: "eventify",
    title: "Eventify",
    longDescription:
      "Eventify is an event booking platform similar to BookMyShow where users can explore events, book tickets, and manage bookings easily.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/images/eventify.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  },
  {
    id: "pixel",
    title: "Pixel n Plate",
    longDescription:
      "A cafe + gaming platform where users can explore menu, book gaming sessions, and participate in events.",
    tags: ["React", "Tailwind", "Firebase"],
    image: "/images/pixel.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  },
  {
    id: "ewaste",
    title: "E-Waste Management",
    longDescription:
      "A system to manage electronic waste efficiently with tracking and recycling features.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/ewaste.png",
    liveUrl: "#",
    githubUrl: "https://github.com/TirthPatel8267"
  }
];

export default function ProjectDetail() {
  const { id } = useParams();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl text-white mb-4">Project Not Found</h1>
        <Link to="/projects" className="bg-cyan-500 px-4 py-2 rounded text-white">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 max-w-5xl mx-auto">
      <Link to="/projects" className="flex items-center gap-2 text-slate-400 mb-6">
        <ChevronLeft /> Back
      </Link>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <img src={project.image} className="rounded-xl mb-8" />

        <h1 className="text-4xl text-white mb-4">{project.title}</h1>
        <p className="text-slate-400 mb-6">{project.longDescription}</p>

        <div className="mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="mr-2 text-cyan-400">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={project.liveUrl} target="_blank" className="bg-cyan-500 px-4 py-2 rounded text-white flex items-center gap-2">
            Live <ExternalLink size={16} />
          </a>
          <a href={project.githubUrl} target="_blank" className="border px-4 py-2 rounded text-white flex items-center gap-2">
            Code <Github size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}