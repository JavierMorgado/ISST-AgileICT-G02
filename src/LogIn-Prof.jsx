import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerPerfilProfesional } from "./api/api";
import axios from "axios";
import { useAuth } from "./AuthContext";


export default function LogInProf(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();

  function goToRegisterProf() {
    navigate("/register-profesional");
  }
  function goToMain() {
    navigate("/");
  }

  

  const autenticarUsuario = async () => {
  try {
      const res = await axios.get(`http://localhost:8080/api/agile/profesionales/${encodeURIComponent(email)}`, {
        auth: {
          username:email,
          password:password
        }
      });
      setAuth({ username: email, password: password });

      console.log("Perfil cargado:", res.data);
      navigate(`/miPerfil/${encodeURIComponent(email)}`);
    } catch (error) {
      alert("Credenciales inválidas o acceso denegado");
      console.error("Error al autenticar:", error);
    }
  }


const manejoLogin = async () => {
  const ok = await autenticarUsuario(email, password);
  if (!ok) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  try {
    const { data } = await obtenerPerfilProfesional(email);
    navigate(`/miPerfil/${encodeURIComponent(data.correo)}`);
  } catch (error) {
    console.error("Error al cargar perfil:", error);
    alert("Error al obtener el perfil.");
  }
};


  const handleLogin = async () => {
    try {
      const { data } = await obtenerPerfilProfesional(email);
      console.log('Profesional encontrado:', data);
      navigate(`/miPerfil/${encodeURIComponent(data.correo)}`);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Usuario no encontrado');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
      <div className="d-flex justify-content-end align-items-center pt-3 me-3 w-50">
        <h1>INICIO DE SESIÓN PARA PROFESIONALES</h1>
      </div>

      <div
        className="rounded-5 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#D83000", width: "75%"}}
      >
        <h4 className="mb-4 mt-5">
          INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA
        </h4>

        <div className="mb-5 d-flex" style={{ gap: "1rem" }}>
          <input
            type="email"
            placeholder="menganito.perez@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />

          <input
            type="password"
            placeholder="contraseña123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />

          <button  onClick={autenticarUsuario} type="button" className="btn btn-light rounded-pill px-4 fw-semibold">
            Iniciar sesión
          </button>
        </div>

        <h4 className="mb-4">SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h4>

        <button
          onClick={goToRegisterProf}
          className="rounded-pill mb-5"
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

      <button
        onClick={goToMain}
        className="rounded-pill mt-5 mb-5"
        style={{
            width: "150px",
            backgroundColor: "#B0B0B0",
            letterSpacing: "0.5px",
            color: "#D83000",
            textAlign: "center",
        }}
    >
        MENÚ PRINCIPAL
    </button>
    </div>
  );
}
