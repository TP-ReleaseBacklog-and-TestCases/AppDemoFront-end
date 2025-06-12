import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  settings: {
    language: string;
    notifications: boolean;
  };
};

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
    // In a real app, this would make an API call
    if (email === "demo@example.com" && password === "password") {
      setUser({
        id: "user1",
        name: "Demo User",
        email: "demo@example.com",
        role: "buyer",
        settings: {
          language: "English",
          notifications: true,
        },
      });
    } else if (email === "seller@example.com" && password === "password") {
      setUser({
        id: "seller1",
        name: "Demo Seller",
        email: "seller@example.com",
        role: "seller",
        settings: {
          language: "English",
          notifications: true,
        },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: "buyer" | "seller") => {
    // In a real app, this would make an API call
    setUser({
      id: "new-user",
      name,
      email,
      role,
      settings: {
        language: "English",
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