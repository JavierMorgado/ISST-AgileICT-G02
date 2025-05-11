// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/agile',
});

// PROFESIONALES (correo como identificador)
export const registrarProfesional = (datos) => api.post('/registrar/profesionales', datos );
export const obtenerPerfilProfesional = (correo, auth) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}`, { auth });


// EMPRESAS
export const registrarEmpresa = (datos) => api.post('/registrar/empresas', datos);
export const obtenerPerfilEmpresa = (correo, auth) =>
  api.get(`/empresas/${encodeURIComponent(correo)}`, { auth });
export const obtenerPuestosDeEmpresa = (correo, auth) =>
  api.get(`/empresas/${encodeURIComponent(correo)}/puestos`, { auth });
export const crearPuesto = (puesto, auth) => api.post('/puestos', puesto , { auth });
export const obtenerPuestoById = (puestoId, auth) =>
  api.get(`/puestos/${puestoId}`, { auth });
export const asignarMejorProfesional = (puestoId, auth) =>
  api.get(`/puestos/${puestoId}/mejor-profesional`, { auth }); // suponiendo que haces esto después del POST
export const obtenerOfertadePuesto = (puestoId,auth) =>
  api.get(`/puestos/${puestoId}/estado`, { auth });
export const deletePuesto = (puestoId, auth) =>
  api.delete(`/puestos/${puestoId}`, { auth });
export const getProfesionalPuesto = (puestoId, auth) =>
  api.get(`/puestos/${puestoId}/profesional`, { auth });
export const editPuestoById = (puestoId, puesto, auth) =>
  api.put(`/puestos/${puestoId}`, puesto, { auth });

// OFERTAS
export const crearOferta = (oferta, auth) => api.post('/ofertas', oferta, { auth });
export const obtenerOfertasAsignadas = (correo, auth) =>
  api.get(`/profesionales/${encodeURIComponent(correo)}/ofertas`, { auth });
export const cambiarEstadoOferta = (idOferta, estado, auth) =>
  api.patch(`/ofertas/${idOferta}/estado?estado=${encodeURIComponent(estado)}`,{}, { auth });
export const obtenerEstadoOferta = (idOferta, auth) =>
  api.get(`/ofertas/${idOferta}/estado`, { auth });



export default api;
