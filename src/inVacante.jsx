import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import agylelogo from './assets/agyleICT.png';
import MainMenu from './MainMenu';
import Vacante from './Vacante';
import NuevaVacante from './NuevaVacante';
import {obtenerPuestoById, obtenerOfertadePuesto, editPuestoById} from './api/api.js';
import { useAuth } from "./AuthContext";


export default function inVacante(props){
    const navigate = useNavigate();
    const { auth } = useAuth();


    const [puesto, setPuesto] = useState(null);
    const [colorEstado, setcolorEstado] = useState(null);
    const [estado, setEstado] = useState(null);
    
    const { email} = useParams();
    const { puestoId } = useParams();

    useEffect(() => {
            const fetchPuestoData = async () => {
                try {
                    console.log("ID DEL PUESTO:", puestoId);
                    const resPuesto = await obtenerPuestoById(puestoId, auth);
                    setPuesto(resPuesto.data);
                } catch (error) {
                    console.error("Error fetching puesto data:", error);
                    alert("Error al obtener los datos del puesto.");
                }
            };
            const fetchEstadoPuesto = async () => {
                try {
                    const resOferta = await obtenerOfertadePuesto(puestoId, auth);
                    console.log("resEstado: ", resOferta.data);
    
                    // Accede al primer elemento del array
                    const oferta = resOferta.data[0]; 
    
                    if (oferta) {
                        console.log("Estado puesto: " + oferta.estado);
                        setcolorEstado(oferta.estado === "SOLICITADA" ? "orange" :
                                        oferta.estado === "ACEPTADA" ? "#34c759" :
                                        oferta.estado === "RECHAZADA" ? "#ff3b30" : "gray");
                                        
                        setEstado(oferta.estado === "SOLICITADA" ? "Solicitado" :
                            oferta.estado === "ACEPTADA" ? "Aceptado" :
                            oferta.estado === "RECHAZADA" ? "rechazado" : null);
                    } else {
                        console.log("No hay ofertas disponibles.");
                        setcolorEstado("gray");
                        setEstado(null)
                    }
                } catch (error) {
                    console.error("Error fetching estado puesto:", error);
                    alert("Error al obtener el estado del puesto.");
                }
            };
    
            fetchEstadoPuesto();
            fetchPuestoData();
        }, [puestoId]); // Ensure puestoId is included in dependencies

    const deletePuestoById = async () => {
        try {
            await deletePuesto(puestoId, auth);
            console.log("Puesto eliminado con éxito.");
            alert("Puesto eliminado con éxito.");
            goToPerfil();
        } catch (error) {
            console.error("Error al eliminar el puesto:", error);
            alert("Error al eliminar el puesto.");
        }
    }

    function goToPerfil(){
        navigate(`/miEmpresa/${encodeURIComponent(email)}`)
    }

    function goToProfesional(){
        navigate(`/miEmpresa/${encodeURIComponent(email)}/puestos/${puestoId}/profesional`)
    }

    return(
        <div>
            <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
                <div className='d-flex align-items-center pt-3 mt-5'>
                    <h1>{puesto ? puesto.nombrePuesto : "Cargando..."}</h1>
                </div>

                <div style={{backgroundColor: '#002C4B', width: '75%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
                    <button onClick={deletePuestoById}>
                        <span className="material-symbols-outlined white">
                            delete
                        </span>
                    </button>

                    <h4 className='caps'>Descripción del puesto:</h4>
                    <div className='white mb-5'>{puesto ? puesto.descripcionPuesto :"cargando..." }</div>
                    
                    <h4 className='caps'>Cualidades:</h4>
                    <div className='d-flex mb-5'>
                        {puesto ? puesto.cualidadesPuesto.map((cualidad, index) => (
                            <div key={index} className='bg-white rounded-5 p-2 me-2 ms-2'>{cualidad}</div>
                        )) : "cargando..."}
                    </div>
                    
                    <h4 className='caps'>duración:</h4>
                    {puesto && puesto.fechaFin === "indefinido" && puesto.fechaIni === "indefinido" ? (
                        <div className='white mb-5'>Indefinido</div>
                    ) : (
                        <div className='white mb-5'>
                            {puesto ? puesto.fechaIni : "cargando..."} - {puesto ? puesto.fechaFin : "cargando..."}
                        </div>
                    )}
                    
                    <div 
                        className='white mb-2 rounded-5 p-2' 
                        style={{backgroundColor : colorEstado}}
                    >
                        Estado del puesto: {estado}
                    </div>

                    {estado === "Aceptado" && (
                        <button 
                            onClick={goToProfesional} 
                            type="button" 
                            className="btn btn-success white rounded-pill px-4 fw-semibold mb-5"
                        >
                            DESCUBRE A TU NUEVO PROFESIONAL
                        </button>
                    )}

                    <button  onClick={() => navigate(`/miEmpresa/${encodeURIComponent(email)}`)} type="button" className="btn btn-light rounded-pill px-4 fw-semibold mb-5">
                            VOLVER A MI PERFIL
                    </button>
                </div>
                
            </div>
        </div>
    )
}