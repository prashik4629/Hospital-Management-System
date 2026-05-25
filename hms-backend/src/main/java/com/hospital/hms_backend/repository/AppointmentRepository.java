package com.hospital.hms_backend.repository;

import com.hospital.hms_backend.entity.Appointment;
import com.hospital.hms_backend.entity.Appointment.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // All appointments for a specific doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // All appointments for a specific patient
    List<Appointment> findByPatientId(Long patientId);

    // All appointments on a specific date
    List<Appointment> findByAppointmentDate(LocalDate date);

    // All appointments by status (e.g. PENDING, CONFIRMED)
    List<Appointment> findByStatus(Status status);

    // Doctor's appointments on a specific date (used for conflict checking)
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, LocalDate date);
}
