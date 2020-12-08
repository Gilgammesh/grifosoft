package beans;

import java.sql.Timestamp;

/**
 *
 * @author carlos santander
 */
public class Usuario {

    private Integer usuaId;
    private String usuaUsuario;
    private String usuaClave;
    private String usuaNombres;
    private String usuaApellidoPaterno;
    private String usuaApellidoMaterno;
    private String usuaGenero;
    private Boolean usuaEstado;
    private Integer perfId;
    private String perfNombre;
    private String perfDescripcion;
    private Integer menuId;
    private String menuCodigo;
    private String menuNombre;
    private String menuDescripcion;
    private String menuIcono;
    private Integer subMenuId;
    private String subMenuCodigo;
    private String subMenuNombre;
    private String subMenuDescripcion;
    private String subMenuIcono;
    private Boolean permActivo;
    private Integer cltuId;
    private String cltuClave;
    private Timestamp cltuFechaHora;
    private Boolean cltuActivo;
    private Integer emprId;
    private String emprRuc;
    private String emprRazonSocial;
    private String emprDireccion;
    private String emprTelefonos;
    private String emprCorreo;
    private String emprPaginaWeb;
    private String emprRepreNombres;
    private String emprRepreDni;
    private String emprRepreCargo;
    private String emprUrlLogo;
    private String emprLogoTipo;
    private String emprSede;
    private Integer softId;
    private String softNombre;
    private String softRuta;

    public Usuario() {
    }

    public Integer getUsuaId() {
        return usuaId;
    }

    public void setUsuaId(Integer usuaId) {
        this.usuaId = usuaId;
    }

    public String getUsuaUsuario() {
        return usuaUsuario;
    }

    public void setUsuaUsuario(String usuaUsuario) {
        this.usuaUsuario = usuaUsuario;
    }

    public String getUsuaClave() {
        return usuaClave;
    }

    public void setUsuaClave(String usuaClave) {
        this.usuaClave = usuaClave;
    }

    public String getUsuaNombres() {
        return usuaNombres;
    }

    public void setUsuaNombres(String usuaNombres) {
        this.usuaNombres = usuaNombres;
    }

    public String getUsuaApellidoPaterno() {
        return usuaApellidoPaterno;
    }

    public void setUsuaApellidoPaterno(String usuaApellidoPaterno) {
        this.usuaApellidoPaterno = usuaApellidoPaterno;
    }

    public String getUsuaApellidoMaterno() {
        return usuaApellidoMaterno;
    }

    public void setUsuaApellidoMaterno(String usuaApellidoMaterno) {
        this.usuaApellidoMaterno = usuaApellidoMaterno;
    }

    public String getUsuaGenero() {
        return usuaGenero;
    }

    public void setUsuaGenero(String usuaGenero) {
        this.usuaGenero = usuaGenero;
    }

    public Boolean getUsuaEstado() {
        return usuaEstado;
    }

    public void setUsuaEstado(Boolean usuaEstado) {
        this.usuaEstado = usuaEstado;
    }

    public Integer getPerfId() {
        return perfId;
    }

    public void setPerfId(Integer perfId) {
        this.perfId = perfId;
    }

    public String getPerfNombre() {
        return perfNombre;
    }

    public void setPerfNombre(String perfNombre) {
        this.perfNombre = perfNombre;
    }

    public String getPerfDescripcion() {
        return perfDescripcion;
    }

