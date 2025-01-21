package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.Patient;
import com.odyssey.Ayurveda_Management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    // Autowired constructor
    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository thepatientRepository) {
        this.patientRepository = thepatientRepository;
    }

    @Override
    public List<Patient> searchPatients(String query) {
        return patientRepository.findByNameContainingIgnoreCaseOrContactNumberContainingIgnoreCase(query, query);
    }

    @Override
    public List<Patient> findAll() { // Corrected the method name from findALL() to findAll()
        return patientRepository.findAll();
    }

    @Override
    public Patient findById(int id) {
        return patientRepository.findById(id).orElse(null);
    }



    @Override
    public void save(Patient thePatient) {
        patientRepository.save(thePatient);
    }

    @Override
    public void deleteById(int theId) {
        patientRepository.deleteById(theId);
    }
}
