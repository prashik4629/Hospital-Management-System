import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://hospital-management-system-82hn.onrender.com/api/doctors';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: '', specialization: '', phone: '', email: '', address: '', experience: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get(API).then(res => setDoctors(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.specialization) {
      alert('Please fill Name and Specialization!');
      return;
    }
    axios.post(API, form).then(() => {
      fetchDoctors();
      setForm({ name: '', specialization: '', phone: '', email: '', address: '', experience: '' });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this doctor?')) {
      axios.delete(`${API}/${id}`).then(fetchDoctors);
    }
  };

  return (
    <div>
      <h2>👨‍⚕️ Doctors</h2>

      <div className="form-box">
        <h3>Add New Doctor</h3>
        <br/>
        <input name="name"           placeholder="Doctor Name"      value={form.name}           onChange={handleChange} />
        <input name="specialization" placeholder="Specialization"   value={form.specialization} onChange={handleChange} />
        <input name="phone"          placeholder="Phone Number"     value={form.phone}          onChange={handleChange} />
        <input name="email"          placeholder="Email"            value={form.email}          onChange={handleChange} />
        <input name="address"        placeholder="Address"          value={form.address}        onChange={handleChange} />
        <input name="experience"     placeholder="Experience (yrs)" value={form.experience}     onChange={handleChange} type="number" />
        <br/><br/>
        <button className="btn btn-primary" onClick={handleSubmit}>
          ➕ Add Doctor
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.experience} yrs</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(d.id)}>
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

export default Doctors;