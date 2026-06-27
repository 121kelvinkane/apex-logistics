"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const getTruckIcon = (rotation: number) => new L.DivIcon({
  html: `<div style="transform: rotate(${rotation}deg); transform-origin: center; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
    <svg width="36" height="36" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
      <rect x="10" y="4" width="20" height="26" fill="#FF8C00" stroke="#00234B" stroke-width="2" rx="3"/>
      <rect x="13" y="7" width="14" height="10" fill="#00234B" rx="1"/>
      <circle cx="12" cy="32" r="4" fill="#1a1a1a" stroke="#fff" stroke-width="1"/>
      <circle cx="28" cy="32" r="4" fill="#1a1a1a" stroke="#fff" stroke-width="1"/>
    </svg>
  </div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function MapController({ isTracking, currentPos, originCoords, progress, recenterKey }: { isTracking: boolean; currentPos: [number, number]; originCoords: [number, number]; progress: number; recenterKey: number }) {
  const map = useMap();
  const [userDragging, setUserDragging] = useState(false);

  // Initial zoom when tracking starts
  useEffect(() => {
    if (isTracking && progress === 0) {
      map.flyTo(originCoords, 11, { duration: 2 });
      setUserDragging(false);
    }
  }, [isTracking, progress, originCoords, map]);

  // Recenter when the button is clicked
  useEffect(() => {
    if (recenterKey > 0) {
      map.flyTo(currentPos, map.getZoom(), { duration: 1 });
      setUserDragging(false);
    }
  }, [recenterKey, currentPos, map]);

  // Detect when user manually drags the map
  useEffect(() => {
    const onDragStart = () => setUserDragging(true);
    map.on('dragstart', onDragStart);
    return () => { map.off('dragstart', onDragStart); };
  }, [map]);

  // Auto-pan ONLY if the user isn't currently dragging the map
  useEffect(() => {
    if (isTracking && progress > 0 && !userDragging) {
      map.panTo(currentPos, { animate: true, duration: 0.05, noMoveStart: true });
    }
  }, [currentPos, isTracking, map, userDragging]);

  return null;
}

interface MapProps {
  isTracking: boolean;
  progress: number;
  originCoords: [number, number];
  destCoords: [number, number];
  origin: string;
  destination: string;
  bearing: number;
  recenterKey: number;
}

export default function Map({ isTracking, progress, originCoords, destCoords, origin, destination, bearing, recenterKey }: MapProps) {
  const route: [number, number][] = [originCoords, destCoords];
  const centerLat = isTracking ? (originCoords[0] + destCoords[0]) / 2 : 20;
  const centerLng = isTracking ? (originCoords[1] + destCoords[1]) / 2 : 0;

  function getPointOnRoute(prog: number): [number, number] {
    const t = prog / 100;
    const lat = originCoords[0] + (destCoords[0] - originCoords[0]) * t;
    const lng = originCoords[1] + (destCoords[1] - originCoords[1]) * t;
    return [lat, lng];
  }

  const currentPos = getPointOnRoute(progress);
  const truckIcon = getTruckIcon(bearing);

  return (
    <MapContainer center={[centerLat, centerLng]} zoom={isTracking ? 3 : 2} className="h-full w-full rounded-lg z-0" scrollWheelZoom={true}>
      <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
      
      <MapController isTracking={isTracking} currentPos={currentPos} originCoords={originCoords} progress={progress} recenterKey={recenterKey} />
      
      {isTracking && (
        <>
          <Marker position={originCoords} icon={pinIcon}><Popup>Origin: {origin}</Popup></Marker>
          <Marker position={destCoords} icon={pinIcon}><Popup>Destination: {destination}</Popup></Marker>
          <Polyline pathOptions={{ color: '#FF8C00', dashArray: '5, 10', weight: 3 }} positions={route} />
          <Marker position={currentPos} icon={truckIcon}><Popup>Live Shipment - {Math.floor(progress)}% Complete</Popup></Marker>
        </>
      )}
    </MapContainer>
  );
}