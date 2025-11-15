import { create } from 'zustand';
import { TravelEntry, TravelFilters, SortOption } from './types';
import { tripService } from '@/services/tripService';

interface TravelState {
  entries: TravelEntry[];
  filters: TravelFilters;
  sortOption: SortOption;
  darkMode: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchEntries: () => Promise<void>;
  addEntry: (entry: Omit<TravelEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<TravelEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  setFilters: (filters: TravelFilters) => void;
  setSortOption: (option: SortOption) => void;
  toggleDarkMode: () => void;
  getFilteredEntries: () => TravelEntry[];
  getEntryById: (id: string) => TravelEntry | undefined;
}

export const useTravelStore = create<TravelState>((set, get) => ({
  entries: [],
  filters: {},
  sortOption: 'date-desc',
  darkMode: false,
  isLoading: false,
  error: null,

  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filters, sortOption } = get();
      const entries = await tripService.getTrips(filters, sortOption);
      set({ entries, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch trips',
        isLoading: false 
      });
    }
  },

  addEntry: async (entry) => {
    set({ isLoading: true, error: null });
    try {
      const newEntry = await tripService.createTrip(entry);
      set((state) => ({
        entries: [newEntry, ...state.entries],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to create trip',
        isLoading: false 
      });
      throw error;
    }
  },

  updateEntry: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEntry = await tripService.updateTrip(id, updates);
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? updatedEntry : entry
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to update trip',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await tripService.deleteTrip(id);
      set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to delete trip',
        isLoading: false 
      });
      throw error;
    }
  },

  toggleFavorite: async (id) => {
    try {
      const updatedEntry = await tripService.toggleFavorite(id);
      set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? updatedEntry : entry
        ),
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to toggle favorite'
      });
      throw error;
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },

  setSortOption: (option) => {
    set({ sortOption: option });
  },

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { darkMode: newDarkMode };
    });
  },

  getFilteredEntries: () => {
    const { entries, filters, sortOption } = get();
    let filtered = [...entries];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.destination.toLowerCase().includes(query) ||
          entry.description.toLowerCase().includes(query)
      );
    }

    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter(
        (entry) => new Date(entry.startDate).getFullYear() === filters.year
      );
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((entry) =>
        filters.tags!.some((tag) => entry.tags?.includes(tag))
      );
    }

    // Apply favorite filter
    if (filters.isFavorite) {
      filtered = filtered.filter((entry) => entry.isFavorite);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'date-asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  },

  getEntryById: (id) => {
    return get().entries.find((entry) => entry.id === id);
  },
}));
