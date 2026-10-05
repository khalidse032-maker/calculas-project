import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part1Car() {
  const [time, setTime] = useState(0); // 0 to 10
  const [velocity, setVelocity] = useState(5); // Initial velocity
  const [acceleration, setAcceleration] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);

  // Physics: x = v0*t + 0.5*a*t^2, v = v0 + a*t
  const position = 10 + (velocity * time) + (0.5 * acceleration * time * time); // Starting at 10m
  const currentSpeed = velocity + (acceleration * time);

  // Road drawing constraints
  const trackLength = 200; // max distance visually represented
  const carX = Math.min((position / trackLength) * 100, 100); // percentage

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
          The Moving Car Experiment
        </h2>
        
        <div className="glass-card p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          
          <h3 className="text-2xl font-bold mb-8 text-primary">Observe the change.</h3>
          
          {/* Simulation Viewport */}
          <div className="relative w-full h-48 bg-background/50 rounded-xl overflow-hidden mb-8 border border-white/5 shadow-inner">
            {/* Background elements (Road) */}
            <div className="absolute top-[60%] w-full h-1 bg-white/20"></div>
            <div className="absolute top-[60%] w-full h-1 bg-white flex justify-between" style={{ borderBottom: '2px dashed rgba(255,255,255,0.4)', background: 'transparent'}}></div>
            
            {/* Distance Markers */}
            <div className="absolute top-[70%] left-0 w-full flex justify-between px-2 text-xs text-muted font-mono">
               <span>0m</span>
               <span>50m</span>
               <span>100m</span>
               <span>150m</span>
               <span>200m</span>
            </div>

            {/* The Car (SVG) */}
            <motion.div 
               className="absolute top-[40%] -translate-y-1/2 w-16 h-10"
               animate={{ left: `${carX}%` }}
               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                 <rect x="10" y="20" width="80" height="20" rx="5" fill="#3B82F6" />
                 <rect x="25" y="5" width="50" height="15" rx="5" fill="#60A5FA" />
                 <circle cx="25" cy="45" r="8" fill="#1E293B" />
                 <circle cx="25" cy="45" r="4" fill="#94A3B8" />
                 <circle cx="75" cy="45" r="8" fill="#1E293B" />
                 <circle cx="75" cy="45" r="4" fill="#94A3B8" />
              </svg>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
            {/* Controls */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-card/40 p-6 rounded-xl border border-white/5">
              <div className="w-full text-left">
                <div className="text-xs text-muted font-bold tracking-widest uppercase mb-2">Time: {time.toFixed(1)} s</div>
                <input 
                  type="range" min="0" max="10" step="0.1"
                  value={time} onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full accent-primary" 
                />
              </div>
              
              <div className="w-full text-left">
                <div className="text-xs text-muted font-bold tracking-widest uppercase mb-2">Init Speed: {velocity.toFixed(1)} m/s</div>
                <input 
                  type="range" min="0" max="15" step="1"
                  value={velocity} onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full accent-accent" 
                />
              </div>

              <div className="w-full text-left md:col-span-2">
                <div className="text-xs text-muted font-bold tracking-widest uppercase mb-2">Acceleration: {acceleration.toFixed(1)} m/s²</div>
                <input 
                  type="range" min="0" max="5" step="0.2"
                  value={acceleration} onChange={(e) => setAcceleration(Number(e.target.value))}
                  className="w-full accent-emerald-500" 
                />
              </div>
            </div>

            {/* Dashboard Display */}
            <div className="col-span-1 bg-card/40 p-6 rounded-xl border border-white/5 flex flex-col justify-center gap-4 text-left font-mono">
              <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                 <span className="text-sm text-muted">Time</span>
                 <span className="text-lg text-primary font-bold">{time.toFixed(1)}s</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                 <span className="text-sm text-muted">Position</span>
                 <span className="text-lg text-accent font-bold">{position.toFixed(1)}m</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                 <span className="text-sm text-muted">Speed</span>
                 <span className="text-lg text-emerald-400 font-bold">{currentSpeed.toFixed(1)}m/s</span>
              </div>
            </div>
          </div>
          
          {/* Question / Explanation flow */}
          <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl mt-8">
            <h4 className="text-xl mb-4 font-bold text-white">
              The car moved from 10m to {position.toFixed(1)}m in {time.toFixed(1)}s.
            </h4>
            <p className="text-lg text-muted mb-6">
              How quickly did its position change?
            </p>
            
            <button 
              onClick={() => setShowExplanation(true)}
              className="interactive-button bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white"
            >
              Reveal The Concept
            </button>

            <AnimatePresence>
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  className="bg-secondary/10 p-6 rounded-xl border border-secondary/30 text-left"
                >
                  <p className="text-2xl text-secondary font-bold mb-4">
                    This is the idea of RATE OF CHANGE.
                  </p>
                  <p className="text-muted text-lg leading-relaxed">
                    Rather than just knowing <strong>where</strong> the car is, software and physics need to know how fast that position is updating over time. A derivative is the mathematical tool that tells us exactly this rate.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
