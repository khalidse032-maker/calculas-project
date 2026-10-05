import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function Part4Zoom() {
  const [zoomLevel, setZoomLevel] = useState(0);

  // Zoom levels: 1x, 10x, 100x, 1000x, 10000x
  const zooms = [1, 10, 100, 1000, 10000];
  const currentZoom = zooms[zoomLevel];
  
  // The curve is abstract. As we zoom in, the curvature flattens, approaching a straight line.
  return (
    <section className="py-20 px-6 min-h-screen bg-card/20 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Infinite Zoom
        </h2>

        <div className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/20 px-3 py-1 text-primary rounded-full font-mono text-sm border border-primary/50">
            <Search className="w-4 h-4" /> {currentZoom}x Zoom
          </div>

          <div className="relative w-full h-80 bg-background/50 rounded-xl overflow-hidden mb-8 flex items-center justify-center border border-white/5">
            {/* The abstract world graph */}
            <motion.div 
              animate={{ scale: currentZoom }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="w-full h-full flex items-center justify-center absolute origin-center"
            >
              <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] overflow-visible">
                <g stroke="#ffffff03" strokeWidth={0.5 / currentZoom}>
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(l => (
                    <line key={`v${l}`} x1={l} y1="0" x2={l} y2="100" />
                  ))}
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(l => (
                    <line key={`h${l}`} x1="0" y1={l} x2="100" y2={l} />
                  ))}
                </g>
                <path d="M 0,100 Q 50,50 100,0" fill="none" stroke="#8B5CF6" strokeWidth={1 / currentZoom} />
                <circle cx="50" cy="50" r={2 / currentZoom} fill="#F59E0B" />
              </svg>
            </motion.div>
            
            {/* Overlay Grid simulating the microscope lens */}
            <div className="absolute inset-0 border-[4px] border-black/50 rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }} />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 pointer-events-none" />
          </div>

          <div className="text-left w-full">
            <span className="text-sm font-bold tracking-widest text-muted uppercase">Zoom Control</span>
            <input 
              type="range" min="0" max="4" step="1"
              value={zoomLevel} onChange={(e) => setZoomLevel(Number(e.target.value))}
              className="w-full accent-accent my-4" 
            />
            <div className="flex justify-between text-xs text-muted font-mono mb-8">
               {zooms.map((z, i) => <span key={i} className={zoomLevel >= i ? 'text-white' : ''}>{z}x</span>)}
            </div>

            {zoomLevel >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-6 bg-accent/20 border border-accent/40 rounded-xl">
                <p className="text-lg text-accent">
                  Even though we never actually reach the infinitesimally small exact coordinate mathematically, we can study what the function is heavily approaching on a micro-scale.
                </p>
                <p className="text-sm text-muted mt-2">
                  At 10,000x zoom, the curve essentially looks like a straight, manageable line.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
