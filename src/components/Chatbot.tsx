import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Tirth's AI assistant. Ask me anything about him!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const predefinedAnswers: Record<string, string> = {
    "skills": "Tirth is proficient in React, TypeScript, Node.js, Python, and Power BI. He loves building full-stack apps and data dashboards!",
    "projects": "He has built several cool projects like 'Pixel n Plate' (a cafe/gaming platform) and 'Eventify' (an event booking system). Check out the Projects page for more!",
    "contact": "You can reach Tirth at tirthpatel8267@gmail.com or via the Contact page on this website.",
    "about": "Tirth is a B.Tech ICT student with a passion for creative development and data analytics. He's always looking for new challenges!",
    "experience": "He has experience as a Full Stack Developer Intern and a Data Analyst Intern. He's currently focusing on building high-end web experiences."
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = "I'm not sure about that. Try asking about his skills, projects, or contact info!";
      
      for (const key in predefinedAnswers) {
        if (lowerText.includes(key)) {
          botResponse = predefinedAnswers[key];
          break;
        }
      }

      const botMsg: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 md:w-96 glass-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-4 bg-cyan-500 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Bot size={20} />
                <span className="font-bold">Tirth's AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-black/20">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-cyan-500 text-white rounded-tr-none' 
                      : 'bg-white/10 text-slate-300 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <button 
                onClick={() => handleSend(input)}
                className="p-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </motion.button>
    </div>
  );
};
