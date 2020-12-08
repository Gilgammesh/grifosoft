package daos;

import beans.Facturacion;
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
public class FacturacionDao {

    private final SqlSessionFactory ssfWeb;

    public FacturacionDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<Facturacion> getOse(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getOse", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateOse(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateOse", bean);
            session.commit();
        }
    }

    public List<Facturacion> getIgv(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getIgv", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateIgv(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateIgv", bean);
            session.commit();
        }
    }

    public List<Facturacion> getTipoIgv(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getTipoIgv", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateTipoIgv(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateTipoIgv", bean);
            session.commit();
        }
    }

    public void updateAllTipoIgv(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateAllTipoIgv", bean);
            session.commit();
        }
    }

    public List<Facturacion> getMoneda(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getMoneda", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateMoneda(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateMoneda", bean);
            session.commit();
        }
    }

    public void updateAllMoneda(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateAllMoneda", bean);
            session.commit();
        }
    }

    public List<Facturacion> getSunatTransaccion(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getSunatTransaccion", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateSunatTransaccion(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateSunatTransaccion", bean);
            session.commit();
        }
    }

    public void updateAllSunatTransaccion(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateAllSunatTransaccion", bean);
            session.commit();
        }
    }

    public List<Facturacion> getFacturacionElectronica(String query1, String query2, String query3) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query1);
        hm.put("d", query2);
        hm.put("e", query3);
        try {
            list = session.selectList("Facturacion.getFacturacionElectronica", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public List<Facturacion> getListFacturacionElectronica(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getListFacturacionElectronica", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertFacturacionElectronica(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Facturacion.insertFacturacionElectronica", bean);
            session.commit();
        }
    }

    public void updateFacturacionElectronica(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateFacturacionElectronica", bean);
            session.commit();
        }
    }

    public void updateFacturacionElectronicaEstado(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateFacturacionElectronicaEstado", bean);
            session.commit();
        }
    }

    public List<Facturacion> getRegistroVenta(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Facturacion> list = (List<Facturacion>) new ArrayList<Facturacion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Facturacion.getRegistroVenta", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void updateRegistroVenta(Facturacion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Facturacion.updateRegistroVenta", bean);
            session.commit();
        }
    }

}
