import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Login user
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, loading: false });
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, loading: false });
      toast.success('Registered successfully');
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
    toast.success('Logged out successfully');
  },

  // Check authentication status
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ user: null, isAuthenticated: false });
        return;
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null })
})); 