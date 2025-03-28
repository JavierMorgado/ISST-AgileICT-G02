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
    private String nombre;
    private String telefono;
    @JsonIgnore @Lob private byte[] cv;
    private String puesto;
    private String[] cualidades;
    private String fechaIni;
    private String fechaFin;
    @OneToMany(mappedBy = "profesional") List<@Valid Oferta> ofertas;

    
    public Profesional() {
    }


    public Profesional(String nombre, @Email String correo, String telefono, byte[] cv, String puesto,
            String[] cualidades, String fechaIni, String fechaFin) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.cv = cv;
        this.puesto = puesto;
        this.cualidades = cualidades;
        this.fechaIni = fechaIni;
        this.fechaFin = fechaFin;
    }


    public String getNombre() {
        return nombre;
    }


    public String getCorreo() {
        return correo;
    }


    public String getTelefono() {
        return telefono;
    }


    public byte[] getCv() {
        return cv;
    }

    @JsonGetter("cv")
    public URI getDireccionCv() throws URISyntaxException {
        return new URI("./cv");
    }



    public String getPuesto() {
        return puesto;
    }


    public String[] getCualidades() {
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
    public String[] getEmailsOfertas() {
        if (ofertas != null) {
            return ofertas.stream().map(Oferta::getProfesional).toArray(String[]::new);
        } else {
            return new String[0];
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


    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @JsonProperty
    public void setCv(byte[] cv) {
        this.cv = cv;
    }


    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }


    public void setCualidades(String[] cualidades) {
        this.cualidades = cualidades;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
        result = prime * result + ((correo == null) ? 0 : correo.hashCode());
        result = prime * result + ((telefono == null) ? 0 : telefono.hashCode());
        result = prime * result + ((puesto == null) ? 0 : puesto.hashCode());
        result = prime * result + Arrays.hashCode(cualidades);
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
        if (!Arrays.equals(cualidades, other.cualidades))
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
        return "Profesional [nombre=" + nombre + ", correo=" + correo + ", telefono=" + telefono + ", puesto=" + puesto
                + ", cualidades=" + Arrays.toString(cualidades) + ", fechaInicio=" + fechaIni + ", fechaFin=" + fechaFin + "]";
    }

    
}
