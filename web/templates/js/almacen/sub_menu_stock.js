/*
 ========================
 @author carlos santander
 ========================
 */

function checkAlertStock() {
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=alerta_stock_productos",
        success: function (response) {
            if (response.success) {
                var mensaje = "";
                $.each(response.listStockAlert, function (index, value) {
                    mensaje += "<p>El producto " + value.prodDescripcion + " (" + value.prodNombre + "), "
                            + "está en alerta de stock de facturación, contando con solo: " + value.stock + " galones.</p><br>";

                });
                alertify.alert("<i class='fa fa-warning' style='color: #dc3545;'></i>&nbsp;&nbsp;ALERTA DE STOCK", mensaje);
            }
        }
    });
}

function llenarAlmacenEditStockLimite() {
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=get_stock_limite",
        success: function (response) {
            $("#nAlmacenLimiteGalones").val(response.galones.toFixed(4));
        }
    });
}

function eventFormAlmacenEditStockLimite() {
    $("#formAlmacenEditStockLimite").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formAlmacenEditStockLimite").attr("action"),
            data: $("#formAlmacenEditStockLimite").serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalAlmacenEditStockLimite').modal('hide');
                    checkAlertStock();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_stock() {

    //checkAlertStockMail();
    checkAlertStock();

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">STOCK DE PRODUCTOS</div>\
                    <div class="card-body">\
                        <div class="m-b-2">\
                          <button id="btnAlmacenStockLimite" class="btn btn-primary" data-toggle="modal" data-target="#modalAlmacenEditStockLimite">\
                            <span class="fa fa-rocket"></span> Galones Límite Facturación\
                          </button>\
                        </div>\
                        <div id="modalAlmacenEditStockLimite" class="modal fade"></div>\
                        <div class="table-responsive">\
                          <label class="col-form-label text-bold m-r-3">STOCK DE FACTURACIÓN :</label>\
                          <button id="btnAlmacenStockFactGalComp" class="btn btn-foursquare m-r-1" data-toggle="modal" data-target="#modalAlmacenStockFactGalComp">\
                            <span class="fa fa-shopping-cart"></span>&nbsp;&nbsp;Galones Comprados\
                          </button>\
                          <button id="btnAlmacenStockFactGalFact" class="btn btn-facebook m-r-1" data-toggle="modal" data-target="#modalAlmacenStockFactGalFact">\
                            <span class="fa fa-money"></span>&nbsp;&nbsp;Galones Facturados\
                          </button>\
                          <form id="formUpdateAlmacenStockFact" method="post">\
                            <table id="tablaAlmacenStockFact" class="table table-hover display" style="width: 100%;"></table>\
                          </form>\
                        </div>\
                        <div id="modalAlmacenStockFactGalComp" class="modal fade"></div>\
                        <div id="modalAlmacenStockFactGalFact" class="modal fade"></div>\
                        <br>\
                        <div class="table-responsive">\
                          <label class="col-form-label text-bold">STOCK DE LIQUIDACIÓN :</label>\
                          <form id="formUpdateAlmacenStockLiquid" method="post">\
                            <table id="tablaAlmacenStockLiquid" class="table table-hover display" style="width: 100%;"></table>\
                          </form>\
                        </div>\
                        <br>\
                        <div class="table-responsive">\
                          <label class="col-form-label text-bold">STOCK DE PRODUCTOS :</label>\
                          <form id="formUpdateAlmacenStockProd" method="post">\
                            <table id="tablaAlmacenStockProd" class="table table-hover display" style="width: 100%;"></table>\
                          </form>\
                        </div>\
                      </div>\
                    </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    $('#btnAlmacenStockLimite').click(function () {
        llenarModalAlmacenEditStockLimite();
    });

    $('#btnAlmacenStockFactGalComp').click(function () {
        llenarModalAlmacenStockFactGalComp();
    });

    $('#btnAlmacenStockFactGalFact').click(function () {
        llenarModalAlmacenStockFactGalFact();
    });

    llenarTablaAlmacenStockFact();
    eventFormUpdateAlmacenStockFact();
    llenarTablaAlmacenStockLiquid();
    eventFormUpdateAlmacenStockLiquid();
    llenarTablaAlmacenStockProd();
    eventFormUpdateAlmacenStockProd();
}

function llenarModalAlmacenEditStockLimite() {
    $('#modalAlmacenEditStockLimite').empty();
    var modal = '<div class="modal-dialog">\
                            <form id="formAlmacenEditStockLimite" method="post" action="./Almacen?url=nuevo_stock_limite">\
                              <div class="modal-content border-light">\
                                <div class="modal-header bg-light">\
                                  <h5 class="modal-title"><i class="fa fa-rocket"></i> Galones Límite Stock Producto (Facturación)</h5>\
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                    <span aria-hidden="true">&times;</span>\
                                  </button>\
                                </div>\
                                <div class="modal-body">\
				  <div class="form-group">\
				    <label for="nAlmacenLimiteGalones" class="col-form-label">Galones Límite Facturación :</label>\
				    <input id="nAlmacenLimiteGalones" type="text" name="stli_galones" class="form-control" \
                                    placeholder="Ingrese galones límite para stock de productos" onkeypress="return soloNumDecimalFour(event, this.value)" required>\
				  </div>\
                                </div>\
                                <div class="modal-footer">\
                                  <button id="nBtnAlmacenStockLimiteSave" type="submit" class="btn btn-primary">\
                                    <i class="fa fa-save"></i> Guardar\
                                  </button>\
                                  <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                    <i class="fa fa-ban"></i> Cerrar\
                                  </button>\
                                </div>\
                              </div>\
			    </form>\
                          </div>';
    $('#modalAlmacenEditStockLimite').append(modal);

    llenarAlmacenEditStockLimite();
    eventFormAlmacenEditStockLimite();

}

function llenarModalAlmacenStockFactGalComp() {
    $('#modalAlmacenStockFactGalComp').empty();
    var modal = '<div class="modal-dialog modal-full">\
                              <div class="modal-content border-light">\
                                <div class="modal-header bg-light">\
                                  <h5 class="modal-title">\
                                    <i class="fa fa-shopping-cart"></i> Galones Comprados\
                                  </h5>\
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                    <span aria-hidden="true">&times;</span>\
                                  </button>\
                                </div>\
                                <div class="modal-body">\
				  <div class="form-row">\
                                    <div class="form-group col-md-2">\
                                        <label for="datePickModalAlmacenStockFactGalCompIni" class="col-form-label" style="font-weight: 600;">Fecha Inicio:</label>\
                                        <input id="datePickModalAlmacenStockFactGalCompIni" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                        <label for="datePickModalAlmacenStockFactGalCompFin" class="col-form-label" style="font-weight: 600;">Fecha Fin:</label>\
                                        <input id="datePickModalAlmacenStockFactGalCompFin" />\
                                    </div>\
                                    <div class="form-group col-md-8">\
                                        <label for="listModalAlmacenStockFactGalCompProds" class="col-form-label" style="font-weight: 600;">Elija Producto:</label>\
                                        <select id="listModalAlmacenStockFactGalCompProds" class="form-select"></select>\
                                    </div>\
				  </div>\
                                  <div class="table-responsive">\
                                    <table id="tablaModalAlmacenStockFactGalComp" class="table table-hover display" style="width: 100%;"></table>\
                                  </div>\
                                </div>\
                              </div>\
                          </div>';
    $('#modalAlmacenStockFactGalComp').append(modal);

    formatDatePickModalAlmacenStockFactGalComp();
    llenarListModalAlmacenStockFactGalCompProds();

    $("#datePickModalAlmacenStockFactGalCompIni").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalComp();
    });
    $("#datePickModalAlmacenStockFactGalCompFin").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalComp();
    });
    $("#listModalAlmacenStockFactGalCompProds").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalComp();
    });

}

