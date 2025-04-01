import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import FormInput from './FormInput';
import axios from "axios";
import DatePicker from "react-datepicker";


export default function RegisterVacante(props){
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

    const handlePlanSelect = (plan) => {
        console.log("Plan seleccionado:", plan);
        setVacanteData({ ...VacanteData, plan });
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

        // Crear el objeto JSON para enviar
        const dataToSend = {
            nombrePuesto: VacanteData.nomber_puesto,
            descripcionPuesto: VacanteData.descripcion_puesto,
            cualidadesPuesto: cualidadesList, // Usar cualidadesList como array
            fechaIni: VacanteData.fecha_ini,
            fechaFin: VacanteData.fecha_fin,
            empresa: null, // Este campo debe ser completado según la lógica de tu aplicación
            ofertas: [], // Este campo debe ser completado según la lógica de tu aplicación
        };

        try {
            const response = await axios.post('http://localhost:8080/api/agile/puesto', dataToSend, {});
            console.log('Vacante registrada:', response.data);
            goToEmpresa(); // Redirigir al perfil después del registro exitoso
        } catch (error) {
            console.error('Error al registrar la vacante:', error);
            alert("Error al registrar la vacante. Inténtalo de nuevo.");
        }

        console.log('Datos enviados:', dataToSend);
    };



    function goToEmpresa(){
        window.location.href = '/miPerfilEmpresa';
    }

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

                <FormInput
                    label="Cualidades del Puesto"
                    name="cualidades_puesto"
                    placeholder="Cualidades del Puesto"
                    value={VacanteData.cualidades_puesto}
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

                <button type="submit" className="btn btn-light rounded-pill px-4 fw-semibold">
                        REGISTRARSE
                </button>
            </form>
            
            
        </div>

        
    )
}