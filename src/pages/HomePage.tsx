import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiTrendingUp, FiHeart, FiArrowRight } from 'react-icons/fi';
import { useTravelStore } from '@features/travel/state';
import { Button } from '@components/Button';
import { Card } from '@components/Card';

export const HomePage: React.FC = () => {
  const { entries, getFilteredEntries, fetchEntries } = useTravelStore();
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalCountries: 0,
    favoriteTrips: 0,
  });

  // Fetch trips on mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    const destinations = new Set(entries.map(e => e.destination.split(',').pop()?.trim()));
    setStats({
      totalTrips: entries.length,
      totalCountries: destinations.size,
      favoriteTrips: entries.filter(e => e.isFavorite).length,
    });
  }, [entries]);

  const recentTrips = getFilteredEntries().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Ken Burns effect */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-warm-50 dark:to-gray-900" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Your Journey,
            <br />
            <span className="text-primary-400">Beautifully Told</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            Capture your adventures, preserve your memories, and relive your travels
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/add-trip">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/trips">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-600">
                Explore Trips
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-warm dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalTrips}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Total Trips</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalCountries}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Destinations</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.favoriteTrips}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Favorite Trips</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Trips Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Adventures
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore your latest travel memories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/trip/${trip.id}`}>
                  <Card hover className="overflow-hidden group">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={trip.coverImage || trip.media[0]?.url}
                        alt={trip.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {trip.isFavorite && (
                        <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full">
                          <FiHeart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {trip.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/trips">
              <Button variant="outline" size="lg">
                View All Trips
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start documenting your travels and create lasting memories
            </p>
            <Link to="/add-trip">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Create Your First Trip
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
