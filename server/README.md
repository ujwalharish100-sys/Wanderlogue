# Wanderlogue API Server

Backend API for Wanderlogue Travel Journal built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

4. **Seed database with demo data**
   ```bash
   npm run seed
   ```

5. **Start server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

Server will run on `http://localhost:5000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

### Auth Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@wanderlogue.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "demo@wanderlogue.com",
    "username": "demo_user",
    "firstName": "Demo",
    "lastName": "User",
    "avatar": "...",
    "provider": "local",
    "createdAt": "..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "https://..."
}
```

#### Update Password
```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

---

### Trip Endpoints

#### Get All Trips
```http
GET /api/trips
Authorization: Bearer <token>

Query Parameters:
- search: Search in title/destination
- year: Filter by year (e.g., 2024)
- tags: Filter by tags (comma-separated)
- isFavorite: Filter favorites (true/false)
- sort: Sort order (newest, oldest, title-asc, title-desc)
```

**Example:**
```http
GET /api/trips?search=japan&year=2023&isFavorite=true&sort=newest
```

#### Get Single Trip
```http
GET /api/trips/:id
Authorization: Bearer <token>
```

#### Create Trip
```http
POST /api/trips
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Amazing Trip",
  "destination": "Paris, France",
  "startDate": "2024-06-01",
  "endDate": "2024-06-07",
  "description": "A wonderful week in Paris",
  "story": "# My Paris Adventure\n\nIt was amazing...",
  "coverImage": "https://images.unsplash.com/...",
  "media": [
    {
      "type": "image",
      "url": "https://...",
      "caption": "Eiffel Tower"
    }
  ],
  "tags": ["france", "europe", "city"]
}
```

#### Update Trip
```http
PUT /api/trips/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Delete Trip
```http
DELETE /api/trips/:id
Authorization: Bearer <token>
```

#### Toggle Favorite
```http
PUT /api/trips/:id/favorite
Authorization: Bearer <token>
```

#### Get Trip Statistics
```http
GET /api/trips/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalTrips": 6,
    "totalDestinations": 6,
    "totalFavorites": 3,
    "totalPhotos": 12
  }
}
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  username: String (unique, required),
  password: String (hashed, required for local),
  firstName: String,
  lastName: String,
  avatar: String,
  provider: String (local, google, github, facebook),
  providerId: String,
  role: String (user, admin),
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Trip Model
```javascript
{
  user: ObjectId (ref: User, required),
  title: String (required),
  destination: String (required),
  startDate: Date (required),
  endDate: Date (required),
  description: String (required),
  story: String (markdown),
  coverImage: String (required),
  media: [{
    type: String (image, video),
    url: String,
    caption: String,
    publicId: String
  }],
  tags: [String],
  location: {
    type: Point,
    coordinates: [Number],
    address: String
  },
  isFavorite: Boolean,
  isPublic: Boolean,
  views: Number,
  timestamps: true
}
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ HTTP-only cookies
- ✅ Helmet.js security headers
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Input validation
- ✅ MongoDB injection prevention

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── tripController.js    # Trip CRUD logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Trip.js              # Trip schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── tripRoutes.js        # Trip endpoints
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── utils/
│   │   └── jwt.js               # JWT utilities
│   └── server.js                # Main server file
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json
└── README.md
```

---

## 🧪 Testing

### Manual Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"testuser","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@wanderlogue.com","password":"demo123"}'
```

**Get Trips:**
```bash
curl -X GET http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with free tier
- **Render**: Simple deployment
- **DigitalOcean**: Full control with droplets
- **AWS/GCP**: Enterprise solutions

---

## 📝 Demo Credentials

```
Email: demo@wanderlogue.com
Password: demo123
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or check your MONGODB_URI in .env
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### JWT Token Issues
```bash
# Make sure JWT_SECRET is set in .env
# Clear cookies and login again
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

**Happy Coding! 🎉**
