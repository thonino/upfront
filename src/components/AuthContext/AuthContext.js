import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    axios.get("http://localhost:5000/login", {
        withCredentials: true   
    })
    .then(response => {
        const data = response.data;
        if (data.success) {
            setIsLoggedIn(true);
            setUser({ data: data.data }); 
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
        // console.log("Data from login (session check):", data);  
    })
    .catch(error => {
        console.error("Erreur lors de la vérification de la session:", error);
    });
}, []);



  // Fonction pour gérer la connexion
  const login = (email, password) => { 
    return axios.post("http://localhost:5000/login", {
        email: email,
        password: password
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    })
    .then((response) => {
        const data = response.data;
        setIsLoggedIn(true);
        setUser(data);
    });
  };

  // Fonction pour gérer la déconnexion
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
