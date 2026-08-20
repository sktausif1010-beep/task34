# Task 34 - Schema Reference

## About

This project demonstrates how to reference one Mongoose schema from another.
The project contains an Express.js backend with MongoDB and a React frontend.

## Features
- Connect Express.js with MongoDB using Mongoose
- Create users
- Create posts
- Reference User schema inside Post schema
- Retrieve posts with user information using populate()
- React forms for adding users and posts
- Display posts with user details

## Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- CSS
- Vite

## API Routes

### POST /users

Creates a new user.

### POST /posts

Creates a new post linked to a user.

### GET /posts

Gets all posts with user information populated.

## How to Run

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

## Author

**Shaikh Tausif**
