import { useState } from 'react';
import FormInput from './FormInput.jsx';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerPerfilEmpresa } from './api/api.js';


export default function LogInEmpresa(props){
    const navigate = useNavigate();
    const [Nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');

    function goToRegisterEmpresa(){
        window.location.href = '/register-empresa';
    }

    function gotoEmpresa(){
        window.location.href = '/miEmpresa/AgyleICT';
    }

    const handleLogin = async () => {
        try {
          const { data } = await obtenerPerfilEmpresa(Nombre);
          console.log('Empresa encontrada:', data);
          navigate(`/miEmpresa/${data.Nombre}`);
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Empresa no encontrada');
        }
      };

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center mt-5 me-3 w-50'>
                <h1>INICIO DE SESIÓN PARA EMPRESAS</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%', height: '70%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5">
                <h3 className='mb-4'>INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA</h3>

                <form onSubmit={handleLogin} className='d-flex flex-row'>
                    <Col md={6}>
                        <FormInput
                            label="Empresa"
                            name="nombre"
                            placeholder="rh@agyleict.com"
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                            autoComplete="off"
                        />
                    </Col>
                    <Col md={6}>
                        <FormInput
                            label="Contraseña"
                            name="contraseña"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                            autoComplete="off"
                        />
                    </Col>
                    
                    <button  onClick={handleLogin} type="button" className="btn btn-light rounded-pill px-4 fw-semibold">
                            Iniciar sesión
                    </button>
                </form>

                <h3 className='mb-4'>SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h3>

                <button onClick={goToRegisterEmpresa} className='rounded-pill' style={{backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B !important'}}>REGÍSTRATE</button>
            </div>
        </div>
    )
}