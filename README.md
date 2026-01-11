
---

# **Task Management System**

## **Project Overview**

This is a simple Task Management System built for internship assignment purposes.

* **Backend:** Node.js + Express, MongoDB
* **Frontend:** React.js (with internal CSS)
* **Features:**

  * User registration & login with **JWT authentication**
  * **Role-based access:** Admin vs User
  * CRUD operations for tasks
  * Admin tasks visible to all users
  * Add/Delete tasks (Admin only)
  * Dashboard shows logged-in **role**
  * Internal CSS for basic styling

---

## **Tech Stack**

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT for authentication
* Bcrypt for password hashing

### **Frontend**

* React.js
* Axios for API calls
* Internal CSS for styling

---

## **Setup Instructions**

### **Backend**

1. Clone the repository:

```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

4. Start the server:

```bash
npm run dev
```

* Backend runs on `http://localhost:5000`
* API base route: `/api/v1`

---

### **Frontend**

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

* Frontend runs on `http://localhost:5173` (Vite default)

---

## **API Endpoints (Backend)**

### **Auth**

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | /api/v1/auth/register | Register a new user     |
| POST   | /api/v1/auth/login    | Login and get JWT token |

### **Tasks**

| Method | Endpoint          | Access     | Description                    |
| ------ | ----------------- | ---------- | ------------------------------ |
| GET    | /api/v1/tasks     | User/Admin | Get all tasks (admin sees all) |
| POST   | /api/v1/tasks     | User/Admin | Create a task                  |
| DELETE | /api/v1/tasks/:id | Admin only | Delete a task                  |

---

## **Frontend Pages**

### **Login**

* Login using email & password
* Redirects to **Dashboard** on success

### **Register**

* Register new users
* Alerts on success or failure

### **Dashboard**

* Displays logged-in **role**
* Shows tasks (admin tasks highlighted)
* Add new tasks
* Admin can delete tasks

---

## **Project Structure**

```
backend/
│  controllers/
│  models/
│  routes/
│  middlewares/
│  app.js
│  server.js
│  .env
frontend/
│  src/
│    api/
│    pages/
│      Login.jsx
│      Register.jsx
│      Dashboard.jsx
│  main.jsx
│  package.json
```

---

## **Scalability & Security Notes**

* JWT ensures **stateless authentication**
* Role-based middleware ensures **access control**
* Password hashing using bcrypt
* Modular structure allows **easy addition of new modules**
---

## **Usage Instructions**

1. Register a new user
2. Login to get JWT
3. Access Dashboard:

   * Normal user sees own tasks + admin tasks
   * Admin sees all tasks and can delete
4. Add new tasks from dashboard input

---

## **Author**

* Dhiraj Salnuke
* Internship Task Submission
