import { BusData } from '@/components/BusList';

export const mockBuses: BusData[] = [
  {
    id: '1',
    routeNumber: '42',
    destination: 'Downtown Transit Center',
    arrivalTime: '5 mins',
    capacity: 60,
    occupancy: 32,
    status: 'on-time',
    location: {
      lat: 40.7128,
      lng: -74.0060,
    },
  },
  {
    id: '2',
    routeNumber: '15',
    destination: 'University Campus',
    arrivalTime: '12 mins',
    capacity: 45,
    occupancy: 28,
    status: 'approaching',
    location: {
      lat: 40.7589,
      lng: -73.9851,
    },
  },
  {
    id: '3',
    routeNumber: '8',
    destination: 'Shopping Mall',
    arrivalTime: '18 mins',
    capacity: 50,
    occupancy: 42,
    status: 'delayed',
    location: {
      lat: 40.7282,
      lng: -73.9942,
    },
  },
  {
    id: '4',
    routeNumber: '23A',
    destination: 'Airport Express',
    arrivalTime: '25 mins',
    capacity: 40,
    occupancy: 15,
    status: 'on-time',
    location: {
      lat: 40.7505,
      lng: -73.9934,
    },
  },
  {
    id: '5',
    routeNumber: '67',
    destination: 'Business District',
    arrivalTime: '8 mins',
    capacity: 55,
    occupancy: 48,
    status: 'approaching',
    location: {
      lat: 40.7614,
      lng: -73.9776,
    },
  },
];