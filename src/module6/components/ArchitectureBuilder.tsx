import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Maximize, BrainCircuit, Activity, LineChart, Code2 } from 'lucide-react';
import type { ScreenType } from '../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function ArchitectureBuilder({ onNext }: Props) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [mappings, setMappings] = useState<Record<number, string[]>>({});

  const tools = [
    { id: 'Functions', icon: Code2, color: 'text-gray-300', bg: 'bg-gray-800' },
    { id: 'Limit', icon: Maximize, color: 'text-orange-400', bg: 'bg-orange-900/40' },
    { id: 'Derivative', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-900/40' },
    { id: 'Integral', icon: LineChart, color: 'text-green-400', bg: 'bg-green-900/40' },
    { id: 'Optimization', icon: Settings, color: 'text-yellow-400', bg: 'bg-yellow-900/40' }
  ];

  const systems = [
    { id: 1, name: "Game Movement Engine", required: ["Derivative"] },
    { id: 2, name: "Physics Distance Tracker", required: ["Integral"] },
    { id: 3, name: "AI Learning Module", required: ["Derivative", "Optimization"] },
    { id: 4, name: "Resource Balancer", required: ["Optimization"] },
    { id: 5, name: "Collision Detection (Bounds)", required: ["Limit"] }
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };

  const handleApplyToSystem = (sysId: number) => {
    if (!selectedTool) return;
    
    setMappings(prev => {
      const currentMap = prev[sysId] || [];
      if (currentMap.includes(selectedTool)) return prev; // already added
      return { ...prev, [sysId]: [...currentMap, selectedTool] };
    });
    
    // clear selection after use? Let's keep it to allow rapid assignment
  };

  const handleRemoveMapping = (sysId: number, tool: string) => {
    setMappings(prev => ({
      ...prev,
      [sysId]: prev[sysId].filter(t => t !== tool)
    }));
  };

  const isSystemResolved = (sysId: number) => {
    const required = systems.find(s => s.id === sysId)?.required || [];
    const mapped = mappings[sysId] || [];
    // Are all required tools present in mapped, and no extra tools?
    if (required.length !== mapped.length) return false;
    return required.every(r => mapped.includes(r));
  };
  
  const isSystemFailed = (sysId: number) => {
    const required = systems.find(s => s.id === sysId)?.required || [];
    const mapped = mappings[sysId] || [];
    // if there's any mapped tool that isn't in required, it's a failure (incorrect assignment)
    return mapped.some(m => !required.includes(m));
  };

  const allResolved = systems.every(s => isSystemResolved(s.id));

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-sm font-bold tracking-wider mb-4">
          SYSTEM ARCHITECTURE
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Build the Mathematical Engine
        </h2>
        <p className="text-lg text-muted font-light max-w-3xl mx-auto">
          Select a calculus module from the toolkit, then click a software system to integrate it. Some systems require multiple modules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Toolkit Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4">
           <h3 className="text-sm font-bold text-muted tracking-widest px-2">TOOLKIT</h3>
           {tools.map(tool => (
             <button
               key={tool.id}
               onClick={() => handleToolSelect(tool.id)}
               className={`p-4 rounded-xl border flex items-center gap-4 transition-all overflow-hidden ${
                 selectedTool === tool.id
                   ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-105 z-10'
                   : 'bg-card border-white/10 hover:border-white/30 text-muted'
               }`}
             >
               <div className={`p-2 rounded-lg ${tool.bg} ${tool.color}`}>
                 <tool.icon className="w-5 h-5" />
               </div>
               <span className="font-bold">{tool.id}</span>
             </button>
           ))}

           {/* Central flow hint */}
           <div className="mt-8 bg-black/40 border border-white/5 p-4 rounded-xl text-center hidden lg:block">
              <BrainCircuit className="w-8 h-8 text-indigo-500 mx-auto mb-2 opacity-50" />
              <div className="text-[10px] font-mono text-muted space-y-1">
                 <div>INPUT</div><div>↓</div>
                 <div className="text-white">FUNCTION</div><div>↓</div>
                 <div className="text-indigo-400">CALCULUS</div><div>↓</div>
                 <div>ALGORITHM</div><div>↓</div>
                 <div>OUTPUT</div>
              </div>
           </div>
        </div>

        {/* Dashboard Architecture */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
           {systems.map((sys) => {
             const resolved = isSystemResolved(sys.id);
             const failed = isSystemFailed(sys.id);
             const activeMap = mappings[sys.id] || [];

             return (
               <div
                 key={sys.id}
                 onClick={() => {
                   if (resolved) return; 
                   handleApplyToSystem(sys.id);
                 }}
                 className={`relative p-6 rounded-2xl border transition-all overflow-hidden min-h-[160px] flex flex-col ${
                   resolved 
                     ? 'bg-green-900/10 border-green-500/50 cursor-default' 
                     : failed
                     ? 'bg-red-900/10 border-red-500/50 cursor-pointer pointer-events-auto'
                     : selectedTool 
                     ? 'bg-card border-indigo-500/50 hover:bg-indigo-900/20 cursor-pointer' 
                     : 'bg-card border-white/10 opacity-70'
                 }`}
               >
                 <div className="flex justify-between items-start mb-4 relative z-10">
                   <h4 className={`font-bold text-lg ${resolved ? 'text-green-400' : 'text-white'}`}>
                     {sys.name}
                   </h4>
                   <div className="text-xs text-muted font-mono bg-black/50 px-2 py-1 rounded">SYSTEM {sys.id}</div>
                 </div>

                 <div className="flex-1 flex gap-2 flex-wrap items-center relative z-10">
                   {activeMap.length === 0 && !resolved && (
                      <span className="text-sm text-gray-500 italic">No modules loaded...</span>
                   )}
                   {activeMap.map(t => (
                      <div 
                        key={t} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!resolved) handleRemoveMapping(sys.id, t);
                        }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer
                          ${resolved ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-red-500 hover:text-white'}
                        `}
                      >
                         {t} {resolved ? '' : '×'}
                      </div>
                   ))}
                 </div>

                 {resolved && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent pointer-events-none" 
                   />
                 )}
                 {failed && !resolved && (
                   <div className="absolute bottom-4 right-4 text-xs font-bold text-red-400 bg-red-900/30 px-2 py-1 rounded-full animate-pulse">
                     INCOMPATIBLE MODULE
                   </div>
                 )}
                 {resolved && (
                   <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 )}
               </div>
             )
           })}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
         <AnimatePresence>
           {allResolved && (
             <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => onNext('finalBoss')}
                className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-105 transition-all"
             >
               SYSTEM ONLINE → CONFRONT SOFTWARE ENGINEER CHALLENGE
             </motion.button>
           )}
         </AnimatePresence>
      </div>

    </div>
  );
}
