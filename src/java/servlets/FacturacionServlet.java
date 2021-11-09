package servlets;

import beans.Facturacion;
import beans.TablasMaestras;
import beans.Usuario;
import beans.Ventas;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import daos.FacturacionDao;
import daos.TablasMaestrasDao;
import daos.UsuarioDao;
import daos.VentasDao;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

import java.nio.charset.StandardCharsets;
import java.nio.charset.UnsupportedCharsetException;

import java.sql.Timestamp;

import java.text.SimpleDateFormat;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "FacturacionServlet", urlPatterns = {"/Facturacion"})
public class FacturacionServlet extends HttpServlet {

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
            case "datos_igv":
                datos_igv(request, response);
                break;
            case "lista_tipo_igv":
                lista_tipo_igv(request, response);
                break;
            case "lista_moneda":
                lista_moneda(request, response);
                break;
            case "lista_sunat_transaccion":
                lista_sunat_transaccion(request, response);
                break;
            case "actualizar_configuracion_fact":
                actualizar_configuracion_fact(request, response);
                break;
            case "actualizar_comprobantes_pendientes":
                actualizar_comprobantes_pendientes(request, response);
                break;
            case "lista_comprobantes":
                lista_comprobantes(request, response);
                break;
            case "enviar_facturacion":
                enviar_facturacion(request, response);
                break;
            case "info_comprobante":
                info_comprobante(request, response);
                break;
            case "lista_tipos_documento":
                lista_tipos_documento(request, response);
                break;
            case "corregir_comprobante":
                corregir_comprobante(request, response);
                break;
            case "emitir_comprobante":
                emitir_comprobante(request, response);
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

