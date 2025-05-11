package es.upm.dit.isst.agileapi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // @Autowired
    // private UserService userService;

    // @PostMapping("/login")
    // public User login(@RequestBody Map<String, String> body, HttpSession session) {
    //     String email = body.get("email");
    //     String password = body.get("password");

    //     return userService.loginUser(email, password)
    //         .map(user -> {
    //             session.setAttribute("userId", user.getId());
    //             return user;
    //         })
    //         .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    // }
}
