package com.hospital.hms_backend.repository;

import com.hospital.hms_backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Search by specialization
    List<Doctor> findBySpecialization(String specialization);

    // Search by name
    List<Doctor> findByNameContainingIgnoreCase(String name);
}