/*
 ========================
 @author carlos santander
 ========================
 */

function eventListTableroControlReporte() {
    $("#listTableroControlReporte").bind("change", function () {
        var value = $("#listTableroControlReporte").val();
        $("#listTableroControlSegmento").empty();
        var opt;
        if (value === "ingresos") {
            opt = '<option value="todos">--TODOS--</option>\
                   <option value="combustible">Venta Combustible</option>\
                   <option value="otros">Otros Ingresos</option>';
        }
        if (value === "gastos") {
            opt = '<option value="todos">--TODOS--</option>\
                   <option value="combustible">Compra Combustible</option>\
                   <option value="otros">Otros Gastos</option>';
        }
        if (value === "utilidades") {
            opt = '<option value="todos">--TODOS--</option>\
                   <option value="combustible">Utilidad Combustible</option>\
                   <option value="otros">Otras Utilidades</option>';
        }
        $("#listTableroControlSegmento").append(opt);
    });
}

function sub_menu_tablero() {

    var cont = '<div class="card">\
                  <div class="card-header bg-danger text-white">TABLERO DE CONTROL</div>\
                  <div class="card-body">\
                    <div class="form-row">\
                      <div class="form-group col-md-4">\
                        <label for="listTableroControlReporte" class="col-form-label">Elija Reporte :</label>\
                        <select id="listTableroControlReporte" class="form-select">\
                          <option value="ingresos">Ingresos</option>\
                          <option value="gastos">Gastos</option>\
                          <option value="utilidades">Utilidades</option>\
                        </select>\
                      </div>\
                      <div class="form-group col-md-4">\
                        <label for="listTableroControlSegmento" class="col-form-label">Segmento :</label>\
                        <select id="listTableroControlSegmento" class="form-select">\
                          <option value="todos">--TODOS--</option>\
                          <option value="combustible">Venta Combustible</option>\
                          <option value="otros">Otros Ingresos</option>\
                        </select>\
                      </div>\
                      <div class="form-group col-md-4">\
                        <label for="listTableroControlPeriodicidad" class="col-form-label">Periodicidad :</label>\
                        <select id="listTableroControlPeriodicidad" class="form-select">\
                          <option value="diario">Diario</option>\
                          <option value="mensual">Mensual</option>\
                          <option value="anual">Anual</option>\
                        </select>\
                      </div>\
                    </div>\
                    <div id="divTableroControlFiltroPeriodicidad"></div>\
                    <div id="divTableroControlTituloReporte" class="text-center"></div>\
                    <div id="divTableroControlTablaReporte"></div>\
                    <div id="divTableroControlGraficoReporte"></div>\
                  </div>\
                </div>';
    $('#divMenuContenido').append(cont);

    eventListTableroControlReporte();
    eventListTableroControlSegmento();
    eventListTableroControlPeriodicidad("diario");

    $("#listTableroControlPeriodicidad").bind("change", function () {
        eventListTableroControlPeriodicidad($("#listTableroControlPeriodicidad").val());
    });

}

function eventListTableroControlSegmento() {
    $("#listTableroControlSegmento").bind("change", function () {
        var value = $("#listTableroControlSegmento").val();
        if (value === "combustible") {
            $("#divTableroControlFiltroProductos").empty();
            var cont = '<label for="listTableroControlFiltroProductos" class="col-form-label ">Productos :</label>\
                        <select id="listTableroControlFiltroProductos" class="custom-select form-select"></select>';
            $("#divTableroControlFiltroProductos").append(cont);
            llenarListTableroControlFiltroProductos();
        } else {
            $("#divTableroControlFiltroProductos").empty();
        }
    });
}

