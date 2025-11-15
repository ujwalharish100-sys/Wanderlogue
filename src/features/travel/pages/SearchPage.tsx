import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useTravelStore } from '../state';
import { TripCard } from '../components/TripCard';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export const SearchPage: React.FC = () => {
  const { entries, filters, setFilters, getFilteredEntries, fetchEntries } = useTravelStore();
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
  const [selectedYear, setSelectedYear] = useState<string>(filters.year?.toString() || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(filters.isFavorite || false);

  // Fetch trips on mount
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const filteredTrips = getFilteredEntries();

  // Get all unique years and tags
  const allYears = Array.from(new Set(entries.map((e) => new Date(e.startDate).getFullYear()))).sort(
    (a, b) => b - a
  );
  const allTags = Array.from(new Set(entries.flatMap((e) => e.tags || []))).sort();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        searchQuery: searchQuery || undefined,
        year: selectedYear ? parseInt(selectedYear) : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        isFavorite: showFavoritesOnly || undefined,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedYear, selectedTags, showFavoritesOnly, setFilters]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedTags([]);
    setShowFavoritesOnly(false);
    setFilters({});
  };

  const hasActiveFilters =
    searchQuery || selectedYear || selectedTags.length > 0 || showFavoritesOnly;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Search & Filter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find your perfect travel memory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FiFilter className="mr-2" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="label-field">Search</label>
                <div className="relative">
                  <Input
                    placeholder="Search trips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Year Filter */}
              <div className="mb-6">
                <label className="label-field">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Years</option>
                  {allYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favorites Filter */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    Favorites only
                  </span>
                </label>
              </div>

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <div>
                  <label className="label-field">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {selectedYear && (
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                      Year: {selectedYear}
                      <button
                        onClick={() => setSelectedYear('')}
                        className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {showFavoritesOnly && (
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                      Favorites
                      <button
                        onClick={() => setShowFavoritesOnly(false)}
                        className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Results Count */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Found {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
              </p>

              {/* Results Grid */}
              {filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTrips.map((trip, index) => (
                    <TripCard key={trip.id} trip={trip} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No trips found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Try adjusting your filters or search query
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
