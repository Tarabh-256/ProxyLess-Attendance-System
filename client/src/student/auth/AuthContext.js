import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('SECRET_KEY'));

  const login = (token) => {
    localStorage.setItem('SECRET_KEY', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('SECRET_KEY');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
