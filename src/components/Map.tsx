"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Next.js
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Map() {
  const nyCoords: [number, number] = [40.7128, -74.0060];
  const londonCoords: [number, number] = [51.5074, -0.1278];

  return (
    <MapContainer center={[45, -35]} zoom={3} className="h-64 w-full rounded-lg z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={nyCoords} icon={icon}>
        <Popup>Origin: New York, USA</Popup>
      </Marker>
      <Marker position={londonCoords} icon={icon}>
        <Popup>Destination: London, UK</Popup>
      </Marker>
      {/* Dotted route line */}
      <Polyline pathOptions={{ color: '#FF8C00', dashArray: '5, 10', weight: 3 }} positions={[nyCoords, londonCoords]} />
    </MapContainer>
  );
}