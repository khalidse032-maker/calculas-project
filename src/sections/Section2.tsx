import { useState } from 'react';
import { motion } from 'framer-motion';

const DerivativeSim = () => {
  const [time, setTime] = useState(50);
  const rate = (time / 10).toFixed(1);
  return (
    <div className="flex flex-col items-center mt-4 h-full">
      <div className="w-full h-32 bg-background/50 rounded-lg relative overflow-hidden mb-4 border border-white/5">
        <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path d="M0,80 Q50,-20 100,80" fill="transparent" stroke="#3B82F6" strokeWidth="2" />
          <circle cx={time} cy={80 - (Math.sin(time / 31.8) * 40)} r="3" fill="#60A5FA" />
          {/* Tangent line approximation */}
          <line 
            x1={time - 20} 
            y1={(80 - (Math.sin(time / 31.8) * 40)) + (time > 50 ? 10 : -10)} 
            x2={time + 20} 
            y2={(80 - (Math.sin(time / 31.8) * 40)) - (time > 50 ? 10 : -10)} 
            stroke="#10B981" 
            strokeWidth="1"
          />
        </svg>
      </div>
      
      <div className="flex justify-between w-full text-xs text-muted mb-2">
        <span>Time</span>
        <span className="text-primary font-mono">Rate: {rate}</span>
      </div>
      <input type="range" min="10" max="90" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
};

const IntegralSim = () => {
  const [time, setTime] = useState(20);
  const total = (time * 1.5).toFixed(0);
  return (
    <div className="flex flex-col items-center mt-4 h-full">
      <div className="w-full h-32 bg-background/50 rounded-lg relative overflow-hidden mb-4 border border-white/5 flex items-end">
        <div className="w-full bg-blue-500/40 transition-all duration-100" style={{ height: `${time}%` }}>
           
        </div>
      </div>
      <div className="flex justify-between w-full text-xs text-muted mb-2">
        <span>Time</span>
        <span className="text-secondary font-mono">Total: {total} units</span>
      </div>
      <input type="range" min="0" max="100" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full accent-secondary" />
    </div>
  );
};

const LimitSim = () => {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="flex flex-col items-center mt-4 h-full">
      <div className="w-full h-32 bg-background/50 rounded-lg relative overflow-hidden mb-4 border border-white/5 flex items-center justify-center">
        <motion.div style={{ scale: zoom }} className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
          <div className="w-2 h-2 bg-accent rounded-full" />
        </motion.div>
      </div>
      <div className="flex justify-between w-full text-xs text-muted mb-2">
        <span>Zoom / Approach</span>
        <span className="text-accent font-mono">Scale: {zoom.toFixed(1)}x</span>
      </div>
      <input type="range" min="1" max="10" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-accent" />
    </div>
  );
};

const OptimizationSim = () => {
  const [pos, setPos] = useState(20);
  const score = Math.floor(100 - Math.abs(50 - pos));
  return (
    <div className="flex flex-col items-center mt-4 h-full">
      <div className="w-full h-32 bg-background/50 rounded-lg relative overflow-hidden mb-4 border border-white/5 flex items-end">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 Q50,0 100,100" fill="url(#grad)" />
          <circle cx={pos} cy={100 - (100 - Math.abs(50 - pos))} r="4" fill="#F59E0B" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-between w-full text-xs text-muted mb-2">
        <span>Position</span>
        <span className="text-amber-500 font-mono">Best Score: {score > 98 ? 'MAX' : score}</span>
      </div>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} className="w-full accent-amber-500" />
    </div>
  );
}

export default function Section2() {
  const jobs = [
    { id: 1, title: 'CHANGE', subtitle: 'Derivatives', desc: 'Predicting how fast a value is moving.', Component: DerivativeSim, border: 'hover:border-primary' },
    { id: 2, title: 'ACCUMULATION', subtitle: 'Integrals', desc: 'Adding up small pieces over time.', Component: IntegralSim, border: 'hover:border-secondary' },
    { id: 3, title: 'APPROACH', subtitle: 'Limits', desc: 'Focusing on exact moments.', Component: LimitSim, border: 'hover:border-accent' },
    { id: 4, title: 'BEST RESULT', subtitle: 'Optimization', desc: 'Finding the peak performance.', Component: OptimizationSim, border: 'hover:border-amber-500' },
  ];

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Four Jobs of Calculus
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 flex flex-col h-[350px] transition-colors ${job.border}`}
            >
              <div className="mb-4 text-center">
                <h3 className="text-xl font-bold tracking-widest text-white">{job.title}</h3>
                <div className="text-primary font-mono text-sm mt-1">→ {job.subtitle}</div>
                <p className="text-muted text-sm mt-2">{job.desc}</p>
              </div>
              
              <div className="flex-1 mt-2">
                <job.Component />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
