package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.Patient;
import com.odyssey.Ayurveda_Management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService{

    private PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository thePatientRepository) {
        patientRepository = thePatientRepository;
    }

    @Override
    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    @Override
    public Patient findById(Long theId) {
        Optional<Patient> result = patientRepository.findById(theId);

        Patient thePatient = null;

        if (result.isPresent()) {
            thePatient = result.get();
        } else {
            throw new RuntimeException("Did not find Patient id " + theId);
        }
        return thePatient;
    }

    @Override
    public void save(Patient thePatient) {
        patientRepository.save(thePatient);
    }

    @Override
    public void deleteById(Long theId) {
        patientRepository.deleteById(theId);
    }

}
