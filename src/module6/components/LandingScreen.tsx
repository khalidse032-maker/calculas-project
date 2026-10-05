import { motion } from 'framer-motion';
import { Terminal, Database, Code, Cpu, Calculator, Binary } from 'lucide-react';
import React from 'react';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  const flowSteps = [
    { label: 'PROBLEM', Icon: Terminal, color: 'text-red-400', borderColor: 'border-red-400/30', bg: 'bg-red-400/10' },
    { label: 'MATHEMATICAL MODEL', Icon: Calculator, color: 'text-orange-400', borderColor: 'border-orange-400/30', bg: 'bg-orange-400/10' },
    { label: 'CALCULUS', Icon: Binary, color: 'text-yellow-400', borderColor: 'border-yellow-400/30', bg: 'bg-yellow-400/10' },
    { label: 'ALGORITHM', Icon: Code, color: 'text-green-400', borderColor: 'border-green-400/30', bg: 'bg-green-400/10' },
    { label: 'SOFTWARE', Icon: Database, color: 'text-blue-400', borderColor: 'border-blue-400/30', bg: 'bg-blue-400/10' },
    { label: 'RESULT', Icon: Cpu, color: 'text-purple-400', borderColor: 'border-purple-400/30', bg: 'bg-purple-400/10' }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full flex flex-col items-center"
      >
        <div className="mb-2 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider">
          MODULE 6
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          CALCULUS MISSION
        </h1>
        
        <p className="text-xl md:text-3xl font-light text-muted mb-16">
          Can you solve real software problems using calculus?
        </p>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-20 relative">
          {/* Animated background line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10" />
          <motion.div 
            className="hidden md:block absolute top-1/2 left-[10%] h-[2px] bg-gradient-to-r from-red-500 via-green-500 to-purple-500 -z-10" 
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />

          {flowSteps.map((step, index) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.3 }}
                className="flex flex-col items-center relative group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border ${step.borderColor} ${step.bg} flex items-center justify-center mb-4 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                  <step.Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.color}`} />
                </div>
                <div className="text-xs md:text-sm font-bold tracking-wider text-muted group-hover:text-text transition-colors max-w-[100px] text-center">
                  {step.label}
                </div>
              </motion.div>
              
              {/* Optional Arrow for mobile view */}
              {index < flowSteps.length - 1 && (
                <div className="md:w-12 h-6 md:h-0 flex items-center justify-center opacity-30 md:opacity-0 mx-2">
                  <div className="w-[1px] h-full md:w-full md:h-[1px] bg-white" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 rounded-2xl bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-xl md:text-2xl tracking-widest shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] transition-all duration-300 flex items-center gap-3 overflow-hidden group relative"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out skew-x-12" />
          START MISSION
          <Terminal className="w-6 h-6 animate-pulse" />
        </motion.button>
      </motion.div>
    </div>
  );
}
