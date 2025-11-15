import api from './api';
import { TravelEntry, TravelFilters, SortOption } from '@features/travel/types';

interface TripsResponse {
  success: boolean;
  count: number;
  trips: TravelEntry[];
}

interface TripResponse {
  success: boolean;
  trip: TravelEntry;
}

interface StatsResponse {
  success: boolean;
  stats: {
    totalTrips: number;
    totalDestinations: number;
    totalFavorites: number;
    totalPhotos: number;
  };
}

export const tripService = {
  // Get all trips with filters
  getTrips: async (filters?: TravelFilters, sort?: SortOption): Promise<TravelEntry[]> => {
    const params: any = {};

    if (filters?.searchQuery) {
      params.search = filters.searchQuery;
    }
    if (filters?.year) {
      params.year = filters.year;
    }
    if (filters?.tags && filters.tags.length > 0) {
      params.tags = filters.tags.join(',');
    }
    if (filters?.favoritesOnly) {
      params.isFavorite = 'true';
    }
    if (sort) {
      params.sort = sort;
    }

    const { data } = await api.get<TripsResponse>('/trips', { params });
    return data.trips;
  },

  // Get single trip
  getTrip: async (id: string): Promise<TravelEntry> => {
    const { data } = await api.get<TripResponse>(`/trips/${id}`);
    return data.trip;
  },

  // Create new trip
  createTrip: async (tripData: Partial<TravelEntry>): Promise<TravelEntry> => {
    const { data } = await api.post<TripResponse>('/trips', tripData);
    return data.trip;
  },

  // Update trip
  updateTrip: async (id: string, tripData: Partial<TravelEntry>): Promise<TravelEntry> => {
    const { data } = await api.put<TripResponse>(`/trips/${id}`, tripData);
    return data.trip;
  },

  // Delete trip
  deleteTrip: async (id: string): Promise<void> => {
    await api.delete(`/trips/${id}`);
  },

  // Toggle favorite
  toggleFavorite: async (id: string): Promise<TravelEntry> => {
    const { data } = await api.put<TripResponse>(`/trips/${id}/favorite`);
    return data.trip;
  },

  // Get statistics
  getStats: async () => {
    const { data } = await api.get<StatsResponse>('/trips/stats');
    return data.stats;
  },
};
