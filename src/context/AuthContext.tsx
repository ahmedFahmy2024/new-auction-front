"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedIsAdmin === "1") {
      setIsAdmin(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("isAdmin", "1");
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
