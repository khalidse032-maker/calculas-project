import { useState } from 'react';
import Module1App from './module1/Module1App';
import Module2App from './module2/Module2App';
import Module3App from './module3/Module3App';
import Module4App from './module4/Module4App';
import Module5App from './module5/Module5App';
import Module6App from './module6/Module6App';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeModule, setActiveModule] = useState<'module1' | 'module2' | 'module3' | 'module4' | 'module5' | 'module6'>('module6');

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-primary/30 selection:text-primary">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">CALCULUS LAB</h1>
              <p className="text-xs text-muted">Discover How Calculus Powers Software</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 md:space-x-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {([
              { id: 'module1', label: 'Module 1: Intro' },
              { id: 'module2', label: 'Module 2: Functions' },
              { id: 'module3', label: 'Module 3: Derivatives' },
              { id: 'module4', label: 'Module 4: Integrals' },
              { id: 'module5', label: 'Module 5: Optimization' },
              { id: 'module6', label: 'Module 6: SE Mission' },
            ] as const).map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeModule === mod.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {activeModule === 'module1' && (
            <motion.div key="mod1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module1App />
            </motion.div>
          )}
          {activeModule === 'module2' && (
            <motion.div key="mod2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module2App />
            </motion.div>
          )}
          {activeModule === 'module3' && (
            <motion.div key="mod3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module3App />
            </motion.div>
          )}
          {activeModule === 'module4' && (
            <motion.div key="mod4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module4App />
            </motion.div>
          )}
          {activeModule === 'module5' && (
            <motion.div key="mod5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module5App />
            </motion.div>
          )}
          {activeModule === 'module6' && (
            <motion.div key="mod6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Module6App />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="bg-card py-12 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted">
          <p>© 2026 Calculus Lab. Interactive Educational Software.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
