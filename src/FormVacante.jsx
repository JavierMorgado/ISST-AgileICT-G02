import React, { useState } from 'react';
import FormInput from './FormInput';

const FormVacante = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleForm = () => {
        setIsVisible(!isVisible);
    };

    export default function RegisterEmpresa(props){
        const [formData, setFormData] = useState({
            Puesto: '',
            Descripcion: '',
            Cualidades: '',
            FechaInicio: '',
            FechaFin: ''
        })
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    
        const handlePlanSelect = (plan) => {
            setFormData({ ...formData, plan });
        };
    
    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <h1 className='mt-5'>FORMULARIO <br /> VACANTE</h1>

            <form
                onSubmit={handleSubmit}
                className='btext-white rounded-5 mt-5 mb-5 p-4 d-flex flex-column align-items-center'
                style={{backgroundColor: '#002C4B', width: '50%'}}
            >
                
                <h2 className="text-uppercase mb-4">
                    Datos del formulario
                </h2>

                {/* FALTA CREAR IMG */}

                <FormInput
                    label="NombrePuesto"
                    name="NombrePuesto"
                    placeholder="Ingeniero de Software"
                    value={formData.nombrePuesto}
                    onChange={handleChange}
                />

                <FormInput
                    label="descripcionPuesto"
                    name="descripcionPuesto"
                    placeholder="Envargado de desarrollar software"
                    value={formData.descripcionPuesto}
                    onChange={handleChange}
                />

                <FormInput
                    label="Cualidades"
                    name="cualidadesPuesto"
                    placeholder="Trabajo en equipo, proactivo"
                    value={formData.cualidadesPuesto}
                    onChange={handleChange}
                />
                <FormInput
                    label="Fecha de inicio"
                    name="fechaIni"
                    placeholder="13/05/2025"
                    value={formData.fechaIni}
                    onChange={handleChange}
                />
                <FormInput
                    label="Fecha de fin"
                    name="fechaFin"
                    placeholder="Indefinido"
                    value={formData.fechaFin}
                    onChange={handleChange}
                />
            
                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        Publicar Vacante
                </button>
            </form>
            
            
        </div>
   /* return (
        <div>
            <button onClick={toggleForm}>
                {isVisible ? 'Cerrar Formulario' : 'Abrir Formulario'}
            </button>
            {isVisible && (
                <form>
                    <div>
                        <label htmlFor="empresa">Nombre de la Empresa:</label>
                        <input type="text" id="empresa" name="empresa" />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción de la Vacante:</label>
                        <textarea id="descripcion" name="descripcion" rows="4"></textarea>
                    </div>
                    <div>
                        <label htmlFor="contrato">Detalles del Contrato:</label>
                        <textarea id="contrato" name="contrato" rows="4"></textarea>
                    </div>
                    <div>
                        <label htmlFor="email">Email de Contacto:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <button type="submit">Publicar Vacante</button>
                </form>
            )}
        </div>*/
    );
};
}
export default FormVacante;


/*import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import FormInput from './FormInput';


export default function RegisterEmpresa(props){
    const [formData, setFormData] = useState({
        Puesto: '',
        Descripcion: '',
        Cualidades: '',
        FechaInicio: '',
        FechaFin: ''
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
        window.location.href = '/MiPerfilEmpresa';
    }

    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <h1 className='mt-5'>FORMULARIO <br /> VACANTE</h1>

            <form
                onSubmit={handleSubmit}
                className='btext-white rounded-5 mt-5 mb-5 p-4 d-flex flex-column align-items-center'
                style={{backgroundColor: '#002C4B', width: '50%'}}
            >
                
                <h2 className="text-uppercase mb-4">
                    Datos del formulario
                </h2>

                {/* FALTA CREAR IMG *//*}*/

           /*     <FormInput
                    label="NombrePuesto"
                    name="NombrePuesto"
                    placeholder="Ingeniero de Software"
                    value={formData.nombrePuesto}
                    onChange={handleChange}
                />

                <FormInput
                    label="descripcionPuesto"
                    name="descripcionPuesto"
                    placeholder="Envargado de desarrollar software"
                    value={formData.descripcionPuesto}
                    onChange={handleChange}
                />

                <FormInput
                    label="Cualidades"
                    name="cualidadesPuesto"
                    placeholder="Trabajo en equipo, proactivo"
                    value={formData.cualidadesPuesto}
                    onChange={handleChange}
                />
                <FormInput
                    label="Fecha de inicio"
                    name="fechaIni"
                    placeholder="13/05/2025"
                    value={formData.fechaIni}
                    onChange={handleChange}
                />
                <FormInput
                    label="Fecha de fin"
                    name="fechaFin"
                    placeholder="Indefinido"
                    value={formData.fechaFin}
                    onChange={handleChange}
                />
            
                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        Publicar Vacante
                </button>
            </form>
            
            
        </div>

        
    )
}*/