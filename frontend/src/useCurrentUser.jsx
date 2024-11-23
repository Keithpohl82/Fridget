import { useState, useEffect } from "react";
import axios from "axios";

const useCurrentUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [hookError, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/userservice/current-user", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle case where the user is not logged in
          setUser(null);
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, hookError, setUser };
};

export default useCurrentUser;
