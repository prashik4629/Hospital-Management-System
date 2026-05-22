# 🏥 Hospital Management System

<div align="center">

![Hospital Management System](https://img.shields.io/badge/Hospital-Management%20System-blue?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.14-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)
![Java](https://img.shields.io/badge/Java-21-red?style=for-the-badge&logo=openjdk)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-purple?style=for-the-badge&logo=render)

### A Full Stack Hospital Management System built with Spring Boot & React.js

[🌐 Live Demo](https://hospital-management-system-orx5mbb9n-prashik4629s-projects.vercel.app) • [🔗 API](https://hospital-management-system-82hn.onrender.com) • [📂 Repository](https://github.com/prashik4629/Hospital-Management-System)

</div>

---

## ✨ Features

- 🧑‍⚕️ **Patient Management** — Add, View, Delete patients
- 👨‍⚕️ **Doctor Management** — Add, View, Delete doctors
- 📊 **Dashboard** — Live counts of patients and doctors from database
- 🔍 **Search** — Search patients by name
- 🌐 **REST APIs** — Full CRUD operations
- ☁️ **Cloud Deployed** — Live on the internet!

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Axios | API calls to backend |
| React Router DOM | Page navigation |
| CSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Java 21 | Programming Language |
| Spring Boot 3.5 | Backend Framework |
| Spring Data JPA | Database ORM |
| Spring Security | Authentication |
| Maven | Build Tool |

### Database & Deployment
| Technology | Purpose |
|---|---|
| MySQL | Database |
| Aiven | Cloud MySQL Hosting |
| Vercel | Frontend Deployment |
| Render | Backend Deployment |
| GitHub | Version Control |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         React.js Frontend               │
│         (Vercel - Port 3000)            │
│   Dashboard | Patients | Doctors        │
└──────────────────┬──────────────────────┘
                   │ Axios HTTP Calls
                   ▼
┌─────────────────────────────────────────┐
│       Spring Boot Backend               │
│       (Render - Port 8080)              │
│  Controller → Service → Repository      │
└──────────────────┬──────────────────────┘
                   │ JPA / Hibernate
                   ▼
┌─────────────────────────────────────────┐
│         MySQL Database                  │
│         (Aiven Cloud)                   │
│      patients | doctors tables          │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Hospital-Management-System/
│
├── hms-backend/                          # Spring Boot Backend
│   ├── src/main/java/com/hospital/
│   │   ├── entity/
│   │   │   ├── Patient.java             # Patient entity/table
│   │   │   └── Doctor.java              # Doctor entity/table
│   │   ├── repository/
│   │   │   ├── PatientRepository.java   # DB queries for patients
│   │   │   └── DoctorRepository.java    # DB queries for doctors
│   │   ├── service/
│   │   │   ├── PatientService.java      # Business logic
│   │   │   └── DoctorService.java       # Business logic
│   │   ├── controller/
│   │   │   ├── PatientController.java   # REST API endpoints
│   │   │   └── DoctorController.java    # REST API endpoints
│   │   └── SecurityConfig.java          # Security configuration
│   ├── src/main/resources/
│   │   └── application.properties       # Database config
│   └── Dockerfile                        # Docker config for deployment
│
└── hms-frontend/                         # React.js Frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.js             # Dashboard page
    │   │   ├── Patients.js              # Patients page
    │   │   └── Doctors.js               # Doctors page
    │   ├── App.js                        # Main app with routing
    │   └── index.css                     # Global styles
    └── package.json
```

---

## 🚀 REST API Endpoints

### Patient APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/patients` | Get all patients |
| `GET` | `/api/patients/{id}` | Get patient by ID |
| `POST` | `/api/patients` | Add new patient |
| `PUT` | `/api/patients/{id}` | Update patient |
| `DELETE` | `/api/patients/{id}` | Delete patient |
| `GET` | `/api/patients/search?name=` | Search by name |

### Doctor APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/doctors` | Get all doctors |
| `GET` | `/api/doctors/{id}` | Get doctor by ID |
| `POST` | `/api/doctors` | Add new doctor |
| `PUT` | `/api/doctors/{id}` | Update doctor |
| `DELETE` | `/api/doctors/{id}` | Delete doctor |
| `GET` | `/api/doctors/search?name=` | Search by name |

---

## ⚙️ Run Locally

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL 8.0+
- Maven

### Backend Setup
```bash
# Clone the repo
git clone https://github.com/prashik4629/Hospital-Management-System.git

# Go to backend folder
cd Hospital-Management-System/hms-backend

# Create MySQL database
mysql -u root -p
CREATE DATABASE hms_db;

# Update application.properties with your DB credentials
# Then run
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

### Frontend Setup
```bash
# Go to frontend folder
cd Hospital-Management-System/hms-frontend

# Install dependencies
npm install

# Start the app
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🌐 Live Deployment

| Service | URL |
|---|---|
| 🎨 Frontend | [hospital-management-system.vercel.app](https://hospital-management-system-orx5mbb9n-prashik4629s-projects.vercel.app) |
| ⚙️ Backend API | [hospital-management-system.onrender.com](https://hospital-management-system-82hn.onrender.com) |
| 🗄️ Database | Aiven Cloud MySQL |

---

## 📸 Screenshots

### Dashboard
> Live counts of patients and doctors fetched from MySQL database

### Patients Page
> Add new patients with name, age, disease, doctor, phone and address

### Doctors Page
> Add new doctors with name, specialization, experience, phone and email

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Developer

**Prashik Meshram**

[![GitHub](https://img.shields.io/badge/GitHub-prashik4629-black?style=flat-square&logo=github)](https://github.com/prashik4629)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by Prashik Meshram

⭐ Star this repo if you found it helpful!

</div>
