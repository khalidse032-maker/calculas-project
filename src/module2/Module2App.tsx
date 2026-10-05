import Part1BlackBox from './Part1BlackBox';
import Part2Builder from './Part2Builder';
import Part3Limit from './Part3Limit';
import Part4Zoom from './Part4Zoom';
import Part5Connections from './Part5Connections';
import Part6Challenge from './Part6Challenge';

export default function Module2App() {
  return (
    <div className="w-full">
      <SectionHero />
      <Part1BlackBox />
      <Part2Builder />
      <Part3Limit />
      <Part4Zoom />
      <Part5Connections />
      <Part6Challenge />
    </div>
  );
}

function SectionHero() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
      <div className="text-center max-w-4xl">
        <h2 className="text-sm font-bold tracking-widest text-secondary mb-4 uppercase">Module 02</h2>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Functions & Limits
        </h1>
        <p className="text-xl md:text-2xl text-muted font-light mb-16">
          Understanding what a software system does and how to predict its behavior algebraically.
        </p>
      </div>
    </section>
  );
}
