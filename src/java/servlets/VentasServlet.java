package servlets;

import beans.Almacen;
import beans.Facturacion;
import beans.TablasMaestras;
import beans.Usuario;
import beans.Ventas;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import daos.AlmacenDao;
import daos.FacturacionDao;
import daos.TablasMaestrasDao;
import daos.UsuarioDao;
import daos.VentasDao;
import java.io.BufferedReader;

import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.nio.charset.UnsupportedCharsetException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "VentasServlet", urlPatterns = {"/Ventas"})
public class VentasServlet extends HttpServlet {

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
            case "lista_turnos":
                lista_turnos(request, response);
                break;
            case "tipos_cliente":
                tipos_cliente(request, response);
                break;
            case "lista_clientes":
                lista_clientes(request, response);
                break;
            case "nuevo_cliente":
                nuevo_cliente(request, response);
                break;
            case "editar_cliente":
                editar_cliente(request, response);
                break;
            case "datos_cliente":
                datos_cliente(request, response);
                break;
            case "delete_cliente":
                delete_cliente(request, response);
                break;
            case "lista_tipos_venta":
                lista_tipos_venta(request, response);
                break;
            case "lista_productos_precios_venta":
                lista_productos_precios_venta(request, response);
                break;
            case "update_producto_precio_venta":
                update_producto_precio_venta(request, response);
                break;
            case "matriz":
                matriz(request, response);
                break;
            case "list_surtidores":
                list_surtidores(request, response);
                break;
            case "insert_surtidores":
                insert_surtidores(request, response);
                break;
            case "delete_surtidores":
                delete_surtidores(request, response);
                break;
            case "ventas_registro_inicio":
                ventas_registro_inicio(request, response);
                break;
            case "nuevo_turno":
                nuevo_turno(request, response);
                break;
            case "registrar_turno":
                registrar_turno(request, response);
                break;
            case "remover_turno":
                remover_turno(request, response);
                break;
            case "list_trabajadores_turno":
                list_trabajadores_turno(request, response);
                break;
            case "list_surtidores_turno":
                list_surtidores_turno(request, response);
                break;
            case "list_surtidores_matriz":
                list_surtidores_matriz(request, response);
                break;
            case "list_lados_surtidor":
                list_lados_surtidor(request, response);
                break;
            case "list_productos_lado_surtidor":
                list_productos_lado_surtidor(request, response);
                break;
            case "insert_registro_venta":
                insert_registro_venta(request, response);
                break;
            case "update_registro_venta":
                update_registro_venta(request, response);
                break;
            case "anular_registro_venta":
                anular_registro_venta(request, response);
                break;
            case "nuevo_registro_venta":
                nuevo_registro_venta(request, response);
                break;
            case "insert_registro_venta_detalle":
                insert_registro_venta_detalle(request, response);
                break;
            case "delete_registro_venta_detalle":
                delete_registro_venta_detalle(request, response);
                break;
            case "empty_registro_venta_detalle":
                empty_registro_venta_detalle(request, response);
                break;
            case "buscar_registro_venta_cliente":
                buscar_registro_venta_cliente(request, response);
                break;
            case "lista_lectura_inicio_turno":
                lista_lectura_inicio_turno(request, response);
                break;
            case "lista_lectura_fin_turno":
                lista_lectura_fin_turno(request, response);
                break;
            case "update_lectura_fin_turno":
                update_lectura_fin_turno(request, response);
                break;
            case "liquidar_stock":
                liquidar_stock(request, response);
                break;
            case "cerrar_turno":
                cerrar_turno(request, response);
                break;
            case "imprimir_turno":
                imprimir_turno(request, response);
                break;
            case "precio_venta_producto":
                precio_venta_producto(request, response);
                break;
            case "lista_correlativos_emision":
                lista_correlativos_emision(request, response);
                break;
            case "upsert_correlativo_emision":
                upsert_correlativo_emision(request, response);
                break;
            case "impresion_registro_venta":
                impresion_registro_venta(request, response);
                break;
            case "list_liquidacion_stock":
                list_liquidacion_stock(request, response);
                break;
            case "list_ingresos":
                list_ingresos(request, response);
                break;
            case "insert_ingreso":
                insert_ingreso(request, response);
                break;
            case "delete_ingreso":
                delete_ingreso(request, response);
                break;
            case "list_gastos":
                list_gastos(request, response);
                break;
            case "insert_gasto":
                insert_gasto(request, response);
                break;
            case "delete_gasto":
                delete_gasto(request, response);
                break;
            case "add_devolucion_tanque":
                add_devolucion_tanque(request, response);
                break;
            case "del_devolucion_tanque":
                del_devolucion_tanque(request, response);
                break;
            case "lista_devolucion_tanque":
                lista_devolucion_tanque(request, response);
                break;
            case "add_gasto_turno":
                add_gasto_turno(request, response);
                break;
            case "del_gasto_turno":
                del_gasto_turno(request, response);
                break;
            case "lista_gastos_turno":
                lista_gastos_turno(request, response);
                break;
            case "add_ingreso_turno":
                add_ingreso_turno(request, response);
                break;
            case "del_ingreso_turno":
                del_ingreso_turno(request, response);
                break;
            case "lista_ingresos_turno":
                lista_ingresos_turno(request, response);
                break;
            case "add_monto_entregado":
                add_monto_entregado(request, response);
                break;
            case "update_liquida_trabajador":
                update_liquida_trabajador(request, response);
                break;
            case "reporte_control_ventas":
                reporte_control_ventas(request, response);
                break;
            case "list_compras":
                list_compras(request, response);
                break;
            case "insert_compra":
                insert_compra(request, response);
                break;
            case "delete_compra":
                delete_compra(request, response);
                break;
            case "insert_calle_matriz":
                insert_calle_matriz(request, response);
                break;
            case "surtidor_lados":
                surtidor_lados(request, response);
                break;
            case "editar_surtidor":
                editar_surtidor(request, response);
                break;
            case "surtidores_detalle_lado_prods":
                surtidores_detalle_lado_prods(request, response);
                break;
            case "editar_surtidor_lado":
                editar_surtidor_lado(request, response);
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

    private void lista_turnos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query1 = " WHERE (now()::time between turn_inicio and turn_fin) AND turn_inicio < turn_fin ";
        String query2 = " WHERE ((now()::time between turn_inicio AND '24:00:00'::time) OR (now()::time between '00:00:00'::time AND turn_fin)) AND turn_inicio > turn_fin ";
        List<Ventas> listTurnoHora = new VentasDao().getTurnoHora(query1, query2);
        hm.put("turn_id", listTurnoHora.get(0).getTurnId());

        String query = " WHERE turn_estado = 'A' ORDER BY turn_nombre ASC ";
        List<TablasMaestras> listTurnos = new TablasMaestrasDao().getTurnos(query);
        hm.put("listTurnos", listTurnos);

