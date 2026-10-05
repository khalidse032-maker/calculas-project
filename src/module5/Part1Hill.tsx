import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Part1Hill() {
  const [posX, setPosX] = useState(4); 
  const [stepSize, setStepSize] = useState(0.8);
  
  // f(x) = x^2 / 2
  const fn = (x: number) => 0.5 * x * x;
  const df = (x: number) => x; 
  
  // Graph boundaries: x [-5, 5], y [-1, 15] roughly
  const mapX = (x: number) => ((x + 5) / 10) * 100;
  const mapY = (y: number) => 100 - ((y + 1) / 14) * 100;

  // Generate curve path
  const curvePoints = [];
  for (let i = -5; i <= 5; i += 0.1) {
    curvePoints.push(`${mapX(i)},${mapY(fn(i))}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  const slope = df(posX);
  const posY = fn(posX);
  
  const isAtBottom = Math.abs(slope) < 0.2;

  // Tangent line calculation
  const tx1 = posX - 1.5;
  const ty1 = slope * (tx1 - posX) + posY;
  const tx2 = posX + 1.5;
  const ty2 = slope * (tx2 - posX) + posY;

  // Actions
  const moveLeft = () => setPosX(x => Math.max(x - stepSize, -5));
  const moveRight = () => setPosX(x => Math.min(x + stepSize, 5));
  
  const autoLearn = () => {
    // Step in the direction OPPOSITE to the slope (gradient descent principle)
    const direction = slope > 0 ? -1 : 1;
    if (!isAtBottom) {
      setPosX(x => {
        let next = x + (direction * stepSize);
        return Math.max(Math.min(next, 5), -5);
      });
    }
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400 mb-6">
              The Hill Game
           </h2>
           <p className="text-xl text-muted">
              Can you find the absolute lowest point of this curve?
           </p>
        </div>

        <div className="glass-card mb-12 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10">
           
           {/* Visualizer Panel */}
           <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
             
             <div className="absolute top-8 left-12 right-12 flex justify-between z-10 pointers-events-none">
                <div className="text-sm font-mono tracking-widest text-muted">
                  Position: <span className="text-white">{posX.toFixed(1)}</span>
                </div>
                <div className="text-sm font-mono tracking-widest text-muted">
                  Slope: <span className={slope > 0 ? 'text-rose-400' : slope < 0 ? 'text-blue-400' : 'text-emerald-400'}>
                    {slope.toFixed(2)}
                  </span>
                </div>
             </div>

             <div className="w-full aspect-video bg-background/50 rounded-xl mt-8 overflow-hidden border border-white/5 relative items-end flex pb-4 shadow-inner">
               <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible">
                  
                  {/* The Hill */}
                  <path d={curvePath} fill="none" stroke="#f43f5e" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  
                  {/* Origin Line */}
                  <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="100" stroke="#ffffff11" strokeDasharray="2,2"/>
                  <line x1="0" y1={mapY(0)} x2="100" y2={mapY(0)} stroke="#ffffff11" strokeDasharray="2,2"/>

                  {/* Tangent Line */}
                  <line 
                     x1={mapX(tx1)} y1={mapY(ty1)} 
                     x2={mapX(tx2)} y2={mapY(ty2)} 
                     stroke={isAtBottom ? "#10b981" : "#ffffff"} 
                     strokeWidth="0.5" strokeDasharray="2,2" 
                  />

                  {/* The Ball */}
                  <motion.circle 
                     animate={{ cx: mapX(posX), cy: mapY(posY) }}
                     transition={{ type: "spring", stiffness: 100, damping: 20 }}
                     r="3" 
                     fill={isAtBottom ? "#10b981" : "#ffffff"} 
                     className={isAtBottom ? "drop-shadow-[0_0_15px_rgba(16,185,129,1)]" : "drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"}
                  />
               </svg>
             </div>
             
             {isAtBottom && (
                <div className="absolute inset-x-0 bottom-12 flex justify-center z-10 pointers-events-none">
                  <div className="bg-emerald-500/20 text-emerald-400 px-6 py-2 rounded-full border border-emerald-500/50 font-bold uppercase tracking-widest text-sm backdrop-blur-md">
                     MINIMUM FOUND
                  </div>
                </div>
             )}
           </div>

           {/* Controls Panel */}
           <div className="w-full lg:w-80 p-8 flex flex-col justify-center bg-white/5">
             <h3 className="text-xl font-bold mb-8 tracking-widest uppercase text-white border-b border-white/10 pb-4">
                Controls
             </h3>

             <div className="mb-8">
               <label className="flex justify-between text-xs font-mono tracking-widest text-muted mb-2 uppercase">
                 <span>Step Size</span>
                 <span>{stepSize}</span>
               </label>
               <input 
                 type="range" min="0.1" max="2" step="0.1"
                 value={stepSize} onChange={e => setStepSize(Number(e.target.value))}
                 className="w-full accent-rose-500" 
               />
             </div>
             
             <div className="grid grid-cols-2 gap-2 mb-8">
                <button onClick={moveLeft} className="p-3 bg-card border border-white/10 hover:border-white/30 rounded uppercase tracking-widest text-xs font-bold text-muted hover:text-white transition-colors">
                  ← Left
                </button>
                <button onClick={moveRight} className="p-3 bg-card border border-white/10 hover:border-white/30 rounded uppercase tracking-widest text-xs font-bold text-muted hover:text-white transition-colors">
                  Right →
                </button>
             </div>

             <button 
                onClick={autoLearn}
                disabled={isAtBottom}
                className={`py-4 w-full rounded uppercase tracking-widest text-sm font-bold shadow-lg transition-all ${isAtBottom ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-rose-500 text-rose-950 hover:bg-rose-400 hover:scale-[1.02]'}`}
             >
                Auto Learn
             </button>
             <p className="text-xs text-muted/70 text-center mt-4">
                Automatically uses the slope to determine direction.
             </p>
           </div>
        </div>

        {/* Math Explanation block */}
        <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-2xl max-w-2xl mx-auto text-center mt-12">
            <h4 className="text-2xl font-bold text-orange-400 mb-4">The Derivative provides Direction.</h4>
            <p className="text-lg text-orange-100/90 leading-relaxed">
              To reach the bottom of the hill without knowing what the mountain looks like, an AI model calculates the slope (derivative) at its current position. 
              <br/><br/>
              If the slope is positive, the AI moves left. If negative, it moves right. <strong className="text-white">This is Gradient Descent.</strong>
            </p>
        </div>

      </div>
    </section>
  );
}
