package es.upm.dit.isst.agileapi.model;

public enum Estado {
    SOLICITADA,
    ACEPTADA,
    RECHAZADA;

    public boolean canTransitionTo(Estado destino) {
        switch (this) {
            case SOLICITADA:
                return destino == ACEPTADA || destino == RECHAZADA;
            case ACEPTADA:
                return false;
            case RECHAZADA:
                return false;
            default:
                throw new IllegalStateException("Unexpected value: " + this);
        }
    }
}
