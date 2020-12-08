package beans;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

/**
 *
 * @author carlos santander
 */
public class Almacen {

    private Integer provId;
    private String provDocumento;
    private String provNombres;
    private String provDireccion;
    private String provContacto;
    private String provTelefonos;
    private String provCorreo;
    private Boolean provEstado;
    private Integer prplId;
    private String prplNombre;
    private String prplDireccion;
    private String prplTelefonos;
    private String prplCorreo;
    private Boolean prplEstado;
    private Integer facoId;
    private Timestamp facoFechaRegistro;
    private Date facoFechaFactura;
    private String facoFactura;
    private String facoComentarios;
    private Integer facdId;
    private BigDecimal facdCantidad;
    private BigDecimal facdMonto;
    private Integer prodId;
    private String prodNombre;
    private String prodDescripcion;
    private BigDecimal galonesIniciales;
    private BigDecimal galonesInicialesFacturacion;
    private BigDecimal galonesInicialesLiquidacion;
    private BigDecimal galonesComprados;
    private BigDecimal galonesCompradosFact;
    private BigDecimal galonesCompradosAnt;
    private BigDecimal galonesCompradosFactAnt;
    private BigDecimal galonesFacturados;
    private BigDecimal lecturaMaquina;
    private BigDecimal devolucionTanque;
    private BigDecimal lecturaFisica;
    private Integer stinId;
    private BigDecimal stinCantidad;
    private Timestamp stinFechaHora;
    private Boolean stinActivo;
    private BigDecimal stinLiquidacion;
    private BigDecimal stock;
    private Integer stcoId;
    private Timestamp stcoFechaHora;
    private String stcoRemitente;
    private String stcoDestinatario;
    private String stcoAsunto;
    private String stcoMensaje;
    private Integer stliId;
    private BigDecimal stliGalones;
    private Timestamp stliFechaHora;
    private Boolean stliActivo;
    private BigDecimal precioVenta;
    private BigDecimal compras;
    private BigDecimal ingresos;
    private BigDecimal gastos;
    private BigDecimal leprLecturaFisica;
    private BigDecimal leprLecturaCm3;
    private BigDecimal galonesVendidos;
    private BigDecimal galonesDevueltos;
    private Integer reveId;
    private Timestamp reveFechaHora;
    private String reveDocumento;
    private String reveNombres;
    private String reveDireccion;
    private String reveChofer;
    private String revePlaca;
    private BigDecimal reveKilometraje;
    private Boolean reveIgv;
    private String reveEstado;
    private String reveNroComprobante;
    private String reveEnvioOse;
    private String reveEnvioError;
    private Integer tiemId;
    private String tiemNombre;
    private String tiemEstado;
    private Integer tiemOse;
    private Integer revdId;
    private String revdSurtidor;
    private String revdLado;
    private String revdProducto;
    private BigDecimal revdPrecioUnitario;
    private BigDecimal revdDescuento;
    private BigDecimal revdDescuentoPrecio;
    private String revdUnidadMedida;
    private String revdUnidadMedidaSimbolo;
    private BigDecimal revdCantidad;
    private BigDecimal revdMonto;
    private BigDecimal revdOpGravada;
    private BigDecimal revdOpInafecta;
    private BigDecimal revdOpExonerada;
    private BigDecimal revdOpGratuita;
    private String revdUnidadMedidaOse;

    public Almacen() {
    }

    public Integer getProvId() {
        return provId;
    }

    public void setProvId(Integer provId) {
        this.provId = provId;
    }

    public String getProvDocumento() {
        return provDocumento;
    }

    public void setProvDocumento(String provDocumento) {
        this.provDocumento = provDocumento;
    }

    public String getProvNombres() {
        return provNombres;
    }

    public void setProvNombres(String provNombres) {
        this.provNombres = provNombres;
    }

    public String getProvDireccion() {
        return provDireccion;
    }

    public void setProvDireccion(String provDireccion) {
        this.provDireccion = provDireccion;
    }

    public String getProvContacto() {
        return provContacto;
    }

    public void setProvContacto(String provContacto) {
        this.provContacto = provContacto;
    }

    public String getProvTelefonos() {
        return provTelefonos;
    }

