import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, Hash, Minimize2, Network } from 'lucide-react';
import type { ScreenType } from '../../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function Mission4({ onNext }: Props) {
  // Data for CPU (Derivative)
  const cpuData = [
    { t: 0, val: 20 },
    { t: 10, val: 25 },
    { t: 20, val: 31 },
    { t: 30, val: 35 },
    { t: 40, val: 48 },
    { t: 50, val: 60 },
    { t: 60, val: 78 },
    { t: 70, val: 90 },
  ];

  // Data for Network (Integral)
  const networkData = [
    { t: 0, val: 5 },
    { t: 1, val: 8 },
    { t: 2, val: 12 },
    { t: 3, val: 4 },
    { t: 4, val: 18 },
    { t: 5, val: 25 },
  ];

  const [activeTab, setActiveTab] = useState<'cpu'|'network'>('cpu');
  
  // CPU state
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(null);

  // Network state
  const [rectCount, setRectCount] = useState(1);

  // Network area calculation
  const dx = 5 / rectCount;
  let totalArea = 0;
  for (let i = 0; i < rectCount; i++) {
    const x = i * dx;
    // Approximating continuous network data curve (sort of a hill)
    const y = 5 + 20 * Math.sin((x / 5) * Math.PI); 
    totalArea += y * dx;
  }

  const selectedPt = selectedPointIndex !== null ? cpuData[selectedPointIndex] : null;
  const prevPt = selectedPointIndex !== null && selectedPointIndex > 0 ? cpuData[selectedPointIndex - 1] : null;

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold tracking-wider mb-2">
            MISSION 4
          </div>
          <h2 className="text-3xl font-bold text-white">SYSTEM ANALYSIS</h2>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8 shadow-lg max-w-3xl">
        <p className="text-lg text-muted font-light">
          "You are monitoring a software server. Analyze the patterns to guarantee stability."
        </p>
      </div>

      <div className="flex gap-4 mb-6">
         <button 
           onClick={() => setActiveTab('cpu')}
           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
             activeTab === 'cpu' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-muted hover:bg-white/10'
           }`}
         >
           <Activity className="w-5 h-5" />
           1. CPU SPIKES
         </button>
         <button 
           onClick={() => setActiveTab('network')}
           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
             activeTab === 'network' ? 'bg-purple-500 text-white' : 'bg-white/5 text-muted hover:bg-white/10'
           }`}
         >
           <Network className="w-5 h-5" />
           2. TOTAL TRAFFIC
         </button>
      </div>

      <div className="bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row min-h-[450px]">
         
         <AnimatePresence mode="wait">
           {activeTab === 'cpu' ? (
             <motion.div 
                key="cpu"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 w-full flex flex-col lg:flex-row"
             >
                {/* Graph Area */}
                <div className="flex-[2] relative p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                   <h3 className="text-sm font-bold text-muted mb-4 tracking-widest text-center">CPU USAGE (%) OVER TIME (ms)</h3>
                   
                   <div className="relative w-full h-[300px] mt-8 flex end border-l border-b border-white/20 ml-4 pb-4">
                     <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                       {/* Grid */}
                       {[20,40,60,80].map(y => (
                          <line key={y} x1="0" y1={y} x2="100%" y2={y} stroke="rgba(255,255,255,0.05)" />
                       ))}
                       
                       <polyline 
                          points={cpuData.map(p => `${(p.t/70)*100},${100 - p.val}`).join(' ')}
                          fill="none" 
                          stroke="#06b6d4" // cyan-500
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                       />
                     </svg>
                     
                     {/* Points overlay */}
                     {cpuData.map((p, i) => (
                       <button
                         key={i}
                         onClick={() => setSelectedPointIndex(i)}
                         className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center transition-transform hover:scale-125 z-10 ${
                           selectedPointIndex === i ? 'bg-cyan-400' : 'bg-cyan-900 border-2 border-cyan-400'
                         }`}
                         style={{ left: `${(p.t/70)*100}%`, top: `${100 - p.val}%` }}
                       />
                     ))}
                   </div>
                   <div className="absolute top-4 right-4 text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded">Click points to analyze</div>
                </div>

                {/* Info Panel */}
                <div className="flex-1 p-8 flex flex-col bg-card">
                  <h3 className="text-2xl font-bold mb-4 text-white">Rate of Change</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    "At which point is the system changing fastest? We need a mathematical tool that measures how quickly a value changes over incredibly tiny time intervals."
                  </p>
                  
                  {selectedPointIndex === null ? (
                    <div className="flex-1 flex items-center justify-center text-muted font-mono text-sm border-2 border-dashed border-white/10 rounded-xl">
                       SELECT A POINT →
                    </div>
                  ) : selectedPointIndex === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted font-mono text-sm bg-white/5 rounded-xl text-center p-4">
                       Point T=0 is the start.<br/>Select points after T=0 to calculate change.
                    </div>
                  ) : prevPt && selectedPt ? (
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-6 flex flex-col gap-4 font-mono shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                       <div className="flex justify-between">
                         <span className="text-muted">Current CPU</span>
                         <span className="text-white text-lg">{selectedPt.val}%</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-muted">Previous CPU</span>
                         <span className="text-gray-400">{prevPt.val}%</span>
                       </div>
                       <div className="w-full h-[1px] bg-white/10"></div>
                       <div className="flex justify-between">
                         <span className="text-muted text-xs flex items-center gap-1"><Hash className="w-3 h-3"/> Δv (Change)</span>
                         <span className="text-cyan-400 font-bold">+{selectedPt.val - prevPt.val}%</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-muted text-xs flex items-center gap-1"><Hash className="w-3 h-3"/> Δt (Time diff)</span>
                         <span className="text-blue-400">{selectedPt.t - prevPt.t}ms</span>
                       </div>
                       
                       <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded text-center">
                         <div className="text-xs text-muted mb-1">APPROX. RATE OF CHANGE (Derivative)</div>
                         <div className="text-2xl font-bold text-cyan-300">
                           {((selectedPt.val - prevPt.val) / (selectedPt.t - prevPt.t)).toFixed(2)} %/ms
                         </div>
                       </div>
                    </div>
                  ) : null}
                </div>
             </motion.div>
           ) : (
             <motion.div 
                key="network"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 w-full flex flex-col lg:flex-row"
             >
                {/* Graph Area */}
                <div className="flex-[2] relative p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                   <h3 className="text-sm font-bold text-muted mb-4 tracking-widest text-center">NETWORK TRAFFIC (MB/s)</h3>
                   
                   <div className="relative w-full h-[300px] mt-8 flex end border-l border-b border-white/20 ml-4">
                     <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                       {/* Curved Graph (sine wave approx) */}
                       <path 
                          d="M0,80 Q25,20 50,0 T100,50" 
                          fill="none" 
                          stroke="#a855f7" // purple-500
                          strokeWidth="2"
                       />
                       
                       {/* Rectangles (Riemann Sum) */}
                       {Array.from({ length: rectCount }).map((_, i) => {
                          const width = 100 / rectCount;
                          const height = 5 + 20 * Math.sin(((i * dx) / 5) * Math.PI); // scaling roughly to SVG 100 y-axis
                          const visualHeight = Math.min(height * 3, 100);
                          return (
                            <rect 
                               key={i}
                               x={i * width}
                               y={100 - visualHeight}
                               width={width}
                               height={visualHeight}
                               fill="rgba(168,85,247,0.3)"
                               stroke="rgba(168,85,247,0.8)"
                               strokeWidth="1"
                            />
                          );
                       })}
                     </svg>
                   </div>
                </div>

                {/* Info Panel */}
                <div className="flex-1 p-8 flex flex-col bg-card">
                  <h3 className="text-2xl font-bold mb-4 text-white">Accumulation</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    "What is the total amount of traffic over this period? If we have a rate (MB/s), how do we find the total amount (MB)?"
                  </p>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 flex flex-col font-mono shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                     <div className="text-muted text-sm mb-2">INTEGRATION PRECISION</div>
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-xs text-gray-500 flex items-center gap-2"><Minimize2 className="w-3 h-3"/> Rectangles</span>
                        <span className="text-purple-400 font-bold">{rectCount}</span>
                     </div>
                     
                     <input 
                       type="range" min="1" max="50" step="1" 
                       value={rectCount} 
                       onChange={(e) => setRectCount(Number(e.target.value))}
                       className="w-full accent-purple-500 mb-8"
                     />
                     
                     <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded text-center transition-all bg-gradient-to-r from-transparent to-transparent hover:from-purple-500/20">
                         <div className="text-xs text-muted mb-1 flex justify-center items-center gap-2 uppercase">TOTAL TRAFFIC (Integral)</div>
                         <div className="text-3xl font-bold text-purple-300">
                           {totalArea.toFixed(2)} <span className="text-lg">MB</span>
                         </div>
                     </div>
                     
                     {rectCount >= 30 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-xs text-green-400 text-center font-sans tracking-wider"
                        >
                          Maximum precision reached. Approaching definite integral.
                        </motion.div>
                     )}
                  </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-end">
         <button 
            onClick={() => onNext('mission5')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
         >
           CALCULUS UNDERSTOOD → CONTINUE
         </button>
      </div>

    </div>
  );
}
