import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import Mission1 from './components/missions/Mission1';
import Mission2 from './components/missions/Mission2';
import Mission3 from './components/missions/Mission3';
import Mission4 from './components/missions/Mission4';
import Mission5 from './components/missions/Mission5';
import DecisionCenter from './components/DecisionCenter';
import ArchitectureBuilder from './components/ArchitectureBuilder';
import FinalBoss from './components/FinalBoss';
import FinalVisual from './components/FinalVisual';

export type ScreenType = 
  | 'landing' 
  | 'mission1' 
  | 'mission2' 
  | 'mission3' 
  | 'mission4' 
  | 'mission5' 
  | 'decisionCenter' 
  | 'architectureBuilder' 
  | 'finalBoss' 
  | 'scoreScreen' 
  | 'finalVisual';

export default function Module6App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('landing');
  const [score, setScore] = useState(0);

  const handleNext = (nextScreen: ScreenType) => {
    setActiveScreen(nextScreen);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 min-h-[calc(100vh-100px)] flex flex-col relative">
      <AnimatePresence mode="wait">
        {activeScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            <LandingScreen onStart={() => handleNext('mission1')} />
          </motion.div>
        )}
        {/* Placeholder for missions */}
        {activeScreen === 'mission1' && (
           <motion.div
           key="mission1"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <Mission1 onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'mission2' && (
           <motion.div
           key="mission2"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <Mission2 onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'mission3' && (
           <motion.div
           key="mission3"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <Mission3 onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'mission4' && (
           <motion.div
           key="mission4"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <Mission4 onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'mission5' && (
           <motion.div
           key="mission5"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <Mission5 onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'decisionCenter' && (
           <motion.div
           key="decisionCenter"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <DecisionCenter onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'architectureBuilder' && (
           <motion.div
           key="architectureBuilder"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <ArchitectureBuilder onNext={handleNext} />
         </motion.div>
        )}
        {activeScreen === 'finalBoss' && (
           <motion.div
           key="finalBoss"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <FinalBoss onNext={handleNext} setScore={setScore} />
         </motion.div>
        )}
        {activeScreen === 'finalVisual' && (
           <motion.div
           key="finalVisual"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
           className="flex-1 flex flex-col"
         >
           <FinalVisual onNext={handleNext} score={score} />
         </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
