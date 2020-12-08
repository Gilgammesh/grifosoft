package servlets;

import beans.TablasMaestras;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import daos.TablasMaestrasDao;
import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
@WebServlet(name = "TablasMaestrasServlet", urlPatterns = {"/TablasMaestras"})
public class TablasMaestrasServlet extends HttpServlet {

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
            case "lista_productos":
                lista_productos(request, response);
                break;
            case "lista_productos_combustible":
                lista_productos_combustible(request, response);
                break;
            case "lista_productos_sunat":
                lista_productos_sunat(request, response);
                break;
            case "nuevo_producto":
                nuevo_producto(request, response);
                break;
            case "editar_producto":
                editar_producto(request, response);
                break;
            case "delete_producto":
                delete_producto(request, response);
                break;
            case "info_producto":
                info_producto(request, response);
                break;
            case "lista_categorias":
                lista_categorias(request, response);
                break;
            case "nueva_categoria":
                nueva_categoria(request, response);
                break;
            case "editar_categoria":
                editar_categoria(request, response);
                break;
            case "delete_categoria":
                delete_categoria(request, response);
                break;
            case "info_categoria":
                info_categoria(request, response);
                break;
            case "lista_unidades":
                lista_unidades(request, response);
                break;
            case "lista_unidades_sunat":
                lista_unidades_sunat(request, response);
                break;
            case "nueva_unidad":
                nueva_unidad(request, response);
                break;
            case "editar_unidad":
                editar_unidad(request, response);
                break;
            case "delete_unidad":
                delete_unidad(request, response);
                break;
            case "info_unidad":
                info_unidad(request, response);
                break;
            case "lista_tipos_emision":
                lista_tipos_emision(request, response);
                break;
            case "nuevo_tipo_emision":
                nuevo_tipo_emision(request, response);
                break;
            case "editar_tipo_emision":
                editar_tipo_emision(request, response);
                break;
            case "delete_tipo_emision":
                delete_tipo_emision(request, response);
                break;
            case "info_tipo_emision":
                info_tipo_emision(request, response);
                break;
            case "lista_tipos_venta":
                lista_tipos_venta(request, response);
                break;
            case "nuevo_tipo_venta":
                nuevo_tipo_venta(request, response);
                break;
            case "editar_tipo_venta":
                editar_tipo_venta(request, response);
                break;
            case "delete_tipo_venta":
                delete_tipo_venta(request, response);
                break;
            case "info_tipo_venta":
                info_tipo_venta(request, response);
                break;
            case "lista_tipos_pago":
                lista_tipos_pago(request, response);
                break;
            case "nuevo_tipo_pago":
                nuevo_tipo_pago(request, response);
                break;
            case "editar_tipo_pago":
                editar_tipo_pago(request, response);
                break;
            case "delete_tipo_pago":
                delete_tipo_pago(request, response);
                break;
            case "info_tipo_pago":
                info_tipo_pago(request, response);
                break;
            case "lista_tipos_gasto":
                lista_tipos_gasto(request, response);
                break;
            case "nuevo_tipo_gasto":
                nuevo_tipo_gasto(request, response);
                break;
            case "editar_tipo_gasto":
                editar_tipo_gasto(request, response);
                break;
            case "delete_tipo_gasto":
                delete_tipo_gasto(request, response);
                break;
            case "info_tipo_gasto":
                info_tipo_gasto(request, response);
                break;
            case "lista_tipos_ingreso":
                lista_tipos_ingreso(request, response);
                break;
            case "nuevo_tipo_ingreso":
                nuevo_tipo_ingreso(request, response);
                break;
            case "editar_tipo_ingreso":
                editar_tipo_ingreso(request, response);
                break;
            case "delete_tipo_ingreso":
                delete_tipo_ingreso(request, response);
                break;
            case "info_tipo_ingreso":
                info_tipo_ingreso(request, response);
                break;
            case "lista_bancos":
                lista_bancos(request, response);
                break;
            case "nuevo_banco":
                nuevo_banco(request, response);
                break;
            case "editar_banco":
                editar_banco(request, response);
                break;
            case "delete_banco":
                delete_banco(request, response);
                break;
            case "info_banco":
                info_banco(request, response);
                break;
            case "lista_cuentas_banco":
                lista_cuentas_banco(request, response);
                break;
            case "nueva_cuenta_banco":
                nueva_cuenta_banco(request, response);
                break;
            case "editar_cuenta_banco":
                editar_cuenta_banco(request, response);
                break;
            case "delete_cuenta_banco":
                delete_cuenta_banco(request, response);
                break;
            case "info_cuenta_banco":
                info_cuenta_banco(request, response);
                break;
            case "lista_trabajadores":
                lista_trabajadores(request, response);
                break;
            case "nuevo_trabajador":
                nuevo_trabajador(request, response);
                break;
            case "editar_trabajador":
                editar_trabajador(request, response);
                break;
            case "delete_trabajador":
                delete_trabajador(request, response);
                break;
            case "info_trabajador":
                info_trabajador(request, response);
                break;
            case "lista_turnos":
                lista_turnos(request, response);
                break;
            case "nuevo_turno":
                nuevo_turno(request, response);
                break;
            case "editar_turno":
                editar_turno(request, response);
                break;
            case "delete_turno":
                delete_turno(request, response);
                break;
            case "info_turno":
                info_turno(request, response);
                break;
            case "lista_tipos_documento":
                lista_tipos_documento(request, response);
                break;
            case "info_tipo_documento":
                info_tipo_documento(request, response);
                break;
            case "lista_servicios":
                lista_servicios(request, response);
                break;
            case "nuevo_servicio":
                nuevo_servicio(request, response);
                break;
            case "editar_servicio":
                editar_servicio(request, response);
                break;
            case "delete_servicio":
                delete_servicio(request, response);
                break;
            case "info_servicio":
                info_servicio(request, response);
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

