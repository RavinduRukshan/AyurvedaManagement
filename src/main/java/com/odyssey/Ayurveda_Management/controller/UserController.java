package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Authorities;
import com.odyssey.Ayurveda_Management.model.Staff;
import com.odyssey.Ayurveda_Management.model.User;
import com.odyssey.Ayurveda_Management.service.AuthoritiesService;
import com.odyssey.Ayurveda_Management.service.StaffService;
import com.odyssey.Ayurveda_Management.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private AuthoritiesService authoritiesService;
    private StaffService staffService;

    public UserController(UserService theUserservice, AuthoritiesService theAuthoritiesService,
                          StaffService theStaffService) {
        userService = theUserservice;
        authoritiesService = theAuthoritiesService;
        staffService = theStaffService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> theUsers = userService.findAll();

        // Print authenticated user's roles for debugging (optional)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authenticated user role: " + authentication.getAuthorities());
        // Return the list of patients as JSON
        return ResponseEntity.ok(theUsers);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestBody User theUser) {

        // Validate and set role
        Authorities role = authoritiesService.findById(theUser.getRole().getId());
        if (role == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid role selected.").toString());
        }
        theUser.setRole(role);

        // Validate and set staff
        Staff staff = staffService.findById(theUser.getStaff().getId());
        if (staff == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid staff selected.").toString());
        }
        theUser.setStaff(staff);

        userService.save(theUser);
        return ResponseEntity.ok("User saved successfully");

    }



//    @PutMapping("/update/{id}")
//    public ResponseEntity<String> updatePatient(@PathVariable("id") int theId, @RequestBody User theUser) {
//        // Check if the patient exists by id
//        Optional<User> existingUser = Optional.ofNullable(userService.findById(theId));
//
//        if (existingUser.isPresent()) {
//            theUser.setId(theId);
//
//            // Validate and set role
//            Authorities role = authoritiesService.findById(theUser.getRole().getId());
//            if (role == null) {
//                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid role selected.").toString());
//            }
//            theUser.setRole(role);
//
//            // Validate and set staff
//            Staff staff = staffService.findById(theUser.getStaff().getId());
//            if (staff == null) {
//                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid staff selected.").toString());
//            }
//            theUser.setStaff(staff);
//
//            userService.save(theUser);
//            return ResponseEntity.ok("User update successfully");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID - " +theId);
//        }
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        userService.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }



    @PostMapping("/staff/search")
    @ResponseBody
    public ResponseEntity<?> searchStaff(@RequestBody Map<String, String> requestBody) {
        // Extract the query parameter from the JSON request body
        String query = requestBody.get("query");

        // Validate the query
        if (query == null || query.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Search query cannot be empty."));
        }

        // Search staff by name
        List<Staff> staffList = staffService.findByNameContainingIgnoreCase(query);

        // Return results
        return ResponseEntity.ok(staffList);
    }

}
