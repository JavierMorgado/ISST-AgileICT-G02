import { useState } from 'react'
import reactLogo from './assets/react.svg'
import agylelogo from './assets/agyleICT.png'
import viteLogo from '/vite.svg'


export default function RegisterEmpresa(props){
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        movil: '',
        plan: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePlanSelect = (plan) => {
        setFormData({ ...formData, plan });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.nombre || !formData.email || !formData.password || !formData.movil || !formData.plan){
            alert('Por favor, rellene todos los campos');
            return;
        }

        //Aqui puedes enviar los datos al backend
        console.log('Datos enviados:', formData);
        alert('Registro exitoso');
    };



    function goToEmpresa(){
        window.location.href = '/miEmpresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <h1>REGÍSTRATE COMO  <br /> EMPRESA</h1>

            <form
                onSubmit={handleSubmit}
                className='btext-white rounded-4 mt-4 p-4 d-flex flex-column align-items-center'
                style={{backgroundColor: '#002C4B', width: '50%'}}
            >
                
                <h5 className="text-uppercase mb-4">
                    Datos de la empresa
                </h5>

                {/* FALTA CREAR IMG */}

                <div className="mb-3 w-100">
                    <h6 className="text-uppercase">Nombre</h6>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. AgyleICT"
                    />
                </div>
            
                <div className="mb-3 w-100">
                    <h6 className="text-uppercase">Correo</h6>
                    <input
                        type="email"
                        name="correo"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rh@agyleict.com"
                    />
                </div>

                
                <div className="mb-4 w-100">
                <h6 className="text-uppercase">Móvil</h6>
                    <input
                        type="text"
                        name="movil"
                        value={formData.movil}
                        onChange={handleChange}
                        placeholder="91 654 55 45"
                    />
                </div>


                <h6 className="fw-semibold text-uppercase text-center mt-2 mb-4" style={{ letterSpacing: '1px' }}>
                    ¿A qué nivel te quieres suscribir?
                </h6>

                
                <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-3 mb-4">
                    <div
                        title='Bronce'
                        className={`rounded-3 p-3 flex-fill text-center border ${
                            formData.plan === 'Bronce' ? 'border-warning bg-opacity-100' : 'bg-opacity-50'
                        }`}
                        onClick={() => handlePlanSelect('Bronce')}
                        style={{ cursor: 'pointer', backgroundColor: '#CD7F32'}}
                    >
                        <h6 className="fw-bold">BRONCE</h6>
                        <p className="small mb-0" style={{color: 'black' }}> 
                            AgyleICT gestiona el reclutamiento de tus profesionales
                        </p>
                    </div>

                    <div
                        title='Plata'
                        className={`rounded-3 p-3 flex-fill text-center border ${
                            formData.plan === 'Plata' ? 'border-secondary bg-opacity-100' : 'bg-opacity-50'
                        }`}
                        onClick={() => handlePlanSelect('Plata')}
                        style={{ cursor: 'pointer', backgroundColor: '#C0C0C0' }}
                    >
                        <h6 className="fw-bold">PLATA</h6>
                        <p className="small mb-0" style={{color: 'black' }}>
                            AgyleICT gestiona el reclutamiento <br />
                            Branding en tu nombre para suscritos
                        </p>
                    </div>


                    <div
                        title='Oro'
                        className={`rounded-3 p-3 flex-fill text-center border ${
                            formData.plan === 'Oro' ? 'border-warning' : 'bg-opacity-75'
                        }`}
                        onClick={() => handlePlanSelect('Oro')}
                        style={{ cursor: 'pointer', backgroundColor: '#EFB810'}}
                    >
                        <h6 className="fw-bold">ORO</h6>
                        <p className="small mb-0" style={{color: 'black' }}>
                            Todo lo anterior <br />
                            + Eventos de reclutamiento para tu perfil
                        </p>
                    </div>
                </div>
                <button onClick={goToEmpresa} type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        Registrarse
                </button>
            </form>
            
            
        </div>

        
    )
}