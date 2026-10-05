import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part6Challenge() {
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'engineer'>('beginner');
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  type Challenge = {
    graph: string;
    question: string;
    options: number[];
    answer: number;
    hole?: {x: number, y: number};
  };

  const challenges: Record<'beginner' | 'intermediate' | 'engineer', Challenge> = {
    beginner: {
      graph: "M 0 80 Q 50 80 80 50 T 100 20",
      question: "What value does the blue line approach as x goes right?",
      options: [0, 20, 50, 100],
      answer: 20
    },
    intermediate: {
      graph: "M 0 100 Q 50 100 50 90 T 70 50 T 100 10",
      hole: {x: 70, y: 50},
      question: "There's a hole at x=70. What does the function approach there?",
      options: [0, 10, 50, 90],
      answer: 50
    },
    engineer: {
      graph: "M 0 10 Q 30 90 50 50 T 80 40 T 100 40",
      question: "What value is the system asymptoting towards in the long term?",
      options: [10, 40, 50, 90],
      answer: 40
    }
  };

  const current = challenges[difficulty];

  const handleSelect = (val: number) => {
    setSelectedTarget(val);
    setShowFeedback(true);
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center relative overflow-hidden">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">
          Challenge: Read the System
        </h2>

        {/* Difficulty Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {(['beginner', 'intermediate', 'engineer'] as const).map(d => (
            <button
              key={d}
              onClick={() => { setDifficulty(d); setSelectedTarget(null); setShowFeedback(false); }}
              className={`px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm transition-all border ${
                difficulty === d ? 'bg-primary/20 border-primary text-white' : 'bg-transparent border-white/20 text-muted hover:border-white/50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 mb-16">
          <h3 className="text-xl font-medium mb-8 text-white">{current.question}</h3>

          <div className="relative w-full h-64 bg-background/50 rounded-xl overflow-hidden mb-8 border border-white/5">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Guides */}
              <g stroke="#ffffff0a" strokeWidth="0.5">
                {[20, 40, 50, 80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} />)}
              </g>
              {/* Plot */}
              <motion.path 
                 key={difficulty}
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 d={current.graph} fill="none" stroke="#3B82F6" strokeWidth="1.5" 
              />
              {current.hole && (
                <circle cx={current.hole.x} cy={current.hole.y} r="2" fill="#0B0F19" stroke="#EF4444" strokeWidth="1" />
              )}
            </svg>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {current.options.map(opt => (
              <button
                 key={opt}
                 onClick={() => handleSelect(opt)}
                 className={`p-4 rounded-xl border text-xl font-mono transition-all ${
                   selectedTarget === opt 
                   ? (opt === current.answer ? 'bg-secondary/20 border-secondary text-secondary' : 'bg-red-500/20 border-red-500 text-red-500')
                   : 'bg-card border-white/10 hover:border-white/30 text-white'
                 }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                className={`p-6 rounded-xl border ${selectedTarget === current.answer ? 'bg-secondary/10 border-secondary/30' : 'bg-red-500/10 border-red-500/30'}`}
              >
                {selectedTarget === current.answer ? (
                  <p className="text-secondary font-bold text-lg">Correct! The system's output converges to {current.answer}.</p>
                ) : (
                  <p className="text-red-400 font-bold text-lg">Not quite. Look at the general trend or explicit hole in the graph.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
           <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
             Engineering with Mathematics
           </h4>
           <div className="text-lg text-primary space-y-4">
             <p><span className="text-white font-bold">Functions</span> help software describe relationships.</p>
             <p><span className="text-white font-bold">Limits</span> help software understand behavior as values approach a point.</p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
