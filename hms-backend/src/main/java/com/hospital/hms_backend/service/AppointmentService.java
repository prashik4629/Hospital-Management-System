package com.hospital.hms_backend.service;

import com.hospital.hms_backend.entity.Appointment;
import com.hospital.hms_backend.entity.Appointment.Status;
import com.hospital.hms_backend.entity.Doctor;
import com.hospital.hms_backend.entity.Patient;
import com.hospital.hms_backend.repository.AppointmentRepository;
import com.hospital.hms_backend.repository.DoctorRepository;
import com.hospital.hms_backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    // Get all appointments for a patient
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // Get all appointments for a doctor
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    // Get appointments by date
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date);
    }

    // Get appointments by status
    public List<Appointment> getAppointmentsByStatus(Status status) {
        return appointmentRepository.findByStatus(status);
    }

    // Book a new appointment
    public Appointment bookAppointment(Long patientId, Long doctorId, Appointment appointment) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Patient not found with id: " + patientId));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Doctor not found with id: " + doctorId));

        // Check for time conflict: same doctor, same date, same time
        List<Appointment> conflicts = appointmentRepository
                .findByDoctorIdAndAppointmentDate(doctorId, appointment.getAppointmentDate())
                .stream()
                .filter(a -> a.getAppointmentTime().equals(appointment.getAppointmentTime())
                          && a.getStatus() != Status.CANCELLED)
                .toList();

        if (!conflicts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Doctor already has an appointment at that time. Please choose a different slot.");
        }

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setStatus(Status.PENDING);

        return appointmentRepository.save(appointment);
    }

    // Update appointment status (confirm, cancel, complete)
    public Appointment updateStatus(Long id, Status status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Appointment not found with id: " + id));

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    // Delete appointment
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }
}
