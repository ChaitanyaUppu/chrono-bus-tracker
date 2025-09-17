import { BusData } from '@/components/BusList';

export const mockBuses: BusData[] = [
  {
    id: '1',
    routeNumber: 'PB-101',
    destination: 'Amritsar Golden Temple',
    arrivalTime: '5 mins',
    capacity: 50,
    occupancy: 32,
    status: 'on-time',
    location: {
      lat: 31.6340, // Amritsar
      lng: 74.8723,
    },
  },
  {
    id: '2',
    routeNumber: 'PB-205',
    destination: 'Chandigarh Sector 17',
    arrivalTime: '12 mins',
    capacity: 45,
    occupancy: 28,
    status: 'approaching',
    location: {
      lat: 30.7333, // Chandigarh
      lng: 76.7794,
    },
  },
  {
    id: '3',
    routeNumber: 'PB-142',
    destination: 'Ludhiana City Center',
    arrivalTime: '8 mins',
    capacity: 40,
    occupancy: 38,
    status: 'delayed',
    location: {
      lat: 30.9010, // Ludhiana
      lng: 75.8573,
    },
  },
  {
    id: '4',
    routeNumber: 'PB-067',
    destination: 'Jalandhar Cantt',
    arrivalTime: '15 mins',
    capacity: 55,
    occupancy: 22,
    status: 'on-time',
    location: {
      lat: 31.1471, // Jalandhar
      lng: 75.3412,
    },
  },
  {
    id: '5',
    routeNumber: 'PB-320',
    destination: 'Patiala Qila Mubarak',
    arrivalTime: '3 mins',
    capacity: 35,
    occupancy: 30,
    status: 'approaching',
    location: {
      lat: 30.3398, // Patiala
      lng: 76.3869,
    },
  },
];