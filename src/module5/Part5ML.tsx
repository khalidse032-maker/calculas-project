import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part5ML() {
  const [modelM, setModelM] = useState(0.2); // Initial Slope
  const [modelB, setModelB] = useState(8.0); // Initial Intercept
  
  const [isTraining, setIsTraining] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [history, setHistory] = useState<{iter: number, loss: string}[]>([]);

  // Mathematical dataset points: roughly follows y = 1.2x + 1
  const data = [
    {x: 1, y: 2.1},
    {x: 2, y: 3.5},
    {x: 3, y: 4.5},
    {x: 4, y: 6.0},
    {x: 5, y: 6.9}
  ];

  // Mean Squared Error
  const calculateLoss = (m: number, b: number) => {
    return data.reduce((acc, p) => acc + Math.pow((m * p.x + b) - p.y, 2), 0) / data.length;
  };

  const currentLoss = calculateLoss(modelM, modelB);

  const reset = () => {
    setModelM(0.2);
    setModelB(8.0);
    setIteration(0);
    setHistory([]);
    setIsTraining(false);
  };

  useEffect(() => {
    let timer: any;
    if (isTraining && iteration < 30) {
      timer = setTimeout(() => {
        // Compute gradients manually for Mean Squared Error
        let dM = 0;
        let dB = 0;
        data.forEach(p => {
           let pred = modelM * p.x + modelB;
           dM += 2 * p.x * (pred - p.y);
           dB += 2 * (pred - p.y);
        });
        dM /= data.length;
        dB /= data.length;
        
        const lr = 0.05; // Fixed learning rate
        const nextM = modelM - lr * dM;
        const nextB = modelB - lr * dB;
        
        setModelM(nextM);
        setModelB(nextB);
        setIteration(i => i + 1);
        
        setHistory(prev => {
          const updated = [{iter: iteration, loss: calculateLoss(nextM, nextB).toFixed(2)}, ...prev];
          return updated.slice(0, 6); // Keep last 6 in purely visual table
        });
        
        if (calculateLoss(nextM, nextB) < 0.1) setIsTraining(false);

      }, 200); // 200ms per epoch/iteration
    } else if (isTraining) {
      setIsTraining(false);
    }
    return () => clearTimeout(timer);
  }, [isTraining, iteration, modelM, modelB]);

  // Coordinate mapping for SVG (x: [0, 6], y: [0, 10])
  const mapX = (x: number) => (x / 6) * 100;
  const mapY = (y: number) => 100 - (y / 10) * 100;
  
  const lineY1 = modelM * 0 + modelB;
  const lineY2 = modelM * 6 + modelB;

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center border-t border-white/5 bg-background">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
              Machine Learning Simulation
           </h2>
           <p className="text-xl text-muted">
              Gradient descent isn't just for rolling balls—it actively adjusts software parameters (Line weights) to minimize error (Loss).
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Visualizer Panel */}
           <div className="flex-1 glass-card p-6 flex flex-col">
             
             <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold tracking-widest text-cyan-400 uppercase">Model Output</div>
                <div className="font-mono text-xl">Loss: <span className="text-white">{currentLoss.toFixed(2)}</span></div>
             </div>

             <div className="w-full aspect-[4/3] bg-background/50 rounded-xl overflow-hidden border border-white/5 relative items-end flex pb-4 shadow-inner">
               <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible p-2">
                  
                  {/* Grid Lines */}
                  {[2, 4, 6, 8].map(y => (
                    <line key={`g-${y}`} x1="0" y1={mapY(y)} x2="100" y2={mapY(y)} stroke="#ffffff0a" strokeWidth="0.5"/>
                  ))}
                  
                  {/* Origin */}
                  <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="100" stroke="#ffffff22" />
                  <line x1="0" y1={mapY(0)} x2="100" y2={mapY(0)} stroke="#ffffff22" />

                  {/* Errors (Loss distances) */}
                  {data.map((p, i) => {
                     const predY = modelM * p.x + modelB;
                     return (
                        <line 
                          key={`err-${i}`}
                          x1={mapX(p.x)} y1={mapY(p.y)}
                          x2={mapX(p.x)} y2={mapY(predY)}
                          stroke="#ef4444" 
                          strokeWidth="0.5"
                          strokeDasharray="1,1"
                          opacity={0.7}
                        />
                     );
                  })}

                  {/* The actual data points */}
                  {data.map((p, i) => (
                    <circle 
                      key={`pt-${i}`}
                      cx={mapX(p.x)} 
                      cy={mapY(p.y)} 
                      r="2" 
                      fill="#67e8f9"
                      className="drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]"
                    />
                  ))}

                  {/* The Line Model */}
                  <motion.line 
                    animate={{ x1: mapX(0), y1: mapY(lineY1), x2: mapX(6), y2: mapY(lineY2) }}
                    transition={{ type: "tween", duration: 0.1 }}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                  
               </svg>
             </div>
           </div>

           {/* Controls and Logs Display */}
           <div className="w-full lg:w-80 flex flex-col gap-6">
              
              <div className="glass-card p-6">
                <button 
                  onClick={() => setIsTraining(!isTraining)}
                  className={`w-full py-4 rounded font-bold uppercase tracking-widest text-sm shadow-xl transition-all ${
                    isTraining ? 'bg-cyan-900 border border-cyan-500/50 text-cyan-400' : 'bg-cyan-500 hover:bg-cyan-400 text-cyan-950'
                  }`}
                >
                  {isTraining ? 'Training...' : 'Train Model'}
                </button>
                <button 
                  onClick={reset}
                  className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded uppercase font-bold tracking-widest text-xs transition-all border border-white/5"
                >
                  Reset Weights
                </button>
              </div>

              <div className="glass-card p-6 flex-1 flex flex-col border-cyan-500/10 bg-cyan-950/10">
                <h3 className="text-xs tracking-widest uppercase text-cyan-500 font-bold mb-4 border-b border-cyan-500/20 pb-2">Training Logs</h3>
                
                <div className="flex flex-col gap-2 font-mono text-sm h-48 overflow-hidden relative">
                   <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#090b10] to-transparent z-10 pointers-events-none"></div>
                   <AnimatePresence>
                      {history.map(entry => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0 }} 
                          key={entry.iter} 
                          className="flex justify-between border-b border-white/5 pb-1"
                        >
                          <span className="text-muted">Iteration {entry.iter}</span>
                          <span className="text-rose-400">Loss: {entry.loss}</span>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                   <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#090b10] to-transparent z-10 pointers-events-none"></div>
                </div>

                {iteration >= 30 && (
                   <div className="mt-auto pt-4 text-center text-emerald-400 font-bold uppercase tracking-widest text-xs animate-pulse">
                     Model Converged!
                   </div>
                )}
              </div>

           </div>
        </div>
      </div>
    </section>
  );
}
