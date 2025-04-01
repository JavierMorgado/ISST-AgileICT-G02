import { useState } from 'react'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';

export default function Vacante(props){

    function goToVacante(){
        window.location.href = '/mi-empresa/vacante';
    }

    return(
        <button onClick={goToVacante}>
            <Stack 
                className='align-items-center justify-content-center rounded-5' 
                style={{
                    backgroundColor: '#D83000',
                    maxWidth: '230px',
                }}
            >
                <div className='mt-4 mb-4 pt-3 pb-3 me-5 ms-5'>
                    <h3 className='text-uppercase'>{props.title}</h3>
                </div>
            </Stack>
        </button>
    )
        

}