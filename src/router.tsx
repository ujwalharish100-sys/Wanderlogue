import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { TripListPage } from './features/travel/pages/TripListPage';
import { TripDetailPage } from './features/travel/pages/TripDetailPage';
import { AddTripPage } from './features/travel/pages/AddTripPage';
import { TimelinePage } from './features/travel/pages/TimelinePage';
import { SearchPage } from './features/travel/pages/SearchPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Auth Routes (Public)
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      // Protected Routes
      {
        path: 'trips',
        element: (
          <ProtectedRoute>
            <TripListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trip/:id',
        element: (
          <ProtectedRoute>
            <TripDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-trip',
        element: (
          <ProtectedRoute>
            <AddTripPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'timeline',
        element: (
          <ProtectedRoute>
            <TimelinePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
