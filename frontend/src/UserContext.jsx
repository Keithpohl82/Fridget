import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const UserContext = createContext({user: null});

// Create the provider
export const UserProvider = ({ children, value = {user: null} }) => {
  // Initialize user state with data from sessionStorage (if available)
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user data to sessionStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user"); // Clean up if user is null
    }
  }, [user]);

  return (
    <UserContext.Provider value={{value}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if(!context){
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const useCurrentUser = () => {
  const { user } = useUserContext();
  return user; // Returns null if no user is logged in
};
