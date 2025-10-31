# 📰 MERN Blog App

A simple blog web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It allows users to register, log in, create blog posts with images, categorize them, add comments, and view posts with pagination and search filters.

---

## 🚀 Features

- User Authentication (Register, Login, Protected Routes)
- Create, Read, Update, and Delete Blog Posts
- Image Uploads for Featured Images
- Category Filtering and Search
- Pagination for Post List
- Comment System for Blog Posts
- RESTful API using Express and MongoDB

---

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JSON Web Tokens (JWT)  
**Image Uploads:** Multer  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-blog-app.git
cd mern-blog-app
## 2. install dependecies
cd server
npm install
'''
folder structure:
mern-blog-app/
│
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
│   └── package.json
│
├── server/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
