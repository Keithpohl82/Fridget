package com.example.fridget.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.util.List;

@Entity
public class GroceryList extends AbstractClass{

    @ManyToOne
    @JsonBackReference
    private User user;

    //the title of the list.
    private String listtitle;

    //The list of items or tasks
    private List<String> items;

    //this will be used to keep tract of completed items if user leaves the list or site.
    private boolean checked;

    public GroceryList(User user, String listtitle, List<String> items, boolean checked) {
        this.user = user;
        this.listtitle = listtitle;
        this.items = items;
        this.checked = checked;
    }

    public GroceryList() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getListtitle() {
        return listtitle;
    }

    public void setListtitle(String listtitle) {
        this.listtitle = listtitle;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
