import { useState } from 'react';
import { useEffect } from 'react';

import Home from './Home.jsx';
import LogInEmpresa from './LogIn-Empresa.jsx';
import LogInProf from './LogIn-Prof.jsx';
import RegisterEmpresa from './Register-Empresa.jsx';
import MiEmpresa from './MiEmpresa.jsx';

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
        <Route path="/miEmpresa" element={<MiEmpresa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
