# 🗄️ MongoDB Compass Guide - Wanderlogue

Step-by-step guide to explore your data using MongoDB Compass.

---

## 🚀 Quick Start

### Step 1: Open MongoDB Compass

If not installed:
```bash
# macOS
brew install --cask mongodb-compass

# Or download: https://www.mongodb.com/try/download/compass
```

### Step 2: Connect to Database

1. **Launch MongoDB Compass**

2. **Connection String:**
   ```
   mongodb://localhost:27017
   ```

3. **Click "Connect"** (green button)

---

## 📊 Exploring Your Data

### View Databases

After connecting, you'll see:
```
├── admin
├── config
├── local
└── wanderlogue  ← Your app database
```

### Click on `wanderlogue` Database

You'll see 2 collections:
```
wanderlogue
├── users   (1 document)
└── trips   (6 documents)
```

---

## 👥 Users Collection

### View Users

1. **Click on `users` collection**

2. **You'll see:**
   ```json
   {
     "_id": ObjectId("..."),
     "email": "demo@wanderlogue.com",
     "username": "demo_user",
     "password": "$2a$10$...",  // Hashed password
     "firstName": "Demo",
     "lastName": "User",
     "avatar": "https://ui-avatars.com/...",
     "provider": "local",
     "role": "user",
     "isActive": true,
     "createdAt": ISODate("..."),
     "updatedAt": ISODate("...")
   }
   ```

### User Fields Explained

- **`_id`**: Unique MongoDB identifier
- **`email`**: User's email (unique)
- **`username`**: Username (unique)
- **`password`**: Bcrypt hashed password (never plain text!)
- **`provider`**: Authentication method (local, google, github, facebook)
- **`role`**: User role (user, admin)
- **`isActive`**: Account status
- **`createdAt/updatedAt`**: Timestamps

---

## ✈️ Trips Collection

### View Trips

1. **Click on `trips` collection**

2. **You'll see 6 sample trips:**
   - Magical Kyoto
   - Swiss Alps Adventure
   - Santorini Sunsets
   - Iceland Road Trip
   - Bali Retreat
   - New York City Vibes

### Trip Document Structure