    private void datos_igv(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        List<Facturacion> listIgv = new FacturacionDao().getIgv("");

        HashMap hm = new HashMap();

        hm.put("igvPorc", listIgv.get(0).getIgvPorcentaje());
        hm.put("igvEstado", listIgv.get(0).getIgvEstado());

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipo_igv(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " ORDER BY tigv_id ASC ";
        List<Facturacion> listTipoIgv = new FacturacionDao().getTipoIgv(query);

        HashMap hm = new HashMap();

        hm.put("listTipoIgv", listTipoIgv);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_moneda(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " ORDER BY mone_id ASC ";
        List<Facturacion> listMoneda = new FacturacionDao().getMoneda(query);

        HashMap hm = new HashMap();

        hm.put("listMoneda", listMoneda);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_sunat_transaccion(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " ORDER BY sutr_id ASC ";
        List<Facturacion> listSunatTrans = new FacturacionDao().getSunatTransaccion(query);

        HashMap hm = new HashMap();

        hm.put("listSunatTrans", listSunatTrans);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void actualizar_configuracion_fact(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        Boolean igvEstado = request.getParameter("igvEstado") != null;
        String igvPorc = request.getParameter("igvPorc") == null ? "" : request.getParameter("igvPorc");
        String igvTipo = request.getParameter("igvTipo");
        String moneda = request.getParameter("moneda");
        String sunatTrans = request.getParameter("sunatTrans");

        HashMap hm = new HashMap();

        try {

            Facturacion bean1 = new Facturacion();
            bean1.setIgvId(1);
            bean1.setIgvPorcentaje(new BigDecimal(igvPorc.replaceAll("\\s", "").trim()));
            bean1.setIgvEstado(igvEstado);
            new FacturacionDao().updateIgv(bean1);

            Facturacion bean2 = new Facturacion();
            bean2.setTigvEstado(false);
            new FacturacionDao().updateAllTipoIgv(bean2);

            Facturacion bean3 = new Facturacion();
            bean3.setTigvId(Integer.parseInt(igvTipo));
            bean3.setTigvEstado(true);
            new FacturacionDao().updateTipoIgv(bean3);

            Facturacion bean4 = new Facturacion();
            bean4.setMoneEstado(false);
            new FacturacionDao().updateAllMoneda(bean4);

            Facturacion bean5 = new Facturacion();
            bean5.setMoneId(Integer.parseInt(moneda));
            bean5.setMoneEstado(true);
            new FacturacionDao().updateMoneda(bean5);

            Facturacion bean6 = new Facturacion();
            bean6.setSutrEstado(false);
            new FacturacionDao().updateAllSunatTransaccion(bean6);

            Facturacion bean7 = new Facturacion();
            bean7.setSutrId(Integer.parseInt(sunatTrans));
            bean7.setSutrEstado(true);
            new FacturacionDao().updateSunatTransaccion(bean7);

            hm.put("success", true);
            hm.put("msg", "Se actualizó la configuración correctamente");

        } catch (NumberFormatException ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar la configuración");
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void actualizar_comprobantes_pendientes(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String query = " WHERE fael_sunat_estado = false ORDER BY reve_id ASC ";
        List<Facturacion> listFacturaElec = new FacturacionDao().getListFacturacionElectronica(query);

        HashMap hm = new HashMap();

        listFacturaElec.stream().forEach(t -> {
            consultarComprobante(t.getReveId());
        });

        hm.put("success", true);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_comprobantes(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String estado = request.getParameter("estado");
        String tiemId = request.getParameter("tiem_id");
        String fechaIni = request.getParameter("fecha_ini");
        String fechaFin = request.getParameter("fecha_fin");
        String estadoEnvio = request.getParameter("estado_envio");
        String estadoSunat = request.getParameter("estado_sunat");

        HashMap hm = new HashMap();

        String query1 = " e.fael_estado = '" + estado + "' ";
        String query3;
        if (estadoSunat.equals("todos")) {
            query1 += "";
            query3 = "LEFT";
        } else {
            query1 += " AND e.fael_sunat_estado = " + estadoSunat + " ";
            query3 = "INNER";
        }

        String query2 = " WHERE a.reve_estado = 'emitido' ";
        query2 += " AND (a.reve_fecha_hora::date between '" + fechaIni + "'::date AND '" + fechaFin + "'::date) ";
        if (tiemId.equals("todos")) {
            query2 += "";
        } else {
            query2 += " AND a.tiem_id = " + tiemId + " ";
        }
        if (estadoEnvio.equals("todos")) {
            query2 += "";
        } else {
            query2 += " AND a.reve_envio_ose = '" + estadoEnvio + "' ";
        }
        query2 += " ORDER BY a.reve_fecha_hora DESC ";

        List<Facturacion> listComprobantes = new FacturacionDao().getFacturacionElectronica(query1, query2, query3);
        hm.put("listComprobantes", listComprobantes);

        String queryMone = " WHERE mone_estado = true ";
        List<Facturacion> listMoneda = new FacturacionDao().getMoneda(queryMone);
        hm.put("mone_abreviatura", listMoneda.get(0).getMoneAbreviatura());

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void enviar_facturacion(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String[] reveIds = request.getParameterValues("reve_id");

        HashMap hm = new HashMap();

        for (String reveId : reveIds) {
            Integer id = Integer.parseInt(reveId);
            generarComprobante(id);
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void info_comprobante(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String reve_id = request.getParameter("reve_id");

        String query = " WHERE a.reve_id = " + reve_id;
        List<Facturacion> listRegVenta = new FacturacionDao().getRegistroVenta(query);

        String comprobante = listRegVenta.get(0).getTiemNombre().toUpperCase() + "  " + listRegVenta.get(0).getReveNroComprobante();

        String error = listRegVenta.get(0).getReveEnvioError();
        String sugerencia = "Consultar los errores de su Operador de Servicios Electrónicos (OSE)";
        if (error.toLowerCase().contains("este documento ya existe en nubefact")) {
            sugerencia = "Debe anular este registro en la base de datos local, porque ya existe en su operador OSE.";
        }
        if (error.toLowerCase().contains("entidad no puedes emitir boletas a esta entidad porque tiene ruc")) {
            sugerencia = "El comprobante es una Boleta, por lo tanto debes emitir a una persona natural con DNI, Pasaporte o Carnet de extranjeria. Corrija!!!";
        }
        if (error.toLowerCase().contains("entidad no puedes emitir facturas a esta entidad")) {
            sugerencia = "El comprobante es una Factura, por lo tanto debes emitir a un RUC de empresa o persona jurídica. Corrija!!!";
        }
        if (error.toLowerCase().contains("unidad de medida no válida")) {
            sugerencia = "La unidad de medida de los servicios o productos está vacia o incorrecta. Corrija en la base de datos!!!";
        }
        if (error.toLowerCase().contains("fecha de emisión la fecha del documento debe ser la fecha de hoy")) {
            sugerencia = "No se puede emitir comprobantes con fechas pasadas, ingrese la fecha de HOY. Corrija!!!";
        }
        HashMap hm = new HashMap();

        hm.put("comprobante", comprobante);
        hm.put("sugerencia", sugerencia);
        hm.put("fecha", listRegVenta.get(0).getReveFechaHora());
        hm.put("documento", listRegVenta.get(0).getReveDocumento());
        hm.put("nombres", listRegVenta.get(0).getReveNombres());
        hm.put("direccion", listRegVenta.get(0).getReveDireccion());
        hm.put("tidoId", listRegVenta.get(0).getTidoId());

        Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void lista_tipos_documento(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        HashMap hm = new HashMap();

        String query = " ORDER BY tido_id ASC ";
        List<TablasMaestras> listTiposDocumento = new TablasMaestrasDao().getTiposDocumento(query);
        hm.put("listTiposDocumento", listTiposDocumento);

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void corregir_comprobante(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");

        String reve_id = request.getParameter("reve_id");
        String fecha = request.getParameter("reve_fecha_hora");
        String tido_id = request.getParameter("tido_id");
        String documento = request.getParameter("reve_documento");
        String nombres = request.getParameter("reve_nombres");
        String direccion = request.getParameter("reve_direccion");

        String query = " WHERE a.reve_id = " + reve_id;
        List<Facturacion> listRegVenta = new FacturacionDao().getRegistroVenta(query);

        String comprobante = listRegVenta.get(0).getTiemNombre().toLowerCase();
        Integer ticl_id = 0;
        if (comprobante.contains("factura")) {
            ticl_id = 2;
        }
        if (comprobante.contains("boleta")) {
            ticl_id = 1;
        }

        HashMap hm = new HashMap();

        try {

            SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss.SSS");
            Date ahora = new Date();
            String horaActual = dateFormat1.format(ahora);

            SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss.SSS");
            Date parsedDate = dateFormat2.parse(fecha + " " + horaActual);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

            Facturacion bean = new Facturacion();
            bean.setReveId(Integer.parseInt(reve_id));
            bean.setReveFechaHora(timestamp);
            bean.setReveDocumento(documento);
            bean.setReveNombres(nombres);
            bean.setReveDireccion(direccion);
            bean.setTiclId(ticl_id);
            bean.setTidoId(Integer.parseInt(tido_id.split("_")[0]));
            new FacturacionDao().updateRegistroVenta(bean);

            hm.put("success", true);
            hm.put("msg", "Se actualizó la corrección correctamente");

        } catch (NumberFormatException | java.text.ParseException ex) {
            hm.put("success", false);
            hm.put("msg", "No se pudo actualizar la corrección");
            //hm.put("msg", ex.toString());
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);
    }

    private void emitir_comprobante(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        Integer ticl_id = Integer.parseInt(request.getParameter("ticl_id"));
        Integer tiem_id = ticl_id;
        Integer tido_id = Integer.parseInt(request.getParameter("tido_id"));

        Boolean esProducto = request.getParameter("esProducto") != null;
        Boolean esServicio = request.getParameter("esServicio") != null;
        String[] bien_Ids = null;
        String[] bien_Nombres = null;
        if (esProducto) {
            bien_Ids = request.getParameterValues("prod_id");
            bien_Nombres = request.getParameterValues("prod_nombre");
        }
        if (esServicio) {
            bien_Ids = request.getParameterValues("serv_id");
            bien_Nombres = request.getParameterValues("serv_nombre");
        }
        String[] cantidad = request.getParameterValues("revd_cantidad");
        String[] precio_unitario = request.getParameterValues("revd_precio_unitario");
        String[] monto = request.getParameterValues("revd_monto");

        String reve_documento = request.getParameter("reve_documento") == null ? "" : request.getParameter("reve_documento");
        String reve_nombres = request.getParameter("reve_nombres") == null ? "" : request.getParameter("reve_nombres");
        String reve_direccion = request.getParameter("reve_direccion") == null ? "" : request.getParameter("reve_direccion");

        HashMap hm = new HashMap();

        List<Facturacion> listIgv = new FacturacionDao().getIgv("");
        String igv_abreviatura = listIgv.get(0).getIgvAbreviatura();
        BigDecimal igv_porcentaje = listIgv.get(0).getIgvPorcentaje();
        Boolean igv_estado = listIgv.get(0).getIgvEstado();
        BigDecimal tasaIgv = (igv_porcentaje.divide(new BigDecimal(100), 4)).add(new BigDecimal(1));

        hm.put("igv_abreviatura", igv_abreviatura);
        hm.put("igv_porcentaje", igv_porcentaje);
        hm.put("igv_estado", igv_estado);
        hm.put("tasaIgv", tasaIgv);

        try {
            Ventas bean = new Ventas();
            LocalDateTime ldt = LocalDateTime.now();
            bean.setReveFechaHora(Timestamp.valueOf(ldt));
            bean.setReveDocumento(reve_documento);
            bean.setReveNombres(reve_nombres);
            bean.setReveDireccion(reve_direccion);
            bean.setReveChofer(null);
            bean.setRevePlaca(null);
            bean.setReveKilometraje(null);
            bean.setReveIgv(igv_estado);
            bean.setReveEstado("emitido");
            bean.setTudiId(null);
            bean.setTrabId(null);
            bean.setTiemId(tiem_id);
            bean.setTiveId(1);
            bean.setTiclId(ticl_id);
            bean.setTidoId(tido_id);

            String queryEmis = " WHERE a.tiem_id = " + tiem_id;
            List<Ventas> listEmision = new VentasDao().getTiposEmision(queryEmis);
            String tipo_comp = listEmision.get(0).getTicoSunat();
            hm.put("tipo_comp", tipo_comp);

            String queryCorr = " WHERE a.tiem_id = " + tiem_id;
            List<Ventas> listCorrelativo = new VentasDao().getCorrelativoEmision(queryCorr);
            int longitud = listCorrelativo.get(0).getCoemLongitud();
            bean.setCoemLongitud(longitud);

            String sigla = listCorrelativo.get(0).getCoemSigla();
            String sede = listCorrelativo.get(0).getCoemSede();
            int correl = listCorrelativo.get(0).getCoemCorrelativo();
            String correlFormat = devolverCorrelativo(correl, longitud);
            String serie = sigla + sede;
            String comprobante = sigla + sede + "-" + correl;
            bean.setReveNroComprobante(comprobante);

            bean.setReveEnvioOse("pendiente");
            bean.setReveEnvioError(null);

            hm.put("emision_nombre", listCorrelativo.get(0).getTiemNombre());
            hm.put("emision_serie", serie);
            hm.put("emision_correlFormat", correlFormat);

            List<Facturacion> listOseE = new FacturacionDao().getOse("");
            hm.put("ose_url", listOseE.get(0).getOseUrlConsulta());
            hm.put("ose_resolucion", listOseE.get(0).getOseResolucion());

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

            String formatoXML = empr_ruc + "-" + tipo_comp + "-" + serie + "-" + correl + ".XML";
            byte[] encodedBytes = Base64.getEncoder().encode(formatoXML.getBytes());
            String codigo_hash = new String(encodedBytes);
            hm.put("codigo_hash", codigo_hash);

            String queryTigv = " WHERE tigv_estado = true ";
            List<Facturacion> listTipoIgv = new FacturacionDao().getTipoIgv(queryTigv);
            String tipo_igv_nombre = listTipoIgv.get(0).getTigvNombre();
            Integer tipo_igv_id = listTipoIgv.get(0).getTigvId();
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

            if (bien_Ids == null || bien_Ids.length < 1) {
                hm.put("success", false);
                if (esProducto) {
                    hm.put("msg", "No se ha ingresado ningún registro de producto");
                }
                if (esServicio) {
                    hm.put("msg", "No se ha ingresado ningún registro de servicio");
                }
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

                        new VentasDao().insertRegistroVenta(bean);

                        for (int i = 0; i < bien_Ids.length; i++) {
                            Integer bien_id = Integer.parseInt(bien_Ids[i]);
                            Ventas beanIns = new Ventas();
                            beanIns.setRevdSurtidor(null);
                            beanIns.setRevdLado(null);
                            beanIns.setRevdProducto(bien_Nombres[i]);
                            if (precio_unitario[i].equals("")) {
                                beanIns.setRevdPrecioUnitario(null);
                            } else {
                                beanIns.setRevdPrecioUnitario(new BigDecimal(precio_unitario[i].replaceAll("\\s", "").trim()));
                            }
                            beanIns.setRevdDescuentoPrecio(null);
                            if (cantidad[i].equals("")) {
                                beanIns.setRevdCantidad(null);
                            } else {
                                beanIns.setRevdCantidad(new BigDecimal(cantidad[i].replaceAll("\\s", "").trim()));
                            }
                            if (monto[i].equals("")) {
                                beanIns.setRevdMonto(null);
                            } else {
                                beanIns.setRevdMonto(new BigDecimal(monto[i].replaceAll("\\s", "").trim()));
                            }
                            beanIns.setReveId(bean.getReveId());
                            if (tipo_igv_nombre.toLowerCase().contains("gravado")) {
                                if (monto[i].equals("")) {
                                    beanIns.setRevdOpGravada(null);
                                } else {
                                    BigDecimal gravada = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                    if (igv_estado) {
                                        beanIns.setRevdOpGravada(gravada.divide(tasaIgv, 4, RoundingMode.CEILING));
                                    } else {
                                        beanIns.setRevdOpGravada(gravada);
                                    }
                                }
                            } else {
                                beanIns.setRevdOpGravada(null);
                            }
                            if (tipo_igv_nombre.toLowerCase().contains("exonerado")) {
                                if (monto[i].equals("")) {
                                    beanIns.setRevdOpExonerada(null);
                                } else {
                                    BigDecimal exonerada = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                    if (igv_estado) {
                                        beanIns.setRevdOpExonerada(exonerada.divide(tasaIgv, 4, RoundingMode.CEILING));
                                    } else {
                                        beanIns.setRevdOpExonerada(exonerada);
                                    }
                                }
                            } else {
                                beanIns.setRevdOpExonerada(null);
                            }
                            if (tipo_igv_nombre.toLowerCase().contains("inafecto")) {
                                if (monto[i].equals("")) {
                                    beanIns.setRevdOpInafecta(null);
                                } else {
                                    BigDecimal inafecta = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                    if (igv_estado) {
                                        beanIns.setRevdOpInafecta(inafecta.divide(tasaIgv, 4, RoundingMode.CEILING));
                                    } else {
                                        beanIns.setRevdOpInafecta(inafecta);
                                    }
                                }
                            } else {
                                beanIns.setRevdOpInafecta(null);
                            }
                            if (tipo_igv_nombre.toLowerCase().contains("exportación")) {
                                if (monto[i].equals("")) {
                                    beanIns.setRevdOpGratuita(null);
                                } else {
                                    BigDecimal gratuita = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                    if (igv_estado) {
                                        beanIns.setRevdOpGratuita(gratuita.divide(tasaIgv, 4, RoundingMode.CEILING));
                                    } else {
                                        beanIns.setRevdOpGratuita(gratuita);
                                    }
                                }
                            } else {
                                beanIns.setRevdOpGratuita(null);
                            }
                            beanIns.setTigvId(tipo_igv_id);

                            if (esProducto) {
                                String query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                                List<TablasMaestras> listBien = new TablasMaestrasDao().getProductos(query);
                                beanIns.setRevdUnidadMedida(listBien.get(0).getUnmeNombre());
                                beanIns.setRevdUnidadMedidaSimbolo(listBien.get(0).getUnmeSimbolo());
                                beanIns.setRevdUnidadMedidaOse(listBien.get(0).getUnmeOse());
                                beanIns.setProdCodigoSunat(listBien.get(0).getProdCodigoSunat());
                                beanIns.setProdId(bien_id);
                                beanIns.setServId(null);
                            }
                            if (esServicio) {
                                String query = " WHERE a.serv_estado = 'A' ORDER BY a.serv_nombre ASC ";
                                List<TablasMaestras> listBien = new TablasMaestrasDao().getServicios(query);
                                beanIns.setRevdUnidadMedida(listBien.get(0).getUnmeNombre());
                                beanIns.setRevdUnidadMedidaSimbolo(listBien.get(0).getUnmeSimbolo());
                                beanIns.setRevdUnidadMedidaOse(listBien.get(0).getUnmeOse());
                                beanIns.setProdCodigoSunat(listBien.get(0).getServCodigoSunat());
                                beanIns.setProdId(null);
                                beanIns.setServId(bien_id);
                            }
                            new VentasDao().insertRegistroVentaDetalle(beanIns);
                        }

                        hm.put("fecha_emision", bean.getReveFechaHora());

                        hm.put("tipo_doc", "-");
                        hm.put("clie_nombre", bean.getReveNombres());
                        hm.put("clie_documento", "");
                        hm.put("clie_documento_hash", "-");
                        hm.put("clie_direccion", bean.getReveDireccion());

                        String query = " WHERE reve_id =" + bean.getReveId();
                        List<Ventas> list = new VentasDao().getRegistroVentaDetalle(query);

                        hm.put("list", list);

                        hm.put("success", true);
                        hm.put("msg", "Se emitió correctamente el registro de venta");

                    } else {

                        if (reve_documento.length() > 0 && reve_documento.length() < tido_caracteres) {
                            hm.put("success", false);
                            hm.put("msg", "El " + tido_nombre + " debe tener " + tido_caracteres + " digitos");
                        } else {

                            new VentasDao().insertRegistroVenta(bean);

                            for (int i = 0; i < bien_Ids.length; i++) {
                                Integer bien_id = Integer.parseInt(bien_Ids[i]);
                                Ventas beanIns = new Ventas();
                                beanIns.setRevdSurtidor(null);
                                beanIns.setRevdLado(null);
                                beanIns.setRevdProducto(bien_Nombres[i]);
                                if (precio_unitario[i].equals("")) {
                                    beanIns.setRevdPrecioUnitario(null);
                                } else {
                                    beanIns.setRevdPrecioUnitario(new BigDecimal(precio_unitario[i].replaceAll("\\s", "").trim()));
                                }
                                beanIns.setRevdDescuentoPrecio(null);
                                if (cantidad[i].equals("")) {
                                    beanIns.setRevdCantidad(null);
                                } else {
                                    beanIns.setRevdCantidad(new BigDecimal(cantidad[i].replaceAll("\\s", "").trim()));
                                }
                                if (monto[i].equals("")) {
                                    beanIns.setRevdMonto(null);
                                } else {
                                    beanIns.setRevdMonto(new BigDecimal(monto[i].replaceAll("\\s", "").trim()));
                                }
                                beanIns.setReveId(bean.getReveId());
                                if (tipo_igv_nombre.toLowerCase().contains("gravado")) {
                                    if (monto[i].equals("")) {
                                        beanIns.setRevdOpGravada(null);
                                    } else {
                                        BigDecimal gravada = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                        if (igv_estado) {
                                            beanIns.setRevdOpGravada(gravada.divide(tasaIgv, 4, RoundingMode.CEILING));
                                        } else {
                                            beanIns.setRevdOpGravada(gravada);
                                        }
                                    }
                                } else {
                                    beanIns.setRevdOpGravada(null);
                                }
                                if (tipo_igv_nombre.toLowerCase().contains("exonerado")) {
                                    if (monto[i].equals("")) {
                                        beanIns.setRevdOpExonerada(null);
                                    } else {
                                        BigDecimal exonerada = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                        if (igv_estado) {
                                            beanIns.setRevdOpExonerada(exonerada.divide(tasaIgv, 4, RoundingMode.CEILING));
                                        } else {
                                            beanIns.setRevdOpExonerada(exonerada);
                                        }
                                    }
                                } else {
                                    beanIns.setRevdOpExonerada(null);
                                }
                                if (tipo_igv_nombre.toLowerCase().contains("inafecto")) {
                                    if (monto[i].equals("")) {
                                        beanIns.setRevdOpInafecta(null);
                                    } else {
                                        BigDecimal inafecta = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                        if (igv_estado) {
                                            beanIns.setRevdOpInafecta(inafecta.divide(tasaIgv, 4, RoundingMode.CEILING));
                                        } else {
                                            beanIns.setRevdOpInafecta(inafecta);
                                        }
                                    }
                                } else {
                                    beanIns.setRevdOpInafecta(null);
                                }
                                if (tipo_igv_nombre.toLowerCase().contains("exportación")) {
                                    if (monto[i].equals("")) {
                                        beanIns.setRevdOpGratuita(null);
                                    } else {
                                        BigDecimal gratuita = new BigDecimal(monto[i].replaceAll("\\s", "").trim());
                                        if (igv_estado) {
                                            beanIns.setRevdOpGratuita(gratuita.divide(tasaIgv, 4, RoundingMode.CEILING));
                                        } else {
                                            beanIns.setRevdOpGratuita(gratuita);
                                        }
                                    }
                                } else {
                                    beanIns.setRevdOpGratuita(null);
                                }
                                beanIns.setTigvId(tipo_igv_id);

                                if (esProducto) {
                                    String query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                                    List<TablasMaestras> listBien = new TablasMaestrasDao().getProductos(query);
                                    beanIns.setRevdUnidadMedida(listBien.get(0).getUnmeNombre());
                                    beanIns.setRevdUnidadMedidaSimbolo(listBien.get(0).getUnmeSimbolo());
                                    beanIns.setRevdUnidadMedidaOse(listBien.get(0).getUnmeOse());
                                    beanIns.setProdCodigoSunat(listBien.get(0).getProdCodigoSunat());
                                    beanIns.setProdId(bien_id);
                                    beanIns.setServId(null);
                                }
                                if (esServicio) {
                                    String query = " WHERE a.serv_estado = 'A' ORDER BY a.serv_nombre ASC ";
                                    List<TablasMaestras> listBien = new TablasMaestrasDao().getServicios(query);
                                    beanIns.setRevdUnidadMedida(listBien.get(0).getUnmeNombre());
                                    beanIns.setRevdUnidadMedidaSimbolo(listBien.get(0).getUnmeSimbolo());
                                    beanIns.setRevdUnidadMedidaOse(listBien.get(0).getUnmeOse());
                                    beanIns.setProdCodigoSunat(listBien.get(0).getServCodigoSunat());
                                    beanIns.setProdId(null);
                                    beanIns.setServId(bien_id);
                                }
                                new VentasDao().insertRegistroVentaDetalle(beanIns);
                            }

                            hm.put("fecha_emision", bean.getReveFechaHora());
                            hm.put("tipo_doc", listDoc.get(0).getTidoOse());
                            hm.put("clie_nombre", bean.getReveNombres());
                            hm.put("clie_documento", bean.getReveDocumento());
                            hm.put("clie_documento_hash", bean.getReveDocumento());
                            hm.put("clie_direccion", bean.getReveDireccion());

                            String query = " WHERE reve_id =" + bean.getReveId();
                            List<Ventas> list = new VentasDao().getRegistroVentaDetalle(query);

                            hm.put("list", list);

                            hm.put("success", true);
                            hm.put("msg", "Se emitió correctamente el comprobante de venta");
                        }
                    }

                }

            }
        } catch (NumberFormatException e) {
            hm.put("success", false);
            hm.put("msg", "No se pudo emitir el comprobante de venta. Intente Nuevamente!!");
        }

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

    //***********************************************************************************************************************************************************************
    //**********************************  FACTURACION ELECTRONICA -->  ENVIO A OSE  *****************************************************************************************
    //***********************************************************************************************************************************************************************
    List<Facturacion> listOse = new FacturacionDao().getOse("");

    // URL de la API del Operador de Servicios Electrónicos (OSE) para envio de comprobantes
    private final String RUTA = listOse.get(0).getOseUrlApi();

    // TOKEN de validación para la API del Operador de Servicios Electrónicos (OSE) 
    private final String TOKEN = listOse.get(0).getOseToken();

    //========= FUNCION PARA GENERACION Y ENVIO DE COMPROBANTES ===========================================================================================================//
    public void generarComprobante(Integer id) {

        Ventas beanV = new Ventas();

        try {
            HttpClient cliente = new DefaultHttpClient();
            HttpPost post = new HttpPost(RUTA);
            post.addHeader("Authorization", "Token token=" + TOKEN); // Cabecera del token
            post.addHeader("Content-Type", "application/json"); // Cabecera del Content-Type

            String query = " WHERE a.reve_id = " + id;
            List<Ventas> list = new VentasDao().getRegistroVenta(query);

            String comprobante = list.get(0).getReveNroComprobante();
            String[] comprobanteArray = comprobante.split("-");

            String querySunatTrans = " WHERE sutr_estado = true ";
            List<Facturacion> listSunatTrans = new FacturacionDao().getSunatTransaccion(querySunatTrans);

            String cliente_numero_de_documento;
            String cliente_tipo_de_documento;
            if (list.get(0).getReveDocumento() != null && !list.get(0).getReveDocumento().trim().isEmpty()) {
                cliente_tipo_de_documento = list.get(0).getTidoOse();
                cliente_numero_de_documento = list.get(0).getReveDocumento();
            } else {
                cliente_tipo_de_documento = "-";
                cliente_numero_de_documento = "-";
            }
            String cliente_denominacion;
            if (list.get(0).getReveNombres() != null && !list.get(0).getReveNombres().trim().isEmpty()) {
                cliente_denominacion = list.get(0).getReveNombres();
            } else {
                cliente_denominacion = "";
            }
            String cliente_direccion;
            if (list.get(0).getReveDireccion() != null && !list.get(0).getReveDireccion().trim().isEmpty()) {
                cliente_direccion = list.get(0).getReveDireccion();
            } else {
                cliente_direccion = "";
            }
            Timestamp ts = list.get(0).getReveFechaHora();
            Date fecha = new Date();
            fecha.setTime(ts.getTime());
            String formatFecha = new SimpleDateFormat("dd-MM-yyyy").format(fecha);

            String queryMone = " WHERE mone_estado = true ";
            List<Facturacion> listMone = new FacturacionDao().getMoneda(queryMone);

            List<Facturacion> listIgv = new FacturacionDao().getIgv("");
            String porcentaje_de_igv = listIgv.get(0).getIgvPorcentaje().toString();
            Boolean igv_estado = list.get(0).getReveIgv();
            BigDecimal tasaIgv = (listIgv.get(0).getIgvPorcentaje().divide(new BigDecimal(100), 4)).add(new BigDecimal(1));

            String queryMontos = " WHERE reve_id = " + id + " GROUP BY reve_id ";
            List<Ventas> listMontos = new VentasDao().getRegistroVentasDetalleMontos(queryMontos);

            String total_descuento = "";
            if (listMontos.get(0).getRevdDescuento() != null && listMontos.get(0).getRevdDescuento().compareTo(BigDecimal.ZERO) != 0) {
                total_descuento = listMontos.get(0).getRevdDescuento().toString();
            } else {
                total_descuento = "";
            }
            String total;
            BigDecimal Btotal;
            if (listMontos.get(0).getRevdMonto() != null && listMontos.get(0).getRevdMonto().compareTo(BigDecimal.ZERO) != 0) {
                total = listMontos.get(0).getRevdMonto().toString();
                Btotal = listMontos.get(0).getRevdMonto();
            } else {
                total = "";
                Btotal = new BigDecimal(BigInteger.ZERO);
            }
            String total_igv = "";
            String total_gravada;
            if (listMontos.get(0).getRevdOpGravada() != null && listMontos.get(0).getRevdOpGravada().compareTo(BigDecimal.ZERO) != 0) {
                total_gravada = listMontos.get(0).getRevdOpGravada().toString();
                total_igv = (Btotal.subtract(listMontos.get(0).getRevdOpGravada())).toString();
            } else {
                total_gravada = "";
            }
            String total_inafecta;
            if (listMontos.get(0).getRevdOpInafecta() != null && listMontos.get(0).getRevdOpInafecta().compareTo(BigDecimal.ZERO) != 0) {
                total_inafecta = listMontos.get(0).getRevdOpInafecta().toString();
                total_igv = (Btotal.subtract(listMontos.get(0).getRevdOpInafecta())).toString();
            } else {
                total_inafecta = "";
            }
            String total_exonerada;
            if (listMontos.get(0).getRevdOpExonerada() != null && listMontos.get(0).getRevdOpExonerada().compareTo(BigDecimal.ZERO) != 0) {
                total_exonerada = listMontos.get(0).getRevdOpExonerada().toString();
                total_igv = (Btotal.subtract(listMontos.get(0).getRevdOpExonerada())).toString();
            } else {
                total_exonerada = "";
            }
            String total_gratuita;
            if (listMontos.get(0).getRevdOpGratuita() != null && listMontos.get(0).getRevdOpGratuita().compareTo(BigDecimal.ZERO) != 0) {
                total_gratuita = listMontos.get(0).getRevdOpGratuita().toString();
                total_igv = (Btotal.subtract(listMontos.get(0).getRevdOpGratuita())).toString();
            } else {
                total_gratuita = "";
            }

            String placa_vehiculo;
            if (list.get(0).getRevePlaca() != null && !list.get(0).getRevePlaca().trim().isEmpty()) {
                placa_vehiculo = list.get(0).getRevePlaca();
            } else {
                placa_vehiculo = "";
            }

            Integer tipo_venta = list.get(0).getTiveId();

            JSONObject objetoCabecera = new JSONObject();
            objetoCabecera.put("operacion", "generar_comprobante"); // Tipo de operacion con el operador OSE  ====> (Obligatorio)
            objetoCabecera.put("tipo_de_comprobante", list.get(0).getTiemOse().toString()); // Tipo de Comprobante: 1=FACTURA, 2=BOLETA  ====> (Obligatorio)           
            objetoCabecera.put("serie", comprobanteArray[0]); // Comienza con F: para Facturas y B: para Boletas + la sede o local  ====> (Obligatorio)
            objetoCabecera.put("numero", comprobanteArray[1]); // Número correlativo del documento sin ceros a la izquierda  ====> (Obligatorio)
            objetoCabecera.put("sunat_transaction", listSunatTrans.get(0).getSutrId().toString()); // Transacción de Sunat, por defectos se usa el 1=VENTA INTERNA  ====> (Obligatorio)
            objetoCabecera.put("cliente_tipo_de_documento", cliente_tipo_de_documento); // Tipo de documento del cliente: 1=DNI, 6=RUC  ====> (Obligatorio)
            objetoCabecera.put("cliente_numero_de_documento", cliente_numero_de_documento); // Número de documento del cliente: Número de RUC, Número de DNI  ====> (Obligatorio)
            objetoCabecera.put("cliente_denominacion", cliente_denominacion); // Razón social, nombre completo ó denominación del cliente  ====> (Obligatorio)
            objetoCabecera.put("cliente_direccion", cliente_direccion); // Dirección completa  ====> (Obligatorio para FACTURA, Opcional para BOLETA) 
            objetoCabecera.put("cliente_email", ""); // Dirección de email principal, debe ser válido  ====> (Opcional) 
            objetoCabecera.put("cliente_email_1", ""); // Dirección de email secundaria, debe ser válido  ====> (Opcional)
            objetoCabecera.put("cliente_email_2", ""); // Dirección de email secundaria, debe ser válido  ====> (Opcional)
            objetoCabecera.put("fecha_de_emision", formatFecha); // Fecha de Emisión del día actual. Formato dd-MM-yyyy (Ejemplo: 20-03-2019)  ====> (Obligatorio) 
            objetoCabecera.put("fecha_de_vencimiento", ""); // Debe ser fecha posterior a la fecha de emisión (no debe sobrepasar los siete días)  ====> (Opcional)
            objetoCabecera.put("moneda", listMone.get(0).getMoneId().toString()); // Moneda usada en el negocio: 1=SOLES, 2=DÓLARES, 3=EUROS  ====> (Obligatorio)
            objetoCabecera.put("tipo_de_cambio", ""); // Tipo de cambio de la moneda. Ejemplo tipo cambio del dólar es: 3.30  ====> (Condicional de acuerdo a la moneda)
            objetoCabecera.put("porcentaje_de_igv", porcentaje_de_igv); // Porcentaje o tasa del Impuesto General a las Ventas (IGV). Valor numérico con 2 decimales  ====> (Obligatorio) 
            objetoCabecera.put("descuento_global", ""); // Descuento Global. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_descuento", total_descuento); // Total de Descuentos. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_anticipo", ""); // Total de Anticipos. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_gravada", total_gravada); // Total de Operaciones Gravadas. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_inafecta", total_inafecta); // Total de Operaciones Inafectas. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_exonerada", total_exonerada); // Total de Operaciones Exoneradas. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_igv", total_igv); // Total del IGV de la Venta. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_gratuita", total_gratuita); // Total de Operaciones Gratuitas. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total_otros_cargos", ""); // Total de Otros Cargos. Valor numérico con 2 decimales  ====> (Condicional)
            objetoCabecera.put("total", total); // Total de la Venta. Valor numérico con 2 decimales  ====> (Obligatorio)
            objetoCabecera.put("percepcion_tipo", ""); // Tipo de percepción por la venta  ====> (Condicional)
            objetoCabecera.put("percepcion_base_imponible", ""); // Percepción de Base imponible  ====> (Condicional)
            objetoCabecera.put("total_percepcion", ""); // Total de percepción por la venta  ====> (Condicional)
            objetoCabecera.put("total_incluido_percepcion", ""); // Total sumado con el total de percepción por la venta  ====> (Condicional)
            objetoCabecera.put("detraccion", "false"); // Detracción de la venta: false=FALSO, true=VERDADERO ====> (Condicional)
            objetoCabecera.put("observaciones", ""); // Observaciones realizadas a la venta  ====> (Opcional)
            objetoCabecera.put("documento_que_se_modifica_tipo", ""); // Tipo de documento que se modifica: 1=FACTURAS, 2=BOLETAS  ====> (Condicional)
            objetoCabecera.put("documento_que_se_modifica_serie", ""); // Serie de la FACTURA o BOLETA que se modifica  ====> (Condicional)
            objetoCabecera.put("documento_que_se_modifica_numero", ""); // Número de la FACTURA o BOLETA que se modifica  ====> (Condicional)
            objetoCabecera.put("tipo_de_nota_de_credito", ""); // Tipo de Nota de Crédito: 1=ANULACION DE LA OPERACIÓN, 2=ANULACIÖN POR ERROR EN EL RUC, etc.  ====> (Condicional)
            objetoCabecera.put("tipo_de_nota_de_debito", ""); // Tipo de Nota de Débito: 1=INTERESES POR MORA, 2=AUMENTO DE VALOR, 3=PENALIDADES  ====> (Condicional)
            objetoCabecera.put("enviar_automaticamente_a_la_sunat", "true"); // Se quiere enviar automáticamente a la SUNAT: false=FALSO, true=VERDADERO  ====> (Condicional)
            objetoCabecera.put("enviar_automaticamente_al_cliente", "false"); // Se quiere enviar automáticamente al Cliente: false=FALSO, true=VERDADERO  ====> (Condicional)
            objetoCabecera.put("codigo_unico", ""); // Código único generado por el emisor si se desea que NUBEFACT controle la generación de documentos  ====> (Opcional)            
            objetoCabecera.put("placa_vehiculo", placa_vehiculo); // Placa de Vehículo. Ejemplo: "ALF-321"  ====> (Opcional)
            objetoCabecera.put("orden_compra_servicio", ""); // Orden de Compra de Servicio. Ejemplo: "56897"  ====> (Opcional)
            objetoCabecera.put("tabla_personalizada_codigo", ""); // Código de tabla configurada en NUBEFACT  ====> (Opcional)
            objetoCabecera.put("formato_de_pdf", "A4"); // Formato de PDF que se desea generar en la página web de NUBEFACT: A4, A5, TICKET  ====> (Opcional)
            // Si el tipo de venta es al contado
            if (tipo_venta == 1) {
                objetoCabecera.put("medio_de_pago", "efectivo"); // Medio de Pago. Ejemplo: "Tarjeta VISA Op. 15687"  ====> (Opcional)
            }
            // Si el tipo de venta es a crédito
            if (tipo_venta == 2) {
                objetoCabecera.put("medio_de_pago", "credito"); // Medio de Pago.
                Integer periodo_credito = list.get(0).getRevePeriodoCredito();
                Integer cuotas_credito = list.get(0).getReveCuotasCredito();
                BigDecimal monto_credito = list.get(0).getReveMontoCredito();
                String fecha_credito = list.get(0).getReveFechaVencimientoCredito();
                String[] arrayFecha = fecha_credito.split("/");
                objetoCabecera.put("condiciones_de_pago", "CRÉDITO a " + periodo_credito + " días"); // Condiciones de Pago   
                JSONArray credito = new JSONArray();
                for (int i = 0; i < cuotas_credito; i++) {
                    String fechaParse = arrayFecha[2] + "-" + arrayFecha[1] + "-" + arrayFecha[0];
                    String fechaNew = LocalDate.parse(fechaParse).plusDays(i * periodo_credito).toString();
                    String[] arrayFNew = fechaNew.split("-");
                    JSONObject creditoItem = new JSONObject();
                    creditoItem.put("cuota", i + 1);
                    creditoItem.put("fecha_de_pago", arrayFNew[2] + "-" + arrayFNew[1] + "-" + arrayFNew[0]);
                    creditoItem.put("importe", monto_credito);
                    credito.add(creditoItem);
                }
                objetoCabecera.put("venta_al_credito", credito);
            }

            String queryDet = " WHERE reve_id = " + id + " ORDER BY revd_id ASC ";
            List<Ventas> listDet = new VentasDao().getRegistroVentaDetalle(queryDet);

            JSONArray listaDetJSON = new JSONArray();

            listDet.stream().forEach(
                    t -> {
                        JSONObject detalle_linea = new JSONObject();
                        detalle_linea.put("unidad_de_medida", t.getRevdUnidadMedidaOse()); // Unidad de Medida registrada en la cuenta de NUBEFACT: NIU=PRODUCTO, ZZ=SERVICIO ====> (Obligatorio)  
                        detalle_linea.put("codigo", t.getProdId().toString()); // Código interno en base de datos del producto o servicio. Ejemplo: "1"  ====> (Obligatorio)
                        detalle_linea.put("descripcion", t.getRevdProducto()); // Descripción del producto o servicio. Ejemplo: "Gasolina 90 Octanos"  ====> (Obligatorio) 
                        detalle_linea.put("cantidad", t.getRevdCantidad().toString()); // Cantidad de producto o servicio vendido  ====> (Obligatorio)
                        if (igv_estado) {
                            detalle_linea.put("valor_unitario", t.getRevdPrecioUnitario().divide(tasaIgv, 2, RoundingMode.CEILING).toString()); // Precio Unitario de Producto sin IGV  ====> (Obligatorio)
                        } else {
                            detalle_linea.put("valor_unitario", t.getRevdPrecioUnitario().toString()); // Precio Unitario de Producto sin IGV  ====> (Obligatorio)
                        }
                        detalle_linea.put("precio_unitario", t.getRevdPrecioUnitario().toString()); // Precio Unitario de Producto con IGV  ====> (Obligatorio)
                        if (t.getRevdDescuentoPrecio() != null && t.getRevdDescuentoPrecio().compareTo(BigDecimal.ZERO) != 0) {
                            detalle_linea.put("descuento", t.getRevdDescuentoPrecio().toString()); // Descuento al Precio Unitario de Producto ====> (Opcional)
                        } else {
                            detalle_linea.put("descuento", ""); // Descuento al Precio Unitario de Producto ====> (Opcional)
                        }
                        if (igv_estado) {
                            detalle_linea.put("subtotal", t.getRevdMonto().divide(tasaIgv, 2, RoundingMode.CEILING).toString()); // Total de la Venta de Producto sin IGV  ====> (Obligatorio)
                        } else {
                            detalle_linea.put("subtotal", t.getRevdMonto().toString()); // Total de la Venta de Producto sin IGV  ====> (Obligatorio)
                        }
                        detalle_linea.put("tipo_de_igv", t.getTigvId().toString()); // Tipo de IGV de la venta ====> (Obligatorio)
                        if (igv_estado) {
                            detalle_linea.put("igv", t.getRevdMonto().subtract(t.getRevdMonto().divide(tasaIgv, 2, RoundingMode.CEILING)).toString()); // Total del IGV de la Venta  ====> (Obligatorio)
                        } else {
                            detalle_linea.put("igv", t.getRevdMonto().subtract(t.getRevdMonto()).toString()); // Total del IGV de la Venta  ====> (Obligatorio)
                        }
                        detalle_linea.put("total", t.getRevdMonto().toString()); // Total de la Venta del Producto ====> (Obligatorio)
                        detalle_linea.put("anticipo_regularizacion", "false"); // Para indicar que se desea regularizar un anticipo: false=FALSO, true=VERDADERO  ====> (Obligatorio)
                        detalle_linea.put("anticipo_documento_serie", ""); // Serie del documento que contiene el anticipo  ====> (Condicional)
                        detalle_linea.put("anticipo_documento_numero", ""); // Número del documento que contiene el anticipo  ====> (Condicional)
                        detalle_linea.put("codigo_producto_sunat", t.getProdCodigoSunat()); // Código de Producto del Catálogo de Productos SUNAT (obligatorio desde 01/01/2019)  ====> (Obligatorio)
                        listaDetJSON.add(detalle_linea);
                    }
            );
            objetoCabecera.put("items", listaDetJSON);

            System.out.println("json -> " + objetoCabecera);

            StringEntity parametros = new StringEntity(objetoCabecera.toString(), StandardCharsets.UTF_8);
            post.setEntity(parametros);

            HttpResponse response = cliente.execute(post);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
            String linea = "";
            if ((linea = rd.readLine()) != null) {

                JSONParser parsearRsptaJson = new JSONParser();
                JSONObject json_rspta = (JSONObject) parsearRsptaJson.parse(linea);

                if (json_rspta.get("errors") != null) {
                    beanV.setReveEnvioOse("error");
                    beanV.setReveEnvioError((String) json_rspta.get("errors"));
                    beanV.setReveId(id);
                    new VentasDao().updateRegistroVentaEstadoEnvioOSE(beanV);

                    System.out.println(json_rspta);

                } else {

                    beanV.setReveEnvioOse("enviado");
                    beanV.setReveEnvioError("Ha sido aceptado por la OSE");
                    beanV.setReveId(id);
                    new VentasDao().updateRegistroVentaEstadoEnvioOSE(beanV);

                    Facturacion beanF = new Facturacion();
                    beanF.setReveId(id);
                    beanF.setFaelSunatEstado((Boolean) json_rspta.get("aceptada_por_sunat"));
                    String sunatDescription;
                    if (json_rspta.get("sunat_description") != null) {
                        sunatDescription = (String) json_rspta.get("sunat_description");
                    } else {
                        sunatDescription = "Pendiente de envio por parte de la OSE";
                    }
                    beanF.setFaelSunatDescripcion(sunatDescription);
                    String enlacePdf;
                    if (json_rspta.get("enlace_del_pdf") != null) {
                        enlacePdf = (String) json_rspta.get("enlace_del_pdf");
                    } else {
                        enlacePdf = null;
                    }
                    beanF.setFaelPdf(enlacePdf);
                    String enlaceXml;
                    if (json_rspta.get("enlace_del_xml") != null) {
                        enlaceXml = (String) json_rspta.get("enlace_del_xml");
                    } else {
                        enlaceXml = null;
                    }
                    beanF.setFaelXml(enlaceXml);
                    String enlaceCdr;
                    if (json_rspta.get("enlace_del_cdr") != null) {
                        enlaceCdr = (String) json_rspta.get("enlace_del_cdr");
                    } else {
                        enlaceCdr = null;
                    }
                    beanF.setFaelCdr(enlaceCdr);
                    beanF.setFaelEstado("emitido");

                    System.out.println(json_rspta);

                    new FacturacionDao().insertFacturacionElectronica(beanF);

//                    FileWriter file = null;
//                    try {
//                        List<Usuario> listSoft = new UsuarioDao().getDatosSoftware();
//                        String rutaBase = listSoft.get(0).getSoftRuta();
//                        file = new FileWriter(rutaBase + "\\Json\\" + comprobanteArray[0] + "-" + comprobanteArray[1] + ".txt");
//                        file.write(objetoCabecera.toJSONString());
//                    } catch (IOException e) {
//                        System.out.println(e);
//                    } finally {
//                        try {
//                            file.flush();
//                            file.close();
//                        } catch (IOException e) {
//                            System.out.println(e);
//                        }
//                    }

                }
            }
        } catch (UnsupportedEncodingException ex1) {
            beanV.setReveEnvioOse("error");
            beanV.setReveEnvioError((String) ex1.getMessage());
            beanV.setReveId(id);
            new VentasDao().updateRegistroVentaEstadoEnvioOSE(beanV);

            System.out.println(ex1.getMessage());

        } catch (IOException | UnsupportedOperationException | UnsupportedCharsetException | ParseException ex2) {
            beanV.setReveEnvioOse("error");
            beanV.setReveEnvioError((String) ex2.getMessage());
            beanV.setReveId(id);
            new VentasDao().updateRegistroVentaEstadoEnvioOSE(beanV);

            System.out.println(ex2.getMessage());
        }
    }

    //========= FUNCION PARA CONSULTA DE COMPROBANTES ===========================================================================================================//
    public void consultarComprobante(Integer id) {

        try {
            HttpClient cliente = new DefaultHttpClient();
            HttpPost post = new HttpPost(RUTA);
            post.addHeader("Authorization", "Token token=" + TOKEN); // Cabecera del token
            post.addHeader("Content-Type", "application/json"); // Cabecera del Content-Type

            String query = " WHERE a.reve_id = " + id;
            List<Ventas> list = new VentasDao().getRegistroVenta(query);

            String comprobante = list.get(0).getReveNroComprobante();
            String[] comprobanteArray = comprobante.split("-");

            JSONObject objetoCabecera = new JSONObject();
            objetoCabecera.put("operacion", "consultar_comprobante"); // Tipo de operacion con el operador OSE  ====> (Obligatorio)
            objetoCabecera.put("tipo_de_comprobante", list.get(0).getTiemOse().toString()); // Tipo de Comprobante: 1=FACTURA, 2=BOLETA  ====> (Obligatorio)           
            objetoCabecera.put("serie", comprobanteArray[0]); // Comienza con F: para Facturas y B: para Boletas + la sede o local  ====> (Obligatorio)
            objetoCabecera.put("numero", comprobanteArray[1]); // Número correlativo del documento sin ceros a la izquierda  ====> (Obligatorio)       

            StringEntity parametros = new StringEntity(objetoCabecera.toString(), "UTF-8");
            post.setEntity(parametros);
            HttpResponse response = cliente.execute(post);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String linea = "";
            if ((linea = rd.readLine()) != null) {

                JSONParser parsearRsptaJson = new JSONParser();
                JSONObject json_rspta = (JSONObject) parsearRsptaJson.parse(linea);

                if (json_rspta.get("errors") != null) {
                    System.out.println(json_rspta.get("errors"));
                } else {
                    Facturacion bean = new Facturacion();
                    bean.setReveId(id);
                    bean.setFaelSunatEstado((Boolean) json_rspta.get("aceptada_por_sunat"));
                    String sunatDescription;
                    if (json_rspta.get("sunat_description") != null) {
                        sunatDescription = (String) json_rspta.get("sunat_description");
                    } else {
                        sunatDescription = "Pendiente de envio por parte de la OSE";
                    }
                    bean.setFaelSunatDescripcion(sunatDescription);
                    String enlacePdf;
                    if (json_rspta.get("enlace_del_pdf") != null) {
                        enlacePdf = (String) json_rspta.get("enlace_del_pdf");
                    } else {
                        enlacePdf = null;
                    }
                    bean.setFaelPdf(enlacePdf);
                    String enlaceXml;
                    if (json_rspta.get("enlace_del_xml") != null) {
                        enlaceXml = (String) json_rspta.get("enlace_del_xml");
                    } else {
                        enlaceXml = null;
                    }
                    bean.setFaelXml(enlaceXml);
                    String enlaceCdr;
                    if (json_rspta.get("enlace_del_cdr") != null) {
                        enlaceCdr = (String) json_rspta.get("enlace_del_cdr");
                    } else {
                        enlaceCdr = null;
                    }
                    bean.setFaelCdr(enlaceCdr);
                    new FacturacionDao().updateFacturacionElectronica(bean);
                }
            }
        } catch (UnsupportedEncodingException ex1) {
            System.out.println(ex1.getMessage());
        } catch (IOException | UnsupportedOperationException | UnsupportedCharsetException | ParseException ex2) {
            System.out.println(ex2.getMessage());
        }
    }

    //========= FUNCION PARA ANULAR COMPROBANTES ===========================================================================================================//
    public void anularComprobante(Integer id) {

    }

}
