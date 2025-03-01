"use client";
import { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export const AuthTokenContext = createContext();

export const AuthTokenProvider = ({ children }) => {
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
    <AuthTokenContext.Provider value={{ authToken, setToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
};
