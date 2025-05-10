package es.upm.dit.isst.agileapi.model;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;

@Entity
public class Puesto {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Long id;
    private String nombrePuesto;
    private String descripcionPuesto;
    private List<String> cualidadesPuesto;
    private String fechaIni;
    private String fechaFin;
    @ManyToOne private Empresa empresa;
    @OneToMany(mappedBy = "puesto") private List<@Valid Oferta> ofertas;

    public Puesto() {
    }
    
    public Puesto(String nombrePuesto, String descripcionPuesto, List<String> cualidadesPuesto, String fechaIni,
            String fechaFin) {
        this.nombrePuesto = nombrePuesto;
        this.descripcionPuesto = descripcionPuesto;
        this.cualidadesPuesto = cualidadesPuesto;
        this.fechaIni = fechaIni;
        this.fechaFin = fechaFin;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombrePuesto() {
        return nombrePuesto;
    }
    public void setNombrePuesto(String nombrePuesto) {
        this.nombrePuesto = nombrePuesto;
    }
    public String getDescripcionPuesto() {
        return descripcionPuesto;
    }
    public void setDescripcionPuesto(String descripcionPuesto) {
        this.descripcionPuesto = descripcionPuesto;
    }
    public List<String> getCualidadesPuesto() {
        return cualidadesPuesto;
    }
    public void setCualidadesPuesto(List<String> cualidadesPuesto) {
        this.cualidadesPuesto = cualidadesPuesto;
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
    public Empresa getEmpresa() {
        return empresa;
    }
    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
    public List<Oferta> getOfertas() {
        return ofertas;
    }

    @JsonGetter("ofertas")
    public String[] getEmailsOfertas() {
        if (ofertas != null) {
            return ofertas.stream()
                          .map(oferta -> oferta.getProfesional().getCorreo()) 
                          .toArray(String[]::new);
        } else {
            return new String[0];
        }
    }
        
    @JsonProperty("ofertas")
    public void setOfertas(List<Oferta> ofertas) {
        this.ofertas = ofertas;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((nombrePuesto == null) ? 0 : nombrePuesto.hashCode());
        result = prime * result + ((descripcionPuesto == null) ? 0 : descripcionPuesto.hashCode());
        result = prime * result + (cualidadesPuesto == null ? 0 : cualidadesPuesto.hashCode());
        result = prime * result + ((fechaIni == null) ? 0 : fechaIni.hashCode());
        result = prime * result + ((fechaFin == null) ? 0 : fechaFin.hashCode());
        result = prime * result + ((empresa == null) ? 0 : empresa.hashCode());
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
        Puesto other = (Puesto) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (nombrePuesto == null) {
            if (other.nombrePuesto != null)
                return false;
        } else if (!nombrePuesto.equals(other.nombrePuesto))
            return false;
        if (descripcionPuesto == null) {
            if (other.descripcionPuesto != null)
                return false;
        } else if (!descripcionPuesto.equals(other.descripcionPuesto))
            return false;
        if (!Objects.equals(cualidadesPuesto, other.cualidadesPuesto))
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
        if (empresa == null) {
            if (other.empresa != null)
                return false;
        } else if (!empresa.equals(other.empresa))
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "Puesto [id=" + id + ", nombrePuesto=" + nombrePuesto + ", descripcionPuesto=" + descripcionPuesto
                + ", cualidadesPuesto=" + Arrays.toString(cualidadesPuesto.toArray(new String[0])) + ", fechaIni=" + fechaIni + ", fechaFin="
                + fechaFin + ", empresa=" + empresa + "]";
    }

    
}