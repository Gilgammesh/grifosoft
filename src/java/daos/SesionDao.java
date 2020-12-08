package daos;

import config.ConexionFactory;
import beans.Sesion;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

/**
 *
 * @author carlos santander
 */
public class SesionDao {

    private final SqlSessionFactory ssfWeb;

    public SesionDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<Sesion> getListaDatos(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Sesion> list = (List<Sesion>) new ArrayList<Sesion>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Sesion.getListaDatos", hm);
        } finally {
            session.close();
        }
        return list;
    }

    public Sesion getDatos(String query) {
        SqlSession session = ssfWeb.openSession();
        Sesion datos = new Sesion();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            datos = session.selectOne("Sesion.getDatos", hm);
        } finally {
            session.close();
        }
        return datos;
    }

    public Sesion getMenuId(String query) {
        SqlSession session = ssfWeb.openSession();
        Sesion datos = new Sesion();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            datos = session.selectOne("Sesion.getMenuId", hm);
        } finally {
            session.close();
        }
        return datos;
    }

    public void insert(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.insert("Sesion.insert", bean);
            session.commit();
        }
    }

    public void updateFinNavega(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateFinNavega", bean);
            session.commit();
        }
    }

    public void updateInicioLogin(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateInicioLogin", bean);
            session.commit();
        }
    }

    public void updateMenu(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateMenu", bean);
            session.commit();
        }
    }

    public void updateSubMenu(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateSubMenu", bean);
            session.commit();
        }
    }

    public void updateFinLogin(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateFinLogin", bean);
            session.commit();
        }
    }

    public void updateExpireLogin(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.update("Sesion.updateExpireLogin", bean);
            session.commit();
        }
    }

    public void deleteUsuarioSesion(Sesion bean) {
        try (SqlSession session = ssfWeb.openSession()) {
            session.delete("Sesion.deleteUsuarioSesion", bean);
            session.commit();
        }
    }

}
