/*
 ========================
 @author carlos santander
 ========================
 */

function llenarAlmacenFacturaDatePicker() {
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

    $('#iptAlmacenNFacturaFechaReg').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: today
    });

    $('#iptAlmacenNFacturaFechaFact').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: today
    });

}

function llenarAlmacenFacturaProductos() {
    $("#listAlmacenNFacturaProducto").empty();
    $("#listAlmacenNFacturaProducto").append('<option value="" style="font-weight: 600;">--Seleccione Producto--</option>');
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
        success: function (response) {
            $.each(response.listProductos, function (index, value) {
                var nombre, descripcion;
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
                var opt = "<option value=" + value.prodId + ">" + descripcion + " (" + nombre + ")</option>";
                $("#listAlmacenNFacturaProducto").append(opt);
            });
        }
    });
}

function llenarAlmacenFacturaProveedores() {
    $("#listAlmacenNFacturaProveedor").empty();
    $("#listAlmacenNFacturaProveedor").append('<option value="">--Seleccione Proveedor--</option>');
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=lista_proveedores",
        success: function (response) {
            $.each(response.listProveedores, function (index, value) {
                var nombres, documento;
                if (!$.trim(value.provNombres)) {
                    nombres = "";
                } else {
                    nombres = value.provNombres;
                }
                if (!$.trim(value.provDocumento)) {
                    documento = "";
                } else {
                    documento = value.provDocumento;
                }
                var opt = "<option value=" + value.provId + ">" + nombres + " (" + documento + ")</option>";
                $("#listAlmacenNFacturaProveedor").append(opt);
            });
            llenarAlmacenFacturaNProveedorPlantas("");

            $("#listAlmacenNFacturaProveedor").bind("change", function () {
                llenarAlmacenFacturaNProveedorPlantas($("#listAlmacenNFacturaProveedor").val());
            });
        }
    });
}

function llenarAlmacenFacturaNProveedorPlantas(provId) {
    $("#listAlmacenNFacturaProveedorPlanta").empty();
    $("#listAlmacenNFacturaProveedorPlanta").append('<option value="">--Seleccione Planta de Proveedor--</option>');
    if (provId !== "") {
        $.ajax({
            dataType: 'json',
            url: "./Almacen?url=lista_proveedores_plantas&prov_id=" + provId,
            success: function (response) {
                $.each(response.listPlantas, function (index, value) {
                    var nombre;
                    if (!$.trim(value.prplNombre)) {
                        nombre = "";
                    } else {
                        nombre = value.prplNombre;
                    }
                    var opt = "<option value=" + value.prplId + ">" + nombre + "</option>";
                    $("#listAlmacenNFacturaProveedorPlanta").append(opt);
                });
            }
        });
    }
}

function sub_menu_fact_compras() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">REGISTRO DE FACTURAS DE COMPRA</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnAlmacenNuevaFactura" class="btn btn-primary" data-toggle="modal" data-target="#modalAlmacenNuevaFactura">\
                                  <span class="fa fa-file-text"></span>&nbsp;&nbsp;Nueva Factura\
                                </button>\
                              </div>\
                              <div id="modalAlmacenNuevaFactura" class="modal fade"></div>\
                              <div id="modalAlmacenInfoFactura" class="modal fade"></div>\
                              <div class="table-responsive">\
                                <table id="tablaAlmacenFacturas" class="table table-hover display" style="width: 100%;"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    $('#btnAlmacenNuevaFactura').click(function (evt) {
        llenarAlmacenNuevaFactura();
    });

    llenarAlmacenListaFacturas();

}

