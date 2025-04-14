import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';

export default function NuevaVacante({nombreEmpresa}){
    const navigate = useNavigate();

    function goToNuevaVacante(){
        navigate(`/miEmpresa/${nombreEmpresa}/nueva-vacante`)
    }

    return(
        <button onClick={goToNuevaVacante} className='background-transparent'>
            <Stack className='align-items-center justify-content-center rounded-5' style={{backgroundColor: '#D83000'}}>
                <div className='mt-4 mb-4 me-5 ms-5'>
                    <h3 className='text-uppercase'>Nueva <br /> Vacante <br /><h1 className='fw-normal'  style={{ lineHeight: '0.75' }}>+</h1></h3>
                </div>
            </Stack>
        </button>
    )
        

}