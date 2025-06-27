import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = ['Music', 'Sports', 'Art', 'Food', 'Technology', 'Business', 'Other'];

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1 className="text-5xl font-bold mb-4">Find Your Next Event</h1>
          <p className="text-xl mb-8">
            Discover and join amazing events happening around you.<br />
            From concerts to workshops, find something that interests you.
          </p>
          <Link to="/events" className="btn btn-primary btn-lg">
            Browse Events
          </Link>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="categories-section">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/events?category=${category}`}
                className="category-button"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="cards-grid">
              {events.slice(0, 6).map((event) => (
                <div key={event._id} className="event-card">
                  {event.image && (
                    <figure>
                      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    </figure>
                  )}
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
          {events.length > 6 && (
            <div className="text-center mt-8">
              <Link to="/events" className="btn btn-primary">
                View All Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 