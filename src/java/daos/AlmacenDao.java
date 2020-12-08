package daos;

import beans.Almacen;
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
public class AlmacenDao {

    private final SqlSessionFactory ssfWeb;

    public AlmacenDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<Almacen> getProveedores(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getProveedores", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertProveedores(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertProveedores", bean);
            session.commit();
        }
    }

    public void updateProveedores(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.updateProveedores", bean);
            session.commit();
        }
    }

    public void deleteProveedores(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.deleteProveedores", bean);
            session.commit();
        }
    }

    public List<Almacen> getProveedoresPlantas(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getProveedoresPlantas", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertProveedoresPlantas(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertProveedoresPlantas", bean);
            session.commit();
        }
    }

    public void deleteProveedoresPlantas(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.deleteProveedoresPlantas", bean);
            session.commit();
        }
    }

    public List<Almacen> getFacturasCompra(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getFacturasCompra", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertFacturasCompra(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertFacturasCompra", bean);
            session.commit();
        }
    }

    public void deleteFacturasCompra(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Almacen.deleteFacturasCompra", bean);
            session.commit();
        }
    }

    public List<Almacen> getFacturasCompraDetalle(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getFacturasCompraDetalle", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertFacturasCompraDetalle(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertFacturasCompraDetalle", bean);
            session.commit();
        }
    }

    public void deleteFacturasCompraDetalle(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Almacen.deleteFacturasCompraDetalle", bean);
            session.commit();
        }
    }

    public List<Almacen> getStockProductosFact(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getStockProductosFact", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getStockProductosLiquid(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getStockProductosLiquid", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getStockAlertProducts(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getStockAlertProducts", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getStockInicial(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getStockInicial", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertStockInicial(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertStockInicial", bean);
            session.commit();
        }
    }

    public void updateStockInicialFact(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.updateStockInicialFact", bean);
            session.commit();
        }
    }

    public void updateStockInicialLiquid(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.updateStockInicialLiquid", bean);
            session.commit();
        }
    }

    public void updateStockInicialEstados(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.updateStockInicialEstados", bean);
            session.commit();
        }
    }

    public List<Almacen> getStockCorreo(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getStockCorreo", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertStockCorreo(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertStockCorreo", bean);
            session.commit();
        }
    }

    public List<Almacen> getStockLimite(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getStockLimite", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertStockLimite(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Almacen.insertStockLimite", bean);
            session.commit();
        }
    }

    public void updateStockLimite(Almacen bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Almacen.updateStockLimite", bean);
            session.commit();
        }
    }

    public List<Almacen> getControlDiarioVentas(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getControlDiarioVentas", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getTotalCompras(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getTotalCompras", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getTotalIngresos(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getTotalIngresos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getTotalGastos(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getTotalGastos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getReporteCombustible(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getReporteCombustible", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getStockLiquidacion(Integer id, String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", id);
        hm.put("d", query1);
        hm.put("e", query2);
        try {
            list = session.selectList("Almacen.getStockLiquidacion", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Almacen> getStockLiquidacionFecha(String query1, String query2) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        try {
            list = session.selectList("Almacen.getStockLiquidacionFecha", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<Almacen> getListFacturasProd(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getListFacturasProd", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<Almacen> getListComprobantesEmi(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Almacen> list = (List<Almacen>) new ArrayList<Almacen>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Almacen.getListComprobantesEmi", hm);
        } finally {
            session.close();
        }
        return list;
    }

}
