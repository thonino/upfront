import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/check-session", {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
    });
  }, []);

  const login = (email, password) => { 
    return fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data);
        console.log("React User Data:", data);
      });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
