import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, Crosshair, TrendingUp, Zap, BarChart2 } from 'lucide-react';
import type { ScreenType } from '../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function DecisionCenter({ onNext }: Props) {
  const problems = [
    {
      id: 1,
      title: "MOTION TRACKING",
      scenario: "An object is moving. How fast is its position changing?",
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-900/30",
      correct: "Derivative",
    },
    {
      id: 2,
      title: "DISTANCE CALCULATION",
      scenario: "A car's velocity is constantly streaming. Find the total distance traveled.",
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-900/30",
      correct: "Integral",
    },
    {
      id: 3,
      title: "MACHINE LEARNING",
      scenario: "A machine-learning model needs to intelligently reduce its error rate.",
      icon: BarChart2,
      color: "text-purple-400",
      bg: "bg-purple-900/30",
      correct: "Derivative",
    },
    {
      id: 4,
      title: "SYSTEM DESIGN",
      scenario: "Find the absolute best server configuration that maximizes performance while minimizing cost.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-900/30",
      correct: "Optimization",
    },
    {
      id: 5,
      title: "EDGE CASES",
      scenario: "What value does our network latency approach right before the system crashes?",
      icon: Crosshair,
      color: "text-orange-400",
      bg: "bg-orange-900/30",
      correct: "Limit",
    }
  ];

  const tools = ["Derivative", "Integral", "Limit", "Optimization"];

  const [currentProblem, setCurrentProblem] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSelectTool = (tool: string) => {
    if (showFeedback) return;
    
    setAnswers(prev => ({ ...prev, [currentProblem]: tool }));
    setShowFeedback(true);
  };

  const handleNextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(c => c + 1);
      setShowFeedback(false);
    } else {
      setIsDone(true);
    }
  };

  const current = problems[currentProblem];
  const isCorrect = answers[currentProblem] === current.correct;

  if (isDone) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-card border border-white/10 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden w-full flex flex-col items-center"
         >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <CheckCircle className="w-32 h-32" />
            </div>
            
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-8 border border-green-500/50 relative z-10">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent relative z-10">
              ANALYSIS COMPLETE
            </h2>
            <p className="text-xl text-muted mb-12 relative z-10 max-w-xl">
              You've successfully mapped software problems to their foundational mathematical engines.
            </p>
            
            <button 
               onClick={() => onNext('architectureBuilder')}
               className="px-10 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)] relative z-10"
            >
              PROCEED TO ARCHITECTURE BUILDER
            </button>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-5xl w-full mx-auto pb-20">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Which Calculus Tool Would You Use?
        </h2>
        <p className="text-xl text-muted font-light maximum-w-2xl mx-auto">
          Analyze the scenario and deploy the correct mathematical concept.
        </p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
             key={currentProblem}
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -50 }}
             transition={{ duration: 0.4 }}
             className="bg-card border border-white/10 rounded-3xl shadow-xl overflow-hidden"
          >
             <div className={`${current.bg} border-b border-white/5 p-8 md:p-12 text-center relative`}>
               <div className="absolute top-4 left-4 text-xs font-bold text-muted tracking-widest flex items-center gap-2">
                 CASE 0{currentProblem + 1} // {current.title}
               </div>

               <div className="flex justify-center mb-6 mt-4">
                 <div className={`p-4 rounded-2xl bg-black/40 ${current.color} shadow-lg`}>
                   <current.icon className="w-12 h-12" />
                 </div>
               </div>
               
               <h3 className="text-2xl md:text-3xl font-bold text-white max-w-2xl mx-auto leading-tight">
                 "{current.scenario}"
               </h3>
             </div>

             <div className="p-8 md:p-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {tools.map(tool => (
                   <button
                     key={tool}
                     onClick={() => handleSelectTool(tool)}
                     disabled={showFeedback}
                     className={`p-6 rounded-2xl border text-lg font-bold transition-all relative overflow-hidden group flex items-center justify-center
                       ${showFeedback && tool === current.correct
                          ? 'bg-green-500/20 border-green-500 text-green-400 font-bold z-10 scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                          : showFeedback && answers[currentProblem] === tool && tool !== current.correct
                          ? 'bg-red-500/20 border-red-500/50 text-red-400 opacity-50'
                          : showFeedback 
                          ? 'bg-black/20 border-white/5 text-muted opacity-30 select-none'
                          : 'bg-black/40 border-white/10 hover:border-white/30 text-white hover:bg-white/5'
                       }
                     `}
                   >
                     {/* Hover fx */}
                     {!showFeedback && (
                        <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-[0%] transition-transform"></div>
                     )}
                     <span className="relative z-10 tracking-widest uppercase">{tool}</span>
                   </button>
                 ))}
               </div>

               <AnimatePresence>
                 {showFeedback && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
                   >
                     <div className="flex items-center gap-4">
                       {isCorrect ? (
                         <div className="w-12 h-12 rounded-full bg-green-500/20 flex flex-shrink-0 items-center justify-center text-green-400 border border-green-500/50">
                           <CheckCircle className="w-6 h-6" />
                         </div>
                       ) : (
                         <div className="w-12 h-12 rounded-full bg-red-500/20 flex flex-shrink-0 items-center justify-center text-red-400 border border-red-500/50">
                           <span className="text-xl font-bold">X</span>
                         </div>
                       )}
                       <div>
                         {isCorrect ? (
                            <>
                              <h4 className="text-xl font-bold text-green-400">Exact Match!</h4>
                              <p className="text-muted">The mathematical core driving this module is <span className="text-white">{current.correct}</span>.</p>
                            </>
                         ) : (
                            <>
                              <h4 className="text-xl font-bold text-red-400">Suboptimal Choice</h4>
                              <p className="text-muted">You selected <span className="text-white">{answers[currentProblem]}</span>, but the correct tool is <strong className="text-white bg-white/10 px-2 rounded">{current.correct}</strong>.</p>
                            </>
                         )}
                       </div>
                     </div>
                     
                     <button
                        onClick={handleNextProblem}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl whitespace-nowrap transition-colors border border-white/20"
                     >
                        NEXT SCENARIO →
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Dots */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
           {problems.map((p, i) => (
             <div 
               key={p.id} 
               className={`w-3 h-3 rounded-full transition-colors ${
                 i === currentProblem ? 'bg-white scale-125' : 
                 i < currentProblem ? (answers[i] === problems[i].correct ? 'bg-green-500/50' : 'bg-red-500/50') : 
                 'bg-white/20'
               }`} 
             />
           ))}
        </div>

      </div>
    </div>
  );
}
