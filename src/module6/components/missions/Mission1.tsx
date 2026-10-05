import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import type { ScreenType } from '../../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function Mission1({ onNext }: Props) {
  const [jumpPower, setJumpPower] = useState(15);
  const [horizontalSpeed, setHorizontalSpeed] = useState(5);
  const [gravity, setGravity] = useState(-9.8);
  
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Game state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp = performance.now();

    const updatePhysics = (timestamp: number) => {
      if (!isPlaying) return;
      
      const deltaTime = (timestamp - lastTimestamp) / 1000; // seconds
      lastTimestamp = timestamp;

      setTime((prevTime) => {
        const t = prevTime + deltaTime;
        
        // Equations of motion
        // x = vx * t
        // y = vy0 * t + 0.5 * g * t^2
        // vx = const, vy = vy0 + g * t
        
        // If we hit ground (y <= 0) after jump started
        if (t > 0.1) {
          const currentY = jumpPower * t + 0.5 * gravity * t * t;
          if (currentY <= 0) {
            setIsPlaying(false);
            return prevTime; // Stop time
          }
        }
        
        setPosition({
          x: horizontalSpeed * t,
          y: jumpPower * t + 0.5 * gravity * t * t
        });
        
        setVelocity({
          x: horizontalSpeed,
          y: jumpPower + gravity * t
        });

        return t;
      });
      
      animationFrame = requestAnimationFrame(updatePhysics);
    };

    if (isPlaying) {
      lastTimestamp = performance.now();
      animationFrame = requestAnimationFrame(updatePhysics);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, jumpPower, horizontalSpeed, gravity]);

  const handlePlayPause = () => {
    if (!isPlaying && time > 0 && position.y <= 0) {
      // Reset if finished
      setTime(0);
      setPosition({ x: 0, y: 0 });
      setVelocity({ x: 0, y: 0 });
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setPosition({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'B') {
      setShowExplanation(true);
    }
  };

  // Canvas scaling
  const scaleX = 20; // 1 unit in physics = 20px
  const scaleY = 15;
  
  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold tracking-wider mb-2">
            MISSION 1
          </div>
          <h2 className="text-3xl font-bold text-white">GAME PHYSICS</h2>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8 shadow-lg max-w-3xl">
        <p className="text-lg text-muted mb-4 font-light">
          "You are developing a 2D game. A character needs to jump and land at a target location."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Game Simulation View */}
        <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative min-h-[400px] flex flex-col">
          {/* Dashboard overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
             <div className="flex gap-4">
                <div className="bg-background/80 backdrop-blur p-3 rounded-xl border border-white/10 flex gap-4 text-xs font-mono">
                  <div>
                    <div className="text-muted mb-1">POSITION</div>
                    <div className="text-blue-400">x: {position.x.toFixed(1)}</div>
                    <div className="text-blue-400">y: {Math.max(0, position.y).toFixed(1)}</div>
                  </div>
                  <div className="w-[1px] bg-white/10"></div>
                  <div>
                    <div className="text-muted mb-1">VELOCITY</div>
                    <div className="text-green-400">vx: {velocity.x.toFixed(1)}</div>
                    <div className="text-green-400">vy: {(time === 0 ? jumpPower : velocity.y).toFixed(1)}</div>
                  </div>
                  <div className="w-[1px] bg-white/10"></div>
                  <div>
                    <div className="text-muted mb-1">ACCELERATION</div>
                    <div className="text-red-400">ax: 0.0</div>
                    <div className="text-red-400">ay: {gravity.toFixed(1)}</div>
                  </div>
                </div>
             </div>
             
             <div className="bg-background/80 backdrop-blur p-3 rounded-xl border border-white/10 font-mono text-center min-w-[100px]">
                <div className="text-muted text-xs mb-1">TIME</div>
                <div className="text-xl font-bold text-white">{time.toFixed(2)}s</div>
             </div>
          </div>
          
          {/* The Scene */}
          <div className="flex-1 relative w-full h-[400px]">
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-[2px] bg-white/20"></div>
            {/* Target Area */}
            <div className="absolute bottom-0 left-[60%] w-[15%] h-2 bg-green-500/50 blur-sm rounded-t-lg"></div>
            <div className="absolute bottom-0 left-[60%] w-[15%] h-1 bg-green-400"></div>

            {/* Character */}
            <motion.div 
              className="absolute bottom-0 w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
              style={{
                left: `${Math.min(95, 10 + (position.x * 2))}%`,
                bottom: `${Math.max(0, position.y * scaleY)}px`, 
                transform: 'translateX(-50%)' 
              }}
            />
            
            {/* Trajectory preview (approximate physics arc) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
               {(() => {
                 let pts = [];
                 for(let t = 0; t <= 5; t+=0.1) {
                   const x = 10 + (horizontalSpeed * t * 2);
                   const y = 400 - (jumpPower * t + 0.5 * gravity * t * t) * scaleY;
                   if (y > 400 && t > 0.1) break;
                   pts.push(`${x}% ${y}px`);
                 }
                 // Simple path simulation if we wanted... this is just for visual flair
               })()}
            </svg>
          </div>
        </div>

        {/* Controls Panels */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-card border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <code className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">ENGINE</code> PARAMETERS
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Jump Power (Initial Vy)</span>
                  <span className="font-mono text-blue-400">{jumpPower}</span>
                </div>
                <input 
                  type="range" min="5" max="25" step="1" 
                  value={jumpPower} 
                  onChange={(e) => setJumpPower(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Horizontal Speed (Vx)</span>
                  <span className="font-mono text-green-400">{horizontalSpeed}</span>
                </div>
                <input 
                  type="range" min="0" max="15" step="1" 
                  value={horizontalSpeed} 
                  onChange={(e) => setHorizontalSpeed(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full accent-green-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Gravity (ay)</span>
                  <span className="font-mono text-red-400">{gravity}</span>
                </div>
                <input 
                  type="range" min="-20" max="-1" step="0.5" 
                  value={gravity} 
                  onChange={(e) => setGravity(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full accent-red-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePlayPause}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                {isPlaying ? 'PAUSE' : time > 0 ? 'RESUME' : 'TEST SCENE'}
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Question Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
          What mathematical concept helps describe how position changes?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'A', label: 'Integral' },
            { id: 'B', label: 'Derivative' },
            { id: 'C', label: 'Limit' },
            { id: 'D', label: 'Random Number' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswerSelect(opt.id)}
              disabled={showExplanation}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                selectedAnswer === opt.id 
                  ? (opt.id === 'B' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400')
                  : 'bg-black/20 border-white/10 hover:border-white/30 text-muted hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                 selectedAnswer === opt.id 
                 ? (opt.id === 'B' ? 'bg-green-500/30' : 'bg-red-500/30')
                 : 'bg-white/5'
              }`}>
                {opt.id}
              </div>
              <span className="font-semibold">{opt.label}</span>
              {selectedAnswer === opt.id && opt.id === 'B' && <CheckCircle className="ml-auto w-5 h-5 text-green-400" />}
              {selectedAnswer === opt.id && opt.id !== 'B' && <XCircle className="ml-auto w-5 h-5 text-red-400" />}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden"
            >
              <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="text-9xl font-serif">!</span>
                </div>
                <h4 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6" /> SUCCESS - SYSTEM UNDERSTOOD
                </h4>
                
                <p className="text-lg text-white mb-6 max-w-3xl leading-relaxed">
                  The derivative describes the <span className="text-blue-400 font-bold bg-blue-500/10 px-2 rounded">rate of change</span>.<br/><br/>
                  In our game engine system:<br/>
                  <span className="text-muted">Where am I?</span> → Position (<span className="font-mono text-sm">s</span>)<br/>
                  <span className="text-blue-300">How fast is my position changing?</span> → Velocity (<span className="font-mono text-sm">v = ds/dt</span>)<br/>
                  <span className="text-red-300">How fast is my velocity changing?</span> → Acceleration (<span className="font-mono text-sm">a = dv/dt</span>)
                </p>
                
                <div className="flex items-center gap-4 text-xs font-mono text-muted bg-black/40 p-4 rounded-xl max-w-fit mb-8">
                   <div className="text-center">POSITION<br/>(meters)</div>
                   <div className="h-[1px] w-8 bg-white/20 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-white/20"></div></div>
                   <div className="text-center font-bold text-blue-400">DERIVATIVE<br/>(rate of change)</div>
                   <div className="h-[1px] w-8 bg-white/20 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-white/20"></div></div>
                   <div className="text-center">VELOCITY<br/>(m/s)</div>
                   <div className="h-[1px] w-8 bg-white/20 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-white/20"></div></div>
                   <div className="text-center font-bold text-red-400">DERIVATIVE<br/>(rate of change)</div>
                   <div className="h-[1px] w-8 bg-white/20 relative"><div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-transparent border-l-white/20"></div></div>
                   <div className="text-center">ACCELERATION<br/>(gravity)</div>
                </div>

                <div className="flex justify-end">
                  <button 
                     onClick={() => onNext('mission2')}
                     className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    CONTINUE TO MISSION 2
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
