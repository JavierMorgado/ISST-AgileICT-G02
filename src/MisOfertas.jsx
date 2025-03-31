import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';
import agylelogo from './assets/agyleICT.png';

export default function MisOfertas(props) {
    function goToPerfil(){
        window.location.href = '/miPerfil';
    }

    return(
        <div className="d-flex flex-column justify-content-st</div>art align-items-center vh-100 vw-100">
            <div className='d-flex justify-content-end align-items-center pt-3 me-3 w-50 mt-5'>
                <h1>MIS OFERTAS</h1>
            </div>

            <div style={{backgroundColor: '#002C4B', width: '75%', height: '50%'}} className="rounded-5 d-flex flex-column justify-content-center align-items-center mt-5">
            </div>
        </div>
    )

}