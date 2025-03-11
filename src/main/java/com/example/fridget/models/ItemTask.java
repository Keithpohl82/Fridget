package com.example.fridget.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class ItemTask{

    private String listitem;

    private boolean iscomplete;

    public ItemTask(String listitem, boolean iscomplete) {
        this.listitem = listitem;
        this.iscomplete = iscomplete;
    }

    public ItemTask() {
    }

    public boolean isIscomplete() {
        return iscomplete;
    }

    public void setIscomplete(boolean iscomplete) {
        this.iscomplete = iscomplete;
    }

    public String getListitem() {
        return listitem;
    }

    public void setListitem(String listitem) {
        this.listitem = listitem;
    }
}
