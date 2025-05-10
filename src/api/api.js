// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/agile',
});

// PROFESIONALES (correo como identificador)
export const registrarProfesional = (datos) => api.post('/profesionales', datos);
export const obtenerPerfilProfesional = (correo) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}`);


// EMPRESAS
export const registrarEmpresa = (datos) => api.post('/empresas', datos);
export const obtenerPerfilEmpresa = (nombre) =>
  api.get(`/empresas/${nombre}`);
export const obtenerPuestosDeEmpresa = (nombre) =>
  api.get(`/empresa/${nombre}/puestos`);

//PUESTOS
export const crearPuesto = (puesto) => api.post('/puestos', puesto);
export const obtenerPuestoById = (puestoId) =>
  api.get(`/puestos/${puestoId}`);
export const asignarMejorProfesional = (puestoId) =>
  api.get(`/puesto/${puestoId}/mejor-profesional`); // suponiendo que haces esto después del POST
export const obtenerOfertadePuesto = (puestoId) =>
  api.get(`/puestos/${puestoId}/estado`);
export const deletePuesto = (puestoId) =>
  api.delete(`/puestos/${puestoId}`);
export const getProfesionalPuesto = (puestoId) =>
  api.get(`/puestos/${puestoId}/profesional`);
export const editPuestoById = (puestoId, puesto) =>
  api.put(`/puestos/${puestoId}`, puesto);
// OFERTAS
export const crearOferta = (oferta) => api.post('/ofertas', oferta);
export const obtenerOfertasAsignadas = (correo) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}/ofertas`);
export const cambiarEstadoOferta = (idOferta, estado) =>
  api.patch(`/ofertas/${idOferta}/estado?estado=${encodeURIComponent(estado)}`);
export const obtenerEstadoOferta = (idOferta) =>
  api.get(`/ofertas/${idOferta}/estado`);


export default api;