function formatDatePickModalAlmacenStockFactGalComp() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var hoy = day + "/" + month + "/" + year;

    $('#datePickModalAlmacenStockFactGalCompIni').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: function () {
            return $('#datePickModalAlmacenStockFactGalCompFin').val();
        }
    });
    $('#datePickModalAlmacenStockFactGalCompFin').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        minDate: function () {
            return $('#datePickModalAlmacenStockFactGalCompIni').val();
        },
        maxDate: today
    });
}

function llenarListModalAlmacenStockFactGalCompProds() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_combustible",
        success: function (response) {
            $("#listModalAlmacenStockFactGalCompProds").empty();
            $("#listModalAlmacenStockFactGalCompProds").append("<option value='todos'>--Todos--</option>");
            $.each(response.listProductos, function (index, value) {
                var nombre, nombre_completo;
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    nombre_completo = nombre;
                } else {
                    nombre_completo = value.prodDescripcion + " (" + nombre + ")";
                }
                var prod = "<option value=" + value.prodId + ">" + nombre_completo + "</option>";
                $("#listModalAlmacenStockFactGalCompProds").append(prod);
            });
            document.getElementById("listModalAlmacenStockFactGalCompProds").selectedIndex = "0";
            llenarTablaModalAlmacenStockFactGalComp();
        }
    });
}

