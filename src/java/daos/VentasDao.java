package daos;

import beans.Ventas;
import config.ConexionFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

/**
 *
 * @author carlos santander
 */
public class VentasDao {

    private final SqlSessionFactory ssfWeb;

    public VentasDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<Ventas> getClientes(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getClientes", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertClientes(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertClientes", bean);
            session.commit();
        }
    }

    public void updateClientes(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateClientes", bean);
            session.commit();
        }
    }

    public void deleteClientes(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.deleteClientes", bean);
            session.commit();
        }
    }

    public List<Ventas> getTiposCliente(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTiposCliente", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getTiposVenta(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTiposVenta", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getPreciosVentaProductosReg(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getPreciosVentaProductosReg", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getPreciosVentaProductos(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Ventas.getPreciosVentaProductos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertPrecioVentaProducto(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertPrecioVentaProducto", bean);
            session.commit();
        }
    }

    public void updatePrecioVentaProductoEstados(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updatePrecioVentaProductoEstados", bean);
            session.commit();
        }
    }

    public List<Ventas> getMatriz(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getMatriz", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateMatrizEstado(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateMatrizEstado", bean);
            session.commit();
        }
    }

    public void updateMatrizEstados(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateMatrizEstados", bean);
            session.commit();
        }
    }

    public List<Ventas> getSurtidores(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getSurtidores", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertSurtidores(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertSurtidores", bean);
            session.commit();
        }
    }

    public void updateSurtidores(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidores", bean);
            session.commit();
        }
    }

    public void deleteSurtidores() {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.deleteSurtidores");
            session.commit();
        }
    }

    public List<Ventas> getSurtidoresDetalle(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getSurtidoresDetalle", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getSurtidoresDetalleLectura(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Ventas.getSurtidoresDetalleLectura", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertSurtidoresDetalle(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertSurtidoresDetalle", bean);
            session.commit();
        }
    }

    public void updateSurtidoresDetalle(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidoresDetalle", bean);
            session.commit();
        }
    }

    public void updateSurtidoresDetalleGlob(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidoresDetalleGlob", bean);
            session.commit();
        }
    }

    public void updateSurtidoresDetalleClean(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidoresDetalleClean", bean);
            session.commit();
        }
    }

    public void deleteSurtidoresDetalle() {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.deleteSurtidoresDetalle");
            session.commit();
        }
    }

    public void updateSurtidoresDetalleApertura(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidoresDetalleApertura", bean);
            session.commit();
        }
    }

    public List<Ventas> getTurnoDiario(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTurnoDiario", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTurnoDiario(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertTurnoDiario", bean);
            session.commit();
        }
    }

    public void updateTurnoDiarioCierre(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateTurnoDiarioCierre", bean);
            session.commit();
        }
    }

    public List<Ventas> getTurnoTrabajadores(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTurnoTrabajadores", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTurnoTrabajadores(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertTurnoTrabajadores", bean);
            session.commit();
        }
    }

    public List<Ventas> getTurnoSurtidores(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTurnoSurtidores", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTurnoSurtidores(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertTurnoSurtidores", bean);
            session.commit();
        }
    }

    public void updateTurnoSurtidores(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateTurnoSurtidores", bean);
            session.commit();
        }
    }

    public List<Ventas> getTurnoHora(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Ventas.getTurnoHora", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getTrabajadoresTurno(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTrabajadoresTurno", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getSurtidoresTurno(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getSurtidoresTurno", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getLadosSurtidor(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLadosSurtidor", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getProductosLadoSurtidor(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getProductosLadoSurtidor", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getRegistroVenta(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getRegistroVenta", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertRegistroVenta(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertRegistroVenta", bean);
            session.commit();
        }
    }

    public void updateRegistroVenta(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateRegistroVenta", bean);
            session.commit();
        }
    }

    public void updateRegistroVentaEstado(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateRegistroVentaEstado", bean);
            session.commit();
        }
    }

    public void updateRegistroVentaEstadoEnvioOSE(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateRegistroVentaEstadoEnvioOSE", bean);
            session.commit();
        }
    }

    public List<Ventas> getRegistroVentaDetalle(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getRegistroVentaDetalle", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertRegistroVentaDetalle(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertRegistroVentaDetalle", bean);
            session.commit();
        }
    }

    public void deleteRegistroVentaDetalle(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteRegistroVentaDetalle", bean);
            session.commit();
        }
    }

    public void emptyRegistroVentaDetalle(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.emptyRegistroVentaDetalle", bean);
            session.commit();
        }
    }

    public List<Ventas> getLados(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLados", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getSurtidoresLados(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getSurtidoresLados", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertSurtidoresLados(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertSurtidoresLados", bean);
            session.commit();
        }
    }

    public void updateSurtidoresLados(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateSurtidoresLados", bean);
            session.commit();
        }
    }

    public void deleteSurtidoresLados() {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.deleteSurtidoresLados");
            session.commit();
        }
    }

    public List<Ventas> getLecturaDiaria(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLecturaDiaria", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getLecturaDiariaFinal(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLecturaDiariaFinal", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertLecturaDiaria(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertLecturaDiaria", bean);
            session.commit();
        }
    }

    public void updateLecturaDiariaAll(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateLecturaDiariaAll", bean);
            session.commit();
        }
    }

    public void updateLecturaDiaria(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateLecturaDiaria", bean);
            session.commit();
        }
    }

    public List<Ventas> getCorrelativosEmision(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getCorrelativosEmision", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getCorrelativoEmision(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getCorrelativoEmision", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertCorrelativoEmision(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertCorrelativoEmision", bean);
            session.commit();
        }
    }

    public void updateCorrelativoEmision(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateCorrelativoEmision", bean);
            session.commit();
        }
    }

    public void updateCorrelativoEmisionNumero(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateCorrelativoEmisionNumero", bean);
            session.commit();
        }
    }

    public List<Ventas> getTiposEmision(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTiposEmision", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getTiposDocumento(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getTiposDocumento", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getRegistroVentasDetalleMontos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getRegistroVentasDetalleMontos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getIngresoDiario(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getIngresoDiario", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertIngresoDiario(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertIngresoDiario", bean);
            session.commit();
        }
    }

    public void deleteIngresoDiario(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteIngresoDiario", bean);
            session.commit();
        }
    }

    public void insertIngresoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertIngresoTurno", bean);
            session.commit();
        }
    }

    public void deleteIngresoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteIngresoTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> getGastoDiario(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getGastoDiario", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertGastoDiario(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertGastoDiario", bean);
            session.commit();
        }
    }

    public void deleteGastoDiario(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteGastoDiario", bean);
            session.commit();
        }
    }

    public void insertGastoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertGastoTurno", bean);
            session.commit();
        }
    }

    public void deleteGastoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteGastoTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> getLecturaProducto(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLecturaProducto", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertLecturaProducto(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertLecturaProducto", bean);
            session.commit();
        }
    }

    public List<Ventas> getDevolucionTanque(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getDevolucionTanque", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertDevolucionTanque(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertDevolucionTanque", bean);
            session.commit();
        }
    }

    public void deleteDevolucionTanque(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteDevolucionTanque", bean);
            session.commit();
        }
    }

    public List<Ventas> getLiquidacionGastos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLiquidacionGastos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getLiquidacionIngresos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLiquidacionIngresos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateLiquidacionMontoEntregado(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateLiquidacionMontoEntregado", bean);
            session.commit();
        }
    }

    public List<Ventas> getLiquidacionTurno(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLiquidacionTurno", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateLiquidacionTrabajadorSurt(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateLiquidacionTrabajadorSurt", bean);
            session.commit();
        }
    }

    public List<Ventas> getLiquidacionVentaSurt(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getLiquidacionVentaSurt", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateLiquidacionVentaSurt(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateLiquidacionVentaSurt", bean);
            session.commit();
        }
    }

    public List<Ventas> getNombreTurnoDiario(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getNombreTurnoDiario", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void removerLecturaDiariaTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerLecturaDiariaTurno", bean);
            session.commit();
        }
    }

    public void removerLecturaProductoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerLecturaProductoTurno", bean);
            session.commit();
        }
    }

    public void removerSurtidoresTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerSurtidoresTurno", bean);
            session.commit();
        }
    }

    public void removerTrabajadoresTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerTrabajadoresTurno", bean);
            session.commit();
        }
    }

    public void removerDevolucionTanqueTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerDevolucionTanqueTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> selectGastoTurno(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.selectGastoTurno", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void removerGastoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerGastoTurno", bean);
            session.commit();
        }
    }

    public void removerGastoDiarioTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerGastoDiarioTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> selectIngresoTurno(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.selectIngresoTurno", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void removerIngresoTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerIngresoTurno", bean);
            session.commit();
        }
    }

    public void removerIngresoDiarioTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerIngresoDiarioTurno", bean);
            session.commit();
        }
    }

    public void removerDiarioTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.removerDiarioTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> getReporteControlLiquidacion(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getReporteControlLiquidacion", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> selectIngresoFecha(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.selectIngresoFecha", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> selectGastoFecha(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.selectGastoFecha", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Ventas> getCompraDiaria(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.getCompraDiaria", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertCompraDiaria(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertCompraDiaria", bean);
            session.commit();
        }
    }

    public void deleteCompraDiaria(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteCompraDiaria", bean);
            session.commit();
        }
    }

    public void deleteCompraDiariaGasto(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteCompraDiariaGasto", bean);
            session.commit();
        }
    }

    public void deleteCompraDiariaTurno(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Ventas.deleteCompraDiariaTurno", bean);
            session.commit();
        }
    }

    public List<Ventas> selectCalleMatriz(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Ventas> list = (List<Ventas>) new ArrayList<Ventas>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Ventas.selectCalleMatriz", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertCalleMatriz(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Ventas.insertCalleMatriz", bean);
            session.commit();
        }
    }

    public void updateCalleMatrizEstado(Ventas bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Ventas.updateCalleMatrizEstado", bean);
            session.commit();
        }
    }

}
