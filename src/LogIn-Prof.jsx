import { useState } from "react";
import reactLogo from "./assets/react.svg";
import agylelogo from "./assets/agyleICT.png";
import viteLogo from "/vite.svg";

export default function LogInProf(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToRegisterProf() {
    window.location.href = "/register-profesional";
  }

  return (
    <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
      <div className="d-flex justify-content-end align-items-center pt-3 me-3 w-50">
        <h1>INICIO DE SESIÓN PARA PROFESIONALES</h1>
      </div>

      <div
        className="rounded-5 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#D83000", width: "75%", height: "50%" }}
      >
        <h4 className="mb-4">
          INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA
        </h4>

        <div className="mb-5 d-flex" style={{ gap: "1rem" }}>
          <input
            type="email"
            placeholder="menganito.perez@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="contraseña123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <h4 className="mb-4">SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h4>

        <button
          onClick={goToRegisterProf}
          className="rounded-pill"
          style={{
            width: "150px",
            height: "40px",
            backgroundColor: "#fff",
            letterSpacing: "0.5px",
            color: "#D83000",
            textAlign: "center",
          }}
        >
          REGÍSTRATE
        </button>
      </div>
    </div>
  );
}
