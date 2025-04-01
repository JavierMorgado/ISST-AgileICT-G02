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
    ResponseEntity<Puesto> createPuesto(@RequestBody Puesto puesto) {
        // Validar si el ID del puesto ya existe
        if (puesto.getId() == null) {
            log.warn("El ID del puesto no puede ser nulo");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Validar si el puesto con ese ID ya existe
        Optional<Puesto> existingPuesto = puestoRepository.findById(puesto.getId());
        if (existingPuesto.isPresent()) {
            log.warn("El puesto con ID {} ya existe", puesto.getId());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        // Guardar el puesto en la base de datos
        Puesto savedPuesto = puestoRepository.save(puesto); // Asegúrate de que exista este método en tu repositorio
        log.info("Puesto creado con ID {}: {}", savedPuesto.getId(), savedPuesto.getNombrePuesto());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPuesto);
    }   

    @PostMapping("/ofertas")
    ResponseEntity<Oferta> createOferta(@RequestBody Oferta oferta) {
        // Validar si la oferta con ese ID ya existe
        if (oferta.getId() == null) {
            log.warn("El ID de la oferta no puede ser nulo");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Validar si la oferta con ese ID ya existe
        Optional<Oferta> existingOferta = ofertaRepository.findById(oferta.getId());
        if (existingOferta.isPresent()) {
            log.warn("La oferta con ID {} ya existe", oferta.getId());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

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
            return Collections.emptyList(); // O lanzar una excepción si prefieres
        }

        Profesional profesional = profesionalOpt.get();

        // Obtener las ofertas asociadas al profesional
        List<Oferta> ofertas = profesional.getOfertas();
        if (ofertas.isEmpty()) {
            log.info("No se encontraron ofertas asociadas al profesional con correo {}", correo);
        } else {
            log.info("Se encontraron {} ofertas asociadas al profesional con correo {}", ofertas.size(), correo);
        }

        return ofertas;
    }

    /**
     * * Obtener todos los puestos de una empresa por su nombre.
     * @param nombre Nombre de la empresa   
     */
    @GetMapping("/empresa/{nombre}/puestos")
    public List<Puesto> getPuestosByEmpresa(@PathVariable String nombre) {
        // Buscar la empresa por nombre
        Optional<Empresa> empresaOpt = empresaRepository.findById(nombre);
        if (empresaOpt.isEmpty()) {
            log.warn("Empresa con nombre {} no encontrada", nombre);
            return Collections.emptyList(); // O lanzar una excepción si prefieres
        }

        Empresa empresa = empresaOpt.get();

        // Obtener los puestos asociados a la empresa
        List<Puesto> puestos = empresa.getPuestos();
        if (puestos.isEmpty()) {
            log.info("No se encontraron puestos asociados a la empresa con nombre {}", nombre);
        } else {
            log.info("Se encontraron {} puestos asociados a la empresa con nombre {}", puestos.size(), nombre);
        }

        return puestos;
    }

    // Obtener el mejor profesional para una oferta
    @GetMapping("/oferta/{id}/mejor-profesional")
    public Profesional getMejorProfesional(@PathVariable Long id) {
        // Buscar la oferta por ID
        Optional<Oferta> ofertaOpt = ofertaRepository.findById(id);
        if (ofertaOpt.isEmpty()) {
            log.warn("Oferta con ID {} no encontrada", id);
            return null; // O lanzar una excepción si prefieres
        }

        Oferta oferta = ofertaOpt.get();

        // Obtener el puesto asociado a la oferta
        Puesto puesto = oferta.getPuesto();
        if (puesto == null) {
            log.warn("La oferta con ID {} no tiene un puesto asociado", id);
            return null;
        }

        // Obtener todos los profesionales
        List<Profesional> profesionales = (List<Profesional>) profesionalRepository.findAll();

        // Filtrar y encontrar el profesional más acorde
        Profesional mejorProfesional = profesionales.stream()
            .filter(profesional -> profesional.getPuesto().equalsIgnoreCase(oferta.getPuesto().getNombrePuesto()))
            .filter(profesional -> profesional.getCualidades().containsAll(puesto.getCualidadesPuesto()))
            .filter(profesional -> {
                // Comprobar si las fechas coinciden
                return (profesional.getFechaIni().compareTo(puesto.getFechaIni()) <= 0 &&
                        profesional.getFechaFin().compareTo(puesto.getFechaFin()) >= 0);
            })
            .findFirst() // Puedes usar lógica adicional para elegir el mejor si hay varios
            .orElse(null);

        if (mejorProfesional == null) {
            log.info("No se encontró un profesional adecuado para la oferta con ID {}", id);
        } else {
            log.info("Profesional encontrado: {}", mejorProfesional.getCorreo());
            oferta.setEstado(Estado.SOLICITADA);
        }

        return mejorProfesional;
    }
}