    public void setPerfDescripcion(String perfDescripcion) {
        this.perfDescripcion = perfDescripcion;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public String getMenuCodigo() {
        return menuCodigo;
    }

    public void setMenuCodigo(String menuCodigo) {
        this.menuCodigo = menuCodigo;
    }

    public String getMenuNombre() {
        return menuNombre;
    }

    public void setMenuNombre(String menuNombre) {
        this.menuNombre = menuNombre;
    }

    public String getMenuDescripcion() {
        return menuDescripcion;
    }

    public void setMenuDescripcion(String menuDescripcion) {
        this.menuDescripcion = menuDescripcion;
    }

    public String getMenuIcono() {
        return menuIcono;
    }

    public void setMenuIcono(String menuIcono) {
        this.menuIcono = menuIcono;
    }

    public Integer getSubMenuId() {
        return subMenuId;
    }

    public void setSubMenuId(Integer subMenuId) {
        this.subMenuId = subMenuId;
    }

    public String getSubMenuCodigo() {
        return subMenuCodigo;
    }

    public void setSubMenuCodigo(String subMenuCodigo) {
        this.subMenuCodigo = subMenuCodigo;
    }

    public String getSubMenuNombre() {
        return subMenuNombre;
    }

    public void setSubMenuNombre(String subMenuNombre) {
        this.subMenuNombre = subMenuNombre;
    }

    public String getSubMenuDescripcion() {
        return subMenuDescripcion;
    }

    public void setSubMenuDescripcion(String subMenuDescripcion) {
        this.subMenuDescripcion = subMenuDescripcion;
    }

    public String getSubMenuIcono() {
        return subMenuIcono;
    }

    public void setSubMenuIcono(String subMenuIcono) {
        this.subMenuIcono = subMenuIcono;
    }

    public Boolean getPermActivo() {
        return permActivo;
    }

    public void setPermActivo(Boolean permActivo) {
        this.permActivo = permActivo;
    }

    public Integer getCltuId() {
        return cltuId;
    }

    public void setCltuId(Integer cltuId) {
        this.cltuId = cltuId;
    }

    public String getCltuClave() {
        return cltuClave;
    }

    public void setCltuClave(String cltuClave) {
        this.cltuClave = cltuClave;
    }

    public Timestamp getCltuFechaHora() {
        return cltuFechaHora;
    }

    public void setCltuFechaHora(Timestamp cltuFechaHora) {
        this.cltuFechaHora = cltuFechaHora;
    }

    public Boolean getCltuActivo() {
        return cltuActivo;
    }

    public void setCltuActivo(Boolean cltuActivo) {
        this.cltuActivo = cltuActivo;
    }

    public Integer getEmprId() {
        return emprId;
    }

    public void setEmprId(Integer emprId) {
        this.emprId = emprId;
    }

    public String getEmprRuc() {
        return emprRuc;
    }

    public void setEmprRuc(String emprRuc) {
        this.emprRuc = emprRuc;
    }

    public String getEmprRazonSocial() {
        return emprRazonSocial;
    }

    public void setEmprRazonSocial(String emprRazonSocial) {
        this.emprRazonSocial = emprRazonSocial;
    }

    public String getEmprDireccion() {
        return emprDireccion;
    }

    public void setEmprDireccion(String emprDireccion) {
        this.emprDireccion = emprDireccion;
    }

    public String getEmprTelefonos() {
        return emprTelefonos;
    }

    public void setEmprTelefonos(String emprTelefonos) {
        this.emprTelefonos = emprTelefonos;
    }

    public String getEmprCorreo() {
        return emprCorreo;
    }

    public void setEmprCorreo(String emprCorreo) {
        this.emprCorreo = emprCorreo;
    }

    public String getEmprPaginaWeb() {
        return emprPaginaWeb;
    }

    public void setEmprPaginaWeb(String emprPaginaWeb) {
        this.emprPaginaWeb = emprPaginaWeb;
    }

    public String getEmprRepreNombres() {
        return emprRepreNombres;
    }

    public void setEmprRepreNombres(String emprRepreNombres) {
        this.emprRepreNombres = emprRepreNombres;
    }

    public String getEmprRepreDni() {
        return emprRepreDni;
    }

    public void setEmprRepreDni(String emprRepreDni) {
        this.emprRepreDni = emprRepreDni;
    }

    public String getEmprRepreCargo() {
        return emprRepreCargo;
    }

    public void setEmprRepreCargo(String emprRepreCargo) {
        this.emprRepreCargo = emprRepreCargo;
    }

    public String getEmprUrlLogo() {
        return emprUrlLogo;
    }

    public void setEmprUrlLogo(String emprUrlLogo) {
        this.emprUrlLogo = emprUrlLogo;
    }

    public String getEmprLogoTipo() {
        return emprLogoTipo;
    }

    public void setEmprLogoTipo(String emprLogoTipo) {
        this.emprLogoTipo = emprLogoTipo;
    }

    public String getEmprSede() {
        return emprSede;
    }

    public void setEmprSede(String emprSede) {
        this.emprSede = emprSede;
    }

    public Integer getSoftId() {
        return softId;
    }

    public void setSoftId(Integer softId) {
        this.softId = softId;
    }

    public String getSoftNombre() {
        return softNombre;
    }

    public void setSoftNombre(String softNombre) {
        this.softNombre = softNombre;
    }

    public String getSoftRuta() {
        return softRuta;
    }

    public void setSoftRuta(String softRuta) {
        this.softRuta = softRuta;
    }

}
