
package com.odyssey.Ayurveda_Management.repository;

import com.odyssey.Ayurveda_Management.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    List<Staff> findByNameContainingIgnoreCase(String name);
}