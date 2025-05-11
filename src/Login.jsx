import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { obtenerPerfilEmpresa, obtenerPerfilProfesional } from "./api/api";

export default function Login() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("profesional"); // o "empresa"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Paso 1: autenticación con Spring Security
      await axios.post(
        "http://localhost:8080/login",
        new URLSearchParams({
          username: email,
          password: password
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        }
      );

      // Paso 2: obtener perfil y redirigir
      if (tipoUsuario === "profesional") {
        const perfilRes = await obtenerPerfilProfesional(email);
            if (!perfilRes || !perfilRes.data) {
            alert("No se pudo obtener el perfil tras iniciar sesión.");
            return;
            }
            navigate(`/miPerfil/${encodeURIComponent(perfilRes.data.correo)}`);

      } else {
        const { data } = await obtenerPerfilEmpresa(email);
        navigate(`/miEmpresa/${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Correo o contraseña incorrectos.");
    }
  };

  const logear  = async () => {
    axios.post('http://localhost:8080/login', {
    username: email,
    password: password
    })
    .then(response => {
    const token = response.data.token; // El backend debe devolver el token como JSON
    localStorage.setItem('token', token); // Guardar token en el navegador
    })
    .catch(error => {
    console.error('Error de login', error);
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Iniciar sesión</h1>

      <form
        onSubmit={logear}
        className="d-flex flex-column p-4 rounded-4"
        style={{ backgroundColor: "#f0f0f0", minWidth: "300px" }}
      >
        <div className="mb-3">
          <label className="form-label">Tipo de usuario</label>
          <select
            className="form-select"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="profesional">Profesional</option>
            <option value="empresa">Empresa</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
