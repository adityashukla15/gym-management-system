# Gym Management System Backend 🚀

A complete backend system for managing a gym using **Node.js**, **Express.js**, and **MongoDB** with secure authentication, role-based access control, membership management, payment workflow, trainer attendance tracking, dashboards, cron jobs, and aggregation pipelines.
  
## 🌐 Live Demo

## 🌐 Live Demo

[🚀 Gym Management System API](https://gym-management-system-1-stwz.onrender.com)

---

# 📌 Features

## 🔐 Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout with Token Blacklisting
- Role-Based Access Control
  - Admin
  - Trainer
  - Member

---

## 👥 Member Management
- Create Member
- Update Member
- Delete Member
- Get All Members
- Get Single Member
- Buy Membership Plans
- Membership Expiry Handling

---

## 📦 Plans Management
- Admin can create gym plans
- Monthly / Quarterly / Yearly plans
- Plan pricing & duration
- Active membership assignment

---

## 💳 Payment System
- Create Payment
- Payment Status Update
- Payment History
- Pending / Success / Failed Payments
- Automatic Membership Activation after Successful Payment

---

## 👨‍🏫 Trainer Attendance System
- Trainer Attendance Marking
- Duplicate Attendance Prevention
- Daily Attendance Tracking

---

## 📊 Dashboards

### 👤 User Dashboard
- Active Plan
- Membership Status
- Days Left
- Last Payment

### 👨‍🏫 Trainer Dashboard
- Total Attendance
- Present Count
- Last Attendance
- Today's Attendance Status

### 👑 Admin Dashboard
- Total Users
- Total Members
- Total Revenue
- Attendance Analytics
- Active Memberships

---

## ⚡Automation
- Cron Job for Automatic Membership Expiry
- Expired Members become inactive automatically

---

# 🔥MongoDB Features Used
- Mongoose Schemas
- References & Populate
- Aggregation Pipelines
- Indexing
- Query Operators (`$lt`, `$gte`, `$group`, `$lookup`)

---

# 🛠️Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcrypt

## Other Packages
- node-cron
- cookie-parser
- dotenv
- nodemailer

---

# 📂 Project Structure

```bash
src/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── cron/
├── config/
│
├── app.js
└── server.js
```
---

# ⚙️ Installation & Setup

**1️⃣ Clone Repository**

```bash
git clone <your-github-link>
```

**2️⃣Install Dependencies**:

```bash
npm install
```

**3️⃣Create .env File**:

```bash
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

**4️⃣Run Server**

```bash
npm run dev
```

## 🔑API ROUTES

**🔐AUTH ROUTES**:
* POST /api/users/register
* POST /api/users/login
* GET /api/users/logout

**📦PLAN ROUTES**:
* POST /api/plans/create
* GET /api/plans
* GET /api/plans/:id
* PUT /api/plans/:id
* DELETE /api/plans/:id

**👥MEMBER ROUTES**:
* POST /api/members/create
* GET /api/members
* GET /api/members/:id
* PUT /api/members/:id
* DELETE /api/members/:id

* POST /api/members/buy-plan
* GET /api/members/my-membership

**💳PAYMENT ROUTES**:
* POST /api/payments/create
* PUT /api/payments/update-status
* GET /api/payments/history

**👨‍🏫ATTENDANCE ROUTES**:
* POST /api/attendance/mark

**📊DASHBOARD ROUTES**:
* GET /api/dashboard/user
* GET /api/dashboard/trainer
* GET /api/dashboard/admin
* GET /api/dashboard/attendance-admin

## 🔐 ROLES AND PERMISSIONS:

**Admin**
Full access to all features

**Trainer**
Attendance management and trainer dashboard access

**Member**
Membership access and user dashboard access

## 🧠FEATURES AND CONCEPTS IMPLEMENTED

* JWT Authentication
* Middleware for security
* Role-based authorization
* MongoDB relationships (Population)
* Aggregation pipelines
* Cron jobs for automation
* Centralized error handling
* MVC architecture

## 📈AGGREGATION PIPELINES USED

* Attendance analytics
* Revenue calculations
* Dashboard statistics
* Trainer attendance performance

## 🚀 FUTURE IMPROVEMENTS

* Razorpay or Stripe payment gateway integration
* React frontend development
* Workout management system
* Diet plan system
* Session booking feature
* Email notification system
*  File upload system


## 👨‍💻AUTHOR

Developed by Aditya Shukla
