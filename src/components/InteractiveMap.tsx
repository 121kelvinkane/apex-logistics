"use client";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapInner = dynamic(() => import('./MapInner'), { ssr: false });

export default function InteractiveMap({ startCoords, endCoords, currentCoords }: { 
  startCoords?: [number, number] | null, 
  endCoords?: [number, number] | null,
  currentCoords?: [number, number] | null
}) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 relative">
      <MapInner startCoords={startCoords} endCoords={endCoords} currentCoords={currentCoords} />
      <div className="absolute top-4 left-4 z-[1000] bg-gray-900/90 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live Shipment Tracking
        </h3>
        <p className="text-sm text-gray-300 mt-1">Watch the package icon move in real-time</p>
      </div>
    </div>
  );
}
