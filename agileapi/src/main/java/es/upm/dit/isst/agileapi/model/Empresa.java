package es.upm.dit.isst.agileapi.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

@Entity
public class Empresa {
    @Id private String nombre;
    @Email private String correo;
    private String telefono;
    private String suscripcion;
    @OneToMany(mappedBy = "empresa") List<@Valid Puesto> puestos;


    public Empresa() {
    }

    public Empresa(String nombre, String correo, String telefono, String suscripcion) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.suscripcion = suscripcion;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getSuscripcion() {
        return suscripcion;
    }
    public void setSuscripcion(String suscripcion) {
        this.suscripcion = suscripcion;
    }
    public List<Puesto> getPuestos() {
        return puestos;
    }

    //REVISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRRR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @JsonGetter("puestos")
    public String[] getIdsPuestos() {
        if (puestos != null) {
            return puestos.stream().map(Puesto::getId).toArray(String[]::new);
        } else {
            return new String[0];
        }
    }

    @JsonProperty("puestos")
    public void setPuestos(List<Puesto> puestos) {
        this.puestos = puestos;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
        result = prime * result + ((correo == null) ? 0 : correo.hashCode());
        result = prime * result + ((telefono == null) ? 0 : telefono.hashCode());
        result = prime * result + ((suscripcion == null) ? 0 : suscripcion.hashCode());
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
        Empresa other = (Empresa) obj;
        if (nombre == null) {
            if (other.nombre != null)
                return false;
        } else if (!nombre.equals(other.nombre))
            return false;
        if (correo == null) {
            if (other.correo != null)
                return false;
        } else if (!correo.equals(other.correo))
            return false;
        if (telefono == null) {
            if (other.telefono != null)
                return false;
        } else if (!telefono.equals(other.telefono))
            return false;
        if (suscripcion == null) {
            if (other.suscripcion != null)
                return false;
        } else if (!suscripcion.equals(other.suscripcion))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Empresa [nombre=" + nombre + ", correo=" + correo + ", telefono=" + telefono + ", suscripcion="
                + suscripcion + "]";
    }
    
    
}
