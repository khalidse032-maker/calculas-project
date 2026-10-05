import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import type { ScreenType } from '../../Module6App';

interface Props {
  onNext: (s: ScreenType) => void;
}

export default function Mission2({ onNext }: Props) {
  // Data for simple linear regression y = w*x
  const trueWeight = 2;
  const dataPoints = [
    { x: 1, y: 2.1 },
    { x: 2, y: 3.8 },
    { x: 3, y: 6.2 },
    { x: 4, y: 7.9 },
    { x: 5, y: 10.3 },
  ];

  const [weight, setWeight] = useState(0.5);
  const [learningRate, setLearningRate] = useState(0.05); // 0.01 to 0.15
  
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [lossHistory, setLossHistory] = useState<{iter: number, loss: number, w: number}[]>([]);

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const calculateLoss = (w: number) => {
    let totalError = 0;
    for (const pt of dataPoints) {
      const prediction = w * pt.x;
      const error = prediction - pt.y;
      totalError += error * error;
    }
    return totalError / dataPoints.length;
  };

  const calculateGradient = (w: number) => {
    let grad = 0;
    for (const pt of dataPoints) {
      const prediction = w * pt.x;
      const error = prediction - pt.y;
      grad += 2 * error * pt.x; // derivative of (w*x - y)^2 w.r.t w
    }
    return grad / dataPoints.length;
  };

  useEffect(() => {
    if (iteration === 0 && lossHistory.length === 0) {
      setLossHistory([{ iter: 0, loss: calculateLoss(weight), w: weight }]);
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isTraining && iteration < 30) {
      timer = setTimeout(() => {
        // Gradient descent step
        setWeight(prevW => {
          const grad = calculateGradient(prevW);
          const newW = prevW - (learningRate * grad);
          
          setLossHistory(prev => {
             const newHistory = [...prev, { iter: iteration + 1, loss: calculateLoss(newW), w: newW }];
             return newHistory.slice(-6); // Keep last 6 for display
          });
          
          return newW;
        });
        setIteration(i => i + 1);
      }, 200); // speed of simulation
    } else if (iteration >= 30) {
      setIsTraining(false);
    }
    return () => clearTimeout(timer);
  }, [isTraining, iteration, learningRate]);

  const handleTrainToggle = () => {
    if (!isTraining && iteration >= 30) {
       handleReset();
    }
    setIsTraining(!isTraining);
  };

  const handleReset = () => {
    setIsTraining(false);
    setIteration(0);
    setWeight(0.5);
    setLossHistory([{ iter: 0, loss: calculateLoss(0.5), w: 0.5 }]);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'A') {
      setShowExplanation(true);
    }
  };

  const getLearningRateStatus = () => {
    if (learningRate < 0.02) return { text: 'Too Small (Slow)', color: 'text-yellow-400' };
    if (learningRate > 0.09) return { text: 'Too Large (Unstable)', color: 'text-red-400' };
    return { text: 'Good (Stable)', color: 'text-green-400' };
  };

  const status = getLearningRateStatus();

  return (
    <div className="flex-1 flex flex-col pt-10 px-4 max-w-6xl w-full mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold tracking-wider mb-2">
            MISSION 2
          </div>
          <h2 className="text-3xl font-bold text-white">AI TRAINING</h2>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8 shadow-lg max-w-3xl">
        <p className="text-lg text-muted mb-4 font-light">
          "You are training a machine-learning model. The model is making predictions but the error is high. Help it learn."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* ML Simulation View */}
        <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative min-h-[400px] flex flex-col p-6">
           <h3 className="text-sm font-bold text-muted mb-4 tracking-widest text-center">DATASET & MODEL (Linear Regression)</h3>
           
           <div className="flex-1 relative border-l border-b border-white/20 ml-8 mb-8 mt-4">
              {/* Grid lines */}
              {[1,2,3,4,5].map(i => (
                <div key={`y-${i}`} className="absolute top-0 w-full h-[1px] bg-white/5" style={{ top: `${100 - (i*20)}%` }}></div>
              ))}
              {[1,2,3,4,5].map(i => (
                <div key={`x-${i}`} className="absolute top-0 h-full w-[1px] bg-white/5" style={{ left: `${i*16.6}%` }}></div>
              ))}

              {/* Data points */}
              {dataPoints.map((pt, i) => {
                 const xPercent = (pt.x / 6) * 100;
                 const yPercent = 100 - ((pt.y / 12) * 100);
                 const predYPercent = 100 - (((weight * pt.x) / 12) * 100);
                 return (
                   <React.Fragment key={i}>
                      {/* Error line */}
                      <motion.div 
                        className="absolute w-[2px] bg-red-500/50"
                        style={{ left: `${xPercent}%` }}
                        initial={false}
                        animate={{ top: `${Math.min(yPercent, predYPercent)}%`, height: `${Math.abs(yPercent - predYPercent)}%` }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Point */}
                      <div 
                        className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] z-10"
                        style={{ left: `calc(${xPercent}% - 6px)`, top: `calc(${yPercent}% - 6px)` }}
                      />
                   </React.Fragment>
                 )
              })}

              {/* Model Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                 <motion.line
                    x1="0" y1="100%"
                    x2="100%" y2={`${100 - (((weight * 6) / 12) * 100)}%`}
                    stroke="rgba(167, 139, 250, 0.8)"
                    strokeWidth="4"
                    strokeDasharray="10 5"
                    initial={false}
                    animate={{ y2: `${100 - (((weight * 6) / 12) * 100)}%` }}
                    transition={{ duration: 0.2 }}
                 />
              </svg>

              <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted font-bold tracking-wider">PREDICTION</div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted font-bold tracking-wider">INPUT (X)</div>
           </div>
        </div>

        {/* Controls Panels */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-card border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <code className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">TRAINING</code> CONTROLS
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Learning Rate (α)</span>
                  <span className={`font-mono font-bold ${status.color}`}>{learningRate.toFixed(3)}</span>
                </div>
                <input 
                  type="range" min="0.005" max="0.15" step="0.005" 
                  value={learningRate} 
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  disabled={isTraining}
                  className="w-full accent-purple-500 mb-1"
                />
                <div className={`text-xs ${status.color} font-mono text-right`}>{status.text}</div>
              </div>

              <div className="bg-black/30 rounded-xl p-4 border border-white/5 font-mono text-xs">
                 <div className="text-muted mb-2 font-sans font-bold text-sm tracking-wider">LOSS HISTORY</div>
                 {lossHistory.map((h, i) => (
                   <div key={i} className="flex justify-between mb-1 opacity-80">
                     <span className="text-gray-400">Iter {h.iter}</span>
                     <span className="text-blue-300">W: {h.w.toFixed(2)}</span>
                     <span className="text-red-400 font-bold">L: {h.loss.toFixed(2)}</span>
                   </div>
                 ))}
                 {lossHistory.length === 0 && <div className="text-center text-muted py-2">No data</div>}
              </div>

            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleTrainToggle}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                {isTraining ? 'PAUSE' : iteration >= 30 ? 'RESTART' : 'TRAIN MODEL'}
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
        className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
          How can the model know which direction should reduce the error?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'A', label: 'Derivative / Gradient' },
            { id: 'B', label: 'Integral' },
            { id: 'C', label: 'Random guessing' },
            { id: 'D', label: 'Limit only' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswerSelect(opt.id)}
              disabled={showExplanation}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                selectedAnswer === opt.id 
                  ? (opt.id === 'A' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400')
                  : 'bg-black/20 border-white/10 hover:border-white/30 text-muted hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${
                 selectedAnswer === opt.id 
                 ? (opt.id === 'A' ? 'bg-green-500/30' : 'bg-red-500/30')
                 : 'bg-white/5'
              }`}>
                {opt.id}
              </div>
              <span className="font-semibold text-left leading-tight">{opt.label}</span>
              {selectedAnswer === opt.id && opt.id === 'A' && <CheckCircle className="ml-auto w-5 h-5 text-green-400 flex-shrink-0" />}
              {selectedAnswer === opt.id && opt.id !== 'A' && <XCircle className="ml-auto w-5 h-5 text-red-400 flex-shrink-0" />}
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
                <h4 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6" /> SUCCESS - LEARNING OPTIMIZED
                </h4>
                
                <p className="text-lg text-white mb-6 leading-relaxed">
                  The derivative tells us <strong className="text-purple-400">how the loss changes</strong> based on our parameters.<br/><br/>
                  <span className="bg-purple-500/20 px-2 py-1 rounded text-purple-300 font-bold">Gradient Descent</span> uses this derivative information to move step-by-step toward a better solution (minimum error).
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                   <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30">
                      <h5 className="font-bold text-yellow-400 mb-2">Too Small Rate</h5>
                      <p className="text-sm text-muted">Steps are tiny. It will take forever to reach the bottom of the error curve.</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-xl border border-green-500/30">
                      <h5 className="font-bold text-green-400 mb-2">Good Rate</h5>
                      <p className="text-sm text-muted">Stable, consistent descent directly into the minimum error.</p>
                   </div>
                   <div className="bg-black/40 p-4 rounded-xl border border-red-500/30">
                      <h5 className="font-bold text-red-400 mb-2">Too Large Rate</h5>
                      <p className="text-sm text-muted">Steps are huge! The model bounces wildly and overshoots the target.</p>
                   </div>
                </div>

                <div className="flex justify-end">
                  <button 
                     onClick={() => onNext('mission3')}
                     className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    CONTINUE TO MISSION 3
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
