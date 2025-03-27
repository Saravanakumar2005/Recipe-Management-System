package com.RecipemanagementSystem.RecipeManagementSystem.Controller;

import com.RecipemanagementSystem.RecipeManagementSystem.Entity.UserRecipe;
import com.RecipemanagementSystem.RecipeManagementSystem.Service.impf.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class recipeController {

    private  final RecipeService service;

    @Autowired
    public recipeController(RecipeService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addRecipe(@RequestBody UserRecipe recipe) {
        try {
            String response = service.addRecipe(recipe);
            if (response.contains("unhealthy")) {
                return ResponseEntity.status(400).body(response);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding recipe: " + e.getMessage());
        }
    }



    @GetMapping("/recipes/{username}")
    public ResponseEntity<?> getRecipesByUserName(@PathVariable String username) {
        try {
            List<UserRecipe> recipes = service.getRecipesByUserName(username);
            if (recipes.isEmpty()) {
                return ResponseEntity.status(404).body("No recipes found for user: " + username);
            }
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching recipes: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete/{username}/{recipename}")
    public ResponseEntity<String> deleteRecipe(
            @PathVariable String username,
            @PathVariable String recipename) {

        String response = service.deleteRecipeByUserAndDish(username, recipename);

        if (response.contains("deleted successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
