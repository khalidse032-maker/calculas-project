import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part1BlackBox() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [inputValue, setInputValue] = useState(50);
  const [showFormula, setShowFormula] = useState(false);

  const examples = [
    { title: 'Speed', functionName: 'Physics System', outputLabel: 'Position', multiplier: 2.5, unitIn: 'm/s', unitOut: 'm', formula: 'f(s) = s × 2.5' },
    { title: 'Temperature', functionName: 'Weather Simulation', outputLabel: 'Pressure', multiplier: 1.8, unitIn: '°C', unitOut: 'kPa', formula: 'P(T) = T × 1.8' },
    { title: 'Training Data', functionName: 'AI Model', outputLabel: 'Accuracy', multiplier: 0.9, unitIn: 'GB', unitOut: '%', formula: 'A(d) = min(d × 0.9, 99.9)' },
  ];

  const active = examples[selectedExample];
  
  const getOutput = () => {
    if (active.title === 'Training Data') return Math.min(Number((inputValue * active.multiplier).toFixed(1)), 99.9);
    return (inputValue * active.multiplier).toFixed(1);
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Function as a Software System
        </h2>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {examples.map((ex, i) => (
            <button
              key={ex.title}
              onClick={() => { setSelectedExample(i); setShowFormula(false); setInputValue(50); }}
              className={`px-6 py-2 rounded-full border transition-all ${
                selectedExample === i ? 'bg-secondary/20 border-secondary text-white' : 'bg-card border-white/10 text-muted hover:border-white/30'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Black Box Visual */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
            {/* Input */}
            <div className="flex flex-col items-center flex-1 w-full">
              <span className="text-sm font-bold text-muted mb-2 tracking-widest uppercase">INPUT</span>
              <div className="bg-primary/20 border border-primary/50 text-white rounded-xl p-6 w-full text-center">
                <div className="text-2xl font-bold mb-4">{active.title}</div>
                <div className="text-3xl text-primary font-mono mb-6">{inputValue} {active.unitIn}</div>
                <input 
                  type="range" min="0" max="100" 
                  value={inputValue} onChange={(e) => { setInputValue(Number(e.target.value)); setShowFormula(true); }}
                  className="w-full accent-primary" 
                />
              </div>
            </div>

            {/* Processing Box */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ rotate: inputValue % 2 === 0 ? 2 : -2 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="w-40 h-40 bg-card border-2 border-secondary rounded-2xl flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:10px_10px]" />
                <span className="text-sm font-bold text-secondary mb-2 whitespace-nowrap px-4 py-1 bg-secondary/10 rounded-full">
                  {active.functionName}
                </span>
                
                <AnimatePresence>
                  {showFormula && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-mono text-white font-bold bg-background/80 px-3 py-1 rounded"
                    >
                      {active.formula}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Output */}
            <div className="flex flex-col items-center flex-1 w-full">
              <span className="text-sm font-bold text-muted mb-2 tracking-widest uppercase">OUTPUT</span>
              <div className="bg-accent/20 border border-accent/50 text-white rounded-xl p-6 w-full text-center h-full flex flex-col justify-center min-h-[160px]">
                <div className="text-2xl font-bold mb-4">{active.outputLabel}</div>
                <div className="text-4xl text-accent font-mono">{getOutput()} {active.unitOut}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-6">
          <p className="text-xl md:text-2xl font-medium text-white">
            A function takes an input and produces an output.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-muted font-mono text-sm">
            <span className="px-4 py-2 bg-card rounded-lg border border-white/5">Input</span>
            <span className="hidden md:block">→</span>
            <span className="px-4 py-2 bg-card rounded-lg border border-white/5">Processing</span>
            <span className="hidden md:block">→</span>
            <span className="px-4 py-2 bg-card rounded-lg border border-white/5">Output</span>
          </div>
        </div>
      </div>
    </section>
  );
}
