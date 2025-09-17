import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BusData } from './BusList';

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface BusMapProps {
  buses: BusData[];
  selectedBus?: BusData;
  className?: string;
}

const BusMap: React.FC<BusMapProps> = ({ buses, selectedBus, className = "h-96" }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);
  const markersRef = React.useRef<L.Marker[]>([]);

  // Custom bus icon
  const createBusIcon = (status: BusData['status']) => {
    const color = status === 'on-time' ? '#10b981' : status === 'delayed' ? '#f59e0b' : '#3b82f6';
    
    return L.divIcon({
      html: `
        <div style="
          background: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
            <path d="M18 7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v8h2v2c0 .5.4 1 1 1s1-.5 1-1v-2h4v2c0 .5.4 1 1 1s1-.5 1-1v-2h2V7zm-7 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
          </svg>
        </div>
      `,
      className: 'custom-bus-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const defaultCenter: [number, number] = [40.7128, -74.0060];
    const initialCenter = selectedBus 
      ? [selectedBus.location.lat, selectedBus.location.lng] as [number, number]
      : defaultCenter;

    mapInstanceRef.current = L.map(mapRef.current).setView(initialCenter, selectedBus ? 15 : 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when buses change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    buses.forEach(bus => {
      const marker = L.marker([bus.location.lat, bus.location.lng], {
        icon: createBusIcon(bus.status)
      });

      marker.bindPopup(`
        <div class="p-2 min-w-[200px]">
          <div class="font-semibold">Route ${bus.routeNumber}</div>
          <div class="text-sm text-gray-600 mb-2">${bus.destination}</div>
          <div class="space-y-1 text-xs">
            <div>Status: <span class="font-medium">${bus.status}</span></div>
            <div>Arrival: <span class="font-medium">${bus.arrivalTime}</span></div>
            <div>Capacity: <span class="font-medium">${bus.occupancy}/${bus.capacity}</span></div>
          </div>
        </div>
      `);

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [buses]);

  // Update map view when selected bus changes
  useEffect(() => {
    if (mapInstanceRef.current && selectedBus) {
      mapInstanceRef.current.setView([selectedBus.location.lat, selectedBus.location.lng], 15);
    }
  }, [selectedBus]);

  return (
    <div className={`${className} rounded-lg overflow-hidden shadow-elevated border border-border`}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} className="rounded-lg" />
    </div>
  );
};

export default BusMap;