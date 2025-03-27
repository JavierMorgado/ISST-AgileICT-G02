import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';

export default function Vacante(props){

    function goToVacante(){
        window.location.href = '/mi-empresa/vacante';
    }

    return(
        <button onClick={goToVacante}>
            <Stack className='align-items-center justify-content-center rounded-5' style={{backgroundColor: '#D83000'}}>
                <div className='mt-2 mb-2 me-5 ms-5'>
                    <h3 className='text-uppercase'>Título</h3>
                    <p className='fw-normal' style={{textTransform: 'capitalize', lineHeight: '0.75'}}>Cualidades</p>
                    <p className='fw-normal' style={{textTransform: 'capitalize', lineHeight: '0.75'}}>Experiencia</p>
                    <p className='fw-normal' style={{textTransform: 'capitalize', lineHeight: '0.75'}}>Disponibilidad</p>
                </div>
            </Stack>
        </button>
    )
        

}