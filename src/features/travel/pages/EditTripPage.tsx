import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';
import { useTravelStore } from '../state';
import { MediaItem } from '../types';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';
import { Card } from '@components/Card';

export const EditTripPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getEntryById, updateEntry } = useTravelStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    story: '',
    tags: '',
  });

  const [mediaUrls, setMediaUrls] = useState<string[]>(['']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) {
      navigate('/trips');
      return;
    }

    const trip = getEntryById(id);
    if (!trip) {
      navigate('/trips');
      return;
    }

    // Populate form with existing trip data
    setFormData({
      title: trip.title,
      destination: trip.destination,
      startDate: new Date(trip.startDate).toISOString().split('T')[0],
      endDate: new Date(trip.endDate).toISOString().split('T')[0],
      description: trip.description,
      story: trip.story || '',
      tags: trip.tags?.join(', ') || '',
    });

    // Populate media URLs
    if (trip.media && trip.media.length > 0) {
      setMediaUrls(trip.media.map(m => m.url));
    } else if (trip.coverImage) {
      setMediaUrls([trip.coverImage]);
    }

    setIsLoading(false);
  }, [id, getEntryById, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMediaUrlChange = (index: number, value: string) => {
    const newUrls = [...mediaUrls];
    newUrls[index] = value;
    setMediaUrls(newUrls);
  };

  const addMediaUrlField = () => {
    setMediaUrls([...mediaUrls, '']);
  };

  const removeMediaUrlField = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const validUrls = mediaUrls.filter((url) => url.trim() !== '');
    if (validUrls.length === 0) {
      newErrors.media = 'At least one photo URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !id) {
      return;
    }

    setIsSubmitting(true);

    try {
      const validUrls = mediaUrls.filter((url) => url.trim() !== '');
      const media: MediaItem[] = validUrls.map((url, index) => ({
        id: `media-${Date.now()}-${index}`,
        url: url.trim(),
        type: 'image',
      }));

      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      await updateEntry(id, {
        title: formData.title.trim(),
        destination: formData.destination.trim(),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        description: formData.description.trim(),
        story: formData.story.trim() || undefined,
        media,
        tags: tags.length > 0 ? tags : undefined,
        coverImage: media[0]?.url,
      });

      navigate(`/trip/${id}`);
    } catch (error) {
      console.error('Error updating trip:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Edit Trip
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Update your travel memories
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Trip Title *"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Magical Kyoto"
                      error={errors.title}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Destination *"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Kyoto, Japan"
                      error={errors.destination}
                    />
                  </div>
                  <div>
                    <Input
                      label="Start Date *"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      error={errors.startDate}
                    />
                  </div>
                  <div>
                    <Input
                      label="End Date *"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      error={errors.endDate}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <TextArea
                  label="Description *"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="A brief description of your trip..."
                  rows={4}
                  error={errors.description}
                />
              </div>

              {/* Story */}
              <div>
                <TextArea
                  label="Your Story (Markdown supported)"
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  placeholder="Share your detailed travel story... You can use markdown formatting!"
                  rows={10}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Tip: Use markdown for formatting (e.g., # for headings, ** for bold, - for lists)
                </p>
              </div>

              {/* Media URLs */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Photos
                </h2>
                <div className="space-y-3">
                  {mediaUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter image URL (e.g., https://...)"
                        value={url}
                        onChange={(e) => handleMediaUrlChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {mediaUrls.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeMediaUrlField(index)}
                          className="px-4"
                        >
                          <FiX className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {errors.media && (
                    <p className="text-sm text-red-600">{errors.media}</p>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addMediaUrlField}
                    className="w-full"
                  >
                    <FiUpload className="mr-2 w-5 h-5" />
                    Add Another Photo URL
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Tip: Use image URLs from Unsplash, Imgur, or your own hosting
                </p>
              </div>

              {/* Tags */}
              <div>
                <Input
                  label="Tags (comma-separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., culture, temples, food, nature"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Separate tags with commas
                </p>
              </div>

              {/* Preview */}
              {mediaUrls[0] && mediaUrls[0].trim() !== '' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Cover Photo Preview
                  </h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={mediaUrls[0]}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  className="flex-1"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <FiSave className="mr-2 w-5 h-5" />
                  Update Trip
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/trip/${id}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
