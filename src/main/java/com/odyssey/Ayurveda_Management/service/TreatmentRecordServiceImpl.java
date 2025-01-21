package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.TreatmentRecord;
import com.odyssey.Ayurveda_Management.repository.TreatmentRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TreatmentRecordServiceImpl implements TreatmentRecordService {

    private final TreatmentRecordRepository treatmentRecordRepository;

    @Autowired
    public TreatmentRecordServiceImpl(TreatmentRecordRepository treatmentRecordRepository) {
        this.treatmentRecordRepository = treatmentRecordRepository;
    }

    @Override
    public List<TreatmentRecord> findAll() {
        return treatmentRecordRepository.findAll();
    }

    @Override
    public TreatmentRecord findById(int theId) {
        return treatmentRecordRepository.findById(theId)
                .orElseThrow(() -> new RuntimeException("Treatment record not found with ID " + theId));
    }

    @Override
    public void save(TreatmentRecord theTreatmentRecord) {
        treatmentRecordRepository.save(theTreatmentRecord);
    }

    @Override
    public void deleteTreatmentRecord(int theId) {
        if (!treatmentRecordRepository.existsById(theId)) {
            throw new RuntimeException("Treatment record not found with ID " + theId);
        }
        treatmentRecordRepository.deleteById(theId);
    }

    @Override
    public void updateTreatmentRecord(int id, TreatmentRecord updatedTreatmentRecord) {
        TreatmentRecord existingRecord = treatmentRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treatment record not found with ID " + id));

        // Update fields
        existingRecord.setSicknessDescription(updatedTreatmentRecord.getSicknessDescription());
        existingRecord.setMedicinePrescribed(updatedTreatmentRecord.getMedicinePrescribed());
        existingRecord.setTherapyGiven(updatedTreatmentRecord.getTherapyGiven());
        existingRecord.setTreatmentDate(updatedTreatmentRecord.getTreatmentDate());
        existingRecord.setTreatmentTime(updatedTreatmentRecord.getTreatmentTime());
        existingRecord.setProgressNotes(updatedTreatmentRecord.getProgressNotes());
        existingRecord.setTreatmentAmount(updatedTreatmentRecord.getTreatmentAmount());

        // Save the updated record
        treatmentRecordRepository.save(existingRecord);
    }
}
