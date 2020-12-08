package servlets;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author carlos santander
 */
@WebServlet(name = "ImagenServlet", urlPatterns = {"/Imagen"})
public class ImagenServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String ruta = request.getParameter("ruta");
        String type = request.getParameter("type");

        response.setContentType(type);
        ServletOutputStream out;
        out = response.getOutputStream();
        BufferedOutputStream bout;
        try (
                FileInputStream fin = new FileInputStream(ruta);
                BufferedInputStream bin = new BufferedInputStream(fin)) {
            bout = new BufferedOutputStream(out);
            int ch = 0;
            while ((ch = bin.read()) != -1) {
                bout.write(ch);
            }
        }
        bout.close();
        out.close();
    }
}
