import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) { setIsLoggedIn(true); setUser(user); setLoading(false); } 
    else {
      axios.get("https://uppercase-back-1eec3e8a2cf1.herokuapp.com//login", { withCredentials: true })
        .then(response => {
          const data = response.data;
          if (data.success) {
            setIsLoggedIn(true);
            setUser({ data: data.data });
            localStorage.setItem('user', JSON.stringify(data.data));
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Erreur lors de la vérification de la session:", error);
          setLoading(false);
        });
    }
  }, []);
  
  

  const login = (email, password) => { 
    return axios.post("https://uppercase-back-1eec3e8a2cf1.herokuapp.com//login", {
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
        localStorage.setItem('user', JSON.stringify(data));
    });
  };

  const logout = () => {
    axios.post("https://uppercase-back-1eec3e8a2cf1.herokuapp.com//logout", {}, {
        withCredentials: true
    })
    .then((response) => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    })
    .catch((error) => {
        console.error("Erreur lors de la déconnexion:", error);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
