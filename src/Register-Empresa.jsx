import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import DynamicInput from './textInput';


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
                
                <h2 className="text-uppercase mb-4">
                    Datos de la empresa
                </h2>

                {/* FALTA CREAR IMG */}

                <DynamicInput
                    label="Nombre"
                    name="nombre"
                    placeholder="AgyleICT"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <DynamicInput
                    label="Correo"
                    name="email"
                    placeholder="rh@agyleict.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                <DynamicInput
                    label="Móvil"
                    name="movil"
                    placeholder="91 654 55 45"
                    value={formData.movil}
                    onChange={handleChange}
                />


                <h4 className="fw-semibold text-uppercase text-center mt-2 mb-4" style={{ letterSpacing: '1px' }}>
                    ¿A qué nivel te quieres suscribir?
                </h4>

                <Row className="mb-4">
                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-4' 
                        onClick={() => handlePlanSelect('Bronce')}
                        style={{ cursor: 'pointer', backgroundColor: '#CD7F32' }}>
                            <h4 className="fw-bold">BRONCE</h4>
                            <p className="mb-0" style={{color: 'black' }}> 
                                AgyleICT gestiona el reclutamiento de tus profesionales
                            </p>
                        </Stack>
                    </Col>

                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-4' 
                        onClick={() => handlePlanSelect('Plata')}
                        style={{ cursor: 'pointer', backgroundColor: '#C0C0C0' }}>
                            <h4 className="fw-bold">PLATA</h4>
                            <p className="mb-0" style={{color: 'black' }}> 
                            AgyleICT gestiona el reclutamiento <br />
                            Branding en tu nombre para suscritos
                            </p>
                        </Stack>
                    </Col>

                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-4' 
                        onClick={() => handlePlanSelect('Oro')}
                        style={{ cursor: 'pointer', backgroundColor: '#EFB810'}}>
                            <h4 className="fw-bold">ORO</h4>
                            <p className="mb-0" style={{color: 'black' }}> 
                            AgyleICT gestiona el reclutamiento <br />
                            Branding en tu nombre para suscritos <br />
                            Eventos de reclutamiento para tu perfil
                            </p>
                        </Stack>
                    </Col>
                </Row>
                <button onClick={goToEmpresa} type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        Registrarse
                </button>
            </form>
            
            
        </div>

        
    )
}