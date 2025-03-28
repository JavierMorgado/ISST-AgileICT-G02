package es.upm.dit.isst.agileapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Oferta {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
    private Estado estado;
    @ManyToOne private Puesto puesto;
    @ManyToOne private Profesional profesional;

    public Oferta() {
    }
    public Oferta(Estado estado, Puesto puesto, Profesional profesional) {
        this.estado = estado;
        this.puesto = puesto;
        this.profesional = profesional;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Estado getEstado() {
        return estado;
    }
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    public Puesto getPuesto() {
        return puesto;
    }
    public void setPuesto(Puesto puesto) {
        this.puesto = puesto;
    }
    public Profesional getProfesional() {
        return profesional;
    }
    public void setProfesional(Profesional profesional) {
        this.profesional = profesional;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((estado == null) ? 0 : estado.hashCode());
        result = prime * result + ((puesto == null) ? 0 : puesto.hashCode());
        result = prime * result + ((profesional == null) ? 0 : profesional.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Oferta other = (Oferta) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (estado != other.estado)
            return false;
        if (puesto == null) {
            if (other.puesto != null)
                return false;
        } else if (!puesto.equals(other.puesto))
            return false;
        if (profesional == null) {
            if (other.profesional != null)
                return false;
        } else if (!profesional.equals(other.profesional))
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "Oferta [id=" + id + ", estado=" + estado + ", puesto=" + puesto + ", profesional=" + profesional + "]";
    }

}
