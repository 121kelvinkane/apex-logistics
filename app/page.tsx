import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import Tracking from '../src/components/Tracking';
import Stats from '../src/components/Stats';
import Values from '../src/components/Values';
import Services from '../src/components/Services';
import QuoteForm from '../src/components/QuoteForm';
import Footer from '../src/components/Footer';
import LiveChat from '../src/components/AIChat'; // Use './components/LiveChat' if not in a src folder
export default function Home() {
  return (
    <main className="font-sans text-gray-800 bg-white">
      <Header />
      <Hero />
      <Tracking />
      <Stats />
      <Values />
      <Services />
      <section id="quote" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <QuoteForm />
        </div>
      </section>
      <Footer />
      <LiveChat />
    </main>
  );
}