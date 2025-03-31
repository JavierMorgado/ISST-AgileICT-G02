package es.upm.dit.isst.agileapi.repository;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.agileapi.model.Profesional;

public interface ProfesionalRepository extends CrudRepository<Profesional, String> {
    // No need to add any methods here, as the default CRUD methods are sufficient.
    // You can add custom query methods if needed in the future.
    
}