function llenarAlmacenNuevaFactura() {
    $('#modalAlmacenNuevaFactura').empty();
    var modal = '<div class="modal-dialog modal-full">\
                                  <form id="formAlmacenNuevaFactura" method="post" action="./Almacen?url=nueva_factura">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-file-text-o"></i>&nbsp;Nueva Factura de Compra</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
					  <div class="form-group col-md-4">\
                                            <label for="iptAlmacenNFacturaFechaReg" class="col-form-label">Fecha de Registro :</label>\
                                            <input id="iptAlmacenNFacturaFechaReg" name="faco_fecha_registro" required >\
					  </div>\
					  <div class="form-group col-md-4">\
					    <label for="iptAlmacenNFacturaNro" class="col-form-label">Número de Factura :</label>\
					    <input id="iptAlmacenNFacturaNro" type="text" name="faco_factura" class="form-control" \
                                            placeholder="Ingrese número comprobante" required >\
					  </div>\
					  <div class="form-group col-md-4">\
                                            <label for="iptAlmacenNFacturaFechaFact" class="col-form-label">Fecha de Factura:</label>\
                                            <input id="iptAlmacenNFacturaFechaFact" name="faco_fecha_factura" required >\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-5">\
                                            <label for="listAlmacenNFacturaProducto" class="col-form-label">Producto :</label>\
                                            <select id="listAlmacenNFacturaProducto" class="form-select" ></select>\
					  </div>\
					  <div class="form-group col-md-3">\
					    <label for="iptAlmacenNFacturaCantidad" class="col-form-label">Cantidad:</label>\
					    <input id="iptAlmacenNFacturaCantidad" type="text" class="form-control" \
                                            placeholder="Ingrese cantidad" onkeypress="return soloNumDecimalFour(event, this.value)" >\
					  </div>\
					  <div class="form-group col-md-3">\
					    <label for="iptAlmacenNFacturaMonto" class="col-form-label">Monto (S/) :</label>\
					    <input id="iptAlmacenNFacturaMonto" type="text" class="form-control" \
                                            placeholder="Ingrese monto en soles" onkeypress="return soloNumDecimal(event, this.value)" >\
					  </div>\
					  <div class="form-group col-md-1">\
					    <label class="col-form-label">Añadir :</label>\
                                            <div>\
					      <button id="btnAddAlmacenNFacturaProd" title="Añadir Producto" type="button" class="btn btn-social-icon btn-rounded btn-success">\
                                                <i class="fa fa-plus"></i>\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
                                        <div class="table-responsive">\
                                          <table id="tablaAlmacenNFacturaProductos" class="table table-hover display" style="width: 100%;">\
                                            <thead id="tablaAlmacenNFacturaProductosHead">\
                                              <tr>\
                                                <th style="text-align: center;">Producto</th>\
                                                <th class="hide">prod_id</th>\
                                                <th style="text-align: center;">Cantidad (galones)</th>\
                                                <th class="hide">Cantidad (galones)</th>\
                                                <th style="text-align: center;">Monto (S/)</th>\
                                                <th class="hide">Monto (S/)</th>\
                                                <th style="text-align: center;">Acción</th>\
                                              </tr>\
                                            </thead>\
                                            <tbody id="tablaAlmacenNFacturaProductosBody"></tbody>\
                                            <tfoot id="tablaAlmacenNFacturaProductosFoot">\
                                              <tr>\
                                                <th style="text-align: center;">TOTAL</th>\
                                                <th class="hide"></th>\
                                                <th id="tdAlmacenNFacturaTotalGal" style="text-align: center;">0</th>\
                                                <th class="hide"></th>\
                                                <th id="tdAlmacenNFacturaTotalMonto" style="text-align: center;">0</th>\
                                                <th class="hide"></th>\
                                                <th style="text-align: center;"></th>\
                                              </tr>\
                                            </tfoot>\
                                          </table>\
                                        </div>\
					<div class="form-group">\
                                          <label for="listAlmacenNFacturaProveedor" class="col-form-label">Proveedor :</label>\
                                          <select id="listAlmacenNFacturaProveedor" class="form-select" name="prov_id" required></select>\
					</div>\
					<div class="form-group">\
                                          <label for="listAlmacenNFacturaProveedorPlanta" class="col-form-label">Planta de Proveedor :</label>\
                                          <select id="listAlmacenNFacturaProveedorPlanta" class="form-select" name="prpl_id" required></select>\
					</div>\
					<div class="form-group">\
                                          <label for="textAlmacenNFacturaComentarios" class="col-form-label">Comentarios :</label>\
                                          <textarea rows="5" id="textAlmacenNFacturaComentarios" name="faco_comentarios" class="form-control" \
                                          placeholder="Ingrese comentarios sobre la factura" form="formAlmacenNuevaFactura" ></textarea>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAlmacenNuevaFacturaSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $('#modalAlmacenNuevaFactura').append(modal);

    llenarAlmacenFacturaDatePicker();
    llenarAlmacenFacturaProductos();
    llenarAlmacenFacturaProveedores();

    $('#tablaAlmacenNFacturaProductos').dataTable().fnDestroy();
    $('#tablaAlmacenNFacturaProductos').dataTable({
        dom: 'rt',
        footer: true,
        pageLength: 100
    });
    $("#tablaAlmacenNFacturaProductosBody").empty();

    eventAddAlmacenNFacturaProductos();
    eventFormAlmacenNuevaFactura();

}

