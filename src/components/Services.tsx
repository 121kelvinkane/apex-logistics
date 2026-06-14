import { Plane, Ship, Truck } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: <Plane size={40} />, title: "Air Freight", desc: "Expedited global shipping for time-sensitive cargo with priority handling.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" },
    { icon: <Ship size={40} />, title: "Sea Freight", desc: "Cost-effective FCL and LCL ocean shipping solutions for large-volume trade.", img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800" },
    { icon: <Truck size={40} />, title: "Land Freight", desc: "Reliable road and rail transportation networks ensuring seamless last-mile delivery.", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" }
  ];
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00234B] mb-4">Our Freight Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive transportation services tailored to your cargo's unique requirements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#00234B]/20 group-hover:bg-[#00234B]/0 transition-colors z-10"></div>
                <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 z-20 bg-[#FF8C00] text-white p-3 rounded-full shadow-lg">{service.icon}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#00234B] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <a href="#" className="inline-flex items-center text-[#FF8C00] font-bold hover:text-[#00234B] transition-colors">View Details <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}