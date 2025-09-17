import React from 'react';
import { Clock, Users, MapPin, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface BusData {
  id: string;
  routeNumber: string;
  destination: string;
  arrivalTime: string;
  capacity: number;
  occupancy: number;
  status: 'on-time' | 'delayed' | 'approaching';
  location: {
    lat: number;
    lng: number;
  };
}

interface BusListProps {
  buses: BusData[];
  onSelectBus: (bus: BusData) => void;
  selectedBusId?: string;
}

const BusList: React.FC<BusListProps> = ({ buses, onSelectBus, selectedBusId }) => {
  const getStatusColor = (status: BusData['status']) => {
    switch (status) {
      case 'on-time': return 'bg-secondary text-secondary-foreground';
      case 'delayed': return 'bg-transit-orange text-white';
      case 'approaching': return 'bg-primary text-primary-foreground';
    }
  };

  const getOccupancyLevel = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage < 60) return { label: 'Low', color: 'bg-secondary' };
    if (percentage < 80) return { label: 'Medium', color: 'bg-transit-orange' };
    return { label: 'High', color: 'bg-destructive' };
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground mb-4">Available Buses</h3>
      {buses.map((bus) => {
        const occupancyLevel = getOccupancyLevel(bus.occupancy, bus.capacity);
        const isSelected = selectedBusId === bus.id;
        
        return (
          <Card 
            key={bus.id} 
            className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-elevated ${
              isSelected ? 'ring-2 ring-primary bg-accent/50' : 'hover:bg-accent/30'
            }`}
            onClick={() => onSelectBus(bus)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">Route {bus.routeNumber}</h4>
                    <Badge className={getStatusColor(bus.status)} variant="secondary">
                      {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{bus.destination}</span>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="flex items-center space-x-1 text-sm text-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{bus.arrivalTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{bus.occupancy}/{bus.capacity}</span>
                  </div>
                  <Badge className={`${occupancyLevel.color} text-xs px-2`} variant="secondary">
                    {occupancyLevel.label}
                  </Badge>
                </div>
              </div>
            </div>

            {isSelected && (
              <div className="mt-3 pt-3 border-t border-border">
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 transition-colors"
                >
                  Track This Bus
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default BusList;