package beans;

import java.sql.Timestamp;

/**
 *
 * @author carlos santander
 */
public class Sesion {

    private Timestamp inicioNavega;
    private String sesiId;
    private Integer usuaId;
    private Timestamp finNavega;
    private Timestamp inicioLogin;
    private Timestamp finLogin;
    private Boolean sesiNavega;
    private Boolean sesiLogin;
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

    public Sesion() {
    }

    public Timestamp getInicioNavega() {
        return inicioNavega;
    }

    public void setInicioNavega(Timestamp inicioNavega) {
        this.inicioNavega = inicioNavega;
    }

    public String getSesiId() {
        return sesiId;
    }

    public void setSesiId(String sesiId) {
        this.sesiId = sesiId;
    }

    public Integer getUsuaId() {
        return usuaId;
    }

    public void setUsuaId(Integer usuaId) {
        this.usuaId = usuaId;
    }

    public Timestamp getFinNavega() {
        return finNavega;
    }

    public void setFinNavega(Timestamp finNavega) {
        this.finNavega = finNavega;
    }

    public Timestamp getInicioLogin() {
        return inicioLogin;
    }

    public void setInicioLogin(Timestamp inicioLogin) {
        this.inicioLogin = inicioLogin;
    }

    public Timestamp getFinLogin() {
        return finLogin;
    }

    public void setFinLogin(Timestamp finLogin) {
        this.finLogin = finLogin;
    }

    public Boolean getSesiNavega() {
        return sesiNavega;
    }

    public void setSesiNavega(Boolean sesiNavega) {
        this.sesiNavega = sesiNavega;
    }

    public Boolean getSesiLogin() {
        return sesiLogin;
    }

    public void setSesiLogin(Boolean sesiLogin) {
        this.sesiLogin = sesiLogin;
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

}
