import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part8Challenge() {
  const [selectedLr, setSelectedLr] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<number[]>([4.5]);
  const [message, setMessage] = useState("");

  const fn = (x: number) => 0.4 * x * x;
  const df = (x: number) => 0.8 * x;

  const mapX = (x: number) => ((x + 5) / 10) * 100;
  const mapY = (y: number) => 100 - (y / 15) * 100;

  const curvePoints = [];
  for (let i = -5; i <= 5; i += 0.1) curvePoints.push(`${mapX(i)},${mapY(fn(i))}`);
  const curvePath = `M ${curvePoints.join(' L ')}`;

  const handlePlayUrl = (lr: number, msg: string) => {
    setSelectedLr(lr);
    setMessage(msg);
    setHistory([4.5]);
    setIsPlaying(true);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying && selectedLr !== null) {
      timer = setTimeout(() => {
        setHistory(prev => {
          const lastX = prev[prev.length - 1];
          const slope = df(lastX);
          const next = lastX - (selectedLr * slope);
          
          if (prev.length > 30 || Math.abs(next) > 6 || Math.abs(next) < 0.01) {
            setIsPlaying(false);
            return prev;
          }
          return [...prev, next];
        });
      }, 200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, selectedLr]);

  const currentX = history[history.length - 1];

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        <div className="glass-card p-12 text-center mb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
          
          <h2 className="text-4xl font-bold text-blue-400 mb-6">Optimization Challenge</h2>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
            You are training a neural network model. Review the loss curve below and select the best learning rate.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
             
             {/* Loss Visual */}
             <div className="w-full lg:w-1/2 aspect-video bg-background/50 rounded-xl overflow-hidden border border-white/5 relative items-end flex pb-2 shadow-inner">
                 <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible p-2">
                    <path d={curvePath} fill="none" stroke="#60a5fa" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                    <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="100" stroke="#ffffff11" strokeDasharray="2,2"/>
                    <line x1="0" y1={mapY(0)} x2="100" y2={mapY(0)} stroke="#ffffff11" strokeDasharray="2,2"/>
                    
                    {history.length > 1 && (
                      <polyline 
                        points={history.map(x => `${mapX(x)},${mapY(fn(x))}`).join(' ')}
                        fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"
                      />
                    )}

                    {history.map((hx, i) => (
                      <circle key={i} cx={mapX(hx)} cy={mapY(fn(hx))} r="1.5" fill={i === history.length - 1 ? "#ffffff" : "rgba(255,255,255,0.3)"} />
                    ))}
                    <motion.circle 
                        animate={{ cx: mapX(currentX), cy: mapY(fn(currentX)) }}
                        transition={{ duration: 0.1 }}
                        r="3" fill="#ffffff" className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                    />
                 </svg>
             </div>

             {/* Controls */}
             <div className="flex flex-col gap-4 w-full lg:w-1/3">
                <button 
                  onClick={() => handlePlayUrl(0.01, "Learning Rate 0.01: Too small, optimization is painfully slow.")}
                  className={`p-4 rounded border text-left transition-all ${selectedLr === 0.01 ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <span className="block text-xl font-bold text-white mb-1">LR = 0.01</span>
                  <span className="text-xs text-muted uppercase tracking-widest">Very small steps</span>
                </button>
                <button 
                  onClick={() => handlePlayUrl(0.9, "Learning Rate 0.9: Perfect! The model converges rapidly.")}
                  className={`p-4 rounded border text-left transition-all ${selectedLr === 0.9 ? 'bg-emerald-500/20 border-emerald-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <span className="block text-xl font-bold text-white mb-1">LR = 0.9</span>
                  <span className="text-xs text-muted uppercase tracking-widest">Medium steps</span>
                </button>
                <button 
                  onClick={() => handlePlayUrl(2.5, "Learning Rate 2.5: Too large! The steps overshoot and explode out of bounds.")}
                  className={`p-4 rounded border text-left transition-all ${selectedLr === 2.5 ? 'bg-rose-500/20 border-rose-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <span className="block text-xl font-bold text-white mb-1">LR = 2.5</span>
                  <span className="text-xs text-muted uppercase tracking-widest">Giant steps</span>
                </button>
             </div>

          </div>

          <AnimatePresence>
             {message && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-8 text-lg font-bold ${selectedLr === 0.9 ? 'text-emerald-400' : 'text-rose-400'}`}>
                   {message}
                </motion.div>
             )}
          </AnimatePresence>

        </div>


        {/* FINAL MESSAGE SECTION */}
         <div className="text-center pt-20 border-t border-white/5 pb-20">
           <h2 className="text-5xl md:text-7xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-rose-400 to-amber-400 leading-tight pb-4">
             Calculus Powers <br/> Modern Software
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 text-left">
              
              <div className="glass-card p-10 bg-blue-900/10 border-blue-500/20 group hover:border-blue-500/50 transition-all hover:-translate-y-2">
                 <h3 className="text-3xl text-blue-400 font-bold mb-4">Derivative</h3>
                 <p className="text-lg text-white mb-4">Rate of Change</p>
                 <p className="text-muted leading-relaxed">
                   Calculates velocity, slope, and direction.
                 </p>
              </div>

              <div className="glass-card p-10 bg-emerald-900/10 border-emerald-500/20 group hover:border-emerald-500/50 transition-all hover:-translate-y-2">
                 <h3 className="text-3xl text-emerald-400 font-bold mb-4">Integral</h3>
                 <p className="text-lg text-white mb-4">Accumulation</p>
                 <p className="text-muted leading-relaxed">
                   Calculates traveled distance, volumes, and aggregates data.
                 </p>
              </div>

              <div className="glass-card p-10 bg-rose-900/10 border-rose-500/20 group hover:border-rose-500/50 transition-all hover:-translate-y-2">
                 <h3 className="text-3xl text-rose-400 font-bold mb-4">Optimization</h3>
                 <p className="text-lg text-white mb-4">Improvement</p>
                 <p className="text-muted leading-relaxed">
                   Calculates minimum error, updating machine learning parameters.
                 </p>
              </div>
           </div>

           <div className="max-w-3xl mx-auto p-12 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-rose-500/5 group-hover:opacity-100 transition-opacity"></div>
             <p className="text-2xl text-white font-medium italic relative z-10">
               "Calculus gives machine-learning systems and physics simulations a mathematical way to understand, accumulate, and automatically improve."
             </p>
           </div>
        </div>

      </div>
    </section>
  );
}
