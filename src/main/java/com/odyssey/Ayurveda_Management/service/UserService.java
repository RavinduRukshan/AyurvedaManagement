package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> findAll();

    User findById(int theId);

    void save(User theUser);

    void deleteById(int theId);

}
