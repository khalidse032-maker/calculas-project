import Part1Hill from './Part1Hill';
import Part3Gradient from './Part3Gradient';
import Part5ML from './Part5ML';
import Part6Pipeline from './Part6Pipeline';
import Part8Challenge from './Part8Challenge';

export default function Module5App() {
  return (
    <div className="module-container bg-background min-h-screen text-foreground font-sans">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-rose-900/40 to-background overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/10 via-background/0 to-background/0 pointer-events-none"></div>
         <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
            Optimization Lab
         </h1>
         <p className="text-xl md:text-2xl text-muted text-center max-w-3xl mb-12">
            How Calculus Helps Machines Learn
         </p>
      </section>

      <Part1Hill />
      <Part3Gradient />
      <Part5ML />
      <Part6Pipeline />
      <Part8Challenge />
      
    </div>
  );
}
