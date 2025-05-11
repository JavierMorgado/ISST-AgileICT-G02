import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registrarProfesional } from "./api/api";
import FormInput from './FormInput';
import { useAuth } from "./AuthContext";

export default function RegisterProf(props) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    movil: "",
    puesto: "",
    cualidades: "",
    fechaInicio: null,
    fechaFin: null,
    indefinidoInicio: false,
    indefinidoFin: false,
  });

  const [cualidadesList, setCualidadesList] = useState([]);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.movil ||
      !formData.puesto
    ) {
      alert("Por favor, rellene todos los campos");
      return;
    }
    // Crear el objeto JSON para enviar
    const dataToSend = {
      nombre: formData.nombre,
      password: formData.password,
      correo: formData.email,
      telefono: formData.movil,
      puesto: formData.puesto,
      cualidades: cualidadesList, // Usar cualidadesList como array
      fechaIni: formData.fechaInicio ? formData.fechaInicio.toISOString().split('T')[0] : null,
      fechaFin: formData.fechaFin ? formData.fechaFin.toISOString().split('T')[0] : null,
    };
    try {
      const response = await registrarProfesional(dataToSend);
      console.log('Profesional registrado:', response.data);

      const res = await axios.get(`http://localhost:8080/api/agile/profesionales/${encodeURIComponent(formData.email)}`, {
        auth: {
          username: formData.email,
          password: formData.password,
        }
      });
      setAuth({ username: formData.email, password: formData.password });

      console.log("Perfil cargado:", res.data);
      navigate(`/miPerfil/${encodeURIComponent(formData.email)}`);

    } catch (error) {
      console.error('Error al registrar el profesional:', error);
      alert("Error al registrar el profesional. Inténtalo de nuevo.");
    }

    console.log("Datos enviados:", dataToSend);
  };


  const handleAddCualidad = (e) => {
    e.preventDefault();
    if (formData.cualidades.trim() !== "") {
      setCualidadesList([...cualidadesList, formData.cualidades.trim()]);
      setFormData({ ...formData, cualidades: "" }); // Clear the input field
    }
  };

  const handleRemoveCualidad = (index) => {
    setCualidadesList(cualidadesList.filter((_, i) => i !== index));
  };

  const handleIndefinidoChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
      [field === "indefinidoInicio" ? "fechaInicio" : "fechaFin"]: null, // Clear the date if marked as "Indefinido"
    }));
  };

  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100"
      style={{ paddingTop: "1rem" }}
    >
      <h1>
        REGÍSTRATE COMO <br /> PROFESIONAL
      </h1>

      <form
        onSubmit={handleSubmit}
        className="btext-white rounded-4 mt-4 p-4 d-flex flex-column align-items-center mb-5"
        style={{ backgroundColor: "#D83000", width: "50%" }}
      >
        <h5 className="text-uppercase mb-4">Datos personales</h5>
          <div className="mb-3 w-100">
            <h6 className="text-uppercase">Nombre</h6>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. AgyleICT"
            />
          </div>
          <div className="mb-3 w-100">
            <h6 className="text-uppercase">Contraseña</h6>
            <input
              type="text"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 w-100">
            <h6 className="text-uppercase">Correo</h6>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rh@agyleict.com"
            />
          </div>
          <div className="mb-4 w-100">
            <h6 className="text-uppercase">Móvil</h6>
            <input
              type="text"
              name="movil"
              value={formData.movil}
              onChange={handleChange}
              placeholder="91 654 55 45"
            />
          </div>

          <h5 className="text-uppercase mb-4 mt-4">Datos profesionales</h5>
          
          
          <div className="mb-5 align-items-center">
              <div className="d-flex flex-column align-items-center">
                <h6>Nombre del puesto</h6>
                <input
                  type="text"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  placeholder="EJ. DESARROLLADOR FULL STACK"
                  className="mb-3"
                />

                <h6>Cualdiades</h6>
                <input
                  type="text"
                  name="cualidades"
                  value={formData.cualidades}
                  onChange={handleChange}
                  placeholder="JAVA"
                  className="mb-3"
                />

                {cualidadesList.map((cualidad, index) => (
                    <div
                      key={index}
                      className="btn btn-light rounded-pill px-3 py-1 mb-2"
                      style={{ border: "1px solid #ccc", cursor: "pointer", marginTop: "5px" }}
                      onClick={() => handleRemoveCualidad(index)}
                      title="Haz clic para eliminar"
                    >
                      {cualidad}
                    </div>
                ))}

                <button
                    onClick={handleAddCualidad}
                    className="btn btn-light"
                    type="button"
                >
                    Añadir
                </button>

              </div>
          </div>

          <div className="mb-3 w-100">
            <h5 className="text-uppercase mb-3">Disponibilidad</h5>
            <div className="d-flex justify-content-between">

              <div className="flex-grow-1 d-flex flex-column align-items-center">
                <h6 className="text-uppercase">Fecha de Inicio</h6>
                <DatePicker
                  selected={formData.fechaInicio}
                  onChange={(date) =>
                    setFormData({ ...formData, fechaInicio: date })
                  }
                  placeholderText="Selecciona una fecha"
                  disabled={formData.indefinidoInicio}
                  dateFormat="dd/MM/yyyy"
                  style={{ color: "black" }}
                />
                <div className="d-flex flex-row justify-content-center align-items-center">
                <h6>INDEFINIDO</h6>
                <div className="form-switch mt-2" style={{ marginBottom: "1rem", maxWidth: "50px" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="indefinidoInicio"
                    checked={formData.indefinidoInicio}
                    onChange={() => handleIndefinidoChange("indefinidoInicio")}
                    style={{ transform: "scale(0.8)" }}
                  />
                </div>
              </div>
            </div>

              {/* Fecha de Fin */}
            <div className="flex-grow-1 d-flex flex-column align-items-center">
              <h6 className="text-uppercase">Fecha de Fin</h6>
              <DatePicker
                selected={formData.fechaFin}
                onChange={(date) =>
                  setFormData({ ...formData, fechaFin: date })
                }
                placeholderText="Selecciona una fecha"
                disabled={formData.indefinidoFin}
                dateFormat="dd/MM/yyyy"
                style={{ color: "black" }}
              />
              <div className="d-flex flex-row justify-content-center align-items-center">
                <h6>INDEFINIDO</h6>
                <div className="form-switch mt-2" style={{ marginBottom: "1rem" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="indefinidoFin"
                    checked={formData.indefinidoFin}
                    onChange={() => handleIndefinidoChange("indefinidoFin")}
                    style={{ transform: "scale(0.8)" }}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-light rounded-pill px-4 fw-semibold"
        >
          REGISTRARSE
        </button>
      </form>
    </div>
  );
}
