import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Crosshair, Map, Activity, Zap, Shield, Play } from 'lucide-react';
import type { ScreenType } from '../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function FinalBoss({ onNext, setScore }: Props) {
  const [activeModules, setActiveModules] = useState<string[]>([]);
  const [showVictory, setShowVictory] = useState(false);
  
  const modules = [
    { id: 'derivative', name: 'Derivative Engine', icon: Activity, desc: 'Real-time velocity tracking', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { id: 'integral', name: 'Integral Accumulator', icon: Map, desc: 'Total path prediction', color: 'text-green-400', bg: 'bg-green-500/20' },
    { id: 'limit', name: 'Limit Bounds', icon: Shield, desc: 'Collision / Edge-case handler', color: 'text-orange-400', bg: 'bg-orange-500/20' },
    { id: 'optimization_ai', name: 'Gradient Optimizer', icon: Crosshair, desc: 'Error reduction (AI)', color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { id: 'optimization_sys', name: 'Resource Balancer', icon: Zap, desc: 'Peak efficiency config', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  ];

  const handleToggleModule = (id: string) => {
    setActiveModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const isReadyToRun = activeModules.length === modules.length;

  const handleRunSimulation = () => {
    if (isReadyToRun) {
      setScore(prev => prev + 100);
      setShowVictory(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      {!showVictory ? (
        <motion.div
           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
           className="flex flex-col flex-1"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-rose-500 mb-4 tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
              Final Challenge: Autonomous Agent
            </h2>
            <p className="text-xl text-muted font-light max-w-2xl mx-auto">
              You are deploying an autonomous game character. It must handle movement, pathfinding, AI learning, system resources, and physics bounds simultaneously. 
              Power up all required core engines to bring the agent online.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 items-center">
            
            {/* The Agent Visualization */}
            <div className="flex items-center justify-center relative min-h-[400px]">
               <div className={`w-64 h-64 border-4 rounded-full flex items-center justify-center relative transition-all duration-1000 ${
                 isReadyToRun ? 'border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.4)]' : 'border-rose-900 shadow-[0_0_30px_rgba(244,63,94,0.1)]'
               }`}>
                 
                 <Bot className={`w-32 h-32 transition-colors duration-1000 ${isReadyToRun ? 'text-green-400' : 'text-rose-900'}`} />
                 
                 {/* Orbiting nodes */}
                 {modules.map((mod, i) => {
                   const isActive = activeModules.includes(mod.id);
                   const angle = (i * (360 / modules.length)) * (Math.PI / 180);
                   const radius = 160;
                   const x = Math.cos(angle) * radius;
                   const y = Math.sin(angle) * radius;

                   return (
                     <motion.div
                       key={mod.id}
                       animate={{ 
                         x, y, 
                         scale: isActive ? 1 : 0.8,
                         opacity: isActive ? 1 : 0.3
                       }}
                       transition={{ type: 'spring' }}
                       className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg bg-black
                         ${isActive ? `border-[currentColor] ${mod.color} ${mod.bg}` : 'border-white/10 text-muted bg-white/5'}
                       `}
                     >
                       <mod.icon className="w-5 h-5" />
                     </motion.div>
                   )
                 })}

                 {/* Central Core Pulse */}
                 {isReadyToRun && (
                   <motion.div 
                     initial={{ scale: 0, opacity: 0.8 }}
                     animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="absolute inset-0 bg-green-500 rounded-full"
                   />
                 )}

               </div>
            </div>

            {/* Power Up Panel */}
            <div className="flex flex-col gap-4">
               <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest border-b border-white/10 pb-4">
                 Initialization Sequence
               </h3>

               {modules.map(mod => {
                 const isActive = activeModules.includes(mod.id);
                 return (
                   <button
                     key={mod.id}
                     onClick={() => handleToggleModule(mod.id)}
                     className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                       isActive 
                         ? `bg-black/50 ${mod.color} border-[currentColor]` 
                         : 'bg-card border-white/10 text-muted hover:border-white/30'
                     }`}
                   >
                     <div className={`p-3 rounded-lg ${isActive ? mod.bg : 'bg-white/5'}`}>
                       <mod.icon className="w-6 h-6" />
                     </div>
                     <div className="text-left flex-1">
                       <div className="font-bold">{mod.name}</div>
                       <div className="text-xs opacity-70">{mod.desc}</div>
                     </div>
                     <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                       isActive ? 'bg-[currentColor] border-[currentColor] text-black' : 'border-white/20'
                     }`}>
                       {isActive && <CheckIcon />}
                     </div>
                   </button>
                 )
               })}

               <button
                 onClick={handleRunSimulation}
                 disabled={!isReadyToRun}
                 className={`mt-8 py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                   isReadyToRun 
                     ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:bg-green-400 hover:scale-[1.02]' 
                     : 'bg-white/5 text-muted cursor-not-allowed'
                 }`}
               >
                 <Play className="w-6 h-6 fill-current" />
                 INITIALIZE AUTONOMOUS AGENT
               </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="flex-1 flex flex-col items-center justify-center text-center"
        >
           <div className="relative mb-12">
             <Bot className="w-40 h-40 text-white drop-shadow-[0_0_40px_rgba(255,255,255,1)] relative z-10" />
             <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
               className="absolute inset-[-4rem] border border-white/20 rounded-full border-dashed"
             />
             <motion.div 
               animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
               className="absolute inset-[-6rem] border border-white/10 rounded-full border-dotted"
             />
           </div>

           <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
             ALL SYSTEMS ONLINE
           </h2>
           <p className="text-2xl text-muted font-light max-w-3xl mx-auto mb-12 pb-12 border-b border-white/10">
             You have successfully engineered a complete software system powered entirely by foundational Calculus concepts.
           </p>

           <div className="flex gap-6">
             <button
               onClick={() => onNext('finalVisual')}
               className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-transform hover:scale-105"
             >
               VIEW THE ARCHITECTURE MAP
             </button>
           </div>
        </motion.div>
      )}

    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
