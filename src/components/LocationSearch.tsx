import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface LocationSearchProps {
  onSearch: (from: string, to: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = () => {
    if (from.trim() && to.trim()) {
      onSearch(from, to);
    }
  };

  return (
    <Card className="p-6 bg-gradient-surface border-0 shadow-card">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="From (Starting location)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
          
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="To (Destination)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <Button 
          onClick={handleSearch} 
          className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
          disabled={!from.trim() || !to.trim()}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Buses
        </Button>
      </div>
    </Card>
  );
};

export default LocationSearch;