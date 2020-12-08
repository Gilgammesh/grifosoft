package beans;

import daos.SesionDao;
import java.sql.Timestamp;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

/**
 *
 * @author carlos santander
 */
public class User implements HttpSessionBindingListener {

    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        // Usuario se loguea al sistema
        try {
            Sesion bean = new Sesion();
            bean.setSesiId(event.getSession().getId());
            bean.setUsuaId((Integer) event.getSession().getAttribute("id_usuario"));
            bean.setInicioLogin(new Timestamp(event.getSession().getCreationTime()));
            bean.setSesiLogin(true);
            new SesionDao().updateInicioLogin(bean);
        } catch (Exception ex) {
        }
    }

    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        // Usuario se desloguea del sistema
        try {
            Sesion bean = new Sesion();
            bean.setSesiId(event.getSession().getId());
            bean.setFinLogin(new Timestamp(event.getSession().getLastAccessedTime()));
            bean.setSesiLogin(false);
            new SesionDao().updateFinLogin(bean);
        } catch (Exception ex) {
        }
    }

}