function llenarTablaModalAlmacenStockFactGalComp() {
    var servlt = "./Almacen?url=lista_facturas_compra";
    var param1 = "&fecha_ini=" + $('#datePickModalAlmacenStockFactGalCompIni').val();
    var param2 = "&fecha_fin=" + $('#datePickModalAlmacenStockFactGalCompFin').val();
    var param3 = "&prod_id=" + $('#listModalAlmacenStockFactGalCompProds').val();
    var url = servlt.concat(param1, param2, param3);

    $.ajax({
        dataType: 'json',
        url: url,
        success: function (response) {
            $("#tablaModalAlmacenStockFactGalComp").empty();
            var tabla = '<thead id="tablaModalAlmacenStockFactGalCompHead"></thead>\
                         <tbody id="tablaModalAlmacenStockFactGalCompBody"></tbody>\
                         <tfoot id="tablaModalAlmacenStockFactGalCompFoot"></tfoot>';
            $("#tablaModalAlmacenStockFactGalComp").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Factura</th>\
                          <th style='text-align: center;'>Proveedor</th>\
                          <th style='text-align: center;'>Planta</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Galones</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                        </tr>";
            $("#tablaModalAlmacenStockFactGalCompHead").append(head);

            var galT, montoT;
            galT = montoT = 0.00;
            $.each(response.listFacturas, function (index, value) {
                var factu, prove, plant, nombre, descripcion, gal, monto;
                if (!$.trim(value.facoFactura)) {
                    factu = "";
                } else {
                    factu = value.facoFactura;
                }
                if (!$.trim(value.provNombres)) {
                    prove = "";
                } else {
                    prove = value.provNombres;
                }
                if (!$.trim(value.prplNombre)) {
                    plant = "";
                } else {
                    plant = value.prplNombre;
                }
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.prodDescripcion;
                }
                var producto = descripcion + " (" + nombre + ")";
                if (!$.trim(value.facdCantidad)) {
                    gal = "";
                } else {
                    gal = formatNumeroDecimalFour(value.facdCantidad);
                    galT += value.facdCantidad;
                }
                if (!$.trim(value.facdMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.facdMonto);
                    montoT += value.facdMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + value.facoFechaFactura + "</td>\
                              <td align='left'>" + factu + "</td>\
                              <td align='left'>" + prove + "</td>\
                              <td align='left'>" + plant + "</td>\
                              <td align='left'>" + producto + "</td>\
                              <td align='center'>" + gal + "</td>\
                              <td align='center'>" + monto + "</td>\
                            </tr>";
                $("#tablaModalAlmacenStockFactGalCompBody").append(body);

            });

            $('#tablaModalAlmacenStockFactGalComp').dataTable().fnDestroy();

            $("#tablaModalAlmacenStockFactGalCompFoot").empty();
            var foot = "<tr>\
                            <th style='text-align: center;' colspan='5'></th>\
                            <th style='text-align: center;'>TOTAL</th>\
                            <th style='text-align: center;'>" + formatNumeroDecimalFour(galT) + "</th>\
                            <th style='text-align: center;'>" + formatNumeroDecimal(montoT) + "</th>\
                        </tr>";
            $("#tablaModalAlmacenStockFactGalCompFoot").append(foot);

            $('#tablaModalAlmacenStockFactGalComp').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_facturas_compra',
                        title: 'Lista de Facturas de Compra',
                        footer: true
                    }
                ]
            });

        }
    });

}

