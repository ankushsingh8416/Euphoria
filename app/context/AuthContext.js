"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setAuthToken(storedToken);
        const decodedToken = jwt.decode(storedToken);

        if (window.location.pathname === "/cpanel/login" && decodedToken?.isAdmin) {
          router.push("/cpanel/dashboard");
        }
      }
    }
  }, []);

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
