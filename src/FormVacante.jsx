import React, { useState } from 'react';

const FormVacante = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleForm = () => {
        setIsVisible(!isVisible);
    };

    return (
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
        </div>
    );
};

export default FormVacante;