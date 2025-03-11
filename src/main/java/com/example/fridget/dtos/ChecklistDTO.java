package com.example.fridget.dtos;

import com.example.fridget.models.ItemTask;

import java.util.List;

public class ChecklistDTO {
    private Long userId;
    private String listname;
    private List<ItemTask> listitem;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
