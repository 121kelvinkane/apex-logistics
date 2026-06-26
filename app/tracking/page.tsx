"use client";
import { useState, useEffect } from 'react';
import { MapPin, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

const Map = dynamic(() => import('../../src/components/Map'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-slate-100 rounded-lg flex items-center justify-center text-gray-500">Loading Satellite Map...</div> 
});

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Animation engine (animates from current DB progress to 100%)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1; 
          if (next < 15) setStatus('Departed Origin Facility');
          else if (next < 45) setStatus('In Transit - Ocean/Air');
          else if (next < 75) setStatus('Arrived at Destination Hub');
          else if (next < 99) setStatus('Out for Delivery');
          else setStatus('Delivered!');
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isTracking, progress]);

  const handleTrack = async () => {
    setError('');
    if (!trackingId.trim()) { setError('Please enter a tracking number!'); return; }
    
    setIsLoading(true);
    
    try {
      // CALL THE PRISMA API ROUTE
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId }),
      });

      if (response.status === 404) {
        setError(`Tracking ID "${trackingId}" not found. Please check your documents.`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      // Start the animation from the database's current progress
      setProgress(data.progress);
      setStatus(data.status);
      setIsTracking(true);
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsTracking(false); setProgress(0); setStatus(''); setTrackingId(''); setError('');
  };

  return (
    <main className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="pt-24 pb-8 container mx-auto px-6">
        <a href="/" className="inline-flex items-center gap-2 text-[#00234B] hover:text-[#FF8C00] font-semibold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </a>
        <h1 className="text-3xl md:text-4xl font-bold text-[#00234B] mb-2">Global Shipment Tracking</h1>
        <p className="text-gray-500 mb-8">Enter your tracking number to view real-time database location and status.</p>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={trackingId} onChange={(e) => { setTrackingId(e.target.value); setError(''); }} placeholder="Try: APX-88392, APX-12345, or APX-99999" disabled={isTracking || isLoading} className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent disabled:bg-gray-100" />
            {!isTracking ? (
              <button onClick={handleTrack} disabled={isLoading} className="bg-[#00234B] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003366] transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50">
                {isLoading ? 'Searching DB...' : <><MapPin size={18} /> Track Parcel</>}
              </button>
            ) : (
              <button onClick={handleReset} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors whitespace-nowrap">Track Another</button>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle size={18} /> <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {isTracking && (
            <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Current Status:</span>
                <span className={`text-sm font-bold ${progress === 100 ? 'text-green-600' : 'text-[#FF8C00]'}`}>{status}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full transition-all duration-300 ease-linear ${progress === 100 ? 'bg-green-500' : 'bg-[#FF8C00]'}`} style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Origin</span><span>{progress}% Complete</span><span>Destination</span>
              </div>
              {progress === 100 && (
                <div className="flex items-center gap-2 text-green-600 font-bold pt-2 border-t border-gray-200 mt-2"><CheckCircle size={18} /> Package Delivered Successfully!</div>
              )}
            </div>
          )}
        </div>

        <div className="relative overflow-hidden border-4 border-white rounded-2xl shadow-2xl h-[60vh] min-h-[400px]">
          <Map isTracking={isTracking} progress={progress} />
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-[#00234B] shadow-lg flex items-center gap-2 border border-gray-200">
            <span className={`w-2.5 h-2.5 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span> 
            {isTracking ? 'Live Database Tracking Active' : 'Enter ID to Track'}
          </div>
        </div>
      </div>
      <div className="mt-auto"><Footer /></div>
    </main>
  );
}
