import express from 'express';
import {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  toggleFavorite,
  getTripStats,
} from '../controllers/tripController.js';
import { protect } from '../middleware/auth.js';
import { tripValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Stats route (must be before /:id)
router.get('/stats', getTripStats);

// Main CRUD routes
router.route('/')
  .get(getTrips)
  .post(tripValidation, validate, createTrip);

router.route('/:id')
  .get(getTrip)
  .put(tripValidation, validate, updateTrip)
  .delete(deleteTrip);

// Toggle favorite
router.put('/:id/favorite', toggleFavorite);

export default router;
