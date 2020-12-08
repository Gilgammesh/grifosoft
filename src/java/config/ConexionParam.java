package config;

import java.io.IOException;
import java.io.Reader;
import java.sql.Connection;
import java.util.Properties;
import org.apache.ibatis.io.Resources;

/**
 *
 * @author carlos santander
 */
public class ConexionParam {

    static String driver = "", url = "", username = "", password = "";
    static Connection conn = null;

    public static String obtenerPropiedad(String nombre) throws IOException {
        Reader reader = null;
        Properties propiedades = new Properties();
        reader = Resources.getResourceAsReader("config/ConexionParam.properties");
        propiedades.load(reader);
        reader.close();
        return propiedades.getProperty(nombre);
    }

}
