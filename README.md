
# KanbanFlow

This is a starter app for KanbanFlow, a project management tool built with a MERN stack (MongoDB, Express, React, Node.js). It includes authentication features to help you get started with a Single Page Application (SPA) workflow.

## Features

This starter app includes the following features:

### Backend API
- Backend API built with Express and MongoDB.
- Routes for authentication, logout, registration, profile management, and profile updates.
- JWT (JSON Web Token) authentication with token storage in HTTP-only cookies.
- Protected routes and endpoints to secure your application.
- Custom middleware for checking JSON web tokens and storing them in cookies.
- Custom error middleware for handling errors gracefully.

### React Frontend
- A React-based frontend for registering, logging in, logging out, viewing user profiles, and updating profiles.
- Styled with Tailwind CSS for a clean, modern, and responsive user interface.
- Integration with React Query for data fetching and synchronization.
- State management on the frontend with Zustand.

### Notifications
- Integration with React Toastify for user notifications.

## Usage

To get started with KanbanFlow Authentication Starter:

### Set Up Your Environment

1. Create a MongoDB database and obtain your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Rename the `.env.example` file to `.env` in the backend directory and add the following environment variables:

   ```plaintext
   NODE_ENV = development
   PORT = 5000
   MONGO_URI = your-mongodb-uri
   JWT_SECRET = 'abc123'
   ```

   Make sure to change the values for `MONGO_URI` and `JWT_SECRET` to your actual credentials.

### Install Dependencies

Install backend and frontend dependencies separately:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Run the Application

To run the backend server:

```bash
# Run backend server (:5000)
cd backend
npm run server
```

To run the frontend:

```bash
# Run frontend (:3000)
cd frontend
npm start
```

### Build & Deploy

To create a production build of the frontend:

```bash
# Create frontend production build
cd frontend
npm run build
```

This KanbanFlow Authentication Starter will help you kickstart your MERN stack project with authentication, Tailwind CSS, React Query, and Zustand for state management on the frontend. Customize it to fit your project's specific needs and build amazing applications!
