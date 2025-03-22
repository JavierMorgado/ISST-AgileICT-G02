import { useState } from 'react'
import reactLogo from './assets/react.svg'
import agylelogo from './assets/agyleICT.png'
import viteLogo from '/vite.svg'


export default function LogInProf(props){
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

            <div className="bg-[#002C4B] rounded-3xl mt-10 p-10 flex flex-col items-center w-[90%] max-w-md">
                <p className="text-white text-center text-sm font-semibold tracking-widest mb-6">
                    INICIA SESIÓN CON TU <br /> CORREO Y CONTRASEÑA
                </p>
            </div>

            <div style={{backgroundColor: '#002C4B'}} className="rounded-3xl mt-10 p-10 flex flex-col items-center w-[90%] max-w-md">
                <input
                        type="email"
                        placeholder="menganito.perez@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none mr-2"
                    />

                <input
                        type="password"
                        placeholder="contraseña123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-6 w-full px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
                    />


                <p className="text-white text-sm font-semibold tracking-widest mb-4 text-center">
                        SI NO TIENES CUENTA REGÍSTRATE AQUÍ
                    </p>

                <button onClick={goToRegisterEmpresa} className='rounded-pill ms-3 me-3' style={{width: '104px', height: '40px', backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B !important'}}>REGÍSTRATE</button>
            </div>
        </div>

        
    )
}