import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import Stats from '../src/components/Stats';
import Values from '../src/components/Values';
import Services from '../src/components/Services';
import Testimonials from '../src/components/Testimonials';
import QuoteForm from '../src/components/QuoteForm';
import Footer from '../src/components/Footer';
import AIChat from '../src/components/AIChat';

export default function Home() {
  return (
    <main className="font-sans text-gray-800 bg-white">
      <Header />
      <Hero />
      <Stats />
      <Values />
      <Services />
      <Testimonials />
      
      {/* NEW TRACKING CTA BANNER */}
      <section className="py-20 bg-[#00234B] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Track Your Shipment in Real-Time</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            Use our advanced satellite tracking system to see exactly where your cargo is, anywhere in the world.
          </p>
          <a href="/tracking" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FF8C00] text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-[#E67E00] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF8C00]/30">
            Open Tracking Portal
          </a>
        </div>
      </section>

      <section id="quote" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <QuoteForm />
        </div>
      </section>
      <Footer />
      <AIChat />
    </main>
  );
}