    public void setProvTelefonos(String provTelefonos) {
        this.provTelefonos = provTelefonos;
    }

    public String getProvCorreo() {
        return provCorreo;
    }

    public void setProvCorreo(String provCorreo) {
        this.provCorreo = provCorreo;
    }

    public Boolean getProvEstado() {
        return provEstado;
    }

    public void setProvEstado(Boolean provEstado) {
        this.provEstado = provEstado;
    }

    public Integer getPrplId() {
        return prplId;
    }

    public void setPrplId(Integer prplId) {
        this.prplId = prplId;
    }

    public String getPrplNombre() {
        return prplNombre;
    }

    public void setPrplNombre(String prplNombre) {
        this.prplNombre = prplNombre;
    }

    public String getPrplDireccion() {
        return prplDireccion;
    }

    public void setPrplDireccion(String prplDireccion) {
        this.prplDireccion = prplDireccion;
    }

    public String getPrplTelefonos() {
        return prplTelefonos;
    }

    public void setPrplTelefonos(String prplTelefonos) {
        this.prplTelefonos = prplTelefonos;
    }

    public String getPrplCorreo() {
        return prplCorreo;
    }

    public void setPrplCorreo(String prplCorreo) {
        this.prplCorreo = prplCorreo;
    }

    public Boolean getPrplEstado() {
        return prplEstado;
    }

    public void setPrplEstado(Boolean prplEstado) {
        this.prplEstado = prplEstado;
    }

    public Integer getFacoId() {
        return facoId;
    }

    public void setFacoId(Integer facoId) {
        this.facoId = facoId;
    }

    public Timestamp getFacoFechaRegistro() {
        return facoFechaRegistro;
    }

    public void setFacoFechaRegistro(Timestamp facoFechaRegistro) {
        this.facoFechaRegistro = facoFechaRegistro;
    }

    public Date getFacoFechaFactura() {
        return facoFechaFactura;
    }

    public void setFacoFechaFactura(Date facoFechaFactura) {
        this.facoFechaFactura = facoFechaFactura;
    }

    public String getFacoFactura() {
        return facoFactura;
    }

    public void setFacoFactura(String facoFactura) {
        this.facoFactura = facoFactura;
    }

    public String getFacoComentarios() {
        return facoComentarios;
    }

    public void setFacoComentarios(String facoComentarios) {
        this.facoComentarios = facoComentarios;
    }

    public Integer getFacdId() {
        return facdId;
    }

    public void setFacdId(Integer facdId) {
        this.facdId = facdId;
    }

    public BigDecimal getFacdCantidad() {
        return facdCantidad;
    }

    public void setFacdCantidad(BigDecimal facdCantidad) {
        this.facdCantidad = facdCantidad;
    }

    public BigDecimal getFacdMonto() {
        return facdMonto;
    }

    public void setFacdMonto(BigDecimal facdMonto) {
        this.facdMonto = facdMonto;
    }

    public Integer getProdId() {
        return prodId;
    }

    public void setProdId(Integer prodId) {
        this.prodId = prodId;
    }

    public String getProdNombre() {
        return prodNombre;
    }

    public void setProdNombre(String prodNombre) {
        this.prodNombre = prodNombre;
    }

    public String getProdDescripcion() {
        return prodDescripcion;
    }

    public void setProdDescripcion(String prodDescripcion) {
        this.prodDescripcion = prodDescripcion;
    }

    public BigDecimal getGalonesIniciales() {
        return galonesIniciales;
    }

    public void setGalonesIniciales(BigDecimal galonesIniciales) {
        this.galonesIniciales = galonesIniciales;
    }

    public BigDecimal getGalonesInicialesFacturacion() {
        return galonesInicialesFacturacion;
    }

    public void setGalonesInicialesFacturacion(BigDecimal galonesInicialesFacturacion) {
        this.galonesInicialesFacturacion = galonesInicialesFacturacion;
    }

    public BigDecimal getGalonesInicialesLiquidacion() {
        return galonesInicialesLiquidacion;
    }

    public void setGalonesInicialesLiquidacion(BigDecimal galonesInicialesLiquidacion) {
        this.galonesInicialesLiquidacion = galonesInicialesLiquidacion;
    }

    public BigDecimal getGalonesCompradosFact() {
        return galonesCompradosFact;
    }

