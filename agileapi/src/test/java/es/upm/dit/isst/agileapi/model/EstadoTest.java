package es.upm.dit.isst.agileapi.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EstadoTest {

    @Test
    public void testTransicionesValidas() {
        assertTrue(Estado.SOLICITADA.canTransitionTo(Estado.ACEPTADA));
        assertTrue(Estado.SOLICITADA.canTransitionTo(Estado.RECHAZADA));
    }

    @Test
    public void testTransicionesInvalidas() {
        assertFalse(Estado.ACEPTADA.canTransitionTo(Estado.SOLICITADA));
        assertFalse(Estado.RECHAZADA.canTransitionTo(Estado.ACEPTADA));
    }
    
    @Test
    public void testTransicionesEstado() {
        assertTrue(Estado.SOLICITADA.canTransitionTo(Estado.ACEPTADA));
        assertFalse(Estado.ACEPTADA.canTransitionTo(Estado.RECHAZADA));
    }
}
