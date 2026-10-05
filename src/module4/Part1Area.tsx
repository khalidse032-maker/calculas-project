import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part1Area() {
  const options = [1, 2, 5, 10, 25, 50, 100, 500];
  const [rectIndex, setRectIndex] = useState(0);
  const numRectangles = options[rectIndex];

  // Mathematical function
  const fn = (x: number) => x * x;
  
  // Calculate approximation (Right Riemann sum)
  const dt = 3 / numRectangles;
  let approximation = 0;
  let rects = [];
  
  for(let i=0; i<numRectangles; i++) {
     const xLeft = i * dt;
     const xRight = (i + 1) * dt;
     const height = fn(xRight); 
     approximation += height * dt;
     rects.push({ x: xLeft, w: dt, h: height });
  }

  const isExact = numRectangles === 500;

  // scale for SVG: X from 0 to 3 maps to 0 to 100.
  // Y from 0 to 9 maps to 100 to 0. (height is 100)
  const mapX = (x: number) => (x / 3) * 100;
  const mapY = (y: number) => 100 - (y / 9) * 100;
  const mapH = (y: number) => (y / 9) * 100;

  // Real curve
  let curvePoints = [];
  for(let i=0; i<=3; i+=0.1) {
    curvePoints.push(`${mapX(i)},${mapY(fn(i))}`);
  }
  const curveD = `M ${curvePoints.join(' L ')}`;

  return (
    <section className="py-20 px-6 bg-card/20 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6">
              Area Experiment
           </h2>
           <p className="text-xl text-muted">
              We know how to calculate the area of simple rectangles, but how do we calculate the area under a curve like <code className="text-primary font-mono bg-primary/10 px-2 py-1 rounded">y = x²</code> from 0 to 3?
           </p>
        </div>

        <div className="glass-card p-8 md:p-12 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
           <div className="flex flex-col">
              <h3 className="text-2xl font-bold tracking-widest text-emerald-400 uppercase mb-4">
                 Add Small Pieces
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                 We can approximate the area by drawing rectangles underneath the curve and adding their areas together. 
                 <br/><br/>
                 <strong>Try increasing the number of rectangles using the slider.</strong> What happens to the approximation when we split the area into smaller and smaller pieces?
              </p>

              <div className="bg-background rounded-xl p-6 border border-white/5 shadow-inner mb-8">
                 <div className="flex justify-between items-center mb-4 text-xs font-mono text-muted uppercase tracking-widest">
                    <span>Few rects</span>
                    <span>Many rects</span>
                 </div>
                 <input 
                   type="range" min="0" max={options.length - 1} step="1"
                   value={rectIndex} onChange={(e) => setRectIndex(Number(e.target.value))}
                   className="w-full accent-emerald-500" 
                 />
                 <div className="text-center mt-4 font-mono text-white text-lg">
                    {numRectangles} Rectangles
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl text-center">
                    <div className="text-xs tracking-widest text-orange-400 uppercase mb-1">Approximation</div>
                    <div className="text-2xl font-mono text-orange-200">
                       ~{approximation.toFixed(3)}
                    </div>
                 </div>
                 <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                    <div className="text-xs tracking-widest text-emerald-400 uppercase mb-1">True Area</div>
                    <div className="text-2xl font-mono text-emerald-200">
                       9
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative w-full aspect-square bg-background rounded-xl overflow-hidden border border-white/10 p-4">
              <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible border-b border-l border-white/20">
                 
                 {/* Grid */}
                 <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="#ffffff11" strokeDasharray="2,2"/>
                 <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="#ffffff11" strokeDasharray="2,2"/>
                 <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="#ffffff11" strokeDasharray="2,2"/>
                 <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="#ffffff11" strokeDasharray="2,2"/>

                 {/* Rectangles */}
                 {rects.map((r, i) => (
                    <rect 
                       key={numRectangles + '-' + i}
                       x={mapX(r.x)}
                       y={mapY(r.h)}
                       width={mapX(r.w)}
                       height={mapH(r.h)}
                       fill={isExact ? "rgba(16, 185, 129, 0.4)" : "rgba(249, 115, 22, 0.3)"}
                       stroke={isExact ? "rgba(16, 185, 129, 0.8)" : "rgba(249, 115, 22, 0.8)"}
                       strokeWidth={numRectangles > 50 ? "0.1" : "0.5"}
                    />
                 ))}

                 {/* True Curve */}
                 <path d={curveD} fill="none" stroke="#2dd4bf" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
              </svg>
              
              <div className="absolute left-6 bottom-6 right-6 flex justify-between text-xs font-mono text-white/50 px-1 pt-2 pointer-events-none">
                 <span>x = 0</span>
                 <span>x = 3</span>
              </div>
           </div>
           
        </div>

        <AnimatePresence>
          {isExact && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-8 border-2 border-emerald-500 bg-emerald-500/10 rounded-2xl text-center max-w-2xl mx-auto"
             >
                <h3 className="text-2xl font-bold text-emerald-400 mb-6">This is the idea of Integration.</h3>
                <p className="text-lg text-emerald-100 mb-6">
                  An integral is literally just adding up infinitely many, infinitely thin rectangles. It turns a rate curve into a solid accumulated total.
                </p>
                <div className="bg-background/80 py-4 px-8 rounded-xl inline-block border border-emerald-500/30">
                   <span className="text-4xl font-serif tracking-widest font-bold text-white">∫₀³ x² dx = 9</span>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
