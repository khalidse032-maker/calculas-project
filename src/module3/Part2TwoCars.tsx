import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part2TwoCars() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // 0 to 100

  // Run the animation loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="py-20 px-6 min-h-screen text-center flex flex-col items-center bg-card/20">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Comparing Change
        </h2>
        
        <div className="glass-card p-8 md:p-12 mb-12">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Time: {isPlaying ? (progress / 10).toFixed(1) : 0}s / 10s</h3>
            <button 
              onClick={() => { setProgress(0); setIsPlaying(true); setSelectedCar(null); }}
              className="bg-white text-black px-4 py-2 rounded font-bold uppercase tracking-widest text-sm shadow hover:bg-neutral-200"
            >
              Play Race
            </button>
          </div>

          <div className="space-y-8 mb-12">
            {/* CAR A (Slow) */}
            <div className="relative w-full h-16 bg-background rounded overflow-hidden border border-white/5">
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-center px-4 z-10 w-24 border-r border-white/5 bg-black/50">
                <span className="font-bold text-lg">Car A</span>
              </div>
              <motion.div 
                className="absolute top-[10%] h-[80%] w-24 bg-red-500/80 rounded"
                style={{ left: `calc((${progress * 0.4}% + 100px) - 20px)` }} 
                transition={{ duration: 0 }}
              />
            </div>
            
            {/* CAR B (Fast) */}
            <div className="relative w-full h-16 bg-background rounded overflow-hidden border border-white/5">
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-center px-4 z-10 w-24 border-r border-white/5 bg-black/50">
                <span className="font-bold text-lg">Car B</span>
              </div>
              <motion.div 
                className="absolute top-[10%] h-[80%] w-24 bg-emerald-500/80 rounded"
                style={{ left: `calc((${progress * 0.9}% + 100px) - 20px)` }} 
                transition={{ duration: 0 }}
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h4 className="text-2xl font-bold mb-6">Which car has a greater rate of change?</h4>
            <div className="flex justify-center gap-6 mb-8">
               <button 
                  onClick={() => setSelectedCar('A')}
                  className={`px-8 py-4 rounded-xl border-2 transition-all ${selectedCar === 'A' ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-card border-white/10 hover:border-white/30'}`}
               >
                 CAR A
               </button>
               <button 
                  onClick={() => setSelectedCar('B')}
                  className={`px-8 py-4 rounded-xl border-2 transition-all ${selectedCar === 'B' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'bg-card border-white/10 hover:border-white/30'}`}
               >
                 CAR B
               </button>
            </div>
            
            <AnimatePresence>
              {selectedCar !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl border ${selectedCar === 'B' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                >
                  <p className="font-bold text-2xl mb-2">
                    {selectedCar === 'B' ? "Correct!" : "Not quite. Car B covers more distance in the same time."}
                  </p>
                  {selectedCar === 'B' && (
                     <p className="text-white text-lg">
                       Car B's position is changing much faster. <br/><br/>
                       In calculus, we say it has a <strong className="text-emerald-400 font-mono text-xl">LARGER DERIVATIVE</strong>. <br/><br/>
                       <strong>Derivative = Rate of Change.</strong>
                     </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
