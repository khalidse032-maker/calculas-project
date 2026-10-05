import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorPlay, Brain, Rotate3d, LineChart } from 'lucide-react';

export default function Section1() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const situations = [
    { id: 1, icon: MonitorPlay, text: "A moving game character" },
    { id: 2, icon: Brain, text: "A machine-learning model learning" },
    { id: 3, icon: Rotate3d, text: "A 3D object rotating" },
    { id: 4, icon: LineChart, text: "A graph showing changing data" }
  ];

  const answers = [
    { id: 'A', text: "They only use programming" },
    { id: 'B', text: "They deal with change, motion, optimization or accumulation" },
    { id: 'C', text: "They only use mathematics" }
  ];

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Why Does a Software Engineer Need Calculus?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {situations.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors"
            >
              <item.icon className="w-12 h-12 text-primary" />
              <p className="font-medium text-text">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">What do these systems have in common?</h3>
          
          <div className="flex flex-col gap-4">
            {answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => setSelectedAnswer(answer.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  selectedAnswer === answer.id 
                    ? answer.id === 'B' 
                      ? 'bg-secondary/20 border-secondary' 
                      : 'bg-red-500/20 border-red-500' 
                    : 'bg-card/50 border-white/10 hover:border-primary/50 hover:bg-card/80'
                }`}
              >
                <span className="font-bold mr-4">{answer.id}.</span> 
                {answer.text}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedAnswer === 'B' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="p-6 bg-secondary/10 border border-secondary/30 rounded-xl"
              >
                <p className="text-lg text-secondary font-medium">
                  Exactly. Calculus gives software engineers mathematical tools for understanding and controlling <span className="font-bold">CHANGE, MOTION, ACCUMULATION</span> and <span className="font-bold">OPTIMIZATION</span>.
                </p>
              </motion.div>
            )}
            
            {selectedAnswer !== null && selectedAnswer !== 'B' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-red-400 mt-4 text-sm"
              >
                Not quite. Look closer at what they are physically doing in the software.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
