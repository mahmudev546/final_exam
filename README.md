# Event Manager Application

A full-stack MERN application for managing events. Users can create, view, update, and delete events, as well as save events they're interested in.

## Features

- User authentication (register, login, logout)
- CRUD operations for events
- Save/unsave events
- Responsive design
- Real-time notifications

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Additional libraries:
  - Frontend: React Router, Zustand, Axios, React Hot Toast
  - Backend: Mongoose, JWT, Bcrypt

## Setup

1. Clone the repository
2. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/event-manager
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

3. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

4. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create new event
- PUT `/api/events/:id` - Update event
- DELETE `/api/events/:id` - Delete event
- POST `/api/events/:id/save` - Save/unsave event

## Environment Variables

### Backend
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `PORT` - Server port (default: 5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 