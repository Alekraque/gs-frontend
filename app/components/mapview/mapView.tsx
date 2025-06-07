'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Shelter = {
  titulo: string;
  descricao: string;
  latitude: number;
  longitude: number;
};

type MapViewProps = {
  position: { lat: number; lng: number };
  abrigos: Shelter[];
};

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 14);
  }, [lat, lng, map]);

  return null;
}

export default function MapView({ position, abrigos }: MapViewProps) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="w-full h-[500px] max-w-4xl">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater lat={position.lat} lng={position.lng} />

        <Marker position={position}>
          <Popup>Você está aqui</Popup>
        </Marker>

        {abrigos.map((abrigo, index) => (
          <Marker
            key={index}
            position={[abrigo.latitude, abrigo.longitude]}
          >
            <Popup>
              <strong>{abrigo.titulo}</strong>
              <br />
              {abrigo.descricao}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
