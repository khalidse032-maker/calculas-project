import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { id: 1, title: 'Foundations', desc: 'The math basics you forgot, re-explained for engineers.' },
  { id: 2, title: 'Functions', desc: 'Modeling state and mapping inputs to outputs.' },
  { id: 3, title: 'Limits', desc: 'Approaching edges.' },
  { id: 4, title: 'Derivatives', desc: 'Measuring rates of change.' },
  { id: 5, title: 'Integrals', desc: 'Adding up areas and accumulation.' },
  { id: 6, title: 'Optimization', desc: 'Finding peaks and valleys.' },
  { id: 7, title: 'AI', desc: 'Gradient descent in ML.' },
  { id: 8, title: 'Games', desc: 'Physics and velocity curves.' },
  { id: 9, title: 'Graphics', desc: 'Vectors and rendering.' },
  { id: 10, title: 'Robotics', desc: 'Kinematics and motion.' },
  { id: 11, title: 'Final Challenge', desc: 'Put it all together in a simulated system.' }
];

export default function Section4() {
  const [activeModule, setActiveModule] = useState(1);

  return (
    <section className="py-20 px-6 min-h-screen bg-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Your Journey
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Path Sidebar */}
          <div className="lg:w-1/3 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="relative border-l-2 border-white/10 ml-4">
              {modules.map((mod) => (
                <div 
                  key={mod.id}
                  className="mb-8 pl-8 relative cursor-pointer group"
                  onClick={() => setActiveModule(mod.id)}
                >
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all duration-300 ${activeModule === mod.id ? 'bg-primary scale-125' : 'bg-card border-2 border-white/20 group-hover:border-primary'}`} />
                  <h4 className={`font-bold transition-colors ${activeModule === mod.id ? 'text-primary' : 'text-muted group-hover:text-white'}`}>
                    <span className="opacity-50 mr-2 text-sm">{mod.id.toString().padStart(2, '0')}</span>
                    {mod.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Module Detail Card */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-8 text-primary font-mono text-sm">
                  <span>MODULE {activeModule.toString().padStart(2, '0')}</span>
                  <div className="flex-1 h-px bg-primary/20" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{modules[activeModule-1].title}</h3>
                <p className="text-muted text-lg mb-8">{modules[activeModule-1].desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <h5 className="font-bold text-secondary mb-2 text-sm">WHAT YOU'LL DISCOVER</h5>
                    <p className="text-sm text-text/80">Interactive, code-free visual modules covering core {modules[activeModule-1].title.toLowerCase()} intuition.</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5">
                    <h5 className="font-bold text-accent mb-2 text-sm">REAL SOFTWARE CONNECTION</h5>
                    <p className="text-sm text-text/80">See the exact algorithms and engine logic that rely on this math.</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-white/5 md:col-span-2 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-primary mb-2 text-sm">PRACTICAL CHALLENGE</h5>
                      <p className="text-sm text-text/80">Tinker with a mini-sandbox to lock in the concept.</p>
                    </div>
                    <button className="interactive-button bg-primary/20 text-primary border border-primary/50 text-sm px-4 py-2 hover:bg-primary hover:text-white">
                      Start Module
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
