package es.upm.dit.isst.agileapi.repository;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.agileapi.model.Puesto;

import java.util.Optional;

public interface PuestoRepository extends CrudRepository<Puesto, Long> {
    // No need to add any methods here, as the default CRUD methods are sufficient.
    // You can add custom query methods if needed in the future.
    Optional<Puesto> findPuestoById(Long id);
    Puesto savePuesto(Puesto puesto);
}
