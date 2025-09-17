import React, { useState } from 'react';
import { Bus, Navigation2, Clock } from 'lucide-react';
import LocationSearch from '@/components/LocationSearch';
import BusList from '@/components/BusList';
import BusMap from '@/components/BusMap';
import { BusData } from '@/components/BusList';
import { mockBuses } from '@/data/mockBuses';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [buses, setBuses] = useState<BusData[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusData | undefined>();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();

  const handleSearch = (from: string, to: string) => {
    // Simulate API call
    setBuses(mockBuses);
    setSearchPerformed(true);
    setSelectedBus(undefined);
    
    toast({
      title: "Buses Found",
      description: `Found ${mockBuses.length} available buses from ${from} to ${to}`,
    });
  };

  const handleSelectBus = (bus: BusData) => {
    setSelectedBus(bus);
    toast({
      title: "Bus Selected",
      description: `Now tracking Route ${bus.routeNumber} to ${bus.destination}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">BusTracker</h1>
          </div>
          <p className="text-white/90">Real-time bus tracking and route planning</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Search and Bus List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Search */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Navigation2 className="w-5 h-5 mr-2 text-primary" />
                Plan Your Journey
              </h2>
              <LocationSearch onSearch={handleSearch} />
            </div>

            {/* Bus List */}
            {searchPerformed && (
              <div>
                {buses.length > 0 ? (
                  <BusList 
                    buses={buses} 
                    onSelectBus={handleSelectBus}
                    selectedBusId={selectedBus?.id}
                  />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <p>No buses found for this route.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Bus className="w-5 h-5 mr-2 text-primary" />
              Live Bus Tracking
            </h2>
            
            {searchPerformed && buses.length > 0 ? (
              <BusMap 
                buses={buses} 
                selectedBus={selectedBus}
                className="h-[600px]"
              />
            ) : (
              <div className="h-[600px] bg-muted rounded-lg border border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Bus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Ready to Track Buses</p>
                  <p className="text-sm">Search for buses to see them on the map</p>
                </div>
              </div>
            )}

            {selectedBus && (
              <div className="mt-4 p-4 bg-surface-elevated rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Tracking Route {selectedBus.routeNumber}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedBus.destination} • Arrives in {selectedBus.arrivalTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className={`font-medium ${
                      selectedBus.status === 'on-time' ? 'text-secondary' :
                      selectedBus.status === 'delayed' ? 'text-transit-orange' :
                      'text-primary'
                    }`}>
                      {selectedBus.status.charAt(0).toUpperCase() + selectedBus.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
