import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">Get In Touch</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Let's Start a Conversation</h1>

            <p className="text-slate-400 text-lg mb-12">
              I'm open to internships, freelance projects, and collaboration opportunities. 
              If you have an idea or project, feel free to reach out — I’d love to work with you.
            </p>

            <div className="space-y-8">
              {[
                { 
                  icon: <Mail className="text-cyan-400" />, 
                  label: "Email", 
                  value: "tirthpatel8267@gmail.com", 
                  href: "mailto:tirthpatel8267@gmail.com" 
                },
                { 
                  icon: <Linkedin className="text-blue-400" />, 
                  label: "LinkedIn", 
                  value: "linkedin.com/in/tirth-patel", 
                  href: "https://www.linkedin.com/in/tirth-patel-4884b028b"
                },
                { 
                  icon: <Github className="text-slate-400" />, 
                  label: "GitHub", 
                  value: "github.com/TirthPatel8267", 
                  href: "https://github.com/TirthPatel8267"
                }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white font-medium text-lg">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* 🔥 HIRE ME BUTTON */}
            <a 
              href="mailto:tirthpatel8267@gmail.com"
              className="inline-block mt-8 px-6 py-3 rounded-full bg-cyan-500 text-white font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition"
            >
              🚀 Hire Me
            </a>
          </div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-12 rounded-3xl glass relative overflow-hidden"
          >
            {/* 
              FormSubmit works flawlessly by using a standard HTML form submission.
              This handles CAPTCHAs and the Activation Request seamlessly! 
            */}
            <form 
              action="https://formsubmit.co/tirthpatel8267@gmail.com" 
              method="POST"
              className="space-y-6" 
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Form Submission from Portfolio!" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    placeholder="your@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                <input 
                  required
                  type="text" 
                  name="subject"
                  placeholder="Project / Internship" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={5} 
                  name="message"
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-cyan-500 text-white font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}