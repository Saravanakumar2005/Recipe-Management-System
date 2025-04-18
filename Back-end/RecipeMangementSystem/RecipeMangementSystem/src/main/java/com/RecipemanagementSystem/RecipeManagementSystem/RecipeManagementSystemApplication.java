package com.RecipemanagementSystem.RecipeManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableJpaRepositories("com.RecipemanagementSystem.RecipeManagementSystem.Repo")
public class RecipeManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeManagementSystemApplication.class, args);
	}

}
