import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part7Challenge() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const curves = [
    { name: "Curve A", id: 0, path: "M 0 100 Q 25 20 50 100 T 100 0 L 100 100 Z", value: 38 },
    { name: "Curve B", id: 1, path: "M 0 100 L 50 20 L 100 100 Z", value: 40 },
    { name: "Curve C", id: 2, path: "M 0 100 Q 50 -50 100 100 Z", value: 66 } // The actual largest area obviously
  ];

  const handleSelect = (id: number) => {
    setSelected(id);
    setRevealed(true);
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        
        {/* Challenge Section */}
        <div className="glass-card p-12 text-center mb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none"></div>
          
          <h2 className="text-4xl font-bold text-emerald-400 mb-6">Integral Challenge</h2>
          <p className="text-xl text-white mb-12">
            Visually estimate which curve has the largest area underneath it (the largest integral).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {curves.map(curve => (
                <div 
                  key={curve.id} 
                  onClick={() => !revealed && handleSelect(curve.id)}
                  className={`flex flex-col items-center p-6 border rounded-xl transition-all cursor-pointer ${
                    selected === curve.id 
                    ? (curve.id === 2 ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-red-500/20 border-red-500')
                    : 'bg-background hover:bg-white/5 border-white/10'
                  }`}
                >
                   <span className="text-sm uppercase tracking-widest text-muted mb-4 font-bold">{curve.name}</span>
                   
                   <div className="w-full aspect-square bg-white/5 mb-6 relative overflow-hidden flex items-end">
                      <svg viewBox="0 0 100 100" className="w-[100%] h-[100%] overflow-visible" preserveAspectRatio="none">
                         <path d={curve.path} fill="rgba(45,212,191,0.2)" stroke="rgba(45,212,191,0.8)" strokeWidth="2" />
                      </svg>
                   </div>

                   <AnimatePresence>
                     {revealed && (
                       <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-2xl font-mono text-white">
                          ∫ = <span className={curve.id === 2 ? "text-emerald-400 font-bold" : ""}>{curve.value}</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
          </div>

          <AnimatePresence>
             {revealed && (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                  {selected === 2 ? (
                    <p className="text-xl font-bold text-emerald-400">Correct! Curve C accumulates the most total area.</p>
                  ) : (
                    <p className="text-xl font-bold text-red-400">Ah, tricky! Curve C actually accumulates the most area.</p>
                  )}
               </motion.div>
             )}
          </AnimatePresence>
        </div>

        {/* Final Wrap-up Section */}
        <div className="text-center pt-20 border-t border-white/5">
           <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
             The Two Pillars of Calculus
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              
              <div className="glass-card p-12 bg-blue-900/10 border-blue-500/20 group hover:border-blue-500/50 transition-all">
                 <h3 className="text-4xl text-blue-400 font-bold mb-4">Derivative</h3>
                 <div className="h-1 w-16 bg-blue-500/50 mx-auto mb-6"></div>
                 <p className="text-2xl font-light text-white mb-6">Rate of Change</p>
                 <p className="text-muted leading-relaxed">
                   "If I have a position map, how fast am I currently moving?"
                 </p>
                 <div className="mt-8 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity font-serif italic text-4xl">
                   f'(x)
                 </div>
              </div>

              <div className="glass-card p-12 bg-emerald-900/10 border-emerald-500/20 group hover:border-emerald-500/50 transition-all">
                 <h3 className="text-4xl text-emerald-400 font-bold mb-4">Integral</h3>
                 <div className="h-1 w-16 bg-emerald-500/50 mx-auto mb-6"></div>
                 <p className="text-2xl font-light text-white mb-6">Accumulated Total</p>
                 <p className="text-muted leading-relaxed">
                   "If I have a velocity map, how far have I totally traveled?"
                 </p>
                 <div className="mt-8 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity font-serif text-4xl">
                   ∫ f(x) dx
                 </div>
              </div>

           </div>

           <p className="text-xl text-muted mt-20 max-w-2xl mx-auto">
             Whether you are building graphic renderers, training neural networks, or coding game physics—these two concepts are the silent engine powering modern software.
           </p>
        </div>

      </div>
    </section>
  );
}
