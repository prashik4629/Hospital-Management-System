# Hospital Management System 🏥

A full-stack Hospital Management System built using:

- Frontend: React.js + Axios + React Router
- Backend: Spring Boot + Spring Data JPA
- Database: MySQL
- Deployment: Vercel (Frontend) + Render (Backend)

---

# 🌐 Live Demo

## Frontend (Vercel)
https://hospital-management-system-swart-phi.vercel.app/

## Backend API (Render)
https://hospital-management-system-82hn.onrender.com

---

# 🚀 Features

## 👨‍⚕️ Doctors Management
- Add doctors
- View doctors
- Delete doctors
- Store doctor specialization

## 🧑 Patients Management
- Add patients
- View patients
- Delete patients
- Store disease and doctor details

## 📅 Appointment Management
- Book appointments
- View appointments
- Delete appointments
- Appointment status:
  - PENDING
  - CONFIRMED
  - COMPLETED
  - CANCELLED

## ⚡ Smart Appointment Conflict Detection
The backend prevents:
- Same doctor
- Same date
- Same time

appointments from being booked twice.

Returns:
409 CONFLICT

if slot already exists.

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM
- CSS

## Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

## Database
- MySQL

## Deployment
- Vercel
- Render

---

# 📂 Project Structure

```bash
Hospital-Management-System/
│
├── hms-frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
├── hms-backend/
│   ├── src/main/java/com/hospital/hms_backend/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   └── config/
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   ├── Dockerfile
│   └── pom.xml
│
└── README.md
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone https://github.com/prashik4629/Hospital-Management-System.git
```

## Go to Backend

```bash
cd hms-backend
```

## Run Backend

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

# 💻 Frontend Setup

## Go to Frontend

```bash
cd hms-frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm start
```

---

# 🗄️ Database Tables

## Patients Table

```sql
SELECT * FROM defaultdb.patients;
```

## Doctors Table

```sql
SELECT * FROM defaultdb.doctors;
```

## Appointments Table

```sql
SELECT * FROM defaultdb.appointments;
```

---

# 🔥 APIs

## Patients APIs

| Method | Endpoint |
|---|---|
| GET | /api/patients |
| POST | /api/patients |
| DELETE | /api/patients/{id} |

## Doctors APIs

| Method | Endpoint |
|---|---|
| GET | /api/doctors |
| POST | /api/doctors |
| DELETE | /api/doctors/{id} |

## Appointments APIs

| Method | Endpoint |
|---|---|
| GET | /api/appointments |
| POST | /api/appointments |
| DELETE | /api/appointments/{id} |
| PATCH | /api/appointments/{id}/status |

---

# 🔧 Major Problems Solved During Development

## ✅ Fixed Maven Wrapper Permission Error

```bash
./mvnw: Permission denied
```

Fix:

```bash
git update-index --chmod=+x mvnw
```

## ✅ Fixed CORS Errors

Problem:
No 'Access-Control-Allow-Origin' header

Fix:
- Added CorsConfig.java
- Added @CrossOrigin(origins="*")

## ✅ Fixed Spring Security Startup Failure

Problem:
HttpSecurity bean not found

Fix:
- Removed unnecessary security configuration

## ✅ Fixed 404 Appointment API Error

Fix:
- Added missing:
  - Appointment entity
  - Repository
  - Service
  - Controller

## ✅ Fixed Appointment Booking Bad Request (400)

Fix:
- Corrected frontend request body
- Sent:
  - patientId
  - doctorId
  - appointmentDate
  - appointmentTime
  - reason

properly to backend.

## ✅ Fixed Duplicate Appointment Booking

Implemented conflict detection logic.

---

# 📦 Deployment

## Frontend Deployment
- Hosted on Vercel

## Backend Deployment
- Hosted on Render

## Database
- MySQL Cloud Database

---

# 👨‍💻 Author

## Prashik Meshram

GitHub:
https://github.com/prashik4629

---

# ⭐ Future Improvements

- Authentication & Login
- JWT Security
- Admin Dashboard
- Email Notifications
- Prescription Management
- Billing System
- Search & Filters
- Doctor Availability Scheduler
- Patient History Tracking

---

# 📜 License

This project is for educational and portfolio purposes.
