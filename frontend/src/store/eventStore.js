import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

export const useEventStore = create((set, get) => ({
  events: [],
  event: null,
  loading: false,
  error: null,

  // Fetch all events
  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/events`);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch events', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to fetch events');
    }
  },

  // Fetch single event
  fetchEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_URL}/events/${id}`);
      set({ event: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch event', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to fetch event');
    }
  },

  // Create event
  createEvent: async (eventData) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/events`, eventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({ 
        events: [...state.events, response.data],
        loading: false 
      }));
      toast.success('Event created successfully');
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create event', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to create event');
      return null;
    }
  },

  // Update event
  updateEvent: async (id, eventData) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/events/${id}`, eventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        events: state.events.map(event => 
          event._id === id ? response.data : event
        ),
        event: response.data,
        loading: false
      }));
      toast.success('Event updated successfully');
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update event', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to update event');
      return null;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        events: state.events.filter(event => event._id !== id),
        loading: false
      }));
      toast.success('Event deleted successfully');
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete event', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to delete event');
      return false;
    }
  },

  // Save/unsave event
  toggleSaveEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/events/${id}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.saved ? 'Event saved' : 'Event unsaved');
      return response.data.saved;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to save/unsave event', 
        loading: false 
      });
      toast.error(error.response?.data?.message || 'Failed to save/unsave event');
      return false;
    }
  },

  // Clear error
  clearError: () => set({ error: null })
})); 