import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Target } from 'lucide-react';

export default function Part3Distance() {
  const [calculating, setCalculating] = useState(false);
  const [distance, setDistance] = useState(0);
  const fillControls = useAnimation();
  const carControls = useAnimation();

  const handleCalculate = () => {
    setCalculating(true);
    setDistance(0);
    
    // Animate car and graph fill over 3 seconds
    carControls.start({
      left: "calc(100% - 3rem)",
      transition: { duration: 3, ease: "linear" }
    });
    
    fillControls.start({
      width: "100%",
      transition: { duration: 3, ease: "linear" }
    });

    let currentDist = 0;
    const interval = setInterval(() => {
      currentDist += 2.5;
      setDistance(Math.min(currentDist, 100)); // cap at 100 distance units
      if (currentDist >= 100) {
        clearInterval(interval);
      }
    }, 75); // 3 seconds / 40 updates
  };

  const reset = () => {
    setCalculating(false);
    setDistance(0);
    carControls.set({ left: "0%" });
    fillControls.set({ width: "0%" });
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full">
        
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-8 text-center">
          Distance from Velocity
        </h2>
        
        <div className="glass-card p-8 md:p-12 mb-12 border-blue-500/10 text-center">
           <p className="text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
             If a car travels at a constant velocity, how do we calculate the total distance?
           </p>

           {/* Car UI */}
           <div className="mb-12">
             <div className="flex justify-between text-xs tracking-widest text-muted uppercase mb-4 px-4 font-mono">
                <span>Start</span>
                <span>Distance = {Math.floor(distance)}m</span>
             </div>
             
             <div className="relative w-full h-16 bg-background rounded-full border border-white/5 flex items-center px-4 overflow-hidden shadow-inner">
                {/* Road markers */}
                <div className="absolute inset-0 flex justify-between px-10 items-center opacity-20">
                   {[1,2,3,4,5,6,7].map(i => <div key={i} className="w-1 h-3 bg-white"></div>)}
                </div>
                
                <motion.div 
                  initial={{ left: "0%" }}
                  animate={carControls}
                  className="absolute w-12 h-12 bg-blue-500 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center z-10"
                >
                  <Target className="w-6 h-6 text-white/50" />
                </motion.div>
             </div>
           </div>

           {/* Velocity Graph */}
           <div className="w-full max-w-lg mx-auto mb-8 relative">
              <div className="flex justify-between text-xs tracking-widest text-muted uppercase mb-2">
                 <span>Time (s)</span>
                 <span>Velocity = 33m/s</span>
              </div>
              <div className="relative w-full h-40 bg-background border-l border-b border-white/20 overflow-hidden flex items-end">
                 
                 {/* The Fill (Area under curve) */}
                 <motion.div 
                   initial={{ width: "0%" }}
                   animate={fillControls}
                   className="absolute left-0 bottom-0 top-[20%] bg-blue-500/20 border-r border-t-2 border-t-blue-500 border-r-blue-500 origin-left"
                 />
                 
                 {/* The flat velocity line (dashed to show it stays there independently) */}
                 <div className="absolute top-[20%] w-full border-t-2 border-dashed border-white/10" />

              </div>
              <span className="absolute -left-6 top-[20%] text-xs -translate-y-1/2 text-muted">V</span>
           </div>

           {!calculating || distance === 100 ? (
             <button 
               onClick={distance === 100 ? reset : handleCalculate}
               className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
             >
               {distance === 100 ? 'Reset' : 'Calculate Distance'}
             </button>
           ) : (
             <div className="h-[48px] flex justify-center items-center font-mono text-blue-400">
                Calculating... {Math.floor(distance)}
             </div>
           )}

           {distance === 100 && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="mt-12 bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl flex flex-col md:flex-row justify-center items-center gap-8"
             >
                <div className="text-left max-w-sm">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">Area = Distance</h4>
                  <p className="text-sm text-blue-100/70">The area under a Velocity-Time graph is exactly equal to the total distance covered.</p>
                </div>
                
                <div className="flex items-center gap-4 text-center mt-4 md:mt-0 font-bold uppercase tracking-widest text-xs">
                   <div className="p-3 bg-card border rounded shadow">Velocity</div>
                   <div className="text-muted text-lg">→</div>
                   <div className="p-3 bg-blue-500 border-blue-400 rounded text-blue-950 shadow-[0_0_15px_rgba(59,130,246,0.5)]">Integral</div>
                   <div className="text-muted text-lg">→</div>
                   <div className="p-3 bg-card border rounded shadow text-emerald-400">Distance</div>
                </div>
             </motion.div>
           )}

        </div>
      </div>
    </section>
  );
}
