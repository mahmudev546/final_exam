import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="w-full bg-white shadow-md">
      <div className="navbar container-custom">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/events" className="nav-link">Events</Link></li>
              {user && <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
            </ul>
          </div>
          <Link to="/" className="text-xl font-bold text-blue-600">EventHub</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/events" className="nav-link">Events</Link></li>
            {user && <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-gray-700">Welcome, {user.username}</span>
              <button onClick={logout} className="btn btn-ghost text-gray-700 hover:text-blue-600">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="auth-button">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar; 