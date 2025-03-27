package com.RecipemanagementSystem.RecipeManagementSystem.Service.impf;

import com.RecipemanagementSystem.RecipeManagementSystem.Entity.User;
import com.RecipemanagementSystem.RecipeManagementSystem.Repo.UserRepo;
import com.RecipemanagementSystem.RecipeManagementSystem.payload.response.LoginMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String addUser(User newUser) {
        // Check if username is already taken
        if (userRepo.findByUserName(newUser.getUserName()).isPresent()) {
            return "Username already taken!";
        }

        // Check if email is already registered
        if (userRepo.findByEmail(newUser.getEmail()).isPresent()) {
            return "Email already registered!";
        }

        // Encrypt password before saving
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepo.save(newUser);

        return "User registered successfully: " + newUser.getUserName();
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Transactional
    public LoginMessage loginUser(String email, String password) {
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isEmpty()) {
            return new LoginMessage("Email does not exist", false);
        }

        // Compare hashed password
        boolean isPasswordMatch = passwordEncoder.matches(password, existingUser.get().getPassword());
        if (!isPasswordMatch) {
            return new LoginMessage("Incorrect password", false);
        }

        return new LoginMessage("Login Successful", true);
    }
}
