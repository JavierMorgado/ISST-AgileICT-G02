package es.upm.dit.isst.agileapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import es.upm.dit.isst.agileapi.model.Empresa;
import es.upm.dit.isst.agileapi.model.Puesto;
import es.upm.dit.isst.agileapi.model.Profesional;
import es.upm.dit.isst.agileapi.model.Estado;
import es.upm.dit.isst.agileapi.model.Oferta;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Base64;


import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AgileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Mock básico de un profesional
    private Profesional crearMockProfesional() {
        Profesional p = new Profesional();
        p.setCorreo("test@correo.com");
        p.setPassword("1234");
        p.setNombre("Test");
        p.setTelefono("123456789");
        p.setPuesto("Backend");
        p.setCualidades(List.of("Java", "Spring"));
        p.setFechaIni("2025-01-01");
        p.setFechaFin("2025-12-31");
        return p;
    }

    @Test
    public void testCrearProfesional() throws Exception {
        Profesional p = crearMockProfesional();

        mockMvc.perform(post("/api/agile/registrar/profesionales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(p)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.correo").value(p.getCorreo()));
    }
@Test
public void testCrearEmpresa() throws Exception {
    Empresa e = new Empresa("empresa@test.com", "Agyle", "1234", "Oro");

    mockMvc.perform(post("/api/agile/registrar/empresas")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(e)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.email").value(e.getEmail()));
}
@Test
public void testCrearPuesto() throws Exception {
    // Crea primero la empresa con ese email y contraseña (si no existe)
    Empresa empresa = new Empresa("empresa@test.com", "Empresa", "1234", "Oro");
    mockMvc.perform(post("/api/agile/registrar/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(empresa)))
        .andExpect(status().isCreated());

    Puesto puesto = new Puesto("Front Developer", "React Developer", List.of("React", "JS"), "2025-01-01", "2025-12-31");
    puesto.setEmpresa(empresa);

    String json = objectMapper.writeValueAsString(puesto);

    mockMvc.perform(post("/api/agile/puestos")
            .header("Authorization", "Basic " + Base64.getEncoder().encodeToString("empresa@test.com:1234".getBytes()))
            .contentType(MediaType.APPLICATION_JSON)
            .content(json))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.nombrePuesto").value("Dev Front"));
}

@Test
public void testCrearOfertaYActualizarEstado() throws Exception {
    // Crear profesional
    Profesional prof = new Profesional();
    prof.setCorreo("profestado@test.com");
    prof.setPassword("clave123");
    prof.setNombre("Estado Tester");
    prof.setTelefono("600000000");
    prof.setPuesto("Tester");
    prof.setCualidades(List.of("JUnit", "MockMvc"));
    prof.setFechaIni("2025-01-01");
    prof.setFechaFin("2025-12-31");

    mockMvc.perform(post("/api/agile/registrar/profesionales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(prof)))
        .andExpect(status().isCreated());

    // Crear empresa
    Empresa empresa = new Empresa("estado@empresa.com", "Test Corp", "clave123", "Plata");
    mockMvc.perform(post("/api/agile/registrar/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(empresa)))
        .andExpect(status().isCreated());

    // Crear puesto autenticado
    Puesto puesto = new Puesto("QA Tester", "Test de estado", List.of("JUnit", "MockMvc"), "2025-01-01", "2025-12-31");
    puesto.setEmpresa(empresa);

    MvcResult puestoResult = mockMvc.perform(post("/api/agile/puestos")
            .header("Authorization", basicAuth("estado@empresa.com", "clave123"))
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(puesto)))
        .andExpect(status().isCreated())
        .andReturn();

    Long puestoId = objectMapper.readTree(puestoResult.getResponse().getContentAsString()).get("id").asLong();

    // Crear oferta autenticado
    Oferta oferta = new Oferta();
    oferta.setEstado(Estado.SOLICITADA);
    oferta.setProfesional(prof);
    Puesto puestoSoloId = new Puesto();
    puestoSoloId.setId(puestoId);
    oferta.setPuesto(puestoSoloId);

    MvcResult ofertaResult = mockMvc.perform(post("/api/agile/ofertas")
            .header("Authorization", basicAuth("estado@empresa.com", "clave123"))
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(oferta)))
        .andExpect(status().isCreated())
        .andReturn();

    Long ofertaId = objectMapper.readTree(ofertaResult.getResponse().getContentAsString()).get("id").asLong();

    // Cambiar estado a ACEPTADA (autenticado)
    mockMvc.perform(patch("/api/agile/ofertas/" + ofertaId + "/estado?estado=aceptada")
            .header("Authorization", basicAuth("estado@empresa.com", "clave123")))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.estado").value("ACEPTADA"));
}
private String basicAuth(String username, String password) {
    return "Basic " + Base64.getEncoder().encodeToString((username + ":" + password).getBytes());
}


}
