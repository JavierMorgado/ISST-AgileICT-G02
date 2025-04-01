import { useState, useEffect } from 'react';

import Home from './Home.jsx';
import LogInEmpresa from './LogIn-Empresa.jsx';
import LogInProf from './LogIn-Prof.jsx';
import RegisterEmpresa from './Register-Empresa.jsx';
import RegisterProf from './Register-Prof.jsx';
import PerfilProf from './Perfil-Prof.jsx';
import PerfilEmpresa from './Perfil-Empresa.jsx';
import FormVacante from './FormVacante.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
        <Route path="/miPerfil" element={<PerfilProf />} />
        <Route path="/miPerfilEmpresa" element={<PerfilEmpresa />} />
        <Route path="/form-vacante" element={<FormVacante />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
