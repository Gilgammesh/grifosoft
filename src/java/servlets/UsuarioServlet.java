package servlets;

import beans.Sesion;
import com.google.gson.Gson;
import beans.User;
import beans.Usuario;
import com.google.gson.GsonBuilder;
import daos.SesionDao;
import daos.UsuarioDao;
import utils.Encriptar;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/Usuario"})
@MultipartConfig
public class UsuarioServlet extends HttpServlet {

    private static final long serialVersionUID = 1816755134720281712L;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        String url = request.getParameter("url") == null ? "" : request.getParameter("url");

        switch (url) {
            case "ingresar":
                ingresar(request, response);
                break;
            case "disconnect":
                logout(request, response);
                break;
            case "password":
                password(request, response);
                break;
            case "usuarios":
                list_usuarios(request, response);
                break;
            case "info_usuario":
                informacion_usuario(request, response);
                break;
            case "nuevo":
                nuevo(request, response);
                break;
            case "editar":
                editar(request, response);
                break;
            case "delete":
                delete(request, response);
                break;
            case "perfiles":
                list_perfiles(request, response);
                break;
            case "permisos":
                list_permisos(request, response);
                break;
            case "info_perfil":
                informacion_perfil(request, response);
                break;
            case "nuevo_perfil":
                nuevo_perfil(request, response);
                break;
            case "editar_perfil":
                editar_perfil(request, response);
                break;
            case "delete_perfil":
                delete_perfil(request, response);
                break;
            case "update_permisos":
                update_permisos(request, response);
                break;
            case "list_claves":
                list_claves(request, response);
                break;
            case "nueva_clave":
                nueva_clave(request, response);
                break;
            case "datos_empresa":
                datos_empresa(request, response);
                break;
            case "update_empresa":
                update_empresa(request, response);
                break;
            default:
                index(request, response);
                break;
        }
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

    private void index(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("./error.jsp").forward(request, response);
    }

    private void ingresar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String usuario = request.getParameter("usuario") == null ? "" : request.getParameter("usuario");
        String password = request.getParameter("password") == null ? "" : request.getParameter("password");

        HashMap hm = new HashMap();

        String query = " WHERE usua_usuario = '" + usuario + "' ";
        Usuario dataU = new UsuarioDao().getDatos(query);
        Integer reg = new UsuarioDao().getNroReg(query);

