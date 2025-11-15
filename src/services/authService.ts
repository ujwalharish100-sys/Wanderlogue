import api from './api';
import { LoginCredentials, RegisterCredentials, User } from '@features/auth/types';

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authService = {
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', credentials);
    if (data.token) {
      localStorage.setItem('wanderlogue-token', data.token);
    }
    return data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('wanderlogue-token', data.token);
    }
    return data;
  },

  // Get current user
  getMe: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data.user;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('wanderlogue-token');
  },

  // Update profile
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const { data } = await api.put('/auth/profile', profileData);
    return data.user;
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/auth/password', { currentPassword, newPassword });
  },
};
