import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/${id}`);
        setEvent(response.data);
        if (user) {
          setIsSaved(user.savedEvents.includes(id));
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleSaveEvent = async () => {
    if (!user) {
      toast.error('Please login to save events');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/events/${id}/save`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsSaved(response.data.saved);
      toast.success(response.data.saved ? 'Event saved!' : 'Event removed from saved');
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <p>The event you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          {event.image && (
            <figure>
              <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
            </figure>
          )}
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h1 className="card-title text-3xl">{event.title}</h1>
              <button
                onClick={handleSaveEvent}
                className={`btn btn-ghost ${isSaved ? 'text-primary' : ''}`}
              >
                {isSaved ? 'Saved' : 'Save Event'}
              </button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="badge badge-primary">{event.category}</div>
              <div className="badge badge-secondary">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
              <div className="badge badge-accent">{event.location}</div>
            </div>
            <div className="divider"></div>
            <h2 className="text-xl font-semibold mb-2">About this event</h2>
            <p className="whitespace-pre-line">{event.description}</p>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="font-semibold">{event.createdBy.username}</p>
              </div>
              {user && user._id === event.createdBy._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/events/${id}/edit`)}
                    className="btn btn-primary"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={() => navigate(`/events/${id}/delete`)}
                    className="btn btn-error"
                  >
                    Delete Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 