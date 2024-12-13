"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
  role: null,
  isTokenExpired: () => false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  // Función para validar si el token ha expirado
  const isTokenExpired = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; return Date.now() > expirationTime; // Verifica si ya expiró
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return true; 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (token && userRole && userData && !isTokenExpired()) {
      setIsAuthenticated(true);
      setRole(userRole);
      setUser(userData);
    } else if (router.pathname === '/admin-dashboard' || router.pathname === '/employee-dashboard') {
      logout();
    }
  }, []);

  const login = (userData, authToken) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("userData", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
    setRole(userData.role);

    redirectToDashboard(userData.role);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    setIsAuthenticated(false);
    setUser(null);
    setRole(null);

    router.push("/"); 
  };

  const redirectToDashboard = (userRole) => {
    switch (userRole) {
      case "administrator":
        router.push("/admin-dashboard");
        break;
      case "employee":
        router.push("/employee-dashboard");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        role,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