    public void setGalonesCompradosFact(BigDecimal galonesCompradosFact) {
        this.galonesCompradosFact = galonesCompradosFact;
    }

    public BigDecimal getGalonesComprados() {
        return galonesComprados;
    }

    public void setGalonesComprados(BigDecimal galonesComprados) {
        this.galonesComprados = galonesComprados;
    }

    public BigDecimal getGalonesCompradosAnt() {
        return galonesCompradosAnt;
    }

    public void setGalonesCompradosAnt(BigDecimal galonesCompradosAnt) {
        this.galonesCompradosAnt = galonesCompradosAnt;
    }

    public BigDecimal getGalonesCompradosFactAnt() {
        return galonesCompradosFactAnt;
    }

    public void setGalonesCompradosFactAnt(BigDecimal galonesCompradosFactAnt) {
        this.galonesCompradosFactAnt = galonesCompradosFactAnt;
    }

    public BigDecimal getGalonesFacturados() {
        return galonesFacturados;
    }

    public void setGalonesFacturados(BigDecimal galonesFacturados) {
        this.galonesFacturados = galonesFacturados;
    }

    public BigDecimal getLecturaMaquina() {
        return lecturaMaquina;
    }

    public void setLecturaMaquina(BigDecimal lecturaMaquina) {
        this.lecturaMaquina = lecturaMaquina;
    }

    public BigDecimal getDevolucionTanque() {
        return devolucionTanque;
    }

    public void setDevolucionTanque(BigDecimal devolucionTanque) {
        this.devolucionTanque = devolucionTanque;
    }

    public BigDecimal getLecturaFisica() {
        return lecturaFisica;
    }

    public void setLecturaFisica(BigDecimal lecturaFisica) {
        this.lecturaFisica = lecturaFisica;
    }

    public Integer getStinId() {
        return stinId;
    }

    public void setStinId(Integer stinId) {
        this.stinId = stinId;
    }

    public BigDecimal getStinCantidad() {
        return stinCantidad;
    }

    public void setStinCantidad(BigDecimal stinCantidad) {
        this.stinCantidad = stinCantidad;
    }

    public Timestamp getStinFechaHora() {
        return stinFechaHora;
    }

    public void setStinFechaHora(Timestamp stinFechaHora) {
        this.stinFechaHora = stinFechaHora;
    }

    public Boolean getStinActivo() {
        return stinActivo;
    }

    public void setStinActivo(Boolean stinActivo) {
        this.stinActivo = stinActivo;
    }

    public BigDecimal getStinLiquidacion() {
        return stinLiquidacion;
    }

    public void setStinLiquidacion(BigDecimal stinLiquidacion) {
        this.stinLiquidacion = stinLiquidacion;
    }

    public Integer getStcoId() {
        return stcoId;
    }

    public void setStcoId(Integer stcoId) {
        this.stcoId = stcoId;
    }

    public Timestamp getStcoFechaHora() {
        return stcoFechaHora;
    }

    public void setStcoFechaHora(Timestamp stcoFechaHora) {
        this.stcoFechaHora = stcoFechaHora;
    }

    public String getStcoRemitente() {
        return stcoRemitente;
    }

    public void setStcoRemitente(String stcoRemitente) {
        this.stcoRemitente = stcoRemitente;
    }

    public String getStcoDestinatario() {
        return stcoDestinatario;
    }

    public void setStcoDestinatario(String stcoDestinatario) {
        this.stcoDestinatario = stcoDestinatario;
    }

    public String getStcoAsunto() {
        return stcoAsunto;
    }

    public void setStcoAsunto(String stcoAsunto) {
        this.stcoAsunto = stcoAsunto;
    }

    public String getStcoMensaje() {
        return stcoMensaje;
    }

    public void setStcoMensaje(String stcoMensaje) {
        this.stcoMensaje = stcoMensaje;
    }

    public BigDecimal getStock() {
        return stock;
    }

    public void setStock(BigDecimal stock) {
        this.stock = stock;
    }

    public Integer getStliId() {
        return stliId;
    }

    public void setStliId(Integer stliId) {
        this.stliId = stliId;
    }

    public BigDecimal getStliGalones() {
        return stliGalones;
    }

