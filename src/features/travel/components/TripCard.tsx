import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiHeart, FiImage } from 'react-icons/fi';
import { TravelEntry } from '../types';
import { Card } from '@components/Card';
import { useTravelStore } from '../state';
import { format } from 'date-fns';

interface TripCardProps {
  trip: TravelEntry;
  index?: number;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, index = 0 }) => {
  const { toggleFavorite } = useTravelStore();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(trip.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/trip/${trip.id}`}>
        <Card hover className="overflow-hidden group">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={trip.coverImage || trip.media[0]?.url}
              alt={trip.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all"
            >
              <FiHeart
                className={`w-5 h-5 transition-colors ${
                  trip.isFavorite
                    ? 'text-red-500 fill-current'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </motion.button>

            {/* Media Count */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center space-x-2">
              <FiImage className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{trip.media.length}</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                {trip.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
              <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <FiCalendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>
                {format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {trip.description}
            </p>

            {/* Tags */}
            {trip.tags && trip.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {trip.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {trip.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    +{trip.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
