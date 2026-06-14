export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00234B]/95 via-[#00234B]/80 to-[#00234B]/40"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left pt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          YOUR CARGO. <br /><span className="text-[#FF8C00]">OUR PROMISE.</span> DELIVERED.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Seamless, secure, and reliable global freight forwarding solutions tailored to keep your supply chain moving without interruption.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#quote" className="bg-[#FF8C00] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#E67E00] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF8C00]/30 text-center">GET A QUICK QUOTE</a>
          <a href="#tracking" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-[#00234B] transition-all duration-300 text-center">TRACK SHIPMENT</a>
        </div>
      </div>
    </section>
  );
}