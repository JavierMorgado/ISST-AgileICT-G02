import { useState } from 'react'
import reactLogo from './assets/react.svg'
import agylelogo from './assets/agyleICT.png'
import viteLogo from '/vite.svg'
//002

export default function LogInEmpresa(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function goToRegisterEmpresa(){
        window.location.href = '/register-empresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center pt-3 me-3 w-50'>
                <h1>INICIO DE SESIÓN PARA EMPRESAS</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%', height: '50%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center">
                <h4 className='mb-4'>INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA</h4>

                <div className='mb-5 d-flex'>
                    <input
                        type="email"
                        placeholder="menganito.perez@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="contraseña123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <h4 className='mb-4'>SI NO TIENES CUENTA REGÍSTRATE AQUÍ</h4>

                <button onClick={goToRegisterEmpresa} className='rounded-pill ms-3 me-3' style={{width: '104px', height: '40px', backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B !important'}}>REGÍSTRATE</button>
            </div>
        </div>
    )
}