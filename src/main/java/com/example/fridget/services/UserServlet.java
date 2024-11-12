package com.example.fridget.services;

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
        // Here, 'request' is provided by the servlet container.

        // You can now use 'request' to get session information, parameters, etc.
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");

        if (user != null) {
            response.getWriter().println("Hello, " + user.getUsername());
        } else {
            response.getWriter().println("No user found in the session.");
        }
    }
}
