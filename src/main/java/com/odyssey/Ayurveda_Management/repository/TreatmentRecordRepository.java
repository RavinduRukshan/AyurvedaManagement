package com.odyssey.Ayurveda_Management.repository;

import com.odyssey.Ayurveda_Management.model.TreatmentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TreatmentRecordRepository extends JpaRepository<TreatmentRecord, Integer> {

}