package servlets;

import beans.Almacen;
import com.google.gson.Gson;
import daos.AlmacenDao;
import java.awt.Color;
import java.awt.Paint;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jfree.data.category.DefaultCategoryDataset;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "ReportesServlet", urlPatterns = {"/Reportes"})
@MultipartConfig
public class ReportesServlet extends HttpServlet {

    private static final long serialVersionUID = 1816755134720281712L;

    JFreeChartServlet chart = new JFreeChartServlet();

    Paint blanco = Color.WHITE;
    Paint negro = Color.BLACK;
    Paint semi_negro = new Color(51, 51, 51);

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
            case "tabla":
                tabla(request, response);
                break;
            case "grafica":
                grafica(request, response);
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

    private void tabla(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");

        String reporte = request.getParameter("repo");
        String segmento = request.getParameter("segm");
        String periodo = request.getParameter("peri");

        HashMap hm = new HashMap();

        if (periodo.equals("diario")) {
            String fecha = request.getParameter("fecha");
            if (segmento.equals("combustible")) {
                String producto = request.getParameter("prod");
                String query;
                switch (producto) {
                    case "todos":
                        query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                    case "total":
                        query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                    default:
                        query = " WHERE a.prod_id = " + producto + " AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                }
                List<Almacen> list = new AlmacenDao().getReporteCombustible(fecha, query);
                hm.put("list", list);
            }
        }

        Gson gson = new Gson();
        String arg = gson.toJson(hm);
        response.getWriter().print(arg);

    }

    private void grafica(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");

        String reporte = request.getParameter("repo");
        String segmento = request.getParameter("segm");
        String periodo = request.getParameter("peri");

        if (periodo.equals("diario")) {
            String fecha = request.getParameter("fecha");
            if (segmento.equals("combustible")) {
                String producto = request.getParameter("prod");
                String query;
                switch (producto) {
                    case "todos":
                        query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                    case "total":
                        query = " WHERE a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                    default:
                        query = " WHERE a.prod_id = " + producto + " AND a.prod_estado = 'A' ORDER BY a.prod_nombre ASC ";
                        break;
                }
                List<Almacen> list = new AlmacenDao().getReporteCombustible(fecha, query);
                String titulo = "";
                String tituloY = "";
                if (reporte.equals("ingresos")) {
                    titulo = "GRÁFICO DE INGRESOS - Fecha : " + fecha;
                    tituloY = "Ventas (S/)";
                }
                if (reporte.equals("gastos")) {
                    titulo = "GRÁFICO DE GASTOS - Fecha : " + fecha;
                    tituloY = "Compras (S/)";
                }
                if (reporte.equals("utilidades")) {
                    titulo = "GRÁFICO DE UTILIDADES - Fecha : " + fecha;
                    tituloY = "Utilidades (S/)";
                }
                String formato = "png";
                int ancho = 1200;
                int alto = 500;
                double bar_width = 0.1;
                DefaultCategoryDataset objDataset = new DefaultCategoryDataset();
                DefaultCategoryDataset objDataset2 = new DefaultCategoryDataset();

                BigDecimal ventaT = BigDecimal.ZERO;
                BigDecimal galVenT = BigDecimal.ZERO;
                BigDecimal compraT = BigDecimal.ZERO;
                BigDecimal galCompT = BigDecimal.ZERO;

                for (Almacen datos : list) {
                    BigDecimal galMaq, devoTanq, precio, venta, galComp, compra;
                    BigDecimal neto = BigDecimal.ZERO;
                    if (datos.getLecturaMaquina() == null || datos.getLecturaMaquina().compareTo(BigDecimal.ZERO) == 0) {
                        galMaq = BigDecimal.ZERO;
                    } else {
                        galMaq = datos.getLecturaMaquina();
                        neto = neto.add(datos.getLecturaMaquina());
                        galVenT = galVenT.add(datos.getLecturaMaquina());
                    }
                    if (datos.getDevolucionTanque() == null || datos.getDevolucionTanque().compareTo(BigDecimal.ZERO) == 0) {
                        devoTanq = BigDecimal.ZERO;
                    } else {
                        devoTanq = datos.getDevolucionTanque();
                        neto = neto.subtract(datos.getDevolucionTanque());
                        galVenT = galVenT.subtract(datos.getDevolucionTanque());
                    }
                    if (datos.getPrecioVenta() == null || datos.getPrecioVenta().compareTo(BigDecimal.ZERO) == 0) {
                        precio = BigDecimal.ZERO;
                        venta = BigDecimal.ZERO;
                    } else {
                        precio = datos.getPrecioVenta();
                        venta = neto.multiply(datos.getPrecioVenta());
                        ventaT = ventaT.add(neto.multiply(datos.getPrecioVenta()));
                    }
                    if (datos.getFacdCantidad() == null || datos.getFacdCantidad().compareTo(BigDecimal.ZERO) == 0) {
                        galComp = BigDecimal.ZERO;
                    } else {
                        galComp = datos.getFacdCantidad();
                        galCompT = galCompT.add(datos.getFacdCantidad());
                    }
                    if (datos.getFacdMonto() == null || datos.getFacdMonto().compareTo(BigDecimal.ZERO) == 0) {
                        compra = BigDecimal.ZERO;
                    } else {
                        compra = datos.getFacdMonto();
                        compraT = compraT.add(datos.getFacdMonto());
                    }
                    if (!producto.equals("total")) {
                        if (reporte.equals("ingresos")) {
                            objDataset.setValue(venta, datos.getProdDescripcion() + "", "Productos");
                            objDataset2.setValue(venta, datos.getProdNombre() + " (" + neto + " gal)", "Productos");
                        }
                        if (reporte.equals("gastos")) {
                            objDataset.setValue(compra, datos.getProdDescripcion() + "", "Productos");
                            objDataset2.setValue(compra, datos.getProdNombre() + " (" + galComp + " gal)", "Productos");
                        }
                        if (reporte.equals("utilidades")) {
                            objDataset.setValue(venta.subtract(compra), datos.getProdDescripcion() + "", "Productos");
                            objDataset2.setValue(venta.subtract(compra), datos.getProdNombre() + " (" + neto.subtract(galComp) + " gal)", "Productos");
                        }
                    }
                }

                if (producto.equals("total")) {
                    if (reporte.equals("ingresos")) {
                        objDataset.setValue(ventaT, producto.toUpperCase() + "", "Productos");
                        objDataset2.setValue(ventaT, "(" + galVenT + " gal)", "Productos");
                    }
                    if (reporte.equals("gastos")) {
                        objDataset.setValue(compraT, producto.toUpperCase() + "", "Productos");
                        objDataset2.setValue(compraT, "(" + galCompT + " gal)", "Productos");
                    }
                    if (reporte.equals("utilidades")) {
                        objDataset.setValue(ventaT.subtract(compraT), producto.toUpperCase() + "", "Productos");
                        objDataset2.setValue(ventaT.subtract(compraT), "(" + galVenT.subtract(galCompT) + " gal)", "Productos");
                    }
                }

                String[] Leyenda = new String[10];
                chart.barraSimpleV_X2_2D(request, response, objDataset, objDataset2, titulo, "", tituloY, ancho, alto, bar_width, formato, blanco, blanco, semi_negro);
            }
        }

    }
}
