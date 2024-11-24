import React, { createContext, useContext } from "react";
import useCurrentUser from "./useCurrentUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { currentUser, setUser, loading, hookError } = useCurrentUser();

  return (
    <UserContext.Provider value={{ currentUser, setUser, loading, hookError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
