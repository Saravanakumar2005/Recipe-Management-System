package com.RecipemanagementSystem.RecipeManagementSystem.Controller;

import com.RecipemanagementSystem.RecipeManagementSystem.Entity.User;
import com.RecipemanagementSystem.RecipeManagementSystem.Service.impf.UserService;
import com.RecipemanagementSystem.RecipeManagementSystem.payload.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<String> Welcome() {
        return ResponseEntity.ok("Welcome to Recipe Management System");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String response = userService.addUser(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginMessage> loginUser(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            if (email == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new LoginMessage("Email and password are required.", false));
            }

            LoginMessage response = userService.loginUser(email, password);

            if ("Login Successful".equalsIgnoreCase(response.getMessage())) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginMessage("Login failed. Please try again.", false));
        }
    }
}
