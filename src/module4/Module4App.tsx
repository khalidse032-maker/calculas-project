import Part1Area from './Part1Area';
import Part3Distance from './Part3Distance';
import Part4WaterTank from './Part4WaterTank';
import Part5Data from './Part5Data';
import Part6Applications from './Part6Applications';
import Part7Challenge from './Part7Challenge';

export default function Module4App() {
  return (
    <div className="module-container bg-background min-h-screen text-foreground font-sans">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-emerald-900/40 to-background overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-background/0 to-background/0 pointer-events-none"></div>
         <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Integrals
         </h1>
         <p className="text-xl md:text-2xl text-muted text-center max-w-3xl mb-12">
            Understanding Accumulation
         </p>
         
         <div className="px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm">
            <p className="text-lg text-emerald-300 tracking-widest uppercase font-bold text-center">
               An integral helps us find a TOTAL by adding many small pieces.
            </p>
         </div>
      </section>

      <Part1Area />
      <Part3Distance />
      <Part4WaterTank />
      <Part5Data />
      <Part6Applications />
      <Part7Challenge />
      
    </div>
  );
}
