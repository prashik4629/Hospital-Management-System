import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://hospital-management-system-82hn.onrender.com/api/patients';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '', age: '', disease: '', doctor: '', phone: '', address: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios.get(API).then(res => setPatients(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.disease) {
      alert('Please fill Name and Disease!');
      return;
    }
    axios.post(API, form).then(() => {
      fetchPatients();
      setForm({ name: '', age: '', disease: '', doctor: '', phone: '', address: '' });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this patient?')) {
      axios.delete(`${API}/${id}`).then(fetchPatients);
    }
  };

  return (
    <div>
      <h2>👥 Patients</h2>

      <div className="form-box">
        <h3>Add New Patient</h3>
        <br/>
        <input name="name"    placeholder="Patient Name"  value={form.name}    onChange={handleChange} />
        <input name="age"     placeholder="Age"           value={form.age}     onChange={handleChange} type="number" />
        <input name="disease" placeholder="Disease"       value={form.disease} onChange={handleChange} />
        <input name="doctor"  placeholder="Doctor Name"   value={form.doctor}  onChange={handleChange} />
        <input name="phone"   placeholder="Phone Number"  value={form.phone}   onChange={handleChange} />
        <input name="address" placeholder="Address"       value={form.address} onChange={handleChange} />
        <br/><br/>
        <button className="btn btn-primary" onClick={handleSubmit}>
          ➕ Add Patient
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.disease}</td>
              <td>{p.doctor}</td>
              <td>{p.phone}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;