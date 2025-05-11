import { useState } from "react";
import agylelogo from "./assets/agyleICT.png";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function Home(props) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  
  const goToEmpresa = () => {
    navigate("/register-empresa");
  };

  const goToProfesional = () => {
    navigate("/register-profesional");
  };


  const handleLogout = () => {
    setAuth(null); // Esto borra también sessionStorage gracias al useEffect en AuthContext.jsx
    navigate("/"); // O redirige donde quieras
  };

  const goToLoginProf = () => {
    navigate("/login-profesional");
  };

  const goToLoginEmp = () => {
    navigate("/login-empresa");
  }


  return (
    <div
      className="vw-100 vh-100"
      style={{
        backgroundImage: `url(${agylelogo})`,
        backgroundSize: "contain",
        backgroundPositionX: "center",
        backgroundPositionY: "3rem",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="d-flex justify-content-end align-items-center pt-3 me-3">
        {auth ? (
          <button onClick={handleLogout} style={{backgroundColor: '#B0B0B0'}}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <div>INICIA SESIÓN:</div>
            <button
              onClick={goToLoginEmp}
              className="rounded-pill ms-3 me-3 botonopcion"
              style={{
                height: "40px",
                backgroundColor: "#002C4B",
                letterSpacing: "0.5px",
                color: "white",
              }}
            >
              EMPRESA
            </button>
            <button
              onClick={goToLoginProf}
              className="rounded-pill ms-3 me-3 botonopcion"
              style={{
                height: "40px",
                backgroundColor: "#D83000",
                letterSpacing: "0.5px",
                color: "white",
              }}
            >
              PROFESIONAL
            </button>
          </>
        )}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "9rem" }}
      >
        <h1 className='heroText'>Agile I C T</h1>
        <h4 className="st">Hire Smart</h4>
        <h4 className="st">Hire Fast</h4>
      </div>
    </div>
  );
}