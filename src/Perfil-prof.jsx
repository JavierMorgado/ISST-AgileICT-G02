import { useState } from 'react'
import reactLogo from './assets/react.svg'
import agylelogo from './assets/agyleICT.png'
import viteLogo from '/vite.svg'

export default function PerfilProf(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function goToOfertas() {
        window.location.href = '/miPerfil';
    }

    return (
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <div className="d-flex justify-content-between align-items-center pt-3 w-100 px-4">
                <div></div> {/* Espacio vacío para mantener el título centrado */}
                <h1 className="mx-auto">MI PERFIL</h1>
                <button onClick={goToOfertas} className="rounded-pill" 
                    style={{width: '150px', height: '40px', backgroundColor: '#fff', letterSpacing: '0.5px', color: '#002C4B', textAlign: 'center',}}
                > VER OFERTAS
                </button>
            </div>

            <div className="rounded-5 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#D83000', width: '75%', height: '50%' }}>
                <div className="mb-3 w-100">
                    <h5 className="mb-4">NOMBRE</h5>
                    <h6 className="mb-4">Menganito</h6> {/*props o coger de la base de datos??*/}
                </div>
                
                <div className="mb-3 w-100">
                    <h5 className="mb-4">PUESTO</h5>
                    <h6 className="mb-4">Jefe de Producto</h6>
                </div>

                <div className="mb-3 w-100">
                    <h5 className="mb-4">CUALIDADES TÉCNICAS</h5>
                    <h6 className="mb-4">C++</h6>
                </div>

                <div className="mb-3 w-100">
                    <h5 className="mb-4">DISPONIBILIDAD</h5>
                    <h6 className="mb-4">10/10/2025 - 10/10/2026</h6>
                </div>

            </div>
        </div>
    );
}