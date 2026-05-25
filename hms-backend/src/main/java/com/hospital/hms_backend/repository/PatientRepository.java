package com.hospital.hms_backend.repository;

import com.hospital.hms_backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Search patients by name
    List<Patient> findByNameContainingIgnoreCase(String name);

    // Search patients by disease
    List<Patient> findByDisease(String disease);

    // Search patients by doctor
    List<Patient> findByDoctor(String doctor);
}