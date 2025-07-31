import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'collection-point' | 'factory';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  balance: number;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login - accepts any credentials
  const login = (username: string, password: string, role: UserRole): boolean => {
    if (username && password) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        role,
        balance: role === 'user' ? 50000 : role === 'collection-point' ? 150000 : 500000,
        location: role !== 'user' ? 'Toshkent, O\'zbekiston' : undefined
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};