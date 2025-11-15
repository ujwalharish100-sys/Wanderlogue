# 🚀 Backend Setup Guide - Wanderlogue

Complete guide to set up and run the Node.js + Express + MongoDB backend.

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** - Choose one option:
  - **Option A**: Local MongoDB - [Download](https://www.mongodb.com/try/download/community)
  - **Option B**: MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)
- ✅ **npm** or **yarn** (comes with Node.js)

---

## 🔧 Installation Steps

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

This installs all required packages:
- express, mongoose, bcryptjs, jsonwebtoken
- cors, helmet, morgan, cookie-parser
- express-validator, express-rate-limit
- multer, cloudinary, dotenv

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB

1. **Start MongoDB**
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Or run manually
   mongod
   ```

2. **Verify it's running**
   ```bash
   mongo
   # Should connect to MongoDB shell
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `wanderlogue_user`
   - Password: Generate secure password
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your user's password
   - Replace `<dbname>` with `wanderlogue`

### Step 3: Configure Environment Variables

1. **Copy example env file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file**
   ```bash
   nano .env
   # or use your favorite editor
   ```

3. **Update values**:

   **For Local MongoDB:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/wanderlogue
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:8080
   ```

   **For MongoDB Atlas:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://wanderlogue_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wanderlogue?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:8080
   ```

### Step 4: Seed Database with Demo Data

```bash
npm run seed
```

This creates:
- ✅ Demo user account
- ✅ 6 sample trips with images
- ✅ All necessary data to test the app

**Demo Credentials:**
```
Email: demo@wanderlogue.com
Password: demo123
```

### Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 Wanderlogue API Server                           ║
║                                                        ║
║   Environment: development                            ║
║   Port: 5000                                          ║
║   URL: http://localhost:5000                          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝

✅ MongoDB Connected: localhost
```

---

## ✅ Verify Installation

### Test Health Endpoint

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

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@wanderlogue.com","password":"demo123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "demo@wanderlogue.com",
    "username": "demo_user",
    ...
  }
}
```

---

## 🔗 Connect Frontend to Backend

### Step 1: Update Frontend Environment

In the **root directory** (not server), create/update `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 2: Restart Frontend

```bash
# In root directory
npm start
```

The frontend will now connect to your backend API!

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/password` - Change password (protected)

### Trips
- `GET /api/trips` - Get all trips (protected)
- `GET /api/trips/:id` - Get single trip (protected)
- `POST /api/trips` - Create trip (protected)
- `PUT /api/trips/:id` - Update trip (protected)
- `DELETE /api/trips/:id` - Delete trip (protected)
- `PUT /api/trips/:id/favorite` - Toggle favorite (protected)
- `GET /api/trips/stats` - Get statistics (protected)

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
1. **Local MongoDB**: Make sure MongoDB is running
   ```bash
   # Check if running
   ps aux | grep mongod
   
   # Start if not running
   mongod
   ```

2. **MongoDB Atlas**: 
   - Check connection string is correct
   - Verify IP is whitelisted
   - Ensure user credentials are correct

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:** Change port in `.env`
```env
PORT=5001
```

### JWT Token Errors

**Error:** `JsonWebTokenError: invalid token`

**Solutions:**
1. Make sure `JWT_SECRET` is set in `.env`
2. Clear browser localStorage
3. Login again to get new token

### CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:** Update `CLIENT_URL` in server `.env`
```env
CLIENT_URL=http://localhost:8080
```

### Seed Script Fails

**Error:** `ValidationError` or connection issues

**Solutions:**
1. Drop existing database:
   ```bash
   mongo
   > use wanderlogue
   > db.dropDatabase()
   > exit
   ```

2. Run seed again:
   ```bash
   npm run seed
   ```

---

## 🔒 Security Notes

### Development vs Production

**Current Setup (Development):**
- ⚠️ Allows all CORS origins
- ⚠️ Detailed error messages
- ⚠️ No HTTPS requirement
- ⚠️ Relaxed rate limiting

**For Production:**
1. **Use strong JWT_SECRET**
   ```bash
   # Generate random secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Enable HTTPS**
   - Use SSL certificates
   - Set `secure: true` for cookies

3. **Restrict CORS**
   ```javascript
   cors({
     origin: 'https://your-production-domain.com'
   })
   ```

4. **Environment Variables**
   - Never commit `.env` to git
   - Use environment-specific configs
   - Store secrets securely

---

## 📊 Database Management

### View Data

```bash
# Connect to MongoDB
mongo

# Switch to wanderlogue database
use wanderlogue

# View all users
db.users.find().pretty()

# View all trips
db.trips.find().pretty()

# Count documents
db.trips.countDocuments()
```

### Clear Data

```bash
# Clear all trips
db.trips.deleteMany({})

# Clear all users
db.users.deleteMany({})

# Drop entire database
db.dropDatabase()
```

### Backup Data

```bash
# Export database
mongodump --db wanderlogue --out ./backup

# Import database
mongorestore --db wanderlogue ./backup/wanderlogue
```

---

## 🚀 Deployment

### Recommended Platforms

1. **Railway** - Easiest deployment
   - Automatic MongoDB provisioning
   - Free tier available
   - One-click deploy

2. **Heroku** - Popular choice
   - Use with MongoDB Atlas
   - Free tier available
   - Easy scaling

3. **DigitalOcean** - Full control
   - Droplets for custom setup
   - Managed MongoDB available

4. **AWS/GCP** - Enterprise
   - Full cloud infrastructure
   - Requires more setup

### Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB (Atlas)
- [ ] Set strong `JWT_SECRET`
- [ ] Configure proper CORS
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up logging
- [ ] Test all endpoints
- [ ] Update frontend API URL

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

---

## 🎉 You're All Set!

Your backend is now running and connected to MongoDB!

**Next Steps:**
1. ✅ Backend running on `http://localhost:5000`
2. ✅ Frontend running on `http://localhost:8080`
3. ✅ Login with demo credentials
4. ✅ Create, view, edit, and delete trips
5. ✅ All data persists in MongoDB

**Happy Coding! 🚀**
