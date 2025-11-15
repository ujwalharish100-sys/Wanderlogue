export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  thumbnail?: string;
}

export interface TravelEntry {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  description: string;
  story?: string;
  media: MediaItem[];
  tags?: string[];
  isFavorite?: boolean;
  coverImage?: string;
  location?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelFilters {
  searchQuery?: string;
  year?: number;
  tags?: string[];
  isFavorite?: boolean;
}

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
