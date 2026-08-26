"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi, User } from "./api";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (userData: { name: string; email: string; password: string }) => Promise<User>;
  logout: () => void;
  setUserData: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("shoply_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const setUserData = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("shoply_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("shoply_user");
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await authApi.login(credentials);
      setUserData(res.data);
      return res.data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await authApi.register(userData);
      setUserData(res.data);
      return res.data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserData(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