        Gson gson = new GsonBuilder().setDateFormat("hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void tipos_cliente(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String query = " WHERE ticl_id > 0 AND ticl_estado = 'A' ORDER BY ticl_nombre ASC ";
        List<Ventas> listTiposCliente = new VentasDao().getTiposCliente(query);
        hm.put("listTiposCliente", listTiposCliente);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_clientes(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();
        String queryE = " WHERE a.ticl_id = 2 AND a.clie_estado = true ORDER BY a.clie_documento ASC ";
        String queryP = " WHERE a.ticl_id = 1 AND a.clie_estado = true ORDER BY a.clie_documento ASC ";
        List<Ventas> listClientesEmpresa = new VentasDao().getClientes(queryE);
        List<Ventas> listClientesPersona = new VentasDao().getClientes(queryP);
        hm.put("listClientesEmpresa", listClientesEmpresa);
        hm.put("listClientesPersona", listClientesPersona);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_cliente(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer ticl_id = Integer.parseInt(request.getParameter("ticl_id"));
        Integer tido_id = Integer.parseInt(request.getParameter("tido_id"));
        String documento = request.getParameter("clie_documento") == null ? "" : request.getParameter("clie_documento").trim();
        String nombres = request.getParameter("clie_nombres") == null ? "" : request.getParameter("clie_nombres").trim();
        String direccion = request.getParameter("clie_direccion") == null ? "" : request.getParameter("clie_direccion").trim();
        String telefono = request.getParameter("clie_telefono") == null ? "" : request.getParameter("clie_telefono").trim();
        String correo = request.getParameter("clie_correo") == null ? "" : request.getParameter("clie_correo").trim();

        HashMap hm = new HashMap();

        try {

            if (ticl_id == 1) {

                String queryDoc = " WHERE tido_id = " + tido_id;
                List<TablasMaestras> listTiposDocumento = new TablasMaestrasDao().getTiposDocumento(queryDoc);

                String tido_nombre = listTiposDocumento.get(0).getTidoNombre();
                Integer tido_caracteres = listTiposDocumento.get(0).getTidoCaracteres();

                if (documento.trim().length() >= tido_caracteres) {

                    String query = " WHERE a.ticl_id = " + ticl_id + " AND a.clie_documento = '" + documento + "' AND a.clie_estado = true ";
                    List<Ventas> listClientes = new VentasDao().getClientes(query);

                    if (listClientes.isEmpty()) {
                        Ventas bean = new Ventas();
                        bean.setTiclId(ticl_id);
                        bean.setClieDocumento(documento.trim());
                        bean.setClieNombres(nombres);
                        bean.setClieDireccion(direccion);
                        bean.setClieTelefono(telefono);
                        bean.setClieCorreo(correo);
                        bean.setClieEstado(true);
                        bean.setTidoId(tido_id);
                        new VentasDao().insertClientes(bean);
                        hm.put("success", true);
                        hm.put("msg", "Se añadió nuevo cliente correctamente");
                        hm.put("tido_id", tido_id);
                        hm.put("clie_id", bean.getClieId());
                        hm.put("clie_documento", bean.getClieDocumento());
                        hm.put("clie_nombres", bean.getClieNombres());
                        hm.put("clie_direccion", bean.getClieDireccion());

                    } else {
                        hm.put("success", false);
                        hm.put("msg", "Ya existe un cliente con este número de " + tido_nombre);
                    }

                } else {
                    hm.put("success", false);
                    hm.put("msg", "El " + tido_nombre + " debe tener " + tido_caracteres + " dígitos");
                }
            }

            if (ticl_id == 2) {
                if (documento.trim().length() >= 11) {

                    String query = " WHERE a.ticl_id = " + ticl_id + " AND a.clie_documento = '" + documento + "' AND a.clie_estado = true ";
                    List<Ventas> listClientes = new VentasDao().getClientes(query);

                    if (listClientes.isEmpty()) {
                        Ventas bean = new Ventas();
                        bean.setTiclId(ticl_id);
                        bean.setClieDocumento(documento.trim());
                        bean.setClieNombres(nombres);
                        bean.setClieDireccion(direccion);
                        bean.setClieTelefono(telefono);
                        bean.setClieCorreo(correo);
                        bean.setClieEstado(true);
                        new VentasDao().insertClientes(bean);
                        hm.put("success", true);
                        hm.put("msg", "Se añadió nuevo cliente correctamente");
                        hm.put("clie_id", bean.getClieId());
                        hm.put("clie_documento", bean.getClieDocumento());
                        hm.put("clie_nombres", bean.getClieNombres());
                        hm.put("clie_direccion", bean.getClieDireccion());
                    } else {
                        hm.put("success", false);
                        hm.put("msg", "Ya existe un cliente con este número de RUC");
                    }

                } else {
                    hm.put("success", false);
                    hm.put("msg", "El RUC debe tener 11 dígitos");
                }
            }

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir al cliente, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_cliente(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer clie_id = Integer.parseInt(request.getParameter("clie_id"));
        Integer ticl_id = Integer.parseInt(request.getParameter("ticl_id"));
        String documento = request.getParameter("clie_documento") == null ? "" : request.getParameter("clie_documento").trim();
        String nombres = request.getParameter("clie_nombres") == null ? "" : request.getParameter("clie_nombres").trim();
        String direccion = request.getParameter("clie_direccion") == null ? "" : request.getParameter("clie_direccion").trim();
        String telefono = request.getParameter("clie_telefono") == null ? "" : request.getParameter("clie_telefono").trim();
        String correo = request.getParameter("clie_correo") == null ? "" : request.getParameter("clie_correo").trim();

        HashMap hm = new HashMap();

        try {

            if (ticl_id == 1) {
                if (documento.trim().length() >= 8) {

                    String query = " WHERE a.ticl_id = " + ticl_id + " AND a.clie_documento = '" + documento + "' AND a.clie_estado = true ";
                    List<Ventas> listClientes = new VentasDao().getClientes(query);

                    if (listClientes.isEmpty()) {
                        Ventas bean = new Ventas();
                        bean.setClieId(clie_id);
                        bean.setTiclId(ticl_id);
                        bean.setClieDocumento(documento.trim());
                        bean.setClieNombres(nombres);
                        bean.setClieDireccion(direccion);
                        bean.setClieTelefono(telefono);
                        bean.setClieCorreo(correo);
                        new VentasDao().updateClientes(bean);
                        hm.put("success", true);
                        hm.put("msg", "Se actualizaron los datos del cliente correctamente");
                    } else {
                        hm.put("success", false);
                        hm.put("msg", "Ya existe un cliente con este número de DNI");
                    }

                } else {
                    hm.put("success", false);
                    hm.put("msg", "El DNI debe tener 08 dígitos");
                }
            }

            if (ticl_id == 2) {
                if (documento.trim().length() >= 11) {

                    String query = " WHERE a.ticl_id = " + ticl_id + " AND a.clie_documento = '" + documento + "' AND a.clie_estado = true ";
                    List<Ventas> listClientes = new VentasDao().getClientes(query);

                    if (listClientes.isEmpty()) {
                        Ventas bean = new Ventas();
                        bean.setClieId(clie_id);
                        bean.setTiclId(ticl_id);
                        bean.setClieDocumento(documento.trim());
                        bean.setClieNombres(nombres);
                        bean.setClieDireccion(direccion);
                        bean.setClieTelefono(telefono);
                        bean.setClieCorreo(correo);
                        new VentasDao().updateClientes(bean);
                        hm.put("success", true);
                        hm.put("msg", "Se actualizaron los datos del cliente correctamente");
                    } else {
                        hm.put("success", false);
                        hm.put("msg", "Ya existe un cliente con este número de RUC");
                    }

                } else {
                    hm.put("success", false);
                    hm.put("msg", "El RUC debe tener 11 dígitos");
                }
            }

        } catch (Exception e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar los datos del cliente, intente nuevamente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void datos_cliente(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer clie_id = Integer.parseInt(request.getParameter("clie_id"));

        HashMap hm = new HashMap();
        String query = " WHERE a.clie_id = " + clie_id;
        List<Ventas> listCliente = new VentasDao().getClientes(query);

        hm.put("ticl_id", listCliente.get(0).getTiclId());
        hm.put("clie_documento", listCliente.get(0).getClieDocumento());
        hm.put("clie_nombres", listCliente.get(0).getClieNombres());
        hm.put("clie_direccion", listCliente.get(0).getClieDireccion());
        hm.put("clie_telefono", listCliente.get(0).getClieTelefono());
        hm.put("clie_correo", listCliente.get(0).getClieCorreo());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_cliente(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer clie_id = Integer.parseInt(request.getParameter("clie_id"));

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            bean.setClieId(clie_id);
            bean.setClieEstado(false);
            new VentasDao().deleteClientes(bean);

            hm.put("success", true);
            hm.put("msg", "Se elimino el cliente correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el cliente");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_venta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE tive_estado = 'A' ORDER BY tive_nombre ASC ";
        List<Ventas> listTiposVenta = new VentasDao().getTiposVenta(query);
        hm.put("listTiposVenta", listTiposVenta);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_productos_precios_venta(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String queryContado = " AND d.tive_id = 1 AND d.prve_activo = true ";
        String queryCredito = " AND d.tive_id = 2 AND d.prve_activo = true ";
        //String query = " WHERE a.prod_id > 0 AND a.prod_estado = 'A' AND a.prod_grifo = true ORDER BY a.prod_nombre ASC ";
        String query = " WHERE a.prod_id > 0 AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
        List<Ventas> listPreciosVentaContado = new VentasDao().getPreciosVentaProductos(queryContado, query);
        List<Ventas> listPreciosVentaCredito = new VentasDao().getPreciosVentaProductos(queryCredito, query);
        hm.put("listPreciosVentaContado", listPreciosVentaContado);
        hm.put("listPreciosVentaCredito", listPreciosVentaCredito);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_producto_precio_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));

        String precio = request.getParameter("prve_precio_unitario") == null ? "" : request.getParameter("prve_precio_unitario");
        String alterno1 = request.getParameter("prve_precio_alterno1") == null ? "" : request.getParameter("prve_precio_alterno1");
        String alterno2 = request.getParameter("prve_precio_alterno2") == null ? "" : request.getParameter("prve_precio_alterno2");
        String dscto_porc = request.getParameter("prve_descuento_precio_porcentaje") == null ? "" : request.getParameter("prve_descuento_precio_porcentaje");
        String dscto = request.getParameter("prve_descuento_precio") == null ? "" : request.getParameter("prve_descuento_precio");

        HashMap hm = new HashMap();

        try {

            if (precio.equals("") && dscto_porc.equals("") && dscto.equals("")) {

            } else {

                Ventas beanU = new Ventas();
                beanU.setProdId(prod_id);
                beanU.setTiveId(tive_id);
                beanU.setPrveActivo(false);
                new VentasDao().updatePrecioVentaProductoEstados(beanU);

                Ventas beanI = new Ventas();
                beanI.setProdId(prod_id);
                beanI.setTiveId(tive_id);
                if (precio.equals("")) {
                    beanI.setPrvePrecioUnitario(null);
                } else {
                    beanI.setPrvePrecioUnitario(new BigDecimal(precio.replaceAll("\\s", "").trim()));
                }
                if (alterno1.equals("")) {
                    beanI.setPrvePrecioAlterno1(null);
                } else {
                    beanI.setPrvePrecioAlterno1(new BigDecimal(alterno1.replaceAll("\\s", "").trim()));
                }
                if (alterno2.equals("")) {
                    beanI.setPrvePrecioAlterno2(null);
                } else {
                    beanI.setPrvePrecioAlterno2(new BigDecimal(alterno2.replaceAll("\\s", "").trim()));
                }
                if (dscto_porc.equals("")) {
                    beanI.setPrveDescuentoPrecioPorcentaje(null);
                } else {
                    beanI.setPrveDescuentoPrecioPorcentaje(new BigDecimal(dscto_porc.replaceAll("\\s", "").trim()));
                }
                if (dscto.equals("")) {
                    beanI.setPrveDescuentoPrecio(null);
                } else {
                    beanI.setPrveDescuentoPrecio(new BigDecimal(dscto.replaceAll("\\s", "").trim()));
                }
                LocalDateTime ldt = LocalDateTime.now();
                beanI.setPrveFechaHoraPrecio(Timestamp.valueOf(ldt));
                beanI.setPrveActivo(true);
                new VentasDao().insertPrecioVentaProducto(beanI);

            }

            hm.put("success", true);
            hm.put("msg", "Se actualizó el precio correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar el precio");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void matriz(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " ORDER BY matr_filas, matr_columnas ASC ";
        String queryA = " WHERE matr_estado = true ";
        List<Ventas> listMatriz = new VentasDao().getMatriz(query);
        List<Ventas> listMatrizA = new VentasDao().getMatriz(queryA);

        if (listMatrizA.isEmpty()) {
            hm.put("activo", false);
        } else {
            String queryC = " WHERE cama_estado = true ";
            List<Ventas> listCalle = new VentasDao().selectCalleMatriz(queryC);

            hm.put("activo", true);
            hm.put("calle_nombre", listCalle.get(0).getCamaNombre());
            hm.put("matr_id", listMatrizA.get(0).getMatrId());
            hm.put("filas", listMatrizA.get(0).getMatrFilas());
            hm.put("cols", listMatrizA.get(0).getMatrColumnas());
        }
        hm.put("listMatriz", listMatriz);
        hm.put("regMatriz", Math.sqrt(listMatriz.size()));

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_surtidores(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE surt_estado = true AND surt_activo = true ORDER BY surt_nombre ASC ";
        List<Ventas> listSurtidores = new VentasDao().getSurtidores(query);

        hm.put("listSurtidores", listSurtidores);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_surtidores(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer matr_id = Integer.parseInt(request.getParameter("matr_id"));

        HashMap hm = new HashMap();

        try {

            String query = " WHERE matr_id = " + matr_id;
            List<Ventas> listMatriz = new VentasDao().getMatriz(query);
            int filas = listMatriz.get(0).getMatrFilas();
            int cols = listMatriz.get(0).getMatrColumnas();

            Ventas beanU1 = new Ventas();
            beanU1.setMatrEstado(false);
            new VentasDao().updateMatrizEstados(beanU1);

            Ventas beanU2 = new Ventas();
            beanU2.setMatrId(matr_id);
            beanU2.setMatrEstado(true);
            new VentasDao().updateMatrizEstado(beanU2);

            new VentasDao().deleteSurtidores();

            for (int i = 1; i <= filas; i++) {
                for (int j = 1; j <= cols; j++) {
                    Ventas beanI = new Ventas();
                    beanI.setSurtNombre("Surtidor");
                    beanI.setMatrId(matr_id);
                    beanI.setSurtFila(i);
                    beanI.setSurtColumna(j);
                    beanI.setSurtEstado(true);
                    beanI.setSurtActivo(true);
                    new VentasDao().insertSurtidores(beanI);
                }
            }

            new VentasDao().deleteSurtidoresLados();

            List<Ventas> listSurt = new VentasDao().getSurtidores("");
            List<Ventas> listLados = new VentasDao().getLados("");
            listSurt.stream().forEach(s -> {
                listLados.stream().forEach(l -> {
                    Ventas beanL = new Ventas();
                    beanL.setSurtId(s.getSurtId());
                    beanL.setLadoId(l.getLadoId());
                    beanL.setSulaEstado(true);
                    beanL.setSulaActivo(true);
                    new VentasDao().insertSurtidoresLados(beanL);
                });
            });

            Ventas beanE = new Ventas();
            beanE.setCamaEstado(false);
            new VentasDao().updateCalleMatrizEstado(beanE);

            Ventas bean = new Ventas();
            bean.setCamaNombre("Nombre de la vía principal");
            bean.setCamaEstado(true);
            new VentasDao().insertCalleMatriz(bean);

            hm.put("success", true);
            hm.put("msg", "Se guardo el diseño de surtidores");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo guardar el diseño de surtidores");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_surtidores(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        try {

            Ventas beanU = new Ventas();
            beanU.setMatrEstado(false);
            new VentasDao().updateMatrizEstados(beanU);

            new VentasDao().deleteSurtidoresDetalle();
            new VentasDao().deleteSurtidoresLados();
            new VentasDao().deleteSurtidores();

            Ventas beanE = new Ventas();
            beanE.setCamaEstado(false);
            new VentasDao().updateCalleMatrizEstado(beanE);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el diseño de surtidores");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el diseño de surtidores");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void ventas_registro_inicio(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        List<Ventas> list = new VentasDao().getTurnoDiario("");

        if (list.isEmpty()) {
            hm.put("vacio", true);
            LocalDate ld = LocalDate.now();
            Date date = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
            hm.put("fecha", date);
        } else {
            hm.put("vacio", false);
            String query = " ORDER BY tudi_id DESC ";
            List<Ventas> listTurnoD = new VentasDao().getTurnoDiario(query);
            Boolean cerrado = listTurnoD.get(0).getTudiCierre();
            hm.put("cerrado", cerrado);
            /*if (cerrado) {
                String query1 = " WHERE (now()::time between turn_inicio and turn_fin) AND turn_inicio < turn_fin ";
                String query2 = " WHERE ((now()::time between turn_inicio AND '24:00:00'::time) OR (now()::time between '00:00:00'::time AND turn_fin)) AND turn_inicio > turn_fin ";
                List<Ventas> listTurnoHora = new VentasDao().getTurnoHora(query1, query2);
                hm.put("turn_id", listTurnoHora.get(0).getTurnId());
                hm.put("turn_nombre", listTurnoHora.get(0).getTurnNombre());
                hm.put("turn_inicio", listTurnoHora.get(0).getTurnInicio());
                hm.put("turn_fin", listTurnoHora.get(0).getTurnFin());
                LocalDate ld = LocalDate.now();
                Date date = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
                hm.put("fecha", date);
            } else {*/
            hm.put("tudi_id", listTurnoD.get(0).getTudiId());
            hm.put("turn_id", listTurnoD.get(0).getTurnId());
            String queryT = " WHERE turn_id = " + listTurnoD.get(0).getTurnId();
            List<TablasMaestras> listTurno = new TablasMaestrasDao().getTurnos(queryT);
            hm.put("turn_nombre", listTurno.get(0).getTurnNombre());
            hm.put("turn_inicio", listTurno.get(0).getTurnInicio());
            hm.put("turn_fin", listTurno.get(0).getTurnFin());
            hm.put("fecha", listTurnoD.get(0).getTudiFechaInicio());

            String queryLast = " WHERE tudi_cierre = true ORDER BY tudi_id DESC LIMIT 1 ";
            List<Ventas> listTurnoLast = new VentasDao().getTurnoDiario(queryLast);
            if (listTurnoLast.isEmpty()) {
                hm.put("estado", true);
                hm.put("turn_nombre_last", "Es la primera vez que hará Liquidación");
            } else {
                hm.put("estado", false);
                String queryTLast = " WHERE turn_id = " + listTurnoLast.get(0).getTurnId();
                List<TablasMaestras> listTurnLast = new TablasMaestrasDao().getTurnos(queryTLast);
                hm.put("turn_nombre_last", listTurnLast.get(0).getTurnNombre());
                hm.put("turn_inicio_last", listTurnLast.get(0).getTurnInicio());
                hm.put("turn_fin_last", listTurnLast.get(0).getTurnFin());
                hm.put("fecha_last", listTurnoLast.get(0).getTudiFechaInicio());
            }

            //}
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String tipo = request.getParameter("tipo");
        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));
        String[] trabIds = request.getParameterValues("trabIds");
        String[] surt_Ids = request.getParameterValues("surt_Ids");
        //String cltu_clave = request.getParameter("cltu_clave") == null ? "" : request.getParameter("cltu_clave");

        HashMap hm = new HashMap();

        String queryT = " WHERE turn_id = " + turn_id;
        List<TablasMaestras> listTurno = new TablasMaestrasDao().getTurnos(queryT);

        //String queryC = " WHERE cltu_activo = true ";
        //List<Usuario> listClaves = new UsuarioDao().getClaveTurnos(queryC);
        if (trabIds == null) {
            hm.put("success", false);
            hm.put("msg", "No ha seleccionado a ningún trabajador");
        } else {
            //if (cltu_clave.equals(listClaves.get(0).getCltuClave())) {
            try {
                Ventas bean = new Ventas();
                bean.setTurnId(turn_id);
                LocalDateTime ldt = LocalDateTime.now();
                bean.setTudiFechaInicio(Timestamp.valueOf(ldt));
                bean.setTudiInicio(true);
                bean.setCltuIdInicio(null);
                bean.setTudiFechaCierre(null);
                bean.setTudiCierre(false);
                bean.setCltuIdCierre(null);
                new VentasDao().insertTurnoDiario(bean);
                Integer nroTrab = Integer.parseInt(trabIds.length + "");
                for (int i = 0; i < nroTrab; i++) {
                    Ventas beanX = new Ventas();
                    beanX.setTudiId(bean.getTudiId());
                    beanX.setTrabId(Integer.parseInt(trabIds[i]));
                    new VentasDao().insertTurnoTrabajadores(beanX);
                }
                Integer nroSurt = Integer.parseInt(surt_Ids.length + "");
                for (int i = 0; i < nroSurt; i++) {
                    Ventas beanX = new Ventas();
                    beanX.setTudiId(bean.getTudiId());
                    beanX.setSurtId(Integer.parseInt(surt_Ids[i]));
                    beanX.setTusuMonto(null);
                    beanX.setTusuEntregado(null);
                    beanX.setTrabId(null);
                    new VentasDao().insertTurnoSurtidores(beanX);
                }
                if (tipo.equals("vacio")) {
                    String[] sude_Ids = request.getParameterValues("sude_id");
                    String[] sude_Lecturas = request.getParameterValues("sude_lectura_apertura");
                    Integer nroReg = Integer.parseInt(sude_Ids.length + "");
                    for (int j = 0; j < nroReg; j++) {
                        Ventas beanX = new Ventas();
                        beanX.setSudeId(Integer.parseInt(sude_Ids[j]));
                        beanX.setSudeLecturaApertura(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                        LocalDateTime ldtx = LocalDateTime.now();
                        beanX.setSudeFechaLectura(Timestamp.valueOf(ldtx));
                        beanX.setSudeLecturaEstado(true);
                        new VentasDao().updateSurtidoresDetalleApertura(beanX);
                        Ventas beanY = new Ventas();
                        beanY.setTudiId(bean.getTudiId());
                        beanY.setSudeId(Integer.parseInt(sude_Ids[j]));
                        beanY.setLediLecturaInicial(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                        beanY.setLediLecturaFinal(null);
                        new VentasDao().insertLecturaDiaria(beanY);
                    }
                }
                if (tipo.equals("nuevo")) {

                    String[] sude_Ids = request.getParameterValues("sude_id");
                    String[] sude_Lecturas = request.getParameterValues("sude_lectura_apertura");
                    if (sude_Ids == null || sude_Ids.length < 1) {
                        System.out.println("nulo o vacio");
                    } else {
                        Integer nroReg = Integer.parseInt(sude_Ids.length + "");
                        for (int j = 0; j < nroReg; j++) {
                            Ventas beanX = new Ventas();
                            beanX.setSudeId(Integer.parseInt(sude_Ids[j]));
                            beanX.setSudeLecturaApertura(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                            LocalDateTime ldtx = LocalDateTime.now();
                            beanX.setSudeFechaLectura(Timestamp.valueOf(ldtx));
                            beanX.setSudeLecturaEstado(true);
                            new VentasDao().updateSurtidoresDetalleApertura(beanX);
                        }
                    }
                    String query1 = " SELECT tudi_id FROM ventas.lectura_diaria GROUP BY tudi_id ORDER BY tudi_id DESC LIMIT 1 ";
                    String query2 = " WHERE a.sude_estado = true AND a.sude_lectura_estado = true ORDER BY sude_id ASC ";
                    List<Ventas> listSurtiActivos = new VentasDao().getSurtidoresDetalleLectura(query1, query2);
                    listSurtiActivos.stream().forEach(t -> {
                        Ventas beanY = new Ventas();
                        beanY.setTudiId(bean.getTudiId());
                        beanY.setSudeId(t.getSudeId());
                        beanY.setLediLecturaInicial(t.getLediLecturaFinal());
                        beanY.setLediLecturaFinal(null);
                        new VentasDao().insertLecturaDiaria(beanY);
                    });
                }
                hm.put("success", true);
                hm.put("tudi_id", bean.getTudiId());
                hm.put("turn_id", turn_id);
                hm.put("turn_nombre", listTurno.get(0).getTurnNombre());
                hm.put("turn_inicio", listTurno.get(0).getTurnInicio());
                hm.put("turn_fin", listTurno.get(0).getTurnFin());
                LocalDate ld = LocalDate.now();
                Date date = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
                hm.put("fecha", date);
            } catch (NumberFormatException e) {
                hm.put("success", false);
                hm.put("msg", "No se pudo iniciar el turno, intente nuevamente");
            }
            //} else {
            //    hm.put("success", false);
            //    hm.put("msg", "La clave de autorización es incorrecta");
            //}
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void registrar_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha = request.getParameter("fecha") == null ? "" : request.getParameter("fecha").trim();
        String tipo = request.getParameter("tipo");
        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));
        String[] trabIds = request.getParameterValues("trabIds");
        String[] surt_Ids = request.getParameterValues("surt_Ids");

        HashMap hm = new HashMap();

        String queryT = " WHERE turn_id = " + turn_id;
        List<TablasMaestras> listTurno = new TablasMaestrasDao().getTurnos(queryT);

        //String queryC = " WHERE cltu_activo = true ";
        //List<Usuario> listClaves = new UsuarioDao().getClaveTurnos(queryC);
        if (trabIds == null) {
            hm.put("success", false);
            hm.put("msg", "No ha seleccionado a ningún trabajador");
        } else {
            try {
                Ventas bean = new Ventas();
                bean.setTurnId(turn_id);

                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                Date parsedFecha = dateFormat.parse(fecha);
                Timestamp ts = new Timestamp(parsedFecha.getTime());
                bean.setTudiFechaInicio(ts);
                bean.setTudiInicio(true);
                bean.setCltuIdInicio(null);
                bean.setTudiFechaCierre(null);
                bean.setTudiCierre(false);
                bean.setCltuIdCierre(null);
                new VentasDao().insertTurnoDiario(bean);
                Integer nroTrab = Integer.parseInt(trabIds.length + "");
                for (int i = 0; i < nroTrab; i++) {
                    Ventas beanX = new Ventas();
                    beanX.setTudiId(bean.getTudiId());
                    beanX.setTrabId(Integer.parseInt(trabIds[i]));
                    new VentasDao().insertTurnoTrabajadores(beanX);
                }
                Integer nroSurt = Integer.parseInt(surt_Ids.length + "");
                for (int i = 0; i < nroSurt; i++) {
                    Ventas beanX = new Ventas();
                    beanX.setTudiId(bean.getTudiId());
                    beanX.setSurtId(Integer.parseInt(surt_Ids[i]));
                    beanX.setTusuMonto(null);
                    beanX.setTusuEntregado(null);
                    beanX.setTrabId(null);
                    new VentasDao().insertTurnoSurtidores(beanX);
                }
                if (tipo.equals("vacio")) {
                    String[] sude_Ids = request.getParameterValues("sude_id");
                    String[] sude_Lecturas = request.getParameterValues("sude_lectura_apertura");
                    Integer nroReg = Integer.parseInt(sude_Ids.length + "");
                    for (int j = 0; j < nroReg; j++) {
                        Ventas beanX = new Ventas();
                        beanX.setSudeId(Integer.parseInt(sude_Ids[j]));
                        beanX.setSudeLecturaApertura(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                        LocalDateTime ldtx = LocalDateTime.now();
                        beanX.setSudeFechaLectura(Timestamp.valueOf(ldtx));
                        beanX.setSudeLecturaEstado(true);
                        new VentasDao().updateSurtidoresDetalleApertura(beanX);
                        Ventas beanY = new Ventas();
                        beanY.setTudiId(bean.getTudiId());
                        beanY.setSudeId(Integer.parseInt(sude_Ids[j]));
                        beanY.setLediLecturaInicial(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                        beanY.setLediLecturaFinal(null);
                        new VentasDao().insertLecturaDiaria(beanY);
                    }
                }
                if (tipo.equals("nuevo")) {

                    String[] sude_Ids = request.getParameterValues("sude_id");
                    String[] sude_Lecturas = request.getParameterValues("sude_lectura_apertura");
                    if (sude_Ids == null || sude_Ids.length < 1) {
                        System.out.println("nulo o vacio");
                    } else {
                        Integer nroReg = Integer.parseInt(sude_Ids.length + "");
                        for (int j = 0; j < nroReg; j++) {
                            Ventas beanX = new Ventas();
                            beanX.setSudeId(Integer.parseInt(sude_Ids[j]));
                            beanX.setSudeLecturaApertura(new BigDecimal(sude_Lecturas[j].replaceAll("\\s", "").trim()));
                            LocalDateTime ldtx = LocalDateTime.now();
                            beanX.setSudeFechaLectura(Timestamp.valueOf(ldtx));
                            beanX.setSudeLecturaEstado(true);
                            new VentasDao().updateSurtidoresDetalleApertura(beanX);
                        }
                    }
                    String query1 = " SELECT tudi_id FROM ventas.lectura_diaria GROUP BY tudi_id ORDER BY tudi_id DESC LIMIT 1 ";
                    String query2 = " WHERE a.sude_estado = true AND a.sude_lectura_estado = true ORDER BY sude_id ASC ";
                    List<Ventas> listSurtiActivos = new VentasDao().getSurtidoresDetalleLectura(query1, query2);
                    listSurtiActivos.stream().forEach(t -> {
                        Ventas beanY = new Ventas();
                        beanY.setTudiId(bean.getTudiId());
                        beanY.setSudeId(t.getSudeId());
                        beanY.setLediLecturaInicial(t.getLediLecturaFinal());
                        beanY.setLediLecturaFinal(null);
                        new VentasDao().insertLecturaDiaria(beanY);
                    });
                }
                hm.put("success", true);
                hm.put("tudi_id", bean.getTudiId());
                hm.put("turn_id", turn_id);
                hm.put("turn_nombre", listTurno.get(0).getTurnNombre());
                hm.put("turn_inicio", listTurno.get(0).getTurnInicio());
                hm.put("turn_fin", listTurno.get(0).getTurnFin());
                LocalDate ld = LocalDate.now();
                Date date = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
                hm.put("fecha", date);
            } catch (NumberFormatException | ParseException ex) {
                hm.put("success", false);
                hm.put("msg", "No se pudo iniciar el turno, intente nuevamente");
                Logger.getLogger(VentasServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void remover_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        Ventas bean = new Ventas();
        bean.setTudiId(tudi_id);
        new VentasDao().removerLecturaDiariaTurno(bean);
        new VentasDao().removerLecturaProductoTurno(bean);
        new VentasDao().removerSurtidoresTurno(bean);
        new VentasDao().removerTrabajadoresTurno(bean);
        new VentasDao().removerDevolucionTanqueTurno(bean);
        String query = " WHERE tudi_id = " + tudi_id;
        List<Ventas> listG = new VentasDao().selectGastoTurno(query);
        new VentasDao().removerGastoTurno(bean);
        listG.stream().forEach(g -> {
            Ventas beanG = new Ventas();
            beanG.setGadiId(g.getGadiId());
            new VentasDao().removerGastoDiarioTurno(beanG);
        });
        List<Ventas> listI = new VentasDao().selectIngresoTurno(query);
        new VentasDao().removerIngresoTurno(bean);
        listI.stream().forEach(i -> {
            Ventas beanI = new Ventas();
            beanI.setIndiId(i.getIndiId());
            new VentasDao().removerIngresoDiarioTurno(beanI);
        });
        new VentasDao().removerDiarioTurno(bean);

        HashMap hm = new HashMap();

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_trabajadores_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        String query = " WHERE a.tudi_id = " + tudi_id + " ORDER BY b.trab_nombres, b.trab_apellido_paterno, b.trab_apellido_materno ASC ";
        List<Ventas> listTrabajadoresTurno = new VentasDao().getTrabajadoresTurno(query);

        HashMap hm = new HashMap();

        hm.put("listTrabajadoresTurno", listTrabajadoresTurno);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_surtidores_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        String query = " WHERE a.tudi_id = " + tudi_id + " ORDER BY a.surt_id ASC ";
        List<Ventas> listSurtidores = new VentasDao().getSurtidoresTurno(query);

        HashMap hm = new HashMap();
        hm.put("listSurtidores", listSurtidores);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_surtidores_matriz(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer matr_id = Integer.parseInt(request.getParameter("matr_id"));

        HashMap hm = new HashMap();

        String query = " WHERE matr_id = " + matr_id;
        List<Ventas> listMatriz = new VentasDao().getMatriz(query);
        int filas = listMatriz.get(0).getMatrFilas();
        int cols = listMatriz.get(0).getMatrColumnas();
        String queryS = " WHERE surt_estado = true ORDER BY surt_id ASC ";
        List<Ventas> listSurtidores = new VentasDao().getSurtidores(queryS);

        hm.put("listSurtidores", listSurtidores);
        hm.put("estado", listSurtidores.isEmpty());
        hm.put("filas", filas);
        hm.put("cols", cols);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_lados_surtidor(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));

        HashMap hm = new HashMap();

        String query = " WHERE a.surt_id = " + surt_id + " AND a.sude_estado = true GROUP BY a.surt_id, a.lado_id, b.lado_nombre ORDER BY a.lado_id ASC ";
        List<Ventas> listLadosSurtidor = new VentasDao().getLadosSurtidor(query);

        hm.put("listLadosSurtidor", listLadosSurtidor);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_productos_lado_surtidor(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer lado_id = Integer.parseInt(request.getParameter("lado_id"));

        HashMap hm = new HashMap();

        String query = " WHERE a.surt_id = " + surt_id + " AND a.lado_id = " + lado_id + " AND a.sude_estado = true ORDER BY b.prod_nombre ASC ";
        List<Ventas> listProductosLadoSurtidor = new VentasDao().getProductosLadoSurtidor(query);

        hm.put("listProductosLadoSurtidor", listProductosLadoSurtidor);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_registro_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        List<Facturacion> listIgv = new FacturacionDao().getIgv("");

        hm.put("igv_nombre", listIgv.get(0).getIgvNombre());
        hm.put("igv_abreviatura", listIgv.get(0).getIgvAbreviatura());
        hm.put("igv_porcentaje", listIgv.get(0).getIgvPorcentaje());
        hm.put("igv_estado", listIgv.get(0).getIgvEstado());

        try {
            Ventas bean = new Ventas();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setReveFechaHora(Timestamp.valueOf(ldt));
            bean.setReveEstado("borrador");
            bean.setReveEnvioOse("pendiente");
            bean.setReveEnvioError(null);
            new VentasDao().insertRegistroVenta(bean);
            hm.put("reve_id", bean.getReveId());
            hm.put("success", true);

        } catch (NumberFormatException e) {
            hm.put("success", false);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_registro_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));

        String reve_documento = request.getParameter("reve_documento") == null ? "" : request.getParameter("reve_documento");
        String reve_nombres = request.getParameter("reve_nombres") == null ? "" : request.getParameter("reve_nombres");
        String reve_direccion = request.getParameter("reve_direccion") == null ? "" : request.getParameter("reve_direccion");
        String reve_chofer = request.getParameter("reve_chofer") == null ? "" : request.getParameter("reve_chofer");
        String reve_placa = request.getParameter("reve_placa") == null ? "" : request.getParameter("reve_placa");
        String reve_kilometraje = request.getParameter("reve_kilometraje") == null ? "" : request.getParameter("reve_kilometraje");
        Boolean reve_igv = request.getParameter("reve_igv") != null;
        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer trab_id = Integer.parseInt(request.getParameter("trab_id"));
        Integer tiem_id = Integer.parseInt(request.getParameter("tiem_id"));
        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));
        Integer ticl_id = Integer.parseInt(request.getParameter("ticl_id"));
        Integer tido_id = Integer.parseInt(request.getParameter("tido_id"));

        HashMap hm = new HashMap();

        try {
            Ventas bean = new Ventas();
            bean.setReveId(reve_id);
            LocalDateTime ldt = LocalDateTime.now();
            bean.setReveFechaHora(Timestamp.valueOf(ldt));
            bean.setReveDocumento(reve_documento);
            bean.setReveNombres(reve_nombres);
            bean.setReveDireccion(reve_direccion);
            bean.setReveChofer(reve_chofer);
            bean.setRevePlaca(reve_placa);
            if (reve_kilometraje.equals("")) {
                bean.setReveKilometraje(null);
            } else {
                bean.setReveKilometraje(new BigDecimal(reve_kilometraje.replaceAll("\\s", "").trim()));
            }
            bean.setReveIgv(reve_igv);
            bean.setReveEstado("emitido");
            bean.setTudiId(tudi_id);
            bean.setTrabId(trab_id);
            bean.setTiemId(tiem_id);
            bean.setTiveId(tive_id);
            hm.put("tive_id", tive_id);
            // Si la venta fue al contado
            if (tive_id == 1) {
                bean.setReveCuotasCredito(null);
                bean.setReveMontoCredito(null);
                bean.setReveFechaVencimientoCredito(null);
            }
            // Si la venta fue al crédito
            if (tive_id == 2) {
                Integer period_credito = Integer.parseInt(request.getParameter("period_credito"));
                Integer cuotas_credito = Integer.parseInt(request.getParameter("cuotas_credito"));
                String monto_credito = request.getParameter("monto_credito") == null ? "" : request.getParameter("monto_credito");
                String monto_credito_ = request.getParameter("monto_credito_") == null ? "" : request.getParameter("monto_credito_");
                String fecha_credito = request.getParameter("fecha_credito") == null ? "" : request.getParameter("fecha_credito");
                bean.setRevePeriodoCredito(period_credito);
                bean.setReveCuotasCredito(cuotas_credito);
                bean.setReveMontoCredito(new BigDecimal(monto_credito_));
                bean.setReveFechaVencimientoCredito(fecha_credito);
                hm.put("period_credito", period_credito);
                hm.put("cuotas_credito", cuotas_credito);
                hm.put("monto_credito", monto_credito);
                hm.put("fecha_credito", fecha_credito);
            }
            bean.setTiclId(ticl_id);
            bean.setTidoId(tido_id);

            hm.put("reve_id", reve_id);

            String queryEmis = " WHERE a.tiem_id = " + tiem_id;
            List<Ventas> listEmision = new VentasDao().getTiposEmision(queryEmis);
            String tipo_comp = listEmision.get(0).getTicoSunat();
            hm.put("tipo_comp", tipo_comp);

            String queryReg = " WHERE a.tiem_id = " + tiem_id + " AND a.reve_estado = 'borrador_anulado' ORDER BY a.reve_nro_comprobante ASC ";
            List<Ventas> listReg = new VentasDao().getRegistroVenta(queryReg);

            String queryCorr = " WHERE a.tiem_id = " + tiem_id;
            List<Ventas> listCorrelativo = new VentasDao().getCorrelativoEmision(queryCorr);
            String comprobante;
            int correl = 0;
            String correlFormat;
            String serie;
            String emision = listCorrelativo.get(0).getTiemNombre();

            int longitud = listCorrelativo.get(0).getCoemLongitud();
            bean.setCoemLongitud(longitud);

            if (listReg.isEmpty()) {
                String sigla = listCorrelativo.get(0).getCoemSigla();
                String sede = listCorrelativo.get(0).getCoemSede();
                correl = listCorrelativo.get(0).getCoemCorrelativo();
                correlFormat = devolverCorrelativo(correl, longitud);
                serie = sigla + sede;
                comprobante = sigla + sede + "-" + correl;
                bean.setReveNroComprobante(comprobante);
            } else {
                comprobante = listReg.get(0).getReveNroComprobante();
                String[] arrayComprobante = comprobante.split("-");
                serie = arrayComprobante[0];
                correl = Integer.parseInt(arrayComprobante[1]);
                correlFormat = devolverCorrelativo(correl, longitud);
                bean.setReveNroComprobante(comprobante);
            }

            hm.put("emision_nombre", emision);
            hm.put("emision_serie", serie);
            hm.put("emision_correlFormat", correlFormat);

            List<Facturacion> listOse = new FacturacionDao().getOse("");
            hm.put("ose_url", listOse.get(0).getOseUrlConsulta());
            hm.put("ose_resolucion", listOse.get(0).getOseResolucion());

            List<Usuario> listEmpresa = new UsuarioDao().getDatosEmpresa();
            String empr_ruc = listEmpresa.get(0).getEmprRuc();
            String empr_url_logo = listEmpresa.get(0).getEmprUrlLogo();
            String empr_logo_tipo = listEmpresa.get(0).getEmprLogoTipo();
            hm.put("empr_ruc", empr_ruc);
            hm.put("empr_razon_social", listEmpresa.get(0).getEmprRazonSocial().toUpperCase());
            hm.put("empr_direccion", listEmpresa.get(0).getEmprDireccion().toUpperCase());
            hm.put("empr_url_logo", empr_url_logo);
            hm.put("empr_logo_tipo", empr_logo_tipo);

            String queryMone = " WHERE mone_estado = true ";
            List<Facturacion> listMoneda = new FacturacionDao().getMoneda(queryMone);
            hm.put("mone_nombreP", listMoneda.get(0).getMoneNombrePlural());
            hm.put("mone_nombreS", listMoneda.get(0).getMoneNombreSingular());
            hm.put("mone_abreviatura", listMoneda.get(0).getMoneAbreviatura());

            List<Facturacion> listIgv = new FacturacionDao().getIgv("");
            String igv_abreviatura = listIgv.get(0).getIgvAbreviatura();
            BigDecimal igv_porcentaje = listIgv.get(0).getIgvPorcentaje();
            Boolean igv_estado = listIgv.get(0).getIgvEstado();
            BigDecimal tasaIgv = (igv_porcentaje.divide(new BigDecimal(100), 4)).add(new BigDecimal(1));

            hm.put("igv_abreviatura", igv_abreviatura);
            hm.put("igv_porcentaje", igv_porcentaje);
            hm.put("igv_estado", igv_estado);
            hm.put("tasaIgv", tasaIgv);

            String formatoXML = empr_ruc + "-" + tipo_comp + "-" + serie + "-" + correl + ".XML";
            byte[] encodedBytes = Base64.getEncoder().encode(formatoXML.getBytes());
            String codigo_hash = new String(encodedBytes);
            hm.put("codigo_hash", codigo_hash);

            String queryTigv = " WHERE tigv_estado = true ";
            List<Facturacion> listTipoIgv = new FacturacionDao().getTipoIgv(queryTigv);
            String tipo_igv_nombre = listTipoIgv.get(0).getTigvNombre();
            String tipo_igv = "";
            if (tipo_igv_nombre.toLowerCase().contains("gravado")) {
                tipo_igv = "OP. GRAVADA";
            }
            if (tipo_igv_nombre.toLowerCase().contains("exonerado")) {
                tipo_igv = "OP. EXONERADA";
            }
            if (tipo_igv_nombre.toLowerCase().contains("inafecto")) {
                tipo_igv = "OP. INAFECTA";
            }
            if (tipo_igv_nombre.toLowerCase().contains("exportación")) {
                tipo_igv = "OP. GRATUITA";
            }
            hm.put("tipo_igv", tipo_igv);

            String query = " WHERE reve_id =" + reve_id;
            List<Ventas> list = new VentasDao().getRegistroVentaDetalle(query);

            if (list.isEmpty()) {
                hm.put("success", false);
                hm.put("msg", "No se ha registrado ningun consumo");
            } else {
                if (reve_nombres.equals("")) {
                    hm.put("success", false);
                    if (ticl_id == 1) {
                        hm.put("msg", "No se ha ingresado nombres del cliente");
                    }
                    if (ticl_id == 2) {
                        hm.put("msg", "No se ha ingresado razón social del cliente");
                    }
                } else {
                    String queryDoc = " WHERE tido_id = " + tido_id;
                    List<Ventas> listDoc = new VentasDao().getTiposDocumento(queryDoc);
                    String tido_nombre = listDoc.get(0).getTidoNombre();
                    Integer tido_caracteres = listDoc.get(0).getTidoCaracteres();
                    hm.put("clie_documento_lbl", tido_nombre);
                    if (reve_documento.equals("")) {

                        BigDecimal monto = BigDecimal.ZERO;
                        for (Ventas data : list) {
                            monto = monto.add(data.getRevdMonto());
                        }
                        int res = monto.compareTo(new BigDecimal("700"));

                        if (tiem_id == 1 && res == 1) { // monto > 700
                            hm.put("success", false);
                            hm.put("msg", "La emisión es una Boleta que ha superado el monto de los 700 Soles. "
                                    + " Debe ingresar obligatoriamente el número de documento y nombre de cliente.");
                        } else {
                            new VentasDao().updateRegistroVenta(bean);

                            if (listReg.isEmpty()) {
                                Ventas beanCorr = new Ventas();
                                beanCorr.setTiemId(tiem_id);
                                beanCorr.setCoemCorrelativo(correl + 1);
                                new VentasDao().updateCorrelativoEmisionNumero(beanCorr);
                            } else {
                                if (!Objects.equals(listReg.get(0).getReveId(), reve_id)) {
                                    Ventas beanA = new Ventas();
                                    beanA.setReveId(listReg.get(0).getReveId());
                                    LocalDateTime ldtA = LocalDateTime.now();
                                    beanA.setReveFechaHora(Timestamp.valueOf(ldtA));
                                    beanA.setReveEstado("anulado");
                                    new VentasDao().updateRegistroVentaEstado(beanA);
                                }
                            }

                            hm.put("fecha_emision", bean.getReveFechaHora());

                            hm.put("tipo_doc", "-");
                            hm.put("clie_nombre", bean.getReveNombres());
                            hm.put("clie_documento", "");
                            hm.put("clie_documento_hash", "-");
                            hm.put("clie_direccion", bean.getReveDireccion());
                            hm.put("clie_placa", bean.getRevePlaca());
                            hm.put("clie_chofer", bean.getReveChofer());
                            hm.put("clie_kilometraje", bean.getReveKilometraje());

                            hm.put("list", list);

                            hm.put("success", true);
                            hm.put("msg", "Se emitió correctamente el registro de venta");
                        }

                    } else {

                        if (reve_documento.length() > 0 && reve_documento.length() < tido_caracteres) {
                            BigDecimal monto = BigDecimal.ZERO;
                            for (Ventas data : list) {
                                monto = monto.add(data.getRevdMonto());
                            }
                            int res = monto.compareTo(new BigDecimal("700"));

                            if (tiem_id == 1 && res == 1) { // monto > 700
                                hm.put("success", false);
                                hm.put("msg", "La emisión es una Boleta que ha superado el monto de los 700 Soles. "
                                        + " El " + tido_nombre + " debe tener " + tido_caracteres + " digitos, "
                                        + "ingreselos correctamente.");
                            } else {
                                hm.put("success", false);
                                hm.put("msg", "El " + tido_nombre + " debe tener " + tido_caracteres + " digitos");
                            }
                        } else {
                            new VentasDao().updateRegistroVenta(bean);

                            if (listReg.isEmpty()) {
                                Ventas beanCorr = new Ventas();
                                beanCorr.setTiemId(tiem_id);
                                beanCorr.setCoemCorrelativo(correl + 1);
                                new VentasDao().updateCorrelativoEmisionNumero(beanCorr);
                            } else {
                                if (!Objects.equals(listReg.get(0).getReveId(), reve_id)) {
                                    Ventas beanA = new Ventas();
                                    beanA.setReveId(listReg.get(0).getReveId());
                                    LocalDateTime ldtA = LocalDateTime.now();
                                    beanA.setReveFechaHora(Timestamp.valueOf(ldtA));
                                    beanA.setReveEstado("anulado");
                                    new VentasDao().updateRegistroVentaEstado(beanA);
                                }
                            }

                            hm.put("fecha_emision", bean.getReveFechaHora());

                            hm.put("tipo_doc", listDoc.get(0).getTidoOse());
                            hm.put("clie_nombre", bean.getReveNombres());
                            hm.put("clie_documento", bean.getReveDocumento());
                            hm.put("clie_documento_hash", bean.getReveDocumento());
                            hm.put("clie_direccion", bean.getReveDireccion());
                            hm.put("clie_placa", bean.getRevePlaca());
                            hm.put("clie_chofer", bean.getReveChofer());
                            hm.put("clie_kilometraje", bean.getReveKilometraje());

                            hm.put("list", list);

                            hm.put("success", true);
                            hm.put("msg", "Se emitió correctamente el registro de venta");
                        }
                    }

                }

            }
        } catch (NumberFormatException e) {
            System.out.println(e);
            hm.put("success", false);
            hm.put("msg", "No se pudo emitir el registro de venta. Intente Nuevamente!!");
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void anular_registro_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));

        HashMap hm = new HashMap();

        try {
            Ventas beanA = new Ventas();
            beanA.setReveId(reve_id);
            LocalDateTime ldtA = LocalDateTime.now();
            beanA.setReveFechaHora(Timestamp.valueOf(ldtA));
            beanA.setReveEstado("anulado");
            new VentasDao().updateRegistroVentaEstado(beanA);

            String queryReg = " WHERE a.reve_id = " + reve_id;
            List<Ventas> listReg = new VentasDao().getRegistroVenta(queryReg);

            Ventas beanI = new Ventas();
            LocalDateTime ldtI = LocalDateTime.now();
            beanI.setReveFechaHora(Timestamp.valueOf(ldtI));
            beanI.setReveEstado("borrador_anulado");
            beanI.setTiemId(listReg.get(0).getTiemId());
            beanI.setReveNroComprobante(listReg.get(0).getReveNroComprobante());
            beanI.setReveEnvioOse("pendiente");
            beanI.setReveEnvioError(null);
            new VentasDao().insertRegistroVenta(beanI);
            Integer new_reve_id = beanI.getReveId();

            String queryU = " WHERE reve_id =" + reve_id;
            List<Ventas> listU = new VentasDao().getRegistroVentaDetalle(queryU);
            listU.stream().forEach(t -> {
                Ventas beanU = new Ventas();
                beanU.setRevdSurtidor(t.getRevdSurtidor());
                beanU.setRevdLado(t.getRevdLado());
                beanU.setRevdProducto(t.getRevdProducto());
                beanU.setRevdPrecioUnitario(t.getRevdPrecioUnitario());
                beanU.setRevdDescuentoPrecio(t.getRevdDescuentoPrecio());
                beanU.setRevdUnidadMedida(t.getRevdUnidadMedida());
                beanU.setRevdUnidadMedidaSimbolo(t.getRevdUnidadMedidaSimbolo());
                beanU.setRevdCantidad(t.getRevdCantidad());
                beanU.setRevdMonto(t.getRevdMonto());
                beanU.setReveId(new_reve_id);
                beanU.setRevdOpGravada(t.getRevdOpGravada());
                beanU.setRevdOpInafecta(t.getRevdOpInafecta());
                beanU.setRevdOpExonerada(t.getRevdOpExonerada());
                beanU.setRevdOpGratuita(t.getRevdOpGratuita());
                beanU.setRevdUnidadMedidaOse(t.getRevdUnidadMedidaOse());
                beanU.setTigvId(t.getTigvId());
                beanU.setProdCodigoSunat(t.getProdCodigoSunat());
                beanU.setProdId(t.getProdId());
                new VentasDao().insertRegistroVentaDetalle(beanU);
            });

            hm.put("new_reve_id", new_reve_id);
            String query = " WHERE reve_id = " + new_reve_id + " ORDER BY revd_id ASC";
            List<Ventas> listRegistroVentaDetalle = new VentasDao().getRegistroVentaDetalle(query);
            if (listRegistroVentaDetalle.isEmpty()) {
                hm.put("vacio", true);
            } else {
                hm.put("vacio", false);
                hm.put("listRegistroVentaDetalle", listRegistroVentaDetalle);
            }

            hm.put("success", true);
            hm.put("msg", "Se anuló correctamente el registro de venta");
        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo anular el registro de venta. Intente Nuevamente!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void nuevo_registro_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer turn_id = Integer.parseInt(request.getParameter("turn_id"));

        HashMap hm = new HashMap();

        String queryT = " WHERE turn_id = " + turn_id;
        List<TablasMaestras> listTurno = new TablasMaestrasDao().getTurnos(queryT);

        hm.put("tudi_id", tudi_id);
        hm.put("turn_id", turn_id);
        hm.put("turn_nombre", listTurno.get(0).getTurnNombre());
        hm.put("turn_inicio", listTurno.get(0).getTurnInicio());
        hm.put("turn_fin", listTurno.get(0).getTurnFin());
        LocalDate ld = LocalDate.now();
        Date date = Date.from(ld.atStartOfDay(ZoneId.systemDefault()).toInstant());
        hm.put("fecha", date);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_registro_venta_detalle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));
        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
        String revd_precio_unitario = request.getParameter("revd_precio_unitario") == null ? "" : request.getParameter("revd_precio_unitario");
        String revd_descuento_precio = request.getParameter("revd_descuento_precio") == null ? "" : request.getParameter("revd_descuento_precio");
        String revd_cantidad = request.getParameter("revd_cantidad") == null ? "" : request.getParameter("revd_cantidad");
        String revd_monto = request.getParameter("revd_monto") == null ? "" : request.getParameter("revd_monto");

        HashMap hm = new HashMap();

        String queryProd = " WHERE a.prod_id = " + prod_id;
        List<TablasMaestras> listProd = new TablasMaestrasDao().getProductos(queryProd);
        String prod_codigo_sunat = listProd.get(0).getProdCodigoSunat();

        List<Facturacion> listIgv = new FacturacionDao().getIgv("");
        BigDecimal igv_porcentaje = listIgv.get(0).getIgvPorcentaje();
        Boolean igv_estado = listIgv.get(0).getIgvEstado();

        String queryTigv = " WHERE tigv_estado = true ";
        List<Facturacion> listTipoIgv = new FacturacionDao().getTipoIgv(queryTigv);
        String tipo_igv_nombre = listTipoIgv.get(0).getTigvNombre();
        Integer tipo_igv_id = listTipoIgv.get(0).getTigvId();

        try {

            if (revd_precio_unitario.equals("")) {
                hm.put("success", false);
                hm.put("msg", "El precio unitario de venta no está registrado");
            } else {
                if (revd_cantidad.equals("") || revd_monto.equals("")) {
                    if (revd_cantidad.equals("") && revd_monto.equals("")) {
                        hm.put("success", false);
                        hm.put("msg", "No ha ingresado ni la cantidad ni el monto");
                    } else {
                        if (revd_monto.equals("")) {
                            hm.put("success", false);
                            hm.put("msg", "No ha ingresado el monto");
                        }
                        if (revd_cantidad.equals("")) {
                            hm.put("success", false);
                            hm.put("msg", "No ha ingresado la cantidad");
                        }
                    }
                } else {
                    Ventas bean = new Ventas();
                    bean.setRevdSurtidor(null);
                    bean.setRevdLado(null);
                    bean.setRevdProducto(listProd.get(0).getProdDescripcion() + " (" + listProd.get(0).getProdNombre() + ")");
                    if (revd_precio_unitario.equals("")) {
                        bean.setRevdPrecioUnitario(null);
                    } else {
                        bean.setRevdPrecioUnitario(new BigDecimal(revd_precio_unitario.replaceAll("\\s", "").trim()));
                    }
                    if (revd_descuento_precio.equals("")) {
                        bean.setRevdDescuentoPrecio(null);
                    } else {
                        bean.setRevdDescuentoPrecio(new BigDecimal(revd_descuento_precio.replaceAll("\\s", "").trim()));
                    }
                    bean.setRevdUnidadMedida(listProd.get(0).getUnmeNombre());
                    bean.setRevdUnidadMedidaSimbolo(listProd.get(0).getUnmeSimbolo());
                    if (revd_cantidad.equals("")) {
                        bean.setRevdCantidad(null);
                    } else {
                        bean.setRevdCantidad(new BigDecimal(revd_cantidad.replaceAll("\\s", "").trim()));
                    }
                    if (revd_monto.equals("")) {
                        bean.setRevdMonto(null);
                    } else {
                        bean.setRevdMonto(new BigDecimal(revd_monto.replaceAll("\\s", "").trim()));
                    }
                    bean.setReveId(reve_id);
                    BigDecimal tasaIgv = (igv_porcentaje.divide(new BigDecimal(100), 4, RoundingMode.CEILING)).add(new BigDecimal(1));
                    if (tipo_igv_nombre.toLowerCase().contains("gravado")) {
                        if (revd_monto.equals("")) {
                            bean.setRevdOpGravada(null);
                        } else {
                            BigDecimal gravada = new BigDecimal(revd_monto.replaceAll("\\s", "").trim());
                            if (igv_estado) {

                                bean.setRevdOpGravada(gravada.divide(tasaIgv, 4, RoundingMode.CEILING));
                            } else {
                                bean.setRevdOpGravada(gravada);
                            }
                        }
                    } else {
                        bean.setRevdOpGravada(null);
                    }
                    if (tipo_igv_nombre.toLowerCase().contains("exonerado")) {
                        if (revd_monto.equals("")) {
                            bean.setRevdOpExonerada(null);
                        } else {
                            BigDecimal exonerada = new BigDecimal(revd_monto.replaceAll("\\s", "").trim());
                            if (igv_estado) {
                                bean.setRevdOpExonerada(exonerada.divide(tasaIgv, 4, RoundingMode.CEILING));
                            } else {
                                bean.setRevdOpExonerada(exonerada);
                            }
                        }
                    } else {
                        bean.setRevdOpExonerada(null);
                    }
                    if (tipo_igv_nombre.toLowerCase().contains("inafecto")) {
                        if (revd_monto.equals("")) {
                            bean.setRevdOpInafecta(null);
                        } else {
                            BigDecimal inafecta = new BigDecimal(revd_monto.replaceAll("\\s", "").trim());
                            if (igv_estado) {
                                bean.setRevdOpInafecta(inafecta.divide(tasaIgv, 4, RoundingMode.CEILING));
                            } else {
                                bean.setRevdOpInafecta(inafecta);
                            }
                        }
                    } else {
                        bean.setRevdOpInafecta(null);
                    }
                    if (tipo_igv_nombre.toLowerCase().contains("exportación")) {
                        if (revd_monto.equals("")) {
                            bean.setRevdOpGratuita(null);
                        } else {
                            BigDecimal gratuita = new BigDecimal(revd_monto.replaceAll("\\s", "").trim());
                            if (igv_estado) {
                                bean.setRevdOpGratuita(gratuita.divide(tasaIgv, 4, RoundingMode.CEILING));
                            } else {
                                bean.setRevdOpGratuita(gratuita);
                            }
                        }
                    } else {
                        bean.setRevdOpGratuita(null);
                    }
                    bean.setRevdUnidadMedidaOse(listProd.get(0).getUnmeOse());
                    bean.setTigvId(tipo_igv_id);
                    bean.setProdCodigoSunat(prod_codigo_sunat);
                    bean.setProdId(prod_id);
                    bean.setServId(null);

                    new VentasDao().insertRegistroVentaDetalle(bean);

                    String query = " WHERE reve_id = " + reve_id + " ORDER BY revd_id ASC";
                    List<Ventas> listRegistroVentaDetalle = new VentasDao().getRegistroVentaDetalle(query);

                    if (listRegistroVentaDetalle.isEmpty()) {
                        hm.put("vacio", true);
                    } else {
                        hm.put("vacio", false);
                        hm.put("listRegistroVentaDetalle", listRegistroVentaDetalle);
                        hm.put("igvEstado", igv_estado);
                        hm.put("tasaIgv", tasaIgv);
                    }
                    hm.put("success", true);
                }
            }

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir consumo");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_registro_venta_detalle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer revd_id = Integer.parseInt(request.getParameter("revd_id"));
        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));

        HashMap hm = new HashMap();

        try {
            Ventas bean = new Ventas();
            bean.setRevdId(revd_id);
            new VentasDao().deleteRegistroVentaDetalle(bean);

            String query = " WHERE reve_id = " + reve_id + " ORDER BY revd_id ASC";
            List<Ventas> listRegistroVentaDetalle = new VentasDao().getRegistroVentaDetalle(query);
            if (listRegistroVentaDetalle.isEmpty()) {
                hm.put("vacio", true);
            } else {
                hm.put("vacio", false);
                hm.put("listRegistroVentaDetalle", listRegistroVentaDetalle);
            }
            hm.put("success", true);

        } catch (NumberFormatException e) {
            hm.put("success", false);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void empty_registro_venta_detalle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));

        HashMap hm = new HashMap();

        try {
            Ventas bean = new Ventas();
            bean.setReveId(reve_id);
            new VentasDao().emptyRegistroVentaDetalle(bean);
            hm.put("success", true);
        } catch (NumberFormatException e) {
            hm.put("success", false);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void buscar_registro_venta_cliente(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer ticl_id = Integer.parseInt(request.getParameter("ticl_id"));
        Integer tido_id = Integer.parseInt(request.getParameter("tido_id"));
        String clie_documento = request.getParameter("clie_documento") == null ? "" : request.getParameter("clie_documento").trim();

        HashMap hm = new HashMap();

        String queryDoc = " WHERE tido_id = " + tido_id;
        List<TablasMaestras> listTiposDocumento = new TablasMaestrasDao().getTiposDocumento(queryDoc);

        String tido_nombre = listTiposDocumento.get(0).getTidoNombre();
        Integer tido_caracteres = listTiposDocumento.get(0).getTidoCaracteres();

        if (ticl_id == 1) {

            if (clie_documento.equals("")) {
                hm.put("success", false);
                hm.put("msg", "No ha ingresado ningún " + tido_nombre);
            } else {
                if (clie_documento.length() > 0 && clie_documento.length() < tido_caracteres) {
                    hm.put("success", false);
                    hm.put("msg", "El " + tido_nombre + " debe tener " + tido_caracteres + " digitos");
                } else {

                    // Si el tipo de documento es DNI (Hacemos la consulta por la API)
                    if (tido_id == 2) {
                        try {
                            String RUTA = "https://api.apis.net.pe/v1/dni?numero=" + clie_documento;
                            HttpClient client = new DefaultHttpClient();
                            HttpGet get = new HttpGet(RUTA);
                            get.addHeader("Authorization", "Bearer $TOKEN"); // Cabecera del token
                            get.addHeader("Accept", "application/json"); // Cabecera del Content-Type

                            HttpResponse result = client.execute(get);
                            BufferedReader rd = new BufferedReader(new InputStreamReader(result.getEntity().getContent(), StandardCharsets.UTF_8));
                            String linea = "";
                            if ((linea = rd.readLine()) != null) {
                                JSONParser parsearRsptaJson = new JSONParser();
                                JSONObject json_rspta = (JSONObject) parsearRsptaJson.parse(linea);
                                System.out.println("DNI consultado -> " + json_rspta);
                                if (json_rspta == null) {
                                    hm.put("success", false);
                                    hm.put("msg", "El " + tido_nombre + " no se encuentra registrado");
                                } else {
                                    hm.put("success", true);
                                    hm.put("clie_nombres", json_rspta.get("nombre"));
                                    hm.put("clie_direccion", json_rspta.get("direccion"));
                                }

                            }
                        } catch (IOException | UnsupportedOperationException | UnsupportedCharsetException | org.json.simple.parser.ParseException e) {
                            System.out.println(e.getMessage());
                            hm.put("success", false);
                            hm.put("msg", "No hay conexión a internet");
                        }
                    } else {
                        String query = " WHERE a.ticl_id = " + ticl_id + " AND a.clie_documento = '" + clie_documento + "' AND a.tido_id = " + tido_id;
                        List<Ventas> list = new VentasDao().getClientes(query);
                        if (list.isEmpty()) {
                            hm.put("success", false);
                            hm.put("msg", "El cliente no se encuentra registrado");
                        } else {
                            hm.put("success", true);
                            hm.put("clie_nombres", list.get(0).getClieNombres());
                            hm.put("clie_direccion", list.get(0).getClieDireccion());
                        }
                    }

                }
            }
        }
        if (ticl_id == 2) {
            if (clie_documento.equals("")) {
                hm.put("success", false);
                hm.put("msg", "No ha ingresado ningún " + tido_nombre);
            } else {
                if (clie_documento.length() > 0 && clie_documento.length() < tido_caracteres) {
                    hm.put("success", false);
                    hm.put("msg", "El " + tido_nombre + " debe tener " + tido_caracteres + " digitos");
                } else {
                    // Hacemos la consulta del RUC por la API
                    try {
                        String RUTA = "https://api.apis.net.pe/v1/ruc?numero=" + clie_documento;
                        HttpClient client = new DefaultHttpClient();
                        HttpGet get = new HttpGet(RUTA);
                        get.addHeader("Authorization", "Bearer $TOKEN"); // Cabecera del token
                        get.addHeader("Accept", "application/json"); // Cabecera del Content-Type

                        HttpResponse result = client.execute(get);
                        BufferedReader rd = new BufferedReader(new InputStreamReader(result.getEntity().getContent(), StandardCharsets.UTF_8));
                        String linea = "";
                        if ((linea = rd.readLine()) != null) {
                            JSONParser parsearRsptaJson = new JSONParser();
                            JSONObject json_rspta = (JSONObject) parsearRsptaJson.parse(linea);
                            System.out.println("RUC consultado -> " + json_rspta);
                            if (json_rspta == null) {
                                hm.put("success", false);
                                hm.put("msg", "El " + tido_nombre + " no se encuentra registrado");
                            } else {
                                if (json_rspta.get("estado").equals("ACTIVO")) {
                                    hm.put("success", true);
                                    hm.put("clie_nombres", json_rspta.get("nombre"));
                                    hm.put("clie_direccion", json_rspta.get("direccion"));
                                } else {
                                    hm.put("success", false);
                                    hm.put("msg", json_rspta.get("estado"));
                                }
                            }

                        }
                    } catch (IOException | UnsupportedOperationException | UnsupportedCharsetException | org.json.simple.parser.ParseException e) {
                        System.out.println(e.getMessage());
                        hm.put("success", false);
                        hm.put("msg", "No hay conexión a internet");
                    }

//                     String query = " WHERE a.paru_ruc = '" + clie_documento + "' ";
//                     List<Utilitarios> list = new UtilitariosDao().getPadronRuc(query);
//                     if (list.isEmpty()) {
//                        hm.put("success", false);
//                        hm.put("msg", "El " + tido_nombre + " no se encuentra registrado");
//                    } else {
//                    
//                        if (list.get(0).getParuEstado().toLowerCase().equals("activo")) {
//                            hm.put("success", true);
//                            hm.put("clie_nombres", list.get(0).getParuNombres());
//                    
//                            String direccion = "";
//                    
//                            if (list.get(0).getParuTipoVia().equals("----") || list.get(0).getParuTipoVia().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += list.get(0).getParuTipoVia() + " ";
//                            }
//                    
//                            if (list.get(0).getParuNombreVia().equals("----") || list.get(0).getParuNombreVia().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += list.get(0).getParuNombreVia() + " ";
//                            }
//                    
//                            if (list.get(0).getParuNumero().equals("----") || list.get(0).getParuNumero().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "NRO. " + list.get(0).getParuNumero() + " ";
//                            }
//                    
//                            if (list.get(0).getParuInterior().equals("----") || list.get(0).getParuInterior().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "INT. " + list.get(0).getParuInterior() + " ";
//                            }
//                    
//                            if (list.get(0).getParuLote().equals("----") || list.get(0).getParuLote().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "LOTE. " + list.get(0).getParuLote() + " ";
//                            }
//                    
//                            if (list.get(0).getParuDepartamento().equals("----") || list.get(0).getParuDepartamento().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "DPTO. " + list.get(0).getParuDepartamento() + " ";
//                            } 
//                    
//                            if (list.get(0).getParuManzana().equals("----") || list.get(0).getParuManzana().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "MZA. " + list.get(0).getParuManzana() + " ";
//                            }
//                    
//                            if (list.get(0).getParuKilometro().equals("----") || list.get(0).getParuKilometro().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += "KM. " + list.get(0).getParuKilometro() + " ";
//                            }
//                    
//                            if (list.get(0).getParuCodigoZona().equals("----") || list.get(0).getParuCodigoZona().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += list.get(0).getParuCodigoZona() + " ";
//                            } 
//                    
//                            if (list.get(0).getParuTipoZona().equals("----") || list.get(0).getParuTipoZona().equals("-")) {
//                                direccion += "";
//                            } else {
//                                direccion += list.get(0).getParuTipoZona() + " ";
//                            }
//                    
//                            if (list.get(0).getParuUbigeo().length() < 6) {
//                                direccion += "";
//                            } else {
//                                direccion += " - " + list.get(0).getDistrito() + " - " + list.get(0).getProvincia() + " - " + list.get(0).getDepartamento();
//                            }
//                    
//                            hm.put("clie_direccion", direccion);
//                    
//                        } else {
//                            hm.put("success", false);
//                            hm.put("msg", list.get(0).getParuEstado());
//                        }
//                    
//                    }
                }
            }
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_lectura_inicio_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE a.sude_estado = true AND a.sude_activo = true AND a.sude_lectura_estado = false AND "
                + "f.sula_estado = true AND f.sula_activo = true AND b.surt_estado = true AND b.surt_activo = true "
                + "ORDER BY a.surt_id, a.lado_id, a.mang_id ASC ";
        List<Ventas> listLecturaInicio = new VentasDao().getSurtidoresDetalle(query);

        if (listLecturaInicio.isEmpty()) {
            hm.put("vacio", true);
        } else {
            hm.put("vacio", false);
            hm.put("listLecturaInicio", listLecturaInicio);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_lectura_fin_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        HashMap hm = new HashMap();

        String query = " WHERE l.tudi_id = " + tudi_id + " ORDER BY a.surt_id, a.lado_id, a.mang_id ASC ";
        List<Ventas> listLecturaFinal = new VentasDao().getLecturaDiariaFinal(query);

        String queryS = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
        List<Ventas> listS = new VentasDao().getTurnoDiario(queryS);
        String querySS;
        if (listS.isEmpty()) {
            String query1st = " WHERE tudi_inicio = true AND tudi_cierre = false ORDER BY tudi_id ASC ";
            List<Ventas> list1st = new VentasDao().getTurnoDiario(query1st);
            querySS = " '" + list1st.get(0).getTudiFechaInicio() + "'::date ";
        } else {
            querySS = " '" + listS.get(0).getTudiFechaInicio() + "'::date ";
        }

        List<Ventas> list = new VentasDao().getTurnoDiario(" WHERE tudi_id = " + tudi_id);
        String queryStock = " '" + list.get(0).getTudiFechaInicio() + "'::date ";
        List<Almacen> listStock = new AlmacenDao().getStockLiquidacion(tudi_id, queryStock, querySS);

        String query2 = " WHERE a.tudi_id = " + tudi_id;
        List<Ventas> listLecturaTrabajadores = new VentasDao().getTurnoTrabajadores(query2);

        String query3 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY a.surt_id ASC ";
        List<Ventas> listLecturaLiquidacion = new VentasDao().getLiquidacionTurno(query3);

        hm.put("listLecturaFinal", listLecturaFinal);
        hm.put("listStock", listStock);
        hm.put("listLecturaTrabajadores", listLecturaTrabajadores);
        hm.put("listLecturaLiquidacion", listLecturaLiquidacion);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_lectura_fin_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        String[] lediIds = request.getParameterValues("ledi_id[]");
        String[] lediLecturas = request.getParameterValues("ledi_lectura_final[]");
        String[] ledi_Precios = request.getParameterValues("ledi_precio_unitario");

        HashMap hm = new HashMap();

        Ventas beanA = new Ventas();
        beanA.setTudiId(tudi_id);
        new VentasDao().updateLecturaDiariaAll(beanA);
        int nroReg = lediIds.length;
        for (int i = 0; i < nroReg; i++) {
            Ventas bean = new Ventas();
            bean.setLediId(Integer.parseInt(lediIds[i]));
            bean.setLediLecturaFinal(new BigDecimal(lediLecturas[i].replaceAll("\\s", "").trim()));
            bean.setLediPrecioUnitario(new BigDecimal(ledi_Precios[i].replaceAll("\\s", "").trim()));
            new VentasDao().updateLecturaDiaria(bean);
        }

        String query = " WHERE a.tudi_id = " + tudi_id + " GROUP BY b.surt_id ORDER BY b.surt_id ASC ";
        List<Ventas> list = new VentasDao().getLiquidacionVentaSurt(query);

        list.stream().forEach(t -> {
            Ventas beanU = new Ventas();
            beanU.setTudiId(tudi_id);
            beanU.setSurtId(t.getSurtId());
            beanU.setTusuMonto(t.getVenta());
            new VentasDao().updateLiquidacionVentaSurt(beanU);
        }
        );

        hm.put("tudi_id", tudi_id);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void liquidar_stock(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        String[] prod_Ids = request.getParameterValues("prod_id");
        //String[] lepr_LecturasCm = request.getParameterValues("lepr_lectura_cm3");
        String[] lepr_Lecturas = request.getParameterValues("lepr_lectura_fisica");

        HashMap hm = new HashMap();

        Integer nroProds = prod_Ids.length;
        for (int i = 0; i < nroProds; i++) {
            Ventas bean = new Ventas();
            bean.setTudiId(tudi_id);
            bean.setProdId(Integer.parseInt(prod_Ids[i]));
            if (lepr_Lecturas[i].equals("")) {
                bean.setLeprLecturaFisica(null);
            } else {
                bean.setLeprLecturaFisica(new BigDecimal(lepr_Lecturas[i].replaceAll("\\s", "").trim()));
            }
            //if (lepr_LecturasCm[i].equals("")) {
            bean.setLeprLecturaCm3(null);
            //} else {
            //    bean.setLeprLecturaCm3(new BigDecimal(lepr_LecturasCm[i].replaceAll("\\s", "").trim()));
            //}
            new VentasDao().insertLecturaProducto(bean);
        }

        hm.put("tudi_id", tudi_id);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void cerrar_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        //String cltu_clave = request.getParameter("cltu_clave") == null ? "" : request.getParameter("cltu_clave");

        HashMap hm = new HashMap();

        //String queryC = " WHERE cltu_activo = true ";
        //List<Usuario> listClaves = new UsuarioDao().getClaveTurnos(queryC);        
        //if (cltu_clave.equals(listClaves.get(0).getCltuClave())) {
        try {

            String query = " WHERE l.tudi_id = " + tudi_id + " ORDER BY a.surt_id, a.lado_id, a.mang_id ASC ";
            List<Ventas> listLecturaFinal = new VentasDao().getLecturaDiariaFinal(query);

            String queryS = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
            List<Ventas> listS = new VentasDao().getTurnoDiario(queryS);
            String querySS;
            if (listS.isEmpty()) {
                String query1st = " WHERE tudi_inicio = true AND tudi_cierre = false ORDER BY tudi_id ASC ";
                List<Ventas> list1st = new VentasDao().getTurnoDiario(query1st);
                querySS = " '" + list1st.get(0).getTudiFechaInicio() + "'::date ";
            } else {
                querySS = " '" + listS.get(0).getTudiFechaInicio() + "'::date ";
            }

            List<Ventas> list = new VentasDao().getTurnoDiario(" WHERE tudi_id = " + tudi_id);
            String queryStock = " '" + list.get(0).getTudiFechaInicio() + "'::date ";
            List<Almacen> listStock = new AlmacenDao().getStockLiquidacion(tudi_id, queryStock, querySS);

            String query2 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY b.surt_nombre, c.prod_nombre ASC ";
            List<Ventas> listDevolucion = new VentasDao().getDevolucionTanque(query2);

            String query3 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.gadi_fecha_hora ASC ";
            List<Ventas> listGastos = new VentasDao().getLiquidacionGastos(query3);

            String query4 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.indi_fecha_hora ASC ";
            List<Ventas> listIngresos = new VentasDao().getLiquidacionIngresos(query4);

            String query5 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY a.surt_id ASC ";
            List<Ventas> listLecturaLiquidacion = new VentasDao().getLiquidacionTurno(query5);

            hm.put("listLecturaFinal", listLecturaFinal);
            hm.put("listStock", listStock);
            hm.put("listDevolucion", listDevolucion);
            hm.put("listGastos", listGastos);
            hm.put("listIngresos", listIngresos);
            hm.put("listLecturaLiquidacion", listLecturaLiquidacion);

            Ventas beanU = new Ventas();
            beanU.setTudiId(tudi_id);
            beanU.setTudiInicio(true);
            LocalDateTime ldt = LocalDateTime.now();
            beanU.setTudiFechaCierre(Timestamp.valueOf(ldt));
            beanU.setTudiCierre(true);
            beanU.setCltuIdCierre(null);
            new VentasDao().updateTurnoDiarioCierre(beanU);

            String queryT = " WHERE a.tudi_id = " + tudi_id;
            List<Ventas> listTurno = new VentasDao().getNombreTurnoDiario(queryT);

            hm.put("fecha", listTurno.get(0).getTudiFechaInicio());
            hm.put("turno", listTurno.get(0).getTurnNombre());

            hm.put("success", true);

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo cerrar el turno, intente nuevamente");
        }
        /*} else {
            hm.put("success", false);
            hm.put("msg", "La clave de autorización es incorrecta");
        }*/

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void imprimir_turno(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        HashMap hm = new HashMap();

        String query = " WHERE l.tudi_id = " + tudi_id + " ORDER BY a.surt_id, a.lado_id, a.mang_id ASC ";
        List<Ventas> listLecturaFinal = new VentasDao().getLecturaDiariaFinal(query);

        String queryS = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
        List<Ventas> listS = new VentasDao().getTurnoDiario(queryS);
        String querySS;
        if (listS.isEmpty()) {
            String query1st = " WHERE tudi_inicio = true AND tudi_cierre = false ORDER BY tudi_id ASC ";
            List<Ventas> list1st = new VentasDao().getTurnoDiario(query1st);
            querySS = " '" + list1st.get(0).getTudiFechaInicio() + "'::date ";
        } else {
            querySS = " '" + listS.get(0).getTudiFechaInicio() + "'::date ";
        }

        List<Ventas> list = new VentasDao().getTurnoDiario(" WHERE tudi_id = " + tudi_id);
        String queryStock = " '" + list.get(0).getTudiFechaInicio() + "'::date ";
        List<Almacen> listStock = new AlmacenDao().getStockLiquidacion(tudi_id, queryStock, querySS);

        String query2 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY b.surt_nombre, c.prod_nombre ASC ";
        List<Ventas> listDevolucion = new VentasDao().getDevolucionTanque(query2);

        String query3 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.gadi_fecha_hora ASC ";
        List<Ventas> listGastos = new VentasDao().getLiquidacionGastos(query3);

        String query4 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.indi_fecha_hora ASC ";
        List<Ventas> listIngresos = new VentasDao().getLiquidacionIngresos(query4);

        String query5 = " WHERE a.tudi_id = " + tudi_id + " ORDER BY a.surt_id ASC ";
        List<Ventas> listLecturaLiquidacion = new VentasDao().getLiquidacionTurno(query5);

        hm.put("listLecturaFinal", listLecturaFinal);
        hm.put("listStock", listStock);
        hm.put("listDevolucion", listDevolucion);
        hm.put("listGastos", listGastos);
        hm.put("listIngresos", listIngresos);
        hm.put("listLecturaLiquidacion", listLecturaLiquidacion);

        String queryT = " WHERE a.tudi_id = " + tudi_id;
        List<Ventas> listTurno = new VentasDao().getNombreTurnoDiario(queryT);

        hm.put("fecha", listTurno.get(0).getTudiFechaInicio());
        hm.put("turno", listTurno.get(0).getTurnNombre());

        hm.put("success", true);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void precio_venta_producto(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
        Integer tive_id = Integer.parseInt(request.getParameter("tive_id"));

        HashMap hm = new HashMap();

        String query1 = " AND d.tive_id = " + tive_id + " AND d.prve_activo = true ";
        String query2 = " WHERE a.prod_id = " + prod_id + " ORDER BY a.prod_nombre ASC ";
        List<Ventas> listPreciosVenta = new VentasDao().getPreciosVentaProductos(query1, query2);

        hm.put("precio", listPreciosVenta.get(0).getPrvePrecioUnitario());
        hm.put("alterno1", listPreciosVenta.get(0).getPrvePrecioAlterno1());
        hm.put("alterno2", listPreciosVenta.get(0).getPrvePrecioAlterno2());
        hm.put("descuento", listPreciosVenta.get(0).getPrveDescuentoPrecioPorcentaje());
        hm.put("unidad_nombre", listPreciosVenta.get(0).getUnmeNombre());
        hm.put("unidad_simbolo", listPreciosVenta.get(0).getUnmeSimbolo());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_correlativos_emision(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " WHERE a.tiem_estado = 'A' ORDER BY a.tiem_nombre ASC ";
        List<Ventas> listCorrelativos = new VentasDao().getCorrelativosEmision(query);
        hm.put("listCorrelativos", listCorrelativos);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void upsert_correlativo_emision(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiem_id = Integer.parseInt(request.getParameter("tiem_id"));
        String coem_sigla = request.getParameter("coem_sigla") == null ? "" : request.getParameter("coem_sigla").trim();
        String coem_sede = request.getParameter("coem_sede") == null ? "" : request.getParameter("coem_sede").trim();
        Integer coem_correlativo = request.getParameter("coem_correlativo") == null ? 0 : Integer.parseInt(request.getParameter("coem_correlativo").trim());

        HashMap hm = new HashMap();

        String query = " WHERE a.tiem_id = " + tiem_id;
        List<Ventas> listCorrelativo = new VentasDao().getCorrelativoEmision(query);

        if (listCorrelativo.isEmpty()) {
            try {
                Ventas bean = new Ventas();
                bean.setTiemId(tiem_id);
                bean.setCoemSigla(coem_sigla);
                bean.setCoemSede(coem_sede);
                bean.setCoemCorrelativo(coem_correlativo);
                bean.setCoemLongitud(6);
                new VentasDao().insertCorrelativoEmision(bean);
                hm.put("success", true);
                hm.put("msg", "Se actualizó correctamente el correlativo de emisión");
            } catch (NumberFormatException e) {
                hm.put("success", false);
                hm.put("msg", "No se puedo actualizar el correlativo de emisión");
            }
        } else {
            try {
                Ventas bean = new Ventas();
                bean.setTiemId(tiem_id);
                bean.setCoemSigla(coem_sigla);
                bean.setCoemSede(coem_sede);
                bean.setCoemCorrelativo(coem_correlativo);
                bean.setCoemLongitud(6);
                new VentasDao().updateCorrelativoEmision(bean);
                hm.put("success", true);
                hm.put("msg", "Se actualizó correctamente el correlativo de emisión");
            } catch (NumberFormatException e) {
                hm.put("success", false);
                hm.put("msg", "No se puedo actualizar el correlativo de emisión");
            }
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void impresion_registro_venta(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer reve_id = Integer.parseInt(request.getParameter("reve_id"));

        HashMap hm = new HashMap();

        hm.put("reve_id", reve_id);

        String queryReg = " WHERE a.reve_id = " + reve_id;
        List<Ventas> listReg = new VentasDao().getRegistroVenta(queryReg);

        String tipo_comp = listReg.get(0).getTicoSunat();
        hm.put("tipo_comp", tipo_comp);

        String comprobante = listReg.get(0).getReveNroComprobante();
        String[] comprobanteArray = comprobante.split("-");

        int longitud = listReg.get(0).getCoemLongitud();
        String emision_nombre = listReg.get(0).getTiemNombre();
        String emision_serie = comprobanteArray[0];
        int correl = Integer.parseInt(comprobanteArray[1]);
        String correlFormat = devolverCorrelativo(correl, longitud);

        hm.put("emision_nombre", emision_nombre);
        hm.put("emision_serie", emision_serie);
        hm.put("emision_correlFormat", correlFormat);

        List<Facturacion> listOse = new FacturacionDao().getOse("");
        hm.put("ose_url", listOse.get(0).getOseUrlConsulta());
        hm.put("ose_resolucion", listOse.get(0).getOseResolucion());

        List<Usuario> listEmpresa = new UsuarioDao().getDatosEmpresa();
        String empr_ruc = listEmpresa.get(0).getEmprRuc();
        String empr_url_logo = listEmpresa.get(0).getEmprUrlLogo();
        String empr_logo_tipo = listEmpresa.get(0).getEmprLogoTipo();
        hm.put("empr_ruc", empr_ruc);
        hm.put("empr_razon_social", listEmpresa.get(0).getEmprRazonSocial().toUpperCase());
        hm.put("empr_direccion", listEmpresa.get(0).getEmprDireccion().toUpperCase());
        hm.put("empr_url_logo", empr_url_logo);
        hm.put("empr_logo_tipo", empr_logo_tipo);

        String queryMone = " WHERE mone_estado = true ";
        List<Facturacion> listMoneda = new FacturacionDao().getMoneda(queryMone);
        hm.put("mone_nombreP", listMoneda.get(0).getMoneNombrePlural());
        hm.put("mone_nombreS", listMoneda.get(0).getMoneNombreSingular());
        hm.put("mone_abreviatura", listMoneda.get(0).getMoneAbreviatura());

        List<Facturacion> listIgv = new FacturacionDao().getIgv("");
        String igv_abreviatura = listIgv.get(0).getIgvAbreviatura();
        BigDecimal igv_porcentaje = listIgv.get(0).getIgvPorcentaje();
        Boolean igv_estado = listIgv.get(0).getIgvEstado();
        BigDecimal tasaIgv = (igv_porcentaje.divide(new BigDecimal(100), 4)).add(new BigDecimal(1));

        hm.put("igv_abreviatura", igv_abreviatura);
        hm.put("igv_porcentaje", igv_porcentaje);
        hm.put("igv_estado", igv_estado);
        hm.put("tasaIgv", tasaIgv);

        Integer tive_id = listReg.get(0).getTiveId();
        hm.put("tive_id", tive_id);
        if (tive_id == 2) {
            Integer period_credito = listReg.get(0).getRevePeriodoCredito();
            Integer cuotas_credito = listReg.get(0).getReveCuotasCredito();
            BigDecimal monto_credito = listReg.get(0).getReveMontoCredito();
            String fecha_credito = listReg.get(0).getReveFechaVencimientoCredito();
            hm.put("period_credito", period_credito);
            hm.put("cuotas_credito", cuotas_credito);
            hm.put("monto_credito", monto_credito);
            hm.put("fecha_credito", fecha_credito);
        }

        String formatoXML = empr_ruc + "-" + tipo_comp + "-" + emision_serie + "-" + correl + ".XML";
        byte[] encodedBytes = Base64.getEncoder().encode(formatoXML.getBytes());
        String codigo_hash = new String(encodedBytes);
        hm.put("codigo_hash", codigo_hash);

        String queryTigv = " WHERE tigv_estado = true ";
        List<Facturacion> listTipoIgv = new FacturacionDao().getTipoIgv(queryTigv);
        String tipo_igv_nombre = listTipoIgv.get(0).getTigvNombre();
        String tipo_igv = "";
        if (tipo_igv_nombre.toLowerCase().contains("gravado")) {
            tipo_igv = "OP. GRAVADA";
        }
        if (tipo_igv_nombre.toLowerCase().contains("exonerado")) {
            tipo_igv = "OP. EXONERADA";
        }
        if (tipo_igv_nombre.toLowerCase().contains("inafecto")) {
            tipo_igv = "OP. INAFECTA";
        }
        if (tipo_igv_nombre.toLowerCase().contains("exportación")) {
            tipo_igv = "OP. GRATUITA";
        }
        hm.put("tipo_igv", tipo_igv);

        String query = " WHERE reve_id = " + reve_id;
        List<Ventas> list = new VentasDao().getRegistroVentaDetalle(query);

        hm.put("clie_documento_lbl", listReg.get(0).getTidoNombre());

        hm.put("fecha_emision", listReg.get(0).getReveFechaHora());

        String reve_documento = listReg.get(0).getReveDocumento();
        if (reve_documento.equals("")) {
            hm.put("tipo_doc", "-");
            hm.put("clie_documento", "");
            hm.put("clie_documento_hash", "-");
        } else {
            hm.put("tipo_doc", listReg.get(0).getTidoOse());
            hm.put("clie_documento", reve_documento);
            hm.put("clie_documento_hash", reve_documento);
        }
        hm.put("clie_nombre", listReg.get(0).getReveNombres());
        hm.put("clie_direccion", listReg.get(0).getReveDireccion());
        hm.put("clie_placa", listReg.get(0).getRevePlaca());
        hm.put("clie_chofer", listReg.get(0).getReveChofer());
        hm.put("clie_kilometraje", listReg.get(0).getReveKilometraje());

        hm.put("list", list);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private String devolverCorrelativo(int correlativo, int longitud) {
        int longCorrel = (correlativo + "").length();
        int potencia = (int) Math.pow(10, (longitud - longCorrel));
        String concat = (potencia + "").substring(1, (longitud - longCorrel));
        return concat + correlativo + "";
    }

    private void list_liquidacion_stock(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        HashMap hm = new HashMap();

        String queryS = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
        List<Ventas> listS = new VentasDao().getTurnoDiario(queryS);
        String querySS;
        if (listS.isEmpty()) {
            String query1st = " WHERE tudi_inicio = true AND tudi_cierre = false ORDER BY tudi_id ASC ";
            List<Ventas> list1st = new VentasDao().getTurnoDiario(query1st);
            querySS = " '" + list1st.get(0).getTudiFechaInicio() + "'::date ";
        } else {
            querySS = " '" + listS.get(0).getTudiFechaInicio() + "'::date ";
        }

        List<Ventas> list = new VentasDao().getTurnoDiario(" WHERE tudi_id = " + tudi_id);
        String queryStock = " '" + list.get(0).getTudiFechaInicio() + "'::date ";
        List<Almacen> listStock = new AlmacenDao().getStockLiquidacion(tudi_id, queryStock, querySS);

        hm.put("listStock", listStock);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_ingresos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " ORDER BY a.indi_fecha_hora DESC ";
        List<Ventas> listIngresos = new VentasDao().getIngresoDiario(query);

        hm.put("listIngresos", listIngresos);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_ingreso(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiin_id = Integer.parseInt(request.getParameter("tiin_id"));
        String descripcion = request.getParameter("indi_descripcion") == null ? "" : request.getParameter("indi_descripcion").trim();
        String monto = request.getParameter("indi_monto") == null ? "" : request.getParameter("indi_monto");

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setIndiFechaHora(Timestamp.valueOf(ldt));
            bean.setTiinId(tiin_id);
            bean.setIndiDescripcion(descripcion);
            if (monto.equals("")) {
                bean.setIndiMonto(null);
            } else {
                bean.setIndiMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
            }
            new VentasDao().insertIngresoDiario(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadio ingreso correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el ingreso. Intentelo nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_ingreso(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer indi_id = Integer.parseInt(request.getParameter("indi_id"));

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            bean.setIndiId(indi_id);
            new VentasDao().deleteIngresoDiario(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el registro de ingreso");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el registro de ingreso");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_gastos(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " ORDER BY a.gadi_fecha_hora DESC ";
        List<Ventas> listGastos = new VentasDao().getGastoDiario(query);

        if (listGastos.isEmpty()) {
            hm.put("success", false);
        } else {
            hm.put("success", true);
            hm.put("listGastos", listGastos);
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_gasto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));
        String descripcion = request.getParameter("gadi_descripcion") == null ? "" : request.getParameter("gadi_descripcion").trim();
        String monto = request.getParameter("gadi_monto") == null ? "" : request.getParameter("gadi_monto");

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setGadiFechaHora(Timestamp.valueOf(ldt));
            bean.setTigaId(tiga_id);
            bean.setGadiDescripcion(descripcion);
            if (monto.equals("")) {
                bean.setGadiMonto(null);
            } else {
                bean.setGadiMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
            }
            new VentasDao().insertGastoDiario(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadio gasto correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el gasto. Intentelo nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_gasto(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer gadi_id = Integer.parseInt(request.getParameter("gadi_id"));

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            bean.setGadiId(gadi_id);
            new VentasDao().deleteGastoDiario(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el registro de gasto");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el registro de gasto");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void add_devolucion_tanque(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
        String devolucion = request.getParameter("deta_devolucion") == null ? "" : request.getParameter("deta_devolucion");

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setTudiId(tudi_id);
        bean.setSurtId(surt_id);
        bean.setProdId(prod_id);
        if (devolucion.equals("")) {
            bean.setDetaDevolucion(null);
        } else {
            bean.setDetaDevolucion(new BigDecimal(devolucion.replaceAll("\\s", "").trim()));
        }
        new VentasDao().insertDevolucionTanque(bean);

        hm.put("tudi_id", tudi_id);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void del_devolucion_tanque(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer deta_id = Integer.parseInt(request.getParameter("deta_id"));

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setDetaId(deta_id);
        new VentasDao().deleteDevolucionTanque(bean);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_devolucion_tanque(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        HashMap hm = new HashMap();

        String query = " WHERE a.tudi_id = " + tudi_id + " ORDER BY b.surt_nombre, c.prod_nombre ASC ";
        List<Ventas> listDevolucion = new VentasDao().getDevolucionTanque(query);

        hm.put("listDevolucion", listDevolucion);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void add_gasto_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));
        String descripcion = request.getParameter("gadi_descripcion") == null ? "" : request.getParameter("gadi_descripcion").trim();
        String monto = request.getParameter("gadi_monto") == null ? "" : request.getParameter("gadi_monto");

        Boolean esCombustible = request.getParameter("tiga_combustible") != null;

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        LocalDateTime ldt = LocalDateTime.now();
        bean.setGadiFechaHora(Timestamp.valueOf(ldt));
        bean.setTigaId(tiga_id);
        bean.setGadiDescripcion(descripcion);
        if (monto.equals("")) {
            bean.setGadiMonto(null);
        } else {
            bean.setGadiMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
        }
        new VentasDao().insertGastoDiario(bean);

        Ventas beanT = new Ventas();
        beanT.setGadiId(bean.getGadiId());
        beanT.setTudiId(tudi_id);
        beanT.setSurtId(surt_id);
        new VentasDao().insertGastoTurno(beanT);

        if (esCombustible) {

            Integer prod_id = Integer.parseInt(request.getParameter("prod_id"));
            String galones = request.getParameter("cotu_galones") == null ? "" : request.getParameter("cotu_galones");

            Ventas beanC = new Ventas();
            beanC.setCotuFechaHora(bean.getGadiFechaHora());
            beanC.setCotuDescripcion(descripcion);
            if (galones.equals("")) {
                beanC.setCotuGalones(null);
            } else {
                beanC.setCotuGalones(new BigDecimal(galones.replaceAll("\\s", "").trim()));
            }
            if (monto.equals("")) {
                beanC.setCotuMonto(null);
            } else {
                beanC.setCotuMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
            }
            beanC.setTudiId(tudi_id);
            beanC.setGadiId(bean.getGadiId());
            beanC.setProdId(prod_id);
            new VentasDao().insertCompraDiaria(beanC);

        }

        hm.put("tudi_id", tudi_id);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void del_gasto_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer gadi_id = Integer.parseInt(request.getParameter("gadi_id"));

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setGadiId(gadi_id);
        new VentasDao().deleteGastoTurno(bean);
        new VentasDao().deleteGastoDiario(bean);
        new VentasDao().deleteCompraDiariaGasto(bean);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_gastos_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        HashMap hm = new HashMap();

        String query = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.gadi_fecha_hora ASC ";
        List<Ventas> listGastos = new VentasDao().getLiquidacionGastos(query);

        hm.put("listGastos", listGastos);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void add_ingreso_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer tiin_id = Integer.parseInt(request.getParameter("tiin_id"));
        String descripcion = request.getParameter("indi_descripcion") == null ? "" : request.getParameter("indi_descripcion").trim();
        String monto = request.getParameter("indi_monto") == null ? "" : request.getParameter("indi_monto");

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        LocalDateTime ldt = LocalDateTime.now();
        bean.setIndiFechaHora(Timestamp.valueOf(ldt));
        bean.setTiinId(tiin_id);
        bean.setIndiDescripcion(descripcion);
        if (monto.equals("")) {
            bean.setIndiMonto(null);
        } else {
            bean.setIndiMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
        }
        new VentasDao().insertIngresoDiario(bean);

        Ventas beanT = new Ventas();
        beanT.setIndiId(bean.getIndiId());
        beanT.setTudiId(tudi_id);
        beanT.setSurtId(surt_id);
        new VentasDao().insertIngresoTurno(beanT);

        hm.put("tudi_id", tudi_id);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void del_ingreso_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer indi_id = Integer.parseInt(request.getParameter("indi_id"));

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setIndiId(indi_id);
        new VentasDao().deleteIngresoTurno(bean);
        new VentasDao().deleteIngresoDiario(bean);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_ingresos_turno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));

        HashMap hm = new HashMap();

        String query = " WHERE a.tudi_id = " + tudi_id + " ORDER BY c.indi_fecha_hora ASC ";
        List<Ventas> listIngresos = new VentasDao().getLiquidacionIngresos(query);

        hm.put("listIngresos", listIngresos);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void add_monto_entregado(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        String entregado = request.getParameter("tusu_entregado") == null ? "" : request.getParameter("tusu_entregado");

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setTudiId(tudi_id);
        bean.setSurtId(surt_id);
        if (entregado.equals("")) {
            bean.setTusuEntregado(null);
        } else {
            bean.setTusuEntregado(new BigDecimal(entregado.replaceAll("\\s", "").trim()));
        }
        new VentasDao().updateLiquidacionMontoEntregado(bean);

        hm.put("surt_id", surt_id);
        hm.put("entregado", entregado);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void update_liquida_trabajador(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tudi_id = Integer.parseInt(request.getParameter("tudi_id"));
        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer trab_id = Integer.parseInt(request.getParameter("trab_id"));

        HashMap hm = new HashMap();

        Ventas bean = new Ventas();
        bean.setTudiId(tudi_id);
        bean.setSurtId(surt_id);
        bean.setTrabId(trab_id);
        new VentasDao().updateLiquidacionTrabajadorSurt(bean);

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy hh:mm a").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void reporte_control_ventas(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String fecha = request.getParameter("fecha").trim();

        HashMap hm = new HashMap();

        String query = " '" + fecha + "'::date ";
        List<Ventas> listLiquidacion = new VentasDao().getReporteControlLiquidacion(query);

        String queryS = " WHERE tudi_inicio = true AND tudi_cierre = true ORDER BY tudi_id ASC ";
        List<Ventas> listS = new VentasDao().getTurnoDiario(queryS);
        String querySS;
        if (listS.isEmpty()) {
            String query1st = " WHERE tudi_inicio = true AND tudi_cierre = false ORDER BY tudi_id ASC ";
            List<Ventas> list1st = new VentasDao().getTurnoDiario(query1st);
            querySS = " '" + list1st.get(0).getTudiFechaInicio() + "'::date ";
        } else {
            querySS = " '" + listS.get(0).getTudiFechaInicio() + "'::date ";
        }

        List<Almacen> listStock = new AlmacenDao().getStockLiquidacionFecha(query, querySS);

        List<Ventas> listGastos = new VentasDao().selectGastoFecha(query);
        List<Ventas> listIngresos = new VentasDao().selectIngresoFecha(query);

        hm.put("listLiquidacion", listLiquidacion);
        hm.put("estado", listLiquidacion.isEmpty());
        hm.put("listStock", listStock);
        hm.put("listGastos", listGastos);
        hm.put("listIngresos", listIngresos);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void list_compras(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " ORDER BY a.cotu_fecha_hora DESC ";
        List<Ventas> listCompras = new VentasDao().getCompraDiaria(query);

        if (listCompras.isEmpty()) {
            hm.put("success", false);
        } else {
            hm.put("success", true);
            hm.put("listCompras", listCompras);
        }

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_compra(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer tiga_id = Integer.parseInt(request.getParameter("tiga_id"));
        String descripcion = request.getParameter("gadi_descripcion") == null ? "" : request.getParameter("gadi_descripcion").trim();
        String monto = request.getParameter("gadi_monto") == null ? "" : request.getParameter("gadi_monto");

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setGadiFechaHora(Timestamp.valueOf(ldt));
            bean.setTigaId(tiga_id);
            bean.setGadiDescripcion(descripcion);
            if (monto.equals("")) {
                bean.setGadiMonto(null);
            } else {
                bean.setGadiMonto(new BigDecimal(monto.replaceAll("\\s", "").trim()));
            }
            new VentasDao().insertGastoDiario(bean);

            hm.put("success", true);
            hm.put("msg", "Se añadio gasto correctamente");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo añadir el gasto. Intentelo nuevamente!!!");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void delete_compra(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer cotu_id = Integer.parseInt(request.getParameter("cotu_id"));

        HashMap hm = new HashMap();

        try {

            Ventas bean = new Ventas();
            bean.setCotuId(cotu_id);
            new VentasDao().deleteCompraDiaria(bean);

            hm.put("success", true);
            hm.put("msg", "Se eliminó el registro de compra");

        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo eliminar el registro de compra");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void insert_calle_matriz(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String nombre = request.getParameter("nombre") == null ? "" : request.getParameter("nombre");

        HashMap hm = new HashMap();

        Ventas beanE = new Ventas();
        beanE.setCamaEstado(false);
        new VentasDao().updateCalleMatrizEstado(beanE);

        Ventas bean = new Ventas();
        bean.setCamaNombre(nombre);
        bean.setCamaEstado(true);
        new VentasDao().insertCalleMatriz(bean);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void surtidor_lados(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String surt_id = request.getParameter("surt_id") == null ? "" : request.getParameter("surt_id");

        HashMap hm = new HashMap();

        String query = " WHERE a.surt_id = " + surt_id + " AND a.sula_estado = true ORDER BY b.lado_id ASC ";
        List<Ventas> listLados = new VentasDao().getSurtidoresLados(query);

        hm.put("listLados", listLados);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_surtidor(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));

        String nombre = request.getParameter("nombre") == null ? "" : request.getParameter("nombre");
        Boolean activo = request.getParameter("activo") != null;

        String[] lados = request.getParameterValues("lados[]");
        String[] estados = request.getParameterValues("estados[]") == null ? new String[0] : request.getParameterValues("estados[]");

        Ventas bean = new Ventas();
        bean.setSurtId(surt_id);
        bean.setSurtNombre(nombre);
        bean.setSurtActivo(activo);
        new VentasDao().updateSurtidores(bean);

        int n = lados.length;
        int m = estados.length;
        for (int i = 0; i < n; i++) {
            Ventas beanL = new Ventas();
            Ventas beanD = new Ventas();
            beanL.setSurtId(surt_id);
            beanD.setSurtId(surt_id);
            beanL.setLadoId(Integer.parseInt(lados[i]));
            beanD.setLadoId(Integer.parseInt(lados[i]));
            if (activo) {
                if (m == 0) {
                    beanL.setSulaActivo(false);
                    beanD.setSudeActivo(false);
                    new VentasDao().updateSurtidoresDetalleGlob(beanD);
                }
                if (m == 1) {
                    if (estados[0].equals(lados[i])) {
                        beanL.setSulaActivo(true);
                    } else {
                        beanL.setSulaActivo(false);
                        beanD.setSudeActivo(false);
                        new VentasDao().updateSurtidoresDetalleGlob(beanD);
                    }
                }
                if (m == 2) {
                    beanL.setSulaActivo(true);
                }
            } else {
                beanL.setSulaActivo(false);
                beanD.setSudeActivo(false);
                new VentasDao().updateSurtidoresDetalleGlob(beanD);
            }
            new VentasDao().updateSurtidoresLados(beanL);
        }

        HashMap hm = new HashMap();

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void surtidores_detalle_lado_prods(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String surt_id = request.getParameter("surt_id");
        String lado_id = request.getParameter("lado_id");

        String query = " WHERE a.surt_id = " + surt_id + " AND a.lado_id = " + lado_id + " AND a.sude_estado = true ORDER BY a.mang_id ASC ";
        List<Ventas> listDetalle = new VentasDao().getSurtidoresDetalle(query);

        HashMap hm = new HashMap();

        hm.put("listDetalle", listDetalle);
        if (listDetalle.isEmpty()) {
            hm.put("size", 0);
        } else {
            hm.put("size", listDetalle.size());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void editar_surtidor_lado(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer surt_id = Integer.parseInt(request.getParameter("surt_id"));
        Integer lado_id = Integer.parseInt(request.getParameter("lado_id"));

        String[] mang_ids = request.getParameterValues("mang_id[]");
        String[] prod_ids = request.getParameterValues("prod_id[]");

        Ventas beanD = new Ventas();
        beanD.setSurtId(surt_id);
        beanD.setLadoId(lado_id);
        beanD.setSudeEstado(false);
        new VentasDao().updateSurtidoresDetalleClean(beanD);

        int n = mang_ids.length;
        for (int i = 0; i < n; i++) {
            Ventas bean = new Ventas();
            bean.setSurtId(surt_id);
            bean.setLadoId(lado_id);
            bean.setMangId(Integer.parseInt(mang_ids[i]));
            bean.setProdId(Integer.parseInt(prod_ids[i]));
            bean.setSudeEstado(true);
            bean.setSudeLecturaApertura(null);
            bean.setSudeFechaLectura(null);
            bean.setSudeLecturaEstado(false);
            Boolean estadoA = request.getParameter("activo_" + mang_ids[i]) != null;
            bean.setSudeActivo(estadoA);
            new VentasDao().insertSurtidoresDetalle(bean);
        }

        HashMap hm = new HashMap();

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

}