    private void lista_productos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
        List<TablasMaestras> listProductos = new TablasMaestrasDao().getProductos(query);
        hm.put("listProductos", listProductos);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_productos_combustible(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE a.prod_estado = 'A' AND a.prod_grifo = true ORDER BY a.prod_nombre ASC ";
        List<TablasMaestras> listProductos = new TablasMaestrasDao().getProductos(query);
        hm.put("listProductos", listProductos);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_productos_sunat(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " ORDER BY capr_id ASC ";
        List<TablasMaestras> listCatalogo = new TablasMaestrasDao().getCatalogoProductosSunat(query);
        hm.put("listCatalogo", listCatalogo);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_producto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String nombre = request.getParameter("prod_nombre") == null ? "" : request.getParameter("prod_nombre").trim();
        String descripcion = request.getParameter("prod_descripcion") == null ? "" : request.getParameter("prod_descripcion").trim();
        Integer prca_id = Integer.parseInt(request.getParameter("prca_id"));
        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));
        String codigo_sunat = request.getParameter("prod_codigo_sunat") == null ? "" : request.getParameter("prod_codigo_sunat").trim();
        Boolean grifo = request.getParameter("prod_grifo") != null;

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setProdNombre(nombre);
            bean.setProdDescripcion(descripcion);
            bean.setPrcaId(prca_id);
            bean.setUnmeId(unme_id);
            bean.setProdEstado("A");
            bean.setProdCodigoSunat(codigo_sunat);
            bean.setProdGrifo(grifo);
            new TablasMaestrasDao().insertProductos(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_producto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
        String nombre = request.getParameter("prod_nombre") == null ? "" : request.getParameter("prod_nombre").trim();
        String descripcion = request.getParameter("prod_descripcion") == null ? "" : request.getParameter("prod_descripcion").trim();
        Integer prca_id = Integer.parseInt(request.getParameter("prca_id"));
        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));
        String codigo_sunat = request.getParameter("prod_codigo_sunat") == null ? "" : request.getParameter("prod_codigo_sunat").trim();
        Boolean grifo = request.getParameter("prod_grifo") != null;

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setProdId(prod_id);
            bean.setProdNombre(nombre);
            bean.setProdDescripcion(descripcion);
            bean.setPrcaId(prca_id);
            bean.setUnmeId(unme_id);
            bean.setProdCodigoSunat(codigo_sunat);
            bean.setProdGrifo(grifo);
            new TablasMaestrasDao().updateProductos(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_producto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setProdId(prod_id);
            bean.setProdEstado("I");
            new TablasMaestrasDao().deleteProductos(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_producto(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.prod_id = " + prod_id + " AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
        List<TablasMaestras> listProducto = new TablasMaestrasDao().getProductos(query);

        hm.put("nombre", listProducto.get(0).getProdNombre());
        hm.put("descripcion", listProducto.get(0).getProdDescripcion());
        hm.put("categoria", listProducto.get(0).getPrcaId());
        hm.put("unidad", listProducto.get(0).getUnmeId());
        hm.put("caprId", listProducto.get(0).getCaprId());
        hm.put("caprNombre", listProducto.get(0).getCaprNombre());
        hm.put("esGrifo", listProducto.get(0).getProdGrifo());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_categorias(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE prca_estado = 'A' ORDER BY prca_nombre ASC ";
        List<TablasMaestras> listCategorias = new TablasMaestrasDao().getProductosCategorias(query);
        hm.put("listCategorias", listCategorias);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nueva_categoria(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String prca_nombre = request.getParameter("prca_nombre") == null ? "" : request.getParameter("prca_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setPrcaNombre(prca_nombre);
            bean.setPrcaEstado("A");
            new TablasMaestrasDao().insertProductosCategorias(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nueva categoría de producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir la categoría de producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_categoria(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prca_id = Integer.parseInt(request.getParameter("prca_id"));
        String prca_nombre = request.getParameter("prca_nombre") == null ? "" : request.getParameter("prca_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setPrcaId(prca_id);
            bean.setPrcaNombre(prca_nombre);
            new TablasMaestrasDao().updateProductosCategorias(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó la categoría de producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar la categoría de producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_categoria(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prca_id = Integer.parseInt(request.getParameter("prca_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setPrcaId(prca_id);
            bean.setPrcaEstado("I");
            new TablasMaestrasDao().deleteProductosCategorias(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó categoría de producto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar la categoría de producto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_categoria(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prca_id = Integer.parseInt(request.getParameter("prca_id"));

        HashMap hm = new HashMap();
        String query = " WHERE prca_id = " + prca_id + " AND prca_estado = 'A' ORDER BY prca_nombre ASC ";
        List<TablasMaestras> listCategoria = new TablasMaestrasDao().getProductosCategorias(query);
        hm.put("nombre", listCategoria.get(0).getPrcaNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_unidades(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE a.unme_estado = 'A' ORDER BY a.unme_nombre ASC ";
        List<TablasMaestras> listUnidades = new TablasMaestrasDao().getUnidadesMedidas(query);
        hm.put("listUnidades", listUnidades);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_unidades_sunat(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " ORDER BY unme_id ASC ";
        List<TablasMaestras> listUnidades = new TablasMaestrasDao().getUnidadesMedidaSunat(query);
        hm.put("listUnidades", listUnidades);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nueva_unidad(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String unme_nombre = request.getParameter("unme_nombre") == null ? "" : request.getParameter("unme_nombre").trim();
        String unme_simbolo = request.getParameter("unme_simbolo") == null ? "" : request.getParameter("unme_simbolo").trim();
        String unme_ose = request.getParameter("unme_ose") == null ? "" : request.getParameter("unme_ose").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setUnmeNombre(unme_nombre);
            bean.setUnmeSimbolo(unme_simbolo);
            bean.setUnmeEstado("A");
            bean.setUnmeOse(unme_ose);
            new TablasMaestrasDao().insertUnidadesMedida(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nueva unidad de medida correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir la unidad de medida, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_unidad(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));
        String unme_nombre = request.getParameter("unme_nombre") == null ? "" : request.getParameter("unme_nombre").trim();
        String unme_simbolo = request.getParameter("unme_simbolo") == null ? "" : request.getParameter("unme_simbolo").trim();
        String unme_ose = request.getParameter("unme_ose") == null ? "" : request.getParameter("unme_ose").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setUnmeId(unme_id);
            bean.setUnmeNombre(unme_nombre);
            bean.setUnmeSimbolo(unme_simbolo);
            bean.setUnmeOse(unme_ose);
            new TablasMaestrasDao().updateUnidadesMedida(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó la unidad de medida correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar la unidad de medida, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_unidad(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setUnmeId(unme_id);
            bean.setUnmeEstado("I");
            new TablasMaestrasDao().deleteUnidadesMedida(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó unidad de medida correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar la unidad de medida, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_unidad(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.unme_id = " + unme_id;
        List<TablasMaestras> listUnidad = new TablasMaestrasDao().getUnidadesMedidas(query);
        hm.put("nombre", listUnidad.get(0).getUnmeNombre());
        hm.put("simbolo", listUnidad.get(0).getUnmeSimbolo());
        hm.put("idSunat", listUnidad.get(0).getUnmeIdSunat());
        hm.put("nombreSunat", listUnidad.get(0).getUnmeNombreSunat());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_emision(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tiem_estado = 'A' ORDER BY tiem_nombre ASC ";
        List<TablasMaestras> listTiposEmision = new TablasMaestrasDao().getTiposEmision(query);
        hm.put("listTiposEmision", listTiposEmision);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_tipo_emision(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tiem_nombre = request.getParameter("tiem_nombre") == null ? "" : request.getParameter("tiem_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiemNombre(tiem_nombre);
            bean.setTiemEstado("A");
            new TablasMaestrasDao().insertTiposEmision(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo tipo de emisión correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el tipo de emisión, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_tipo_emision(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiem_id = Integer.parseInt(request.getParameter("tiem_id"));
        String tiem_nombre = request.getParameter("tiem_nombre") == null ? "" : request.getParameter("tiem_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiemId(tiem_id);
            bean.setTiemNombre(tiem_nombre);
            new TablasMaestrasDao().updateTiposEmision(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el tipo de emisión correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el tipo de emisión, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_tipo_emision(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiem_id = Integer.parseInt(request.getParameter("tiem_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiemId(tiem_id);
            bean.setTiemEstado("I");
            new TablasMaestrasDao().deleteTiposEmision(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el tipo de emisión correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el tipo de emisión, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_emision(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiem_id = Integer.parseInt(request.getParameter("tiem_id"));

        HashMap hm = new HashMap();

        String query = " WHERE tiem_id = " + tiem_id + " AND tiem_estado = 'A' ORDER BY tiem_nombre ASC ";
        List<TablasMaestras> listTiposEmision = new TablasMaestrasDao().getTiposEmision(query);
        hm.put("nombre", listTiposEmision.get(0).getTiemNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_venta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tive_estado = 'A' ORDER BY tive_nombre ASC ";
        List<TablasMaestras> listTiposVenta = new TablasMaestrasDao().getTiposVenta(query);
        hm.put("listTiposVenta", listTiposVenta);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_tipo_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tive_nombre = request.getParameter("tive_nombre") == null ? "" : request.getParameter("tive_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiveNombre(tive_nombre);
            bean.setTiveEstado("A");
            new TablasMaestrasDao().insertTiposVenta(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo tipo de venta correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el tipo de venta, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_tipo_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));
        String tive_nombre = request.getParameter("tive_nombre") == null ? "" : request.getParameter("tive_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiveId(tive_id);
            bean.setTiveNombre(tive_nombre);
            new TablasMaestrasDao().updateTiposVenta(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el tipo de venta correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el tipo de venta, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_tipo_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiveId(tive_id);
            bean.setTiveEstado("I");
            new TablasMaestrasDao().deleteTiposVenta(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el tipo de venta correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el tipo de venta, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_venta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));

        HashMap hm = new HashMap();

        String query = " WHERE tive_id = " + tive_id + " AND tive_estado = 'A' ORDER BY tive_nombre ASC ";
        List<TablasMaestras> listTiposVenta = new TablasMaestrasDao().getTiposVenta(query);
        hm.put("nombre", listTiposVenta.get(0).getTiveNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_pago(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tipa_estado = 'A' ORDER BY tipa_nombre ASC ";
        List<TablasMaestras> listTiposPago = new TablasMaestrasDao().getTiposPago(query);
        hm.put("listTiposPago", listTiposPago);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_tipo_pago(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tipa_nombre = request.getParameter("tipa_nombre") == null ? "" : request.getParameter("tipa_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTipaNombre(tipa_nombre);
            bean.setTipaEstado("A");
            new TablasMaestrasDao().insertTiposPago(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo tipo de pago correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el tipo de pago, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_tipo_pago(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tipa_id = Integer.parseInt(request.getParameter("tipa_id"));
        String tipa_nombre = request.getParameter("tipa_nombre") == null ? "" : request.getParameter("tipa_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTipaId(tipa_id);
            bean.setTipaNombre(tipa_nombre);
            new TablasMaestrasDao().updateTiposPago(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el tipo de pago correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el tipo de pago, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_tipo_pago(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tipa_id = Integer.parseInt(request.getParameter("tipa_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTipaId(tipa_id);
            bean.setTipaEstado("I");
            new TablasMaestrasDao().deleteTiposPago(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el tipo de pago correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el tipo de pago, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_pago(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tipa_id = Integer.parseInt(request.getParameter("tipa_id"));

        HashMap hm = new HashMap();

        String query = " WHERE tipa_id = " + tipa_id + " AND tipa_estado = 'A' ORDER BY tipa_nombre ASC ";
        List<TablasMaestras> listTiposPago = new TablasMaestrasDao().getTiposPago(query);
        hm.put("nombre", listTiposPago.get(0).getTipaNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_gasto(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tiga_estado = 'A' ORDER BY tiga_nombre ASC ";
        List<TablasMaestras> listTiposGasto = new TablasMaestrasDao().getTiposGasto(query);
        hm.put("listTiposGasto", listTiposGasto);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_tipo_gasto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tiga_nombre = request.getParameter("tiga_nombre") == null ? "" : request.getParameter("tiga_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTigaNombre(tiga_nombre);
            bean.setTigaEstado("A");
            bean.setTigaCombustible(false);
            new TablasMaestrasDao().insertTiposGasto(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo tipo de gasto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el tipo de gasto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_tipo_gasto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));
        String tiga_nombre = request.getParameter("tiga_nombre") == null ? "" : request.getParameter("tiga_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTigaId(tiga_id);
            bean.setTigaNombre(tiga_nombre);
            new TablasMaestrasDao().updateTiposGasto(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el tipo de gasto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el tipo de gasto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_tipo_gasto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTigaId(tiga_id);
            bean.setTigaEstado("I");
            new TablasMaestrasDao().deleteTiposGasto(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el tipo de gasto correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el tipo de gasto, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_gasto(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));

        HashMap hm = new HashMap();

        String query = " WHERE tiga_id = " + tiga_id + " AND tiga_estado = 'A' ORDER BY tiga_nombre ASC ";
        List<TablasMaestras> listTiposGasto = new TablasMaestrasDao().getTiposGasto(query);
        hm.put("nombre", listTiposGasto.get(0).getTigaNombre());
        hm.put("esCombustible", listTiposGasto.get(0).getTigaCombustible());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_ingreso(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tiin_estado = 'A' ORDER BY tiin_nombre ASC ";
        List<TablasMaestras> listTiposIngreso = new TablasMaestrasDao().getTiposIngreso(query);
        hm.put("listTiposIngreso", listTiposIngreso);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_tipo_ingreso(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tiin_nombre = request.getParameter("tiin_nombre") == null ? "" : request.getParameter("tiin_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiinNombre(tiin_nombre);
            bean.setTiinEstado("A");
            new TablasMaestrasDao().insertTiposIngreso(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo tipo de ingreso correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el tipo de ingreso, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_tipo_ingreso(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiin_id = Integer.parseInt(request.getParameter("tiin_id"));
        String tiin_nombre = request.getParameter("tiin_nombre") == null ? "" : request.getParameter("tiin_nombre").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiinId(tiin_id);
            bean.setTiinNombre(tiin_nombre);
            new TablasMaestrasDao().updateTiposIngreso(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el tipo de ingreso correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el tipo de ingreso, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_tipo_ingreso(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiin_id = Integer.parseInt(request.getParameter("tiin_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTiinId(tiin_id);
            bean.setTiinEstado("I");
            new TablasMaestrasDao().deleteTiposIngreso(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el tipo de ingreso correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el tipo de ingreso, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_ingreso(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiin_id = Integer.parseInt(request.getParameter("tiin_id"));

        HashMap hm = new HashMap();

        String query = " WHERE tiin_id = " + tiin_id + " AND tiin_estado = 'A' ORDER BY tiin_nombre ASC ";
        List<TablasMaestras> listTiposIngreso = new TablasMaestrasDao().getTiposIngreso(query);
        hm.put("nombre", listTiposIngreso.get(0).getTiinNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_bancos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE banc_estado = 'A' ORDER BY banc_nombre ASC ";
        List<TablasMaestras> listBancos = new TablasMaestrasDao().getBancos(query);
        hm.put("listBancos", listBancos);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String banc_nombre = request.getParameter("banc_nombre") == null ? "" : request.getParameter("banc_nombre").trim();
        String banc_sigla = request.getParameter("banc_sigla") == null ? "" : request.getParameter("banc_sigla").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setBancSigla(banc_sigla);
            bean.setBancNombre(banc_nombre);
            bean.setBancEstado("A");
            new TablasMaestrasDao().insertBancos(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo banco correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el banco, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer banc_id = Integer.parseInt(request.getParameter("banc_id"));
        String banc_nombre = request.getParameter("banc_nombre") == null ? "" : request.getParameter("banc_nombre").trim();
        String banc_sigla = request.getParameter("banc_sigla") == null ? "" : request.getParameter("banc_sigla").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setBancId(banc_id);
            bean.setBancSigla(banc_sigla);
            bean.setBancNombre(banc_nombre);
            new TablasMaestrasDao().updateBancos(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el banco correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el banco, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer banc_id = Integer.parseInt(request.getParameter("banc_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setBancId(banc_id);
            bean.setBancEstado("I");
            new TablasMaestrasDao().deleteBancos(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el banco correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el banco, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_banco(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer banc_id = Integer.parseInt(request.getParameter("banc_id"));

        HashMap hm = new HashMap();

        String query = " WHERE banc_id = " + banc_id + " AND banc_estado = 'A' ORDER BY banc_nombre ASC ";
        List<TablasMaestras> listBancos = new TablasMaestrasDao().getBancos(query);
        hm.put("nombre", listBancos.get(0).getBancNombre());
        hm.put("sigla", listBancos.get(0).getBancSigla());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_cuentas_banco(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE a.cuba_estado = 'A' ORDER BY a.cuba_cuenta ASC ";
        List<TablasMaestras> listCuentasBanco = new TablasMaestrasDao().getCuentasBanco(query);
        hm.put("listCuentasBanco", listCuentasBanco);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nueva_cuenta_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer banc_id = Integer.parseInt(request.getParameter("banc_id"));
        String cuba_cuenta = request.getParameter("cuba_cuenta") == null ? "" : request.getParameter("cuba_cuenta").trim();
        String cuba_descripcion = request.getParameter("cuba_descripcion") == null ? "" : request.getParameter("cuba_descripcion").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setCubaCuenta(cuba_cuenta);
            bean.setCubaDescripcion(cuba_descripcion);
            bean.setBancId(banc_id);
            bean.setCubaEstado("A");
            new TablasMaestrasDao().insertCuentasBanco(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nueva cuenta bancaria correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir la cuenta bancaria, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_cuenta_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer cuba_id = Integer.parseInt(request.getParameter("cuba_id"));
        Integer banc_id = Integer.parseInt(request.getParameter("banc_id"));
        String cuba_cuenta = request.getParameter("cuba_cuenta") == null ? "" : request.getParameter("cuba_cuenta").trim();
        String cuba_descripcion = request.getParameter("cuba_descripcion") == null ? "" : request.getParameter("cuba_descripcion").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setCubaId(cuba_id);
            bean.setCubaCuenta(cuba_cuenta);
            bean.setCubaDescripcion(cuba_descripcion);
            bean.setBancId(banc_id);
            new TablasMaestrasDao().updateCuentasBanco(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó la cuenta bancaria correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar la cuenta bancaria, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_cuenta_banco(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer cuba_id = Integer.parseInt(request.getParameter("cuba_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setCubaId(cuba_id);
            bean.setCubaEstado("I");
            new TablasMaestrasDao().deleteCuentasBanco(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó la cuenta bancaria correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar la cuenta bancaria, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_cuenta_banco(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer cuba_id = Integer.parseInt(request.getParameter("cuba_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.cuba_id = " + cuba_id + " AND a.cuba_estado = 'A' ORDER BY a.cuba_cuenta ASC ";
        List<TablasMaestras> listCuentasBanco = new TablasMaestrasDao().getCuentasBanco(query);

        hm.put("cuenta", listCuentasBanco.get(0).getCubaCuenta());
        hm.put("descripcion", listCuentasBanco.get(0).getCubaDescripcion());
        hm.put("banco", listCuentasBanco.get(0).getBancId());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_trabajadores(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE trab_estado = true ORDER BY trab_nombres, trab_apellido_paterno, trab_apellido_materno ASC ";
        List<TablasMaestras> listTrabajadores = new TablasMaestrasDao().getTrabajadores(query);
        hm.put("listTrabajadores", listTrabajadores);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_trabajador(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String trab_dni = request.getParameter("trab_dni") == null ? "" : request.getParameter("trab_dni").trim();
        String trab_nombres = request.getParameter("trab_nombres") == null ? "" : request.getParameter("trab_nombres").trim();
        String trab_apellido_paterno = request.getParameter("trab_apellido_paterno") == null ? "" : request.getParameter("trab_apellido_paterno").trim();
        String trab_apellido_materno = request.getParameter("trab_apellido_materno") == null ? "" : request.getParameter("trab_apellido_materno").trim();
        String trab_celular = request.getParameter("trab_celular") == null ? "" : request.getParameter("trab_celular").trim();
        String trab_direccion = request.getParameter("trab_direccion") == null ? "" : request.getParameter("trab_direccion").trim();

        HashMap hm = new HashMap();

        try {

            if (trab_dni.length() >= 8) {

                if (trab_celular.length() > 0 && trab_celular.length() < 9) {
                    hm.put("success", false);
                    hm.put("msg", "El número de celular debe tener 09 digitos");
                } else {
                    TablasMaestras bean = new TablasMaestras();
                    bean.setTrabDni(trab_dni);
                    bean.setTrabNombres(trab_nombres);
                    bean.setTrabApellidoPaterno(trab_apellido_paterno);
                    bean.setTrabApellidoMaterno(trab_apellido_materno);
                    bean.setTrabCelular(trab_celular);
                    bean.setTrabDireccion(trab_direccion);
                    bean.setTrabEstado(true);
                    new TablasMaestrasDao().insertTrabajadores(bean);

                    hm.put("success", true);
                    hm.put("msg", "Se añadió nuevo trabajador correctamente");
                }

            } else {
                hm.put("success", false);
                hm.put("msg", "El DNI debe tener 08 digitos");
            }

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el trabajador, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_trabajador(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer trab_id = Integer.parseInt(request.getParameter("trab_id"));
        String trab_dni = request.getParameter("trab_dni") == null ? "" : request.getParameter("trab_dni").trim();
        String trab_nombres = request.getParameter("trab_nombres") == null ? "" : request.getParameter("trab_nombres").trim();
        String trab_apellido_paterno = request.getParameter("trab_apellido_paterno") == null ? "" : request.getParameter("trab_apellido_paterno").trim();
        String trab_apellido_materno = request.getParameter("trab_apellido_materno") == null ? "" : request.getParameter("trab_apellido_materno").trim();
        String trab_celular = request.getParameter("trab_celular") == null ? "" : request.getParameter("trab_celular").trim();
        String trab_direccion = request.getParameter("trab_direccion") == null ? "" : request.getParameter("trab_direccion").trim();

        HashMap hm = new HashMap();

        try {

            if (trab_dni.length() >= 8) {

                if (trab_celular.length() > 0 && trab_celular.length() < 9) {
                    hm.put("success", false);
                    hm.put("msg", "El número de celular debe tener 09 digitos");
                } else {
                    TablasMaestras bean = new TablasMaestras();
                    bean.setTrabId(trab_id);
                    bean.setTrabDni(trab_dni);
                    bean.setTrabNombres(trab_nombres);
                    bean.setTrabApellidoPaterno(trab_apellido_paterno);
                    bean.setTrabApellidoMaterno(trab_apellido_materno);
                    bean.setTrabCelular(trab_celular);
                    bean.setTrabDireccion(trab_direccion);
                    new TablasMaestrasDao().updateTrabajadores(bean);

                    hm.put("success", true);
                    hm.put("msg", "Se actualizó el trabajador correctamente");
                }

            } else {
                hm.put("success", false);
                hm.put("msg", "El DNI debe tener 08 digitos");
            }

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el trabajador, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_trabajador(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer trab_id = Integer.parseInt(request.getParameter("trab_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTrabId(trab_id);
            bean.setTrabEstado(false);
            new TablasMaestrasDao().deleteTrabajadores(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el trabajador correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el trabajador, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_trabajador(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer trab_id = Integer.parseInt(request.getParameter("trab_id"));

        HashMap hm = new HashMap();

        String query = " WHERE trab_id = " + trab_id + " AND trab_estado = true ";
        List<TablasMaestras> listTrabajador = new TablasMaestrasDao().getTrabajadores(query);
        hm.put("dni", listTrabajador.get(0).getTrabDni());
        hm.put("nombres", listTrabajador.get(0).getTrabNombres());
        hm.put("paterno", listTrabajador.get(0).getTrabApellidoPaterno());
        hm.put("materno", listTrabajador.get(0).getTrabApellidoMaterno());
        hm.put("celular", listTrabajador.get(0).getTrabCelular());
        hm.put("direccion", listTrabajador.get(0).getTrabDireccion());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_turnos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE turn_estado = 'A' ORDER BY turn_nombre ASC ";
        List<TablasMaestras> listTurnos = new TablasMaestrasDao().getTurnos(query);
        hm.put("listTurnos", listTurnos);

        Gson gson = new GsonBuilder().setDateFormat("hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String turn_nombre = request.getParameter("turn_nombre") == null ? "" : request.getParameter("turn_nombre").trim();
        String turn_descripcion = request.getParameter("turn_descripcion") == null ? "" : request.getParameter("turn_descripcion").trim();
        String turn_inicio = request.getParameter("turn_inicio") == null ? "" : request.getParameter("turn_inicio");
        String turn_fin = request.getParameter("turn_fin") == null ? "" : request.getParameter("turn_fin");

        HashMap hm = new HashMap();

        try {

            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a");
            Time time_inicio = new Time(sdf.parse(turn_inicio).getTime());
            Time time_fin = new Time(sdf.parse(turn_fin).getTime());

            TablasMaestras bean = new TablasMaestras();
            bean.setTurnNombre(turn_nombre);
            bean.setTurnDescripcion(turn_descripcion);
            bean.setTurnInicio(time_inicio);
            bean.setTurnFin(time_fin);
            bean.setTurnEstado("A");
            new TablasMaestrasDao().insertTurnos(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo turno correctamente");

        } catch (ParseException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el turno, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));
        String turn_nombre = request.getParameter("turn_nombre") == null ? "" : request.getParameter("turn_nombre").trim();
        String turn_descripcion = request.getParameter("turn_descripcion") == null ? "" : request.getParameter("turn_descripcion").trim();
        String turn_inicio = request.getParameter("turn_inicio") == null ? "" : request.getParameter("turn_inicio");
        String turn_fin = request.getParameter("turn_fin") == null ? "" : request.getParameter("turn_fin");
        HashMap hm = new HashMap();

        try {

            SimpleDateFormat sdf1 = new SimpleDateFormat("hh:mm a");
            SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss a");
            Time time_inicio = null;
            Time time_fin = null;
            int i = turn_inicio.split(":").length;
            int f = turn_fin.split(":").length;
            if (i == 2) {
                time_inicio = new Time(sdf1.parse(turn_inicio).getTime());
            }
            if (i == 3) {
                time_inicio = new Time(sdf2.parse(turn_inicio).getTime());
            }
            if (f == 2) {
                time_fin = new Time(sdf1.parse(turn_fin).getTime());
            }
            if (f == 3) {
                time_fin = new Time(sdf2.parse(turn_fin).getTime());
            }

            TablasMaestras bean = new TablasMaestras();
            bean.setTurnId(turn_id);
            bean.setTurnNombre(turn_nombre);
            bean.setTurnDescripcion(turn_descripcion);
            bean.setTurnInicio(time_inicio);
            bean.setTurnFin(time_fin);
            new TablasMaestrasDao().updateTurnos(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó el turno correctamente");

        } catch (ParseException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el turno, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setTurnId(turn_id);
            bean.setTurnEstado("I");
            new TablasMaestrasDao().deleteTurnos(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el turno correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el turno, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));

        HashMap hm = new HashMap();

        String query = " WHERE turn_id = " + turn_id + " AND turn_estado = 'A' ";
        List<TablasMaestras> listTurnos = new TablasMaestrasDao().getTurnos(query);
        hm.put("nombre", listTurnos.get(0).getTurnNombre());
        hm.put("descripcion", listTurnos.get(0).getTurnDescripcion());
        hm.put("inicio", listTurnos.get(0).getTurnInicio());
        hm.put("fin", listTurnos.get(0).getTurnFin());

        Gson gson = new GsonBuilder().setDateFormat("hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_documento(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String ticl_id = request.getParameter("ticl_id");

        HashMap hm = new HashMap();

        String query;
        if (ticl_id.equals("1")) {
            query = " WHERE tido_id > 1 ORDER BY tido_id ASC ";
        } else {
            query = " WHERE tido_id = 1 ";
        }
        List<TablasMaestras> listTiposDocumento = new TablasMaestrasDao().getTiposDocumento(query);
        hm.put("listTiposDocumento", listTiposDocumento);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_tipo_documento(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tido_id = request.getParameter("tido_id");

        HashMap hm = new HashMap();

        String query = " WHERE tido_id = " + tido_id;
        List<TablasMaestras> listTiposDocumento = new TablasMaestrasDao().getTiposDocumento(query);

        hm.put("tido_id", listTiposDocumento.get(0).getTidoId());
        hm.put("tido_nombre", listTiposDocumento.get(0).getTidoNombre());
        hm.put("tido_descripcion", listTiposDocumento.get(0).getTidoDescripcion());
        hm.put("tido_caracteres", listTiposDocumento.get(0).getTidoCaracteres());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_servicios(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE a.serv_estado = 'A' ORDER BY a.serv_nombre ASC ";
        List<TablasMaestras> listServicios = new TablasMaestrasDao().getServicios(query);
        hm.put("listServicios", listServicios);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_servicio(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String nombre = request.getParameter("serv_nombre") == null ? "" : request.getParameter("serv_nombre").trim();
        String descripcion = request.getParameter("serv_descripcion") == null ? "" : request.getParameter("serv_descripcion").trim();
        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));
        String codigo_sunat = request.getParameter("serv_codigo_sunat") == null ? "" : request.getParameter("serv_codigo_sunat").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setServNombre(nombre);
            bean.setServDescripcion(descripcion);
            bean.setUnmeId(unme_id);
            bean.setServEstado("A");
            bean.setServCodigoSunat(codigo_sunat);
            new TablasMaestrasDao().insertServicios(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadió nuevo servicio correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el servicio, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_servicio(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer serv_id = Integer.parseInt(request.getParameter("serv_id"));
        String nombre = request.getParameter("serv_nombre") == null ? "" : request.getParameter("serv_nombre").trim();
        String descripcion = request.getParameter("serv_descripcion") == null ? "" : request.getParameter("serv_descripcion").trim();
        Integer unme_id = Integer.parseInt(request.getParameter("unme_id"));
        String codigo_sunat = request.getParameter("serv_codigo_sunat") == null ? "" : request.getParameter("serv_codigo_sunat").trim();

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setServId(serv_id);
            bean.setServNombre(nombre);
            bean.setServDescripcion(descripcion);
            bean.setUnmeId(unme_id);
            bean.setServCodigoSunat(codigo_sunat);
            new TablasMaestrasDao().updateServicios(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó servicio correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el servicio, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_servicio(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer serv_id = Integer.parseInt(request.getParameter("serv_id"));

        HashMap hm = new HashMap();

        try {

            TablasMaestras bean = new TablasMaestras();
            bean.setServId(serv_id);
            bean.setServEstado("I");
            new TablasMaestrasDao().deleteServicios(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó servicio correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el servicio, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_servicio(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer serv_id = Integer.parseInt(request.getParameter("serv_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.serv_id = " + serv_id + " AND a.serv_estado = 'A' ORDER BY a.serv_nombre ASC ";
        List<TablasMaestras> listServicio = new TablasMaestrasDao().getServicios(query);

        hm.put("nombre", listServicio.get(0).getServNombre());
        hm.put("descripcion", listServicio.get(0).getServDescripcion());
        hm.put("unidad", listServicio.get(0).getUnmeId());
        hm.put("caprId", listServicio.get(0).getCaprId());
        hm.put("caprNombre", listServicio.get(0).getCaprNombre());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

}
