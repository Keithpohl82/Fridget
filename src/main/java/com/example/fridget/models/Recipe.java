package com.example.fridget.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "recipe", discriminatorType = DiscriminatorType.STRING)
public class Recipe extends AbstractClass{

    @ElementCollection
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    private List<Ingredients> ingredients;

    @ElementCollection
    @CollectionTable(name = "recipe_directions", joinColumns = @JoinColumn(name = "recipe_id"))
    private List<RecipeDirections> directions;

    private String name;

    private String description;

    private int prepTime;

    private int cookTime;

    private int totalTime;

    @Column(name = "photo_path")
    private String photoPath;

    @Column()
    private LocalDate dateCreated;

    private String cuisine;

    @ManyToOne
    @JsonBackReference //owner
    private User author;

    public Recipe(User author, LocalDate dateCreated, List<Ingredients> ingredients, List<RecipeDirections> directions, String name, String description, int prepTime, int cookTime, int totalTime, String photoPath, String cuisine) {
        super();
        this.ingredients = ingredients;
        this.directions = directions;
        this.name = name;
        this.description = description;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
        this.photoPath = photoPath;
        this.cuisine = cuisine;
        this.dateCreated = dateCreated;
        this.author = author;
    }

    public Recipe() {
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Long getId() {
        return super.getId();
    }

    public List<Ingredients> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredients> ingredients) {
        this.ingredients = ingredients;
    }

    public List<RecipeDirections> getDirections() {
        return directions;
    }

    public void setDirections(List<RecipeDirections> directions) {
        this.directions = directions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoURL) {
        this.photoPath = photoURL;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "ingredients=" + ingredients +
                ", directions=" + directions +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", prepTime=" + prepTime +
                ", cookTime=" + cookTime +
                ", totalTime=" + totalTime +
                ", photoPath='" + photoPath + '\'' +
                ", dateCreated=" + dateCreated +
                ", cuisine='" + cuisine + '\'' +
                '}';
    }
}