function eventListTableroControlPeriodicidad(value) {
    $("#divTableroControlFiltroPeriodicidad").empty();
    var div;
    if (value === "diario") {
        if ($("#listTableroControlSegmento").val() === "combustible") {
            div = '<div class="form-row">\
                    <div class="form-group col-md-2">\
                      <label for="datePickTableroControlFiltroPeriodicidad" class="col-form-label" style="font-weight: 600;">Fecha :</label>\
                      <input id="datePickTableroControlFiltroPeriodicidad" />\
                    </div>\
                    <div id="divTableroControlFiltroProductos" class="form-group col-md-3">\
                      <label for="listTableroControlFiltroProductos" class="col-form-label ">Productos :</label>\
                      <select id="listTableroControlFiltroProductos" class="custom-select form-select"></select>\
                    </div>\
                   </div>';
            $("#divTableroControlFiltroPeriodicidad").append(div);
            llenarListTableroControlFiltroProductos();
        } else {
            div = '<div class="form-row">\
                    <div class="form-group col-md-2">\
                      <label for="datePickTableroControlFiltroPeriodicidad" class="col-form-label" style="font-weight: 600;">Fecha :</label>\
                      <input id="datePickTableroControlFiltroPeriodicidad" />\
                    </div>\
                    <div id="divTableroControlFiltroProductos" class="form-group col-md-3"></div>\
                   </div>';
            $("#divTableroControlFiltroPeriodicidad").append(div);
        }

        var todayTC = new Date();
        var dayTC = todayTC.getDate();
        var monthTC = todayTC.getMonth() + 1;
        var yearTC = todayTC.getFullYear();
        if (dayTC < 10) {
            dayTC = "0" + dayTC;
        }
        if (monthTC < 10) {
            monthTC = "0" + monthTC;
        }
        var hoyTC = dayTC + "/" + monthTC + "/" + yearTC;

        $('#datePickTableroControlFiltroPeriodicidad').datepicker({
            locale: 'es-es',
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            value: hoyTC,
            maxDate: todayTC
        }).on("change", function () {
            llenarTableroControlContenidoReporteTabla();
            llenarTableroControlContenidoReporteGrafico();
        });
    }
    if (value === "mensual") {

    }
    if (value === "anual") {

    }

}

function llenarListTableroControlFiltroProductos() {
    $("#listTableroControlFiltroProductos").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
        success: function (response) {
            $("#listTableroControlFiltroProductos").append('<option value="todos">--TODOS--</option>');
            $.each(response.listProductos, function (index, value) {
                var nombres;
                if (!$.trim(value.prodDescripcion)) {
                    nombres = "";
                } else {
                    nombres = value.prodDescripcion;
                    if (!$.trim(value.prodNombre)) {
                        nombres += "";
                    } else {
                        nombres += " - " + value.prodNombre;
                    }
                }
                var opt = '<option value="' + value.prodId + '">' + nombres + '</option>';
                $("#listTableroControlFiltroProductos").append(opt);
            });
            $("#listTableroControlFiltroProductos").append('<option value="total">--TOTALIZADO--</option>');
            llenarTableroControlContenidoReporteTabla();
            llenarTableroControlContenidoReporteGrafico();
            $("#listTableroControlFiltroProductos").bind("change", function () {
                llenarTableroControlContenidoReporteTabla();
                llenarTableroControlContenidoReporteGrafico();
            });
        }
    });
}

