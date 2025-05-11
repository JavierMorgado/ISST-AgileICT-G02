import React from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerPerfilProfesional } from "./api/api";
import MisOfertas from "./MisOfertas";
import axios from "axios";
import { useAuth } from "./AuthContext";


export default function PerfilProf(props) {
  const navigate = useNavigate();
  const { correo } = useParams();
  const [perfil, setPerfil] = useState(null);
  const { auth } = useAuth();
  const { setAuth } = useAuth();


  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await obtenerPerfilProfesional(correo, auth);
        setPerfil(data);
        console.log(data);
        console.log(perfil);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    fetchPerfil();
  }, [correo]);


  const handleLogout = () => {
    setAuth(null); // Esto borra también sessionStorage gracias al useEffect en AuthContext.jsx
    navigate("/"); // O redirige donde quieras
  };



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
          <h1>MI PERFIL</h1>
          
      </div>
      
      <div>
        {auth && (
        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
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

      </div>
      <MisOfertas></MisOfertas>
    </div>
  );
}
