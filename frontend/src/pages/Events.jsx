import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const url = category
          ? `${API_URL}/events/category/${category}`
          : `${API_URL}/events`;
        const response = await axios.get(url);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {category ? `${category} Events` : 'All Events'}
        </h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search events..."
            className="input input-bordered w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">No events found</h2>
          <p>Try adjusting your search or check back later for new events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-xl">
              {event.image && (
                <figure>
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="mt-2">{event.description.substring(0, 100)}...</p>
                <div className="card-actions justify-end mt-4">
                  <a
                    href={`/events/${event._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events; 