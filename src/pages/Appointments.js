import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://hospital-management-system-82hn.onrender.com/api/appointments';
const PATIENTS_API = 'https://hospital-management-system-82hn.onrender.com/api/patients';
const DOCTORS_API = 'https://hospital-management-system-82hn.onrender.com/api/doctors';

const STATUS_COLORS = {
  PENDING: { background: '#fff3cd', color: '#856404' },
  CONFIRMED: { background: '#d1e7dd', color: '#0f5132' },
  CANCELLED: { background: '#f8d7da', color: '#842029' },
  COMPLETED: { background: '#cfe2ff', color: '#084298' },
};

function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: '',
  });

  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {

    setLoading(true);
    setError('');

    Promise.all([
      axios.get(API),
      axios.get(PATIENTS_API),
      axios.get(DOCTORS_API),
    ])
      .then(([apptRes, patRes, docRes]) => {
        setAppointments(apptRes.data);
        setPatients(patRes.data);
        setDoctors(docRes.data);
      })
      .catch(() => {
        setError('Failed to load data. Please check the server.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    if (
      !form.patientId ||
      !form.doctorId ||
      !form.appointmentDate ||
      !form.appointmentTime ||
      !form.reason
    ) {
      alert('Please fill all required fields.');
      return;
    }

    try {

      // Convert HH:mm → HH:mm:ss
      const formattedTime = `${form.appointmentTime}:00`;


          const payload = {

  patient: {
    id: form.patientId
  },

  doctor: {
    id: form.doctorId
  },

  appointmentDate: form.appointmentDate,

  appointmentTime: formattedTime,

  reason: form.reason,

  notes: form.notes
};

      const response = await axios.post(
        `${API}?patientId=${form.patientId}&doctorId=${form.doctorId}`,
        payload
      );

      console.log(response.data);

      alert('Appointment booked successfully!');

      fetchAll();

      setForm({
        patientId: '',
        doctorId: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        notes: '',
      });

    } catch (err) {

      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        'Failed to book appointment.';

      alert(
        typeof errorMessage === 'string'
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    }
  };

  const handleStatusChange = (id, status) => {

    axios
      .patch(`${API}/${id}/status?status=${status}`)
      .then(fetchAll)
      .catch(() => {
        alert('Failed to update status.');
      });
  };

  const handleDelete = (id) => {

    if (window.confirm('Delete this appointment?')) {

      axios
        .delete(`${API}/${id}`)
        .then(fetchAll)
        .catch(() => {
          alert('Failed to delete appointment.');
        });
    }
  };

  const displayed =
    filterStatus === 'ALL'
      ? appointments
      : appointments.filter((a) => a.status === filterStatus);

  return (
    <div>

      <h2>📅 Appointments</h2>

      <div className="form-box">

        <h3>Book New Appointment</h3>

        <br />

        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
        >
          <option value="">— Select Patient —</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (ID: {p.id})
            </option>
          ))}
        </select>

        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
        >
          <option value="">— Select Doctor —</option>

          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.name} — {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
        />

       <input
  type="time"
  name="appointmentTime"
  value={form.appointmentTime}
  onChange={handleChange}
  required
/>

        <input
          type="text"
          name="reason"
          placeholder="Reason for visit"
          value={form.reason}
          onChange={handleChange}
        />

        <input
          type="text"
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          ➕ Book Appointment
        </button>
      </div>

      <div
        className="form-box"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >

        <span
          style={{
            fontWeight: '500',
            color: '#2c3e50',
          }}
        >
          Filter by status:
        </span>

        {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (

          <button
            key={s}
            className="btn"
            onClick={() => setFilterStatus(s)}
            style={
              filterStatus === s
                ? {
                    background: '#2980b9',
                    color: 'white',
                  }
                : {
                    background: '#ecf0f1',
                    color: '#2c3e50',
                  }
            }
          >
            {s}
          </button>
        ))}

        <span
          style={{
            marginLeft: 'auto',
            color: '#666',
            fontSize: '14px',
          }}
        >
          {displayed.length} appointment
          {displayed.length !== 1 ? 's' : ''}
        </span>
      </div>

      {error && (
        <div
          style={{
            background: '#f8d7da',
            color: '#842029',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <p style={{ color: '#666' }}>
          Loading appointments...
        </p>
      )}

      {!loading && (

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {displayed.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: 'center',
                    color: '#888',
                    padding: '24px',
                  }}
                >
                  No appointments found.
                </td>
              </tr>
            )}

            {displayed.map((a) => (

              <tr key={a.id}>

                <td>{a.id}</td>

                <td>{a.patient?.name}</td>

                <td>
                  Dr. {a.doctor?.name}
                  <br />
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#888',
                    }}
                  >
                    {a.doctor?.specialization}
                  </span>
                </td>

                <td>{a.appointmentDate}</td>

                <td>{a.appointmentTime}</td>

                <td>
                  {a.reason}

                  {a.notes && (
                    <>
                      <br />
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#888',
                        }}
                      >
                        {a.notes}
                      </span>
                    </>
                  )}
                </td>

                <td>

                  <span
                    style={{
                      ...STATUS_COLORS[a.status],
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                  >
                    {a.status}
                  </span>

                </td>

                <td
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                  }}
                >

                  {a.status === 'PENDING' && (
                    <button
                      className="btn btn-primary"
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                      }}
                      onClick={() =>
                        handleStatusChange(a.id, 'CONFIRMED')
                      }
                    >
                      Confirm
                    </button>
                  )}

                  {(a.status === 'PENDING' ||
                    a.status === 'CONFIRMED') && (
                    <button
                      className="btn"
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        background: '#2980b9',
                        color: 'white',
                      }}
                      onClick={() =>
                        handleStatusChange(a.id, 'COMPLETED')
                      }
                    >
                      Complete
                    </button>
                  )}

                  {a.status !== 'CANCELLED' &&
                    a.status !== 'COMPLETED' && (
                      <button
                        className="btn"
                        style={{
                          fontSize: '12px',
                          padding: '4px 10px',
                          background: '#e67e22',
                          color: 'white',
                        }}
                        onClick={() =>
                          handleStatusChange(a.id, 'CANCELLED')
                        }
                      >
                        Cancel
                      </button>
                    )}

                  <button
                    className="btn btn-danger"
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                    }}
                    onClick={() => handleDelete(a.id)}
                  >
                    🗑️
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default Appointments;