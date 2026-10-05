import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part3Limit() {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Distances from x = 1
  const distances = [1, 0.5, 0.1, 0.01, 0.001];
  const currentDistance = distances[step];
  
  const currentX = 1 + currentDistance;
  const currentY = (Math.pow(currentX, 2) - 1) / (currentX - 1);
  
  const calculateY = (x: number) => {
    // Handling the hole exactly at x=1 for plotting
    if (Math.abs(x - 1) < 0.0001) return null;
    return (Math.pow(x, 2) - 1) / (x - 1);
  };

  // Generate SVG Path for f(x)
  const points = [];
  let holeCoord = null;
  for (let i = 0; i <= 2; i += 0.05) {
    const xCoord = i * 50; 
    const yVal = calculateY(i);
    if (yVal !== null) {
      const yCoord = 100 - (yVal * 25); // Scaling for Y (Y=4 max -> 100 height)
      points.push(`${xCoord},${yCoord}`);
    } else {
      holeCoord = { x: i * 50, y: 100 - (2 * 25) };
    }
  }
  const pathD = `M ${points.join(' L ')}`;

  const currentXCoord = currentX * 50;
  const currentYCoord = 100 - (currentY * 25);
  
  // Calculate relative zoom based on step to simulate "getting closer" visually.
  // Actually, we'll just keep the graph scale fixed, but show the coordinate zooming in.
  const visualZoom = 1 + (step * 0.5);

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          The Limit Experience
        </h2>
        
        <div className="text-center mb-12">
          <p className="text-xl text-muted">Consider the function:</p>
          <p className="text-3xl text-primary font-mono font-bold mt-2">f(x) = (x² - 1) / (x - 1)</p>
          <p className="text-sm text-red-400 mt-2">What happens at x = 1? It's mathematically undefined (division by zero).</p>
        </div>

        <div className="glass-card p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-8">What value does the graph appear to approach?</h3>
          
          <div className="relative w-full h-[300px] bg-background/50 rounded-xl overflow-hidden mb-8 flex items-center justify-center border border-white/5">
            <motion.svg 
              animate={{ scale: visualZoom }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewBox="0 0 100 100" className="w-[80%] h-full overflow-visible" preserveAspectRatio="xMidYMid slice"
            >
              {/* Grid */}
              <g stroke="#ffffff0a" strokeWidth="0.5">
                {[25, 50, 75].map(l => (
                  <line key={`v${l}`} x1={l} y1="0" x2={l} y2="100" />
                ))}
                {[25, 50, 75].map(l => (
                  <line key={`h${l}`} x1="0" y1={l} x2="100" y2={l} />
                ))}
              </g>

              {/* Function line */}
              <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="1.5" />
              
              {/* The Hole */}
              {holeCoord && (
                <circle cx={holeCoord.x} cy={holeCoord.y} r="1.5" fill="#0B0F19" stroke="#EF4444" strokeWidth="0.5" />
              )}
              
              {/* Approaching point */}
              <motion.circle 
                animate={{ cx: currentXCoord, cy: currentYCoord }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                r="2" 
                fill="#10B981" 
                className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
              
              {/* Guide lines for approaching point */}
              <motion.line 
                animate={{ x1: currentXCoord, x2: currentXCoord, y1: currentYCoord, y2: 100 }}
                stroke="#10B981" strokeWidth="0.2" strokeDasharray="1,1"
              />
              <motion.line 
                animate={{ x1: 0, x2: currentXCoord, y1: currentYCoord, y2: currentYCoord }}
                stroke="#10B981" strokeWidth="0.2" strokeDasharray="1,1"
              />
            </motion.svg>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-8">
            <div className="w-full text-left">
              <div className="text-sm text-muted mb-2 font-bold tracking-widest uppercase">Distance from x = 1</div>
              <input 
                type="range" min="0" max="4" step="1"
                value={step} onChange={(e) => setStep(Number(e.target.value))}
                className="w-full accent-accent mb-4" 
              />
              <div className="flex justify-between text-xs text-muted">
                {distances.map((d, i) => <span key={i} className={step === i ? 'text-accent font-bold' : ''}>{d}</span>)}
              </div>
            </div>
            
            <div className="min-w-[200px] bg-card p-4 rounded-xl border border-white/5">
               <div className="text-sm text-text">When x = {currentX.toFixed(3)}</div>
               <div className="text-2xl font-mono text-accent font-bold">f(x) = {currentY.toFixed(3)}</div>
            </div>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => setShowExplanation(true)}
              className="interactive-button bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white"
            >
              Reveal Concept
            </button>
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                className="bg-secondary/10 p-6 rounded-xl border border-secondary/30"
              >
                <p className="text-xl text-secondary">
                  This is the concept of a <span className="font-bold">LIMIT</span>:<br/><br/>
                  Even though the function is technically undefined right at x = 1, we can see exactly what value it is trying to reach. It is approaching <span className="font-bold">2</span>. 
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
