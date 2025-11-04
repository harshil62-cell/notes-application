# Notes Application API

This is a backend API for a secure online notes application, built with Node.js, Express, and MongoDB. It provides user authentication using JWT and a full set of CRUD operations for managing notes.

# Features

User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

CRUD Operations: Create, Read, Update, and Delete notes.

Note Management:

Pinning: Mark important notes to keep them at the top.

Archiving: Move notes to an archive to declutter the main view.

Search: Full-text search capability to find notes by keywords in their title or content.

Validation: Server-side validation for all incoming data to ensure integrity.

Security: Password hashing with bcrypt and protected routes for all note-related actions.

# Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JSON Web Tokens (JWT)

Validation: express-validator

Security: bcrypt

Environment Variables: dotenv

# Installation & Setup

Follow these steps to get the project running locally.

1. Prerequisites

Node.js (v18 or later recommended)

MongoDB (running locally or a remote URI)

2. Clone the Repository

git clone
cd notes-application



3. Install Dependencies

npm install



4. Set Up Environment Variables

Create a file named .env in the root of your project and add the following variables:

# Port for the server to run on
PORT=5001

# Your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/notesdb

# A strong, random string for signing JWTs
ACCESS_TOKEN_SECRET=your_super_secret_key_here



5. Run the Server

For development (with nodemon, if set up):

npm run dev



For production:

npm start



The server will be running at http://localhost:5000.