```json
{
  "_id": ObjectId("..."),
  "user": ObjectId("..."),  // Reference to user
  "title": "Magical Kyoto",
  "destination": "Kyoto, Japan",
  "startDate": ISODate("2023-03-15T00:00:00.000Z"),
  "endDate": ISODate("2023-03-22T00:00:00.000Z"),
  "description": "Explored ancient temples...",
  "story": "# Discovering Kyoto\n\n...",
  "coverImage": "https://images.unsplash.com/...",
  "media": [
    {
      "type": "image",
      "url": "https://...",
      "caption": "Fushimi Inari Shrine",
      "_id": ObjectId("...")
    }
  ],
  "tags": ["japan", "culture", "temples"],
  "isFavorite": true,
  "isPublic": false,
  "views": 0,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

### Trip Fields Explained

- **`user`**: ObjectId reference to the user who created it
- **`title`**: Trip name
- **`destination`**: Location
- **`startDate/endDate`**: Trip dates
- **`description`**: Short summary
- **`story`**: Full story (supports Markdown)
- **`coverImage`**: Main photo URL
- **`media`**: Array of photos/videos
- **`tags`**: Array of keywords
- **`isFavorite`**: Favorite status
- **`views`**: View counter

---

## 🔍 Querying Data

### Filter Tab

Click on "Filter" at the top to query data.

#### Find Favorite Trips
```json
{ "isFavorite": true }
```

#### Find Trips by Destination
```json
{ "destination": "Kyoto, Japan" }
```

#### Find Trips by Tag
```json
{ "tags": "japan" }
```

#### Find Trips in 2023
```json
{
  "startDate": {
    "$gte": { "$date": "2023-01-01T00:00:00.000Z" },
    "$lt": { "$date": "2024-01-01T00:00:00.000Z" }
  }
}
```

#### Find Trips by User
```json
{ "user": ObjectId("YOUR_USER_ID_HERE") }
```

#### Search in Title or Destination
```json
{
  "$or": [
    { "title": { "$regex": "kyoto", "$options": "i" } },
    { "destination": { "$regex": "kyoto", "$options": "i" } }
  ]
}
```

---

## ✏️ Editing Data

### Edit a Document

1. **Hover over a document**
2. **Click the pencil icon** (Edit Document)
3. **Modify fields**
4. **Click "Update"**

### Example: Toggle Favorite

1. Find a trip
2. Click edit
3. Change `"isFavorite": false` to `"isFavorite": true`
4. Click Update
5. Refresh frontend to see change!

---

## ➕ Adding Data

### Add New Trip Manually

1. **Click "Add Data" button**
2. **Select "Insert Document"**
3. **Paste JSON:**

```json
{
  "user": ObjectId("YOUR_USER_ID"),
  "title": "Test Trip",
  "destination": "Test City",
  "startDate": { "$date": "2024-07-01T00:00:00.000Z" },
  "endDate": { "$date": "2024-07-05T00:00:00.000Z" },
  "description": "A test trip",
  "story": "Test story",
  "coverImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
  "media": [],
  "tags": ["test"],
  "isFavorite": false,
  "isPublic": false,
  "views": 0,
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" },
  "updatedAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

4. **Click "Insert"**

---

## 🗑️ Deleting Data

### Delete a Single Document

1. **Hover over document**
2. **Click trash icon**
3. **Confirm deletion**

### Delete Multiple Documents

1. **Use Filter to find documents**
2. **Click "Delete" button**
3. **Confirm**

### Delete All Trips

**Filter:**
```json
{}
```
Then click "Delete Documents"

---

## 📈 Aggregations

### Count Trips by Year

1. **Click "Aggregations" tab**
2. **Add pipeline stages:**

```json
[
  {
    "$group": {
      "_id": { "$year": "$startDate" },
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "_id": -1 }
  }
]
```

### Count Trips by Tag

```json
[
  { "$unwind": "$tags" },
  {
    "$group": {
      "_id": "$tags",
      "count": { "$sum": 1 }
    }
  },
  { "$sort": { "count": -1 } }
]
```

### Get Favorite Trips with User Info

```json
[
  { "$match": { "isFavorite": true } },
  {
    "$lookup": {
      "from": "users",
      "localField": "user",
      "foreignField": "_id",
      "as": "userInfo"
    }
  },
  { "$unwind": "$userInfo" },
  {
    "$project": {
      "title": 1,
      "destination": 1,
      "userName": "$userInfo.username"
    }
  }
]
```

---

## 🔄 Real-Time Testing

### Watch Changes Live

1. **Keep MongoDB Compass open**
2. **Open your app** in browser
3. **Perform actions:**
   - Create a trip
   - Toggle favorite
   - Delete a trip
4. **Click refresh** in Compass (circular arrow icon)
5. **See changes immediately!**

### Example Workflow

1. **In Browser**: Login → Add Trip
2. **In Compass**: Refresh `trips` collection
3. **Result**: New document appears!

---

## 📊 Schema View

### Analyze Your Data

1. **Click "Schema" tab**
2. **Click "Analyze Schema"**
3. **See:**
   - Field types
   - Value distributions
   - Data patterns

### Useful for:
- Understanding data structure
- Finding data inconsistencies
- Validating field types

---

## 🔧 Indexes

### View Indexes

1. **Click "Indexes" tab**
2. **See existing indexes:**
   - `_id_` (default)
   - `user_1_startDate_-1`
   - `user_1_isFavorite_1`
   - Text indexes for search

### Why Indexes Matter:
- ⚡ Faster queries
- 🎯 Efficient filtering
- 📈 Better performance

---

## 💡 Pro Tips

### 1. Use Favorites
- Save frequently used queries
- Click star icon to favorite a filter

### 2. Export Data
- Click "Export" to save as JSON/CSV
- Useful for backups

### 3. Import Data
- Click "Import" to load data from file
- Supports JSON, CSV

### 4. Clone Documents
- Click "Clone" icon to duplicate
- Useful for creating similar entries

### 5. View as JSON/Table
- Toggle between views
- JSON for detailed view
- Table for quick scanning

---

## 🐛 Troubleshooting

### Can't Connect
- **Check MongoDB is running:**
  ```bash
  ps aux | grep mongod
  ```
- **Start MongoDB:**
  ```bash
  mongod
  ```

### Database Not Showing
- **Refresh** the connection
- **Check database name** is `wanderlogue`
- **Reseed database:**
  ```bash
  cd server
  npm run seed
  ```

### No Documents in Collection
- **Run seed script** to populate data
- **Check filters** - clear all filters

---

## 📚 Useful Queries Cheat Sheet

```javascript
// Find all
{}

// Find by ID
{ "_id": ObjectId("...") }

// Find favorites
{ "isFavorite": true }

// Find by year
{ "startDate": { "$gte": ISODate("2023-01-01"), "$lt": ISODate("2024-01-01") } }

// Find by tag
{ "tags": "japan" }

// Find multiple tags
{ "tags": { "$in": ["japan", "culture"] } }

// Text search
{ "$text": { "$search": "kyoto" } }

// Count documents
// Use Aggregations: [{ "$count": "total" }]

// Sort by date (newest first)
// Use Sort: { "startDate": -1 }

// Limit results
// Use Options: Limit: 5
```

---

## 🎓 Learning Resources

- **MongoDB Compass Docs**: https://docs.mongodb.com/compass/
- **MongoDB Query Docs**: https://docs.mongodb.com/manual/tutorial/query-documents/
- **Aggregation Pipeline**: https://docs.mongodb.com/manual/aggregation/

---

**Happy Exploring! 🗄️**
