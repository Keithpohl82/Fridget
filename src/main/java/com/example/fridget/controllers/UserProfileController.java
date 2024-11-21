package com.example.fridget.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/userservice/user")
public class UserProfileController {


}
