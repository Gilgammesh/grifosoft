/*
 ========================
 @author carlos santander
 ========================
 */

// Funciones Utilitarias usadas en el Sistema

function castDay(day) {
    var n = day.toString().length;
    var cast;
    if (n === 1) {
        cast = "0" + day;
    } else {
        cast = day;
    }
    return cast;
}

function castMonth(month) {
    var n = (month + 1).toString().length;
    var cast;
    if (n === 1) {
        cast = "0" + (month + 1);
    } else {
        cast = (month + 1);
    }
    return cast;
}

function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function formatNumero(numero) {
    if (numero === 0) {
        return 0.00;
    } else {
        var formateado = format("#,###,###,##0.00", numero);
        return formateado;
    }
}

function formatNumeroNoComa(numero) {
    if (numero === 0) {
        return 0.00;
    } else {
        var formateado = format("###0.00", numero);
        return formateado;
    }
}

function formatNumeroDecimal(numero) {
    if (numero === 0) {
        return 0.00;
    } else {
        var formateado = format("#,###,###,##0.00", numero);
        return formateado;
    }
}

function formatNumeroDecimalFour(numero) {
    if (numero === 0) {
        return 0.0000;
    } else {
        var formateado = format("#,###,###,##0.0000", numero);
        return formateado;
    }
}

function formatNumeroEntero(numero) {
    if (numero === 0) {
        return 0;
    } else {
        var formateado = format("#,###,###,##0", numero);
        return formateado.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
}

function formatNumeroEnteroNoComa(numero) {
    if (numero === 0) {
        return 0;
    } else {
        var formateado = format("###0", numero);
        return formateado;
    }
}

function soloNumero(event) {
    var code = event.charCode;
    if (code >= 48 && code <= 57 || code === 0) {
        return true;
    } else {
        return false;
    }
}

function soloNumeroEnter(event) {
    var code = event.charCode;
    if (code >= 48 && code <= 57 || code === 13 || code === 0) {
        return true;
    } else {
        return false;
    }
}

function soloNumDecimal(event, value) {
    var code = event.charCode;
    var pos = event.target.selectionStart;
    if (code >= 48 && code <= 57 || code === 46 || code === 0) {
        if (code === 46) {
            if (value.indexOf(".") !== -1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (value.indexOf(".") !== -1) {
                var size0 = value.split(".")[0].length;
                var size1 = value.split(".")[1].length;
                if (size1 >= 0 && size1 <= 1) {
                    return true;
                } else {
                    if (pos <= size0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function soloNumDecimalFour(event, value) {
    var code = event.charCode;
    var pos = event.target.selectionStart;
    if (code >= 48 && code <= 57 || code === 46 || code === 0) {
        if (code === 46) {
            if (value.indexOf(".") !== -1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (value.indexOf(".") !== -1) {
                var size0 = value.split(".")[0].length;
                var size1 = value.split(".")[1].length;
                if (size1 >= 0 && size1 <= 3) {
                    return true;
                } else {
                    if (pos <= size0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function castDateString(date) {
    var dateS = date.split("-");
    return dateS[2] + '/' + dateS[1] + '/' + dateS[0];
}

function castDateString1(date) {
    var dateS = date.split("/");
    return dateS[2] + '-' + dateS[1] + '-' + dateS[0];
}



///////////////////////////////////////////////////////////////////////////////////////

function Unidades(num) {

    switch (num)
    {
        case 1:
            return "UN";
        case 2:
            return "DOS";
        case 3:
            return "TRES";
        case 4:
            return "CUATRO";
        case 5:
            return "CINCO";
        case 6:
            return "SEIS";
        case 7:
            return "SIETE";
        case 8:
            return "OCHO";
        case 9:
            return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num) {

    var decena = Math.floor(num / 10);
    var unidad = num - (decena * 10);

    switch (decena)
    {
        case 1:
        switch (unidad)
        {
            case 0:
                return "DIEZ";
            case 1:
                return "ONCE";
            case 2:
                return "DOCE";
            case 3:
                return "TRECE";
            case 4:
                return "CATORCE";
            case 5:
                return "QUINCE";
            default:
                return "DIECI" + Unidades(unidad);
        }
        case 2:
        switch (unidad)
        {
            case 0:
                return "VEINTE";
            default:
                return "VEINTI" + Unidades(unidad);
        }
        case 3:
            return DecenasY("TREINTA", unidad);
        case 4:
            return DecenasY("CUARENTA", unidad);
        case 5:
            return DecenasY("CINCUENTA", unidad);
        case 6:
            return DecenasY("SESENTA", unidad);
        case 7:
            return DecenasY("SETENTA", unidad);
        case 8:
            return DecenasY("OCHENTA", unidad);
        case 9:
            return DecenasY("NOVENTA", unidad);
        case 0:
            return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + " Y " + Unidades(numUnidades);

    return strSin;
}//DecenasY()

function Centenas(num) {
    var centenas = Math.floor(num / 100);
    var decenas = num - (centenas * 100);

    switch (centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2:
            return "DOSCIENTOS " + Decenas(decenas);
        case 3:
            return "TRESCIENTOS " + Decenas(decenas);
        case 4:
            return "CUATROCIENTOS " + Decenas(decenas);
        case 5:
            return "QUINIENTOS " + Decenas(decenas);
        case 6:
            return "SEISCIENTOS " + Decenas(decenas);
        case 7:
            return "SETECIENTOS " + Decenas(decenas);
        case 8:
            return "OCHOCIENTOS " + Decenas(decenas);
        case 9:
            return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    var letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    var divisor = 1000;
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    //var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    var strMiles = Seccion(num, divisor, "MIL", "MIL");
    var strCentenas = Centenas(resto);

    if (strMiles === "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    var divisor = 1000000;
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    var strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    var strMiles = Miles(resto);

    if (strMillones === "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(numero, monedaPlural, monedaSingular) {
    var data = {
        numero: numero,
        enteros: Math.floor(numero),
        centavos: (((Math.round(numero * 100)) - (Math.floor(numero) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: monedaPlural, //"SOLES", "DÓLARES", "EUROS", "etc."
        letrasMonedaSingular: monedaSingular //"SOL", "DÓLAR", "EURO", "etc."

        //letrasMonedaCentavoPlural: "CÉNTIMOS",
        //letrasMonedaCentavoSingular: "CÉNTIMO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function () {
            if (data.centavos === 1)
                //return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
                return data.centavos + "/100";
            else
                //return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
                return data.centavos + "/100";
        })();
    } else {
        data.letrasCentavos = "CON 00/100";
    }

    if (data.enteros === 0)
        //return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
        return "CERO " + data.letrasCentavos + " " + data.letrasMonedaPlural;
    if (data.enteros === 1)
        //return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
        return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaSingular;
    else
        //return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
        return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaPlural;
}//NumeroALetras()