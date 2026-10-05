import { motion } from 'framer-motion';

export default function Part5Connections() {
  const connections = [
    {
       problem: 'Computer Graphics',
       input: 'Pixels',
       output: 'Rendering',
       approach: 'Approximating smooth curves using pixel limits'
    },
    {
       problem: 'Numerical Calculations',
       input: 'Floating Points',
       output: 'Precision',
       approach: 'Approaching real numbers up to hardware memory constraints'
    },
    {
       problem: 'Simulation',
       input: 'Time Steps',
       output: 'Motion State',
       approach: 'Closing the gap between time steps (dt → 0)'
    }
  ];

  return (
    <section className="py-20 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          System Software Connections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {connections.map((conn, i) => (
            <motion.div 
              key={conn.problem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold text-primary mb-6 text-center">{conn.problem}</h3>
              
              <div className="space-y-4 font-mono text-sm flex-1">
                <div className="flex bg-background/50 rounded p-3 border border-white/5">
                  <span className="text-muted w-20">PROBLEM</span>
                  <span className="text-white flex-1">{conn.problem}</span>
                </div>
                <div className="flex justify-center text-muted">↓</div>
                <div className="flex bg-background/50 rounded p-3 border border-white/5">
                  <span className="text-muted w-20">INPUT</span>
                  <span className="text-white flex-1">{conn.input}</span>
                </div>
                <div className="flex justify-center text-muted">↓</div>
                <div className="flex bg-background/50 rounded p-3 border border-white/5">
                  <span className="text-muted w-20">OUTPUT</span>
                  <span className="text-white flex-1">{conn.output}</span>
                </div>
                <div className="flex justify-center text-muted">↓</div>
                <div className="flex bg-accent/20 rounded p-3 border border-accent/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <span className="text-accent w-20">LIMIT</span>
                  <span className="text-accent font-bold flex-1">{conn.approach}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
