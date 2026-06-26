"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const route: [number, number][] = [
  [40.7128, -74.0060], [43.5, -60.0], [47.0, -40.0], [49.5, -20.0], [51.5074, -0.1278]
];

function getPointOnRoute(progress: number): [number, number] {
  const totalSegments = route.length - 1;
  const segmentProgress = (progress / 100) * totalSegments;
  const currentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const nextIndex = currentIndex + 1;
  const t = segmentProgress - currentIndex;
  const lat = route[currentIndex][0] + (route[nextIndex][0] - route[currentIndex][0]) * t;
  const lng = route[currentIndex][1] + (route[nextIndex][1] - route[currentIndex][1]) * t;
  return [lat, lng];
}

interface MapProps { isTracking: boolean; progress: number; }

export default function Map({ isTracking, progress }: MapProps) {
  const currentPos = getPointOnRoute(progress);
  return (
    <MapContainer center={[45, -35]} zoom={3} className="h-full w-full rounded-lg z-0" scrollWheelZoom={true}>
      <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
      <Marker position={route[0]} icon={icon}><Popup>Origin: New York, USA</Popup></Marker>
      <Marker position={route[route.length - 1]} icon={icon}><Popup>Destination: London, UK</Popup></Marker>
      <Polyline pathOptions={{ color: '#FF8C00', dashArray: '5, 10', weight: 3 }} positions={route} />
      {isTracking && <Marker position={currentPos} icon={icon}><Popup>Live Shipment Location</Popup></Marker>}
    </MapContainer>
  );
}
