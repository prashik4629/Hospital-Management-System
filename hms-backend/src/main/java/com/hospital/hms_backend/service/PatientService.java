package com.hospital.hms_backend.service;

import com.hospital.hms_backend.entity.Patient;
import com.hospital.hms_backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Add new patient
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Update patient
    public Patient updatePatient(Long id, Patient updatedPatient) {
        updatedPatient.setId(id);
        return patientRepository.save(updatedPatient);
    }

    // Delete patient
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    // Search by name
    public List<Patient> searchByName(String name) {
        return patientRepository.findByNameContainingIgnoreCase(name);
    }
}