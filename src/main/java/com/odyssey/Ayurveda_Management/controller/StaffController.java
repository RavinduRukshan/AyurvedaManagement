//package com.odyssey.Ayurveda_Management.controller;
//
//import com.odyssey.Ayurveda_Management.model.Dispensary;
//import com.odyssey.Ayurveda_Management.model.Role;
//import com.odyssey.Ayurveda_Management.model.Staff;
//import com.odyssey.Ayurveda_Management.service.DispensaryService;
//import com.odyssey.Ayurveda_Management.service.RoleService;
//import com.odyssey.Ayurveda_Management.service.StaffService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@Controller
//@RequestMapping("/staff")
//public class StaffController {
//
//    private StaffService staffService;
//    private RoleService roleService;
//    private DispensaryService dispensaryService;
//
//    @Autowired
//    public StaffController(StaffService theStaffService, RoleService theRoleService,
//                           DispensaryService theDispensaryService) {
//        staffService = theStaffService;
//        roleService = theRoleService;
//        dispensaryService = theDispensaryService;
//    }
//
//    @GetMapping("/list")
//    public String listStaff(Model theModel) {
//        List<Staff> theStaffs = staffService.findAll();
//        theModel.addAttribute("staffs", theStaffs);
//        return "staff-list";
//    }
//
//    @GetMapping("/showFormForAdd")
//    public String showFormForAdd(Model theModel) {
//        Staff theStaff = new Staff();
//        theModel.addAttribute("staff", theStaff);
//
//        // Add roles to the model
//        List<Role> roles = roleService.findAll();
//        theModel.addAttribute("roles", roles);
//
//        // Add dispensaries to the model
//        List<Dispensary> dispensaries = dispensaryService.findAll();
//        theModel.addAttribute("dispensaries", dispensaries);
//
//        return "staff-form";
//    }
//
//    @GetMapping("/showFormForUpdate")
//    public String showFormForUpdate(@RequestParam("staffId") Integer theId, Model theModel) {
//        Staff theStaff = staffService.findById(theId);
//        theModel.addAttribute("staff", theStaff);
//
//        // Add roles to the model
//        List<Role> roles = roleService.findAll();
//        theModel.addAttribute("roles", roles);
//
//        // Add dispensaries to the model
//        List<Dispensary> dispensaries = dispensaryService.findAll();
//        theModel.addAttribute("dispensaries", dispensaries);
//
//        return "staff-form";
//    }
//
//    @PostMapping("/save")
//    public String saveTask(@ModelAttribute("staff") Staff theStaff) {
//
//        // Fetch the full Role and Dispensary objects
//        Role role = roleService.findById(theStaff.getRole().getId());
//        Dispensary dispensary = dispensaryService.findById(theStaff.getDispensary().getId());
//
//        theStaff.setRole(role);
//        theStaff.setDispensary(dispensary);
//
//        staffService.save(theStaff);
//        return "redirect:/staff/list";
//    }
//
//    @GetMapping("/delete")
//    public String delete(@RequestParam("staffId") Integer theId) {
//        staffService.deleteById(theId);
//        return "redirect:/staff/list";
//    }
//
//}


package com.odyssey.Ayurveda_Management.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.odyssey.Ayurveda_Management.model.Dispensary;
import com.odyssey.Ayurveda_Management.model.Role;
import com.odyssey.Ayurveda_Management.model.Staff;
import com.odyssey.Ayurveda_Management.service.DispensaryService;
import com.odyssey.Ayurveda_Management.service.RoleService;
import com.odyssey.Ayurveda_Management.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {

    private StaffService staffService;
    private RoleService roleService;
    private DispensaryService dispensaryService;

    @Autowired
    public StaffController(StaffService theStaffService, RoleService theRoleService,
                           DispensaryService theDispensaryService) {
        staffService = theStaffService;
        roleService = theRoleService;
        dispensaryService = theDispensaryService;


    }


    @GetMapping("/roles")
    public List<Role> getRoles() {
        return roleService.findAll(); // Fetch all roles from the database
    }

    // GET all staff
    @GetMapping("/list")
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> theStaffs = staffService.findAll();
        return ResponseEntity.ok(theStaffs);  // Return the list of staff as JSON
    }






    // GET staff by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Staff> getStaffById(@PathVariable("id") Integer id) {
//        Staff theStaff = staffService.findById(id);
//        if (theStaff != null) {
//            return ResponseEntity.ok(theStaff);  // Return the staff as JSON
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(null);  // Return 404 if not found
//        }
//    }





    // POST create a new staff
    @PostMapping("/save")
    public ResponseEntity<String> saveStaff(@RequestBody Staff theStaff) {
        // Fetch the full Role and Dispensary objects
        Role role = roleService.findById(theStaff.getRole().getId());
        Dispensary dispensary = dispensaryService.findById(theStaff.getDispensary().getId());

        theStaff.setRole(role);
        theStaff.setDispensary(dispensary);

        staffService.save(theStaff);
        return ResponseEntity.ok("Patient saved successfully");
    }



    // PUT update staff by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateStaff(@PathVariable("id") Integer id, @RequestBody Staff theStaff) {
        // Check if staff exists by id
        Staff existingStaff = staffService.findById(id);
        if (existingStaff != null) {
            // Set the ID of the existing staff to ensure we update the correct one
            theStaff.setId(id);
            // Fetch the full Role and Dispensary objects
            Role role = roleService.findById(theStaff.getRole().getId());
            Dispensary dispensary = dispensaryService.findById(theStaff.getDispensary().getId());

            theStaff.setRole(role);
            theStaff.setDispensary(dispensary);

            staffService.save(theStaff);
            return ResponseEntity.ok("Staff updated successfully");  // Return success message in JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Staff not found with ID " + id);  // Return 404 with message if not found
        }
    }

    // DELETE staff by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable("id") Integer id) {
        staffService.deleteById(id);
        return ResponseEntity.ok("Staff deleted successfully");  // Return success message in JSON
    }
}
