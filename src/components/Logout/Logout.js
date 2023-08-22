import React, { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Logique de déconnexion, par exemple appel à une API, suppression des informations d'identification, etc.
    logout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
