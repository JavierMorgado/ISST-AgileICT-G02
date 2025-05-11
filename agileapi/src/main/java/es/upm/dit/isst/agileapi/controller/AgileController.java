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

import java.net.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.core.userdetails.User;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/agile")
public class AgileController {

    private final OfertaRepository ofertaRepository;
    private final ProfesionalRepository profesionalRepository;
    private final EmpresaRepository empresaRepository;
    private final PuestoRepository puestoRepository;

    @Autowired
    private JdbcUserDetailsManager userDetailsManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static final Logger log =
        LoggerFactory.getLogger(AgileController.class);

    public AgileController(OfertaRepository ofertaRepository, ProfesionalRepository profesionalRepository, EmpresaRepository empresaRepository, PuestoRepository puestoRepository) {
        this.ofertaRepository = ofertaRepository;
        this.profesionalRepository = profesionalRepository;
        this.empresaRepository = empresaRepository;
        this.puestoRepository = puestoRepository;
        
    }

    @PostMapping("/registrar/profesionales")
    ResponseEntity<Profesional> createProfesional(@RequestBody Profesional profesional) {
        // Validar si el usuario con ese correo electrónico ya existe
        if (profesionalRepository.findById(profesional.getCorreo()).isPresent()) {
            return new ResponseEntity<Profesional>(HttpStatus.CONFLICT);
        }
        String password = passwordEncoder.encode(profesional.getPassword());
        // Guardar el profesional en la base de datos
        profesional.setPassword(password);
        Profesional savedProfesional = profesionalRepository.save(profesional);
        log.info("Profesional creado: {}", savedProfesional.getCorreo());

        // Crear usuario para autenticación
        UserDetails user = User.builder()
            .username(profesional.getCorreo())
            .password(password)
            .roles("PROFESIONAL")
            .build();
        userDetailsManager.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedProfesional);
    }

    @GetMapping("/profesionales/{correo}")
    ResponseEntity<Profesional> readOneProfesional(@PathVariable String correo) {
        return profesionalRepository.findById(correo).map(profesional ->
            ResponseEntity.ok().body(profesional)
        ).orElse(new ResponseEntity<Profesional>(HttpStatus.NOT_FOUND));
    }

    
    @PostMapping("/registrar/empresas")
    ResponseEntity<Empresa> createEmpresa(@RequestBody Empresa empresa) {
        // Validar si la empresa con ese correo ya existe
        if (empresaRepository.findById(empresa.getEmail()).isPresent()) {
            return new ResponseEntity<Empresa>(HttpStatus.CONFLICT);
        }
        
        // Guardar la empresa en la base de datos
        String password = passwordEncoder.encode(empresa.getPassword());
        empresa.setPassword(password);
        Empresa savedEmpresa = empresaRepository.save(empresa);
        log.info("Perfil de empresa creado: {}", savedEmpresa.getEmail());

        // Crear usuario para autenticación
        UserDetails user = User.builder()
            .username(empresa.getEmail())
            .password(password)
            .roles("EMPRESA")
            .build();
        userDetailsManager.createUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmpresa);
    }

    @GetMapping("/empresas/{correo}")
    ResponseEntity<Empresa> readOneEmpresa(@PathVariable String correo) {
        return empresaRepository.findById(correo).map(empresa ->
            ResponseEntity.ok().body(empresa)
        ).orElse(new ResponseEntity<Empresa>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/puestos")
    public ResponseEntity<Map<String, Object>> createPuesto(@RequestBody Puesto puesto) {
        // Relacionar empresa por nombre
        Optional<Empresa> empresaOpt = empresaRepository.findById(puesto.getEmpresa().getEmail());
        if (empresaOpt.isEmpty()) {
            log.warn("Empresa con email {} no encontrada", puesto.getEmpresa().getEmail());
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

    @GetMapping("/puestos/{id}/profesional")
    public ResponseEntity<Profesional> getProfesionalByPuestoId(@PathVariable Long id) {
        // Buscar el puesto por ID
        Optional<Puesto> puestoOpt = puestoRepository.findById(id);
        if (puestoOpt.isEmpty()) {
            log.warn("Puesto con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Puesto puesto = puestoOpt.get();
        List<Oferta> ofertas = puesto.getOfertas();
        
        // Verificar si hay ofertas asociadas al puesto
        if (ofertas == null || ofertas.isEmpty()) {
            log.info("No se encontraron ofertas asociadas al puesto con ID {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        // Buscar la primera oferta que tenga un profesional asignado y estado ACEPTADA
        Optional<Oferta> ofertaConProfesional = ofertas.stream()
                .filter(oferta -> oferta.getProfesional() != null && 
                                Estado.ACEPTADA.equals(oferta.getEstado()))
                .findFirst();
        
        if (ofertaConProfesional.isEmpty()) {
            log.info("No se encontró ninguna oferta con profesional asignado y estado ACEPTADA para el puesto con ID {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Profesional profesional = ofertaConProfesional.get().getProfesional();
        log.info("Profesional encontrado para el puesto con ID {}: {}", id, profesional.getCorreo());
        
        return ResponseEntity.ok(profesional);
    }

    @PostMapping("/ofertas")
    ResponseEntity<Oferta> createOferta(@RequestBody Oferta oferta) {
        // Guardar la oferta en la base de datos
        Oferta savedOferta = ofertaRepository.save(oferta);
        log.info("Oferta creada con ID {}: {}", savedOferta.getId(), savedOferta.getPuesto().getNombrePuesto());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOferta);
    }

    @DeleteMapping("/puestos/{id}")
    public ResponseEntity<Void> deletePuesto(@PathVariable Long id) {
        Optional<Puesto> puestoOpt = puestoRepository.findById(id);
        if (puestoOpt.isEmpty()) {
            log.warn("Puesto con ID {} no encontrado", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Puesto puesto = puestoOpt.get();
        
        // Obtener todas las ofertas asociadas al puesto
        List<Oferta> ofertas = puesto.getOfertas();
        
        // Eliminar todas las ofertas asociadas
        if (ofertas != null && !ofertas.isEmpty()) {
            log.info("Eliminando la oferta asociada al puesto con ID {}", id);
            ofertaRepository.deleteAll(ofertas);
        }

        // Ahora podemos eliminar el puesto
        puestoRepository.delete(puesto);
        log.info("Puesto con ID {} eliminado", id);

        return ResponseEntity.noContent().build();
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
            if (ofertaOpt.get().getEstado() == Estado.SOLICITADA) {
                ofertaOpt.ifPresent(ofertasList::add);
            } else {
                log.info("Oferta no solicitada encontrada con ID {}: {}", ofertaId, ofertaOpt.get().getPuesto().getNombrePuesto());
            }
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
    @GetMapping("/empresas/{correo}/puestos")
    public Long[] getPuestosByEmpresa(@PathVariable String correo) {
        // Buscar la empresa por nombre
        Optional<Empresa> empresaOpt = empresaRepository.findById(correo);
        if (empresaOpt.isEmpty()) {
            log.warn("Empresa con email {} no encontrada", correo);
            return new Long[0]; // O lanzar una excepción si prefieres
        }

        Empresa empresa = empresaOpt.get();

        // Obtener los puestos asociados a la empresa
        Long[] puestos = empresa.getIdsPuestos();
        if (puestos.length == 0) {
            log.info("No se encontraron puestos asociados a la empresa con email {}", correo);
        } else {
            log.info("Se encontraron {} puestos asociados a la empresa con email {}", puestos.length, correo);
        }

        return puestos;
    }

    // Obtener el mejor profesional para una oferta
    @GetMapping("/puestos/{id}/mejor-profesional")
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

    @PatchMapping("/ofertas/{id}/estado")
    public ResponseEntity<Oferta> actualizarOferta(@PathVariable Long id, @RequestParam String estado) {
        if ("aceptada".equalsIgnoreCase(estado)) {
            return actualizarEstadoOferta(id, Estado.ACEPTADA);
        } else if ("rechazada".equalsIgnoreCase(estado)) {
            return actualizarEstadoOferta(id, Estado.RECHAZADA);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private ResponseEntity<Oferta> actualizarEstadoOferta(Long id, Estado nuevoEstado) {
        // Obtener la oferta existente
        Optional<Oferta> ofertaOpt = ofertaRepository.findById(id);
        if (ofertaOpt.isEmpty()) {
            log.warn("Oferta con ID {} no encontrada", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Oferta oferta = ofertaOpt.get();
        
        // Verificar si la transición de estado es válida
        if (!oferta.getEstado().canTransitionTo(nuevoEstado)) {
            log.warn("Transición de estado no permitida: {} -> {}", oferta.getEstado(), nuevoEstado);
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        
        // Actualizar el estado
        oferta.setEstado(nuevoEstado);
        
        // Guardar la oferta actualizada
        Oferta updatedOferta = ofertaRepository.save(oferta);
        log.info("Estado de oferta con ID {} actualizado a: {}", id, nuevoEstado);
        
        return ResponseEntity.ok(updatedOferta);
    }
    
    @GetMapping("/puestos/{puestoId}/estado")
    public ResponseEntity<List<Map<String, Object>>> getEstadosOfertasByPuestoId(@PathVariable Long puestoId) {
        // Buscar el puesto por ID
        Optional<Puesto> puestoOpt = puestoRepository.findById(puestoId);
        if (puestoOpt.isEmpty()) {
            log.warn("Puesto con ID {} no encontrado", puestoId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Puesto puesto = puestoOpt.get();
        List<Oferta> ofertas = puesto.getOfertas();
        
        if (ofertas == null || ofertas.isEmpty()) {
            log.info("No se encontraron ofertas asociadas al puesto con ID {}", puestoId);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        
        // Crear una lista de respuestas con información relevante
        List<Map<String, Object>> response = new ArrayList<>();
        for (Oferta oferta : ofertas) {
            Map<String, Object> ofertaInfo = new HashMap<>();
            ofertaInfo.put("ofertaId", oferta.getId());
            ofertaInfo.put("estado", oferta.getEstado().toString());
            ofertaInfo.put("profesionalCorreo", oferta.getProfesional() != null ? 
                            oferta.getProfesional().getCorreo() : null);
            
            response.add(ofertaInfo);
        }
        
        log.info("Se encontraron {} ofertas para el puesto con ID {}", ofertas.size(), puestoId);
        return ResponseEntity.ok(response);
    }

}