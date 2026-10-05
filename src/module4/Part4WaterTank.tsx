import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part4WaterTank() {
  const [rate, setRate] = useState(5); // 0 to 10 liters/sec
  const [time, setTime] = useState(5); // 0 to 10 sec

  const totalWater = rate * time;
  const heightPercentage = Math.min((totalWater / 100) * 100, 100);

  return (
    <section className="py-20 px-6 min-h-screen bg-card/10 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Controls */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cyan-400">
            Digital Reservoirs
          </h2>
          <p className="text-lg text-muted mb-12">
            Integration represents constantly accumulating something over time.
          </p>

          <div className="space-y-8 glass-card p-8 border-cyan-500/10">
            <div>
              <div className="flex justify-between font-mono text-sm uppercase tracking-widest text-cyan-500 mb-2">
                 <span>Flow Rate</span>
                 <span>{rate} L/s</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" 
                value={rate} onChange={e => setRate(Number(e.target.value))}
                className="w-full accent-cyan-500" 
              />
              <p className="text-xs text-muted mt-2">How quickly water enters</p>
            </div>

            <div>
              <div className="flex justify-between font-mono text-sm uppercase tracking-widest text-purple-400 mb-2">
                 <span>Time elapsed</span>
                 <span>{time} s</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" 
                value={time} onChange={e => setTime(Number(e.target.value))}
                className="w-full accent-purple-400" 
              />
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <div className="bg-background border border-white/5 p-4 rounded text-center">
                <span className="text-xs uppercase tracking-widest text-muted block mb-1">Accumulated Amount</span>
                <span className="text-3xl font-bold text-white font-mono">{totalWater} L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tank Visual */}
        <div className="flex flex-col items-center">
           
           {/* Faucet Simulation */}
           <div className="flex flex-col items-center z-10 w-full relative h-[60px]">
             <div className="w-12 h-6 bg-gray-700 border-b-4 border-gray-900 rounded-t-md relative z-20" />
             
             {/* The stream of water */}
             <AnimatePresence>
               {rate > 0 && time > 0 && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: '60px', opacity: rate / 10 + 0.2 }}
                   className="w-4 bg-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.8)] absolute top-[10px] rounded-b-full origin-top"
                 />
               )}
             </AnimatePresence>
           </div>
           
           {/* The Tank */}
           <div className="relative w-64 h-80 border-4 border-t-0 border-white/20 rounded-b-3xl bg-background/50 overflow-hidden shadow-2xl flex items-end">
              
              {/* Scale Markers */}
              <div className="absolute left-0 bottom-0 h-full flex flex-col-reverse justify-between py-4 px-2 opacity-30 text-[10px] font-mono pointer-events-none">
                 <span>0</span>
                 <span>25</span>
                 <span>50</span>
                 <span>75</span>
                 <span>100L</span>
              </div>

              {/* The Water */}
              <motion.div 
                 initial={{ height: "0%" }}
                 animate={{ height: `${heightPercentage}%` }}
                 transition={{ type: "spring", stiffness: 50, damping: 20 }}
                 className="w-full bg-cyan-500/30 border-t-4 border-cyan-400/80 relative"
              >
                 {/* Internal wave effect */}
                 <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-cyan-600/40 to-transparent"></div>
              </motion.div>
           </div>

           <div className="mt-8 text-center bg-cyan-500/10 p-4 border border-cyan-500/20 rounded-xl w-64">
              <p className="text-sm font-medium text-cyan-100">
                "The integral combines many small amounts into a total."
              </p>
           </div>
        </div>

      </div>
    </section>
  );
}
