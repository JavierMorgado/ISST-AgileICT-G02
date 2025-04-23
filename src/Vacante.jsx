import { useEffect, useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { obtenerPuestoById } from './api/api.js';

export default function Vacante(props){
    const [puesto, setPuesto] = useState(null);
    const puestoId = props.puestoId;
    const nombreEmpresa = useParams();

    useEffect(() => {
        const fetchPuestoData = async () => {
            try {
                console.log("ID DEL PUESTO:", puestoId);
                const resPuesto = await obtenerPuestoById(puestoId);
                console.log("resPuesto: ", resPuesto.data);
                setPuesto(resPuesto.data);
            } catch (error) {
                console.error("Error fetching puesto data:", error);
                alert("Error al obtener los datos del puesto.");
            }
        };
        fetchPuestoData();
    }, [puestoId]); // Ensure puestoId is included in dependencies

    function goToVacante(){
        window.location.href = '/mi-empresa/vacante';
    }

    return(
        <button onClick={goToVacante}>
            <Stack 
                className='align-items-center justify-content-center rounded-5' 
                style={{
                    backgroundColor: '#D83000',
                    maxWidth: '230px',
                }}
            >
                <div className='mt-4 mb-4 pt-3 pb-3 me-5 ms-5'>
                    <h3 className='text-uppercase'>
                        {puesto ? puesto.nombrePuesto : "Cargando..."} {/* Add fallback for null puesto */}
                    </h3>
                </div>
            </Stack>
        </button>
    )
}