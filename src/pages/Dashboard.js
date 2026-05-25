import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  useEffect(() => {
    axios.get('https://hospital-management-system-82hn.onrender.com/api/patients')

      .then(res => setPatientCount(res.data.length));

    axios.get('https://hospital-management-system-82hn.onrender.com/api/doctors')

      .then(res => setDoctorCount(res.data.length));
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>

        <div className="form-box" style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '60px', color: '#27ae60' }}>{patientCount}</h1>
          <h3>Total Patients</h3>
        </div>

        <div className="form-box" style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '60px', color: '#2980b9' }}>{doctorCount}</h1>
          <h3>Total Doctors</h3>
        </div>

        <div className="form-box" style={{ flex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '60px', color: '#e74c3c' }}>1</h1>
          <h3>Departments</h3>
        </div>

      </div>

      <div className="form-box" style={{ marginTop: '20px' }}>
        <h3>🏥 Welcome to Hospital Management System</h3>
        <p style={{ marginTop: '10px', color: '#666' }}>
          Manage your patients, doctors and appointments from one place.
          Use the navigation bar to switch between sections.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;