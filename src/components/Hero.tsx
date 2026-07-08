import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative min-h-[600px] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-ship.jpg')" }}
    >
      {/* Lighter overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-left text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Global Logistics <br />
            <span className="text-[#FF8C00]">Delivered with Precision</span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-8">
            Apex provides end-to-end freight forwarding and supply chain solutions, 
            connecting your business to the world safely and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#quote" className="bg-[#FF8C00] text-white px-8 py-3 rounded-md font-bold text-base md:text-lg hover:bg-[#E67E00] transition-all duration-300 shadow-lg shadow-[#FF8C00]/30">
              Get a Free Quote
            </a>
            <a href="/tracking" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-md font-bold text-base md:text-lg hover:bg-white/30 transition-all duration-300">
              Track Shipment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
