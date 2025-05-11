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

  const goToProf = async () => {
    const username = prompt("Correo:");
    const password = prompt("Contraseña:");

    try {
      const res = await axios.get(`http://localhost:8080/api/agile/profesionales/${encodeURIComponent(username)}`, {
        auth: {
          username,
          password
        }
      });
      setAuth({ username: username, password: password });

      console.log("Perfil cargado:", res.data);
      navigate(`/miPerfil/${encodeURIComponent(username)}`);
    } catch (error) {
      alert("Credenciales inválidas o acceso denegado");
    }
  };

  const goToEmp = async () => {
    const username = prompt("Correo:");
    const password = prompt("Contraseña:");

    try {
      const res = await axios.get(`http://localhost:8080/api/agile/empresas/${encodeURIComponent(username)}`, {
        auth: {
          username,
          password
        }
      });
      setAuth({ username: username, password: password });

      console.log("Perfil cargado:", res.data);
      navigate(`/miEmpresa/${encodeURIComponent(username)}`);
    } catch (error) {
      alert("Credenciales inválidas o acceso denegado");
    }
  };

  const handleLogout = () => {
    setAuth(null); // Esto borra también sessionStorage gracias al useEffect en AuthContext.jsx
    navigate("/"); // O redirige donde quieras
  };


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
          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <div>INICIA SESIÓN:</div>
            <button
              onClick={goToEmp}
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
              onClick={goToProf}
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
            <div>REGÍSTRATE:</div>
            <button
              onClick={goToEmpresa}
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
              onClick={goToProfesional}
              className="rounded-pill botonopcion"
              style={{
                height: "40px",
                backgroundColor: "#D83000",
                letterSpacing: "0.5px",
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