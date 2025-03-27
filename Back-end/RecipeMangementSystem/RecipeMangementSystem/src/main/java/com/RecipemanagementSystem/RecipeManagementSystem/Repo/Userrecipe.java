package com.RecipemanagementSystem.RecipeManagementSystem.Repo;

import com.RecipemanagementSystem.RecipeManagementSystem.Entity.UserRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Userrecipe extends JpaRepository<UserRecipe, Integer> {

    @Query("SELECT r FROM UserRecipe r WHERE LOWER(r.username) = LOWER(:username)")
    List<UserRecipe> findByUsername(@Param("username") String username);
    boolean existsByUsername(String username);

    UserRecipe findByUsernameAndRecipename(String username, String recipename);

}
