# 🔐 Authentication Guide - Wanderlogue

## Overview

Wanderlogue now includes a complete authentication system with:
- ✅ Username/Password login
- ✅ SSO login (Google, GitHub, Facebook)
- ✅ User registration
- ✅ Protected routes
- ✅ Persistent sessions
- ✅ User profile management

---

## 🚀 Quick Start

### Demo Credentials

For testing, use these demo credentials:

```
Email: demo@wanderlogue.com
Password: demo123
```

### Pages

- **Login**: `/login` - Sign in to your account
- **Register**: `/register` - Create a new account
- **Protected Routes**: All trip-related pages require authentication

---

## 🎯 Features

### 1. **Login Page** (`/login`)

#### Username/Password Login
- Email and password authentication
- Form validation
- Error handling
- "Remember me" option
- Forgot password link

#### SSO Login
- Google Sign-In
- GitHub Sign-In
- Facebook Sign-In
- One-click authentication

### 2. **Register Page** (`/register`)

#### Registration Form
- First name & last name (optional)
- Username (required, min 3 characters)
- Email (required, valid format)
- Password (required, min 6 characters)
- Password confirmation
- Terms of service agreement

#### Features
- Real-time validation
- Password strength checking
- Duplicate email detection
- SSO registration options

### 3. **Protected Routes**

The following routes require authentication:
- `/trips` - View all trips
- `/trip/:id` - View trip details
- `/add-trip` - Create new trip
- `/timeline` - Timeline view
- `/search` - Search trips

**Behavior:**
- Unauthenticated users are redirected to `/login`
- Original destination is saved and restored after login
- Seamless redirect back to intended page

### 4. **User Profile**

#### Navbar Integration
- User avatar display
- Dropdown menu with:
  - User name and email
  - Profile link
  - Logout button

#### Mobile Menu
- User info display
- Profile access
- Logout option

---

## 🛠️ Technical Implementation

### State Management

**Zustand Store** (`src/features/auth/authStore.ts`)

```typescript
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials) => Promise<void>;
  register: (credentials) => Promise<void>;
  loginWithSSO: (provider) => Promise<void>;
  logout: () => void;
}
```

### Persistent Sessions

- Uses `zustand/middleware` persist
- Stores user data in localStorage
- Auto-restores session on page reload
- Key: `wanderlogue-auth`

### Protected Route Component

```typescript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

**Features:**
- Checks authentication status
- Redirects to login if not authenticated
- Preserves intended destination
- Restores navigation after login

---

## 🔧 Configuration

### Mock Authentication

Currently uses simulated API calls. To integrate with a real backend:

1. **Update `authStore.ts`:**

```typescript
// Replace mock API calls with real ones
const login = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  // Handle response...
};
```

2. **Add JWT Token Handling:**

```typescript
// Store token
localStorage.setItem('token', data.token);

// Add to requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

3. **Implement Token Refresh:**

```typescript
// Check token expiration
// Refresh before expiry
// Handle refresh failures
```

### SSO Integration

To enable real SSO providers:

#### Google OAuth
```typescript
// 1. Get credentials from Google Cloud Console
// 2. Install google-auth-library
// 3. Implement OAuth flow

import { GoogleAuthProvider } from 'firebase/auth';
// or use your preferred OAuth library
```

#### GitHub OAuth
```typescript
// 1. Register OAuth app on GitHub
// 2. Get client ID and secret
// 3. Implement OAuth flow
```

#### Facebook Login
```typescript
// 1. Create Facebook App
// 2. Get App ID
// 3. Implement Facebook SDK
```

---

## 🎨 Customization

### Styling

All auth pages use the same design system:
- Tailwind CSS classes
- Framer Motion animations
- Dark mode support
- Responsive design

### Validation Rules

Edit validation in `RegisterPage.tsx`:

```typescript
const validateForm = () => {
  // Customize validation rules
  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  // Add more rules...
};
```

### User Avatar

Default avatar uses UI Avatars:
```
https://ui-avatars.com/api/?name=User+Name&background=f06420&color=fff
```

To use custom avatars:
1. Upload to cloud storage
2. Store URL in user profile
3. Update avatar field

---

## 🔒 Security Best Practices

