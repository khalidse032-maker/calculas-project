import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw, Trophy } from 'lucide-react';
import type { ScreenType } from '../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
  score: number;
}

export default function FinalVisual({ onNext, score }: Props) {
  
  const getRank = () => {
    if (score >= 500) return { title: 'TURING LEVEL ENGINEER', color: 'text-rose-400' };
    if (score >= 300) return { title: 'SENIOR ARCHITECT', color: 'text-purple-400' };
    return { title: 'JUNIOR DEVELOPER', color: 'text-blue-400' };
  };

  const rank = getRank();

  const connections = [
    { title: "GAME PHYSICS", idea: "Derivative", explain: "Tracks exact instant velocity/acceleration" },
    { title: "DATA STREAMING", idea: "Integral", explain: "Accumulates total distance or data transferred" },
    { title: "COLLISIONS & LIMITS", idea: "Limit", explain: "Handles edge cases before crashes occur" },
    { title: "AI LEARNING", idea: "Gradient / Deriv", explain: "Defines the slope toward minimum error" },
    { title: "SYSTEM ARCHITECTURE", idea: "Optimization", explain: "Finds the peak efficiency zero-slope point" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center pt-10 px-4 max-w-5xl w-full mx-auto pb-20 overflow-y-auto">
      
      {/* Score Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="w-full text-center mb-16 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <Trophy className={`w-20 h-20 mx-auto mb-6 ${rank.color}`} />
        <h2 className="text-3xl font-light text-muted tracking-widest mb-2">FINAL EVALUATION</h2>
        <h1 className={`text-5xl md:text-6xl font-black ${rank.color} uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-6`}>
           {rank.title}
        </h1>
        <div className="text-2xl font-mono bg-white/5 border border-white/10 rounded-full px-8 py-3 inline-block shadow-xl">
           <span className="text-muted">TOTAL SCORE: </span>
           <span className="text-white font-bold">{score}</span>
        </div>
      </motion.div>

      {/* Synthesis Map */}
      <motion.div 
         initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
         className="w-full"
      >
        <h3 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest">Calculus to Software Synthesis map</h3>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[50%] before:-translate-x-px md:before:block before:hidden before:w-0.5 before:bg-gradient-to-b before:from-rose-500/50 before:to-transparent">
          {connections.map((c, i) => (
             <motion.div 
               initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ delay: 0.5 + i * 0.1 }}
               key={c.title} 
               className={`relative flex items-center justify-between md:justify-center gap-4 w-full md:w-1/2 ${i % 2 === 0 ? 'md:ml-auto md:flex-row-reverse' : 'md:mr-auto'}`}
             >
                <div className="w-full bg-card border border-white/10 p-6 rounded-2xl relative group hover:border-white/30 transition-colors shadow-lg">
                  <div className="flex flex-col mb-4 pb-4 border-b border-white/10">
                     <span className="text-xs font-bold text-muted tracking-widest mb-1">DOMAIN</span>
                     <span className="text-lg font-bold text-white">{c.title}</span>
                  </div>
                  
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-rose-500 tracking-widest mb-1">MATHEMATICAL ENGINE</span>
                     <span className="text-xl font-bold text-rose-400 mb-2">{c.idea}</span>
                     <p className="text-sm text-muted">{c.explain}</p>
                  </div>
                </div>
                
                {/* Connecting Node */}
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] z-10 
                  ${i % 2 === 0 ? '-left-2' : '-right-2'}" 
                />
             </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Restart */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 1.5 }}
        className="mt-20 text-center pb-20"
      >
         <h4 className="text-3xl font-bold mb-8">"Math is the architecture of computation."</h4>
         <button
            onClick={() => onNext('landing')}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20 hover:scale-105 mx-auto"
         >
            <RefreshCw className="w-5 h-5" />
            RESTART MISSION
         </button>
      </motion.div>

    </div>
  );
}
