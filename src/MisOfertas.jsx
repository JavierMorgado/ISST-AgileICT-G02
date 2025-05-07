import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { obtenerOfertasAsignadas } from "./api/api";

export default function MisOfertas() {
    const { correo } = useParams();
    const [ofertas, setOfertas] = useState([]);

    // Llamada a la API para obtener las ofertas del profesional
    useEffect(() => {
        const fetchOfertas = async () => {
          try {
            const { data } = await obtenerOfertasAsignadas(correo);
            setOfertas(data);
            console.log("las ofertas:" + data);
          } catch (error) {
            console.error('Error al cargar ofertas:', error);
          }
        };
        fetchOfertas();
    }, [correo]);

    
    const handleAceptar = (id) => {
        console.log(`Oferta ${id} aceptada`);
        // Implementa la lógica para aceptar la oferta
    };

    const handleRechazar = (id) => {
        console.log(`Oferta ${id} rechazada`);
        // Implementa la lógica para rechazar la oferta
    };

    function goToPerfil(){
        Navigate(`/miPerfil/${encodeURIComponent(correo)}`);
    }

    // Si las ofertas aún no se han cargado, muestra un mensaje de carga o un spinner
    if (!ofertas) {
        return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h2>No tienes ofertas de momento :(</h2>
        </div>
        );
    }

    return (
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
        <div className="d-flex justify-content-end align-items-center pt-3 me-3 w-50 mt-5">
            <h1>MIS OFERTAS</h1>
        </div>

        {ofertas.length === 0 ? (
            <p>no tienes ofertas</p>
        ) : (
            ofertas.map((oferta) => (
                <div
                    key={oferta.id}
                    style={{
                        backgroundColor: "#002C4B",
                        width: "75%",
                    }}
                    className="rounded-5 d-flex justify-content-center align-items-center mt-5"
                >
                <h5 style={{ color: "white" }}>{oferta.puesto.empresa.nombre}</h5>
                <p style={{ color: "white" }}>{oferta.puesto.nombre}</p>
                <p style={{ color: "white" }}>{oferta.puesto.descripcion}</p>
                <p style={{ color: "white" }}>
                    {oferta.puesto.fechaIni} - {oferta.puesto.fechaFin}
                </p>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn background-white me-2"
                        onClick={() => handleAceptar(oferta.id)}
                    >
                        <span className="material-symbols-outlined color-green">check</span>
                    </button>
                    <button
                    className="btn background-white"
                    onClick={() => handleRechazar(oferta.id)}
                    >
                        <span className="material-symbols-outlined color-red">close</span>
                    </button>
                </div>
                </div>
            ))
        )}
        </div>
    );
}