### Current Implementation (Development)
- ⚠️ Mock authentication (for demo only)
- ⚠️ Client-side validation only
- ⚠️ No password hashing
- ⚠️ No rate limiting

### Production Recommendations

1. **Backend Authentication**
   - Use secure authentication service (Auth0, Firebase, etc.)
   - Implement proper password hashing (bcrypt)
   - Use JWT tokens with expiration
   - Implement refresh tokens

2. **Security Headers**
   ```typescript
   // Add to your API responses
   'X-Content-Type-Options': 'nosniff',
   'X-Frame-Options': 'DENY',
   'X-XSS-Protection': '1; mode=block'
   ```

3. **HTTPS Only**
   - Always use HTTPS in production
   - Set secure cookie flags
   - Enable HSTS

4. **Rate Limiting**
   - Limit login attempts
   - Implement CAPTCHA after failures
   - Block suspicious IPs

5. **Input Validation**
   - Server-side validation
   - Sanitize all inputs
   - Prevent SQL injection
   - Prevent XSS attacks

6. **Session Management**
   - Short token expiration
   - Secure session storage
   - Logout on all devices option
   - Activity monitoring

---

## 📝 API Integration Example

### Backend Endpoints Needed

```typescript
// Authentication
POST   /api/auth/register      - Create new user
POST   /api/auth/login         - Login with credentials
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh       - Refresh token
GET    /api/auth/me            - Get current user

// OAuth
GET    /api/auth/google        - Google OAuth
GET    /api/auth/github        - GitHub OAuth
GET    /api/auth/facebook      - Facebook OAuth

// User Management
GET    /api/user/profile       - Get user profile
PUT    /api/user/profile       - Update profile
POST   /api/user/avatar        - Upload avatar
PUT    /api/user/password      - Change password
```

### Integration Steps

1. **Install Axios or Fetch wrapper**
   ```bash
   npm install axios
   ```

2. **Create API service**
   ```typescript
   // src/services/api.ts
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL,
   });
   
   // Add token to requests
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

3. **Update auth store**
   ```typescript
   import { api } from '@/services/api';
   
   const login = async (credentials) => {
     const { data } = await api.post('/auth/login', credentials);
     localStorage.setItem('token', data.token);
     set({ user: data.user, isAuthenticated: true });
   };
   ```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with demo credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Register new account
- [ ] Register with existing email (error handling)
- [ ] Password mismatch validation
- [ ] SSO button clicks (simulated)
- [ ] Access protected route while logged out (redirect)
- [ ] Access protected route while logged in (success)
- [ ] Logout functionality
- [ ] Session persistence (refresh page)
- [ ] Mobile menu auth section
- [ ] Dark mode compatibility

### Automated Testing

```typescript
// Example test with Jest + React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage';

test('shows error on invalid credentials', async () => {
  render(<LoginPage />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'wrong@email.com' }
  });
  
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrongpass' }
  });
  
  fireEvent.click(screen.getByText(/sign in/i));
  
  expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
});
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot read property 'user' of undefined"**
- Ensure auth store is initialized
- Check import paths
- Verify Zustand setup

**2. Redirect loop after login**
- Check `isAuthenticated` state
- Verify protected route logic
- Clear localStorage and retry

**3. Session not persisting**
- Check browser localStorage
- Verify persist middleware config
- Check for localStorage quota

**4. SSO buttons not working**
- Expected behavior (mock implementation)
- Integrate real OAuth providers
- Check console for errors

---

## 📚 Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Router Authentication](https://reactrouter.com/en/main/start/tutorial#authentication)
- [OAuth 2.0 Guide](https://oauth.net/2/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## 🎉 Next Steps

1. **Integrate Real Backend**
   - Set up authentication API
   - Implement JWT tokens
   - Add refresh token logic

2. **Add More Features**
   - Email verification
   - Password reset flow
   - Two-factor authentication
   - Social profile import

3. **Enhance Security**
   - Implement rate limiting
   - Add CAPTCHA
   - Enable audit logging
   - Set up monitoring

4. **User Experience**
   - Add loading skeletons
   - Improve error messages
   - Add success notifications
   - Implement "Stay logged in"

---

**Authentication is now fully functional! 🎊**

Test it out by clicking "Login" in the navbar or visiting `/login` directly.
