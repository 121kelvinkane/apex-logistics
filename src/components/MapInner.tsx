"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

// Custom package icon
const packageIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933348.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, zoom, { duration: 1.5 }); }, [center, zoom, map]);
  return null;
}

export default function MapInner({ startCoords, endCoords, currentCoords }: { 
  startCoords?: [number, number] | null, 
  endCoords?: [number, number] | null,
  currentCoords?: [number, number] | null
}) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.log("GPS access denied or unavailable.")
      );
    }
  }, []);

  let mapCenter: [number, number] = [20, 0];
  let mapZoom = 2;

  if (startCoords && endCoords) {
     mapCenter = [ (startCoords[0] + endCoords[0]) / 2, (startCoords[1] + endCoords[1]) / 2 ];
     mapZoom = 4;
  } else if (userLocation) {
     mapCenter = userLocation;
     mapZoom = 12;
  }

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
      <MapUpdater center={mapCenter} zoom={mapZoom} />
      
      {/* SATELLITE IMAGERY */}
      <TileLayer attribution='&copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      
      {/* BUILDING FOOTPRINTS */}
      <TileLayer attribution='&copy; OpenStreetMap' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.3} />
      
      {/* CITY LABELS */}
      <TileLayer attribution='&copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />

      {userLocation && (
        <Marker position={userLocation} icon={blueIcon}>
          <Popup><strong>You are here!</strong></Popup>
        </Marker>
      )}

      {startCoords && (
        <Marker position={startCoords} icon={orangeIcon}>
          <Popup><strong>Origin</strong></Popup>
        </Marker>
      )}

      {endCoords && (
        <Marker position={endCoords}>
          <Popup><strong>Destination</strong></Popup>
        </Marker>
      )}

      {/* MOVING PACKAGE MARKER */}
      {currentCoords && (
        <Marker position={currentCoords} icon={packageIcon}>
          <Popup>
            <strong>📦 Your Package</strong><br/>
            Currently in transit
          </Popup>
        </Marker>
      )}

      {startCoords && endCoords && (
        <Polyline pathOptions={{ color: '#FF8C00', weight: 4, dashArray: '10, 10' }} positions={[startCoords, endCoords]} />
      )}
    </MapContainer>
  );
}
