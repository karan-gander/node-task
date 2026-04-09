# 📌 Task Management API (MERN Backend)

A RESTful Task Management API built using **Node.js, Express, and MongoDB**. This project allows users to manage tasks efficiently with secure authentication, filtering, and validation.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* ✅ Create, Read, Update, Delete (CRUD) tasks
* 🗂️ Filter tasks by category
* 🧾 Request validation using Joi
* 🔒 Protected routes (user-specific access)

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Validation:** Joi
* **Authentication:** JWT

---

## 🧾 Validation (Joi)

This project uses **Joi** for request data validation.

**Joi** ensures all incoming API data is valid and structured before reaching the business logic.

It helps to:

* Validate request bodies
* Enforce required fields and data types
* Prevent invalid data from entering the database

---

## 🔑 API Routes

### 👤 User Routes

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/register`     | Register a new user        |
| POST   | `/login`        | Login user                 |
| POST   | `/logout`       | Logout user                |
| POST   | `/currunt-user` | Get current logged-in user |

---

### 📌 Task Routes (Protected)

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/tasks`       | Create a task            |
| GET    | `/tasks`       | Get all tasks            |
| PATCH  | `/tasks`       | Update a task            |
| DELETE | `/tasks`       | Delete a task            |
| POST   | `/delete-many` | Delete multiple tasks    |
| POST   | `/fillter`     | Filter tasks by category |

---

## 🔐 Authentication

Protected routes require JWT.

Add token in headers:

```bash
Authorization: Bearer <your_token>
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## 🧠 Key Implementation Highlights

* JWT-based authentication & protected routes
* Task operations scoped to logged-in users
* Bulk delete using MongoDB `$in` operator
* Filtering tasks by category
* Joi-based request validation

---

## 📌 Future Improvements

* Pagination
* Task status & search filters
* Frontend integration (React)

---

## 👨‍💻 Author

**Karan Gander**
MERN Stack Developer

---

## ⭐ Note for Interviewer

This project demonstrates:

* Secure backend development practices
* Clean API design
* Validation using Joi
* Real-world task management features

The code is structured for scalability and maintainability.
