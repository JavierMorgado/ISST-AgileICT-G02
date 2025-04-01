import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerPerfilProfesional } from "./api/api";

export default function PerfilProf(props) {
  const navigate = useNavigate();
  const { correo } = useParams();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await obtenerPerfilProfesional(correo);
        setPerfil(data);
        console.log(data);
        console.log(perfil);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    fetchPerfil();
  }, [correo]);


  function goToOfertas() {
    // Redirige a misOfertas pasando el correo como prop
    navigate(`/misOfertas/${encodeURIComponent(correo)}`);
    //window.location.href = "/misOfertas";
  }

  // Si el perfil aún no se ha cargado, muestra un mensaje de carga o un spinner
  if (!perfil) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Cargando perfil...</h2>
      </div>
    );
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
          <h6 className="mb-4">{perfil.nombre}</h6>
        </div>

        {/* PUESTO */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">PUESTO</h5>
          <h6 className="mb-4">{perfil.puesto}</h6>
        </div>

        {/* CUALIDADES TÉCNICAS */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">CUALIDADES TÉCNICAS</h5>
          <h6 className="mb-4">C++</h6>
        </div>

        {/* DISPONIBILIDAD */}
        <div className="mb-3 w-100 text-center">
          <h5 className="mb-2">DISPONIBILIDAD</h5>
          <h6 className="mb-4">{perfil.fechaIni} - {perfil.fechaFin}</h6>
        </div>
      </div>
    </div>
  );
}
