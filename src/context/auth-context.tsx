import React from "react";
import { Language } from "./language-context";

export interface User {
  id: number;
  email: string;
  names: string;
  lastname: string;
  phone: string;
  dni: string;
  birthDate: string;
  photo: string;
  userType: string;
  settings: {
    language: "en" | "es";
    notifications: boolean;
  };
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "buyer" | "seller") => Promise<void>;
  logout: () => void;
  updateUserSettings: (settings: Partial<User["settings"]>) => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const isAuthenticated = user !== null;

  // Mock login function
  const login = async (email: string, password: string) => {
    const response = await fetch("https://backendecommerce-production-fd6f.up.railway.app/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser({
      id: data.id,
      names: data.names,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      dni: data.dni,
      birthDate: data.birthDate,
      photo: data.photo,
      userType: data.userType,
      settings: {
        language: "en",
        notifications: true,
      },
    });
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: "buyer" | "seller") => {
    // In a real app, this would make an API call
    setUser({
      id: 3,
      names: name,
      lastname: "",
      email,
      phone: "",
      dni: "",
      birthDate: "",
      photo: "path/to/photo.jpg",
      userType: role,
      settings: {
        language: "en",
        notifications: true,
      },
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserSettings = (settings: Partial<User["settings"]>) => {
    if (user) {
      setUser({
        ...user,
        settings: {
          ...user.settings,
          ...settings,
        },
      });
    }
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      setUser({
        id: data.id,
        names: data.names,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        birthDate: data.birthDate,
        photo: data.photo,
        userType: data.userType,
        settings: {
          language: "en",
          notifications: true,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserSettings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};