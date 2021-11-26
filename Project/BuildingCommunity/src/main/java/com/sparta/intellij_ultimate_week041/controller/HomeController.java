package com.sparta.intellij_ultimate_week041.controller;

import com.sparta.intellij_ultimate_week041.models.UserRoleEnum;
import com.sparta.intellij_ultimate_week041.security.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

//@Controller
//public class HomeController {
//    @GetMapping("/")
//    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {
//        model.addAttribute("username", userDetails.getUsername());
//
//        if (userDetails.getUser().getRole() == UserRoleEnum.ADMIN) {
//            model.addAttribute("admin_role", true);
//        }
//
//        return "index";
//    }
//}