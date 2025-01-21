package com.odyssey.Ayurveda_Management.repository;

import com.odyssey.Ayurveda_Management.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Add the import for List

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    List<Patient> findByNameContainingIgnoreCaseOrContactNumberContainingIgnoreCase(String name, String contactNumber);
}
