import { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar axios

export default function PerfilProf(props) {
  const [profesionalData, setProfesionalData] = useState({
    nombre: "",
    puesto: "",
    cualidades: [],
    fechaIni: "",
    fechaFin: "",
  });

  useEffect(() => {
    const fetchProfesionalData = async () => {
      try {
        if (!props.profesional) {
          console.error("Correo no proporcionado en props.");
          alert("Correo no proporcionado.");
          return;
        }

        const apiUrl = `http://localhost:8080/api/agile/profesionales/${props.profesional}`;
        console.log("Fetching data from:", apiUrl);

        const response = await axios.get(apiUrl);
        console.log("API response:", response.data);

        setProfesionalData({
          nombre: response.data.nombre,
          puesto: response.data.puesto,
          cualidades: response.data.cualidades,
          fechaIni: response.data.fechaIni,
          fechaFin: response.data.fechaFin,
        });
      } catch (error) {
        console.error("Error fetching professional data:", error);
        alert("Error al obtener los datos del profesional.");
      }
    };

    fetchProfesionalData();
  }, [props.correo]);

  function goToOfertas() {
    window.location.href = "/misOfertas";
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
          <h6 className="mb-4">{profesionalData.nombre}</h6>
        </div>

        {/* PUESTO */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">PUESTO</h5>
          <h6 className="mb-4">{profesionalData.puesto}</h6>
        </div>

        {/* CUALIDADES TÉCNICAS */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">CUALIDADES TÉCNICAS</h5>
          <h6 className="mb-4">{profesionalData.cualidades.join(", ")}</h6>
        </div>

        {/* DISPONIBILIDAD */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">DISPONIBILIDAD</h5>
          <h6 className="mb-4">{profesionalData.fechaIni} - {profesionalData.fechaFin}</h6>
        </div>
      </div>
    </div>
  );
}
