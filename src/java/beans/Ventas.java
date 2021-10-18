package beans;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;

/**
 *
 * @author carlos santander
 */
public class Ventas {

    private Integer clieId;
    private String clieDocumento;
    private String clieNombres;
    private String clieDireccion;
    private String clieTelefono;
    private String clieCorreo;
    private Boolean clieEstado;
    private Integer ticlId;
    private String ticlNombre;
    private String ticlEstado;
    private Integer tiveId;
    private String tiveNombre;
    private String tiveEstado;
    private Integer prodId;
    private String prodNombre;
    private String prodDescripcion;
    private String prodEstado;
    private Integer prcaId;
    private String prcaNombre;
    private String prcaEstado;
    private Integer unmeId;
    private String unmeNombre;
    private String unmeSimbolo;
    private String unmeEstado;
    private Integer prveId;
    private BigDecimal prvePrecioUnitario;
    private BigDecimal prvePrecioAlterno1;
    private BigDecimal prvePrecioAlterno2;
    private BigDecimal prveDescuentoPrecio;
    private BigDecimal prveDescuentoPrecioPorcentaje;
    private Timestamp prveFechaHoraPrecio;
    private Boolean prveActivo;
    private Integer matrId;
    private Integer matrFilas;
    private Integer matrColumnas;
    private Boolean matrEstado;
    private Integer surtId;
    private String surtNombre;
    private Integer surtFila;
    private Integer surtColumna;
    private Boolean surtEstado;
    private Boolean surtActivo;
    private Integer sudeId;
    private Boolean sudeEstado;
    private BigDecimal sudeLecturaApertura;
    private Timestamp sudeFechaLectura;
    private Boolean sudeLecturaEstado;
    private Boolean sudeActivo;
    private Integer ladoId;
    private String ladoNombre;
    private String ladoEstado;
    private Integer mangId;
    private String mangNombre;
    private String mangEstado;
    private Integer tudiId;
    private Timestamp tudiFechaInicio;
    private Boolean tudiInicio;
    private Integer cltuIdInicio;
    private Timestamp tudiFechaCierre;
    private Boolean tudiCierre;
    private Integer cltuIdCierre;
    private Integer turnId;
    private String turnNombre;
    private String turnDescripcion;
    private Time turnInicio;
    private Time turnFin;
    private String turnEstado;
    private Integer trabId;
    private String trabDni;
    private String trabNombres;
    private String trabApellidoPaterno;
    private String trabApellidoMaterno;
    private String trabCelular;
    private String trabDireccion;
    private Boolean trabEstado;
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
    private Integer reveCuotasCredito;
    private BigDecimal reveMontoCredito;
    private String reveFechaVencimientoCredito;
    private Integer revePeriodoCredito;
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
    private Integer lediId;
    private BigDecimal lediLecturaInicial;
    private BigDecimal lediLecturaFinal;
    private BigDecimal lediPrecioUnitario;
    private Integer coemId;
    private String coemSigla;
    private String coemSede;
    private Integer coemCorrelativo;
    private Integer coemLongitud;
    private Integer tidoId;
    private String tidoNombre;
    private String tidoDescripcion;
    private Integer tidoCaracteres;
    private String tidoOse;
    private String ticoSunat;
    private Integer tigvId;
    private String prodCodigoSunat;
    private Integer indiId;
    private Timestamp indiFechaHora;
    private String indiDescripcion;
    private BigDecimal indiMonto;
    private Integer tiinId;
    private String tiinNombre;
    private String tiinEstado;
    private Integer gadiId;
    private Timestamp gadiFechaHora;
    private String gadiDescripcion;
    private BigDecimal gadiMonto;
    private Integer tigaId;
    private String tigaNombre;
    private String tigaEstado;
    private Integer leprId;
    private BigDecimal leprLecturaFisica;
    private BigDecimal leprDevolucionTanque;
    private BigDecimal leprLecturaCm3;
    private BigDecimal tusuMonto;
    private BigDecimal tusuEntregado;
    private Integer detaId;
    private BigDecimal detaDevolucion;
    private BigDecimal venta;
    private BigDecimal devolucion;
    private BigDecimal galonesVendidos;
    private BigDecimal entregado;
    private BigDecimal gasto;
    private BigDecimal ingreso;
    private Integer servId;
    private Integer cotuId;
    private Timestamp cotuFechaHora;
    private String cotuDescripcion;
    private BigDecimal cotuGalones;
    private BigDecimal cotuMonto;
    private Integer camaId;
    private String camaNombre;
    private Boolean camaEstado;
    private Integer sulaId;
    private Boolean sulaEstado;
    private Boolean sulaActivo;

