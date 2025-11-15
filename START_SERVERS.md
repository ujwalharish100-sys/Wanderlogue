# 🚀 Quick Start - Both Servers

## Start Everything

### Terminal 1: Start Backend

```bash
# Navigate to server directory
cd server

# Start backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

---

### Terminal 2: Start Frontend

```bash
# In root directory
npm start
```

**Frontend will run on:** `http://localhost:8080`

---

## One-Command Start (Optional)

You can also use these commands to start both servers:

### Option 1: Using npm-run-all (recommended)

First install:
```bash
npm install --save-dev npm-run-all
```

Add to root `package.json`:
```json
"scripts": {
  "dev": "npm-run-all --parallel dev:*",
  "dev:server": "cd server && npm run dev",
  "dev:client": "npm start"
}
```

Then run:
```bash
npm run dev
```

### Option 2: Using concurrently

First install:
```bash
npm install --save-dev concurrently
```

Add to root `package.json`:
```json
"scripts": {
  "dev": "concurrently \"cd server && npm run dev\" \"npm start\""
}
```

Then run:
```bash
npm run dev
```

---

## Before Starting

### 1. Make sure MongoDB is running

```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start it
mongod
```

### 2. Seed the database (first time only)

```bash
cd server
npm run seed
```

---

## Demo Credentials

```
Email: demo@wanderlogue.com
Password: demo123
```

---

## Troubleshooting

### Port Already in Use

**Frontend (8080):**
```bash
lsof -ti:8080 | xargs kill -9
```

**Backend (5000):**
```bash
lsof -ti:5000 | xargs kill -9
```

### MongoDB Not Running

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run manually
mongod
```

### Clear and Reseed Database

```bash
cd server
npm run seed
```

---

**Happy Coding! 🎉**