function llenarModalAlmacenStockFactGalFact() {
    $('#modalAlmacenStockFactGalFact').empty();
    var modal = '<div class="modal-dialog modal-full">\
                              <div class="modal-content border-light">\
                                <div class="modal-header bg-light">\
                                  <h5 class="modal-title">\
                                    <i class="fa fa-money"></i> Galones Facturados\
                                  </h5>\
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                    <span aria-hidden="true">&times;</span>\
                                  </button>\
                                </div>\
                                <div class="modal-body">\
				  <div class="form-row">\
                                    <div class="form-group col-md-2">\
                                        <label for="datePickModalAlmacenStockFactGalFactIni" class="col-form-label" style="font-weight: 600;">Fecha Inicio:</label>\
                                        <input id="datePickModalAlmacenStockFactGalFactIni" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                        <label for="datePickModalAlmacenStockFactGalFactFin" class="col-form-label" style="font-weight: 600;">Fecha Fin:</label>\
                                        <input id="datePickModalAlmacenStockFactGalFactFin" />\
                                    </div>\
                                    <div class="form-group col-md-8">\
                                        <label for="listModalAlmacenStockFactGalFactProds" class="col-form-label" style="font-weight: 600;">Elija Producto:</label>\
                                        <select id="listModalAlmacenStockFactGalFactProds" class="form-select"></select>\
                                    </div>\
				  </div>\
                                  <div class="table-responsive">\
                                    <table id="tablaModalAlmacenStockFactGalFact" class="table table-hover display" style="width: 100%;"></table>\
                                  </div>\
                                </div>\
                              </div>\
                          </div>';
    $('#modalAlmacenStockFactGalFact').append(modal);

    formatDatePickModalAlmacenStockFactGalFact();
    llenarListModalAlmacenStockFactGalFactProds();

    $("#datePickModalAlmacenStockFactGalFactIni").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalFact();
    });
    $("#datePickModalAlmacenStockFactGalFactFin").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalFact();
    });
    $("#listModalAlmacenStockFactGalFactProds").bind("change", function () {
        llenarTablaModalAlmacenStockFactGalFact();
    });

}

function formatDatePickModalAlmacenStockFactGalFact() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var hoy = day + "/" + month + "/" + year;

    $('#datePickModalAlmacenStockFactGalFactIni').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: function () {
            return $('#datePickModalAlmacenStockFactGalFactFin').val();
        }
    });
    $('#datePickModalAlmacenStockFactGalFactFin').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        minDate: function () {
            return $('#datePickModalAlmacenStockFactGalFactIni').val();
        },
        maxDate: today
    });
}

function llenarListModalAlmacenStockFactGalFactProds() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_combustible",
        success: function (response) {
            $("#listModalAlmacenStockFactGalFactProds").empty();
            $("#listModalAlmacenStockFactGalFactProds").append("<option value='todos'>--Todos--</option>");
            $.each(response.listProductos, function (index, value) {
                var nombre, nombre_completo;
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    nombre_completo = nombre;
                } else {
                    nombre_completo = value.prodDescripcion + " (" + nombre + ")";
                }
                var prod = "<option value=" + value.prodId + ">" + nombre_completo + "</option>";
                $("#listModalAlmacenStockFactGalFactProds").append(prod);
            });
            document.getElementById("listModalAlmacenStockFactGalFactProds").selectedIndex = "0";
            llenarTablaModalAlmacenStockFactGalFact();
        }
    });
}

