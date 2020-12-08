package daos;

import beans.TablasMaestras;
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
public class TablasMaestrasDao {

    private final SqlSessionFactory ssfWeb;

    public TablasMaestrasDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<TablasMaestras> getProductos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getProductos", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<TablasMaestras> getCatalogoProductosSunat(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getCatalogoProductosSunat", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertProductos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertProductos", bean);
            session.commit();
        }
    }

    public void updateProductos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateProductos", bean);
            session.commit();
        }
    }

    public void deleteProductos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteProductos", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getProductosCategorias(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getProductosCategorias", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertProductosCategorias(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertProductosCategorias", bean);
            session.commit();
        }
    }

    public void updateProductosCategorias(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateProductosCategorias", bean);
            session.commit();
        }
    }

    public void deleteProductosCategorias(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteProductosCategorias", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getUnidadesMedida(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getUnidadesMedida", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<TablasMaestras> getUnidadesMedidas(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getUnidadesMedidas", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<TablasMaestras> getUnidadesMedidaSunat(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getUnidadesMedidaSunat", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertUnidadesMedida(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertUnidadesMedida", bean);
            session.commit();
        }
    }

    public void updateUnidadesMedida(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateUnidadesMedida", bean);
            session.commit();
        }
    }

    public void deleteUnidadesMedida(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteUnidadesMedida", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTrabajadores(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTrabajadores", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTrabajadores(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTrabajadores", bean);
            session.commit();
        }
    }

    public void updateTrabajadores(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTrabajadores", bean);
            session.commit();
        }
    }

    public void deleteTrabajadores(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTrabajadores", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTurnos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTurnos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTurnos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTurnos", bean);
            session.commit();
        }
    }

    public void updateTurnos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTurnos", bean);
            session.commit();
        }
    }

    public void deleteTurnos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTurnos", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposEmision(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposEmision", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTiposEmision(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTiposEmision", bean);
            session.commit();
        }
    }

    public void updateTiposEmision(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTiposEmision", bean);
            session.commit();
        }
    }

    public void deleteTiposEmision(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTiposEmision", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposVenta(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposVenta", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTiposVenta(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTiposVenta", bean);
            session.commit();
        }
    }

    public void updateTiposVenta(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTiposVenta", bean);
            session.commit();
        }
    }

    public void deleteTiposVenta(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTiposVenta", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposPago(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposPago", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTiposPago(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTiposPago", bean);
            session.commit();
        }
    }

    public void updateTiposPago(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTiposPago", bean);
            session.commit();
        }
    }

    public void deleteTiposPago(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTiposPago", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposGasto(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposGasto", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTiposGasto(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTiposGasto", bean);
            session.commit();
        }
    }

    public void updateTiposGasto(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTiposGasto", bean);
            session.commit();
        }
    }

    public void deleteTiposGasto(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTiposGasto", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposIngreso(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposIngreso", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertTiposIngreso(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertTiposIngreso", bean);
            session.commit();
        }
    }

    public void updateTiposIngreso(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateTiposIngreso", bean);
            session.commit();
        }
    }

    public void deleteTiposIngreso(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteTiposIngreso", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getBancos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getBancos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertBancos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertBancos", bean);
            session.commit();
        }
    }

    public void updateBancos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateBancos", bean);
            session.commit();
        }
    }

    public void deleteBancos(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteBancos", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getCuentasBanco(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getCuentasBanco", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertCuentasBanco(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertCuentasBanco", bean);
            session.commit();
        }
    }

    public void updateCuentasBanco(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateCuentasBanco", bean);
            session.commit();
        }
    }

    public void deleteCuentasBanco(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteCuentasBanco", bean);
            session.commit();
        }
    }

    public List<TablasMaestras> getTiposDocumento(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getTiposDocumento", hm);
        } finally {
            session.close();
        }
        return list;
    }
    
    public List<TablasMaestras> getServicios(String query) {
        SqlSession session = ssfWeb.openSession();
        List<TablasMaestras> list = (List<TablasMaestras>) new ArrayList<TablasMaestras>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("TablasMaestras.getServicios", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public void insertServicios(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("TablasMaestras.insertServicios", bean);
            session.commit();
        }
    }

    public void updateServicios(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.updateServicios", bean);
            session.commit();
        }
    }

    public void deleteServicios(TablasMaestras bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("TablasMaestras.deleteServicios", bean);
            session.commit();
        }
    }

}
