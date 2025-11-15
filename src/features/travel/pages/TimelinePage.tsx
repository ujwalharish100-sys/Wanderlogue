import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiImage } from 'react-icons/fi';
import { useTravelStore } from '../state';
import { format } from 'date-fns';

export const TimelinePage: React.FC = () => {
  const { getFilteredEntries, fetchEntries, isLoading } = useTravelStore();
  const trips = getFilteredEntries();

  // Fetch trips on mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Group trips by year
  const tripsByYear = trips.reduce((acc, trip) => {
    const year = new Date(trip.startDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(trip);
    return acc;
  }, {} as Record<number, typeof trips>);

  const years = Object.keys(tripsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Travel Timeline
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A chronological journey through your adventures
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 transform md:-translate-x-1/2" />

          {years.map((year, yearIndex) => (
            <div key={year} className="mb-16">
              {/* Year Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex justify-start md:justify-center mb-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-lg z-10">
                  <span className="text-2xl font-bold text-white">{year}</span>
                </div>
              </motion.div>

              {/* Trips for this year */}
              <div className="space-y-12">
                {tripsByYear[year].map((trip, tripIndex) => {
                  const isEven = tripIndex % 2 === 0;
                  const delay = yearIndex * 0.1 + tripIndex * 0.15;

                  return (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay }}
                      className={`relative flex items-center ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      } flex-col`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-primary-500 rounded-full transform md:-translate-x-1/2 z-10" />

                      {/* Content Card */}
                      <Link
                        to={`/trip/${trip.id}`}
                        className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                          isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02, y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-hover overflow-hidden group"
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={trip.coverImage || trip.media[0]?.url}
                              alt={trip.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center space-x-1">
                              <FiImage className="w-3 h-3 text-white" />
                              <span className="text-white text-xs">{trip.media.length}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {trip.title}
                            </h3>
                            
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                              <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{trip.destination}</span>
                            </div>

                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                              <FiCalendar className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                              </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                              {trip.description}
                            </p>

                            {/* Tags */}
                            {trip.tags && trip.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {trip.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {trips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCalendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No trips yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start your journey by adding your first trip!
            </p>
            <Link
              to="/add-trip"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Your First Trip
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
