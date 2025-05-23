import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import FormInput from './FormInput';
import axios from "axios";
import DatePicker from "react-datepicker";
import { crearPuesto, crearOferta, asignarMejorProfesional, obtenerPerfilEmpresa } from './api/api';
import { useAuth } from "./AuthContext";

export default function RegisterVacante(props){
    const { email } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const [VacanteData, setVacanteData] = useState({
        id: '',
        descripcion_puesto: '',
        empresa_email: '',
        fecha_ini: null,
        fecha_fin: null,
        nomber_puesto: '',
        cualidades_puesto: '',
        indefinidoInicio: false,
        indefinidoFin: false,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setVacanteData({ ...VacanteData, [name]: value });
    };

    const [cualidadesList, setCualidadesList] = useState([]);

    const handleAddCualidad = (e) => {
        e.preventDefault();
        if (VacanteData.cualidades.trim() !== "") {
          setCualidadesList([...cualidadesList, VacanteData.cualidades.trim()]);
        }
      };
    
    const handleRemoveCualidad = (index) => {
        setCualidadesList(cualidadesList.filter((_, i) => i !== index));
    };

    const handleIndefinidoChange = (field) => {
        setVacanteData((prev) => ({
            ...prev,
            [field]: !prev[field],
            [field === "indefinidoInicio" ? "fecha_ini" : "fecha_fin"]: null,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !VacanteData.nomber_puesto ||
            !VacanteData.descripcion_puesto ||
            cualidadesList.length === 0
        ) {
            alert('Por favor, rellene todos los campos');
            return;
        }
       
        const formatDateLocal = (date) => {
        return date.toLocaleDateString('sv-SE'); // "2025-05-11"
        };

        try {
            // Crear el objeto JSON para enviar
            const puestoToSend = {
                nombrePuesto: VacanteData.nomber_puesto,
                descripcionPuesto: VacanteData.descripcion_puesto,
                cualidadesPuesto: cualidadesList,
                fechaIni: VacanteData.fecha_ini ? formatDateLocal(VacanteData.fecha_ini) : null,
                fechaFin: VacanteData.fecha_fin ? formatDateLocal(VacanteData.fecha_fin) : null,
                empresa: { email: email },
            };
            console.log('Puesto a enviar:', puestoToSend);

            const { data: puestoCreado } = await crearPuesto(puestoToSend, auth);
            console.log('Vacante registrada:', puestoCreado);

            const { data: profesional } = await asignarMejorProfesional(puestoCreado.id, auth);
            console.log('Profesional asignado:', profesional);

            if (!profesional) {
                alert("Vacante pendiente de asignación.");
                navigate(`/miEmpresa/${encodeURIComponent(email)}`);
                return;
            }

            const { data: oferta } = await crearOferta({
                estado: "SOLICITADA", 
                puesto: {id: puestoCreado.id}, 
                profesional: {correo: profesional.correo}
            }, auth);
            console.log('Oferta creada:', oferta);

            alert("Vacante creada");
            navigate(`/miEmpresa/${encodeURIComponent(email)}`);

        } catch (error) {
            console.error('Error al registrar la vacante:', error);
            if (error.response) {
                // El servidor respondió con un estado fuera del rango 2xx
                alert(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                alert("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
            } else {
                // Algo sucedió al configurar la petición
                alert("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
            }
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
                    
                    <div className='d-flex flex-column align-items-center justify-content-between'>
                        <div className="me-3 flex-grow-1 d-flex flex-column align-items-center">
                            <label className="text-uppercase">Fecha de Inicio</label>
                            <DatePicker
                                selected={VacanteData.fecha_ini}
                                onChange={(date) =>
                                    setVacanteData({ ...VacanteData, fecha_ini: date })
                                }
                                placeholderText="Selecciona una fecha"
                                dateFormat="dd/MM/yyyy"
                                disabled={VacanteData.indefinidoInicio}
                            />
                        </div>

                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <h6>INDEFINIDO</h6>
                            <div className="form-switch mt-2" style={{ marginBottom: "1rem" }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="indefinidoInicio"
                                    checked={VacanteData.indefinidoInicio}
                                    onChange={() => handleIndefinidoChange("indefinidoInicio")}
                                    style={{ transform: "scale(0.8)" }}
                                />
                            </div>
                        </div>
                    </div>

        
                    <div className='d-flex flex-column align-items-center'>
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
                                disabled={VacanteData.indefinidoFin}
                            />
                        </div>
                        
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <h6>INDEFINIDO</h6>
                            <div className="form-switch mt-2" style={{ marginBottom: "1rem" }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="indefinidoFin"
                                    checked={VacanteData.indefinidoFin}
                                    onChange={() => handleIndefinidoChange("indefinidoFin")}
                                    style={{ transform: "scale(0.8)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3 align-items-center">
                    <div className="d-flex flex-column align-items-center">
                        <FormInput
                            label="Cualidades Técnicas"
                            name="cualidades"
                            placeholder="Ej. C++"
                            value={VacanteData.cualidades}
                            onChange={handleChange}
                        />
                        
                        <button
                            onClick={handleAddCualidad}
                            className="btn btn-light mb-2"
                            type="button"
                        >
                            Añadir
                        </button>

                        <div className="d-flex flex-row">
                            {cualidadesList.map((cualidad, index) => (
                                <div
                                    key={index}
                                    className="btn btn-light rounded-pill px-3 py-1 mb-2 me-1"
                                    style={{ border: "1px solid #ccc", cursor: "pointer", marginTop: "5px" }}
                                    onClick={() => handleRemoveCualidad(index)}
                                    title="Haz clic para eliminar"
                                >
                                    {cualidad}
                                </div>
                            ))}
                        </div>


                    </div>
                </div>

                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold mb-3">
                        PUBLICAR
                </button>
                <button  onClick={() => navigate(`/miEmpresa/${encodeURIComponent(email)}`, {state: { auth: auth }})} type="button" className="btn btn-light rounded-pill px-4 fw-semibold">
                        VOLVER A MI PERFIL
                </button>
            </form>
            
            
        </div>

        
    )
}