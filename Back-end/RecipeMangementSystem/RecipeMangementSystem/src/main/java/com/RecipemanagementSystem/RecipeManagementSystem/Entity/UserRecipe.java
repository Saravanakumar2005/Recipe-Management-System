package com.RecipemanagementSystem.RecipeManagementSystem.Entity;

import jakarta.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "user_recipe")
public class UserRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "recipe_name", nullable = false)
    private String recipename;

    @Column(name = "cuisine", nullable = false)
    private String cuisine;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "ingredients", columnDefinition = "TEXT")
    private String ingredients;

    @Column(name = "prep_time")
    private String preptime;

    @Column(name = "course")
    private String course;

    @Column(name = "diet")
    private String diet;

    @Column(name = "instruction", columnDefinition = "TEXT")
    private String instruction;

    @Column(name = "image_url", nullable = false)
    private String pageUrl;

    public UserRecipe() {}

    public UserRecipe(Long id, String username, String recipename, String cuisine, String description,
                      List<String> ingredients, String preptime, String course, String diet,
                      String instruction, String pageUrl) {
        this.id = id;
        this.username = username;
        this.recipename = recipename;
        this.cuisine = cuisine;
        this.description = description;
        this.ingredients = convertListToString(ingredients);
        this.preptime = preptime;
        this.course = course;
        this.diet = diet;
        this.instruction = instruction;
        this.pageUrl = pageUrl;
    }

    private String convertListToString(List<String> ingredients) {
        return (ingredients != null) ? ingredients.stream()
                .map(String::trim)
                .distinct()
                .collect(Collectors.joining(",")) : "";
    }

    private List<String> convertStringToList(String ingredients) {
        return (ingredients != null && !ingredients.isEmpty())
                ? Arrays.stream(ingredients.split(","))
                .map(String::trim)
                .distinct()
                .collect(Collectors.toList())
                : List.of();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRecipename() {
        return recipename;
    }

    public void setRecipename(String recipename) {
        this.recipename = recipename;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getIngredients() {
        return convertStringToList(ingredients);
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = convertListToString(ingredients);
    }

    public String getPreptime() {
        return preptime;
    }

    public void setPreptime(String preptime) {
        this.preptime = preptime;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getDiet() {
        return diet;
    }

    public void setDiet(String diet) {
        this.diet = diet;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }
}