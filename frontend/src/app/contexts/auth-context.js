// AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserInfo(token).then(setUser);
    }
  }, []);

  const login = async (email, password) => {
    const { token } = await loginAPI(email, password);
    localStorage.setItem('authToken', token);
    fetchUserInfo(token).then(setUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};