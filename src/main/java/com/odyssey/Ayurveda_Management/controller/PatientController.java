package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Patient;
import com.odyssey.Ayurveda_Management.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Display Patients
    @GetMapping("/list")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> thePatients = patientService.findAll();
        return ResponseEntity.ok(thePatients);
    }

    // Save Patient
    @PostMapping("/save")
    public ResponseEntity<String> savePatient(@RequestBody Patient thePatient) {
        patientService.save(thePatient);
        return ResponseEntity.ok("Patient saved successfully");
    }

    // Update Patient
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePatient(@PathVariable("id") int id, @RequestBody Patient thePatient) {
        // Check if the patient exists by id
        Optional<Patient> existingPatient = Optional.ofNullable(patientService.findById(id));
        if (existingPatient.isPresent()) {
            // Set the ID of the existing patient to ensure we update the correct one
            thePatient.setId(id);
            // Save the updated patient
            patientService.save(thePatient);
            // Return a response entity with a success message
            return ResponseEntity.ok("Patient updated successfully");
        } else {
            // Return a response entity with an error message if the patient was not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found with ID " + id);
        }
    }

    // Delete Patient
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        patientService.deleteById(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }

    // Search for Patients by Name, Contact Number
    @GetMapping("/searchPatient")
    public ResponseEntity<List<Patient>> searchPatients(@RequestParam("query") String query) {
        List<Patient> patients = patientService.searchPatients(query);
        if (patients.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(patients);
    }

}
