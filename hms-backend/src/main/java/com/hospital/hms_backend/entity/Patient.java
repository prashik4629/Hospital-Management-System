package com.hospital.hms_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 0, message = "Age must be positive")
    private int age;

    @NotBlank(message = "Disease is required")
    private String disease;

    @NotBlank(message = "Doctor is required")
    private String doctor;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String address;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();
}