import { useState, useEffect, useCallback } from "react";

const useCurrentUser = () => {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hookError, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/userservice/current-user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 401) {
        setUser(null); // No logged-in user
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/userservice/current-user", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Fetched current user:", userData); // Debug log
        setUser(userData); // Ensure the full UserDTO is set, including id
      } else {
        console.error("Failed to fetch current user.");
        setUser(null); // No user logged in
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { currentUser, loading, hookError, fetchUser, setUser, refreshUser };
};

export default useCurrentUser;
