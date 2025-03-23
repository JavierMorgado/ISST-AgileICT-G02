import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import DynamicInput from './textInput';


export default function RegisterEmpresa(props){
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
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
        if(!formData.nombre || !formData.email || !formData.password || !formData.plan){
            alert('Por favor, rellene todos los campos');
            console.log(formData.nombre, formData.email, formData.password, formData.plan);
            return;
        }
        //Aqui puedes enviar los datos al backend
        console.log('Datos enviados:', formData);
        goToEmpresa();
    };



    function goToEmpresa(){
        window.location.href = '/miEmpresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100 mt-5">
            <h1>REGÍSTRATE COMO  <br /> EMPRESA</h1>

            <form
                onSubmit={handleSubmit}
                className='btext-white rounded-5 mt-5 p-4 d-flex flex-column align-items-center'
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
                    label="Contraseña"
                    name="password"
                    placeholder="***********"
                    value={formData.password}
                    onChange={handleChange}
                />

                <DynamicInput
                    label="Correo"
                    name="email"
                    placeholder="rh@agyleict.com"
                    value={formData.email}
                    onChange={handleChange}
                />


                <h4 className=" mt-4 fw-semibold text-uppercase text-center mt-2 mb-4" style={{ letterSpacing: '1px' }}>
                    ¿A qué nivel te quieres suscribir?
                </h4>

                <Row className="mb-4">
                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-5 mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'
                                role="button" tabIndex={0} onClick={() => handlePlanSelect('Bronce')} 
                                style={{cursor: 'pointer', backgroundColor: '#CD7F32', filter: formData.plan === 'Bronce' ? 'drop-shadow(0 0 2em #646cffaa)' : 'none' }}>
                            <Container className='mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'>
                                <h4 className="fw-bold colorBronce mb1">BRONCE</h4>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#935619'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT GESTIONA EL RECLUTAMIENTO DE TUS PROFESIONALES
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#935619'}} />
                                <p className="mb-1 size10" style={{color: 'transparent' }}> 
                                    AGILEICT REALIZA BRANDING EN TU NOMBRE PARA LOS PARTICULARES SUSCRITOS
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#935619'}} />
                                <p className="mb-1 size10" style={{color: 'transparent' }}> 
                                    AGILEICT ORGANIZA EVENTOS DE RECLUTAMIENTO PARA TU PERFIL DESEADO
                                </p>
                            </Container>
                        </Stack>
                    </Col>

                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-5 mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'
                                role="button" tabIndex={0} onClick={() => handlePlanSelect('Plata')} 
                                style={{cursor: 'pointer', backgroundColor: '#C0C0C0', filter: formData.plan === 'Plata' ? 'drop-shadow(0 0 2em #646cffaa)' : 'none' }}>
                            <Container className='mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'>
                                <h4 className="fw-bold colorPlata mb-1">PLATA</h4>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT GESTIONA EL RECLUTAMIENTO DE TUS PROFESIONALES
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT REALIZA BRANDING EN TU NOMBRE PARA LOS PARTICULARES SUSCRITOS
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'transparent' }}> 
                                    AGILEICT ORGANIZA EVENTOS DE RECLUTAMIENTO PARA TU PERFIL DESEADO
                                </p>
                            </Container>
                        </Stack>
                    </Col>

                    <Col sm={4}>
                        <Stack direction='vertical' className='rounded-5 mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'
                                role="button" tabIndex={0} onClick={() => handlePlanSelect('Oro')} 
                                style={{cursor: 'pointer', backgroundColor: '#EFB810', filter: formData.plan === 'Oro' ? 'drop-shadow(0 0 2em #646cffaa)' : 'none'}}>
                            <Container className='mt-4 mb-4 d-flex flex-column justify-content-center align-items-center'>
                                <h4 className="fw-bold colorOro mb-1">ORO</h4>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT GESTIONA EL RECLUTAMIENTO DE TUS PROFESIONALES
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT REALIZA BRANDING EN TU NOMBRE PARA LOS PARTICULARES SUSCRITOS
                                </p>
                                <hr style={{ width: '9rem', height: '2px', backgroundColor: '#858585'}} />
                                <p className="mb-1 size10" style={{color: 'black' }}> 
                                    AGILEICT ORGANIZA EVENTOS DE RECLUTAMIENTO PARA TU PERFIL DESEADO
                                </p>
                            </Container>
                        </Stack>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        Registrarse
                </button>
            </form>
            
            
        </div>

        
    )
}