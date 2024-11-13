package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "recipe", discriminatorType = DiscriminatorType.STRING)
public class Recipe extends AbstractClass{
    
    @OneToMany
    @Column(unique = false)
    private List<Ingredients> ingredients;

    @Column(length = 2000)
    private String recipeDirections;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeReview> reviews;

    private String name;

    private String description;

    private int prepTime;

    private int cookTime;

    private int totalTime;

    private String photoURL;

    private String creator;

    public Recipe(String creator ,List<RecipeReview> reviews, List<Ingredients> ingredients, String recipeDirections, String name, String description, int prepTime, int cookTime, int totalTime, String photoURL) {
        super();
        this.creator = creator;
        this.ingredients = ingredients;
        this.name = name;
        this.description = description;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
        this.photoURL = photoURL;
        this.recipeDirections = recipeDirections;
        this.reviews = reviews;
    }

    public Recipe() {

    }

    public Long getId() {
        return super.getId();
    }

    public String getRecipeDirections() {
        return recipeDirections;
    }

    public void setRecipeDirections(String recipeDirections) {
        this.recipeDirections = recipeDirections;
    }

    public List<RecipeReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<RecipeReview> reviews) {
        this.reviews = reviews;
    }
    public List<Ingredients> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredients> ingredients) {
        this.ingredients = ingredients;
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

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "ID=" + getId() +
                "ingredients=" + ingredients +
                ", recipeDirections=" + recipeDirections +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", prepTime=" + prepTime +
                ", cookTime=" + cookTime +
                ", totalTime=" + totalTime +
                ", photoURL='" + photoURL + '\'' +
                '}';
    }
}
