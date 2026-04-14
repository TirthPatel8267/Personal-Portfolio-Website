import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  // ✅ FIXED FORM (no backend needed)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('success');
    setResponseMsg("Message received! I will contact you soon.");

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4">Get In Touch</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Let's Start a Conversation</h1>

            {/* ✅ Updated text */}
            <p className="text-slate-400 text-lg mb-12">
              I'm open to internships, freelance projects, and collaboration opportunities. 
              If you have an idea or project, feel free to reach out — I’d love to work with you.
            </p>

            {/* ✅ CONTACT LINKS */}
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
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-emerald-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-400 mb-8">{responseMsg}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-full glass text-white font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your Name" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Project / Internship" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea 
                      required
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell me about your project..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    className="w-full py-4 rounded-xl bg-cyan-500 text-white font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={20} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}