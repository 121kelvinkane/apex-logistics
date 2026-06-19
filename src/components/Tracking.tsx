"use client";
import { useState, useEffect } from 'react';
import { Search, Loader2, Package, MapPin, Clock, CheckCircle } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsSearching(true);
    setError('');
    try {
      const res = await fetch(`/api/tracking?id=${trackingId}`);
      const data = await res.json();
      if (res.ok) {
        setTrackingData(data);
      } else {
        setError(data.error || 'Tracking ID not found');
      }
    } catch (err) {
      setError('Failed to fetch tracking data');
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-refresh tracking data every 3 seconds to simulate real-time movement
  useEffect(() => {
    if (!trackingData || trackingData.status === 'Delivered') return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/tracking?id=${trackingData.trackingId}`);
        const data = await res.json();
        if (res.ok) setTrackingData(data);
      } catch (err) {}
    }, 3000);
    return () => clearInterval(interval);
  }, [trackingData]);

  return (
    <section id="tracking" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Real-Time Package Tracking</h2>
          <p className="text-gray-400 text-lg">Enter your tracking ID to watch your package move in real-time</p>
          <p className="text-sm text-gray-500 mt-2">Try: APX-88392, APX-12345, or APX-67890</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-700">
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g., APX-88392)" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
            />
            <button type="submit" disabled={isSearching} className="bg-[#FF8C00] hover:bg-[#E67E00] text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
              {isSearching ? <><Loader2 className="animate-spin" size={20}/> Tracking...</> : <><Search size={20} /> Track</>}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </form>

        {trackingData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-blue-400" size={24} />
                  <p className="text-gray-400 text-sm">Status</p>
                </div>
                <p className="font-bold text-lg">{trackingData.status}</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-[#FF8C00]" size={24} />
                  <p className="text-gray-400 text-sm">Route</p>
                </div>
                <p className="font-bold text-sm">{trackingData.origin} → {trackingData.destination}</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-green-400" size={24} />
                  <p className="text-gray-400 text-sm">Progress</p>
                </div>
                <p className="font-bold text-lg">{trackingData.progress}%</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-purple-400" size={24} />
                  <p className="text-gray-400 text-sm">Last Update</p>
                </div>
                <p className="font-bold text-sm">{new Date(trackingData.lastUpdate).toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#FF8C00] to-green-500 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${trackingData.progress}%` }}
                ></div>
              </div>
            </div>
          </>
        )}

        <div className="max-w-6xl mx-auto">
          <InteractiveMap 
            startCoords={trackingData?.originCoords} 
            endCoords={trackingData?.destCoords}
            currentCoords={trackingData?.currentCoords}
          />
        </div>
      </div>
    </section>
  );
}
