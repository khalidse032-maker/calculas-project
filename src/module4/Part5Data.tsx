import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Part5Data() {
  const [dataIndex, setDataIndex] = useState(0);
  
  // Data stream
  const data = [10, 12, 8, 15, 20, 5, 25];
  const currentTotal = data.slice(0, dataIndex).reduce((acc, val) => acc + val, 0);
  const isComplete = dataIndex === data.length;

  const handleNext = () => {
    if (dataIndex < data.length) {
      setDataIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setDataIndex(0);
  };

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full">
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
          Discrete Data Accumulation
        </h2>
        
        <p className="text-xl text-muted text-center max-w-2xl mx-auto mb-16">
          In software, integration often just looks like adding up values in an array. 
          When we track analytics, costs, or usage, we are effectively integrating discrete data!
        </p>

        <div className="glass-card p-12">
           <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Stack Viewer */}
              <div className="flex-1 flex flex-col justify-end min-h-[300px] border-b-4 border-emerald-500/50 pb-4 relative">
                 <div className="absolute right-0 top-0 text-sm font-mono text-muted uppercase tracking-widest">
                    Accumulated Stack
                 </div>
                 
                 <div className="flex flex-col-reverse gap-[2px] items-center w-full">
                   <AnimatePresence>
                     {data.slice(0, dataIndex).map((val, idx) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: -20, scale: 0.8 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         className="w-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center font-mono text-emerald-300 font-bold"
                         style={{ height: `${val * 3}px` }}
                       >
                         +{val}
                       </motion.div>
                     ))}
                   </AnimatePresence>
                 </div>
              </div>

              {/* Data Flow & Totals */}
              <div className="w-64 flex flex-col gap-6">
                 
                 <div className="bg-background border border-white/5 p-6 rounded-xl text-center shadow-lg">
                    <div className="text-xs uppercase tracking-widest text-muted mb-2">Incoming Data</div>
                    <div className="text-4xl font-mono text-white min-h-[40px]">
                      {dataIndex < data.length ? data[dataIndex] : "---"}
                    </div>
                 </div>

                 <button 
                   onClick={isComplete ? handleReset : handleNext}
                   className={`py-3 w-full font-bold uppercase tracking-widest text-sm rounded transition-all shadow-lg ${isComplete ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950'}`}
                 >
                   {isComplete ? 'Reset Stream' : 'Accumulate'}
                 </button>

                 <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center mt-auto shadow-lg">
                    <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Total Accumulated</div>
                    <div className="text-5xl font-mono text-emerald-300 font-bold">
                       {currentTotal}
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Total Usage', 'Total Distance', 'Total Energy', 'Total Cost', 'Total Quantity'].map(label => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-xs text-muted/70 font-mono">
                   {label}
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
