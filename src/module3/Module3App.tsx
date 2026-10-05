import Part1Car from './Part1Car';
import Part2TwoCars from './Part2TwoCars';
import Part3Tangent from './Part3Tangent';
import Part4FlatPoint from './Part4FlatPoint';
import Part5Animation from './Part5Animation';
import Part6Physics from './Part6Physics';
import Part7Challenge from './Part7Challenge';

export default function Module3App() {
  return (
    <div className="pt-20 min-h-screen text-white overflow-hidden">
      
      {/* Intro Header */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 drop-shadow-sm">
          Derivatives — Understanding Change
        </h1>
        <p className="text-xl md:text-2xl text-muted font-light mb-8 max-w-3xl">
          A derivative tells us <strong className="text-white">HOW FAST</strong> something is changing.
        </p>
      </section>

      {/* Parts */}
      <Part1Car />
      <Part2TwoCars />
      <Part3Tangent />
      <Part4FlatPoint />
      <Part5Animation />
      <Part6Physics />
      <Part7Challenge />
      
    </div>
  );
}
