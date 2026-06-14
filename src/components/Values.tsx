import { Clock, CheckCircle, Globe, Shield } from 'lucide-react';

export default function Values() {
  const values = [
    { icon: <Clock size={32} />, title: "Reliability", desc: "On-time delivery guaranteed through optimized routing and proactive monitoring." },
    { icon: <CheckCircle size={32} />, title: "Transparency", desc: "Real-time tracking and clear, upfront pricing with no hidden fees." },
    { icon: <Globe size={32} />, title: "Global Reach", desc: "An extensive network of partners ensuring seamless cross-border operations." },
    { icon: <Shield size={32} />, title: "Security", desc: "End-to-end cargo protection with advanced compliance and safety protocols." }
  ];
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00234B] mb-4">Why Choose Apex Logistics?</h2>
          <div className="w-20 h-1 bg-[#FF8C00] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-[#FF8C00] mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-[#00234B] mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}