"use client";
import { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Map to prevent SSR errors
const Map = dynamic(() => import('./Map'), { 
  ssr: false, 
  loading: () => <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center text-gray-500">Loading Map...</div> 
});

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  // The Animation Engine (SLOWED DOWN)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking && progress < 100) {
      // 300ms per 1% = 30 seconds total journey (Much smoother!)
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1; 
          
          // Update Status based on progress
          if (next < 15) setStatus('Departed Origin Facility');
          else if (next < 45) setStatus('In Transit - Ocean/Air');
          else if (next < 75) setStatus('Arrived at Destination Hub');
          else if (next < 99) setStatus('Out for Delivery');
          else setStatus('Delivered!');
          
          return next;
        });
      }, 300); // <--- SLOWED DOWN HERE (was 80)
    }

    return () => clearInterval(interval);
  }, [isTracking, progress]);

  const handleTrack = () => {
    if (!trackingId.trim()) {
      alert('Please enter a tracking number!');
      return;
    }
    // Reset and start
    setProgress(0);
    setStatus('Processing...');
    setIsTracking(true);
  };

  const handleReset = () => {
    setIsTracking(false);
    setProgress(0);
    setStatus('');
    setTrackingId('');
  };

  return (
    <section id="tracking" className="relative -mt-16 z-20 container mx-auto px-6">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 border-t-4 border-[#FF8C00]">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
          {/* Left Side: Input & Status (Restored original layout) */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#00234B] mb-2">Track Your Shipment</h3>
            <p className="text-gray-500 mb-4 text-sm">Enter your tracking number to get real-time updates.</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking number (e.g., APX-88392)" 
                disabled={isTracking}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent disabled:bg-gray-100" 
              />
              {!isTracking ? (
                <button onClick={handleTrack} className="bg-[#00234B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#003366] transition-colors flex items-center justify-center gap-2">
                  <MapPin size={18} /> Track
                </button>
              ) : (
                <button onClick={handleReset} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap">
                  Reset
                </button>
              )}
            </div>

            {/* Live Status Overlay (Appears below the input when tracking) */}
            {isTracking && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Status:</span>
                  <span className={`text-sm font-bold ${progress === 100 ? 'text-green-600' : 'text-[#FF8C00]'}`}>
                    {status}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ease-linear ${progress === 100 ? 'bg-green-500' : 'bg-[#FF8C00]'}`} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>New York, USA</span>
                  <span>{progress}%</span>
                  <span>London, UK</span>
                </div>

                {progress === 100 && (
                  <div className="flex items-center gap-2 text-green-600 font-bold pt-2 border-t border-gray-200 mt-2">
                    <CheckCircle size={16} /> Package Delivered Successfully!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side: The Map (Restored original height and layout) */}
          <div className="md:col-span-2 relative overflow-hidden border border-gray-200 rounded-lg">
            <Map isTracking={isTracking} progress={progress} />
            
            {/* Map Legend */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-[#00234B] shadow flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span> 
              {isTracking ? 'Live Tracking Active' : 'Enter ID to Track'}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}