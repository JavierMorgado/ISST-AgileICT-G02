import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import FormInput from './FormInput';
import axios from "axios";
import DatePicker from "react-datepicker";
import { crearPuesto, crearOferta, asignarMejorProfesional, obtenerPerfilEmpresa } from './api/api';


export default function RegisterVacante(props){
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [VacanteData, setVacanteData] = useState({
        id: '',
        descripcion_puesto: '',
        empresa_nombre: '',
        fecha_ini: '',
        fecha_fin: '',
        nomber_puesto: '',
        cualidades_puesto: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVacanteData({ ...VacanteData, [name]: value });
    };

    const [cualidadesList, setCualidadesList] = useState([]);

    const handleAddCualidad = (e) => {
        e.preventDefault();
        if (VacanteData.cualidades.trim() !== "") {
          setCualidadesList([...cualidadesList, VacanteData.cualidades.trim()]);
          setFormData({ ...VacanteData, cualidades: "" }); // Clear the input field
        }
      };
    
      const handleRemoveCualidad = (index) => {
        setCualidadesList(cualidadesList.filter((_, i) => i !== index));
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !VacanteData.nomber_puesto ||
            !VacanteData.descripcion_puesto ||
            !VacanteData.fecha_ini ||
            !VacanteData.fecha_fin ||
            cualidadesList.length === 0
        ) {
            alert('Por favor, rellene todos los campos');
            console.log(VacanteData);
            return;
        }
       

        try {
            const { data: empresa } = await obtenerPerfilEmpresa(nombre);
            console.log('Empresa obtenida:', empresa);

            // Crear el objeto JSON para enviar
            const puestoToSend = {
                nombrePuesto: VacanteData.nomber_puesto,
                descripcionPuesto: VacanteData.descripcion_puesto,
                cualidadesPuesto: cualidadesList, // Usar cualidadesList como array
                fechaIni: VacanteData.fecha_ini.toISOString().split('T')[0], // Convertir a formato ISO (yyyy-MM-dd)
                fechaFin: VacanteData.fecha_fin.toISOString().split('T')[0], // Convertir a formato ISO (yyyy-MM-dd
                empresa: { nombre: empresa.nombre }, // Este campo debe ser completado según la lógica de tu aplicación
                //ofertas: [], // Este campo debe ser completado según la lógica de tu aplicación
            };
            console.log('Puesto a enviar:', puestoToSend);

            const { data: puestoCreado } = await crearPuesto(puestoToSend);
            console.log('Vacante registrada:', puestoCreado);
            alert("Tu nueva vacante ha sido registrada con éxito.");

            // const { data: profesional } = await asignarMejorProfesional(puestoCreado.id);
            // console.log('Profesional asignado:', profesional);

            // const ofertaToSend = {
            //     id: puestoCreado.id,
            //     estado: "SOLICITADA",
            //     puesto: puestoCreado.id,
            //     profesional: profesional.correo,
            // };

            // await crearOferta(ofertaToSend);
            // console.log('Oferta creada:', ofertaToSend);
            // navigate(`/miPerfilEmpresa/${nombre}`);

        } catch (error) {
            console.error('Error al registrar la vacante:', error);
            alert("Error al registrar la vacante. Inténtalo de nuevo.");
        }

    };




    return(
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 vw-100">
            <h1 className='mt-5'>TU NUEVA VACANTE</h1>

            <form
                onSubmit={handleSubmit}
                className='btext-white rounded-5 mt-5 mb-5 p-4 d-flex flex-column align-items-center'
                style={{backgroundColor: '#002C4B', width: '50%'}}
            >
                
                <FormInput
                    label="Nombre del Puesto"
                    name="nomber_puesto"
                    placeholder="Nombre del Puesto"
                    value={VacanteData.nomber_puesto}
                    onChange={handleChange}
                />

                <FormInput
                    label="Descripción del Puesto"
                    name="descripcion_puesto"
                    placeholder="Descripción del Puesto"
                    value={VacanteData.descripcion_puesto}
                    onChange={handleChange}
                />

                <div className="d-flex justify-content-between mb-5">
                    {/* Fecha de Inicio */}
                    <div className="me-3 flex-grow-1 d-flex flex-column align-items-center">
                        <label className="text-uppercase">Fecha de Inicio</label>
                        <DatePicker
                        selected={VacanteData.fecha_ini}
                        onChange={(date) =>
                            setVacanteData({ ...VacanteData, fecha_ini: date })
                        }
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd/MM/yyyy"
                        style={{ color: "black" }}
                        />
                    </div>
        
                    {/* Fecha de Fin */}
                    <div className="flex-grow-1 d-flex flex-column align-items-center">
                        <label className="text-uppercase">Fecha de Fin</label>
                        <DatePicker
                        selected={VacanteData.fecha_fin}
                        onChange={(date) =>
                            setVacanteData({ ...VacanteData, fecha_fin: date })
                        }
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd/MM/yyyy"
                        style={{ color: "black" }}
                        />
                    </div>
                </div>

                <Stack className="mb-3 align-items-center">
                    <Stack direction='vertical' align-items='center' gap={2}>
                        <FormInput
                            label="Cualidades Técnicas"
                            name="cualidades"
                            placeholder="Ej. C++"
                            value={VacanteData.cualidades}
                            onChange={handleChange}
                        />

                        <button
                            onClick={handleAddCualidad}
                            className="btn btn-light"
                            type="button"
                        >
                            Añadir
                        </button>

                        {cualidadesList.map((cualidad, index) => (
                            <div
                                key={index}
                                className="btn btn-light rounded-pill px-3 py-1"
                                style={{ border: "1px solid #ccc", cursor: "pointer", marginTop: "5px" }}
                                onClick={() => handleRemoveCualidad(index)}
                                title="Haz clic para eliminar"
                            >
                                {cualidad}
                            </div>
                        ))}
                    </Stack>
                </Stack>

                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold me-3 mb-3">
                        PUBLICAR
                </button>
                <button  onClick={() => navigate(`/miPerfilEmpresa/${nombre}`)} type="button" className="btn btn-light rounded-pill px-4 fw-semibold">
                        VOLVER A MI PERFIL
                </button>
            </form>
            
            
        </div>

        
    )
}