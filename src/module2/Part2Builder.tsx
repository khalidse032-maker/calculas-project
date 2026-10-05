import { useState } from 'react';
import { motion } from 'framer-motion';

type FuncType = 'x' | 'x²' | '2x' | 'x + 5' | 'sin(x)';

export default function Part2Builder() {
  const [selectedFunc, setSelectedFunc] = useState<FuncType>('x²');
  const [xVal, setXVal] = useState(5);

  const calculateY = (x: number, type: FuncType) => {
    switch (type) {
      case 'x': return x;
      case 'x²': return Math.pow(x, 2) / 10; // Scaling for visualization
      case '2x': return 2 * x;
      case 'x + 5': return x + 15; // Visual offset
      case 'sin(x)': return Math.sin(x / 2) * 20 + 50; // Scaling
    }
  };

  const getDisplayY = (x: number, type: FuncType) => {
    switch (type) {
      case 'x': return x;
      case 'x²': return Math.pow(x, 2); 
      case '2x': return 2 * x;
      case 'x + 5': return x + 5; 
      case 'sin(x)': return Math.sin(x).toFixed(2); 
    }
  };

  // Generate SVG Path
  const points = [];
  for (let i = 0; i <= 10; i += 0.5) {
    const xCoord = i * 10; // Scale 0-10 to 0-100% SVG width
    const yCoord = 100 - calculateY(i, selectedFunc); // Invert Y for SVG
    points.push(`${xCoord},${yCoord}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  const currentXCoord = xVal * 10;
  const currentYCoord = 100 - calculateY(xVal, selectedFunc);

  const functions: FuncType[] = ['x', 'x²', '2x', 'x + 5', 'sin(x)'];

  return (
    <section className="py-20 px-6 min-h-screen bg-card/20 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Build Your Own Function
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-muted mb-4">Select Blueprint</h3>
            {functions.map(fn => (
              <button
                key={fn}
                onClick={() => setSelectedFunc(fn)}
                className={`p-4 rounded-xl text-left text-lg transition-all border ${
                  selectedFunc === fn 
                  ? 'bg-primary/20 border-primary text-white font-mono' 
                  : 'bg-card border-white/5 text-muted hover:border-white/20'
                }`}
              >
                f(x) = {fn}
              </button>
            ))}
          </div>

          <div className="md:col-span-8 glass-card p-6 md:p-10 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
              <div>
                <div className="text-sm tracking-widest text-muted uppercase">Current Input</div>
                <div className="text-3xl text-white font-mono">x = {xVal.toFixed(1)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm tracking-widest text-primary uppercase">Output Result</div>
                <div className="text-3xl text-primary font-mono font-bold">f(x) = {getDisplayY(xVal, selectedFunc)}</div>
              </div>
            </div>

            {/* SVG Graph */}
            <div className="relative w-full h-64 bg-background/50 rounded-xl border border-white/10 mb-8 p-4">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid */}
                <g stroke="#ffffff0a" strokeWidth="1">
                  {[20, 40, 60, 80].map(l => (
                    <line key={`h${l}`} x1="0" y1={l} x2="100" y2={l} />
                  ))}
                  {[20, 40, 60, 80].map(l => (
                    <line key={`v${l}`} x1={l} y1="0" x2={l} y2="100" />
                  ))}
                </g>
                
                {/* Graph trace */}
                <motion.path 
                  key={selectedFunc}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  d={pathD} 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="2" 
                />

                {/* Point */}
                <motion.circle 
                  animate={{ cx: currentXCoord, cy: currentYCoord }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  r="4" 
                  fill="#10B981" 
                  className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />

                {/* Guides */}
                <motion.line 
                  animate={{ x1: currentXCoord, x2: currentXCoord, y1: currentYCoord, y2: 100 }}
                  stroke="#10B981" strokeWidth="0.5" strokeDasharray="2,2"
                />
                <motion.line 
                  animate={{ x1: 0, x2: currentXCoord, y1: currentYCoord, y2: currentYCoord }}
                  stroke="#10B981" strokeWidth="0.5" strokeDasharray="2,2"
                />
              </svg>
            </div>

            <div className="w-full">
              <input 
                type="range" min="0" max="10" step="0.1"
                value={xVal} onChange={(e) => setXVal(Number(e.target.value))}
                className="w-full accent-primary" 
              />
              <div className="text-center text-muted text-sm mt-2">Adjust input 'x'</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