    public void setStliGalones(BigDecimal stliGalones) {
        this.stliGalones = stliGalones;
    }

    public Timestamp getStliFechaHora() {
        return stliFechaHora;
    }

    public void setStliFechaHora(Timestamp stliFechaHora) {
        this.stliFechaHora = stliFechaHora;
    }

    public Boolean getStliActivo() {
        return stliActivo;
    }

    public void setStliActivo(Boolean stliActivo) {
        this.stliActivo = stliActivo;
    }

    public BigDecimal getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(BigDecimal precioVenta) {
        this.precioVenta = precioVenta;
    }

    public BigDecimal getCompras() {
        return compras;
    }

    public void setCompras(BigDecimal compras) {
        this.compras = compras;
    }

    public BigDecimal getIngresos() {
        return ingresos;
    }

    public void setIngresos(BigDecimal ingresos) {
        this.ingresos = ingresos;
    }

    public BigDecimal getGastos() {
        return gastos;
    }

    public void setGastos(BigDecimal gastos) {
        this.gastos = gastos;
    }

    public BigDecimal getLeprLecturaFisica() {
        return leprLecturaFisica;
    }

    public void setLeprLecturaFisica(BigDecimal leprLecturaFisica) {
        this.leprLecturaFisica = leprLecturaFisica;
    }

    public BigDecimal getLeprLecturaCm3() {
        return leprLecturaCm3;
    }

    public void setLeprLecturaCm3(BigDecimal leprLecturaCm3) {
        this.leprLecturaCm3 = leprLecturaCm3;
    }

    public BigDecimal getGalonesVendidos() {
        return galonesVendidos;
    }

    public void setGalonesVendidos(BigDecimal galonesVendidos) {
        this.galonesVendidos = galonesVendidos;
    }

    public BigDecimal getGalonesDevueltos() {
        return galonesDevueltos;
    }

    public void setGalonesDevueltos(BigDecimal galonesDevueltos) {
        this.galonesDevueltos = galonesDevueltos;
    }

    public Integer getReveId() {
        return reveId;
    }

    public void setReveId(Integer reveId) {
        this.reveId = reveId;
    }

    public Timestamp getReveFechaHora() {
        return reveFechaHora;
    }

    public void setReveFechaHora(Timestamp reveFechaHora) {
        this.reveFechaHora = reveFechaHora;
    }

    public String getReveDocumento() {
        return reveDocumento;
    }

    public void setReveDocumento(String reveDocumento) {
        this.reveDocumento = reveDocumento;
    }

    public String getReveNombres() {
        return reveNombres;
    }

    public void setReveNombres(String reveNombres) {
        this.reveNombres = reveNombres;
    }

    public String getReveDireccion() {
        return reveDireccion;
    }

    public void setReveDireccion(String reveDireccion) {
        this.reveDireccion = reveDireccion;
    }

    public String getReveChofer() {
        return reveChofer;
    }

    public void setReveChofer(String reveChofer) {
        this.reveChofer = reveChofer;
    }

    public String getRevePlaca() {
        return revePlaca;
    }

    public void setRevePlaca(String revePlaca) {
        this.revePlaca = revePlaca;
    }

    public BigDecimal getReveKilometraje() {
        return reveKilometraje;
    }

    public void setReveKilometraje(BigDecimal reveKilometraje) {
        this.reveKilometraje = reveKilometraje;
    }

    public Boolean getReveIgv() {
        return reveIgv;
    }

    public void setReveIgv(Boolean reveIgv) {
        this.reveIgv = reveIgv;
    }

    public String getReveEstado() {
        return reveEstado;
    }

    public void setReveEstado(String reveEstado) {
        this.reveEstado = reveEstado;
    }

    public String getReveNroComprobante() {
        return reveNroComprobante;
    }

    public void setReveNroComprobante(String reveNroComprobante) {
        this.reveNroComprobante = reveNroComprobante;
    }

    public String getReveEnvioOse() {
        return reveEnvioOse;
    }

    public void setReveEnvioOse(String reveEnvioOse) {
        this.reveEnvioOse = reveEnvioOse;
    }

    public String getReveEnvioError() {
        return reveEnvioError;
    }

