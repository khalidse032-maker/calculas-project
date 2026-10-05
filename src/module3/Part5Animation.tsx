import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Part5Animation() {
  const [smoothness, setSmoothness] = useState<'linear' | 'ease' | 'spring'>('ease');
  const [trigger, setTrigger] = useState(0); // Used to trigger animation replay
  
  // Graphs representing velocity (derivative of position) for each timing function
  // These are conceptual SVGs
  const graphs = {
    linear: "M 0 50 L 100 50", // Constant velocity
    ease: "M 0 100 Q 50 0 100 100", // Velocity starts 0, goes to max at middle, goes back to 0
    spring: "M 0 100 Q 20 0 30 50 T 60 70 T 80 90 T 100 100" // Oscillation in velocity
  };

  const getTransition = () => {
    if (smoothness === 'linear') return { duration: 2, ease: "linear" as const };
    if (smoothness === 'ease') return { duration: 2, ease: "easeInOut" as const };
    return { type: "spring" as const, stiffness: 100, damping: 10 };
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Derivatives in Animation
        </h2>
        
        <div className="glass-card p-8 md:p-12 mb-12">
          
          <h3 className="text-xl text-center mb-12 text-muted">
            Animation is not just "moving" an object. Software must calculate exactly how the position changes over time internally. <strong className="text-white">This is a derivative problem.</strong>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-white/5 pt-12">
            
            {/* The Animated Object */}
            <div className="flex flex-col gap-6">
               <div className="flex justify-between px-2 text-xs font-bold text-muted uppercase">
                 <span>Start</span>
                 <span>End</span>
               </div>
               
               <div className="relative w-full h-16 bg-background rounded-full border border-white/10 flex items-center px-2">
                 <motion.div 
                   key={trigger}
                   initial={{ left: "0%" }}
                   animate={{ left: "calc(100% - 3rem)" }}
                   transition={getTransition()}
                   className="absolute w-12 h-12 bg-primary rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                 />
               </div>

               <div className="flex justify-center mt-6">
                 <button 
                   onClick={() => setTrigger(t => t + 1)}
                   className="px-6 py-2 bg-primary/20 hover:bg-primary text-white rounded font-bold uppercase tracking-widest text-sm transition-all"
                 >
                   Replay Animation
                 </button>
               </div>
            </div>

            {/* Controls & Velocity Graph */}
            <div className="flex flex-col gap-8 bg-card/40 p-6 rounded-xl border border-white/5">
               <div className="flex gap-4">
                 {(['linear', 'ease', 'spring'] as const).map(type => (
                   <button 
                     key={type}
                     onClick={() => setSmoothness(type)}
                     className={`flex-1 py-3 rounded-lg border uppercase tracking-widest text-xs font-bold transition-all ${smoothness === type ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-white/10 text-muted hover:border-white/30'}`}
                   >
                     {type}
                   </button>
                 ))}
               </div>

               <div className="mt-4">
                 <h4 className="text-sm font-bold tracking-widest mb-4 uppercase text-accent">Internal Velocity Profile</h4>
                 <div className="relative w-full h-32 bg-background/50 rounded-xl overflow-hidden border border-white/5 p-4 flex items-end">
                   <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible" preserveAspectRatio="none">
                      {/* Grid */}
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff11" strokeDasharray="2,2" strokeWidth="0.5" />
                      <line x1="0" y1="100" x2="100" y2="100" stroke="#ffffff11" strokeWidth="0.5" />
                      
                      <motion.path 
                        key={smoothness}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                        d={graphs[smoothness]} 
                        fill="none" stroke="#F59E0B" strokeWidth="2" 
                      />
                   </svg>
                 </div>
                 <div className="flex justify-between mt-2 text-xs text-muted font-mono">
                    <span>Time = 0</span>
                    <span>Time = End</span>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
