package servlets;

import beans.Sesion;
import daos.SesionDao;
import java.io.IOException;
import java.sql.Timestamp;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 *
 * @author carlos santander
 */
public class WebSessionListener extends HttpServlet implements HttpSessionListener {

    HttpServletRequest request;
    HttpServletResponse response;

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        // Se crea la sesion del usuario
        try {
            Sesion bean = new Sesion();
            bean.setSesiId(event.getSession().getId());
            bean.setInicioNavega(new Timestamp(event.getSession().getCreationTime()));
            bean.setFinNavega(null);
            bean.setInicioLogin(null);
            bean.setFinLogin(null);
            bean.setSesiNavega(true);
            bean.setSesiLogin(false);
            bean.setUsuaId(0);
            bean.setMenuId(0);
            bean.setSubMenuId(0);
            new SesionDao().insert(bean);
            event.getSession().setAttribute("sesion_id", event.getSession().getId());
        } catch (Exception ex) {
        }
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        // Se destruye la sesion del usuario
        try {
            String query = " WHERE sesi_id = '" + event.getSession().getId() + "' ";
            Sesion dataS = new SesionDao().getDatos(query);

            Sesion bean = new Sesion();
            bean.setSesiId(event.getSession().getId());
            bean.setFinNavega(new Timestamp(event.getSession().getLastAccessedTime()));
            bean.setSesiNavega(false);

            if (dataS.getSesiLogin() == false) {
                new SesionDao().updateFinNavega(bean);
            }
            if (dataS.getSesiLogin() == true) {
                bean.setFinLogin(new Timestamp(event.getSession().getLastAccessedTime()));
                bean.setSesiLogin(false);
                new SesionDao().updateExpireLogin(bean);
            }
            response.setContentType("text/html;charset=UTF-8");
            request.getRequestDispatcher("/ingreso").forward(request, response);
        } catch (IOException | ServletException ex) {
        }
    }
}
