package es.upm.dit.isst.agileapi.controller;

import es.upm.dit.isst.agileapi.model.Empresa;
import es.upm.dit.isst.agileapi.model.Estado;
import es.upm.dit.isst.agileapi.model.Oferta;
import es.upm.dit.isst.agileapi.model.Profesional;
import es.upm.dit.isst.agileapi.model.Puesto;
import es.upm.dit.isst.agileapi.repository.EmpresaRepository;

//import org.hibernate.validator.internal.util.logging.LoggerFactory;

import es.upm.dit.isst.agileapi.repository.OfertaRepository;
import es.upm.dit.isst.agileapi.repository.ProfesionalRepository;
import es.upm.dit.isst.agileapi.repository.PuestoRepository;

import org.slf4j.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.*;

import java.net.*;
import java.util.*;
import org.springframework.http.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/agile")
public class AgileController {

    private final OfertaRepository ofertaRepository;
    private final ProfesionalRepository profesionalRepository;
    private final EmpresaRepository empresaRepository;
    private final PuestoRepository puestoRepository;

    public static final Logger log =
        LoggerFactory.getLogger(AgileController.class);

    public AgileController(OfertaRepository ofertaRepository, ProfesionalRepository profesionalRepository, EmpresaRepository empresaRepository, PuestoRepository puestoRepository) {
        this.ofertaRepository = ofertaRepository;
        this.profesionalRepository = profesionalRepository;
        this.empresaRepository = empresaRepository;
        this.puestoRepository = puestoRepository;
        
    }

