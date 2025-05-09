import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { obtenerOfertasAsignadas, cambiarEstadoOferta } from "./api/api";

export default function MisOfertas() {
    const { correo } = useParams();
    const navigate = useNavigate();
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

    const handleEstado = async (id, estado) => {
        try {
            const { data: ofertaActualizada } = await cambiarEstadoOferta(id, estado);
            console.log("Oferta actualizada:", ofertaActualizada);
        } catch (error) {
            console.error('Error al aceptar la oferta:', error);
        }
        try {
            const { data } = await obtenerOfertasAsignadas(correo);
            setOfertas(data);
            console.log("las ofertas:" + data);
        } catch (error) {
            console.error('Error al cargar ofertas:', error);
        }
    };


    // Si las ofertas aún no se han cargado, muestra un mensaje de carga o un spinner
    if (ofertas === null) {
        return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h2>No tienes ofertas de momento :(</h2>
        </div>
        );
    }

    return (
        <div className="d-flex flex-column justify-content-start align-items-center mb-5">
        <div className="d-flex justify-content-end align-items-center pt-3 mt-5">
            <h1 className='black'>MIS OFERTAS</h1>
        </div>

        {ofertas.length === 0 ? (
            <p>no tienes ofertas</p>
        ) : (
            ofertas.map((oferta) => (
                <div
                    key={oferta.id}
                    style={{
                        backgroundColor: "#002C4B"
                    }}
                    className="rounded-5 d-flex justify-content-center align-items-center mt-5 ps-5 pe-5 pt-3 pb-3"
                >
                <div className='d-flex flex-column justify-content-center align-items-start me-5'>
                    <div style={{ color: "white", fontWeight: '500', fontSize: '30px' }}>{oferta.puesto.empresa.nombre}</div>
                    <div style={{ color: "white", fontWeight: '100', fontSize: '18px' }}>{oferta.puesto.nombrePuesto}</div>
                    <div style={{ color: "white", fontWeight: '100', fontSize: '18px' }}>{oferta.puesto.descripcionPuesto}</div>
                    <div style={{fontWeight: '100', fontSize: '18px' }} className='d-flex'>{oferta.puesto ? oferta.puesto.cualidadesPuesto.map((cualidad, index) => (
                            <div key={index} className='bg-white rounded-5 ps-2 pe-2 me-1 ms-1'>{cualidad}</div>
                        )) : "cargando..."}</div>
                    <div style={{ color: "white", fontWeight: '100', fontSize: '18px' }}>{oferta.puesto.fechaIni} - {oferta.puesto.fechaFin}</div>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn background-white me-2"
                        onClick={() => handleEstado(oferta.id, "aceptada")}
                    >
                        <span className="material-symbols-outlined color-green">check</span>
                    </button>
                    <button
                    className="btn background-white"
                    onClick={() => handleEstado(oferta.id, "rechazada")}
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
