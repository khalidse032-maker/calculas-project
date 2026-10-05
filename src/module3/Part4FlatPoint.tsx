import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

export default function Part4FlatPoint() {
  const [xVal, setXVal] = useState(0); // -2.5 to 2.5
  
  // f(x) = x^3 - 3x. 
  // scaled for visual (multiply x by 0.5?) Let's use raw and map to SVG manually.
  const fn = (x: number) => Math.pow(x, 3) - 3 * x;
  const derivative = (x: number) => 3 * Math.pow(x, 2) - 3;
  
  const yVal = fn(xVal);
  const slope = derivative(xVal);
  
  // SVG Map
  const mapX = (x: number) => ((x + 2.5) / 5) * 100;
  const mapY = (y: number) => 100 - ((y + 4) / 8 * 100);

  let points = [];
  for(let i = -2.5; i <= 2.5; i += 0.1) {
    points.push(`${mapX(i)},${mapY(fn(i))}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  // Tangent
  const tx1 = xVal - 1;
  const ty1 = slope * (tx1 - xVal) + yVal;
  const tx2 = xVal + 1;
  const ty2 = slope * (tx2 - xVal) + yVal;

  const isFlat = Math.abs(slope) < 0.1;

  return (
    <section className="py-20 px-6 min-h-screen bg-card/20 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Find the Flat Point
        </h2>
        
        <div className="glass-card p-8 md:p-12 mb-12 text-center">
          <h3 className="text-xl mb-8">
            Move the point to where the slope becomes <strong className="text-primary tracking-widest text-2xl ml-2">ZERO</strong>
          </h3>

          <div className="relative w-full h-80 bg-background/50 rounded-xl overflow-hidden mb-8 border border-white/5 flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-[80%] h-full overflow-visible" preserveAspectRatio="none">
               {/* Axes */}
               <line x1="50" y1="0" x2="50" y2="100" stroke="#ffffff11" strokeWidth="0.5" />
               <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff11" strokeWidth="0.5" />
               
               <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="1" />
               
               {/* Tangent Line */}
               <line 
                  x1={mapX(tx1)} y1={mapY(ty1)} x2={mapX(tx2)} y2={mapY(ty2)} 
                  stroke={isFlat ? "#34D399" : "#F87171"} strokeWidth={isFlat ? "2" : "1"} strokeDasharray={isFlat ? "" : "4,4"}
               />

               <circle 
                  cx={mapX(xVal)} cy={mapY(yVal)} r={isFlat ? "3" : "2"} 
                  fill={isFlat ? "#10B981" : "#ffffff"} 
                  className={isFlat ? "drop-shadow-[0_0_10px_rgba(16,185,129,0.9)] transition-all duration-300" : ""}
               />
             </svg>
          </div>

          <div className="w-full text-left max-w-lg mx-auto">
             <div className="flex justify-between text-xs tracking-widest uppercase mb-4 text-muted">
                <span className="flex items-center gap-2"><MousePointer2 className="w-4 h-4"/> Drag Point</span>
                <span className={isFlat ? "text-emerald-400 font-bold" : "text-red-400"}>Slope: {slope.toFixed(2)}</span>
             </div>
             
             <input 
               type="range" min="-2.4" max="2.4" step="0.05"
               value={xVal} onChange={(e) => setXVal(Number(e.target.value))}
               className={`w-full ${isFlat ? 'accent-emerald-500' : 'accent-primary'}`} 
             />
          </div>
          
          <AnimatePresence>
             {isFlat && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                   className="mt-12 p-6 border border-emerald-500/40 bg-emerald-500/10 rounded-xl"
                >
                   <h4 className="text-3xl font-bold text-emerald-400 mb-2 font-mono">SUCCESS!</h4>
                   <p className="text-xl text-emerald-100">
                     At a local maximum or minimum, the derivative is zero.
                   </p>
                   <p className="text-sm text-muted mt-4">
                     Software uses this mathematical truth (Setting f'(x) = 0) to find optimal configurations—like maximizing game performance, fitting an AI model, or finding the cheapest shipping route. <strong>This is called Optimization.</strong>
                   </p>
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
