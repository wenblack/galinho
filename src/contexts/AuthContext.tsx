import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/user";
import { mockUsers, emailExists } from "@/data/users";

const AUTH_STORAGE_KEY = "galinho_auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const parsedUser = JSON.parse(storedAuth);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored auth:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Persist auth to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    address?: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    if (emailExists(email)) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      address,
      createdAt: new Date(),
    };

    // Add to mock users (in real app, this would be an API call)
    mockUsers.push(newUser);

    // Auto-login after registration
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const updateUser = async (
    updates: Partial<Pick<User, "email" | "address">>,
  ): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists (if updating email)
    if (updates.email && updates.email !== user.email) {
      if (emailExists(updates.email)) {
        setIsLoading(false);
        return false;
      }
    }

    // Update user in state
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update user in mockUsers array
    const userIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }

    setIsLoading(false);
    return true;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
