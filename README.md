## Project Overview

The Smart Daycare Management System is a web-based application that helps improve communication and management within a daycare center. It allows administrators to manage users, caregivers to create daily progress reports for children, and parents to securely view their child's activities and development. The system is built using Node.js, Express.js, MySQL, HTML, CSS, and JavaScript, following the MVC architecture to ensure a secure, organized, and user-friendly experience.

## Features

- **Role-based authentication** (Admin, Caregiver, Parent) with JWT and bcrypt password hashing
- **Child management** with parent-child relationships
- **Attendance tracking** with check-in/check-out times
- **Daily progress reports** (mood, meals, naps, activities, teacher comments)
- **Payment tracking** for tuition
- **Announcements** targeted by role
- **Parent Dashboard** — view children, attendance, reports, payments, and announcements in one call
- **Caregiver Dashboard** — view assigned children and mark attendance
- **Frontend** — Home, About, Login, and Register pages (HTML/CSS/JavaScript)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (mysql2)
- **Auth:** bcrypt, jsonwebtoken (JWT)
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Environment config:** dotenv
 
## Features

- **Role-based authentication** (Admin, Caregiver, Parent) with JWT and bcrypt password hashing
- **Child management** with parent-child relationships
- **Attendance tracking** with check-in/check-out times
- **Daily progress reports** (mood, meals, naps, activities, teacher comments)
- **Payment tracking** for tuition
- **Announcements** targeted by role
- **Parent Dashboard** — view children, attendance, reports, payments, and announcements in one call
- **Caregiver Dashboard** — view assigned children and mark attendance
- **Frontend** — Home, About, Login, and Register pages (HTML/CSS/JavaScript)

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (mysql2)
- **Auth:** bcrypt, jsonwebtoken (JWT)
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Environment config:** dotenv

## Project Structure
├── config/           # Database connection setup
├── controllers/       # Route logic (auth, reports, parent, caregiver)
├── middleware/         # JWT verification middleware
├── model/              # Database models (users, children, reports)
├── routes/              # Express route definitions
├── public/              # Frontend files (HTML, CSS, JS)
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js     
