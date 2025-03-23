import { useState } from 'react'
import DynamicInput from './textInput'
import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';


export default function MainMenu(props){
    const handleGoHome = () => {
        window.location.href = '/';
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logged out');
    };

    return (
        <div>
            <button onClick={handleGoHome} className='white rounded-pill'>Volver al Inicio</button>
            <button onClick={handleLogout} className='white rounded-pill'>Log Out</button>
        </div>
    )
}