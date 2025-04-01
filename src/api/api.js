// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/agile',
});

// PROFESIONALES (correo como identificador)
export const registrarProfesional = (datos) => api.post('/profesionales', datos);
export const obtenerPerfilProfesional = (correo) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}`);
export const obtenerOfertasAsignadas = (correo) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}/ofertas`);
// export const aceptarOferta = (idOferta, correo) =>
//   api.post(`/ofertas/${idOferta}/aceptar`, { correo });

export default api;
