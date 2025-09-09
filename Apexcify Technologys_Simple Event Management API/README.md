# Simple Event Management API

This repository hosts the **Simple Event Management API**, developed during my internship at **Apexcify Technology**. The API serves as a backend solution for managing events, providing functionalities such as event creation, updates, and deletion.

## 🚀 Features

- **Event Management:** Create, update, and delete events.
- **User Authentication:** Secure user login and registration.
- **Role-Based Access Control:** Differentiate access levels for users.
- **Data Validation:** Ensure data integrity and consistency.

## 🛠️ Technologies Used

- **Node.js:** JavaScript runtime for building the API.
- **Express.js:** Web framework for building the API.
- **MongoDB:** NoSQL database for storing event and user data.
- **Mongoose:** ODM for MongoDB to model data.
- **JWT:** JSON Web Tokens for secure authentication.
- **Bcrypt.js:** Library for hashing passwords.

## 📁 Project Structure

```
/Simple-Event-Management-API
│
├── /config             # Configuration files
├── /controllers        # Route handlers
├── /models             # Mongoose models
├── /routes             # API routes
├── /middleware         # Custom middleware
├── /utils              # Utility functions
├── server.js           # Entry point of the application
└── .env                # Environment variables
```

## ⚙️ Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amirali729/Apexcify-Technologys-Projects.git
   cd Apexcify-Technologys-Projects/Apexcify Technologys_Simple Event Management API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```



3. **Start the server:**

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:5000`.

## 📚 API Documentation

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login an existing user.

### Events

- **GET** `/api/events`: Retrieve all events.
- **POST** `/api/events`: Create a new event.
- **PUT** `/api/events/:id`: Update an existing event.
- **DELETE** `/api/events/:id`: Delete an event.

### Middleware

- **authMiddleware:** Verifies JWT token and attaches user info to the request object.
- **authorize:** Ensures only admin users can access certain routes.

## 🧪 Testing

To test the API endpoints, you can use tools like [Postman](https://www.postman.com/). Ensure that you include the JWT token in the Authorization header for protected routes.

## 📌 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

