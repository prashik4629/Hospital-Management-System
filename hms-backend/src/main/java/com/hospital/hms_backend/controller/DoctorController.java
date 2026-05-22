package com.hospital.hms_backend.controller;

import com.hospital.hms_backend.entity.Doctor;
import com.hospital.hms_backend.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // GET all doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // GET doctor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST add new doctor
    @PostMapping
    public Doctor addDoctor(@Valid @RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    // PUT update doctor
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,
                                @Valid @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    // DELETE doctor
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully!");
    }

    // GET search by name
    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String name) {
        return doctorService.searchByName(name);
    }
}