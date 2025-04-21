package es.upm.dit.isst.agileapi.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

@Entity
public class Empresa {
    @Id private String nombre;
    @Email private String email;
    private String password;
    private String suscripcion;
    @OneToMany(mappedBy = "empresa") @JsonIgnore List<@Valid Puesto> puestos;


    public Empresa() {
    }

    public Empresa(String nombre, String email, String password, String suscripcion) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.suscripcion = suscripcion;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
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
    @JsonGetter("idpuestos")
    public Long[] getIdsPuestos() {
        if (puestos != null) {
            return puestos.stream().map(Puesto::getId).toArray(Long[]::new);
        } else {
            return new Long[0];
        }
    }

    @JsonGetter("nombrespuestos")
    public String[] getNombrePuestos() {
        if (puestos != null) {
            return puestos.stream().map(Puesto::getNombrePuesto).toArray(String[]::new);
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
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((password == null) ? 0 : password.hashCode());
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
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (password == null) {
            if (other.password != null)
                return false;
        } else if (!password.equals(other.password))
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
        return "Empresa [nombre=" + nombre + ", email=" + email + ", password=" + password + ", suscripcion="
                + suscripcion + "]";
    }
    
    
}
