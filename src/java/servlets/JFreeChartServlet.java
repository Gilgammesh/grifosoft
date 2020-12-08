package servlets;

import java.awt.Color;
import java.awt.Font;
import java.awt.Paint;
import java.io.IOException;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.ValueAxis;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.DatasetRenderingOrder;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer;
import org.jfree.chart.renderer.category.CategoryItemRenderer;
import org.jfree.chart.renderer.category.StandardBarPainter;
import org.jfree.chart.title.LegendTitle;
import org.jfree.chart.title.TextTitle;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.ui.HorizontalAlignment;
import org.jfree.ui.TextAnchor;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "JFreeChartServlet", urlPatterns = {"/JFreeChart"})
public class JFreeChartServlet extends HttpServlet {

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
    }

    Paint transparente = new Color(0, 0, 0, 0);
    Paint verde = new Color(98, 156, 56);
    Paint verde_intenso = new Color(43, 255, 0);
    Paint naranja = new Color(247, 147, 50);
    Paint naranja_fuerte = new Color(241, 89, 33);
    Paint rojo = new Color(238, 29, 35);
    Paint azul = new Color(1, 90, 170);
    Paint azul_pers = new Color(143, 163, 188);
    Paint azul_barra = new Color(51, 90, 135);
    Paint azul_titu = new Color(51, 74, 99);
    Paint celeste = new Color(30, 184, 245);
    Paint gris = new Color(128, 130, 133);
    Paint gris_suave = Color.LIGHT_GRAY;
    Paint gris_soft = new Color(236, 236, 236);
    Paint blanco = Color.WHITE;
    Paint negro = Color.BLACK;
    Paint negro_suave = new Color(60, 60, 60);
    Paint suave = new Color(255, 248, 235);
    Paint morado = new Color(128, 0, 255);
    Paint amarillo = new Color(255, 255, 0);

    public void barraSimpleV_X2_2D(HttpServletRequest request, HttpServletResponse response,
            DefaultCategoryDataset objDataset, DefaultCategoryDataset objDataset2, String titulo, String tituloX, String tituloY,
            int ancho, int alto, double bar_width, String formato, Paint fondo, Paint letra, Paint letra2)
            throws ServletException, IOException {
        try (OutputStream out = response.getOutputStream()) {
            JFreeChart objChart = ChartFactory.createBarChart(
                    titulo, //Titulo   BarChartDemo
                    tituloX, //Titulo del Dominio (eje X)
                    tituloY, //Titulo del Rango (eje Y)
                    objDataset, //Datos
                    PlotOrientation.VERTICAL, // orientacion "HORIZONTAL" O "VERTICAL"
                    true, // incluir leyenda?
                    true, // incluir tooltips?
                    false // incluir URLs?
            );
            CategoryPlot plot = (CategoryPlot) objChart.getPlot();
            objChart.setBackgroundPaint(fondo);
            LegendTitle legTitle = objChart.getLegend();
            legTitle.setBorder(0, 0, 0, 0);
            legTitle.setItemFont(new Font("Arial", Font.BOLD, 14));
            legTitle.setHorizontalAlignment(HorizontalAlignment.CENTER);
            legTitle.setItemPaint(negro);
            legTitle.setBackgroundPaint(fondo);
            TextTitle title = objChart.getTitle();
            title.setFont(new Font("Arial", Font.BOLD, 16));
            title.setPaint(negro);
            CategoryAxis dominio = plot.getDomainAxis();
            dominio.setLabelFont(new Font("Arial", Font.BOLD, 14));
            dominio.setLabelPaint(negro);
            ValueAxis rango = plot.getRangeAxis();
            rango.setLabelFont(new Font("Arial", Font.BOLD, 14));
            rango.setLabelPaint(negro);
            plot.setBackgroundPaint(fondo);
            plot.setRangeGridlinePaint(gris_suave);
            plot.setOutlineVisible(false);
            BarRenderer renderer = ((BarRenderer) plot.getRenderer());
            CategoryItemRenderer rendererBack = new BarRenderer();
            plot.setDataset(1, objDataset2);
            plot.setRenderer(1, rendererBack);
            plot.setDatasetRenderingOrder(DatasetRenderingOrder.REVERSE);
            BarRenderer renderer2 = ((BarRenderer) plot.getRenderer(1));

            renderer.setMaximumBarWidth(bar_width);
            renderer2.setMaximumBarWidth(bar_width);
            renderer2.setBaseSeriesVisibleInLegend(false);
            renderer2.setBaseItemLabelFont(new Font("Arial", Font.PLAIN, 13));

            Paint[] color = new Paint[]{
                rojo,
                verde,
                azul_barra,
                celeste,
                naranja,
                morado,
                gris,
                amarillo,
                verde_intenso
            };
            for (int i = 0; i < color.length; i++) {
                renderer.setSeriesPaint(i, color[i]);
                renderer2.setSeriesPaint(i, color[i]);
            }

            renderer.setBarPainter(new StandardBarPainter());
            renderer2.setBarPainter(new StandardBarPainter());
            renderer2.setShadowVisible(false);
            DecimalFormatSymbols simbolos = new DecimalFormatSymbols();
            simbolos.setDecimalSeparator('.');
            DecimalFormat formateador = new DecimalFormat("##0.00", simbolos);
            StandardCategoryItemLabelGenerator labelGen = new StandardCategoryItemLabelGenerator(
                    "{2}", formateador);
            renderer.setBaseItemLabelGenerator(labelGen);
            renderer.setBaseItemLabelsVisible(true);
            renderer.setBasePositiveItemLabelPosition(new ItemLabelPosition(ItemLabelAnchor.CENTER, TextAnchor.CENTER));
            renderer.setBaseItemLabelPaint(letra);
            StandardCategoryItemLabelGenerator labelGen2 = new StandardCategoryItemLabelGenerator(
                    "{0}", formateador);
            renderer2.setBaseItemLabelGenerator(labelGen2);
            renderer2.setBaseItemLabelsVisible(true);
            renderer2.setBasePositiveItemLabelPosition(new ItemLabelPosition(ItemLabelAnchor.OUTSIDE12, TextAnchor.BASELINE_CENTER));
            renderer2.setBaseItemLabelPaint(letra2);
            renderer.setItemMargin(0.03); // Espaciado entre barras de una misma Categoria (en forma porcentual)
            renderer2.setItemMargin(0.03); // Espaciado entre barras de una misma Categoria (en forma porcentual)
            dominio.setCategoryMargin(0.04); // Espaciado entre la ultima barra y la primera barra entre Categorias (en forma porcentual)
            dominio.setLowerMargin(0.01); // Espaciado margen izquierdo con la primera barra (en forma porcentual)
            dominio.setUpperMargin(0.01); // Espaciado margen derecho con la ultima barra (en forma porcentual)
            if ("png".equals(formato)) {
                response.setContentType("image/png");
                ChartUtilities.writeChartAsPNG(out, objChart, ancho, alto);
            }
            if ("jpeg".equals(formato)) {
                response.setContentType("image/jpeg");
                ChartUtilities.writeChartAsJPEG(out, objChart, ancho, alto);
            }
        } catch (Exception e) {
            System.err.println(e.toString());
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

}
