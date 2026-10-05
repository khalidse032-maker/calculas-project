import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { ScreenType } from '../../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function Mission3({ onNext }: Props) {
  // Robot Arm configuration
  const L1 = 120; // Length of link 1
  const L2 = 100; // Length of link 2
  
  const [angle1, setAngle1] = useState(45); // degrees
  const [angle2, setAngle2] = useState(-45); // degrees
  
  // Target Configuration
  const [target, setTarget] = useState({ x: 150, y: 100 });

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  // Convert angles to radians for calculation
  const a1 = (angle1 * Math.PI) / 180;
  const a2 = (angle2 * Math.PI) / 180;

  // Forward Kinematics (calculate position based on angles)
  const joint1 = { x: 0, y: 0 }; // Base
  const joint2 = {
    x: L1 * Math.cos(a1),
    y: L1 * Math.sin(a1)
  };
  const endEffector = {
    x: joint2.x + L2 * Math.cos(a1 + a2),
    y: joint2.y + L2 * Math.sin(a1 + a2)
  };

  const distanceToTarget = Math.sqrt(
    Math.pow(endEffector.x - target.x, 2) + Math.pow(endEffector.y - target.y, 2)
  );
  const isAtTarget = distanceToTarget < 15;

  const handleAnswerToggle = (id: string) => {
    setSelectedAnswers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmitQuiz = () => {
    setShowExplanation(true);
  };

  // SVGs are drawn with origin at center-ish.
  const canvasCenter = { x: 250, y: 250 };

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-bold tracking-wider mb-2">
            MISSION 3
          </div>
          <h2 className="text-3xl font-bold text-white">ROBOT MOVEMENT</h2>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8 shadow-lg max-w-3xl">
        <p className="text-lg text-muted mb-4 font-light">
          "You are programming a robot arm. Use the controls to move the robot's hand to the glowing target point."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Robot Simulation View */}
        <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative min-h-[400px] flex items-center justify-center p-6">
           <svg className="w-full max-w-[500px] h-[500px] overflow-visible" viewBox="0 0 500 500">
             <defs>
               <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                 <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)"></stop>
                 <stop offset="100%" stopColor="rgba(34, 197, 94, 0)"></stop>
               </radialGradient>
             </defs>
             
             {/* Target */}
             <circle cx={canvasCenter.x + target.x} cy={canvasCenter.y - target.y} r="20" fill="url(#targetGlow)" className="animate-pulse" />
             <circle cx={canvasCenter.x + target.x} cy={canvasCenter.y - target.y} r="5" fill="#22c55e" />

             {/* Links */}
             <line 
               x1={canvasCenter.x + joint1.x} y1={canvasCenter.y - joint1.y} 
               x2={canvasCenter.x + joint2.x} y2={canvasCenter.y - joint2.y} 
               stroke="#f97316" strokeWidth="16" strokeLinecap="round"
               className="transition-all duration-300 ease-out"
             />
             <line 
               x1={canvasCenter.x + joint2.x} y1={canvasCenter.y - joint2.y} 
               x2={canvasCenter.x + endEffector.x} y2={canvasCenter.y - endEffector.y} 
               stroke="#fdba74" strokeWidth="12" strokeLinecap="round"
               className="transition-all duration-300 ease-out"
             />
             
             {/* Joints */}
             <circle cx={canvasCenter.x + joint1.x} cy={canvasCenter.y - joint1.y} r="12" fill="#fff" />
             <circle cx={canvasCenter.x + joint2.x} cy={canvasCenter.y - joint2.y} r="10" fill="#fff" className="transition-all duration-300 ease-out" />
             <circle cx={canvasCenter.x + endEffector.x} cy={canvasCenter.y - endEffector.y} r="8" fill={isAtTarget ? "#22c55e" : "#ef4444"} className="transition-all duration-300 ease-out" />

             {/* Base block */}
             <rect x={canvasCenter.x - 30} y={canvasCenter.y} width="60" height="40" fill="#333" rx="10" />
           </svg>

           {isAtTarget && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="absolute top-8 left-1/2 -translate-x-1/2 bg-green-500/20 text-green-400 px-6 py-2 rounded-full border border-green-500/50 font-bold flex items-center gap-2"
             >
               <CheckCircle className="w-5 h-5" />
               TARGET REACHED
             </motion.div>
           )}
        </div>

        {/* Controls Panels */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-card border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <code className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ROBOT KINEMATICS</code>
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Joint 1 Angle (θ1)</span>
                  <span className="font-mono text-orange-400">{angle1}°</span>
                </div>
                <input 
                  type="range" min="0" max="180" step="1" 
                  value={angle1} 
                  onChange={(e) => setAngle1(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Joint 2 Angle (θ2)</span>
                  <span className="font-mono text-orange-300">{angle2}°</span>
                </div>
                <input 
                  type="range" min="-150" max="150" step="1" 
                  value={angle2} 
                  onChange={(e) => setAngle2(Number(e.target.value))}
                  className="w-full accent-orange-300"
                />
              </div>
            </div>

            <div className="mt-8 bg-black/30 rounded-xl p-4 border border-white/5 font-mono text-xs hidden md:block">
               <div className="text-muted mb-2 font-sans font-bold text-sm tracking-wider">TELEMETRY</div>
               <div className="flex justify-between mb-1">
                 <span className="text-gray-400">Target X,Y</span>
                 <span className="text-white">{target.x}, {target.y}</span>
               </div>
               <div className="flex justify-between mb-1">
                 <span className="text-gray-400">Current X,Y</span>
                 <span className={isAtTarget ? 'text-green-400' : 'text-orange-400'}>{Math.round(endEffector.x)}, {Math.round(endEffector.y)}</span>
               </div>
               <div className="flex justify-between mb-1">
                 <span className="text-gray-400">Distance</span>
                 <span className="text-white">{distanceToTarget.toFixed(1)} mm</span>
               </div>
            </div>
            
            <button
               onClick={() => {
                 setTarget({ x: Math.round(Math.random() * 200 - 50), y: Math.round(Math.random() * 150 + 50) });
               }}
               className="w-full mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
            >
              RANDOMIZE TARGET
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Question Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/20 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
          What mathematical ideas help describe continuous movement and changing position?
        </h3>
        <p className="text-muted mb-6">Select all that apply, then submit:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'Functions' },
            { id: 'Derivatives' },
            { id: 'Geometry' },
            { id: 'Limits' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswerToggle(opt.id)}
              disabled={showExplanation}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                selectedAnswers.includes(opt.id)
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 font-bold'
                  : 'bg-black/20 border-white/10 text-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`w-6 h-6 rounded border flex items-center justify-center bg-black/50 ${selectedAnswers.includes(opt.id) ? 'border-orange-500' : 'border-gray-600'}`}>
                {selectedAnswers.includes(opt.id) && <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>}
              </div>
              <span>{opt.id}</span>
            </button>
          ))}
        </div>

        {!showExplanation ? (
          <div className="flex justify-start">
            <button 
               onClick={handleSubmitQuiz}
               disabled={selectedAnswers.length === 0}
               className={`px-8 py-3 font-bold rounded-xl transition-colors ${selectedAnswers.length > 0 ? 'bg-orange-500 text-white hover:bg-orange-400' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
            >
              ANALYZE CHOICES
            </button>
          </div>
        ) : null}

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 relative">
                <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  SOFTWARE SYSTEMS COMBINE MATHEMATICS
                </h4>
                
                <p className="text-lg text-muted mb-8 leading-relaxed">
                  In software engineering, you rarely use just one concept. You build a pipeline:
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 w-full">
                  <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center flex-1 w-full">
                     <span className="block text-xl font-bold text-blue-400">Functions</span>
                     <span className="text-sm text-muted">Describe relationship between joint angles.</span>
                  </div>
                  <div className="hidden md:block text-muted">→</div>
                  <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center flex-1 w-full">
                     <span className="block text-xl font-bold text-green-400">Geometry</span>
                     <span className="text-sm text-muted">Determine exact (x,y) position in space.</span>
                  </div>
                  <div className="hidden md:block text-muted">→</div>
                  <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center flex-1 w-full">
                     <span className="block text-xl font-bold text-orange-400">Derivatives</span>
                     <span className="text-sm text-muted">Allow continuous, smooth movement paths.</span>
                  </div>
                  <div className="hidden md:block text-muted">→</div>
                  <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-center flex-1 w-full">
                     <span className="block text-xl font-bold text-purple-400">Limits</span>
                     <span className="text-sm text-muted">Define boundary behavior (collisions).</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                     onClick={() => onNext('mission4')}
                     className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    CONTINUE TO MISSION 4
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
