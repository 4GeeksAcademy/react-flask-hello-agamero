import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/"); // Redirige al usuario a la ruta "/"
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        {!store.isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="btn btn-success">Login</button>
            </Link>
            <div className="ml-auto">
              <Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="ml-auto">
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};
