package daos;

import beans.Utilitarios;
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
public class UtilitariosDao {

    private final SqlSessionFactory ssfWeb;

    public UtilitariosDao() {
        ssfWeb = ConexionFactory.getSqlSessionFactory();
    }

    public List<Utilitarios> getPadronRuc(String query) {
        SqlSession session = ssfWeb.openSession();
        List<Utilitarios> list = (List<Utilitarios>) new ArrayList<Utilitarios>();
        HashMap hm = new HashMap();
        hm.put("c", query);
        try {
            list = session.selectList("Utilitarios.getPadronRuc", hm);
        } finally {
            session.close();
        }
        return list;
    }

}
