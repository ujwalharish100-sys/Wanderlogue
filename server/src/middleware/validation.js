import { body, validationResult } from 'express-validator';

// Validation result checker
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Register validation rules
export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
];

// Login validation rules
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Trip validation rules
export const tripValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Destination is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('endDate')
    .isISO8601()
    .withMessage('Please provide a valid end date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('coverImage')
    .notEmpty()
    .withMessage('Cover image is required')
    .custom((value) => {
      // Accept both regular URLs and base64 data URLs
      const urlRegex = /^https?:\/\/.+/;
      const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
      
      if (!urlRegex.test(value) && !base64Regex.test(value)) {
        throw new Error('Cover image must be a valid URL or base64 data URL');
      }
      return true;
    }),
  body('story')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Story cannot exceed 10000 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];
