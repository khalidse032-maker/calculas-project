import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Part6Physics() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 min-h-screen bg-card/20 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
         <h2 className="text-3xl md:text-5xl font-bold mb-8">
            The Engine of Game Physics
         </h2>
         
         <p className="text-xl text-muted mb-16 max-w-2xl mx-auto">
           A game engine doesn't just "move" characters. It constantly calculates derivatives to turn controller inputs into realistic motion.
         </p>

         <div className="glass-card p-8 md:p-12 mb-12">
           <div className="flex flex-col items-center gap-4 relative">
             
             {/* Physics Chain */}
             <div className={`w-full max-w-md p-6 rounded-xl border transition-all ${activeStep === 0 ? 'bg-primary/20 border-primary text-white scale-105' : 'bg-background border-white/5 text-muted'}`}>
                <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">Position</h3>
                <p className="font-mono text-sm">Where the character is (x, y)</p>
             </div>

             <div className="h-12 border-l-2 border-dashed border-white/20 flex items-center justify-center relative">
               <motion.span 
                 animate={{ opacity: [0.5, 1, 0.5] }} 
                 transition={{ repeat: Infinity, duration: 1.5 }}
                 className="absolute bg-card px-4 py-1 text-xs text-secondary font-bold tracking-widest rounded-full border border-secondary/30"
               >
                 ↓ rate of change (derivative) ↓
               </motion.span>
             </div>

             <div className={`w-full max-w-md p-6 rounded-xl border transition-all ${activeStep === 1 ? 'bg-emerald-500/20 border-emerald-500 text-white scale-105' : 'bg-background border-white/5 text-muted'}`}>
                <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">Velocity</h3>
                <p className="font-mono text-sm">How fast position is changing</p>
             </div>

             <div className="h-12 border-l-2 border-dashed border-white/20 flex items-center justify-center relative">
               <motion.span 
                 animate={{ opacity: [0.5, 1, 0.5] }} 
                 transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                 className="absolute bg-card px-4 py-1 text-xs text-accent font-bold tracking-widest rounded-full border border-accent/30"
               >
                 ↓ rate of change (derivative) ↓
               </motion.span>
             </div>

             <div className={`w-full max-w-md p-6 rounded-xl border transition-all ${activeStep === 2 ? 'bg-purple-500/20 border-purple-500 text-white scale-105' : 'bg-background border-white/5 text-muted'}`}>
                <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">Acceleration</h3>
                <p className="font-mono text-sm">How fast velocity is changing (Gravity, Jumping)</p>
             </div>

           </div>
           
           <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-xl text-left">
             <h4 className="text-lg text-primary font-bold mb-2">The Derivative Connects Everything</h4>
             <p className="text-muted leading-relaxed">
               When you press "Jump", the engine doesn't change your position directly. It gives you <strong>Acceleration</strong> (gravity pulling down) and an initial upward <strong>Velocity</strong>. The physics engine uses derivatives to constantly update those values every single frame, resulting in a smooth arc!
             </p>
           </div>
         </div>

      </div>
    </section>
  );
}
