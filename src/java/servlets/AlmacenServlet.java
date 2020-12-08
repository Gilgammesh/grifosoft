package servlets;

import beans.Almacen;
import beans.Usuario;
import beans.Ventas;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import daos.AlmacenDao;
import daos.UsuarioDao;
import daos.VentasDao;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "AlmacenServlet", urlPatterns = {"/Almacen"})
public class AlmacenServlet extends HttpServlet {

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
            case "lista_proveedores":
                lista_proveedores(request, response);
                break;
            case "nuevo_proveedor":
                nuevo_proveedor(request, response);
                break;
            case "editar_proveedor":
                editar_proveedor(request, response);
                break;
            case "info_proveedor":
                info_proveedor(request, response);
                break;
            case "delete_proveedor":
                delete_proveedor(request, response);
                break;
            case "lista_proveedores_plantas":
                lista_proveedores_plantas(request, response);
                break;
            case "nuevo_proveedor_planta":
                nuevo_proveedor_planta(request, response);
                break;
            case "info_proveedor_planta":
                info_proveedor_planta(request, response);
                break;
            case "delete_proveedor_planta":
                delete_proveedor_planta(request, response);
                break;
            case "lista_facturas":
                lista_facturas(request, response);
                break;
            case "nueva_factura":
                nueva_factura(request, response);
                break;
            case "info_factura":
                info_factura(request, response);
                break;
            case "delete_factura":
                delete_factura(request, response);
                break;
            case "list_stock_productos":
                list_stock_productos(request, response);
                break;
            case "list_stock_productos_otros":
                list_stock_productos_otros(request, response);
                break;
            case "update_stock_inicial_fact":
                update_stock_inicial_fact(request, response);
                break;
            case "update_stock_inicial_liquid":
                update_stock_inicial_liquid(request, response);
                break;
            case "alerta_stock_productos":
                alerta_stock_productos(request, response);
                break;
            case "alerta_stock_productos_mail":
                alerta_stock_productos_mail(request, response);
                break;
            case "get_stock_limite":
                get_stock_limite(request, response);
                break;
            case "nuevo_stock_limite":
                nuevo_stock_limite(request, response);
                break;
            case "lista_control_diario":
                lista_control_diario(request, response);
                break;
            case "lista_facturas_compra":
                lista_facturas_compra(request, response);
                break;
            case "lista_comprobantes_emitidos":
                lista_comprobantes_emitidos(request, response);
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

