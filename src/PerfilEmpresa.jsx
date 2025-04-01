import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import agylelogo from './assets/agyleICT.png';

import MainMenu from './MainMenu';
import Vacante from './Vacante';
import NuevaVacante from './NuevaVacante';

export default function PerfilEmpresa(props){

    function goToBranding(){
        window.location.href = '/mi-empresa/branding';
    }
    function goToEventos(){
        window.location.href = '/mi-empresa/eventos';
    }

    return(
        <div>
            {/*<MainMenu className */}

            <div className="d-flex flex-column justify-content-st</div>art align-items-center vh-100 vw-100">
                <div className='d-flex justify-content-end align-items-center pt-3 me-3 w-50 mt-5'>
                    <h1>MI PERFIL DE EMPRESA</h1>
                </div>

                <div style={{backgroundColor: '#002C4B', width: '75%', height: '65%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5">
                    <Row style={{width: '100%'}}>
                        <Col md={4} className='d-flex justify-content-center'>
                            <Stack className='align-items-center justify-content-center'>
                                <h3 className='text-uppercase'>Nombre</h3>
                                <h6 className='text-uppercase fw-normal'>AgyleICT</h6>
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
                                <h3 className='text-uppercase'>nivel</h3>
                                <h6 className='text-uppercase fw-normal'>oro</h6>
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
                        <Vacante title="Jefe de Producto"></Vacante>
                        <Vacante title="Jefe de Producto"></Vacante>
                        <NuevaVacante></NuevaVacante>
                    </Stack>

                </div>
            </div>
        </div>
    )
}