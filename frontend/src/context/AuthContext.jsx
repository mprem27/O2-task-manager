import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, loginUser, registerUser } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token || user) {
        return;
      }

      try {
        const response = await getProfile();
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch {
        logout();
      }
    };

    loadProfile();
  }, [token, user]);

  const saveSession = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.data));

    setToken(response.token);
    setUser(response.data);
  };

  const login = async (formData) => {
    setLoading(true);

    try {
      const response = await loginUser(formData);
      saveSession(response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);

    try {
      const response = await registerUser(formData);
      saveSession(response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};