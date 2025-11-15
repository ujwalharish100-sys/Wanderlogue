import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials, SSOProvider } from './types';
import { authService } from '@/services/authService';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginWithSSO: (provider: SSOProvider) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || error.message || 'Login failed',
            isLoading: false,
          });
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // Validate passwords match
          if (credentials.password !== credentials.confirmPassword) {
            throw new Error('Passwords do not match');
          }

          const response = await authService.register(credentials);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || error.message || 'Registration failed',
            isLoading: false,
          });
        }
      },

      loginWithSSO: async (provider: SSOProvider) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Implement real SSO authentication
          // For now, show a message that SSO is not yet configured
          throw new Error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} SSO is not yet configured. Please use email/password login.`);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || error.message || 'SSO login failed',
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: async () => {
        try {
          const user = await authService.getMe();
          set({ user, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'wanderlogue-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
