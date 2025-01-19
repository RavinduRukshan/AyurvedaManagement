
package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.Staff;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StaffService {

    List<Staff> findAll();

    Staff findById(int theId);

    void save(Staff theStaff);

    void deleteById(int theId);

    List<Staff> findByNameContainingIgnoreCase(String name);

}