function llenarTablaModalAlmacenStockFactGalFact() {
    var servlt = "./Almacen?url=lista_comprobantes_emitidos";
    var param1 = "&fecha_ini=" + $('#datePickModalAlmacenStockFactGalFactIni').val();
    var param2 = "&fecha_fin=" + $('#datePickModalAlmacenStockFactGalFactFin').val();
    var param3 = "&prod_id=" + $('#listModalAlmacenStockFactGalFactProds').val();
    var url = servlt.concat(param1, param2, param3);

    $.ajax({
        dataType: 'json',
        url: url,
        success: function (response) {
            $("#tablaModalAlmacenStockFactGalFact").empty();
            var tabla = '<thead id="tablaModalAlmacenStockFactGalFactHead"></thead>\
                         <tbody id="tablaModalAlmacenStockFactGalFactBody"></tbody>\
                         <tfoot id="tablaModalAlmacenStockFactGalFactFoot"></tfoot>';
            $("#tablaModalAlmacenStockFactGalFact").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Comprobante</th>\
                          <th style='text-align: center;'>Serie</th>\
                          <th style='text-align: center;'>Número</th>\
                          <th style='text-align: center;'>Cliente</th>\
                          <th style='text-align: center;'>Documento</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Galones</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                        </tr>";
            $("#tablaModalAlmacenStockFactGalFactHead").append(head);

            var galT, montoT;
            galT = montoT = 0.00;
            $.each(response.listComprobantes, function (index, value) {
                var compro, serie, nro, clie, docu, nombre, descripcion, gal, monto;
                if (!$.trim(value.tiemNombre)) {
                    compro = "";
                } else {
                    compro = value.tiemNombre;
                }
                if (!$.trim(value.reveNroComprobante)) {
                    serie = "";
                    nro = "";
                } else {
                    serie = value.reveNroComprobante.split("-")[0];
                    nro = value.reveNroComprobante.split("-")[1];
                }
                if (!$.trim(value.reveNombres)) {
                    clie = "";
                } else {
                    clie = value.reveNombres;
                }
                if (!$.trim(value.reveDocumento)) {
                    docu = "";
                } else {
                    docu = value.reveDocumento;
                }
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.prodDescripcion;
                }
                var producto = descripcion + " (" + nombre + ")";
                if (!$.trim(value.revdCantidad)) {
                    gal = "";
                } else {
                    gal = formatNumeroDecimalFour(value.revdCantidad);
                    galT += value.revdCantidad;
                }
                if (!$.trim(value.revdMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.revdMonto);
                    montoT += value.revdMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + value.reveFechaHora + "</td>\
                              <td align='left'>" + compro + "</td>\
                              <td align='left'>" + serie + "</td>\
                              <td align='left'>" + nro + "</td>\
                              <td align='left'>" + clie + "</td>\
                              <td align='left'>" + docu + "</td>\
                              <td align='left'>" + producto + "</td>\
                              <td align='center'>" + gal + "</td>\
                              <td align='center'>" + monto + "</td>\
                            </tr>";
                $("#tablaModalAlmacenStockFactGalFactBody").append(body);

            });

            $('#tablaModalAlmacenStockFactGalFact').dataTable().fnDestroy();

            $("#tablaModalAlmacenStockFactGalFactFoot").empty();
            var foot = "<tr>\
                            <th style='text-align: center;' colspan='7'></th>\
                            <th style='text-align: center;'>TOTAL</th>\
                            <th style='text-align: center;'>" + formatNumeroDecimalFour(galT) + "</th>\
                            <th style='text-align: center;'>" + formatNumeroDecimal(montoT) + "</th>\
                        </tr>";
            $("#tablaModalAlmacenStockFactGalFactFoot").append(foot);

            $('#tablaModalAlmacenStockFactGalFact').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_comprobantes_emitidos',
                        title: 'Lista de Comprobantes Emitidos',
                        footer: true
                    }
                ]
            });

        }
    });

}

