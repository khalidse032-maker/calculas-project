import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const mapData = [
  {
    id: 'derivative',
    title: 'Derivative',
    children: [
      { id: 'ai', title: 'AI', text: 'Derivatives power backpropagation, allowing neural networks to learn by finding the exact gradient of error.' },
      { id: 'physics', title: 'Physics', text: 'Calculates acceleration from velocity, used in game physics engines to create realistic motion.' },
      { id: 'animation', title: 'Animation', text: 'Smoothes out frame transitions and motion curves for natural-looking character animations.' }
    ]
  },
  {
    id: 'integral',
    title: 'Integral',
    children: [
      { id: 'area', title: 'Area Context', text: 'Calculates screen areas or total resource generation over time in strategy games.' },
      { id: 'distance', title: 'Distance', text: 'Finds total distance traveled by integrating character velocity over a period.' },
      { id: 'simulation', title: 'Simulation', text: 'Simulates fluid dynamics and weather accumulation for realistic environments.' }
    ]
  },
  {
    id: 'optimization',
    title: 'Optimization',
    children: [
      { id: 'ml', title: 'Machine Learning', text: 'Uses gradient descent to optimize weights and biases for the best possible model accuracy.' },
      { id: 'perf', title: 'Performance', text: 'Used in algorithms to minimize computational overhead and memory usage.' },
      { id: 'resource', title: 'Resource Allocation', text: 'Optimizes server loads and network routing for cloud infrastructures.' }
    ]
  },
  {
    id: 'others',
    title: 'Advanced Concepts',
    children: [
      { id: 'limits', title: 'Limits', text: 'Handles boundary conditions and asymptotic behaviors in collision detection.' },
      { id: 'numerical', title: 'Numerical Methods', text: 'Provides approximate solutions to complex math equations when exact solutions are impossible computationally.' },
      { id: 'continuous', title: 'Continuous Systems', text: 'Models continuous audio signals and analog inputs in digital systems.' },
      { id: 'graphics', title: 'Graphics', text: 'Used in ray tracing to calculate light intersections and rendering equations.' }
    ]
  }
];

export default function Section3() {
  const [activeCategory, setActiveCategory] = useState<string | null>('derivative');
  const [activeNode, setActiveNode] = useState<{title: string, text: string} | null>(null);

  const activeData = mapData.find(d => d.id === activeCategory);

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Calculus Inside Software
        </h2>

        <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
          {/* Categories Sidebar */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-muted mb-4 px-4 border-b border-white/10 pb-4">Core Mathematical Tools</h3>
            {mapData.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveNode(null);
                }}
                className={`p-4 text-left rounded-xl flex justify-between items-center transition-all ${
                  activeCategory === category.id
                  ? 'bg-primary/20 border border-primary text-white font-bold'
                  : 'bg-card/40 border border-white/5 text-muted hover:bg-card hover:border-white/20'
                }`}
              >
                {category.title}
                <ChevronRight className={`w-5 h-5 transition-transform ${activeCategory === category.id ? 'text-primary' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          {/* Sub-nodes Map */}
          <div className="md:w-2/3 glass-card p-6 md:p-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="px-4 py-2 bg-card border border-white/10 rounded-lg font-bold text-primary">
                    {activeData?.title}
                  </div>
                  <div className="w-12 h-0.5 bg-white/20" />
                  <div className="flex flex-col gap-4">
                    {activeData?.children.map((child, i) => (
                      <div key={child.id} className="flex flex-row items-center gap-4">
                        {i > 0 && <div className="absolute left-[70px] -ml-px w-0.5 h-16 bg-white/10 -mt-16" />}
                        <button
                          onClick={() => setActiveNode(child)}
                          className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap text-sm md:text-base ${
                            activeNode?.id === child.id 
                            ? 'bg-accent/20 border-accent text-white' 
                            : 'bg-card border-white/10 text-muted hover:border-accent hover:text-white'
                          }`}
                        >
                          {child.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Panel */}
                <div className="mt-auto bg-background/50 p-6 rounded-xl border border-white/5 min-h-[120px]">
                  {activeNode ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h4 className="text-xl font-bold text-white mb-2">{activeNode.title}</h4>
                      <p className="text-muted leading-relaxed">{activeNode.text}</p>
                    </motion.div>
                  ) : (
                    <div className="text-muted flex items-center justify-center h-full italic">
                      Select a node above to reveal how it works in software engineering.
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
