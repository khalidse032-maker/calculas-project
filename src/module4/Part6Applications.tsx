import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part6Applications() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const applications = [
    {
      domain: "Physics Engines",
      short: "Velocity to Position",
      description: "Every frame, game engines integrate character velocity (v * dt) to determine the exact new position on the screen.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      domain: "Simulations",
      short: "Fluid Dynamics",
      description: "Integrating pressure and flow rates across surfaces allows software to realistically simulate water and airflow.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      domain: "Computer Graphics",
      short: "Ray Tracing",
      description: "Rendering equations use integrals to sum up all light rays bouncing off surfaces and hitting a camera pixel.",
      color: "from-purple-500 to-pink-500"
    },
    {
      domain: "Data Analysis",
      short: "Cumulative Revenue",
      description: "Analytics dashboards integrate daily or hourly transaction rates (like sales/hr) to show total cumulative revenue over time.",
      color: "from-orange-500 to-amber-500"
    },
    {
      domain: "Signal Processing",
      short: "Audio Smoothing",
      description: "Digital audio filters use integration algorithms to smooth out high-frequency noise and accumulate signal energy.",
      color: "from-red-500 to-rose-500"
    },
    {
      domain: "Machine Learning",
      short: "Probability Distributions",
      description: "In AI, integration is used to calculate the total probability of continuous variables falling within specific ranges.",
      color: "from-indigo-500 to-violet-500"
    }
  ];

  return (
    <section className="py-20 px-6 min-h-screen bg-card/20 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Software Applications</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
             How does the concept of summing "infinitely small pieces" translate to lines of code in different engineering domains?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {applications.map((app, i) => (
             <div 
               key={i}
               onClick={() => setActiveCard(activeCard === i ? null : i)}
               className={`relative glass-card p-6 md:p-8 cursor-pointer transition-all duration-300 overflow-hidden group ${
                 activeCard === i ? 'ring-2 ring-white/30 scale-105 shadow-2xl bg-white/10 z-10' : 'hover:bg-white/5 opacity-80 hover:opacity-100'
               }`}
             >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${app.color} transition-opacity ${activeCard === i ? 'opacity-20' : 'group-hover:opacity-20'}`}></div>
                
                <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br ${app.color}`}>
                  {app.domain}
                </h3>
                <div className="text-sm tracking-widest text-white/50 uppercase font-mono mb-4">
                  {app.short}
                </div>

                <AnimatePresence>
                  {activeCard === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-emerald-100/80 leading-relaxed mt-4 border-t border-white/10 pt-4">
                         {app.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute right-4 bottom-4 opacity-30 group-hover:opacity-80 transition-opacity">
                   {activeCard === i ? '−' : '+'}
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
