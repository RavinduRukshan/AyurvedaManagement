package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.TreatmentRecord;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TreatmentRecordService {

    List<TreatmentRecord> findAll();

    TreatmentRecord findById(int theId);

    void save(TreatmentRecord theTreatmentRecord);

    void deleteTreatmentRecord(int theId);

    void updateTreatmentRecord(int theId, TreatmentRecord updatedTreatmentRecord);
}