    private void lista_proveedores(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE prov_estado = true ORDER BY prov_id ASC ";
        List<Almacen> listProveedores = new AlmacenDao().getProveedores(query);
        hm.put("listProveedores", listProveedores);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_proveedor(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String documento = request.getParameter("prov_documento") == null ? "" : request.getParameter("prov_documento").trim();
        String nombres = request.getParameter("prov_nombres") == null ? "" : request.getParameter("prov_nombres").trim();
        String direccion = request.getParameter("prov_direccion") == null ? "" : request.getParameter("prov_direccion").trim();
        String contacto = request.getParameter("prov_contacto") == null ? "" : request.getParameter("prov_contacto").trim();
        String telefonos = request.getParameter("prov_telefonos") == null ? "" : request.getParameter("prov_telefonos").trim();
        String correo = request.getParameter("prov_correo") == null ? "" : request.getParameter("prov_correo").trim();

        HashMap hm = new HashMap();

        String query = " WHERE prov_documento = '" + documento + "' AND prov_estado = true ";
        List<Almacen> listReg = new AlmacenDao().getProveedores(query);

        try {

            if (documento.length() >= 11) {

                if (listReg.isEmpty()) {

                    Almacen bean = new Almacen();
                    bean.setProvDocumento(documento);
                    bean.setProvNombres(nombres);
                    bean.setProvDireccion(direccion);
                    bean.setProvContacto(contacto);
                    bean.setProvTelefonos(telefonos);
                    bean.setProvCorreo(correo);
                    bean.setProvEstado(true);
                    new AlmacenDao().insertProveedores(bean);

                    hm.put("success", true);
                    hm.put("msg", "Se añadió nuevo proveedor correctamente");

                } else {
                    hm.put("success", false);
                    hm.put("msg", "Ya existe un Proveedor activo con este RUC");
                }
            } else {
                hm.put("success", false);
                hm.put("msg", "El RUC debe tener 11 dígitos");
            }

        } catch (Exception ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el Proveedor. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_proveedor(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prov_id = Integer.parseInt(request.getParameter("prov_id"));
        String documento = request.getParameter("prov_documento") == null ? "" : request.getParameter("prov_documento").trim();
        String nombres = request.getParameter("prov_nombres") == null ? "" : request.getParameter("prov_nombres").trim();
        String direccion = request.getParameter("prov_direccion") == null ? "" : request.getParameter("prov_direccion").trim();
        String contacto = request.getParameter("prov_contacto") == null ? "" : request.getParameter("prov_contacto").trim();
        String telefonos = request.getParameter("prov_telefonos") == null ? "" : request.getParameter("prov_telefonos").trim();
        String correo = request.getParameter("prov_correo") == null ? "" : request.getParameter("prov_correo").trim();

        HashMap hm = new HashMap();

        String query = " WHERE prov_documento = '" + documento + "' AND prov_estado = true ";
        List<Almacen> listReg = new AlmacenDao().getProveedores(query);

        try {

            if (documento.length() >= 11) {

                if (listReg.isEmpty()) {
                    Almacen bean = new Almacen();
                    bean.setProvId(prov_id);
                    bean.setProvDocumento(documento);
                    bean.setProvNombres(nombres);
                    bean.setProvDireccion(direccion);
                    bean.setProvContacto(contacto);
                    bean.setProvTelefonos(telefonos);
                    bean.setProvCorreo(correo);
                    new AlmacenDao().updateProveedores(bean);

                    hm.put("provId", prov_id);
                    hm.put("success", true);
                    hm.put("msg", "Se actualizó datos de Proveedor correctamente");

                } else {

                    if (Objects.equals(listReg.get(0).getProvId(), prov_id)) {
                        Almacen bean = new Almacen();
                        bean.setProvId(prov_id);
                        bean.setProvDocumento(documento);
                        bean.setProvNombres(nombres);
                        bean.setProvDireccion(direccion);
                        bean.setProvContacto(contacto);
                        bean.setProvTelefonos(telefonos);
                        bean.setProvCorreo(correo);
                        new AlmacenDao().updateProveedores(bean);

                        hm.put("provId", prov_id);
                        hm.put("success", true);
                        hm.put("msg", "Se actualizó datos de Proveedor correctamente");
                    } else {

                        hm.put("success", false);
                        hm.put("msg", "Ya existe un Proveedor activo con este RUC");
                    }
                }
            } else {
                hm.put("success", false);
                hm.put("msg", "El RUC debe tener 11 dígitos");
            }

        } catch (Exception ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar datos de Proveedor. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_proveedor(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prov_id = Integer.parseInt(request.getParameter("prov_id"));

        HashMap hm = new HashMap();
        String query = " WHERE prov_id = " + prov_id;
        List<Almacen> listProveedor = new AlmacenDao().getProveedores(query);

        hm.put("provId", prov_id);
        hm.put("documento", listProveedor.get(0).getProvDocumento());
        hm.put("nombres", listProveedor.get(0).getProvNombres());
        hm.put("direccion", listProveedor.get(0).getProvDireccion());
        hm.put("contacto", listProveedor.get(0).getProvContacto());
        hm.put("telefonos", listProveedor.get(0).getProvTelefonos());
        hm.put("correo", listProveedor.get(0).getProvCorreo());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_proveedor(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prov_id = Integer.parseInt(request.getParameter("prov_id"));

        HashMap hm = new HashMap();

        try {

            Almacen bean = new Almacen();
            bean.setProvId(prov_id);
            bean.setProvEstado(false);
            new AlmacenDao().deleteProveedores(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó Proveedor correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el Proveedor. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_proveedores_plantas(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String prov_id = request.getParameter("prov_id");

        String query = " WHERE prov_id = " + prov_id + " AND prpl_estado = true ORDER BY prpl_nombre ASC ";
        List<Almacen> listPlantas = new AlmacenDao().getProveedoresPlantas(query);

        String queryProv = " WHERE prov_id = " + prov_id;
        List<Almacen> listProveedor = new AlmacenDao().getProveedores(queryProv);

        HashMap hm = new HashMap();

        hm.put("listPlantas", listPlantas);

        hm.put("documento", listProveedor.get(0).getProvDocumento());
        hm.put("nombres", listProveedor.get(0).getProvNombres());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_proveedor_planta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prov_id = Integer.parseInt(request.getParameter("prov_id"));
        String nombre = request.getParameter("prpl_nombre") == null ? "" : request.getParameter("prpl_nombre").trim();
        String direccion = request.getParameter("prpl_direccion") == null ? "" : request.getParameter("prpl_direccion").trim();
        String telefonos = request.getParameter("prpl_telefonos") == null ? "" : request.getParameter("prpl_telefonos").trim();
        String correo = request.getParameter("prpl_correo") == null ? "" : request.getParameter("prpl_correo").trim();

        HashMap hm = new HashMap();

        try {

            Almacen bean = new Almacen();
            bean.setPrplNombre(nombre);
            bean.setPrplDireccion(direccion);
            bean.setPrplTelefonos(telefonos);
            bean.setPrplCorreo(correo);
            bean.setPrplEstado(true);
            bean.setProvId(prov_id);
            new AlmacenDao().insertProveedoresPlantas(bean);
            hm.put("provId", prov_id);
            hm.put("success", true);
            hm.put("msg", "Se añadió nueva planta correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir planta. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_proveedor_planta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prov_id = Integer.parseInt(request.getParameter("prov_id"));

        HashMap hm = new HashMap();
        String query = " WHERE prov_id = " + prov_id;
        List<Almacen> listProveedor = new AlmacenDao().getProveedores(query);

        hm.put("provId", prov_id);
        hm.put("documento", listProveedor.get(0).getProvDocumento());
        hm.put("nombres", listProveedor.get(0).getProvNombres());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_proveedor_planta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prpl_id = Integer.parseInt(request.getParameter("prpl_id"));

        HashMap hm = new HashMap();

        try {

            Almacen bean = new Almacen();
            bean.setPrplId(prpl_id);
            bean.setPrplEstado(false);
            new AlmacenDao().deleteProveedoresPlantas(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó Planta correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el Planta. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_facturas(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " GROUP BY a.faco_id, a.faco_fecha_factura, a.faco_factura, a.prov_id, c.prov_nombres, a.prpl_id, d.prpl_nombre "
                + " ORDER BY a.faco_fecha_factura DESC ";
        List<Almacen> listFacturas = new AlmacenDao().getFacturasCompra(query);
        hm.put("listFacturas", listFacturas);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nueva_factura(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha_registro = request.getParameter("faco_fecha_registro") == null ? "" : request.getParameter("faco_fecha_registro").trim();
        String factura = request.getParameter("faco_factura") == null ? "" : request.getParameter("faco_factura").trim();
        String fecha_factura = request.getParameter("faco_fecha_factura") == null ? "" : request.getParameter("faco_fecha_factura").trim();

        String[] prod_Ids = request.getParameterValues("prod_id");
        String[] cantidad = request.getParameterValues("facd_cantidad");
        String[] monto = request.getParameterValues("facd_monto");

        String prov_id = request.getParameter("prov_id");
        String prpl_id = request.getParameter("prpl_id");
        String comentarios = request.getParameter("faco_comentarios") == null ? "" : request.getParameter("faco_comentarios").trim();

        HashMap hm = new HashMap();

        try {

            if (prod_Ids == null || prod_Ids.length < 1) {
                hm.put("success", false);
                hm.put("msg", "No se ha ingresado ningún producto");
            } else {

                Almacen bean = new Almacen();
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                Date parsedFechaReg = dateFormat.parse(fecha_registro);
                Timestamp tsReg = new Timestamp(parsedFechaReg.getTime());
                Date parsedFechaFact = dateFormat.parse(fecha_factura);
                bean.setFacoFechaRegistro(tsReg);
                bean.setFacoFechaFactura(parsedFechaFact);
                bean.setFacoFactura(factura);
                bean.setFacoComentarios(comentarios);
                bean.setProvId(Integer.parseInt(prov_id));
                bean.setPrplId(Integer.parseInt(prpl_id));
                new AlmacenDao().insertFacturasCompra(bean);

                for (int i = 0; i < prod_Ids.length; i++) {
                    Almacen beani = new Almacen();
                    beani.setFacoId(bean.getFacoId());
                    if (cantidad[i].equals("")) {
                        beani.setFacdCantidad(null);
                    } else {
                        beani.setFacdCantidad(new BigDecimal(cantidad[i].replaceAll("\\s", "").trim()));
                    }
                    if (monto[i].equals("")) {
                        beani.setFacdMonto(null);
                    } else {
                        beani.setFacdMonto(new BigDecimal(monto[i].replaceAll("\\s", "").trim()));
                    }
                    beani.setProdId(Integer.parseInt(prod_Ids[i]));
                    new AlmacenDao().insertFacturasCompraDetalle(beani);
                }

                hm.put("success", true);
                hm.put("msg", "Se añadió nueva factura de compra correctamente");
            }

        } catch (NumberFormatException | ParseException ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir la factura de compra. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_factura(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer faco_id = Integer.parseInt(request.getParameter("faco_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.faco_id = " + faco_id + " GROUP BY a.faco_id, a.faco_fecha_factura, a.faco_factura, "
                + "a.prov_id, c.prov_nombres, a.prpl_id, d.prpl_nombre ORDER BY a.faco_fecha_factura DESC ";
        List<Almacen> listFactura = new AlmacenDao().getFacturasCompra(query);
        String queryD = " WHERE a.faco_id = " + faco_id;
        List<Almacen> listFacturaDetalle = new AlmacenDao().getFacturasCompraDetalle(queryD);

        hm.put("facoId", faco_id);
        hm.put("factura", listFactura.get(0).getFacoFactura());
        hm.put("fecha", listFactura.get(0).getFacoFechaFactura());
        hm.put("proveedor", listFactura.get(0).getProvNombres());
        hm.put("planta", listFactura.get(0).getPrplNombre());
        hm.put("comentarios", listFactura.get(0).getFacoComentarios());
        hm.put("listFacturaDetalle", listFacturaDetalle);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_factura(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer faco_id = Integer.parseInt(request.getParameter("faco_id"));

        HashMap hm = new HashMap();

        try {

            Almacen bean = new Almacen();
            bean.setFacoId(faco_id);
            new AlmacenDao().deleteFacturasCompraDetalle(bean);
            new AlmacenDao().deleteFacturasCompra(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó Factura correctamente");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar la Factura. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_stock_productos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
        List<Ventas> list = new VentasDao().getTurnoDiario(query);

        String query1 = " WHERE a.prod_estado = 'A' AND a.prod_grifo = true ORDER BY a.prod_nombre ASC ";
        String query2 = " '" + list.get(0).getTudiFechaInicio() + "'::date ";
        List<Almacen> listStockFact = new AlmacenDao().getStockProductosFact(query1);
        List<Almacen> listStockLiquid = new AlmacenDao().getStockProductosLiquid(query1, query2);

        HashMap hm = new HashMap();
        hm.put("listStockFact", listStockFact);
        hm.put("listStockLiquid", listStockLiquid);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_stock_productos_otros(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " WHERE a.prod_estado = 'A' AND a.prod_grifo = false ORDER BY a.prod_nombre ASC ";
        List<Almacen> listStock = new AlmacenDao().getStockProductosFact(query);

        HashMap hm = new HashMap();
        hm.put("listStock", listStock);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_stock_inicial_fact(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));

        String stockIni = request.getParameter("stin_cantidad") == null ? "" : request.getParameter("stin_cantidad");

        HashMap hm = new HashMap();

        try {

            String query = " WHERE prod_id = " + prod_id + " AND stin_activo = true ";
            List<Almacen> listStock = new AlmacenDao().getStockInicial(query);

            if (listStock.isEmpty()) {
                Almacen beanI = new Almacen();
                beanI.setProdId(prod_id);
                if (stockIni.equals("")) {
                    beanI.setStinCantidad(null);
                } else {
                    beanI.setStinCantidad(new BigDecimal(stockIni.replaceAll("\\s", "").trim()));
                }
                LocalDateTime ldt = LocalDateTime.now();
                beanI.setStinFechaHora(Timestamp.valueOf(ldt));
                beanI.setStinActivo(true);
                beanI.setStinLiquidacion(null);
                new AlmacenDao().insertStockInicial(beanI);
            } else {
                Almacen beanI = new Almacen();
                beanI.setProdId(prod_id);
                if (stockIni.equals("")) {
                    beanI.setStinCantidad(null);
                } else {
                    beanI.setStinCantidad(new BigDecimal(stockIni.replaceAll("\\s", "").trim()));
                }
                LocalDateTime ldt = LocalDateTime.now();
                beanI.setStinFechaHora(Timestamp.valueOf(ldt));
                new AlmacenDao().updateStockInicialFact(beanI);
            }

            hm.put("success", true);
            hm.put("msg", "Se actualizó el stock inicial correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el stock inicial");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_stock_inicial_liquid(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));

        String stockIni = request.getParameter("stin_liquidacion") == null ? "" : request.getParameter("stin_liquidacion");

        HashMap hm = new HashMap();

        try {

            String query = " WHERE prod_id = " + prod_id + " AND stin_activo = true ";
            List<Almacen> listStock = new AlmacenDao().getStockInicial(query);

            if (listStock.isEmpty()) {
                Almacen beanI = new Almacen();
                beanI.setProdId(prod_id);
                beanI.setStinCantidad(null);
                LocalDateTime ldt = LocalDateTime.now();
                beanI.setStinFechaHora(Timestamp.valueOf(ldt));
                beanI.setStinActivo(true);
                if (stockIni.equals("")) {
                    beanI.setStinLiquidacion(null);
                } else {
                    beanI.setStinLiquidacion(new BigDecimal(stockIni.replaceAll("\\s", "").trim()));
                }
                new AlmacenDao().insertStockInicial(beanI);
            } else {
                Almacen beanI = new Almacen();
                beanI.setProdId(prod_id);
                if (stockIni.equals("")) {
                    beanI.setStinLiquidacion(null);
                } else {
                    beanI.setStinLiquidacion(new BigDecimal(stockIni.replaceAll("\\s", "").trim()));
                }
                LocalDateTime ldt = LocalDateTime.now();
                beanI.setStinFechaHora(Timestamp.valueOf(ldt));
                new AlmacenDao().updateStockInicialLiquid(beanI);
            }

            hm.put("success", true);
            hm.put("msg", "Se actualizó el stock inicial correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el stock inicial");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void alerta_stock_productos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query1 = " WHERE b.reve_estado = 'emitido' GROUP BY a.prod_id ";

        String queryG = " WHERE stli_activo = true ";
        List<Almacen> listGalon = new AlmacenDao().getStockLimite(queryG);

        String query2 = " WHERE (b.stin_cantidad + c.galones_comprados - d.galones_facturados) <= " + listGalon.get(0).getStliGalones() + " "
                + " AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";

        List<Almacen> listStockAlert = new AlmacenDao().getStockAlertProducts(query1, query2);
        HashMap hm = new HashMap();

        if (!listStockAlert.isEmpty()) {
            hm.put("success", true);
            hm.put("listStockAlert", listStockAlert);
        } else {
            hm.put("success", false);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void alerta_stock_productos_mail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query1 = " WHERE b.reve_estado = 'emitido' GROUP BY a.prod_id ";

        String queryG = " WHERE stli_activo = true ";
        List<Almacen> listGalon = new AlmacenDao().getStockLimite(queryG);

        String query2 = " WHERE (b.stin_cantidad + c.galones_comprados - d.galones_facturados) <= " + listGalon.get(0).getStliGalones() + " "
                + "AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";

        List<Almacen> listStockAlert = new AlmacenDao().getStockAlertProducts(query1, query2);

        List<Usuario> listEmpresa = new UsuarioDao().getDatosEmpresa();

        HashMap hm = new HashMap();

        if (!listStockAlert.isEmpty()) {
            listStockAlert.stream().forEach(
                    t -> {
                        String queryS = " WHERE prod_id = " + t.getProdId() + " AND stco_fecha_hora::date = now()::date ";
                        List<Almacen> listS = new AlmacenDao().getStockCorreo(queryS);
                        if (listS.isEmpty()) {
                            String empresa = listEmpresa.get(0).getEmprRazonSocial();
                            String correo = listEmpresa.get(0).getEmprCorreo();
                            String sede = listEmpresa.get(0).getEmprSede();
                            String asunto = "Alerta Stock Producto - " + sede;
                            String mensaje = ""
                            + "<html>"
                            + "<body>"
                            + "<p>Estimado Cliente " + empresa + ".</p>"
                            + "<p>Le comunicamos que en " + sede + ", el producto " + t.getProdDescripcion() + " (" + t.getProdNombre() + ") "
                            + "está en alerta de stock de facturación, contando con solo: <strong>" + t.getStock() + " galones.</strong></p>"
                            + "<p>Sugerimos abastecerse a la brevedad del producto.</p>"
                            + "</body>"
                            + "</html>";
                            enviarEmail(correo, asunto, mensaje, t.getProdId());
                        }
                    }
            );
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void enviarEmail(String correoRecibe, String asunto, String mensaje, Integer prod_id) {

        Properties propiedad = new Properties();
        propiedad.setProperty("mail.smtp.host", "smtp.gmail.com");
        propiedad.setProperty("mail.smtp.starttls.enable", "true");
        propiedad.setProperty("mail.smtp.port", "587");
        propiedad.setProperty("mail smtp auth", "true");

        Session sesion = Session.getDefaultInstance(propiedad);
        String correoEnvia = "santandertechsac@gmail.com";
        String contrasena = "ad08dp11s";

        MimeMessage mail = new MimeMessage(sesion);
        try {
            mail.setFrom(new InternetAddress(correoEnvia));
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(correoRecibe));
            mail.setSubject(asunto);
            mail.setContent(mensaje, "text/html; charset=utf-8");

            Transport transportar = sesion.getTransport("smtp");
            transportar.connect(correoEnvia, contrasena);
            transportar.sendMessage(mail, mail.getRecipients(Message.RecipientType.TO));
            transportar.close();

            Almacen bean = new Almacen();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setStcoFechaHora(Timestamp.valueOf(ldt));
            bean.setProdId(prod_id);
            bean.setStcoRemitente(correoEnvia);
            bean.setStcoDestinatario(correoRecibe);
            bean.setStcoAsunto(asunto);
            bean.setStcoMensaje(mensaje);
            new AlmacenDao().insertStockCorreo(bean);

        } catch (AddressException ex) {
            Logger.getLogger(AlmacenServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(AlmacenServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    private void get_stock_limite(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " WHERE stli_activo = true ";
        List<Almacen> listGalon = new AlmacenDao().getStockLimite(query);

        HashMap hm = new HashMap();

        hm.put("galones", listGalon.get(0).getStliGalones());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_stock_limite(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String galones = request.getParameter("stli_galones") == null ? "" : request.getParameter("stli_galones");

        HashMap hm = new HashMap();

        try {
            Almacen beanU = new Almacen();
            beanU.setStliActivo(false);
            new AlmacenDao().updateStockLimite(beanU);

            Almacen beanI = new Almacen();
            if (galones.equals("")) {
                beanI.setStliGalones(null);
            } else {
                beanI.setStliGalones(new BigDecimal(galones.replaceAll("\\s", "").trim()));
            }
            LocalDateTime ldt = LocalDateTime.now();
            beanI.setStliFechaHora(Timestamp.valueOf(ldt));
            beanI.setStliActivo(true);
            new AlmacenDao().insertStockLimite(beanI);

            hm.put("success", true);
            hm.put("msg", "Se estableció el nuevo límite de galones de producto");

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo establecer el nuevo límite de galones. Intente nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_control_diario(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha = request.getParameter("fecha");

        HashMap hm = new HashMap();

        String query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
        List<Almacen> listControlDiario = new AlmacenDao().getControlDiarioVentas(fecha, query);
        hm.put("count", listControlDiario.size());
        hm.put("listControlDiario", listControlDiario);

        String queryC1_1 = " a.faco_id ";
        String queryC2 = " WHERE a.faco_fecha_registro::date = '" + fecha + "'::date ";
        List<Almacen> listCompras1 = new AlmacenDao().getTotalCompras(queryC1_1, queryC2);
        if (listCompras1.isEmpty()) {
            hm.put("compras", new BigDecimal(BigInteger.ZERO));
        } else {
            String queryC1_2 = " SUM(b.facd_monto) as compras ";
            List<Almacen> listCompras2 = new AlmacenDao().getTotalCompras(queryC1_2, queryC2);
            hm.put("compras", listCompras2.get(0).getCompras());
        }

        String queryI1_1 = " indi_id ";
        String queryI2 = " WHERE indi_fecha_hora::date = '" + fecha + "'::date ";
        List<Almacen> listIngresos1 = new AlmacenDao().getTotalIngresos(queryI1_1, queryI2);
        if (listIngresos1.isEmpty()) {
            hm.put("ingresos", new BigDecimal(BigInteger.ZERO));
        } else {
            String queryI1_2 = " SUM(indi_monto) as ingresos ";
            List<Almacen> listIngresos2 = new AlmacenDao().getTotalIngresos(queryI1_2, queryI2);
            hm.put("ingresos", listIngresos2.get(0).getIngresos());
        }

        String queryG1_1 = " gadi_id ";
        String queryG2 = " WHERE gadi_fecha_hora::date = '" + fecha + "'::date ";
        List<Almacen> listGastos1 = new AlmacenDao().getTotalGastos(queryG1_1, queryG2);
        if (listGastos1.isEmpty()) {
            hm.put("gastos", new BigDecimal(BigInteger.ZERO));
        } else {
            String queryG1_2 = " SUM(gadi_monto) as gastos ";
            List<Almacen> listGastos2 = new AlmacenDao().getTotalGastos(queryG1_2, queryG2);
            hm.put("gastos", listGastos2.get(0).getGastos());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_facturas_compra(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha_ini = request.getParameter("fecha_ini");
        String fecha_fin = request.getParameter("fecha_fin");
        String prod_id = request.getParameter("prod_id");

        HashMap hm = new HashMap();

        String query = " WHERE b.faco_fecha_factura::date between '" + fecha_ini + "'::date AND '" + fecha_fin + "'::date ";
        if (!prod_id.equals("todos")) {
            query += " AND a.prod_id = " + prod_id + " ";
        }
        query += " ORDER BY b.faco_fecha_factura DESC ";

        List<Almacen> listFacturas = new AlmacenDao().getListFacturasProd(query);

        hm.put("listFacturas", listFacturas);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    private void lista_comprobantes_emitidos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha_ini = request.getParameter("fecha_ini");
        String fecha_fin = request.getParameter("fecha_fin");
        String prod_id = request.getParameter("prod_id");

        HashMap hm = new HashMap();

        String query = " WHERE b.reve_fecha_hora::date between '" + fecha_ini + "'::date AND '" + fecha_fin + "'::date ";
        if (!prod_id.equals("todos")) {
            query += " AND a.prod_id = " + prod_id + " ";
        }
        query += " ORDER BY b.reve_fecha_hora DESC ";

        List<Almacen> listComprobantes = new AlmacenDao().getListComprobantesEmi(query);

        hm.put("listComprobantes", listComprobantes);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

}