function eventAddAlmacenNFacturaProductos() {
    $("#btnAddAlmacenNFacturaProd").click(function () {
        if ($("#listAlmacenNFacturaProducto").val() === "") {
            alertify.error("Debe elegir un producto");
        } else if ($("#iptAlmacenNFacturaCantidad").val() === "") {
            alertify.error("Debe ingresar una cantidad de galones");
        } else if ($("#iptAlmacenNFacturaMonto").val() === "") {
            alertify.error("Debe ingresar un monto");
        } else {
            var body = "<tr id='trAddAlmacenNFacturaProd_" + $('#listAlmacenNFacturaProducto').val() + "'>\
                            <td align='center'>" + $('#listAlmacenNFacturaProducto option:selected').text() + "</td>\
                            <td class='hide'><input type='text' value=" + $('#listAlmacenNFacturaProducto').val() + " name='prod_id'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptAlmacenNFacturaCantidad').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptAlmacenNFacturaCantidad').val() + " name='facd_cantidad'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptAlmacenNFacturaMonto').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptAlmacenNFacturaMonto').val() + " name='facd_monto'></td>\
                            <td align='center'>\
                              <button id='" + $('#listAlmacenNFacturaProducto').val() + "' type='button' title='Eliminar Producto' class='btn btn-danger btn-sm'>\
                                <i class='fa fa-remove'></i>\
                              </button>\
                            </td>\
                        </tr>";
            $("#tablaAlmacenNFacturaProductosBody").append(body);

            limpiarSubTotAlmacenNFacturaProd();
            limpiarAddAlmacenNFacturaProd();

            $("#tablaAlmacenNFacturaProductosBody button").click(function () {
                $("#trAddAlmacenNFacturaProd_" + this.id).remove();
                limpiarSubTotAlmacenNFacturaProd();
            });
        }
    });
}

function limpiarSubTotAlmacenNFacturaProd() {
    var tdAlmacenNFacturaTotalGal = 0.00;
    var tdAlmacenNFacturaTotalMonto = 0.00;
    $("#tdAlmacenNFacturaTotalGal").empty();
    $("input[name=facd_cantidad]").each(function () {
        tdAlmacenNFacturaTotalGal += Number(this.value);
    });
    $("#tdAlmacenNFacturaTotalGal").append(formatNumeroDecimal(tdAlmacenNFacturaTotalGal));
    $("#tdAlmacenNFacturaTotalMonto").empty();
    $("input[name=facd_monto]").each(function () {
        tdAlmacenNFacturaTotalMonto += Number(this.value);
    });
    $("#tdAlmacenNFacturaTotalMonto").append(formatNumeroDecimal(tdAlmacenNFacturaTotalMonto));
}

function limpiarAddAlmacenNFacturaProd() {
    document.getElementById("listAlmacenNFacturaProducto").selectedIndex = "0";
    $('#iptAlmacenNFacturaCantidad').val('');
    $('#iptAlmacenNFacturaMonto').val('');
}

