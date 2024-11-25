package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Checklist extends AbstractClass{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String listname;

    @ElementCollection
    @CollectionTable(name = "userchecklist", joinColumns = @JoinColumn(name = "checklist_id"))
    private List<ItemTask> listitem;

    public Checklist(User user, String listname, List<ItemTask> listitem) {
        this.user = user;
        this.listname = listname;
        this.listitem = listitem;
    }

    public Checklist() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getListname() {
        return listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
    }

    public List<ItemTask> getListitem() {
        return listitem;
    }

    public void setListitem(List<ItemTask> listitem) {
        this.listitem = listitem;
    }
}
