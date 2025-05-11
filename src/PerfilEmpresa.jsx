import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import agylelogo from './assets/agyleICT.png';
import MainMenu from './MainMenu';
import Vacante from './Vacante';
import NuevaVacante from './NuevaVacante';
import { obtenerPerfilEmpresa, obtenerPuestosDeEmpresa } from './api/api.js';
import { useAuth } from "./AuthContext";

export default function PerfilEmpresa(props){
    const { email } = useParams();
    const navigate = useNavigate();   
    const { auth } = useAuth();
    const { setAuth } = useAuth();


    const [empresa, setEmpresa] = useState(null);
    const [puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchEmpresaData = async () => {
            try {
                console.log("email de la empresa: ", email);
                const resEmpresa = await obtenerPerfilEmpresa(email, auth);
                console.log("resEmpresa: ", resEmpresa.data);
                const resPuestos = await obtenerPuestosDeEmpresa(email, auth);
                console.log("resPuestos: ", resPuestos.data);
                setEmpresa(resEmpresa.data);
                setPuestos(resPuestos.data);
            } catch (error) {
                console.error("Error fetching company data:", error);
                alert("Error al obtener los datos de la empresa.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresaData();
    }, [email]);

    const handleLogout = () => {
        setAuth(null); // Esto borra también sessionStorage gracias al useEffect en AuthContext.jsx
        navigate("/"); // O redirige donde quieras
    };

    function goToBranding(){
        window.location.href = '/mi-empresa/branding';
    }
    function goToEventos(){
        window.location.href = '/mi-empresa/eventos';
    }

    if (loading) return <p>Cargando perfil...</p>;

    return(
        <div>
            {/*<MainMenu className */}

            <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
                <div className='d-flex justify-content-end align-items-center pt-3 mt-5'>
                    <h1>MI PERFIL DE EMPRESA</h1>
                </div>

                <div>
                    {auth && (
                    <button onClick={handleLogout} style={{backgroundColor: '#B0B0B0'}}>
                    Cerrar sesión
                    </button>
                    )}
                </div>

                <div style={{backgroundColor: '#002C4B', width: '75%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5 mb-5 pt-3 pb-3">
                    <Row style={{width: '100%'}}>
                        <Col md={4} className='d-flex justify-content-center'>
                            <Stack className='align-items-center justify-content-center'>
                                <h3 className='text-uppercase'>Nombre</h3>
                                <h6 className='text-uppercase fw-normal'>{empresa.nombre || "Cargando..."}</h6>
                            </Stack>
                        </Col>
                        <Col md={4}>
                            <Stack className='align-items-center justify-content-center'>
                                <img 
                                    src={agylelogo} 
                                    alt="AgyleICT Logo" 
                                    style={{ 
                                        width: '7em', 
                                        height: '7em', 
                                        borderRadius: '50%', 
                                        border: '0px',
                                        backgroundColor: 'white',
                                        objectFit: 'contain' 
                                    }} 
                                />
                            </Stack>
                        </Col>
                        <Col md={4} className='d-flex justify-content-center'>
                            <Stack className='align-items-center justify-content-center'>
                                <h3 className='text-uppercase'>Suscripción</h3>
                                <h6 className='text-uppercase fw-normal'>{empresa.suscripcion || "Cargando..."}</h6>
                                <Stack direction='horizontal' gap={3} className='align-items-center justify-content-center'>
                                    <button className="btn bgPlata rounded-pill px-4 fw-semibold" onClick={goToBranding}>
                                        BRANDING
                                    </button>
                                    <button className="btn bgOro rounded-pill px-4 fw-semibold" onClick={goToEventos}>
                                        EVENTOS
                                    </button>
                                </Stack>
                            </Stack>
                        </Col>
                    </Row>

                    <h2 className='mt-4 mb-4'>MIS VACANTES</h2>

                    <Stack direction='horizontal' gap={3} className='align-items-center justify-content-center'>
                        {puestos.map((puesto, index) => {
                            console.log("Iterating puesto: ", puesto); 
                            return (
                                <Vacante 
                                    key={puesto || `puesto-${index}`} 
                                    puestoId={puesto || 1002}
                                ></Vacante>
                            );
                        })}
                        <NuevaVacante key="nueva-vacante" emailEmpresa={email}></NuevaVacante>
                    </Stack>
                    <p className='mt-5'>Estado de las vacantes</p>
                    <div className='mt-1 d-flex justify-content-center align-items-center'>
                        <div 
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'orange',
                                borderRadius: '50%',
                                marginRight: '5px',
                            }}
                        ></div>
                        <div className='white' style={{fontWeight:'100'}}>Pendiente</div>
                        <div 
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#ff3b30',
                                borderRadius: '50%',
                                marginLeft: '10px',
                                marginRight: '5px',
                            }}
                        ></div>
                        <div className='white' style={{fontWeight:'100'}}>Rechazada</div>
                        <div 
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: '#34c759',
                                borderRadius: '50%',
                                marginLeft: '10px',
                                marginRight: '5px',
                            }}
                        ></div>
                        <div className='white' style={{fontWeight:'100'}}>Aceptada</div>
                    </div>

                    <button  onClick={() => navigate(`/`)} type="button" className="btn btn-light rounded-pill px-4 fw-semibold mt-3">
                        VOLVER AL MENÚ
                    </button>

                </div>
            </div>
        </div> 
    )
}