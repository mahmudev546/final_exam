import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user, token } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const [myEventsResponse, savedEventsResponse] = await Promise.all([
          axios.get(`${API_URL}/events`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { createdBy: user._id },
          }),
          axios.get(`${API_URL}/events`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { saved: true },
          }),
        ]);
        setEvents(myEventsResponse.data);
        setSavedEvents(savedEventsResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user._id, token]);

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/events/create" className="btn btn-primary">
          Create New Event
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* My Events */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">My Events</h2>
            {events.length === 0 ? (
              <p>You haven't created any events yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={`/events/${event._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/events/${event._id}/edit`}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Events */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Saved Events</h2>
            {savedEvents.length === 0 ? (
              <p>You haven't saved any events yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedEvents.map((event) => (
                  <div key={event._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={`/events/${event._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 