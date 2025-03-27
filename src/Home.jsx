import { useState } from "react";
import reactLogo from "./assets/react.svg";
import agylelogo from "./assets/agyleICT.png";
import viteLogo from "/vite.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();

  const goToEmpresa = () => {
    navigate("/login-empresa");
  };

  const goToProfesional = () => {
    navigate("/login-profesional");
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
        <p>Inicia sesión como:</p>
        <button
          onClick={goToEmpresa}
          className="rounded-pill ms-3 me-3 botonopcion"
          style={{
            width: "104px",
            height: "40px",
            backgroundColor: "#002C4B",
            letterSpacing: "0.5px",
            color: "white",
          }}
        >
          Empresa
        </button>
        <button
          onClick={goToProfesional}
          className="rounded-pill botonopcion"
          style={{
            width: "121px",
            height: "40px",
            backgroundColor: "#D83000",
            letterSpacing: "0.5px",
          }}
        >
          Profesional
        </button>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "9rem" }}
      >
        <h0>Agile I C T</h0>
        <st>Hire Smart</st>
        <st>Hire Fast</st>
      </div>
    </div>
  );
}
