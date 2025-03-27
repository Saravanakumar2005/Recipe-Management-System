package com.RecipemanagementSystem.RecipeManagementSystem.Entity;

import jakarta.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "user_recipe")
public class Favourite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "recipe_name", nullable = false) // Fixed column name
    private String recipename;

    @Column(name="Cuisine",nullable = false)
    private  String cuisine;
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "ingredients", columnDefinition = "TEXT") // Updated for large text
    private String ingredients;

    @Column(name = "prep_time")
    private String preptime;

    @Column(name = "course")
    private String course;

    @Column(name = "diet")
    private String diet;

    @Column(name = "instruction", columnDefinition = "TEXT") // Updated for large text
    private String instruction;

    @Column(name = "image_url", nullable = false) // Fixed column name
    private String pageUrl;

    public Favourite() {}

    // Converts a List<String> into a single comma-separated string
    private String convertListToString(List<String> ingredients) {
        return (ingredients != null) ? ingredients.stream()
                .map(String::trim)
                .collect(Collectors.joining(",")) : "";
    }

    // Converts a comma-separated string into a List<String>
    private List<String> convertStringToList(String ingredients) {
        return (ingredients != null && !ingredients.isEmpty())
                ? Arrays.stream(ingredients.split(","))
                .map(String::trim)
                .collect(Collectors.toList())
                : List.of();
    }

    public Favourite(Long id, String username, String recipename, String cuisine,String description, List<String> ingredients,
                      String preptime, String course, String diet, String instruction, String pageUrl) {
        this.id = id;
        this.username = username;
        this.recipename = recipename;
        this.description = description;
        this.cuisine = cuisine;
        this.course = course;
        this.diet = diet;
        this.preptime = preptime;
        this.ingredients = convertListToString(ingredients);
        this.instruction = instruction;
        this.pageUrl = pageUrl;
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
