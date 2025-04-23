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

// EMPRESAS
export const registrarEmpresa = (datos) => api.post('/empresas', datos);
export const obtenerPerfilEmpresa = (nombre) =>
  api.get(`/empresas/${nombre}`);
export const obtenerPuestosDeEmpresa = (nombre) =>
  api.get(`/empresa/${nombre}/puestos`);
export const crearPuesto = (puesto) => api.post('/puestos', puesto);
export const obtenerPuestoById = (puestoId) =>
  api.get(`/puestos/${puestoId}`);

// OFERTAS
export const crearOferta = (oferta) => api.post('/ofertas', oferta);
export const asignarMejorProfesional = (puestoId) =>
  api.get(`/oferta/${puestoId}/mejor-profesional`); // suponiendo que haces esto después del POST

export default api;
