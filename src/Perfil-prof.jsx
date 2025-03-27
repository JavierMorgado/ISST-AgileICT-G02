import { useState } from "react";
import reactLogo from "./assets/react.svg";
import agylelogo from "./assets/agyleICT.png";
import viteLogo from "/vite.svg";

export default function PerfilProf(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToOfertas() {
    window.location.href = "/miPerfil";
  }

  return (
    <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
      <div className="d-flex justify-content-center align-items-center pt-3 w-100 mb-3 position-relative">
        <h1 className="text-center">MI PERFIL</h1>
        <button
          onClick={goToOfertas}
          className="rounded-pill position-absolute botonopcion"
          style={{
            right: "15%", // Ajusta la posición del botón a la derecha
            width: "150px",
            height: "40px",
            backgroundColor: "#002C4B",
            letterSpacing: "0.5px",
            color: "white !important",
            textAlign: "center",
          }}
        >
          VER OFERTAS
        </button>
      </div>

      <div
        className="rounded-5 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "#D83000",
          width: "75%",
          height: "auto",
          padding: "2rem",
        }}
      >
        {/* FALTA CREAR IMG */}

        {/* NOMBRE */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">NOMBRE</h5>
          <h6 className="mb-4">Menganito</h6>
        </div>

        {/* PUESTO */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">PUESTO</h5>
          <h6 className="mb-4">Jefe de Producto</h6>
        </div>

        {/* CUALIDADES TÉCNICAS */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">CUALIDADES TÉCNICAS</h5>
          <h6 className="mb-4">C++</h6>
        </div>

        {/* DISPONIBILIDAD */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">DISPONIBILIDAD</h5>
          <h6 className="mb-4">10/10/2025 - 10/10/2026</h6>
        </div>
      </div>
    </div>
  );
}
