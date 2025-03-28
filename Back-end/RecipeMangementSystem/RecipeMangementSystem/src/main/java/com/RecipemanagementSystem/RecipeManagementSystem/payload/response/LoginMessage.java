package com.RecipemanagementSystem.RecipeManagementSystem.payload.response;

public class LoginMessage {
    private String message;
    private Boolean status;
    private String username; // New field added

    public LoginMessage(String message, Boolean status, String username) {
        this.message = message;
        this.status = status;
        this.username = username;
    }

    public LoginMessage() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getUsername() { // Getter for username
        return username;
    }

    public void setUsername(String username) { // Setter for username
        this.username = username;
    }

    @Override
    public String toString() {
        return "LoginMessage{" +
                "message='" + message + '\'' +
                ", status=" + status +
                ", username='" + username + '\'' +
                '}';
    }
}