        if (reg == 0) {
            hm.put("success", false);
            hm.put("msg", "El usuario no existe");
        }
        if (reg == 1) {
            if (dataU.getUsuaEstado() == true) {
                try {
                    if (dataU.getUsuaClave().equals(Encriptar.md5(Encriptar.md5(Encriptar.md5(password.trim()))))) {
                        request.getSession().setAttribute("id_usuario", dataU.getUsuaId());
                        request.getSession().setAttribute("usuario", dataU.getUsuaUsuario());
                        request.getSession().setAttribute("nombres", dataU.getUsuaNombres());
                        request.getSession().setAttribute("apellido_paterno", dataU.getUsuaApellidoPaterno());
                        request.getSession().setAttribute("apellido_materno", dataU.getUsuaApellidoMaterno());
                        request.getSession().setAttribute("genero", dataU.getUsuaGenero());
                        request.getSession().setAttribute("perfil", dataU.getPerfId());
                        request.getSession().setAttribute("user", new User());
                        hm.put("success", true);
                        hm.put("msg", "./software");
                    } else {
                        hm.put("success", false);
                        hm.put("msg", "La contraseña ingresada es incorrecta");
                    }
                } catch (Exception e) {
                    hm.put("success", false);
                    hm.put("msg", "Error!! Intente nuevamente.");
                }
            } else {
                hm.put("success", false);
                hm.put("msg", "El usuario está desactivado");
            }
        }
        if (reg >= 2) {
            hm.put("success", false);
            hm.put("msg", "Existe más de una persona registrada con este usuario");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");

        request.getSession().removeAttribute("id_usuario");
        request.getSession().removeAttribute("perfil");
        request.getSession().invalidate();

        HashMap hm = new HashMap();
        hm.put("window", "./login");
        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    private void password(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");

        Integer id_usuario = Integer.parseInt(request.getSession().getAttribute("id_usuario").toString());
        String passwordA = request.getParameter("actualPass");
        String passwordN = request.getParameter("nuevoPass");
        String passwordR = request.getParameter("confirmPass");

        String query = " WHERE usua_id = " + id_usuario + " ";
        Usuario dataU = new UsuarioDao().getDatos(query);

        HashMap hm = new HashMap();

        try {

            String passEncryptedA = Encriptar.md5(Encriptar.md5(Encriptar.md5(passwordA.trim())));
            String passEncryptedN = Encriptar.md5(Encriptar.md5(Encriptar.md5(passwordN.trim())));

            if (dataU.getUsuaClave().equals(passEncryptedA)) {

                if (passwordN.equals(passwordR)) {

                    if (passwordN.length() >= 6) {

                        Usuario bean = new Usuario();
                        bean.setUsuaId(id_usuario);
                        bean.setUsuaClave(passEncryptedN);
                        new UsuarioDao().updatePass(bean);

                        request.getSession().removeAttribute("id_usuario");
                        request.getSession().removeAttribute("perfil");
                        request.getSession().invalidate();

                        hm.put("success", true);
                        hm.put("window", "./login");

                    } else {
                        hm.put("success", false);
                        hm.put("msg", "La contraseña debe tener como mínimo 06 caracteres");
                    }

                } else {
                    hm.put("success", false);
                    hm.put("msg", "La confirmación de contraseña no coincide con la contraseña nueva");
                }

            } else {
                hm.put("success", false);
                hm.put("msg", "La contraseña actual es incorrecta");
            }
        } catch (Exception ex) {
            hm.put("success", false);
            hm.put("msg", "Excepción");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    private void list_usuarios(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        List<Usuario> listUsuarios = new UsuarioDao().getListaUsuarios("WHERE a.usua_id > 0");
        HashMap outHash = new HashMap();
        outHash.put("listUsuarios", listUsuarios);

        Integer perfil = Integer.parseInt(request.getSession().getAttribute("perfil").toString());
        outHash.put("perfil", perfil);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void informacion_usuario(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String usua_id = request.getParameter("usua_id");

        String query = " WHERE usua_id = " + usua_id;
        Usuario dataU = new UsuarioDao().getDatos(query);

        HashMap outHash = new HashMap();
        outHash.put("nombres", dataU.getUsuaNombres());
        outHash.put("paterno", dataU.getUsuaApellidoPaterno());
        outHash.put("materno", dataU.getUsuaApellidoMaterno());
        outHash.put("usuario", dataU.getUsuaUsuario());
        outHash.put("password", dataU.getUsuaClave());
        outHash.put("genero", dataU.getUsuaGenero());
        outHash.put("perfil", dataU.getPerfId());
        outHash.put("estado", dataU.getUsuaEstado());
        outHash.put("usua_id", usua_id);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void nuevo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String nombres = request.getParameter("nombres") == null ? "" : request.getParameter("nombres").trim();
        String paterno = request.getParameter("paterno") == null ? "" : request.getParameter("paterno").trim();
        String materno = request.getParameter("materno") == null ? "" : request.getParameter("materno").trim();
        String usuario = request.getParameter("usuario") == null ? "" : request.getParameter("usuario").trim();
        String password = request.getParameter("password") == null ? "" : request.getParameter("password").trim();
        Boolean estado = request.getParameter("estado") != null;
        String genero = request.getParameter("genero");
        Integer perf_id = Integer.parseInt(request.getParameter("perf_id"));
        HashMap hm = new HashMap();

        try {

            if (password.length() >= 6) {
                String passEncrypted = Encriptar.md5(Encriptar.md5(Encriptar.md5(password)));

                Usuario bean = new Usuario();
                bean.setUsuaUsuario(usuario);
                bean.setUsuaClave(passEncrypted);
                bean.setUsuaNombres(nombres);
                bean.setUsuaApellidoPaterno(paterno);
                bean.setUsuaApellidoMaterno(materno);
                bean.setUsuaGenero(genero.toUpperCase());
                bean.setUsuaEstado(estado);
                bean.setPerfId(perf_id);
                new UsuarioDao().insert(bean);

                hm.put("success", true);
                hm.put("msg", "Se añadió nuevo usuario correctamente");
            } else {
                hm.put("success", false);
                hm.put("msg", "La contraseña debe tener como mínimo 06 caracteres");
            }

        } catch (Exception e) {
            hm.put("success", false);
            //hm.put("msg", "No se pudo añadir al usuario, intente nuevamente");
            hm.put("msg", e.toString());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String usua_id = request.getParameter("usua_id");
        String nombres = request.getParameter("nombres") == null ? "" : request.getParameter("nombres").trim();
        String paterno = request.getParameter("paterno") == null ? "" : request.getParameter("paterno").trim();
        String materno = request.getParameter("materno") == null ? "" : request.getParameter("materno").trim();
        String usuario = request.getParameter("usuario") == null ? "" : request.getParameter("usuario").trim();
        String password = request.getParameter("password") == null ? "" : request.getParameter("password").trim();
        String estado = request.getParameter("estado") == null ? "false" : request.getParameter("estado");
        String genero = request.getParameter("genero");
        String perf_id = request.getParameter("perf_id");
        HashMap hm = new HashMap();

        try {

            if (password.length() >= 6) {
                String passEncrypted = Encriptar.md5(Encriptar.md5(Encriptar.md5(password)));

                Usuario bean = new Usuario();
                bean.setUsuaId(Integer.parseInt(usua_id));
                bean.setUsuaUsuario(usuario);
                bean.setUsuaClave(passEncrypted);
                bean.setUsuaNombres(nombres);
                bean.setUsuaApellidoPaterno(paterno);
                bean.setUsuaApellidoMaterno(materno);
                bean.setUsuaGenero(genero);
                bean.setUsuaEstado(Boolean.valueOf(estado));
                bean.setPerfId(Integer.parseInt(perf_id));
                new UsuarioDao().update(bean);

                hm.put("success", true);
                hm.put("msg", "Se actualizaron los datos correctamente");
            } else {
                hm.put("success", false);
                hm.put("msg", "La contraseña debe tener como mínimo 06 caracteres");
            }

        } catch (Exception ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar los datos del Usuario");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer usua_id = Integer.parseInt(request.getParameter("usua_id"));

        HashMap hm = new HashMap();

        try {

            Sesion beanS = new Sesion();
            beanS.setUsuaId(usua_id);
            new SesionDao().deleteUsuarioSesion(beanS);

            Usuario beanU = new Usuario();
            beanU.setUsuaId(usua_id);
            new UsuarioDao().deleteUsuario(beanU);

            hm.put("msg", "Se elimino el usuario correctamente");

        } catch (NumberFormatException e) {
            hm.put("msg", "No se pudo eliminar el Usuario");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_perfiles(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap outHash = new HashMap();

        String queryP = " WHERE menu_id > 0 ORDER BY menu_id ASC";
        List<Usuario> listMenu = new UsuarioDao().getListMenu(queryP);
        outHash.put("listMenu", listMenu);

        String query = " WHERE perf_id > 0 ORDER BY perf_id ASC ";
        List<Usuario> listPerfiles = new UsuarioDao().getListaPerfiles(query);

        outHash.put("listPerfiles", listPerfiles);

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void list_permisos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String perf_id = request.getParameter("perf_id");
        String menu_id = request.getParameter("menu_id") == null ? "" : request.getParameter("menu_id");

        HashMap outHash = new HashMap();

        if (menu_id.equals("")) {
            String query = " WHERE a.perf_id =" + perf_id + " AND a.sub_menu_id = 0 ORDER BY a.menu_id ASC ";
            List<Usuario> list = new UsuarioDao().getListaPermisos(query);

            outHash.put("listPermisos", list);
            outHash.put("id", perf_id);

        } else {
            String query = " WHERE a.perf_id =" + perf_id + " AND a.menu_id = " + menu_id + " AND a.sub_menu_id = 0 ORDER BY a.menu_id ASC ";
            List<Usuario> list = new UsuarioDao().getListaPermisos(query);

            outHash.put("perf_id", perf_id);
            outHash.put("menu_id", menu_id);
            outHash.put("activo", list.get(0).getPermActivo());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void informacion_perfil(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String perf_id = request.getParameter("perf_id");

        String query = " WHERE perf_id = " + perf_id;
        List<Usuario> list = new UsuarioDao().getListaPerfiles(query);

        HashMap outHash = new HashMap();
        outHash.put("perf_id", perf_id);
        outHash.put("perfil", list.get(0).getPerfNombre());
        outHash.put("descripcion", list.get(0).getPerfDescripcion());

        Gson gson = new Gson();
        String arg = gson.toJson(outHash);
        response.getWriter().print(arg);
    }

    private void nuevo_perfil(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String perfil = request.getParameter("perfil") == null ? "" : request.getParameter("perfil").trim();
        String descripcion = request.getParameter("descripcion") == null ? "" : request.getParameter("descripcion").trim();
        HashMap hm = new HashMap();

        try {

            Usuario bean = new Usuario();
            bean.setPerfNombre(perfil);
            bean.setPerfDescripcion(descripcion);
            new UsuarioDao().insertPerfil(bean);

            String queryP1 = "ORDER BY perf_id DESC LIMIT 1";
            List<Usuario> listPerfiles = new UsuarioDao().getListaPerfiles(queryP1);
            Integer perf_id = listPerfiles.get(0).getPerfId();

            String queryP2 = "ORDER BY menu_id ASC";
            List<Usuario> listMenu = new UsuarioDao().getListMenu(queryP2);

            listMenu.stream().map((list) -> {
                Usuario data = new Usuario();
                data.setPerfId(perf_id);
                data.setMenuId(list.getMenuId());
                data.setSubMenuId(0);
                if (list.getMenuId() >= 0 && list.getMenuId() <= 4) {
                    data.setPermActivo(Boolean.TRUE);
                } else {
                    data.setPermActivo(Boolean.FALSE);
                }
                return data;
            }).forEachOrdered((data) -> {
                new UsuarioDao().upsertPermisos(data);
                String querySub = " WHERE menu_id = " + data.getMenuId() + " ORDER BY sub_menu_id ASC";
                List<Usuario> listSubMenu = new UsuarioDao().getListSubMenu(querySub);
                listSubMenu.stream().map((listSub) -> {
                    Usuario dataSub = new Usuario();
                    dataSub.setPerfId(perf_id);
                    dataSub.setMenuId(listSub.getMenuId());
                    dataSub.setSubMenuId(listSub.getSubMenuId());
                    if (listSub.getMenuId() >= 0 && listSub.getMenuId() <= 4) {
                        dataSub.setPermActivo(Boolean.TRUE);
                    } else {
                        dataSub.setPermActivo(Boolean.FALSE);
                    }
                    return dataSub;
                }).forEachOrdered((dataSub) -> {
                    new UsuarioDao().upsertPermisos(dataSub);
                });
            });

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo perfil de usuario");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el perfil de usuario. Intente nuevamente!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_perfil(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String perf_id = request.getParameter("perf_id");
        String perfil = request.getParameter("perfil") == null ? "" : request.getParameter("perfil").trim();
        String descripcion = request.getParameter("descripcion") == null ? "" : request.getParameter("descripcion").trim();
        HashMap hm = new HashMap();

        try {
            Usuario bean = new Usuario();
            bean.setPerfId(Integer.parseInt(perf_id));
            bean.setPerfNombre(perfil);
            bean.setPerfDescripcion(descripcion);
            new UsuarioDao().updatePerfil(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el perfil de usuario");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el perfil de usuario. Intente nuevamente!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_perfil(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer perf_id = Integer.parseInt(request.getParameter("perf_id"));

        HashMap hm = new HashMap();

        try {

            String query = " WHERE a.perf_id = " + perf_id;
            List<Usuario> listUsuario = new UsuarioDao().getListaUsuarios(query);

            if (listUsuario.isEmpty()) {
                Usuario bean = new Usuario();
                bean.setPerfId(perf_id);
                new UsuarioDao().deletePermisos(bean);
                new UsuarioDao().deletePerfil(bean);
                hm.put("msg", "Se eliminó el perfil de usuario correctamente");
            } else {
                hm.put("msg", "Hay usuarios que están utilizando este perfil!!");
            }

        } catch (NumberFormatException ex) {
            hm.put("msg", "No se pudo eliminar el Perfil de Usuario. Intente nuevamente!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_permisos(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer perf_id = Integer.parseInt(request.getParameter("perf_id"));

        HashMap hm = new HashMap();

        try {

            String query = "ORDER BY menu_id ASC";
            List<Usuario> listMenu = new UsuarioDao().getListMenu(query);

            Usuario bean = new Usuario();
            bean.setPerfId(perf_id);
            new UsuarioDao().deletePermisos(bean);

            listMenu.stream().map((list) -> {
                int i = list.getMenuId();
                Usuario data = new Usuario();
                data.setPerfId(perf_id);
                data.setMenuId(i);
                data.setSubMenuId(0);
                String activo = request.getParameter("activo_" + i) == null ? "" : request.getParameter("activo_" + i);
                if (activo.equals("")) {
                    data.setPermActivo(Boolean.FALSE);
                } else {
                    data.setPermActivo(Boolean.TRUE);
                }
                return data;
            }).forEachOrdered((data) -> {
                int i = data.getMenuId();
                new UsuarioDao().upsertPermisos(data);
                String querySub = " WHERE menu_id = " + i + " AND sub_menu_id > 0 ORDER BY sub_menu_id ASC";
                List<Usuario> listSubMenu = new UsuarioDao().getListSubMenu(querySub);
                listSubMenu.stream().map((listSub) -> {
                    int j = listSub.getSubMenuId();
                    Usuario dataSub = new Usuario();
                    dataSub.setPerfId(perf_id);
                    dataSub.setMenuId(i);
                    dataSub.setSubMenuId(j);
                    String subactivo = request.getParameter("subactivo_" + i + "_" + j) == null ? "" : request.getParameter("subactivo_" + i + "_" + j);
                    if (subactivo.equals("")) {
                        dataSub.setPermActivo(Boolean.FALSE);
                    } else {
                        dataSub.setPermActivo(Boolean.TRUE);
                    }
                    return dataSub;
                }).forEachOrdered((dataSub) -> {
                    new UsuarioDao().upsertPermisos(dataSub);
                });
            });

            hm.put("success", true);
            hm.put("msg", "Se actualizaron los permisos correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudieron actualizar los permisos. Intente nuevamente!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_claves(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " ORDER BY cltu_fecha_hora DESC ";
        List<Usuario> listClaves = new UsuarioDao().getClaveTurnos(query);

        HashMap hm = new HashMap();
        hm.put("listClaves", listClaves);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm:ss a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    private void nueva_clave(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String cltu_clave = request.getParameter("cltu_clave") == null ? "" : request.getParameter("cltu_clave").trim();

        HashMap hm = new HashMap();

        try {

            String query = " WHERE cltu_clave = '" + cltu_clave + "' ";
            List<Usuario> listClaves = new UsuarioDao().getClaveTurnos(query);

            if (listClaves.isEmpty()) {

                if (cltu_clave.length() >= 6) {

                    Usuario beanU = new Usuario();
                    beanU.setCltuActivo(false);
                    new UsuarioDao().updateClaveTurnos(beanU);

                    LocalDateTime ldt = LocalDateTime.now();

                    Usuario beanI = new Usuario();
                    beanI.setCltuClave(cltu_clave);
                    beanI.setCltuFechaHora(Timestamp.valueOf(ldt));
                    beanI.setCltuActivo(true);
                    new UsuarioDao().insertClaveTurnos(beanI);

                    hm.put("success", true);
                    hm.put("msg", "Se generó la clave correctamente");
                } else {
                    hm.put("success", false);
                    hm.put("msg", "La clave debe tener como mínimo 06 caracteres");
                }

            } else {
                if (listClaves.get(0).getCltuActivo() == true) {
                    hm.put("success", false);
                    hm.put("msg", "La clave está en uso actualmente");
                }
                if (listClaves.get(0).getCltuActivo() == false) {
                    hm.put("success", false);
                    hm.put("msg", "La clave ya ha sido usada anteriormente, use una nueva");
                }
            }

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo generar la clave, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void datos_empresa(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        List<Usuario> listEmpresa = new UsuarioDao().getDatosEmpresa();

        HashMap hm = new HashMap();
        hm.put("ruc", listEmpresa.get(0).getEmprRuc());
        hm.put("razon", listEmpresa.get(0).getEmprRazonSocial());
        hm.put("direccion", listEmpresa.get(0).getEmprDireccion());
        hm.put("telefonos", listEmpresa.get(0).getEmprTelefonos());
        hm.put("correo", listEmpresa.get(0).getEmprCorreo());
        hm.put("pagweb", listEmpresa.get(0).getEmprPaginaWeb());
        hm.put("repreNombres", listEmpresa.get(0).getEmprRepreNombres());
        hm.put("repreDNI", listEmpresa.get(0).getEmprRepreDni());
        hm.put("repreCargo", listEmpresa.get(0).getEmprRepreCargo());
        hm.put("urlLogo", listEmpresa.get(0).getEmprUrlLogo());
        hm.put("logoTipo", listEmpresa.get(0).getEmprLogoTipo());
        hm.put("sede", listEmpresa.get(0).getEmprSede());

        if (listEmpresa.get(0).getEmprUrlLogo() == null) {

        } else {
            Path path = Paths.get(listEmpresa.get(0).getEmprUrlLogo());
            hm.put("fileName", path.getFileName().toString());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    String[] typesImgs = {
        "bmp",
        "dib",
        "jpe",
        "jpg",
        "jpeg",
        "jfif",
        "tif",
        "tiff",
        "gif",
        "png"
    };

    private void update_empresa(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String ruc = request.getParameter("ruc") == null ? "" : request.getParameter("ruc").trim();
        String razon = request.getParameter("razon") == null ? "" : request.getParameter("razon").trim();
        String direccion = request.getParameter("direccion") == null ? "" : request.getParameter("direccion").trim();
        String telefonos = request.getParameter("telefonos") == null ? "" : request.getParameter("telefonos").trim();
        String correo = request.getParameter("correo") == null ? "" : request.getParameter("correo").trim();
        String pagweb = request.getParameter("pagweb") == null ? "" : request.getParameter("pagweb").trim();
        String representante = request.getParameter("representante") == null ? "" : request.getParameter("representante").trim();
        String dni = request.getParameter("dni") == null ? "" : request.getParameter("dni").trim();
        String cargo = request.getParameter("cargo") == null ? "" : request.getParameter("cargo").trim();
        String sede = request.getParameter("sede") == null ? "" : request.getParameter("sede").trim();
        Part filePart = request.getPart("logo");

               HashMap hm = new HashMap();

        try {

            if (ruc.length() >= 11) {

                if (dni.equals("") || dni.length() >= 8) {

                    Usuario bean = new Usuario();
                    bean.setEmprId(1);
                    bean.setEmprRuc(ruc);
                    bean.setEmprRazonSocial(razon);
                    bean.setEmprDireccion(direccion);
                    bean.setEmprTelefonos(telefonos);
                    bean.setEmprCorreo(correo);
                    bean.setEmprPaginaWeb(pagweb);
                    bean.setEmprRepreNombres(representante);
                    bean.setEmprRepreDni(dni);
                    bean.setEmprRepreCargo(cargo);
                    bean.setEmprSede(sede);
                    if (filePart.getSubmittedFileName().equals("") && filePart.getContentType().equals("application/octet-stream")) {

                        List<Usuario> listEmpresa = new UsuarioDao().getDatosEmpresa();

                        if (listEmpresa.get(0).getEmprUrlLogo() == null) {
                            bean.setEmprUrlLogo(null);
                            bean.setEmprLogoTipo(null);
                            new UsuarioDao().updateDatosEmpresa(bean);
                        } else {
                            Integer conteo = Integer.parseInt(request.getParameter("conteo"));
                            if (conteo > 0) {
                                new UsuarioDao().updateDatosEmpresaN(bean);
                            } else {
                                bean.setEmprUrlLogo(null);
                                bean.setEmprLogoTipo(null);
                                new UsuarioDao().updateDatosEmpresa(bean);
                            }
                        }

                    } else {
                        List<Usuario> listSoft = new UsuarioDao().getDatosSoftware();
                        String rutaSoft = listSoft.get(0).getSoftRuta();
                        String fileName = filePart.getSubmittedFileName();
                        String fileType = filePart.getContentType();
                        String[] fileNamePart = fileName.split("\\.");
                        int size = fileNamePart.length;
                        InputStream fileContenido = filePart.getInputStream();
                        String fileNameDestino = "logo." + fileNamePart[size - 1];
                        Path carpeta = Paths.get(rutaSoft + "\\Logos");
                        if (Files.notExists(carpeta)) {
                            Files.createDirectories(carpeta);
                        } else {
                            for (String typesImg : typesImgs) {
                                Path ruta = Paths.get(rutaSoft + "\\Logos\\logo." + typesImg);
                                Files.deleteIfExists(ruta);
                            }
                        }
                        bean.setEmprUrlLogo(rutaSoft + "\\Logos\\" + fileNameDestino);
                        bean.setEmprLogoTipo(fileType);
                        new UsuarioDao().updateDatosEmpresa(bean);

                        Path rutaDestino = Paths.get(rutaSoft + "\\Logos\\" + fileNameDestino);
                        Files.copy(fileContenido, rutaDestino, StandardCopyOption.REPLACE_EXISTING);
                    }

                    hm.put("success", true);
                    hm.put("msg", "Se actualizaron los datos correctamente!!!");

                } else {
                    hm.put("success", false);
                    hm.put("msg", "El DNI debe tener 08 dígitos");
                }

            } else {
                hm.put("success", false);
                hm.put("msg", "El RUC debe tener 11 dígitos");
            }
        } catch (IOException ex) {
            System.out.println(ex);
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

}
