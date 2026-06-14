"use client";
import { MapPin, Package } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Map to prevent SSR errors
const Map = dynamic(() => import('./Map'), { ssr: false, loading: () => <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center text-gray-500">Loading Map...</div> });

export default function Tracking() {
  return (
    <section id="tracking" className="relative -mt-16 z-20 container mx-auto px-6">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 border-t-4 border-[#FF8C00]">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#00234B] mb-2">Track Your Shipment</h3>
            <p className="text-gray-500 mb-4 text-sm">Enter your tracking number to get real-time updates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="e.g., APX-88392" className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent" />
              <button className="bg-[#00234B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#003366] transition-colors flex items-center justify-center gap-2">
                <MapPin size={18} /> Track
              </button>
            </div>
          </div>
          <div className="md:col-span-2 relative overflow-hidden border border-gray-200 rounded-lg">
            <Map />
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#00234B] shadow flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Tracking Active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}