    public Ventas() {
    }

    public Integer getClieId() {
        return clieId;
    }

    public void setClieId(Integer clieId) {
        this.clieId = clieId;
    }

    public String getClieDocumento() {
        return clieDocumento;
    }

    public void setClieDocumento(String clieDocumento) {
        this.clieDocumento = clieDocumento;
    }

    public String getClieNombres() {
        return clieNombres;
    }

    public void setClieNombres(String clieNombres) {
        this.clieNombres = clieNombres;
    }

    public String getClieDireccion() {
        return clieDireccion;
    }

    public void setClieDireccion(String clieDireccion) {
        this.clieDireccion = clieDireccion;
    }

    public String getClieTelefono() {
        return clieTelefono;
    }

    public void setClieTelefono(String clieTelefono) {
        this.clieTelefono = clieTelefono;
    }

    public String getClieCorreo() {
        return clieCorreo;
    }

    public void setClieCorreo(String clieCorreo) {
        this.clieCorreo = clieCorreo;
    }

    public Boolean getClieEstado() {
        return clieEstado;
    }

    public void setClieEstado(Boolean clieEstado) {
        this.clieEstado = clieEstado;
    }

    public Integer getTiclId() {
        return ticlId;
    }

    public void setTiclId(Integer ticlId) {
        this.ticlId = ticlId;
    }

    public String getTiclNombre() {
        return ticlNombre;
    }

    public void setTiclNombre(String ticlNombre) {
        this.ticlNombre = ticlNombre;
    }

    public String getTiclEstado() {
        return ticlEstado;
    }

    public void setTiclEstado(String ticlEstado) {
        this.ticlEstado = ticlEstado;
    }

    public Integer getTiveId() {
        return tiveId;
    }

    public void setTiveId(Integer tiveId) {
        this.tiveId = tiveId;
    }

    public String getTiveNombre() {
        return tiveNombre;
    }

    public void setTiveNombre(String tiveNombre) {
        this.tiveNombre = tiveNombre;
    }

    public String getTiveEstado() {
        return tiveEstado;
    }

