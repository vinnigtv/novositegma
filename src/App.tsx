import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { Attractions } from './components/sections/Attractions';
import { TrainExperience } from './components/sections/TrainExperience';
import { Newsletter } from './components/sections/Newsletter';
import { Footer } from './components/layout/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Highlights />
        <Attractions />
        <TrainExperience />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