function eventFormAlmacenNuevaFactura() {
    $("#formAlmacenNuevaFactura").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalAlmacenNuevaFactura').modal('hide');
                    llenarAlmacenListaFacturas();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarAlmacenListaFacturas() {
    $("#tablaAlmacenFacturas").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=lista_facturas",
        success: function (response) {
            $("#tablaAlmacenFacturas").empty();
            var tabla = '<thead id="tablaAlmacenFacturasHead"></thead>\
                         <tbody id="tablaAlmacenFacturasBody"></tbody>';
            $("#tablaAlmacenFacturas").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Factura</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                          <th style='text-align: center;' class='hide'>Comentarios</th>\
                          <th style='text-align: center;'>Proveedor</th>\
                          <th style='text-align: center;'>Planta</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaAlmacenFacturasHead").append(head);

            $.each(response.listFacturas, function (index, value) {

                var fecha, factura, monto, producto, proveedor, planta;
                if (!$.trim(value.facoFechaFactura)) {
                    fecha = "";
                } else {
                    fecha = value.facoFechaFactura;
                }
                if (!$.trim(value.facoFactura)) {
                    factura = "";
                } else {
                    factura = value.facoFactura;
                }
                if (!$.trim(value.facdMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.facdMonto);
                }
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.provNombres)) {
                    proveedor = "";
                } else {
                    proveedor = value.provNombres;
                }
                if (!$.trim(value.prplNombre)) {
                    planta = "";
                } else {
                    planta = value.prplNombre;
                }
                var comentarios;
                if (!$.trim(value.facoComentarios)) {
                    comentarios = "";
                } else {
                    comentarios = value.facoComentarios;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + fecha + "</td>\
                              <td align='left'>" + factura + "</td>\
                              <td align='right'>" + monto + "</td>\
                              <td align='left' class='hide'>" + comentarios + "</td>\
                              <td align='left'>" + proveedor + "</td>\
                              <td align='left'>" + planta + "</td>\
                              <td align='center'>\
                                <button id='btnAlmacenViewFactura" + value.facoId + "' title='Ver Detalle' class='btn btn-secondary btn-sm' \
                                data-toggle='modal' data-target='#modalAlmacenInfoFactura' >\
                                  <i class='fa fa-eye'></i>\
                                </button>\
                                <button id='btnAlmacenDeleteFactura" + value.facoId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenFacturasBody").append(body);

                $("#btnAlmacenViewFactura" + value.facoId).click(function () {
                    llenarAlmacenInfoFactura(value.facoId);
                });

                $("#btnAlmacenDeleteFactura" + value.facoId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta Factura?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Almacen?url=delete_factura&faco_id=" + value.facoId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarAlmacenListaFacturas();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaAlmacenFacturas').dataTable().fnDestroy();

            $('#tablaAlmacenFacturas').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_facturas_compra',
                        title: 'Lista de Facturas de Compra',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function llenarAlmacenInfoFactura(facoId) {
    $('#modalAlmacenInfoFactura').empty();
    var modal = '<div class="modal-dialog modal-full">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-file-text-o"></i>&nbsp;Información de Factura de Compra</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label class="col-form-label">Factura :</label>\
					    <input id="iptAlmacenInfoFacturaNro" type="text" class="form-control" disabled>\
					  </div>\
					  <div class="form-group col-md-6">\
                                            <label class="col-form-label">Fecha :</label>\
                                            <input id="iptAlmacenInfoFacturaFecha" type="text" class="form-control" disabled >\
					  </div>\
					</div>\
                                        <div class="table-responsive">\
                                          <table id="tablaAlmacenInfoFacturaProductos" class="table table-hover display" style="width: 100%;">\
                                            <thead id="tablaAlmacenInfoFacturaProductosHead">\
                                              <tr>\
                                                <th style="text-align: center;">Item</th>\
                                                <th style="text-align: center;">Producto</th>\
                                                <th style="text-align: center;">Cantidad (galones)</th>\
                                                <th style="text-align: center;">Monto (S/)</th>\
                                              </tr>\
                                            </thead>\
                                            <tbody id="tablaAlmacenInfoFacturaProductosBody"></tbody>\
                                            <tfoot id="tablaAlmacenInfoFacturaProductosFoot"></tfoot>\
                                          </table>\
                                        </div>\
					<div class="form-group">\
                                          <label class="col-form-label">Proveedor :</label>\
                                          <input id="iptAlmacenInfoFacturaProveedor" type="text" class="form-control" disabled></input>\
					</div>\
					<div class="form-group">\
                                          <label class="col-form-label">Planta de Proveedor :</label>\
                                          <input id="iptAlmacenInfoFacturaProveedorPlanta" type="text" class="form-control" disabled></input>\
					</div>\
					<div class="form-group">\
                                          <label class="col-form-label">Comentarios :</label>\
                                          <textarea rows="5" id="textAlmacenInfoFacturaComentarios" class="form-control"></textarea>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
                               </div>';
    $('#modalAlmacenInfoFactura').append(modal);
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=info_factura&faco_id=" + facoId,
        success: function (response) {
            $("#iptAlmacenInfoFacturaNro").val(response.factura);
            $("#iptAlmacenInfoFacturaFecha").val(response.fecha);
            $("#iptAlmacenInfoFacturaProveedor").val(response.proveedor);
            $("#iptAlmacenInfoFacturaProveedorPlanta").val(response.planta);
            $("#textAlmacenInfoFacturaComentarios").val(response.comentarios);
            var cantidadT = 0.00;
            var montoT = 0.00;
            $.each(response.listFacturaDetalle, function (index, value) {
                var nombre, descripcion, cantidad, monto;
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
                if (!$.trim(value.facdCantidad)) {
                    cantidad = "";
                } else {
                    cantidad = formatNumeroDecimal(value.facdCantidad);
                    cantidadT += value.facdCantidad;
                }
                if (!$.trim(value.facdMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.facdMonto);
                    montoT += value.facdMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='left'>" + descripcion + " (" + nombre + ")</td>\
                              <td align='center'>" + cantidad + "</td>\
                              <td align='center'>" + monto + "</td>\
                            </tr>";
                $("#tablaAlmacenInfoFacturaProductosBody").append(body);

            });

            $('#tablaAlmacenInfoFacturaProductos').dataTable().fnDestroy();

            $("#tablaAlmacenInfoFacturaProductosFoot").empty();
            var foot = "<tr>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'>TOTAL</th>\
                          <th style='text-align: center;'>" + formatNumeroDecimal(cantidadT) + "</th>\
                          <th style='text-align: center;'>" + formatNumeroDecimal(montoT) + "</th>\
                        </tr>";
            $("#tablaAlmacenInfoFacturaProductosFoot").append(foot);


            $('#tablaAlmacenInfoFacturaProductos').dataTable({
                dom: 'rt'
            });

        }
    });
}