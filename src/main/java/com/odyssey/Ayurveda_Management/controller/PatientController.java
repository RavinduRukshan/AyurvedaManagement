package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Patient;
import com.odyssey.Ayurveda_Management.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; //new
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/patient")
public class  PatientController {

    @Autowired
    private PatientService patientService;



//    @GetMapping("/list")
//    public String getAllPatients(Model theModel) {
//        List<Patient> thePatients = patientService.findAll();
//        theModel.addAttribute("patients", thePatients);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("Authenticated user roles: " + authentication.getAuthorities());
//        return "patient-list";
//    }

    //Display Patient
    @GetMapping("/list")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> thePatients = patientService.findAll();
        // Print authenticated user's roles for debugging (optional)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated user roles: " + authentication.getAuthorities());
        // Return the list of patients as JSON
        return ResponseEntity.ok(thePatients);
    }




//    @GetMapping("/showFormForAdd")
//    public String showFormForAdd(Model theModel) {
//        Patient thePatient = new Patient();
//        theModel.addAttribute("patient", thePatient);
//        return "patient-form";
//    }

    @GetMapping("/showFormForAdd")
    public String showFormForAdd(Model theModel) {
        Patient thePatient = new Patient();
        theModel.addAttribute("patient", thePatient);
        return "patient-form";
    }



    @GetMapping("/showFormForUpdate")
    public String showFormForUpdate(@RequestParam("patientId") int theId, Model theModel) {
        Patient thePatient = patientService.findById(theId);
        theModel.addAttribute("patient", thePatient);
        return "patient-form";
    }




//    @PostMapping("/save")
//    public String saveTask(@ModelAttribute("patient") Patient thePatient) {
//        patientService.save(thePatient);
//        return "redirect:/patient/list";
//    }

    //Save Patient
    @PostMapping("/save")
    public ResponseEntity<String> savePatient(@RequestBody Patient thePatient) {
        // Save the patient object
        patientService.save(thePatient);
        // Return a response entity with a success message
        return ResponseEntity.ok("Patient saved successfully");
    }



    //Update Patient
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







//    @GetMapping("/delete")
//    public String delete(@RequestParam("patientId") int theId) {
//        patientService.deleteById(theId);
//        return "redirect:/patient/list";
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        patientService.deleteById(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }


}
