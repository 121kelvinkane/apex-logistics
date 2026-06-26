import { Star, Building2 } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00234B] mb-4">Trusted by Industry Leaders</h2>
          <div className="w-20 h-1 bg-[#FF8C00] mx-auto mb-8"></div>
          
          {/* Client Logos (Using text/icons for reliability, replace with real SVG logos later) */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Global Tech Corp', 'Oceanic Trade Ltd', 'FastTrack Retail', 'EuroManufacturing'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-xl font-bold text-gray-400">
                <Building2 size={28} /> {company}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", role: "Supply Chain Director, Global Tech", text: "Apex Logistics transformed our supply chain. Their real-time tracking and proactive communication are unmatched in the industry." },
            { name: "David Chen", role: "Operations Manager, Oceanic Trade", text: "We've reduced our shipping delays by 40% since partnering with Apex. Their customs brokerage team is incredibly efficient." },
            { name: "Elena Rodriguez", role: "CEO, FastTrack Retail", text: "Reliable, transparent, and truly global. The dedicated account manager makes us feel like their only client." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex text-[#FF8C00] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-[#00234B]">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}