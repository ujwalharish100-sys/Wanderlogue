import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiHeart, FiEdit, FiTrash2, FiArrowLeft, FiImage } from 'react-icons/fi';
import { useTravelStore } from '../state';
import { Button } from '@components/Button';
import { Lightbox } from '@components/Lightbox';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntryById, toggleFavorite, deleteEntry, fetchEntries } = useTravelStore();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch trips on mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const trip = getEntryById(id!);

  if (!trip) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trip not found
          </h2>
          <Link to="/trips">
            <Button>Back to Trips</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteEntry(trip.id);
      navigate('/trips');
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={trip.coverImage || trip.media[0]?.url}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8"
        >
          <Link to="/trips">
            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
              <FiArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
        </motion.div>

        {/* Title & Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
        >
          <div className="container-custom">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <FiMapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{trip.destination}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="w-5 h-5 mr-2" />
                <span className="text-lg">
                  {format(new Date(trip.startDate), 'MMM d, yyyy')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center">
                <FiImage className="w-5 h-5 mr-2" />
                <span className="text-lg">{trip.media.length} photos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About This Trip
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {trip.description}
              </p>
            </motion.div>

            {/* Story */}
            {trip.story && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  My Story
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown>{trip.story}</ReactMarkdown>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trip.media.map((media, index) => (
                  <motion.div
                    key={`${media.url}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={media.url}
                      alt={media.caption || `Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <FiImage className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24"
            >
              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => toggleFavorite(trip.id)}
                  >
                    <FiHeart
                      className={`mr-2 w-5 h-5 ${
                        trip.isFavorite ? 'fill-current text-red-500' : ''
                      }`}
                    />
                    {trip.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => navigate(`/edit-trip/${trip.id}`)}
                  >
                    <FiEdit className="mr-2 w-5 h-5" />
                    Edit Trip
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={handleDelete}
                  >
                    <FiTrash2 className="mr-2 w-5 h-5" />
                    Delete Trip
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {trip.tags && trip.tags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        media={trip.media}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
