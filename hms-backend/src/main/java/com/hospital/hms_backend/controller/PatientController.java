package com.hospital.hms_backend.controller;

import com.hospital.hms_backend.entity.Patient;
import com.hospital.hms_backend.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // GET all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // GET patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST add new patient
    @PostMapping
    public Patient addPatient(@Valid @RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    // PUT update patient
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                                  @Valid @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    // DELETE patient
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully!");
    }

    // GET search by name
    @GetMapping("/search")
    public List<Patient> searchPatients(@RequestParam String name) {
        return patientService.searchByName(name);
    }
}