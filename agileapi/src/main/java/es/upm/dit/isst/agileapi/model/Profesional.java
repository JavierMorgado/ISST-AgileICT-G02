package es.upm.dit.isst.agileapi.model;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

@Entity
public class Profesional {
    @Id @Email private String correo;
    private String password;
    private String nombre;
    private String telefono;
    private String puesto;
    private List<String> cualidades;
    private String fechaIni;
    private String fechaFin;
    @OneToMany(mappedBy = "profesional") List<@Valid Oferta> ofertas;

    
    public Profesional() {
    }


    public Profesional(@Email String correo, String password, String nombre, String telefono, String puesto,
            List<String> cualidades, String fechaIni, String fechaFin) {
                this.nombre = correo;
                this.password = password;
                this.correo = nombre;
        this.telefono = telefono;
        this.puesto = puesto;
        this.cualidades = cualidades;
        this.fechaIni = fechaIni;
        this.fechaFin = fechaFin;
    }


    public String getNombre() {
        return nombre;
    }

    public String getPassword() {
        return password;
    }

    public String getCorreo() {
        return correo;
    }


    public String getTelefono() {
        return telefono;
    }


    public String getPuesto() {
        return puesto;
    }


    public List<String> getCualidades() {
        return cualidades;
    }

    public String getFechaIni() {
        return fechaIni;
    }
    

    public void setFechaIni(String fechaIni) {
        this.fechaIni = fechaIni;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public List<Oferta> getOfertas() {
        return ofertas;
    }

    //REVISAAAAAAAAAAAAAAAAAAAAAAAAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @JsonGetter("ofertas")
    public Long[] getEmailsOfertas() {
        if (ofertas != null) {
            return ofertas.stream().map(Oferta::getId).toArray(Long[]::new);
        } else {
            return new Long[0];
        }
    }

    @JsonProperty("ofertas")
    public void setOfertas(List<Oferta> ofertas) {
        this.ofertas = ofertas;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }


    public void setCualidades(List<String> cualidades) {
        this.cualidades = cualidades;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((correo == null) ? 0 : correo.hashCode());
        result = prime * result + ((password == null) ? 0 : password.hashCode());
        result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
        result = prime * result + ((telefono == null) ? 0 : telefono.hashCode());
        result = prime * result + ((puesto == null) ? 0 : puesto.hashCode());
        result = prime * result + ((cualidades == null) ? 0 : cualidades.hashCode());
        result = prime * result + ((fechaIni == null) ? 0 : fechaIni.hashCode());
        result = prime * result + ((fechaFin == null) ? 0 : fechaFin.hashCode());
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
        Profesional other = (Profesional) obj;
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
        if (password == null) {
            if (other.password != null)
                return false;
        } else if (!password.equals(other.password))
            return false;
        if (telefono == null) {
            if (other.telefono != null)
                return false;
        } else if (!telefono.equals(other.telefono))
            return false;
        if (puesto == null) {
            if (other.puesto != null)
                return false;
        } else if (!puesto.equals(other.puesto))
            return false;
        if (!cualidades.equals(other.cualidades))
            return false;
        if (fechaIni == null) {
            if (other.fechaIni != null)
                return false;
        } else if (!fechaIni.equals(other.fechaIni))
            return false;
        if (fechaFin == null) {
            if (other.fechaFin != null)
                return false;
        } else if (!fechaFin.equals(other.fechaFin))
            return false;
        return true;
    }


    @Override
    public String toString() {
        return "Profesional [correo=" + correo + ", password=" + password + "nombre=" + nombre + ", telefono=" + telefono + ", puesto=" + puesto
                + ", cualidades=" + Arrays.toString(cualidades.toArray()) + ", fechaInicio=" + fechaIni + ", fechaFin=" + fechaFin + "]";
    }

    
}