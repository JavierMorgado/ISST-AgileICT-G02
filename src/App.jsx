import { useState, useEffect } from 'react';

import Home from './Home.jsx';
import LogInEmpresa from './LogIn-Empresa.jsx';
import LogInProf from './LogIn-Prof.jsx';
import RegisterEmpresa from './Register-Empresa.jsx';
import RegisterProf from './Register-Prof.jsx';
import PerfilEmpresa from './PerfilEmpresa.jsx';
import PerfilProf from './PerfilProf.jsx';
import MisOfertas from './MisOfertas.jsx';

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
        <Route path="/miPerfil/:correo" element={<PerfilProf />} />
        <Route path="/miPerfilEmpresa" element={<PerfilEmpresa />} />
        <Route path="/misOfertas/:correo" element={<MisOfertas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
