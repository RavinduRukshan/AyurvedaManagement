package com.odyssey.Ayurveda_Management.repository;

import com.odyssey.Ayurveda_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
}
