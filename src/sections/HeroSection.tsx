import { motion } from 'framer-motion';

const Node = ({ label, delay }: { label: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="px-6 py-3 rounded-full bg-card border border-white/10 shadow-lg text-sm sm:text-base font-semibold"
  >
    {label}
  </motion.div>
);

const ConnectionLine = ({ height = "h-8", delay }: { height?: string, delay: number }) => (
  <motion.div 
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`w-0.5 ${height} bg-gradient-to-b from-primary to-accent origin-top`}
  />
);

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Don’t Just Learn Calculus.<br/>
          <span className="text-primary hover:text-accent transition-colors duration-500">Experience It.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted font-light mb-16">
          Discover how derivatives, integrals, limits and optimization become real tools inside software engineering.
        </p>
      </motion.div>

      {/* Interactive Visual Tree */}
      <div className="flex flex-col items-center mt-8 w-full max-w-3xl">
        <Node label="CALCULUS" delay={0.2} />
        <ConnectionLine delay={0.5} />
        
        <div className="flex justify-center gap-4 sm:gap-12 w-full">
          <Node label="CHANGE" delay={0.8} />
          <Node label="ACCUMULATION" delay={1.0} />
          <Node label="OPTIMIZATION" delay={1.2} />
        </div>
        
        <ConnectionLine delay={1.5} />
        <Node label="SOFTWARE ENGINEERING" delay={1.8} />
        <ConnectionLine delay={2.1} />
        
        <div className="flex flex-wrap justify-center gap-4 mt-2 max-w-4xl">
           <Node label="AI / MACHINE LEARNING" delay={2.4} />
           <Node label="GAME PHYSICS" delay={2.5} />
           <Node label="GRAPHICS" delay={2.6} />
           <Node label="ROBOTICS" delay={2.7} />
           <Node label="SIMULATION" delay={2.8} />
           <Node label="DATA ANALYSIS" delay={2.9} />
        </div>
      </div>
    </section>
  );
}
