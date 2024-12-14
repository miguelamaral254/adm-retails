'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Inicializa com base no localStorage
    return !!localStorage.getItem('token');
  });

  const login = (token: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setIsLoggedIn(true); // Atualiza o estado global
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false); // Atualiza o estado global
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};