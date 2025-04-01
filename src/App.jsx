import { useState, useEffect } from 'react';

import Home from './Home.jsx';
import LogInEmpresa from './LogIn-Empresa.jsx';
import LogInProf from './LogIn-Prof.jsx';
import RegisterEmpresa from './Register-Empresa.jsx';
import RegisterProf from './Register-Prof.jsx';
import PerfilEmpresa from './PerfilEmpresa.jsx';
import PerfilProf from './PerfilProf.jsx';
import RegisterVacante from './RegisterVacante.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Row, Stack, Button, Form, Col, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MisOfertas from './MisOfertas.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-empresa" element={<LogInEmpresa />} />
        <Route path="/login-profesional" element={<LogInProf />} />
        <Route path="/register-empresa" element={<RegisterEmpresa />} />
        <Route path="/register-profesional" element={<RegisterProf />} />
        <Route path="/miPerfil" element={<PerfilProf profesional="profesional@example.com"/>} />
        <Route path="/miPerfilEmpresa" element={<PerfilEmpresa empresa="AgyleICT" />} />
        <Route path="/misOfertas" element={<MisOfertas />} />
        <Route path="/mi-empresa/nueva-vacante" element={<RegisterVacante />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
