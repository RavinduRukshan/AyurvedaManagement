package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Dispensary;
import com.odyssey.Ayurveda_Management.service.DispensaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dispensaries")
public class DispensaryController {

    private DispensaryService dispensaryService;


    public DispensaryController(DispensaryService theDispensaryService) {
        dispensaryService = theDispensaryService;
    }

//    @GetMapping("/list")
//    public String listDispensaries(Model theModel) {
//        List<Dispensary> theDispensaries = dispensaryService.findAll();
//        theModel.addAttribute("dispensaries", theDispensaries);
//        return "dispensary-list";
//    }
//
//    @GetMapping("/showFormForUpdate")
//    public String showFormForUpdate(@RequestParam("patientId") Integer theId, Model theModel) {
//        Dispensary theDispensary = dispensaryService.findById(theId);
//        theModel.addAttribute("dispensary", theDispensary);
//        return "dispensary-form";
//    }
//
//    @PostMapping("/save")
//    public String saveTask(@ModelAttribute("dispensary") Dispensary theDispensary) {
//        dispensaryService.save(theDispensary);
//        return "redirect:/dispensary/list";
//    }
//
//    @GetMapping("/delete")
//    public String delete(@RequestParam("dispensaryId") Integer theId) {
//        dispensaryService.deleteById(theId);
//        return "redirect:/dispensary/list";
//    }

    @GetMapping
    public List<Dispensary> getDispensaries() {
        return dispensaryService.findAll();
    }

}
