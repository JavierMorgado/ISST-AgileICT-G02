import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registrarProfesional } from "./api/api";

export default function RegisterProf(props) {
  const navigate = useNavigate();
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

      navigate(`/miPerfil/${encodeURIComponent(dataToSend.correo)}`);
      //goToPerfil(); // Redirigir al perfil después del registro exitoso

    } catch (error) {
      console.error('Error al registrar el profesional:', error);
      alert("Error al registrar el profesional. Inténtalo de nuevo.");
    }

    console.log("Datos enviados:", dataToSend);
    //alert("Registro exitoso");
  };

  // function goToPerfil() {
  //   window.location.href = "/miPerfil";
  // }

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
        className="btext-white rounded-4 mt-4 p-4 d-flex flex-column align-items-center"
        style={{ backgroundColor: "#D83000", width: "50%" }}
      >
        <h5 className="text-uppercase mb-4">Datos personales</h5>
        {/* FALTA CREAR IMG */}
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
        <div className="mb-3 w-100">
          <h6 className="text-uppercase">Puesto</h6>
          <input
            type="text"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            placeholder="Ej. Jefe de Producto"
          />
        </div>
        <div className="mb-3 w-100">
          <h6 className="text-uppercase">Cualidades Técnicas</h6>
          <div className="d-flex">
            <input
              type="text"
              name="cualidades"
              value={formData.cualidades}
              onChange={handleChange}
              placeholder="Ej. C++"
              className="flex-grow-1"
            />

            <button
              onClick={handleAddCualidad}
              className="btn btn-light ms-2"
              type="button"
            >
              Añadir
            </button>
          </div>
          <div className="mt-3">
            {cualidadesList.map((cualidad, index) => (
              <div
                key={index}
                className="d-inline-block bg-light text-dark rounded-pill px-3 py-1 me-2 mb-2"
                style={{ border: "1px solid #ccc", cursor: "pointer" }}
                onClick={() => handleRemoveCualidad(index)}
                title="Haz clic para eliminar"
              >
                {cualidad}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3 w-100">
          <h6 className="text-uppercase">Disponibilidad</h6>
          <div className="d-flex justify-content-between">
            {/* Fecha de Inicio */}
            <div className="me-3 flex-grow-1 d-flex flex-column align-items-center">
              <label className="text-uppercase">Fecha de Inicio</label>
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
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="indefinidoInicio"
                  checked={formData.indefinidoInicio}
                  onChange={() => handleIndefinidoChange("indefinidoInicio")}
                />
                <label
                  className="form-check-label"
                  htmlFor="indefinidoFin"
                  style={{ paddingLeft: "10px" }}
                >
                  Indefinido
                </label>
              </div>
            </div>

            {/* Fecha de Fin */}
            <div className="flex-grow-1 d-flex flex-column align-items-center">
              <label className="text-uppercase">Fecha de Fin</label>
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
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="indefinidoFin"
                  checked={formData.indefinidoFin}
                  onChange={() => handleIndefinidoChange("indefinidoFin")}
                />
                <label
                  className="form-check-label"
                  htmlFor="indefinidoFin"
                  style={{ paddingLeft: "10px" }}
                >
                  Indefinido
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-light rounded-pill px-4 fw-semibold"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
