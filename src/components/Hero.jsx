import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-ship.jpg')" }}
    >
      {/* Dark Navy Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#00234B]/75"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Global Logistics <br />
          <span className="text-[#FF8C00]">Delivered with Precision</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
          Apex provides end-to-end freight forwarding and supply chain solutions, 
          connecting your business to the world safely and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#quote" className="bg-[#FF8C00] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#E67E00] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF8C00]/30">
            Get a Free Quote
          </a>
          <a href="/tracking" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all duration-300">
            Track Shipment
          </a>
        </div>
      </div>
    </section>
  );
}
