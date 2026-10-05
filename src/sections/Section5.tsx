import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Section5() {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  const options = [
    { id: 'derivative', label: 'Derivative', desc: 'Predicting how fast the player moves and how AI gradients change.' },
    { id: 'integral', label: 'Integral', desc: 'Accumulating total damage or distance over time.' },
    { id: 'optimization', label: 'Optimization', desc: 'Finding the most performant rendering paths.' },
    { id: 'functions', label: 'Functions', desc: 'Modeling the entire state of the game world.' },
    { id: 'limits', label: 'Limits', desc: 'Handling precise collision boundaries smoothly.' },
  ];

  const handleSelect = (id: string) => {
    if (isRevealed) return;
    if (selectedAnswers.includes(id)) {
      setSelectedAnswers(selectedAnswers.filter(a => a !== id));
    } else {
      setSelectedAnswers([...selectedAnswers, id]);
    }
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-primary/5 -z-10" />
      
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-sm font-bold tracking-widest text-primary mb-4">FINAL SCENARIO</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold mb-8">You Are the Engineer.</h3>
        
        <div className="glass-card p-8 md:p-12 mb-12 text-left">
          <p className="text-xl text-text font-medium mb-6">
            You are building an intelligent game engine.
          </p>
          <ul className="text-muted text-lg space-y-4 mb-8 font-light list-disc pl-6">
            <li>The player is moving.</li>
            <li>The AI is learning.</li>
            <li>The camera is rotating.</li>
            <li>The game needs the best possible performance.</li>
          </ul>
          
          <h4 className="text-xl font-bold mb-6 text-white">Where could calculus help here?</h4>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-semibold ${
                  selectedAnswers.includes(opt.id) 
                  ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'bg-card/50 border-white/20 text-muted hover:border-white/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          {!isRevealed && selectedAnswers.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsRevealed(true)}
              className="interactive-button bg-white text-background w-full md:w-auto"
            >
              Confirm and Reveal Connections
            </motion.button>
          )}

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {options.map((opt, i) => (
                    <motion.div 
                      key={opt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-lg bg-card/50 border ${selectedAnswers.includes(opt.id) ? 'border-primary/50' : 'border-white/5 opacity-50'}`}
                    >
                      <h5 className="font-bold text-white flex items-center gap-2">
                        {selectedAnswers.includes(opt.id) && <span className="text-primary text-lg">✓</span>}
                        {opt.label}
                      </h5>
                      <p className="text-sm text-muted mt-1">{opt.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-primary/10 border border-primary/30 p-6 rounded-xl text-center"
                >
                  <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Calculus is not just a university subject.
                  </p>
                  <p className="text-lg text-primary mt-2">
                    It is a mathematical tool that helps software model, predict, optimize and control real systems.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
