import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Part3Gradient() {
  const [learningRate, setLearningRate] = useState(0.8);
  const [history, setHistory] = useState<number[]>([4.5]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Math Setup: f(x) = (x^2)/2 + 1
  const fn = (x: number) => 0.5 * x * x + 1;
  const df = (x: number) => x; 

  // SVG Scaling
  const mapX = (x: number) => ((x + 5) / 10) * 100;
  const mapY = (y: number) => 100 - (y / 15) * 100;

  const curvePoints = [];
  for (let i = -5; i <= 5; i += 0.1) {
    curvePoints.push(`${mapX(i)},${mapY(fn(i))}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  const currentX = history[history.length - 1];
  const currentY = fn(currentX);

  const reset = () => {
    setHistory([4.5]);
    setIsPlaying(false);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setTimeout(() => {
        setHistory(prev => {
          const lastX = prev[prev.length - 1];
          const slope = df(lastX);
          const next = lastX - (learningRate * slope);
          
          if (Math.abs(slope) < 0.01 || Math.abs(next) > 6 || prev.length > 50) {
            setIsPlaying(false); // Stop if converged, exploded, or ran out of max steps
            return prev;
          }
          return [...prev, next];
        });
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, history, learningRate]);


  const getBehaviorText = () => {
    if (learningRate <= 0.1) return { text: "Too small: Very slow learning", color: "text-blue-400" };
    if (learningRate <= 1.5) return { text: "Good: Smooth convergence", color: "text-emerald-400" };
    return { text: "Too large: Overshooting / unstable", color: "text-rose-400" };
  };

  const steps = [
    "Current position",
    "Calculate slope (Derivative)",
    "Choose direction & step size",
    "Take Step",
    "Calculate Error"
  ];

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center border-t border-white/5">
      <div className="max-w-6xl w-full">
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
              Gradient Descent
           </h2>
           <p className="text-xl text-muted">
              How a system automatically navigates down the curve using the derivative.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
           
           {/* Algorithm Flow */}
           <div className="w-full lg:w-1/3 glass-card p-8 flex flex-col gap-4 relative">
             <h3 className="text-xl font-bold tracking-widest text-emerald-400 uppercase text-center mb-4">The Algorithm</h3>
             {steps.map((step, idx) => (
               <div key={idx} className="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded text-center relative z-10">
                 {step}
                 {idx !== steps.length - 1 && (
                    <div className="absolute left-1/2 -bottom-5 w-px h-4 tracking-widest text-emerald-500 opacity-50 flex items-center justify-center">
                       ↓
                    </div>
                 )}
               </div>
             ))}
             <div className="text-center mt-4 text-emerald-400/50 uppercase tracking-widest text-xs font-bold animate-pulse">
               Repeat until minimum
             </div>
           </div>

           {/* Interactive Graph & Step Size Tool */}
           <div className="w-full lg:w-2/3 glass-card p-8 flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
                 <div className="flex-1 w-full">
                    <label className="flex justify-between text-xs font-mono tracking-widest text-muted mb-4 uppercase">
                      <span>Learning Rate (Step Multiplier)</span>
                      <span className={getBehaviorText().color.replace('text-', 'text-')}>{learningRate.toFixed(2)}</span>
                    </label>
                    <input 
                      type="range" min="0.01" max="1.95" step="0.01"
                      value={learningRate} 
                      onChange={e => {
                        setLearningRate(Number(e.target.value));
                        setIsPlaying(false);
                      }}
                      className="w-full h-2 rounded-full cursor-pointer bg-white/10 accent-emerald-500 appearance-none"
                    />
                    <div className={`text-sm mt-4 font-bold ${getBehaviorText().color}`}>
                       {getBehaviorText().text}
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-3 rounded uppercase font-bold tracking-widest text-sm transition-all"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button 
                      onClick={reset}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded uppercase font-bold tracking-widest text-sm transition-all"
                    >
                      Reset
                    </button>
                 </div>
              </div>

              <div className="w-full aspect-video bg-background/50 rounded-xl overflow-hidden border border-white/5 relative items-end flex pb-4 shadow-inner">
                <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible">
                    
                    {/* The Function */}
                    <path d={curvePath} fill="none" stroke="#10b981" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    
                    <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="100" stroke="#ffffff11" strokeDasharray="2,2"/>
                    <line x1="0" y1={mapY(0)} x2="100" y2={mapY(0)} stroke="#ffffff11" strokeDasharray="2,2"/>

                    {/* Path History */}
                    {history.length > 1 && (
                      <polyline 
                        points={history.map(x => `${mapX(x)},${mapY(fn(x))}`).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    )}

                    {/* Trail of Points */}
                    {history.map((hx, i) => (
                      <circle 
                        key={i}
                        cx={mapX(hx)} 
                        cy={mapY(fn(hx))} 
                        r="1.5" 
                        fill={i === history.length - 1 ? "#ffffff" : "rgba(255,255,255,0.3)"} 
                      />
                    ))}

                    {/* Active Ball */}
                    <motion.circle 
                        animate={{ cx: mapX(currentX), cy: mapY(currentY) }}
                        transition={{ duration: 0.2 }}
                        r="3" 
                        fill="#ffffff"
                        className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                    />
                </svg>
              </div>

           </div>
           
        </div>

      </div>
    </section>
  );
}
