import { useState } from 'react'
import DynamicInput from './textInput'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
//002

export default function LogInEmpresa(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function goToRegisterEmpresa(){
        window.location.href = '/register-empresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center mt-5 me-3 w-50'>
                <h1>INICIO DE SESIÓN PARA EMPRESAS</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%', height: '50%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5">
                <h3 className='mb-4'>INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA</h3>

                <Row>
                    <Col md={6}>
                        <DynamicInput
                            label="Correo"
                            name="email"
                            placeholder="rh@agyleict.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                        />
                    </Col>
                    <Col md={6}>
                        <DynamicInput
                            label="Contraseña"
                            name="contraseña"
                            placeholder="********"
                            value={email}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                        />
                    </Col>
                </Row>

                <h3 className='mb-4'>SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h3>

                <button onClick={goToRegisterEmpresa} className='rounded-pill' style={{backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B !important'}}>REGÍSTRATE</button>
            </div>
        </div>
    )
}