import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Eye, MessageSquare, LineChart, Package, Activity } from 'lucide-react';

export default function Part6Pipeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const pipeline = [
    { label: "Prediction", desc: "The model guesses an output based on current parameters." },
    { label: "Calculate Error", desc: "Compare the guess against the actual expected target." },
    { label: "Loss Function", desc: "Aggregate all errors into one single 'score' representing how bad the model is." },
    { label: "Derivative", desc: "Calculate the slope of the loss function with respect to the parameters." },
    { label: "Gradient", desc: "Collect all the derivatives pointing toward the steepest ascent." },
    { label: "Parameter Update", desc: "Move parameters in the OPPOSITE direction of the gradient." },
    { label: "Better Prediction", desc: "The cycle repeats, resulting in progressively lower error." }
  ];

  const domains = [
    { icon: Eye, name: "Computer Vision", color: "from-blue-500 to-cyan-500" },
    { icon: Package, name: "Recommendation", color: "from-orange-500 to-amber-500" },
    { icon: MessageSquare, name: "Chatbots", color: "from-emerald-500 to-teal-500" },
    { icon: LineChart, name: "Prediction Systems", color: "from-purple-500 to-pink-500" },
    { icon: Cpu, name: "Autonomous Driving", color: "from-rose-500 to-red-500" },
    { icon: Activity, name: "Data Science", color: "from-indigo-500 to-violet-500" }
  ];

  return (
    <section className="py-20 px-6 min-h-screen bg-card/10 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 mb-6">
            The Calculus-AI Pipeline
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Under the hood, all neural networks use this exact mathematical loop thousands of times a second to "learn".
          </p>
        </div>

        {/* Pipeline Visual */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-32 relative">
           
           <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/5 -z-10 -translate-y-1/2"></div>

           {pipeline.map((step, idx) => (
             <div 
               key={idx} 
               onClick={() => setActiveStep(activeStep === idx ? null : idx)}
               className={`relative cursor-pointer transition-all duration-300 w-full md:w-32 flex flex-col items-center group ${
                 activeStep === idx ? 'scale-110' : 'hover:scale-105'
               }`}
             >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xl border transition-colors ${
                  activeStep === idx ? 'bg-orange-500 border-orange-400 text-black' : 'bg-background border-white/20 text-white group-hover:border-orange-500/50'
                }`}>
                  {idx + 1}
                </div>
                
                <div className={`mt-4 text-center text-sm font-bold uppercase tracking-widest ${activeStep === idx ? 'text-orange-400' : 'text-muted'}`}>
                  {step.label}
                </div>

                <AnimatePresence>
                  {activeStep === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-28 md:top-32 w-48 bg-card border border-orange-500/30 p-4 rounded-xl shadow-2xl z-20 text-sm text-center text-orange-100 backdrop-blur-md"
                    >
                       {step.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
        </div>

        {/* Real World Connection */}
        <div className="border-t border-white/5 pt-20">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 mb-6">
                Optimization In The Real World
             </h2>
             <p className="text-xl text-muted max-w-2xl mx-auto">
                Gradient descent scales mathematically. The exact same operation is used to optimize billions of parameters in modern architectures.
             </p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {domains.map((domain, i) => {
                const Icon = domain.icon;
                return (
                  <div key={i} className="glass-card p-6 flex flex-col items-center justify-center gap-4 text-center group hover:bg-white/5 transition-all cursor-crosshair">
                     <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${domain.color} p-[1px]`}>
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center opacity-90 group-hover:opacity-60 transition-opacity">
                           <Icon className="w-8 h-8 text-white" />
                        </div>
                     </div>
                     <span className="font-bold tracking-widest uppercase text-sm text-muted group-hover:text-white transition-colors">
                       {domain.name}
                     </span>
                  </div>
                );
              })}
           </div>
        </div>

      </div>
    </section>
  );
}
