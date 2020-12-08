package servlets;

import com.google.gson.Gson;
import beans.Sesion;
import beans.Usuario;
import daos.SesionDao;
import daos.UsuarioDao;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "GsonDataServlet", urlPatterns = {"/GsonData"})
public class GsonDataServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    int año_presente = LocalDate.now().getYear();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("url") == null ? "" : request.getParameter("url");
        switch (action) {
            case "":
                index(request, response);
                break;
            case "DataLogin":
                dataLogin(request, response);
                break;
            case "DataSubMenu":
                dataSubMenu(request, response);
                break;
            case "DataSubMenuPerf":
                dataSubMenuPerf(request, response);
                break;
            case "menuActivo":
                menuActivo(request, response);
                break;
            case "submenuActivo":
                submenuActivo(request, response);
                break;
            default:
                index(request, response);
                break;
        }
    }

    private void index(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
    }

    private void dataLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer id_usuario = Integer.parseInt(request.getSession().getAttribute("id_usuario").toString());
        String sesionId = request.getSession().getAttribute("sesion_id").toString();
        String usuario = request.getSession().getAttribute("usuario").toString();
        String nombres = request.getSession().getAttribute("nombres").toString();
        String[] partes_nombre = nombres.split(" ");
        String nombreP = partes_nombre[0];
        String apellido_paterno = request.getSession().getAttribute("apellido_paterno").toString();
        String apellido_materno = request.getSession().getAttribute("apellido_materno").toString();
        String genero = request.getSession().getAttribute("genero").toString();
        Integer perfil = Integer.parseInt(request.getSession().getAttribute("perfil").toString());

        HashMap outHash = new HashMap();

        outHash.put("id_usuario", id_usuario);
        outHash.put("usuario", usuario);
        outHash.put("nombres", nombres);
        outHash.put("nombreP", nombreP);
        outHash.put("apellido_paterno", apellido_paterno);
        outHash.put("apellido_materno", apellido_materno);
        outHash.put("genero", genero);
        outHash.put("perfil", perfil);

        String queryP = " WHERE a.perf_id = " + perfil + " AND a.sub_menu_id = 0 AND a.perm_activo = true ORDER BY a.menu_id ASC ";
        List<Usuario> listPermisos = new UsuarioDao().getListaPermisos(queryP);
        outHash.put("listPermisos", listPermisos);
        String queryS = " WHERE a.sesi_id = '" + sesionId + "' ";
        Sesion sesion = new SesionDao().getDatos(queryS);
        outHash.put("menuId", sesion.getMenuId());
        outHash.put("subMenuId", sesion.getSubMenuId());

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void dataSubMenu(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String menu_id = request.getParameter("menu_id");
        String perf_id = request.getParameter("perf_id");

        HashMap outHash = new HashMap();

        String query = " WHERE a.perf_id = " + perf_id + " AND a.menu_id = " + menu_id + " AND a.sub_menu_id > 0 "
                + "ORDER BY a.sub_menu_id ASC ";
        List<Usuario> listSubMPerm = new UsuarioDao().getListaPermisos(query);
        outHash.put("listSubMPerm", listSubMPerm);

        outHash.put("menuId", menu_id);
        outHash.put("perfId", perf_id);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void dataSubMenuPerf(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String menu_id = request.getParameter("menu_id");
        String perf_id = request.getParameter("perf_id");

        HashMap outHash = new HashMap();

        String queryP = " WHERE a.perf_id = " + perf_id + " AND a.menu_id = " + menu_id + " AND a.sub_menu_id > 0 AND a.perm_activo = true "
                + "ORDER BY a.sub_menu_id ASC ";
        List<Usuario> listSubMenus = new UsuarioDao().getListaPermisos(queryP);
        outHash.put("listSubMenus", listSubMenus);

        outHash.put("menuId", menu_id);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void menuActivo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String menu_id = request.getParameter("menu_id");
        String sesion_id = request.getSession().getAttribute("sesion_id").toString();

        Sesion bean1 = new Sesion();
        Sesion bean2 = new Sesion();
        bean1.setSesiId(sesion_id);
        bean2.setSesiId(sesion_id);
        bean1.setMenuId(Integer.parseInt(menu_id));
        bean2.setSubMenuId(0);
        new SesionDao().updateMenu(bean1);
        new SesionDao().updateSubMenu(bean2);

        HashMap outHash = new HashMap();
        outHash.put("id", menu_id);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void submenuActivo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String sub_menu_id = request.getParameter("sub_menu_id");

        Sesion bean = new Sesion();
        bean.setSesiId(request.getSession().getAttribute("sesion_id").toString());
        bean.setSubMenuId(Integer.parseInt(sub_menu_id));
        new SesionDao().updateSubMenu(bean);

        HashMap outHash = new HashMap();
        outHash.put("id", sub_menu_id);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
