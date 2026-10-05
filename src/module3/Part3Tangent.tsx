import { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

export default function Part3Tangent() {
  const [xVal, setXVal] = useState(2); // slider from -4 to 4

  // Function: f(x) = x^2 / 4 (scaled for visual purposes)
  const fn = (x: number) => (x * x) / 2;
  const derivative = (x: number) => x; // Derivative of x^2 / 2 is x.

  const yVal = fn(xVal);
  const slope = derivative(xVal);

  // SVG Coordinates mapping
  // Let X range globally from -5 to 5 horizontally (mapped to 0 - 100)
  // Let Y range from -2 to 15 (mapped to 100 - 0)
  const mapX = (x: number) => ((x + 5) / 10) * 100;
  const mapY = (y: number) => 100 - ((y + 2) / 17 * 100);

  // Generate path string for parabola
  let points = [];
  for(let i = -5; i <= 5; i += 0.2) {
    points.push(`${mapX(i)},${mapY(fn(i))}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  // Generate tangent line points
  // given slope m, passing through (x0, y0), equation y - y0 = m(x - x0)
  // we need two points for the SVG line (e.g. at x0 - 3, x0 + 3)
  const tx1 = xVal - 3;
  const ty1 = slope * (tx1 - xVal) + yVal;
  
  const tx2 = xVal + 3;
  const ty2 = slope * (tx2 - xVal) + yVal;

  let slopeStatusStr = 'Zero';
  let slopeColor = 'text-gray-400';
  let strokeColor = '#9CA3AF';
  
  if (slope > 0.1) {
    slopeStatusStr = 'Positive (+)';
    slopeColor = 'text-emerald-400';
    strokeColor = '#34D399';
  } else if (slope < -0.1) {
    slopeStatusStr = 'Negative (-)';
    slopeColor = 'text-red-400';
    strokeColor = '#F87171';
  }

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          The Slope of Change
        </h2>
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-xl text-muted leading-relaxed">
            A derivative doesn't just tell us speed. On a graph, it represents the exact <strong className="text-white">SLOPE</strong> of the tangent line at any single instant.
          </p>
        </div>

        <div className="glass-card p-6 md:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          
          <div className="relative w-full md:w-2/3 h-80 bg-background/50 rounded-xl overflow-hidden border border-white/5">
            <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible" preserveAspectRatio="none">
               {/* Axes */}
               <line x1="50" y1="0" x2="50" y2="100" stroke="#ffffff22" strokeWidth="0.5" />
               <line x1="0" y1={mapY(0)} x2="100" y2={mapY(0)} stroke="#ffffff22" strokeWidth="0.5" />
               
               {/* Parabola */}
               <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="1.2" />

               {/* Tangent Line */}
               <motion.line 
                  animate={{ x1: mapX(tx1), y1: mapY(ty1), x2: mapX(tx2), y2: mapY(ty2) }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3"
               />

               {/* Target Point */}
               <motion.circle 
                  animate={{ cx: mapX(xVal), cy: mapY(yVal) }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  r="2.5" fill="#ffffff" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
               />
            </svg>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-6">
             <div className="p-4 bg-background/50 rounded-xl border border-white/5 font-mono text-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted">x (Position) </span>
                  <span className="text-white font-bold">{xVal.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">f(x) (Value)</span>
                  <span className="text-primary font-bold">{yVal.toFixed(1)}</span>
                </div>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-muted">f'(x) (Derivative)</span>
                  <span className={`${slopeColor} font-bold text-lg`}>{slope.toFixed(1)}</span>
                </div>
                <div className="flex flex-col pt-2 items-end">
                  <span className="text-[10px] text-muted tracking-widest uppercase">Slope Indicator</span>
                  <span className={`${slopeColor} font-bold`}>{slopeStatusStr}</span>
                </div>
             </div>

             <div className="w-full text-left">
                <label className="flex items-center gap-2 text-xs text-accent font-bold tracking-widest uppercase mb-4">
                  <MousePointer2 className="w-4 h-4" /> Drag the Point
                </label>
                <input 
                  type="range" min="-4.5" max="4.5" step="0.1"
                  value={xVal} onChange={(e) => setXVal(Number(e.target.value))}
                  className="w-full accent-accent py-2" 
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
