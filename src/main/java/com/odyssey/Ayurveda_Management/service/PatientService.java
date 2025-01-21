package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PatientService {

    List<Patient> findAll();

    //Patient findById(Long theId);
    Patient findById(int theid);


    void save(Patient thePatient);

    void deleteById(int theId);

    // search by name or contact number
    List<Patient> searchPatients(String query);

}