"use client";
import { useState, useEffect, useRef } from 'react';
import { MapPin, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import toast from 'react-hot-toast';

const Map = dynamic(() => import('../../src/components/Map'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-slate-100 rounded-lg flex items-center justify-center text-gray-500">Loading Satellite Map...</div> 
});

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

async function geocodeCity(cityName: string): Promise<[number, number] | null> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }
  return null;
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [shipmentOrigin, setShipmentOrigin] = useState('');
  const [shipmentDestination, setShipmentDestination] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [originCoords, setOriginCoords] = useState<[number, number]>([0, 0]);
  const [destCoords, setDestCoords] = useState<[number, number]>([0, 0]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(800);
  const [bearing, setBearing] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // NEW: State to trigger map recentering
  const [recenterKey, setRecenterKey] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const step = 50 / animationDuration;
          const next = Math.min(prev + step, 100); 
          
          const intProgress = Math.floor(next);
          if (intProgress < 15) setStatus('Departed Origin Facility');
          else if (intProgress < 45) setStatus('In Transit - Ocean/Air');
          else if (intProgress < 75) setStatus('Arrived at Destination Hub');
          else if (intProgress < 99) setStatus('Out for Delivery');
          else setStatus('Delivered!');
          
          const secondsLeft = ((100 - next) * animationDuration) / 1000;
          if (secondsLeft > 3600) {
            const hours = Math.floor(secondsLeft / 3600);
            const mins = Math.floor((secondsLeft % 3600) / 60);
            setTimeRemaining(`${hours}h ${mins}m`);
          } else if (secondsLeft > 60) {
            const mins = Math.floor(secondsLeft / 60);
            const secs = Math.floor(secondsLeft % 60);
            setTimeRemaining(`${mins}m ${secs}s`);
          } else {
            setTimeRemaining(`${Math.floor(secondsLeft)}s`);
          }
          
          return next;
        });
      }, 50);
    } else if (progress >= 100) {
      setTimeRemaining('Arrived!');
    }
    return () => clearInterval(interval);
  }, [isTracking, progress, animationDuration]);

  const handleTrack = async () => {
    if (!trackingId.trim()) { 
      toast.error('Please enter a tracking number!');
      return; 
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId }),
      });

      if (response.status === 404) {
        toast.error('Tracking ID not found. Please check your documents.');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setShipmentOrigin(data.origin);
      setShipmentDestination(data.destination);
      
      const [originCoordsResult, destCoordsResult] = await Promise.all([
        geocodeCity(data.origin),
        geocodeCity(data.destination)
      ]);
      
      if (!originCoordsResult || !destCoordsResult) {
        toast.error('Could not find coordinates for the cities.');
        setIsLoading(false);
        return;
      }
      
      setOriginCoords(originCoordsResult);
      setDestCoords(destCoordsResult);
      
      const distance = calculateDistance(originCoordsResult[0], originCoordsResult[1], destCoordsResult[0], destCoordsResult[1]);
      setTotalDistance(distance);
      
      const baseDuration = 800;
      const baseDistance = 1000;
      const calculatedDuration = Math.max(200, Math.min(2000, (distance / baseDistance) * baseDuration));
      setAnimationDuration(calculatedDuration);
      
      const routeBearing = calculateBearing(originCoordsResult[0], originCoordsResult[1], destCoordsResult[0], destCoordsResult[1]);
      setBearing(routeBearing);
      
      setProgress(0);
      setStatus('Processing...');
      setIsTracking(true);
      toast.success('Shipment located! Tracking started.');
      
      setTimeout(() => {
        mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsTracking(false); setProgress(0); setStatus(''); setTrackingId('');
    setShipmentOrigin(''); setShipmentDestination(''); setTimeRemaining('');
    setOriginCoords([0, 0]); setDestCoords([0, 0]);
    setTotalDistance(0); setAnimationDuration(800); setBearing(0);
    setRecenterKey(0);
  };

  return (
    <main className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="pt-24 pb-8 container mx-auto px-6">
        <a href="/" className="inline-flex items-center gap-2 text-[#00234B] hover:text-[#FF8C00] font-semibold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </a>
        <h1 className="text-3xl md:text-4xl font-bold text-[#00234B] mb-2">Global Shipment Tracking</h1>
        <p className="text-gray-500 mb-8">Enter your tracking number to view real-time satellite location and status.</p>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Enter any tracking ID from database" disabled={isTracking || isLoading} className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent disabled:bg-gray-100" />
            {!isTracking ? (
              <button onClick={handleTrack} disabled={isLoading} className="bg-[#00234B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003366] transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50">
                {isLoading ? 'Locating...' : <><MapPin size={18} /> Track Parcel</>}
              </button>
            ) : (
              <button onClick={handleReset} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap">Track Another</button>
            )}
          </div>

          {isTracking && (
            <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Current Status:</span>
                <span className={`text-sm font-bold ${progress >= 100 ? 'text-green-600' : 'text-[#FF8C00]'}`}>{status}</span>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                <span className="text-sm font-semibold text-[#00234B] flex items-center gap-2">
                  <Clock size={16} /> Estimated Time Remaining:
                </span>
                <span className={`text-lg font-bold ${progress >= 100 ? 'text-green-600' : 'text-[#FF8C00]'}`}>
                  {timeRemaining}
                </span>
              </div>

              {totalDistance > 0 && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">Total Distance:</span>
                  <span className="text-sm font-bold text-[#00234B]">
                    {totalDistance.toFixed(0)} km ({(totalDistance * 0.621371).toFixed(0)} miles)
                  </span>
                </div>
              )}
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full transition-all ease-linear ${progress >= 100 ? 'bg-green-500' : 'bg-[#FF8C00]'}`} style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>{shipmentOrigin}</span>
                <span>{Math.floor(progress)}% Complete</span>
                <span>{shipmentDestination}</span>
              </div>
              {progress >= 100 && (
                <div className="flex items-center gap-2 text-green-600 font-bold pt-2 border-t border-gray-200 mt-2"><CheckCircle size={18} /> Package Delivered Successfully!</div>
              )}
            </div>
          )}
        </div>

        <div ref={mapContainerRef} className="relative overflow-hidden border-4 border-white rounded-2xl shadow-2xl h-[60vh] min-h-[400px]">
          <Map isTracking={isTracking} progress={progress} originCoords={originCoords} destCoords={destCoords} origin={shipmentOrigin} destination={shipmentDestination} bearing={bearing} recenterKey={recenterKey} />
          
          {/* Map Legend with NEW Recenter Button */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-[#00234B] shadow-lg flex items-center gap-2 border border-gray-200">
            <span className={`w-2.5 h-2.5 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span> 
            {isTracking ? 'Live Global Tracking Active' : 'Enter ID to Track'}
            
            {/* NEW: Recenter Button */}
            {isTracking && (
              <button onClick={() => setRecenterKey(prev => prev + 1)} className="ml-2 px-3 py-1 bg-[#00234B] text-white text-xs font-bold rounded hover:bg-[#003366] transition-colors flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                Recenter
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto"><Footer /></div>
    </main>
  );
}