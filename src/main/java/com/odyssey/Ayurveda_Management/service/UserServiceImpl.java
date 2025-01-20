package com.odyssey.Ayurveda_Management.service;

import com.odyssey.Ayurveda_Management.model.User;
import com.odyssey.Ayurveda_Management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository theUserRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = theUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int theId) {
        Optional<User> result = userRepository.findById(theId);
        User theUser = null;

        if(result.isPresent()) {
            theUser = result.get();
        } else {
            throw new RuntimeException("The user ID - " + theId + " is not found!");
        }
        return theUser;
    }

    @Override
    public void save(User theUser) {
        // Hash the password before saving if not already hashed
        if (theUser.getPassword() != null && !theUser.getPassword().startsWith("$2a$")) { // bcrypt hashed passwords start with $2a$
            theUser.setPassword(passwordEncoder.encode(theUser.getPassword()));
        }
        userRepository.save(theUser);
    }

    @Override
    public void deleteById(int theId) {
        userRepository.deleteById(theId);
    }
}
