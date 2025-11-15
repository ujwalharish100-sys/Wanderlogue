# 🧪 API Testing Guide

Complete guide to test all API endpoints using different methods.

---

## 📋 Prerequisites

- Backend server running on `http://localhost:5000`
- MongoDB running with seeded data
- Demo credentials: `demo@wanderlogue.com` / `demo123`

---

## 🔧 Method 1: Using cURL (Command Line)

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

---

### 2. Register New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "username": "testuser",
    ...
  }
}
```

---

### 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@wanderlogue.com",
    "password": "demo123"
  }'
```

**Save the token from response!**

---

### 4. Get Current User (Protected)

```bash
# Replace YOUR_TOKEN with the token from login
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 5. Get All Trips (Protected)

```bash
curl -X GET http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**With filters:**
```bash
# Search
curl -X GET "http://localhost:5000/api/trips?search=japan" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by year
curl -X GET "http://localhost:5000/api/trips?year=2023" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by tags
curl -X GET "http://localhost:5000/api/trips?tags=culture,temples" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Favorites only
curl -X GET "http://localhost:5000/api/trips?isFavorite=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Sort
curl -X GET "http://localhost:5000/api/trips?sort=oldest" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 6. Get Single Trip (Protected)

```bash
# Replace TRIP_ID with actual trip ID from MongoDB
curl -X GET http://localhost:5000/api/trips/TRIP_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 7. Create New Trip (Protected)

```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Paris Adventure",
    "destination": "Paris, France",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "description": "A wonderful week exploring the City of Light",
    "story": "# My Paris Trip\n\nIt was amazing!",
    "coverImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    "media": [
      {
        "type": "image",
        "url": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "caption": "Eiffel Tower"
      }
    ],
    "tags": ["france", "europe", "city"]
  }'
```

---

### 8. Update Trip (Protected)

```bash
curl -X PUT http://localhost:5000/api/trips/TRIP_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Paris Adventure",
    "description": "An updated description"
  }'
```

---

### 9. Toggle Favorite (Protected)

```bash
curl -X PUT http://localhost:5000/api/trips/TRIP_ID/favorite \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 10. Delete Trip (Protected)

```bash
curl -X DELETE http://localhost:5000/api/trips/TRIP_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 11. Get Trip Statistics (Protected)

```bash
curl -X GET http://localhost:5000/api/trips/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
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

### 12. Logout (Protected)

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Method 2: Using Postman

### Setup

1. **Download Postman**: https://www.postman.com/downloads/

2. **Create New Collection**: "Wanderlogue API"

3. **Set Base URL Variable**:
   - Variable: `baseUrl`
   - Value: `http://localhost:5000/api`

### Configure Authentication

1. **Login first** to get token

2. **Save token** in Postman environment:
   - Variable: `authToken`
   - Value: (paste your token)

3. **Use in requests**:
   - Authorization tab → Type: Bearer Token
   - Token: `{{authToken}}`

### Sample Requests

#### 1. Login
- **Method**: POST
- **URL**: `{{baseUrl}}/auth/login`
- **Body** (JSON):
```json
{
  "email": "demo@wanderlogue.com",
  "password": "demo123"
}
```
- **Tests** (to save token):
```javascript
pm.environment.set("authToken", pm.response.json().token);
```

#### 2. Get Trips
- **Method**: GET
- **URL**: `{{baseUrl}}/trips`
- **Authorization**: Bearer Token → `{{authToken}}`

#### 3. Create Trip
- **Method**: POST
- **URL**: `{{baseUrl}}/trips`
- **Authorization**: Bearer Token → `{{authToken}}`
- **Body** (JSON):
```json
{
  "title": "Test Trip",
  "destination": "Test City",
  "startDate": "2024-07-01",
  "endDate": "2024-07-05",
  "description": "A test trip",
  "coverImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
  "tags": ["test"]
}
```

---

## 🌐 Method 3: Using Browser (Frontend)

### 1. Open Application
```
http://localhost:8080
```

### 2. Login
- Email: `demo@wanderlogue.com`
- Password: `demo123`

### 3. Test Features
- ✅ View all trips
- ✅ Click on a trip to view details
- ✅ Click "Add Trip" to create new
- ✅ Toggle favorite (heart icon)
- ✅ Search trips
- ✅ Filter by year/tags
- ✅ Edit trip (if implemented)
- ✅ Delete trip

### 4. Check Browser DevTools
- **Open DevTools**: F12 or Cmd+Option+I
- **Network Tab**: See all API requests
- **Console Tab**: See any errors
- **Application Tab** → Local Storage: See stored token

---

## 🔍 Method 4: Using MongoDB Compass

### Watch Data Change in Real-Time

1. **Open MongoDB Compass**

2. **Connect to**: `mongodb://localhost:27017`

3. **Navigate to**: `wanderlogue` → `trips`

4. **Perform actions in frontend**:
   - Create a trip
   - Toggle favorite
   - Delete a trip

5. **Refresh Compass** (click refresh icon)
   - See changes immediately!

### Useful Queries in Compass

**Find favorites:**
```json
{ "isFavorite": true }
```

**Find trips by year:**
```json
{ "startDate": { "$gte": "2023-01-01", "$lt": "2024-01-01" } }
```

**Find trips by tag:**
```json
{ "tags": "japan" }
```

**Find trips by user:**
```json
{ "user": ObjectId("YOUR_USER_ID") }
```

---

## 📊 Verification Checklist

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Get current user info
- [ ] Logout

### Trips
- [ ] Get all trips
- [ ] Get single trip
- [ ] Create new trip
- [ ] Update trip
- [ ] Delete trip
- [ ] Toggle favorite
- [ ] Get statistics

### Filters
- [ ] Search by keyword
- [ ] Filter by year
- [ ] Filter by tags
- [ ] Filter favorites only
- [ ] Sort (newest, oldest, title)

### Data Persistence
- [ ] Create trip → Check in MongoDB
- [ ] Update trip → Verify changes in DB
- [ ] Delete trip → Confirm removal from DB
- [ ] Logout → Token invalidated

---

## 🐛 Common Issues

### 401 Unauthorized
- **Cause**: Invalid or expired token
- **Fix**: Login again to get new token

### 404 Not Found
- **Cause**: Wrong trip ID or route
- **Fix**: Check trip ID from MongoDB

### 400 Bad Request
- **Cause**: Invalid data format
- **Fix**: Check required fields and data types

### 500 Server Error
- **Cause**: Backend error
- **Fix**: Check server logs in terminal

---

## 💡 Pro Tips

### 1. Save Token for Testing
```bash
# Login and save token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@wanderlogue.com","password":"demo123"}' \
  | jq -r '.token')

# Use token in subsequent requests
curl -X GET http://localhost:5000/api/trips \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Pretty Print JSON
```bash
curl http://localhost:5000/api/trips \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

### 3. Get Trip ID from MongoDB
```bash
# In MongoDB shell
mongo
> use wanderlogue
> db.trips.find({}, {_id: 1, title: 1})
```

### 4. Watch Server Logs
Keep terminal with backend server visible to see:
- Incoming requests
- Errors
- Database queries

---

## 📚 Additional Resources

- **Postman Documentation**: https://learning.postman.com/
- **MongoDB Compass Guide**: https://docs.mongodb.com/compass/
- **cURL Tutorial**: https://curl.se/docs/manual.html
- **jq (JSON processor)**: https://stedolan.github.io/jq/

---

**Happy Testing! 🧪**
