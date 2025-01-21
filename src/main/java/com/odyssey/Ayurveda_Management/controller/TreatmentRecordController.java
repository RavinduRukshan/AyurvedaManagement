package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Patient;
import com.odyssey.Ayurveda_Management.model.TreatmentRecord;
import com.odyssey.Ayurveda_Management.service.PatientService;
import com.odyssey.Ayurveda_Management.service.TreatmentRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treatmentRecord")
public class TreatmentRecordController {

    @Autowired
    private TreatmentRecordService treatmentRecordService;

    @Autowired
    private PatientService patientService;

    // Get all treatment records
    @GetMapping("/list")
    public ResponseEntity<List<TreatmentRecord>> getAllTreatmentRecords() {
        List<TreatmentRecord> treatmentRecords = treatmentRecordService.findAll();
        return ResponseEntity.ok(treatmentRecords);
    }

    // Get treatment record by ID
    @GetMapping("/findById/{id}")
    public ResponseEntity<TreatmentRecord> getTreatmentRecordById(@PathVariable("id") int id) {
        TreatmentRecord treatmentRecord = treatmentRecordService.findById(id);
        return ResponseEntity.ok(treatmentRecord);
    }

    // Save treatment record
    @PostMapping("/save")
    public ResponseEntity<String> saveTreatmentRecord(@RequestBody TreatmentRecord treatmentRecord,
                                                      @RequestParam("patientId") int patientId) {
        // Fetch the patient using patientId
        Patient patient = patientService.findById(patientId);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found with ID " + patientId);
        }

        // Associate the patient with the treatment record
        treatmentRecord.setPatient(patient);

        // Save the treatment record
        treatmentRecordService.save(treatmentRecord);

        return ResponseEntity.status(HttpStatus.CREATED).body("Treatment record saved successfully");
    }

    // Update treatment record
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTreatmentRecord(@PathVariable("id") int id, @RequestBody TreatmentRecord updatedTreatmentRecord) {
        treatmentRecordService.updateTreatmentRecord(id, updatedTreatmentRecord);
        return ResponseEntity.ok("Treatment record updated successfully");
    }

    // Delete treatment record
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTreatmentRecord(@PathVariable int id) {
        treatmentRecordService.deleteTreatmentRecord(id);
        return ResponseEntity.ok("Treatment record deleted successfully");
    }
}