function llenarTableroControlContenidoReporteTabla() {
    var str1 = "./Reportes?url=tabla";
    var str2 = "&repo=" + $("#listTableroControlReporte").val();
    var str3 = "&segm=" + $("#listTableroControlSegmento").val();
    var str4 = "&peri=" + $("#listTableroControlPeriodicidad").val();
    var url = str1.concat(str2, str3, str4);
    var reporte = $("#listTableroControlReporte").val();
    var segmento = $("#listTableroControlSegmento").val();
    var periodo = $("#listTableroControlPeriodicidad").val();
    if (periodo === "diario") {
        url = url.concat("&fecha=" + $("#datePickTableroControlFiltroPeriodicidad").val());
        if (segmento === "combustible") {
            url = url.concat("&prod=" + $("#listTableroControlFiltroProductos").val());
            $.ajax({
                dataType: 'json',
                url: url,
                success: function (response) {
                    $("#divTableroControlTituloReporte").empty();
                    $("#divTableroControlTablaReporte").empty();
                    var div;
                    var tit;
                    if (reporte === "ingresos") {
                        tit = '<br><h5 style="font-weight: 600;">INGRESOS COMBUSTIBLE</h5>\
                               <h5 style="font-weight: 600;">Fecha : ' + $("#datePickTableroControlFiltroPeriodicidad").val() + '</h5>';
                        div = '<div class="table-responsive">\
                                <table id="tablaTableroControlReporte" class="table table-hover display" style="width: 100%;"> \
                                  <thead id="tablaTableroControlReporteHead">\
                                    <tr>\
                                      <th style="text-align: center;">Id</th>\
                                      <th style="text-align: center;">Producto</th>\
                                      <th style="text-align: center;">Stock Físico</th>\
                                      <th style="text-align: center;">Precio Venta</th>\
                                      <th style="text-align: center;">Galones</th>\
                                      <th style="text-align: center;">Venta (S/)</th>\
                                    </tr>\
                                  </thead>\
                                  <tbody id="tablaTableroControlReporteBody"></tbody>\
                                  <tfoot id="tablaTableroControlReporteFoot"></tfoot>\
                                </table>\
                               </div>';
                    }
                    if (reporte === "gastos") {
                        tit = '<br><h5 style="font-weight: 600;">GASTOS COMBUSTIBLE</h5>\
                               <h5 style="font-weight: 600;">Fecha : ' + $("#datePickTableroControlFiltroPeriodicidad").val() + '</h5>';
                        div = '<div class="table-responsive">\
                                <table id="tablaTableroControlReporte" class="table table-hover display" style="width: 100%;"> \
                                  <thead id="tablaTableroControlReporteHead">\
                                    <tr>\
                                      <th style="text-align: center;">Id</th>\
                                      <th style="text-align: center;">Producto</th>\
                                      <th style="text-align: center;">Galones</th>\
                                      <th style="text-align: center;">Compra (S/)</th>\
                                    </tr>\
                                  </thead>\
                                  <tbody id="tablaTableroControlReporteBody"></tbody>\
                                  <tfoot id="tablaTableroControlReporteFoot"></tfoot>\
                                </table>\
                               </div>';
                    }
                    if (reporte === "utilidades") {
                        tit = '<br><h5 style="font-weight: 600;">UTILIDADES COMBUSTIBLE</h5>\
                               <h5 style="font-weight: 600;">Fecha : ' + $("#datePickTableroControlFiltroPeriodicidad").val() + '</h5>';
                        div = '<div class="table-responsive">\
                                <table id="tablaTableroControlReporte" class="table table-hover display" style="width: 100%;"> \
                                  <thead id="tablaTableroControlReporteHead">\
                                    <tr>\
                                      <th style="text-align: center;">Id</th>\
                                      <th style="text-align: center;">Producto</th>\
                                      <th style="text-align: center;">Galones Comprados</th>\
                                      <th style="text-align: center;">Galones Vendidos</th>\
                                      <th style="text-align: center;">Compra (S/)</th>\
                                      <th style="text-align: center;">Venta (S/)</th>\
                                      <th style="text-align: center;">Galones Utiles</th>\
                                      <th style="text-align: center;">Utilidad (Venta - Compra) (S/)</th>\
                                    </tr>\
                                  </thead>\
                                  <tbody id="tablaTableroControlReporteBody"></tbody>\
                                  <tfoot id="tablaTableroControlReporteFoot"></tfoot>\
                                </table>\
                               </div>';
                    }
                    $("#divTableroControlTituloReporte").append(tit);
                    $("#divTableroControlTablaReporte").append(div);
                    var ventaT = 0.00;
                    var galVenT = 0.00;
                    var compraT = 0.00;
                    var galCompT = 0.00;
                    $.each(response.list, function (index, value) {
                        var producto, galMaq, devoTanq, precio, venta, stock, galComp, compra;
                        var neto = 0.00;
                        if (!$.trim(value.prodDescripcion)) {
                            producto = "";
                        } else {
                            if (!$.trim(value.prodNombre)) {
                                producto = value.prodDescripcion;
                            } else {
                                producto = value.prodDescripcion + " - " + value.prodNombre;
                            }
                        }
                        if (!$.trim(value.lecturaMaquina)) {
                            galMaq = "";
                        } else {
                            galMaq = formatNumeroDecimal(value.lecturaMaquina);
                            neto += value.lecturaMaquina;
                            galVenT += value.lecturaMaquina;
                        }
                        if (!$.trim(value.devolucionTanque)) {
                            devoTanq = "";
                        } else {
                            devoTanq = formatNumeroDecimal(value.devolucionTanque);
                            neto -= value.devolucionTanque;
                            galVenT -= value.devolucionTanque;
                        }
                        if (!$.trim(value.precioVenta)) {
                            precio = "";
                            venta = "";
                        } else {
                            precio = formatNumeroDecimal(value.precioVenta);
                            venta = neto * value.precioVenta;
                            ventaT += (neto * value.precioVenta);
                        }
                        if (!$.trim(value.lecturaFisica)) {
                            stock = "";
                        } else {
                            stock = formatNumeroDecimal(value.lecturaFisica);
                        }
                        if (!$.trim(value.facoCantidad)) {
                            galComp = "";
                        } else {
                            galComp = value.facoCantidad;
                            galCompT += value.facoCantidad;
                        }
                        if (!$.trim(value.facoMonto)) {
                            compra = "";
                        } else {
                            compra = value.facoMonto;
                            compraT += value.facoMonto;
                        }
                        var body;
                        if (reporte === "ingresos") {
                            body = "<tr>\
                                      <td align='center'>" + (index + 1) + "</td>\
                                      <td align='left'>" + producto + "</td>\
                                      <td align='center'>" + stock + "</td>\
                                      <td align='center'>" + precio + "</td>\
                                      <td align='center'>" + formatNumeroDecimal(neto) + "</td>\
                                      <td align='right'>" + formatNumeroDecimal(venta) + "</td>\
                                    </tr>";
                        }
                        if (reporte === "gastos") {
                            body = "<tr>\
                                      <td align='center'>" + (index + 1) + "</td>\
                                      <td align='left'>" + producto + "</td>\
                                      <td align='center'>" + formatNumeroDecimal(galComp) + "</td>\
                                      <td align='right'>" + formatNumeroDecimal(compra) + "</td>\
                                    </tr>";
                        }
                        if (reporte === "utilidades") {
                            body = "<tr>\
                                      <td align='center'>" + (index + 1) + "</td>\
                                      <td align='left'>" + producto + "</td>\
                                      <td align='center'>" + formatNumeroDecimal(galComp) + "</td>\
                                      <td align='center'>" + formatNumeroDecimal(neto) + "</td>\
                                      <td align='right'>" + formatNumeroDecimal(compra) + "</td>\
                                      <td align='right'>" + formatNumeroDecimal(venta) + "</td>\
                                      <td align='center'>" + formatNumeroDecimal(neto - galComp) + "</td>\
                                      <td align='right'>" + formatNumeroDecimal(venta - compra) + "</td>\
                                    </tr>";
                        }
                        $("#tablaTableroControlReporteBody").append(body);
                    });

                    $('#tablaTableroControlReporte').dataTable().fnDestroy();

                    $("#tablaTableroControlReporteFoot").empty();
                    var foot;
                    if (reporte === "ingresos") {
                        foot = "<tr>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: left;'>TOTAL</th>\
                                <th style='text-align: center; padding-right: 0.75rem;'>" + formatNumeroDecimal(galVenT) + "</th>\
                                <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(ventaT) + "</th>\
                                </tr>";
                        $("#tablaTableroControlReporteFoot").append(foot);
                    }
                    if (reporte === "gastos") {
                        foot = "<tr>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: left;'>TOTAL</th>\
                                <th style='text-align: center; padding-right: 0.75rem;'>" + formatNumeroDecimal(galCompT) + "</th>\
                                <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(compraT) + "</th>\
                                </tr>";
                        $("#tablaTableroControlReporteFoot").append(foot);
                    }
                    if (reporte === "utilidades") {
                        foot = "<tr>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: center;'></th>\
                                <th style='text-align: left;'>TOTAL</th>\
                                <th style='text-align: center; padding-right: 0.75rem;'>" + formatNumeroDecimal(galVenT - galCompT) + "</th>\
                                <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(ventaT - compraT) + "</th>\
                                </tr>";
                        $("#tablaTableroControlReporteFoot").append(foot);
                    }

                    var fechaVal = $('#datePickTableroControlFiltroPeriodicidad').val();
                    var fechaValRxp = fechaVal.split("/").join("_");

                    $('#tablaTableroControlReporte').dataTable({
                        dom: '<"right-div-tabla"B>rt',
                        pageLength: 100,
                        buttons: [
                            {
                                extend: 'excel',
                                filename: 'reporte_' + reporte + '_' + fechaValRxp,
                                title: 'REPORTE DE ' + reporte.toUpperCase() + ' -  FECHA : ' + fechaVal,
                                footer: true,
                                exportOptions: {
                                    columns: ':not(.notexport)'
                                }
                            }
                        ]
                    });
                }
            });
        } else {

        }
    }
}

function llenarTableroControlContenidoReporteGrafico() {
    $("#divTableroControlGraficoReporte").empty();
    var str1 = "./Reportes?url=grafica";
    var str2 = "&repo=" + $("#listTableroControlReporte").val();
    var str3 = "&segm=" + $("#listTableroControlSegmento").val();
    var str4 = "&peri=" + $("#listTableroControlPeriodicidad").val();
    var url = str1.concat(str2, str3, str4);
    var reporte = $("#listTableroControlReporte").val();
    var segmento = $("#listTableroControlSegmento").val();
    var periodo = $("#listTableroControlPeriodicidad").val();
    if (periodo === "diario") {
        url = url.concat("&fecha=" + $("#datePickTableroControlFiltroPeriodicidad").val());
        if (segmento === "combustible") {
            url = url.concat("&prod=" + $("#listTableroControlFiltroProductos").val());
            var img = '<img class="card-img-top img-responsive" src="' + url + '">';
            $("#divTableroControlGraficoReporte").append(img);
        } else {

        }
    }

}