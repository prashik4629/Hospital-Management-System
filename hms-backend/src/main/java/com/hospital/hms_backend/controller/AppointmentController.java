package com.hospital.hms_backend.controller;

import com.hospital.hms_backend.entity.Appointment;
import com.hospital.hms_backend.entity.Appointment.Status;
import com.hospital.hms_backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // GET all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // GET appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET appointments for a patient
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    // GET appointments for a doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    // GET appointments by date  e.g. /api/appointments/date?date=2025-06-10
    @GetMapping("/date")
    public List<Appointment> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAppointmentsByDate(date);
    }

    // GET appointments by status  e.g. /api/appointments/status?status=PENDING
    @GetMapping("/status")
    public List<Appointment> getByStatus(@RequestParam Status status) {
        return appointmentService.getAppointmentsByStatus(status);
    }

    // POST book a new appointment
    // Body: { appointmentDate, appointmentTime, reason, notes }
    // Params: patientId, doctorId
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @Valid @RequestBody Appointment appointment) {

        Appointment saved = appointmentService.bookAppointment(patientId, doctorId, appointment);
        return ResponseEntity.ok(saved);
    }

    // PATCH update status only  e.g. /api/appointments/3/status?status=CONFIRMED
    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable Long id,
            @RequestParam Status status) {

        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    // DELETE appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully!");
    }
}
