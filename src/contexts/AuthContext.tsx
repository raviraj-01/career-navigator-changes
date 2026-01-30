import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signup: (userData: Omit<UserProfile, "id" | "joinDate">) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("resumeai_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const signup = (userData: Omit<UserProfile, "id" | "joinDate">) => {
    const newUser: UserProfile = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    localStorage.setItem("resumeai_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const login = (email: string, password: string) => {
    // Simple mock login - in production, validate against backend
    const mockUser: UserProfile = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      phone: "+91 98765 43210",
      location: "India",
      bio: "Resume Builder User",
      joinDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    localStorage.setItem("resumeai_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("resumeai_user");
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateProfile = (profile: UserProfile) => {
    localStorage.setItem("resumeai_user", JSON.stringify(profile));
    setUser(profile);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
