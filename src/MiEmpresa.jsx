import { useState } from 'react'
import DynamicInput from './textInput'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
//002

export default function MiEmpresa(props){

    function goToRegisterEmpresa(){
        window.location.href = '/register-empresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center pt-3 me-3 w-50 mt-5'>
                <h1>MI PERFIL DE EMPRESA</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%', height: '50%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5">
            <Row>
                    <Col md={4}>
                        
                    </Col>
                    <Col md={4}>
                        
                    </Col>
                    <Col md={4}>

                    </Col>
                </Row>

                <h2 className='mb-4'>MIS VACANTES</h2>

            </div>
        </div>
    )
}