function llenarTablaAlmacenStockFact() {
    $("#tablaAlmacenStockFact").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=list_stock_productos",
        success: function (response) {
            $("#tablaAlmacenStockFact").empty();
            var tabla = '<thead id="tablaAlmacenStockFactHead"></thead>\
                         <tbody id="tablaAlmacenStockFactBody"></tbody>';
            $("#tablaAlmacenStockFact").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Galones Iniciales (Gi)</th>\
                          <th style='text-align: center;'>Galones Comprados (Gc)</th>\
                          <th style='text-align: center;'>Galones Facturados (Gfa)</th>\
                          <th style='text-align: center;'>Stock Facturación (Gi+Gc-Gfa)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaAlmacenStockFactHead").append(head);

            $.each(response.listStockFact, function (index, value) {
                var producto, galIni, galComp, galFact;
                var stockFa = 0.00;
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.galonesInicialesFacturacion)) {
                    galIni = "";
                } else {
                    galIni = formatNumeroDecimal(value.galonesInicialesFacturacion);
                    stockFa += value.galonesInicialesFacturacion;
                }
                if (!$.trim(value.galonesCompradosFact)) {
                    galComp = "";
                } else {
                    galComp = formatNumeroDecimal(value.galonesCompradosFact);
                    stockFa += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesFacturados)) {
                    galFact = "";
                } else {
                    galFact = formatNumeroDecimal(value.galonesFacturados);
                    stockFa -= value.galonesFacturados;
                }
                var body = "<tr id='trTablaAlmacenStockFactBody_" + value.prodId + "' class='tr-row-table'>\
                              <td align='center' id='" + value.prodId + "'>" + (index + 1) + "</td>\
                              <td align='left'>" + producto + "</td>\
                              <td align='center'>" + galIni + "</td>\
                              <td align='center'>" + galComp + "</td>\
                              <td align='center'>" + galFact + "</td>\
                              <td align='center'>" + formatNumeroDecimal(stockFa) + "</td>\
                              <td align='center'>\
                                <button class='btn btn-light btn-sm' title='Editar'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenStockFactBody").append(body);

            });

            $('#tablaAlmacenStockFactBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaAlmacenStockFactBody tr.tr-row-table').removeClass('hide');
                $("#trTablaAlmacenStockFactBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Almacen?url=update_stock_inicial_fact&prod_id=" + array[0];
                $("#formUpdateAlmacenStockFact").attr("action", actionTrForm);
                var input = '<tr id="trTablaAlmacenStockFactBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptAlmacenStockFactGalonIni" name="stin_cantidad" type="text" class="form-control" \
                                  value="' + arrayHtml[2].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)" required>\
                                </td>\
                                <td style="text-align: center;">' + arrayHtml[3] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[4] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[5] + '</td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdAlmacenStockFactGalonIni" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanAlmacenStockFactGalonIni" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#btnCanAlmacenStockFactGalonIni").click(function () {
                    $('#tablaAlmacenStockFactBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaAlmacenStockFactBodyForm").remove();
                });

            });

            $('#tablaAlmacenStockFact').dataTable().fnDestroy();

            $('#tablaAlmacenStockFact').dataTable({
                dom: '<Brt>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_stock_facturacion',
                        title: 'Lista de Stock de Facturación',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function eventFormUpdateAlmacenStockFact() {
    $("#formUpdateAlmacenStockFact").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateAlmacenStockFact").attr("action"),
                    data: $("#formUpdateAlmacenStockFact").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaAlmacenStockFact();
                            llenarTablaAlmacenStockLiquid();
                            llenarTablaAlmacenStockProd();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}

function llenarTablaAlmacenStockLiquid() {
    $("#tablaAlmacenStockLiquid").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=list_stock_productos",
        success: function (response) {
            $("#tablaAlmacenStockLiquid").empty();
            var tabla = '<thead id="tablaAlmacenStockLiquidHead"></thead>\
                         <tbody id="tablaAlmacenStockLiquidBody"></tbody>';
            $("#tablaAlmacenStockLiquid").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Galones Iniciales (Gi)</th>\
                          <th style='text-align: center;'>Galones Comprados (Gc)</th>\
                          <th style='text-align: center;'>Galones Máquina (Gm)</th>\
                          <th style='text-align: center;'>Devoluciones Tanque (Dt)</th>\
                          <th style='text-align: center;'>Stock Estimado (Gi+Gc-Gm+Dt)</th>\
                          <th style='text-align: center;'>Stock Físico (Sfi)</th>\
                          <th style='text-align: center;'>Merma (Estimado-Físico)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaAlmacenStockLiquidHead").append(head);

            $.each(response.listStockLiquid, function (index, value) {
                var producto, galIni, galMaq, devTanq, stockFi;
                var galComp = 0.00;
                var stockEs = 0.00;
                var merma = 0.00;
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.galonesInicialesLiquidacion)) {
                    galIni = "";
                } else {
                    galIni = formatNumeroDecimal(value.galonesInicialesLiquidacion);
                    stockEs += value.galonesInicialesLiquidacion;
                    merma += value.galonesInicialesLiquidacion;
                }
                if (!$.trim(value.galonesCompradosFact)) {
                } else {
                    galComp += value.galonesCompradosFact;
                    stockEs += value.galonesCompradosFact;
                    merma += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesComprados)) {
                } else {
                    galComp += value.galonesComprados;
                    stockEs += value.galonesComprados;
                    merma += value.galonesComprados;
                }
                if (!$.trim(value.lecturaMaquina)) {
                    galMaq = "";
                } else {
                    galMaq = formatNumeroDecimal(value.lecturaMaquina);
                    stockEs -= value.lecturaMaquina;
                    merma -= value.lecturaMaquina;
                }
                if (!$.trim(value.devolucionTanque)) {
                    devTanq = "";
                } else {
                    devTanq = formatNumeroDecimal(value.devolucionTanque);
                    stockEs += value.devolucionTanque;
                    merma += value.devolucionTanque;
                }
                if (!$.trim(value.lecturaFisica)) {
                    stockFi = "";
                } else {
                    stockFi = formatNumeroDecimal(value.lecturaFisica);
                    merma -= value.lecturaFisica;
                }
                var body = "<tr id='trTablaAlmacenStockLiquidBody_" + value.prodId + "' class='tr-row-table'>\
                              <td align='center' id='" + value.prodId + "'>" + (index + 1) + "</td>\
                              <td align='left'>" + producto + "</td>\
                              <td align='center'>" + galIni + "</td>\
                              <td align='center'>" + formatNumeroDecimal(galComp) + "</td>\
                              <td align='center'>" + galMaq + "</td>\
                              <td align='center'>" + devTanq + "</td>\
                              <td align='center'>" + formatNumeroDecimal(stockEs) + "</td>\
                              <td align='center'>" + stockFi + "</td>\
                              <td align='center'>" + formatNumeroDecimal(merma) + "</td>\
                              <td align='center'>\
                                <button class='btn btn-light btn-sm' title='Editar'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenStockLiquidBody").append(body);

            });

            $('#tablaAlmacenStockLiquidBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaAlmacenStockLiquidBody tr.tr-row-table').removeClass('hide');
                $("#trTablaAlmacenStockLiquidBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Almacen?url=update_stock_inicial_liquid&prod_id=" + array[0];
                $("#formUpdateAlmacenStockLiquid").attr("action", actionTrForm);
                var input = '<tr id="trTablaAlmacenStockLiquidBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptAlmacenStockLiquidGalonIni" name="stin_liquidacion" type="text" class="form-control" \
                                  value="' + arrayHtml[2].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)" required>\
                                </td>\
                                <td style="text-align: center;">' + arrayHtml[3] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[4] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[5] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[6] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[7] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[8] + '</td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdAlmacenStockLiquidGalonIni" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanAlmacenStockLiquidGalonIni" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#btnCanAlmacenStockLiquidGalonIni").click(function () {
                    $('#tablaAlmacenStockLiquidBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaAlmacenStockLiquidBodyForm").remove();
                });

            });

            $('#tablaAlmacenStockLiquid').dataTable().fnDestroy();

            $('#tablaAlmacenStockLiquid').dataTable({
                dom: '<Brt>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_stock_liquidacion',
                        title: 'Lista de Stock de Liquidación',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function eventFormUpdateAlmacenStockLiquid() {
    $("#formUpdateAlmacenStockLiquid").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateAlmacenStockLiquid").attr("action"),
                    data: $("#formUpdateAlmacenStockLiquid").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaAlmacenStockFact();
                            llenarTablaAlmacenStockLiquid();
                            llenarTablaAlmacenStockProd();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}

function llenarTablaAlmacenStockProd() {
    $("#tablaAlmacenStockProd").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=list_stock_productos_otros",
        success: function (response) {
            $("#tablaAlmacenStockProd").empty();
            var tabla = '<thead id="tablaAlmacenStockProdHead"></thead>\
                         <tbody id="tablaAlmacenStockProdBody"></tbody>';
            $("#tablaAlmacenStockProd").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Descripcion</th>\
                          <th style='text-align: center;'>Stock Inicial (S)</th>\
                          <th style='text-align: center;'>Comprados (C)</th>\
                          <th style='text-align: center;'>Facturados (F)</th>\
                          <th style='text-align: center;'>Stock (S+C-F)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaAlmacenStockProdHead").append(head);

            $.each(response.listStock, function (index, value) {
                var producto, desc, ini, comp, fact;
                var stockFa = 0.00;
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    desc = "";
                } else {
                    desc = value.prodDescripcion;
                }
                if (!$.trim(value.galonesInicialesFacturacion)) {
                    ini = "";
                } else {
                    ini = formatNumeroDecimal(value.galonesInicialesFacturacion);
                    stockFa += value.galonesInicialesFacturacion;
                }
                if (!$.trim(value.galonesCompradosFact)) {
                    comp = "";
                } else {
                    comp = formatNumeroDecimal(value.galonesCompradosFact);
                    stockFa += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesFacturados)) {
                    fact = "";
                } else {
                    fact = formatNumeroDecimal(value.galonesFacturados);
                    stockFa -= value.galonesFacturados;
                }
                var body = "<tr id='trTablaAlmacenStockProdBody_" + value.prodId + "' class='tr-row-table'>\
                              <td align='center' id='" + value.prodId + "'>" + (index + 1) + "</td>\
                              <td align='left'>" + producto + "</td>\
                              <td align='left'>" + desc + "</td>\
                              <td align='center'>" + ini + "</td>\
                              <td align='center'>" + comp + "</td>\
                              <td align='center'>" + fact + "</td>\
                              <td align='center'>" + formatNumeroDecimal(stockFa) + "</td>\
                              <td align='center'>\
                                <button class='btn btn-light btn-sm' title='Editar'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenStockProdBody").append(body);

            });

            $('#tablaAlmacenStockProdBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaAlmacenStockProdBody tr.tr-row-table').removeClass('hide');
                $("#trTablaAlmacenStockProdBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Almacen?url=update_stock_inicial_fact&prod_id=" + array[0];
                $("#formUpdateAlmacenStockProd").attr("action", actionTrForm);
                var input = '<tr id="trTablaAlmacenStockProdBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[2] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptAlmacenStockProdGalonIni" name="stin_cantidad" type="text" class="form-control" \
                                  value="' + arrayHtml[3].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)" required>\
                                </td>\
                                <td style="text-align: center;">' + arrayHtml[4] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[5] + '</td>\
                                <td style="text-align: center;">' + arrayHtml[6] + '</td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdAlmacenStockProdGalonIni" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanAlmacenStockProdGalonIni" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#btnCanAlmacenStockProdGalonIni").click(function () {
                    $('#tablaAlmacenStockProdBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaAlmacenStockProdBodyForm").remove();
                });

            });

            $('#tablaAlmacenStockProd').dataTable().fnDestroy();

            $('#tablaAlmacenStockProd').dataTable({
                dom: '<Brt>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_stock_productos',
                        title: 'Lista de Stock Productos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function eventFormUpdateAlmacenStockProd() {
    $("#formUpdateAlmacenStockProd").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateAlmacenStockProd").attr("action"),
                    data: $("#formUpdateAlmacenStockProd").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaAlmacenStockFact();
                            llenarTablaAlmacenStockLiquid();
                            llenarTablaAlmacenStockProd();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}