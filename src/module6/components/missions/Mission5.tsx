import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, Target, ArrowRight } from 'lucide-react';
import type { ScreenType } from '../../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function Mission5({ onNext }: Props) {
  // Config state
  const [cpuVal, setCpuVal] = useState(2); // 1-10
  
  // Simulation flags
  const [isSearching, setIsSearching] = useState(false);
  
  // Quiz
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Math model
  // Let x = cpuVal.
  // Performance curve P(x) = 100 - 5*(x - 6)^2  (Max at x=6, performance=100)
  // Cost curve c(x) = 15 * x
  // Value V(x) = P(x) - c(x)  (assuming equivalent units for simplicity)
  // V(x) = 100 - 5(x^2 - 12x + 36) - 15x
  // V(x) = 100 - 5x^2 + 60x - 180 - 15x = -5x^2 + 45x - 80
  // Peak (optimization): V'(x) = -10x + 45 = 0 => x = 4.5
  // We'll map value curve directly logic.

  // Let's use a simple cost efficiency curve.
  // y = -10(x - 5)^2 + 100 (Max efficiency at 5)
  const calcEfficiency = (x: number) => {
    return Math.max(0, -5 * Math.pow(x - 4.5, 2) + 90);
  };
  
  const calcPerf = (x: number) => {
    return Math.max(10, 10 + 15 * x - x*x); // plateaus
  };
  
  const calcCost = (x: number) => {
    return 10 * x; 
  };

  const currentEfficiency = calcEfficiency(cpuVal);
  const currentPerf = calcPerf(cpuVal);
  const currentCost = calcCost(cpuVal);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    if (isSearching) {
      let currentVal = cpuVal;
      let targetVal = 4.5;
      
      interval = setInterval(() => {
        if (Math.abs(currentVal - targetVal) < 0.1) {
          setCpuVal(targetVal);
          setIsSearching(false);
          clearInterval(interval);
        } else {
          currentVal += (targetVal > currentVal ? 0.3 : -0.3);
          setCpuVal(Number(currentVal.toFixed(1)));
        }
      }, 50);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isSearching]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'Optimization') {
      setShowExplanation(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs font-bold tracking-wider mb-2">
            MISSION 5
          </div>
          <h2 className="text-3xl font-bold text-white">RESOURCE OPTIMIZATION</h2>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8 shadow-lg max-w-3xl">
        <p className="text-lg text-muted font-light">
          "You are designing a software system. The system has limited resources. Find the best configuration balancing cost and performance."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Graph Simulation View */}
        <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative min-h-[400px] p-6 lg:p-10 flex flex-col">
           <h3 className="text-sm font-bold text-muted mb-4 tracking-widest text-center">SYSTEM EFFICIENCY CURVE (V) over ALLOCATED CPU (x)</h3>
           
           <div className="flex-1 relative border-l-2 border-b-2 border-white/20 mt-4 mb-8">
             <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Efficiency Curve */}
               <path 
                  d={`M ${Array.from({length: 101}).map((_, i) => `${i},${100 - Math.max(0, -5 * Math.pow((i/10) - 4.5, 2) + 90)}`).join(' L ')}`} 
                  fill="none" 
                  stroke="#fbbf24" // yellow-400
                  strokeWidth="2"
               />
               
               {/* Max Point Highlight (only show if we are there) */}
               {cpuVal === 4.5 && (
                  <circle cx={45} cy={100 - 90} r="4" fill="#fbbf24" className="animate-pulse" />
               )}
               
             </svg>
             
             {/* Current Val Indicator */}
             <motion.div 
               className="absolute w-4 h-4 -ml-2 -mt-2 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10"
               style={{ left: `${cpuVal * 10}%`, top: `${100 - currentEfficiency}%` }}
               layout
             />
             
             {/* X, Y Labels */}
             <div className="absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] lg:text-xs text-muted font-bold tracking-widest">NET VALUE</div>
             <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 -translate-x-1/2 text-[10px] lg:text-xs text-muted font-bold tracking-widest">CPU ALLOCATION</div>
           </div>
        </div>

        {/* Controls Panels */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-card border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 text-white">CONFIGURATION</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted text-yellow-100">CPU Allocation Limit</span>
                  <span className="font-mono font-bold text-yellow-400">{cpuVal.toFixed(1)} cores</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="0.1" 
                  value={cpuVal} 
                  onChange={(e) => setCpuVal(Number(e.target.value))}
                  disabled={isSearching}
                  className="w-full accent-yellow-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10 bg-black/20 -mx-6 -mb-6 px-6 pb-6">
                <div>
                   <div className="text-xs text-muted">PERFORMANCE</div>
                   <div className="font-mono text-green-400">+{currentPerf.toFixed(0)}</div>
                </div>
                <div>
                   <div className="text-xs text-muted">COST ($)</div>
                   <div className="font-mono text-red-400">-{currentCost.toFixed(0)}</div>
                </div>
                <div className="text-right">
                   <div className="text-xs text-muted font-bold">NET VALUE</div>
                   <div className="text-2xl font-bold font-mono text-yellow-400">{currentEfficiency.toFixed(0)}</div>
                </div>
            </div>
          </div>
          
          <button
              onClick={() => setIsSearching(true)}
              disabled={isSearching || cpuVal === 4.5}
              className="py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 disabled:bg-white/5 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(202,138,4,0.3)] disabled:shadow-none"
            >
              {isSearching ? 'SEARCHING...' : cpuVal === 4.5 ? 'OPTIMIZED ✔' : 'FIND OPTIMAL CONFIGURATION'}
              {!isSearching && cpuVal !== 4.5 && <Target className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Interactive Question Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/20 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
          What mathematical idea helps us find the best possible value?
        </h3>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {['Averages', 'Optimization', 'Probability', 'Boolean Logic'].map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswerSelect(opt)}
              disabled={showExplanation}
              className={`flex-1 min-w-[200px] p-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                selectedAnswer === opt 
                  ? (opt === 'Optimization' ? 'bg-green-500/20 border-green-500/50 text-green-400 font-bold' : 'bg-red-500/20 border-red-500/50 text-red-400')
                  : 'bg-black/20 border-white/10 hover:bg-white/5 text-muted hover:text-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden"
            >
              <div className="bg-black/50 border border-yellow-500/30 rounded-2xl p-6 relative">
                <p className="text-lg text-white mb-6 leading-relaxed">
                  Calculus connects <strong className="text-yellow-400">optimization</strong> to derivatives. If we have a smooth mathematical model of our system, we can find the exact peak automatically.
                </p>
                
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-2 mb-8">
                   <div className="bg-white/5 p-4 rounded-xl text-center flex-1 flex flex-col justify-center">
                      <span className="text-xs text-muted mb-1 block">1. Model System</span>
                      <span className="font-bold text-white">Function V(x)</span>
                   </div>
                   <div className="hidden md:flex items-center text-yellow-500/50"><ArrowRight /></div>
                   <div className="bg-white/5 p-4 rounded-xl text-center flex-1 flex flex-col justify-center">
                      <span className="text-xs text-muted mb-1 block">2. Find Rate of Change</span>
                      <span className="font-bold text-orange-400">Derivative V'(x)</span>
                   </div>
                   <div className="hidden md:flex items-center text-yellow-500/50"><ArrowRight /></div>
                   <div className="bg-white/5 p-4 rounded-xl text-center flex-1 flex flex-col justify-center border-t-2 md:border-t-0 md:border-l-2 border-yellow-500/50 text-yellow-300 shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]">
                      <span className="text-xs text-yellow-500/70 mb-1 block uppercase">3. Set to Zero (Peak)</span>
                      <span className="font-bold">Critical Point V'(x) = 0</span>
                   </div>
                </div>

                <div className="flex justify-end">
                  <button 
                     onClick={() => onNext('decisionCenter')}
                     className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    ENTER DECISION CENTER
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
