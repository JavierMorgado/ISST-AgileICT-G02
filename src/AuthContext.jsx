// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = sessionStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (auth) {
      sessionStorage.setItem("auth", JSON.stringify(auth));
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

