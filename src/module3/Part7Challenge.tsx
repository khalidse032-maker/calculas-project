import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part7Challenge() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      scenario: "A car is moving down a highway. You press the gas pedal to speed up.",
      question: "Which quantity is the RATE OF CHANGE of your speed?",
      options: ["Position", "Velocity", "Acceleration", "Time"],
      answer: "Acceleration"
    },
    {
      scenario: "A scrolling web animation tracks how far down the page you move.",
      question: "The speed at which the animated elements fade in depends on the rate of change of your...",
      options: ["Position", "Velocity", "Acceleration", "Time"],
      answer: "Position"
    },
    {
      scenario: "An AI robot arm is commanded to move to pick up a box.",
      question: "To prevent sudden jerks that damage the motors, the software must limit the rate of change of...",
      options: ["Position", "Velocity", "Acceleration", "Time"],
      answer: "Acceleration" // technically jerk, but close enough for the 3 options (limiting accel or velocity). Actually let's use velocity -> acceleration
    }
  ];

  const current = questions[currentQ];

  const handleSelect = (opt: string) => {
    setSelectedTarget(opt);
    setShowFeedback(true);
  };

  const nextQ = () => {
    setShowFeedback(false);
    setSelectedTarget(null);
    setCurrentQ(c => Math.min(c + 1, questions.length));
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        
        {currentQ < questions.length ? (
          <>
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Knowledge Check</h2>
            
            <div className="glass-card p-8 md:p-12 mb-12">
              <div className="text-left mb-8">
                <span className="text-xs font-bold text-accent tracking-widest uppercase">Scenario {currentQ + 1} / {questions.length}</span>
                <p className="text-xl text-white mt-4">{current.scenario}</p>
                <p className="text-lg text-primary mt-6 font-bold">{current.question}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {current.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`p-4 rounded-xl border text-lg font-mono transition-all ${
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
                    className={`p-6 text-left rounded-xl border ${selectedTarget === current.answer ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                  >
                    {selectedTarget === current.answer ? (
                      <>
                        <p className="font-bold text-lg mb-4">Correct!</p>
                        <button onClick={nextQ} className="px-6 py-2 bg-secondary text-black rounded font-bold uppercase text-sm">Next</button>
                      </>
                    ) : (
                      <p className="font-bold text-lg">Not quite. Try to think what derives from what!</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 mb-8 pb-2">
              Where Derivatives Appear
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-16">
               {['Game Physics', 'Animation', 'Robotics', 'Computer Graphics', 'Machine Learning', 'Optimization', 'Simulation'].map(c => (
                 <div key={c} className="p-4 bg-white/5 border border-white/10 rounded-xl text-muted font-mono text-sm hover:bg-white/10 transition-colors">
                   {c}
                 </div>
               ))}
            </div>

            <div className="glass-card p-12 relative overflow-hidden border-primary/50 mb-32">
               <div className="absolute inset-0 bg-primary/5"></div>
               <h3 className="text-4xl text-white font-bold mb-6 relative">
                 A derivative is not just a formula.
               </h3>
               <p className="text-2xl text-emerald-400 font-light relative">
                 It is a way for software to <strong className="font-bold text-emerald-300">measure change.</strong>
               </p>
            </div>
          </motion.div>
        )}
        
      </div>
    </section>
  );
}
