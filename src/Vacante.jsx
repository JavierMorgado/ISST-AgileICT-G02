import { useEffect, useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPuestoById, obtenerOfertadePuesto } from './api/api.js';
import { set } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useAuth } from "./AuthContext";


export default function Vacante(props){
    const [puesto, setPuesto] = useState(null);
    const [estadoPuesto, setEstadoPuesto] = useState(null);
    const puestoId = props.puestoId;
    const { email} = useParams();
    const location = useLocation();
const { auth } = useAuth();
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
                    setEstadoPuesto(oferta.estado === "SOLICITADA" ? "orange" :
                                    oferta.estado === "ACEPTADA" ? "#34c759" :
                                    oferta.estado === "RECHAZADA" ? "#ff3b30" : "gray");
                } else {
                    console.log("No hay ofertas disponibles.");
                    setEstadoPuesto("gray");
                }
            } catch (error) {
                console.error("Error fetching estado puesto:", error);
                alert("Error al obtener el estado del puesto.");
            }
        };

        fetchEstadoPuesto();
        fetchPuestoData();
    }, [puestoId]); // Ensure puestoId is included in dependencies

    const navigate = useNavigate();

    function goToVacante(){
        navigate(`/miEmpresa/${encodeURIComponent(email)}/puestos/${puestoId}`, {
            state: { auth: auth }
        })
    }

    return(
        <button onClick={goToVacante}
            style={{position: 'relative', top: '0.8rem'}}>
            <Stack 
                className='align-items-center justify-content-center rounded-5 text-center' 
                style={{
                    backgroundColor: '#D83000',
                    height: '8rem',
                    maxWidth: '20rem',
                }}
            >
                <div className='mt-4 mb-4 pt-3 pb-3 me-5 ms-5'>
                    <h3 className='text-uppercase'
                        style={{
                            wordWrap: 'break-word', // Allow text to wrap
                            whiteSpace: 'normal', // Enable multi-line text
                        }}>
                        {puesto ? puesto.nombrePuesto : "Cargando..."} {/* Add fallback for null puesto */}
                    </h3>
                </div>
            </Stack>
            <div 
                style={{
                    width:  '25px',
                    height: '25px',
                    backgroundColor: estadoPuesto,
                    borderRadius: '50%',
                    position: 'relative',
                    top: '-8rem',
                    left: '19rem',
                }}
            ></div>
        </button>
    )
}