package com.example.fridget.services;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;


public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();

        User user = (User) session.getAttribute("username");
        String recipeCreator = (String) session.getAttribute("username");
        Recipe creator = new Recipe();
        creator.setCreator(user.getUsername());
        if (user != null) {
            response.getWriter().println("Hello, " + user.getUsername());
        } else {
            response.getWriter().println("No user found in the session.");
        }
    }
}
