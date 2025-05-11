import { useState } from 'react';
import FormInput from './FormInput.jsx';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerPerfilEmpresa } from './api/api.js';
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";


export default function LogInEmpresa(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();

    function goToRegisterEmpresa() {
    navigate("/register-empresa");
    }
    function goToMain() {
        navigate("/");
    }

    const autenticarUsuario = async () => {
      try {
          const res = await axios.get(`http://localhost:8080/api/agile/empresas/${encodeURIComponent(email)}`, {
            auth: {
              username:email,
              password:password
            }
          });
          setAuth({ username: email, password: password });
    
          console.log("Perfil cargado:", res.data);
          navigate(`/miEmpresa/${encodeURIComponent(email)}`);
        } catch (error) {
          alert("Credenciales inválidas o acceso denegado");
          console.error("Error al autenticar:", error);
        }
    }


    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center mt-5 me-3 w-50'>
                <h1>INICIO DE SESIÓN PARA EMPRESAS</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
                <h3 className='mt-5 mb-4'>INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA</h3>

                <form onSubmit={autenticarUsuario} className='d-flex flex-row align-items-center'>
                    <Col md={6}>
                        <FormInput
                            label="Empresa"
                            name="nombre"
                            type="text"
                            placeholder="hr@agyleict.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                            autoComplete="off"
                        />
                    </Col>
                    <Col md={6}>
                        <FormInput
                            label="Contraseña"
                            name="contraseña"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{paddingRight: '2rem', paddingLeft: '2rem'}}
                            autoComplete="off"
                        />
                    </Col>
                    
                    <button  
                        onClick={autenticarUsuario} 
                        type="button" 
                        className="text-nowrap mb-5" 
                        style={{
                            backgroundColor: '#fff', 
                            letterSpacing: '0.5px', 
                            color: '#002C4B !important', 
                            height: 'fit-content', 
                            padding: '0.5rem 1rem'
                        }}
                    >
                        INICIAR SESIÓN
                    </button>
                </form>

                <h3 className='mb-4'>SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h3>

                <button onClick={goToRegisterEmpresa} className='rounded-pill mb-5' style={{backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B !important'}}>REGÍSTRATE</button>
            </div>

                <button
                    onClick={goToMain}
                    className="rounded-pill mb-5"
                    style={{
                        width: "150px",
                        backgroundColor: "#B0B0B0",
                        letterSpacing: "0.5px",
                        color: "#D83000",
                        textAlign: "center",
                    }}
                >
                    MENÚ PRINCIPAL
                </button>
        </div>
    )
}