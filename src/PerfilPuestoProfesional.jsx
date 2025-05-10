import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfesionalPuesto } from "./api/api";

export default function PerfilPuestoProfesional(props) {
  const navigate = useNavigate();
  const { puestoId } = useParams();
  const { email} = useParams();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await getProfesionalPuesto(puestoId);
        setPerfil(data);
        console.log(data);
        console.log(perfil);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    fetchPerfil();
  }, [puestoId]);


  function goToPerfil(){
      navigate(`/miEmpresa/${encodeURIComponent(email)}`)
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
      <div className='d-flex align-items-center pt-3 mt-5 mb-5'>
          <h1>TU NUEVO PROFESIONAL</h1>
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

        <div className="mb-3 w-100 text-center">
          <h3 className="mb-2">NOMBRE</h3>
          <div className="white mb-4">{perfil.nombre}</div>
        </div>

        <div className="mb-3 w-100 text-center">
          <h3 className="mb-2">PUESTO</h3>
          <div className="white mb-4">{perfil.puesto}</div>
        </div>

        <div className="mb-3 w-100 text-center">
          <h3 className="mb-2">CUALIDADES TÉCNICAS</h3>
          <div className='d-flex mb-5 justify-content-center'>
              {perfil ? perfil.cualidades.map((cualidad, index) => (
                  <div key={index} className='bg-white rounded-5 p-2 me-2 ms-2'>{cualidad}</div>
              )) : "cargando..."}
          </div>
        </div>

        <div className="mb-3 w-100 text-center">
          <h3 className="mb-2">DISPONIBILIDAD</h3>
          {perfil && perfil.fechaFin === "indefinido" && perfil.fechaIni === "indefinido" ? (
              <div className='white mb-5'>Indefinido</div>
          ) : (
              <div className='white mb-5'>
                  {perfil ? perfil.fechaIni : "cargando..."} - {perfil ? perfil.fechaFin : "cargando..."}
              </div>
          )}
        </div>
    
        <button  onClick={goToPerfil} type="button" className="btn btn-light rounded-pill px-4 fw-semibold mb-5">
              VOLVER A MI PERFIL
        </button>
      </div>

    </div>
  );
}