    public void setReveEnvioError(String reveEnvioError) {
        this.reveEnvioError = reveEnvioError;
    }

    public Integer getTiemId() {
        return tiemId;
    }

    public void setTiemId(Integer tiemId) {
        this.tiemId = tiemId;
    }

    public String getTiemNombre() {
        return tiemNombre;
    }

    public void setTiemNombre(String tiemNombre) {
        this.tiemNombre = tiemNombre;
    }

    public String getTiemEstado() {
        return tiemEstado;
    }

    public void setTiemEstado(String tiemEstado) {
        this.tiemEstado = tiemEstado;
    }

    public Integer getTiemOse() {
        return tiemOse;
    }

    public void setTiemOse(Integer tiemOse) {
        this.tiemOse = tiemOse;
    }

    public Integer getRevdId() {
        return revdId;
    }

    public void setRevdId(Integer revdId) {
        this.revdId = revdId;
    }

    public String getRevdSurtidor() {
        return revdSurtidor;
    }

    public void setRevdSurtidor(String revdSurtidor) {
        this.revdSurtidor = revdSurtidor;
    }

    public String getRevdLado() {
        return revdLado;
    }

    public void setRevdLado(String revdLado) {
        this.revdLado = revdLado;
    }

    public String getRevdProducto() {
        return revdProducto;
    }

    public void setRevdProducto(String revdProducto) {
        this.revdProducto = revdProducto;
    }

    public BigDecimal getRevdPrecioUnitario() {
        return revdPrecioUnitario;
    }

    public void setRevdPrecioUnitario(BigDecimal revdPrecioUnitario) {
        this.revdPrecioUnitario = revdPrecioUnitario;
    }

    public BigDecimal getRevdDescuento() {
        return revdDescuento;
    }

    public void setRevdDescuento(BigDecimal revdDescuento) {
        this.revdDescuento = revdDescuento;
    }

    public BigDecimal getRevdDescuentoPrecio() {
        return revdDescuentoPrecio;
    }

    public void setRevdDescuentoPrecio(BigDecimal revdDescuentoPrecio) {
        this.revdDescuentoPrecio = revdDescuentoPrecio;
    }

    public String getRevdUnidadMedida() {
        return revdUnidadMedida;
    }

    public void setRevdUnidadMedida(String revdUnidadMedida) {
        this.revdUnidadMedida = revdUnidadMedida;
    }

    public String getRevdUnidadMedidaSimbolo() {
        return revdUnidadMedidaSimbolo;
    }

    public void setRevdUnidadMedidaSimbolo(String revdUnidadMedidaSimbolo) {
        this.revdUnidadMedidaSimbolo = revdUnidadMedidaSimbolo;
    }

    public BigDecimal getRevdCantidad() {
        return revdCantidad;
    }

    public void setRevdCantidad(BigDecimal revdCantidad) {
        this.revdCantidad = revdCantidad;
    }

    public BigDecimal getRevdMonto() {
        return revdMonto;
    }

    public void setRevdMonto(BigDecimal revdMonto) {
        this.revdMonto = revdMonto;
    }

    public BigDecimal getRevdOpGravada() {
        return revdOpGravada;
    }

    public void setRevdOpGravada(BigDecimal revdOpGravada) {
        this.revdOpGravada = revdOpGravada;
    }

    public BigDecimal getRevdOpInafecta() {
        return revdOpInafecta;
    }

    public void setRevdOpInafecta(BigDecimal revdOpInafecta) {
        this.revdOpInafecta = revdOpInafecta;
    }

    public BigDecimal getRevdOpExonerada() {
        return revdOpExonerada;
    }

    public void setRevdOpExonerada(BigDecimal revdOpExonerada) {
        this.revdOpExonerada = revdOpExonerada;
    }

    public BigDecimal getRevdOpGratuita() {
        return revdOpGratuita;
    }

    public void setRevdOpGratuita(BigDecimal revdOpGratuita) {
        this.revdOpGratuita = revdOpGratuita;
    }

    public String getRevdUnidadMedidaOse() {
        return revdUnidadMedidaOse;
    }

    public void setRevdUnidadMedidaOse(String revdUnidadMedidaOse) {
        this.revdUnidadMedidaOse = revdUnidadMedidaOse;
    }

}