    public void setTiveEstado(String tiveEstado) {
        this.tiveEstado = tiveEstado;
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

    public String getProdEstado() {
        return prodEstado;
    }

    public void setProdEstado(String prodEstado) {
        this.prodEstado = prodEstado;
    }

    public Integer getPrcaId() {
        return prcaId;
    }

    public void setPrcaId(Integer prcaId) {
        this.prcaId = prcaId;
    }

    public String getPrcaNombre() {
        return prcaNombre;
    }

    public void setPrcaNombre(String prcaNombre) {
        this.prcaNombre = prcaNombre;
    }

    public String getPrcaEstado() {
        return prcaEstado;
    }

    public void setPrcaEstado(String prcaEstado) {
        this.prcaEstado = prcaEstado;
    }

    public Integer getUnmeId() {
        return unmeId;
    }

    public void setUnmeId(Integer unmeId) {
        this.unmeId = unmeId;
    }

    public String getUnmeNombre() {
        return unmeNombre;
    }

    public void setUnmeNombre(String unmeNombre) {
        this.unmeNombre = unmeNombre;
    }

    public String getUnmeSimbolo() {
        return unmeSimbolo;
    }

    public void setUnmeSimbolo(String unmeSimbolo) {
        this.unmeSimbolo = unmeSimbolo;
    }

    public String getUnmeEstado() {
        return unmeEstado;
    }

    public void setUnmeEstado(String unmeEstado) {
        this.unmeEstado = unmeEstado;
    }

    public Integer getPrveId() {
        return prveId;
    }

    public void setPrveId(Integer prveId) {
        this.prveId = prveId;
    }

    public BigDecimal getPrvePrecioUnitario() {
        return prvePrecioUnitario;
    }

    public void setPrvePrecioUnitario(BigDecimal prvePrecioUnitario) {
        this.prvePrecioUnitario = prvePrecioUnitario;
    }

    public BigDecimal getPrvePrecioAlterno1() {
        return prvePrecioAlterno1;
    }

    public void setPrvePrecioAlterno1(BigDecimal prvePrecioAlterno1) {
        this.prvePrecioAlterno1 = prvePrecioAlterno1;
    }

    public BigDecimal getPrvePrecioAlterno2() {
        return prvePrecioAlterno2;
    }

    public void setPrvePrecioAlterno2(BigDecimal prvePrecioAlterno2) {
        this.prvePrecioAlterno2 = prvePrecioAlterno2;
    }

    public BigDecimal getPrveDescuentoPrecio() {
        return prveDescuentoPrecio;
    }

    public void setPrveDescuentoPrecio(BigDecimal prveDescuentoPrecio) {
        this.prveDescuentoPrecio = prveDescuentoPrecio;
    }

    public BigDecimal getPrveDescuentoPrecioPorcentaje() {
        return prveDescuentoPrecioPorcentaje;
    }

    public void setPrveDescuentoPrecioPorcentaje(BigDecimal prveDescuentoPrecioPorcentaje) {
        this.prveDescuentoPrecioPorcentaje = prveDescuentoPrecioPorcentaje;
    }

    public Timestamp getPrveFechaHoraPrecio() {
        return prveFechaHoraPrecio;
    }

    public void setPrveFechaHoraPrecio(Timestamp prveFechaHoraPrecio) {
        this.prveFechaHoraPrecio = prveFechaHoraPrecio;
    }

    public Boolean getPrveActivo() {
        return prveActivo;
    }

    public void setPrveActivo(Boolean prveActivo) {
        this.prveActivo = prveActivo;
    }

    public Integer getMatrId() {
        return matrId;
    }

    public void setMatrId(Integer matrId) {
        this.matrId = matrId;
    }

    public Integer getMatrFilas() {
        return matrFilas;
    }

    public void setMatrFilas(Integer matrFilas) {
        this.matrFilas = matrFilas;
    }

    public Integer getMatrColumnas() {
        return matrColumnas;
    }

    public void setMatrColumnas(Integer matrColumnas) {
        this.matrColumnas = matrColumnas;
    }

    public Boolean getMatrEstado() {
        return matrEstado;
    }

    public void setMatrEstado(Boolean matrEstado) {
        this.matrEstado = matrEstado;
    }

    public Integer getSurtId() {
        return surtId;
    }

    public void setSurtId(Integer surtId) {
        this.surtId = surtId;
    }

    public String getSurtNombre() {
        return surtNombre;
    }

    public void setSurtNombre(String surtNombre) {
        this.surtNombre = surtNombre;
    }

    public Integer getSurtFila() {
        return surtFila;
    }

    public void setSurtFila(Integer surtFila) {
        this.surtFila = surtFila;
    }

    public Integer getSurtColumna() {
        return surtColumna;
    }

    public void setSurtColumna(Integer surtColumna) {
        this.surtColumna = surtColumna;
    }

    public Boolean getSurtEstado() {
        return surtEstado;
    }

    public void setSurtEstado(Boolean surtEstado) {
        this.surtEstado = surtEstado;
    }

    public Boolean getSurtActivo() {
        return surtActivo;
    }

    public void setSurtActivo(Boolean surtActivo) {
        this.surtActivo = surtActivo;
    }

    public Integer getSudeId() {
        return sudeId;
    }

    public void setSudeId(Integer sudeId) {
        this.sudeId = sudeId;
    }

    public Boolean getSudeEstado() {
        return sudeEstado;
    }

    public void setSudeEstado(Boolean sudeEstado) {
        this.sudeEstado = sudeEstado;
    }

    public BigDecimal getSudeLecturaApertura() {
        return sudeLecturaApertura;
    }

    public void setSudeLecturaApertura(BigDecimal sudeLecturaApertura) {
        this.sudeLecturaApertura = sudeLecturaApertura;
    }

    public Timestamp getSudeFechaLectura() {
        return sudeFechaLectura;
    }

    public void setSudeFechaLectura(Timestamp sudeFechaLectura) {
        this.sudeFechaLectura = sudeFechaLectura;
    }

    public Boolean getSudeLecturaEstado() {
        return sudeLecturaEstado;
    }

    public void setSudeLecturaEstado(Boolean sudeLecturaEstado) {
        this.sudeLecturaEstado = sudeLecturaEstado;
    }

    public Boolean getSudeActivo() {
        return sudeActivo;
    }

    public void setSudeActivo(Boolean sudeActivo) {
        this.sudeActivo = sudeActivo;
    }

    public Integer getLadoId() {
        return ladoId;
    }

    public void setLadoId(Integer ladoId) {
        this.ladoId = ladoId;
    }

    public String getLadoNombre() {
        return ladoNombre;
    }

    public void setLadoNombre(String ladoNombre) {
        this.ladoNombre = ladoNombre;
    }

    public String getLadoEstado() {
        return ladoEstado;
    }

    public void setLadoEstado(String ladoEstado) {
        this.ladoEstado = ladoEstado;
    }

    public Integer getMangId() {
        return mangId;
    }

    public void setMangId(Integer mangId) {
        this.mangId = mangId;
    }

    public String getMangNombre() {
        return mangNombre;
    }

    public void setMangNombre(String mangNombre) {
        this.mangNombre = mangNombre;
    }

    public String getMangEstado() {
        return mangEstado;
    }

    public void setMangEstado(String mangEstado) {
        this.mangEstado = mangEstado;
    }

    public Integer getTudiId() {
        return tudiId;
    }

    public void setTudiId(Integer tudiId) {
        this.tudiId = tudiId;
    }

    public Timestamp getTudiFechaInicio() {
        return tudiFechaInicio;
    }

    public void setTudiFechaInicio(Timestamp tudiFechaInicio) {
        this.tudiFechaInicio = tudiFechaInicio;
    }

    public Boolean getTudiInicio() {
        return tudiInicio;
    }

    public void setTudiInicio(Boolean tudiInicio) {
        this.tudiInicio = tudiInicio;
    }

    public Integer getCltuIdInicio() {
        return cltuIdInicio;
    }

    public void setCltuIdInicio(Integer cltuIdInicio) {
        this.cltuIdInicio = cltuIdInicio;
    }

    public Timestamp getTudiFechaCierre() {
        return tudiFechaCierre;
    }

    public void setTudiFechaCierre(Timestamp tudiFechaCierre) {
        this.tudiFechaCierre = tudiFechaCierre;
    }

    public Boolean getTudiCierre() {
        return tudiCierre;
    }

    public void setTudiCierre(Boolean tudiCierre) {
        this.tudiCierre = tudiCierre;
    }

    public Integer getCltuIdCierre() {
        return cltuIdCierre;
    }

    public void setCltuIdCierre(Integer cltuIdCierre) {
        this.cltuIdCierre = cltuIdCierre;
    }

    public Integer getTurnId() {
        return turnId;
    }

    public void setTurnId(Integer turnId) {
        this.turnId = turnId;
    }

    public String getTurnNombre() {
        return turnNombre;
    }

    public void setTurnNombre(String turnNombre) {
        this.turnNombre = turnNombre;
    }

    public String getTurnDescripcion() {
        return turnDescripcion;
    }

    public void setTurnDescripcion(String turnDescripcion) {
        this.turnDescripcion = turnDescripcion;
    }

    public Time getTurnInicio() {
        return turnInicio;
    }

    public void setTurnInicio(Time turnInicio) {
        this.turnInicio = turnInicio;
    }

    public Time getTurnFin() {
        return turnFin;
    }

    public void setTurnFin(Time turnFin) {
        this.turnFin = turnFin;
    }

    public String getTurnEstado() {
        return turnEstado;
    }

    public void setTurnEstado(String turnEstado) {
        this.turnEstado = turnEstado;
    }

    public Integer getTrabId() {
        return trabId;
    }

    public void setTrabId(Integer trabId) {
        this.trabId = trabId;
    }

    public String getTrabDni() {
        return trabDni;
    }

    public void setTrabDni(String trabDni) {
        this.trabDni = trabDni;
    }

    public String getTrabNombres() {
        return trabNombres;
    }

    public void setTrabNombres(String trabNombres) {
        this.trabNombres = trabNombres;
    }

    public String getTrabApellidoPaterno() {
        return trabApellidoPaterno;
    }

    public void setTrabApellidoPaterno(String trabApellidoPaterno) {
        this.trabApellidoPaterno = trabApellidoPaterno;
    }

    public String getTrabApellidoMaterno() {
        return trabApellidoMaterno;
    }

    public void setTrabApellidoMaterno(String trabApellidoMaterno) {
        this.trabApellidoMaterno = trabApellidoMaterno;
    }

    public String getTrabCelular() {
        return trabCelular;
    }

    public void setTrabCelular(String trabCelular) {
        this.trabCelular = trabCelular;
    }

    public String getTrabDireccion() {
        return trabDireccion;
    }

    public void setTrabDireccion(String trabDireccion) {
        this.trabDireccion = trabDireccion;
    }

    public Boolean getTrabEstado() {
        return trabEstado;
    }

    public void setTrabEstado(Boolean trabEstado) {
        this.trabEstado = trabEstado;
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

    public Integer getReveCuotasCredito() {
        return reveCuotasCredito;
    }

    public void setReveCuotasCredito(Integer reveCuotasCredito) {
        this.reveCuotasCredito = reveCuotasCredito;
    }

    public BigDecimal getReveMontoCredito() {
        return reveMontoCredito;
    }

    public void setReveMontoCredito(BigDecimal reveMontoCredito) {
        this.reveMontoCredito = reveMontoCredito;
    }

    public String getReveFechaVencimientoCredito() {
        return reveFechaVencimientoCredito;
    }

    public void setReveFechaVencimientoCredito(String reveFechaVencimientoCredito) {
        this.reveFechaVencimientoCredito = reveFechaVencimientoCredito;
    }

    public Integer getRevePeriodoCredito() {
        return revePeriodoCredito;
    }

    public void setRevePeriodoCredito(Integer revePeriodoCredito) {
        this.revePeriodoCredito = revePeriodoCredito;
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

    public Integer getLediId() {
        return lediId;
    }

    public void setLediId(Integer lediId) {
        this.lediId = lediId;
    }

    public BigDecimal getLediLecturaInicial() {
        return lediLecturaInicial;
    }

    public void setLediLecturaInicial(BigDecimal lediLecturaInicial) {
        this.lediLecturaInicial = lediLecturaInicial;
    }

    public BigDecimal getLediLecturaFinal() {
        return lediLecturaFinal;
    }

    public void setLediLecturaFinal(BigDecimal lediLecturaFinal) {
        this.lediLecturaFinal = lediLecturaFinal;
    }

    public BigDecimal getLediPrecioUnitario() {
        return lediPrecioUnitario;
    }

    public void setLediPrecioUnitario(BigDecimal lediPrecioUnitario) {
        this.lediPrecioUnitario = lediPrecioUnitario;
    }

    public Integer getCoemId() {
        return coemId;
    }

    public void setCoemId(Integer coemId) {
        this.coemId = coemId;
    }

    public String getCoemSigla() {
        return coemSigla;
    }

    public void setCoemSigla(String coemSigla) {
        this.coemSigla = coemSigla;
    }

    public String getCoemSede() {
        return coemSede;
    }

    public void setCoemSede(String coemSede) {
        this.coemSede = coemSede;
    }

    public Integer getCoemCorrelativo() {
        return coemCorrelativo;
    }

    public void setCoemCorrelativo(Integer coemCorrelativo) {
        this.coemCorrelativo = coemCorrelativo;
    }

    public Integer getCoemLongitud() {
        return coemLongitud;
    }

    public void setCoemLongitud(Integer coemLongitud) {
        this.coemLongitud = coemLongitud;
    }

    public Integer getTidoId() {
        return tidoId;
    }

    public void setTidoId(Integer tidoId) {
        this.tidoId = tidoId;
    }

    public String getTidoNombre() {
        return tidoNombre;
    }

    public void setTidoNombre(String tidoNombre) {
        this.tidoNombre = tidoNombre;
    }

    public String getTidoDescripcion() {
        return tidoDescripcion;
    }

    public void setTidoDescripcion(String tidoDescripcion) {
        this.tidoDescripcion = tidoDescripcion;
    }

    public Integer getTidoCaracteres() {
        return tidoCaracteres;
    }

    public void setTidoCaracteres(Integer tidoCaracteres) {
        this.tidoCaracteres = tidoCaracteres;
    }

    public String getTidoOse() {
        return tidoOse;
    }

    public void setTidoOse(String tidoOse) {
        this.tidoOse = tidoOse;
    }

    public String getTicoSunat() {
        return ticoSunat;
    }

    public void setTicoSunat(String ticoSunat) {
        this.ticoSunat = ticoSunat;
    }

    public Integer getTigvId() {
        return tigvId;
    }

    public void setTigvId(Integer tigvId) {
        this.tigvId = tigvId;
    }

    public String getProdCodigoSunat() {
        return prodCodigoSunat;
    }

    public void setProdCodigoSunat(String prodCodigoSunat) {
        this.prodCodigoSunat = prodCodigoSunat;
    }

    public Integer getIndiId() {
        return indiId;
    }

    public void setIndiId(Integer indiId) {
        this.indiId = indiId;
    }

    public Timestamp getIndiFechaHora() {
        return indiFechaHora;
    }

    public void setIndiFechaHora(Timestamp indiFechaHora) {
        this.indiFechaHora = indiFechaHora;
    }

    public String getIndiDescripcion() {
        return indiDescripcion;
    }

    public void setIndiDescripcion(String indiDescripcion) {
        this.indiDescripcion = indiDescripcion;
    }

    public BigDecimal getIndiMonto() {
        return indiMonto;
    }

    public void setIndiMonto(BigDecimal indiMonto) {
        this.indiMonto = indiMonto;
    }

    public Integer getTiinId() {
        return tiinId;
    }

    public void setTiinId(Integer tiinId) {
        this.tiinId = tiinId;
    }

    public String getTiinNombre() {
        return tiinNombre;
    }

    public void setTiinNombre(String tiinNombre) {
        this.tiinNombre = tiinNombre;
    }

    public String getTiinEstado() {
        return tiinEstado;
    }

    public void setTiinEstado(String tiinEstado) {
        this.tiinEstado = tiinEstado;
    }

    public Integer getGadiId() {
        return gadiId;
    }

    public void setGadiId(Integer gadiId) {
        this.gadiId = gadiId;
    }

    public Timestamp getGadiFechaHora() {
        return gadiFechaHora;
    }

    public void setGadiFechaHora(Timestamp gadiFechaHora) {
        this.gadiFechaHora = gadiFechaHora;
    }

    public String getGadiDescripcion() {
        return gadiDescripcion;
    }

    public void setGadiDescripcion(String gadiDescripcion) {
        this.gadiDescripcion = gadiDescripcion;
    }

    public BigDecimal getGadiMonto() {
        return gadiMonto;
    }

    public void setGadiMonto(BigDecimal gadiMonto) {
        this.gadiMonto = gadiMonto;
    }

    public Integer getTigaId() {
        return tigaId;
    }

    public void setTigaId(Integer tigaId) {
        this.tigaId = tigaId;
    }

    public String getTigaNombre() {
        return tigaNombre;
    }

    public void setTigaNombre(String tigaNombre) {
        this.tigaNombre = tigaNombre;
    }

    public String getTigaEstado() {
        return tigaEstado;
    }

    public void setTigaEstado(String tigaEstado) {
        this.tigaEstado = tigaEstado;
    }

    public Integer getLeprId() {
        return leprId;
    }

    public void setLeprId(Integer leprId) {
        this.leprId = leprId;
    }

    public BigDecimal getLeprLecturaFisica() {
        return leprLecturaFisica;
    }

    public void setLeprLecturaFisica(BigDecimal leprLecturaFisica) {
        this.leprLecturaFisica = leprLecturaFisica;
    }

    public BigDecimal getLeprDevolucionTanque() {
        return leprDevolucionTanque;
    }

    public void setLeprDevolucionTanque(BigDecimal leprDevolucionTanque) {
        this.leprDevolucionTanque = leprDevolucionTanque;
    }

    public BigDecimal getLeprLecturaCm3() {
        return leprLecturaCm3;
    }

    public void setLeprLecturaCm3(BigDecimal leprLecturaCm3) {
        this.leprLecturaCm3 = leprLecturaCm3;
    }

    public BigDecimal getTusuMonto() {
        return tusuMonto;
    }

    public void setTusuMonto(BigDecimal tusuMonto) {
        this.tusuMonto = tusuMonto;
    }

    public BigDecimal getTusuEntregado() {
        return tusuEntregado;
    }

    public void setTusuEntregado(BigDecimal tusuEntregado) {
        this.tusuEntregado = tusuEntregado;
    }

    public Integer getDetaId() {
        return detaId;
    }

    public void setDetaId(Integer detaId) {
        this.detaId = detaId;
    }

    public BigDecimal getDetaDevolucion() {
        return detaDevolucion;
    }

    public void setDetaDevolucion(BigDecimal detaDevolucion) {
        this.detaDevolucion = detaDevolucion;
    }

    public BigDecimal getVenta() {
        return venta;
    }

    public void setVenta(BigDecimal venta) {
        this.venta = venta;
    }

    public BigDecimal getDevolucion() {
        return devolucion;
    }

    public void setDevolucion(BigDecimal devolucion) {
        this.devolucion = devolucion;
    }

    public BigDecimal getGalonesVendidos() {
        return galonesVendidos;
    }

    public void setGalonesVendidos(BigDecimal galonesVendidos) {
        this.galonesVendidos = galonesVendidos;
    }

    public BigDecimal getEntregado() {
        return entregado;
    }

    public void setEntregado(BigDecimal entregado) {
        this.entregado = entregado;
    }

    public BigDecimal getGasto() {
        return gasto;
    }

    public void setGasto(BigDecimal gasto) {
        this.gasto = gasto;
    }

    public BigDecimal getIngreso() {
        return ingreso;
    }

    public void setIngreso(BigDecimal ingreso) {
        this.ingreso = ingreso;
    }

    public Integer getServId() {
        return servId;
    }

    public void setServId(Integer servId) {
        this.servId = servId;
    }

    public Integer getCotuId() {
        return cotuId;
    }

    public void setCotuId(Integer cotuId) {
        this.cotuId = cotuId;
    }

    public Timestamp getCotuFechaHora() {
        return cotuFechaHora;
    }

    public void setCotuFechaHora(Timestamp cotuFechaHora) {
        this.cotuFechaHora = cotuFechaHora;
    }

    public String getCotuDescripcion() {
        return cotuDescripcion;
    }

    public void setCotuDescripcion(String cotuDescripcion) {
        this.cotuDescripcion = cotuDescripcion;
    }

    public BigDecimal getCotuGalones() {
        return cotuGalones;
    }

    public void setCotuGalones(BigDecimal cotuGalones) {
        this.cotuGalones = cotuGalones;
    }

    public BigDecimal getCotuMonto() {
        return cotuMonto;
    }

    public void setCotuMonto(BigDecimal cotuMonto) {
        this.cotuMonto = cotuMonto;
    }

    public Integer getCamaId() {
        return camaId;
    }

    public void setCamaId(Integer camaId) {
        this.camaId = camaId;
    }

    public String getCamaNombre() {
        return camaNombre;
    }

    public void setCamaNombre(String camaNombre) {
        this.camaNombre = camaNombre;
    }

    public Boolean getCamaEstado() {
        return camaEstado;
    }

    public void setCamaEstado(Boolean camaEstado) {
        this.camaEstado = camaEstado;
    }

    public Integer getSulaId() {
        return sulaId;
    }

    public void setSulaId(Integer sulaId) {
        this.sulaId = sulaId;
    }

    public Boolean getSulaEstado() {
        return sulaEstado;
    }

    public void setSulaEstado(Boolean sulaEstado) {
        this.sulaEstado = sulaEstado;
    }

    public Boolean getSulaActivo() {
        return sulaActivo;
    }

    public void setSulaActivo(Boolean sulaActivo) {
        this.sulaActivo = sulaActivo;
    }

}
