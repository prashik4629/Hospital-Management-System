import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>🏥 Hospital Management System</h1>
          <Link to="/">Dashboard</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/appointments">Appointments</Link>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/patients"    element={<Patients />} />
            <Route path="/doctors"     element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
