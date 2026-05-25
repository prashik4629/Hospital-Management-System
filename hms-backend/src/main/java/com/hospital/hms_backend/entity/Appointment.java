package com.hospital.hms_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to Patient row
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id", nullable = false)
    @NotNull(message = "Patient is required")
    private Patient patient;

    // Link to Doctor row
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    @NotNull(message = "Doctor is required")
    private Doctor doctor;

    @NotNull(message = "Date is required")
    private LocalDate appointmentDate;

    @NotNull(message = "Time is required")
    private LocalTime appointmentTime;

    @NotBlank(message = "Reason is required")
    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
}
