package com.RecipemanagementSystem.RecipeManagementSystem.Service.impf;

import com.RecipemanagementSystem.RecipeManagementSystem.Entity.UserRecipe;
import com.RecipemanagementSystem.RecipeManagementSystem.Repo.Userrecipe;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private Userrecipe recipeRepository;

    private static final Set<String> HEALTHY_INGREDIENTS = new HashSet<>(Arrays.asList(
            "Spinach", "Kale", "Broccoli", "Carrots", "Sweet potatoes", "Bell peppers", "Tomatoes", "Cauliflower",
            "Zucchini", "Eggplant", "Green beans", "Mushrooms", "Beets", "Radishes", "Brussel sprouts", "Celery",
            "Asparagus", "Cabbage", "Peas", "Lettuce", "Arugula", "Swiss chard", "Bok choy", "Okra", "Artichokes",
            "Apples", "Bananas", "Oranges", "Grapes", "Blueberries", "Strawberries", "Blackberries", "Raspberries",
            "Cherries", "Mangoes", "Pineapple", "Kiwi", "Papaya", "Peaches", "Pears", "Plums", "Pomegranates",
            "Watermelon", "Cantaloupe", "Cranberries", "Figs", "Dates", "Avocado", "Lemons", "Limes",
            "Brown rice", "Quinoa", "Oats", "Whole wheat", "Barley", "Buckwheat", "Bulgur", "Millet", "Rye", "Sorghum",
            "Wild rice", "Lentils", "Chickpeas", "Black beans", "Kidney beans", "Pinto beans", "White beans", "Soybeans",
            "Edamame", "Peanuts", "Almonds", "Walnuts", "Cashews", "Pistachios", "Pecans", "Macadamia nuts", "Brazil nuts", "Hazelnuts",
            "Chia seeds", "Flaxseeds", "Pumpkin seeds", "Sunflower seeds", "Sesame seeds", "Hemp seeds",
            "Milk", "Cheese", "Yogurt", "Cottage cheese", "Kefir", "Butter", "Ghee", "Almond milk", "Soy milk",
            "Coconut milk", "Oat milk", "Chicken breast", "Turkey", "Eggs", "Salmon", "Tuna", "Mackerel", "Sardines", "Trout", "Shrimp", "Crab",
            "Lobster", "Scallops", "Tofu", "Tempeh", "Seitan", "Olive oil", "Coconut oil", "Avocado oil", "Sesame oil", "Flaxseed oil", "Walnut oil",
            "Garlic", "Ginger", "Turmeric", "Cinnamon", "Cumin", "Paprika", "Basil", "Oregano", "Rosemary", "Thyme",
            "Parsley", "Mint", "Chili powder", "Coriander", "Dill", "Chives", "Nutmeg", "Saffron", "Cardamom", "Cloves",
            "Honey", "Maple syrup", "Dark chocolate (70%+ cacao)", "Green tea", "Black tea", "Chamomile tea",
            "Kombucha", "Apple cider vinegar", "Kimchi", "Sauerkraut", "Miso", "Natto", "Seaweed", "Nori",
            "Dulse", "Wakame", "Spirulina", "Chlorella", "Bone broth", "Coconut water", "Carob", "Cacao nibs", "Stevia",
            "Aloe vera", "Fenugreek", "Matcha", "Baobab", "Acai berries", "Goji berries", "Maca root"
    ));

    @Transactional
    public String addRecipe(UserRecipe recipe) {
        if (recipe == null) {
            return "Recipe data is missing!";
        }

        Set<String> recipeIngredients = new HashSet<>(recipe.getIngredients());
        Set<String> unhealthyIngredients = findUnhealthyIngredients(recipeIngredients);

        if (!unhealthyIngredients.isEmpty()) {
            return "This recipe contains unhealthy ingredients: " + unhealthyIngredients + ". Please prepare a healthy meal.";
        }

        recipeRepository.save(recipe);
        return "Recipe added successfully!";
    }

    public List<UserRecipe> getRecipesByUserName(String username) {
        return recipeRepository.findByUsername(username);
    }

    private Set<String> findUnhealthyIngredients(Set<String> recipeIngredients) {
        Set<String> unhealthyIngredients = new HashSet<>(recipeIngredients);
        unhealthyIngredients.removeAll(HEALTHY_INGREDIENTS);
        return unhealthyIngredients;
    }

    @Transactional
    public String deleteRecipeByUserAndDish(String username, String recipename) {
        UserRecipe recipe = recipeRepository.findByUsernameAndRecipename(username,recipename);

        if (recipe != null) {
            recipeRepository.delete(recipe);
            return "Recipe '" + recipename + "' deleted successfully for user '" + username + "'.";
        } else {
            return "Recipe '" + recipename + "' not found for user '" + username + "'.";
        }
    }

}
