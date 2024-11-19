package com.example.fridget.services;

import com.example.fridget.models.Recipe;
import com.example.fridget.models.User;
import jakarta.servlet.ServletException;
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

        // Retrieve the User object from the session
        User user = (User) session.getAttribute("user"); // Assuming session stores a User object

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        if (user != null) {
            // Get the user's ID as a long
            long userId = user.getId(); // Ensure the User class has a getId() method returning a long

            // Respond with the user's information
            response.getWriter().println("Hello, User ID: " + userId);
        } else {
            // Handle case where no user is found in the session
            response.getWriter().println("No user found in the session.");
        }
    }
}