    @PostMapping("/profesionales")
    ResponseEntity<Profesional> createProfesional(@RequestBody Profesional profesional) {
        // Validar si el usuario con ese correo electrónico ya existe
        if (profesionalRepository.findById(profesional.getCorreo()).isPresent()) {
            return new ResponseEntity<Profesional>(HttpStatus.CONFLICT);
        }
        // Guardar el profesional en la base de datos
        Profesional savedProfesional = profesionalRepository.save(profesional);
        log.info("Profesional creado: {}", savedProfesional.getCorreo());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProfesional);
    }

    @GetMapping("/profesionales/{correo}")
    ResponseEntity<Profesional> readOneProfesional(@PathVariable String correo) {
        return profesionalRepository.findById(correo).map(profesional ->
            ResponseEntity.ok().body(profesional)
        ).orElse(new ResponseEntity<Profesional>(HttpStatus.NOT_FOUND));
    }

    
    @PostMapping("/empresas")
    ResponseEntity<Empresa> createEmpresa(@RequestBody Empresa empresa) {
        // Validar si la empresa con ese nombre ya existe
        if (empresaRepository.findById(empresa.getNombre()).isPresent()) {
            return new ResponseEntity<Empresa>(HttpStatus.CONFLICT);
        }
        
        // Guardar la empresa en la base de datos
        Empresa savedEmpresa = empresaRepository.save(empresa);
        log.info("Perfil de empresa creado: {}", savedEmpresa.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmpresa);
    }

    @GetMapping("/empresas/{nombre}")
    ResponseEntity<Empresa> readOneEmpresa(@PathVariable String nombre) {
        return empresaRepository.findById(nombre).map(empresa ->
            ResponseEntity.ok().body(empresa)
        ).orElse(new ResponseEntity<Empresa>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/puestos")
    public ResponseEntity<Map<String, Object>> createPuesto(@RequestBody Puesto puesto) {
        // Relacionar empresa por nombre
        Optional<Empresa> empresaOpt = empresaRepository.findById(puesto.getEmpresa().getNombre());
        if (empresaOpt.isEmpty()) {
            log.warn("Empresa con nombre {} no encontrada", puesto.getEmpresa().getNombre());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        puesto.setEmpresa(empresaOpt.get());

        Puesto savedPuesto = puestoRepository.save(puesto);
        log.info("Puesto creado con ID {}: {}", savedPuesto.getId(), savedPuesto.getNombrePuesto());
         
        // Crear respuesta segura
         Map<String, Object> response = new HashMap<>();
         response.put("id", savedPuesto.getId());
         response.put("nombrePuesto", savedPuesto.getNombrePuesto());
         response.put("descripcionPuesto", savedPuesto.getDescripcionPuesto());
         response.put("fechaIni", savedPuesto.getFechaIni());
         response.put("fechaFin", savedPuesto.getFechaFin());
 
         return ResponseEntity.status(HttpStatus.CREATED).body(response);
     
    }   

    @GetMapping("/puestos/{id}")
    public ResponseEntity<Puesto> getPuestoById(@PathVariable Long id) {
        Optional<Puesto> puestoOpt = puestoRepository.findById(id);
        if (puestoOpt.isEmpty()) {
            log.warn("Puesto con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("Puesto encontrado con ID {}: {}", id, puestoOpt.get().getNombrePuesto());
        return ResponseEntity.ok(puestoOpt.get());
    }

    @PostMapping("/ofertas")
    ResponseEntity<Oferta> createOferta(@RequestBody Oferta oferta) {
        // Guardar la oferta en la base de datos
        Oferta savedOferta = ofertaRepository.save(oferta);
        log.info("Oferta creada con ID {}: {}", savedOferta.getId(), savedOferta.getPuesto().getNombrePuesto());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOferta);
    }






/////////////////////////////CONTINUARÁ...........//////////////////////////////
    // Obtener todas las ofertas de un profesional
    @GetMapping("/profesionales/{correo}/ofertas")
    public List<Oferta> getOfertasByProfesional(@PathVariable String correo) {
        // Buscar el profesional por correo
        Optional<Profesional> profesionalOpt = profesionalRepository.findById(correo);
        if (profesionalOpt.isEmpty()) {
            log.warn("Profesional con correo {} no encontrado", correo);
            return null; // O lanzar una excepción si prefieres
        }

        Profesional profesional = profesionalOpt.get();

        // Obtener las ofertas asociadas al profesional
        Long[] ofertas = profesional.getEmailsOfertas();
        if (ofertas.length == 0) {
            log.info("No se encontraron ofertas asociadas al profesional con correo {}", correo);
        } else {
            log.info("Se encontraron {} ofertas asociadas al profesional con correo {}", ofertas.length, correo);
        }

        List<Oferta> ofertasList = new ArrayList<>();
        for (Long ofertaId : ofertas) {
            Optional<Oferta> ofertaOpt = ofertaRepository.findById(ofertaId);
            ofertaOpt.ifPresent(ofertasList::add);
        }
        if (ofertasList.isEmpty()) {
            log.info("No se encontraron ofertas válidas asociadas al profesional con correo {}", correo);
            return null; // O lanzar una excepción si prefieres
        }

        return ofertasList;
    }

    /**
     * * Obtener todos los puestos de una empresa por su nombre.
     * @param nombre Nombre de la empresa   
     */
    @GetMapping("/empresa/{nombre}/puestos")
    public Long[] getPuestosByEmpresa(@PathVariable String nombre) {
        // Buscar la empresa por nombre
        Optional<Empresa> empresaOpt = empresaRepository.findById(nombre);
        if (empresaOpt.isEmpty()) {
            log.warn("Empresa con nombre {} no encontrada", nombre);
            return new Long[0]; // O lanzar una excepción si prefieres
        }

        Empresa empresa = empresaOpt.get();

        // Obtener los puestos asociados a la empresa
        Long[] puestos = empresa.getIdsPuestos();
        if (puestos.length == 0) {
            log.info("No se encontraron puestos asociados a la empresa con nombre {}", nombre);
        } else {
            log.info("Se encontraron {} puestos asociados a la empresa con nombre {}", puestos.length, nombre);
        }

        return puestos;
    }

    // Obtener el mejor profesional para una oferta
    @GetMapping("/puesto/{id}/mejor-profesional")
    public Profesional getMejorProfesional(@PathVariable Long id) {
        Optional<Puesto> puestoOpt = puestoRepository.findById(id);
        if (puestoOpt.isEmpty()) {
            log.warn("Puesto con ID {} no encontrado", id);
            return null;
        }
        Puesto puesto = puestoOpt.get();
        log.info("Puesto encontrado con ID {}: {}", id, puesto.getNombrePuesto());
        
        // Obtener todos los profesionales
        List<Profesional> profesionales = (List<Profesional>) profesionalRepository.findAll();
        log.info("Número total de profesionales encontrados: {}", profesionales.size());
        
        // Filtrar y encontrar el profesional más acorde
        Profesional mejorProfesional = profesionales.stream()
        .filter(profesional -> {
                log.info("Evaluando profesional con correo: {}", profesional.getCorreo());
                log.info("Nombre del puesto requerido: {}", puesto.getNombrePuesto());
                log.info("Puesto del profesional: {}", profesional.getPuesto());
                return profesional.getPuesto().equalsIgnoreCase(puesto.getNombrePuesto());
            })
            .filter(profesional -> {
                log.info("Cualidades requeridas para el puesto: {}", puesto.getCualidadesPuesto());
                log.info("Cualidades del profesional {}: {}", profesional.getCorreo(), profesional.getCualidades());

                // Normalizar las cualidades a minúsculas para comparación
                List<String> cualidadesPuesto = puesto.getCualidadesPuesto().stream()
                    .map(String::toLowerCase)
                    .toList();
                List<String> cualidadesProfesional = profesional.getCualidades().stream()
                    .map(String::toLowerCase)
                    .toList();

                boolean cumpleCualidades = cualidadesProfesional.containsAll(cualidadesPuesto);
                log.info("El profesional {} cumple con las cualidades requeridas: {}", profesional.getCorreo(), cumpleCualidades);
                return cumpleCualidades;
            })
            .filter(profesional -> {
                log.info("Fechas requeridas para el puesto: Inicio = {}, Fin = {}", puesto.getFechaIni(), puesto.getFechaFin());
                log.info("Fechas del profesional {}: Inicio = {}, Fin = {}", profesional.getCorreo(), profesional.getFechaIni(), profesional.getFechaFin());
                return (profesional.getFechaIni().compareTo(puesto.getFechaIni()) <= 0 &&
                        profesional.getFechaFin().compareTo(puesto.getFechaFin()) >= 0);
            })
            .findFirst() // Puedes usar lógica adicional para elegir el mejor si hay varios
            .orElse(null);

        if (mejorProfesional == null) {
            log.info("No se encontró un profesional adecuado para la oferta con ID {}", id);
        } else {
            log.info("Profesional encontrado: {}", mejorProfesional.getCorreo());
        }

        return mejorProfesional;
    }

}