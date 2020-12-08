/*
 ========================
 @author carlos santander
 ========================
 */

function eventFormUpdateVentasPreciosVenta() {
    $("#formUpdateVentasPreciosVentaContado").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateVentasPreciosVentaContado").attr("action"),
                    data: $("#formUpdateVentasPreciosVentaContado").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaVentasPreciosVenta();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
    $("#formUpdateVentasPreciosVentaCredito").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateVentasPreciosVentaCredito").attr("action"),
                    data: $("#formUpdateVentasPreciosVentaCredito").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaVentasPreciosVenta();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}

function sub_menu_precios() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">PRECIOS DE VENTA DE PRODUCTOS</div>\
                      <div class="card-body">\
                            <ul class="nav nav-tabs customtab" role="tablist">\
                              <li class="nav-item">\
                                <a class="nav-link active show" data-toggle="tab" href="#divTablaVentasPreciosVentaContado" role="tab" aria-selected="false">\
                                  <span class="hidden-sm-up"><i class="fa fa-money"></i></span>\
                                  <span class="hidden-xs-down">Precios al contado</span>\
                                </a>\
                              </li>\
                              <li class="nav-item">\
                                <a class="nav-link" data-toggle="tab" href="#divTablaVentasPreciosVentaCredito" role="tab" aria-selected="false">\
                                  <span class="hidden-sm-up"><i class="fa fa-credit-card"></i></span>\
                                  <span class="hidden-xs-down">Precios a crédito</span>\
                                </a>\
                              </li>\
                            </ul>\
                            <div class="tab-content m-t-2">\
                              <div class="tab-pane active show" id="divTablaVentasPreciosVentaContado" role="tabpanel">\
                                  <div class="table-responsive">\
                                    <form id="formUpdateVentasPreciosVentaContado" method="post">\
                                      <table id="tablaVentasPreciosVentaContado" class="table table-bordered table-hover"></table>\
                                    </form>\
                                  </div>\
                              </div>\
                              <div class="tab-pane" id="divTablaVentasPreciosVentaCredito" role="tabpanel">\
                                  <div class="table-responsive">\
                                    <form id="formUpdateVentasPreciosVentaCredito" method="post">\
                                      <table id="tablaVentasPreciosVentaCredito" class="table table-bordered table-hover"></table>\
                                    </form>\
                                  </div>\
                              </div>\
                            </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarTablaVentasPreciosVenta();
    eventFormUpdateVentasPreciosVenta();

}

function llenarTablaVentasPreciosVenta() {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_productos_precios_venta",
        success: function (response) {
            $("#tablaVentasPreciosVentaContado").empty();
            $("#tablaVentasPreciosVentaCredito").empty();
            var tablaE = '<thead id="tablaVentasPreciosVentaContadoHead"></thead>\
                          <tbody id="tablaVentasPreciosVentaContadoBody"></tbody>';
            var tablaP = '<thead id="tablaVentasPreciosVentaCreditoHead"></thead>\
                          <tbody id="tablaVentasPreciosVentaCreditoBody"></tbody>';
            $("#tablaVentasPreciosVentaContado").append(tablaE);
            $("#tablaVentasPreciosVentaCredito").append(tablaP);
            head = "<tr>\
                        <th style='text-align: center;'>Id</th>\
                        <th style='text-align: center;'>Producto</th>\
                        <th style='text-align: center;'>Descripción</th>\
                        <th style='text-align: center;'>Categoría</th>\
                        <th style='text-align: center;'>Unidad de Medida</th>\
                        <th style='text-align: center;'>Precio Venta (S/)</th>\
                        <th style='text-align: center;'>Precio Alternativo 1 (S/)</th>\
                        <th style='text-align: center;'>Precio Alternativo 2 (S/)</th>\
                        <th style='text-align: center;'>Descuento (%)</th>\
                        <th style='text-align: center;'>Descuento (S/)</th>\
                        <th style='text-align: center; width: 100px;' class='notexport'>&nbsp;&nbsp;Acción&nbsp;&nbsp;</th>\
                     </tr>";
            $("#tablaVentasPreciosVentaContadoHead").append(head);
            $("#tablaVentasPreciosVentaCreditoHead").append(head);
            $.each(response.listPreciosVentaContado, function (index, value) {
                var producto, descripcion, categoria, unidad, precio, alterno1, alterno2, dscto_porc, dscto_soles;
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.prodDescripcion;
                }
                if (!$.trim(value.prcaNombre)) {
                    categoria = "";
                } else {
                    categoria = value.prcaNombre;
                }
                if (!$.trim(value.unmeNombre)) {
                    unidad = "";
                } else {
                    if (!$.trim(value.unmeSimbolo)) {
                        unidad = value.unmeNombre;
                    } else {
                        unidad = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                    }
                }
                if (!$.trim(value.prvePrecioUnitario)) {
                    precio = "";
                } else {
                    precio = formatNumeroDecimal(value.prvePrecioUnitario);
                }
                if (!$.trim(value.prvePrecioAlterno1)) {
                    alterno1 = "";
                } else {
                    alterno1 = formatNumeroDecimal(value.prvePrecioAlterno1);
                }
                if (!$.trim(value.prvePrecioAlterno2)) {
                    alterno2 = "";
                } else {
                    alterno2 = formatNumeroDecimal(value.prvePrecioAlterno2);
                }
                if (!$.trim(value.prveDescuentoPrecioPorcentaje)) {
                    dscto_porc = "";
                } else {
                    dscto_porc = formatNumeroDecimalFour(value.prveDescuentoPrecioPorcentaje);
                }
                if (!$.trim(value.prveDescuentoPrecio)) {
                    dscto_soles = "";
                } else {
                    dscto_soles = formatNumeroDecimal(value.prveDescuentoPrecio);
                }
                body1 = "<tr id='trTablaVentasPreciosVentaContadoBody" + value.prodId + "' class='tr-row-table'>\
                            <td align='center' id='" + value.prodId + "'>" + (index + 1) + "</td>\
                            <td align='left'>" + producto + "</td>\
                            <td align='left'>" + descripcion + "</td>\
                            <td align='left'>" + categoria + "</td>\
                            <td align='left'>" + unidad + "</td>\
                            <td align='center'>" + precio + "</td>\
                            <td align='center'>" + alterno1 + "</td>\
                            <td align='center'>" + alterno2 + "</td>\
                            <td align='center'>" + dscto_porc + "</td>\
                            <td align='center'>" + dscto_soles + "</td>\
                            <td align='center'>\
                              <button class='btn btn-light btn-sm' title='Editar'>\
                                <i class='fa fa-edit'></i>\
                              </button>\
                            </td>\
                         </tr>";
                $("#tablaVentasPreciosVentaContadoBody").append(body1);
            });

            $('#tablaVentasPreciosVentaContadoBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaVentasPreciosVentaContadoBody tr.tr-row-table').removeClass('hide');
                $("#trTablaVentasPreciosVentaContadoBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Ventas?url=update_producto_precio_venta&prod_id=" + array[0] + "&tive_id=1";
                $("#formUpdateVentasPreciosVentaContado").attr("action", actionTrForm);
                var input = '<tr id="trTablaVentasPreciosVentaContadoBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: letf;">' + arrayHtml[2] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[3] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[4] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaPrecioContado" name="prve_precio_unitario" type="text" class="form-control" required \
                                  value="' + arrayHtml[5].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaAlterno1Contado" name="prve_precio_alterno1" type="text" class="form-control" \
                                  value="' + arrayHtml[6].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaAlterno2Contado" name="prve_precio_alterno2" type="text" class="form-control" \
                                  value="' + arrayHtml[7].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaDsctoPorcContado" name="prve_descuento_precio_porcentaje" type="text" class="form-control no-updt1" \
                                  value="' + arrayHtml[8].replace(/,/g, '') + '" onkeypress="return soloNumDecimalVentasPrecioVentaDsctoPorcContado(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaDsctoContado" name="prve_descuento_precio" type="text" class="form-control no-updt2" \
                                  value="' + arrayHtml[9].replace(/,/g, '') + '" onkeypress="return soloNumDecimalVentasPrecioVentaDsctoContado(event, this.value)">\
                                </td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdVentasPreciosVentaContado" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanVentasPreciosVentaContado" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#trTablaVentasPreciosVentaContadoBodyForm").click(function (subevt) {

                    if (!$(subevt.target).hasClass('no-updt1') && !$(subevt.target).hasClass('no-updt2')) {
                        if ($("#iptVentasPrecioVentaDsctoPorcContado").hasClass("ipt-edit") && $("#iptVentasPrecioVentaDsctoContado").hasClass("ipt-edit")) {
                        } else {
                            if ($("#iptVentasPrecioVentaDsctoPorcContado").hasClass("ipt-edit")) {
                                if (!$.trim($("#iptVentasPrecioVentaDsctoPorcContado").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioContado").val())) {
                                        $("#iptVentasPrecioVentaDsctoContado").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioContado").val();
                                        var ipt1 = $("#iptVentasPrecioVentaDsctoPorcContado").val();
                                        var ipt2 = ((ipt0 * ipt1) / 100).toFixed(2);
                                        $("#iptVentasPrecioVentaDsctoContado").val(ipt2);
                                    }
                                }
                            }
                            if ($("#iptVentasPrecioVentaDsctoContado").hasClass("ipt-edit")) {
                                if (!$.trim($("#iptVentasPrecioVentaDsctoContado").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioContado").val())) {
                                        $("#iptVentasPrecioVentaDsctoPorcContado").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioContado").val();
                                        var ipt2 = $("#iptVentasPrecioVentaDsctoContado").val();
                                        var ipt1 = (100 * (ipt2 / ipt0)).toFixed(4);
                                        $("#iptVentasPrecioVentaDsctoPorcContado").val(ipt1);
                                    }
                                }
                            }
                        }
                    } else {
                        if ($(subevt.target).hasClass('no-updt1')) {
                            if ($("#iptVentasPrecioVentaDsctoContado").hasClass("ipt-edit")) {
                                $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoPorcContado").addClass("ipt-edit");
                                if (!$.trim($("#iptVentasPrecioVentaDsctoContado").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioContado").val())) {
                                        $("#iptVentasPrecioVentaDsctoPorcContado").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioContado").val();
                                        var ipt2 = $("#iptVentasPrecioVentaDsctoContado").val();
                                        var ipt1 = (100 * (ipt2 / ipt0)).toFixed(4);
                                        $("#iptVentasPrecioVentaDsctoPorcContado").val(ipt1);
                                    }
                                }
                            } else {
                                $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoPorcContado").addClass("ipt-edit");
                            }
                        }
                        if ($(subevt.target).hasClass('no-updt2')) {
                            if ($("#iptVentasPrecioVentaDsctoPorcContado").hasClass("ipt-edit")) {
                                $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").addClass("ipt-edit");
                                if (!$.trim($("#iptVentasPrecioVentaDsctoPorcContado").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioContado").val())) {
                                        $("#iptVentasPrecioVentaDsctoContado").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioContado").val();
                                        var ipt1 = $("#iptVentasPrecioVentaDsctoPorcContado").val();
                                        var ipt2 = ((ipt0 * ipt1) / 100).toFixed(2);
                                        $("#iptVentasPrecioVentaDsctoContado").val(ipt2);
                                    }
                                }
                            } else {
                                $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoContado").addClass("ipt-edit");
                            }
                        }
                    }
                });

                $("#btnCanVentasPreciosVentaContado").click(function () {
                    $('#tablaVentasPreciosVentaContadoBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaVentasPreciosVentaContadoBodyForm").remove();
                });

            });

            $('#tablaVentasPreciosVentaContado').dataTable().fnDestroy();
            $('#tablaVentasPreciosVentaContado').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_precios_venta_contado',
                        title: 'LISTA DE PRECIOS DE VENTA DE PRODUCTOS AL CONTADO',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });

            $.each(response.listPreciosVentaCredito, function (index, value) {
                var producto, descripcion, categoria, unidad, precio, alterno1, alterno2, dscto_porc, dscto_soles;
                if (!$.trim(value.prodNombre)) {
                    producto = "";
                } else {
                    producto = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.prodDescripcion;
                }
                if (!$.trim(value.prcaNombre)) {
                    categoria = "";
                } else {
                    categoria = value.prcaNombre;
                }
                if (!$.trim(value.unmeNombre)) {
                    unidad = "";
                } else {
                    if (!$.trim(value.unmeSimbolo)) {
                        unidad = value.unmeNombre;
                    } else {
                        unidad = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                    }
                }
                if (!$.trim(value.prvePrecioUnitario)) {
                    precio = "";
                } else {
                    precio = formatNumeroDecimal(value.prvePrecioUnitario);
                }
                if (!$.trim(value.prvePrecioAlterno1)) {
                    alterno1 = "";
                } else {
                    alterno1 = formatNumeroDecimal(value.prvePrecioAlterno1);
                }
                if (!$.trim(value.prvePrecioAlterno2)) {
                    alterno2 = "";
                } else {
                    alterno2 = formatNumeroDecimal(value.prvePrecioAlterno2);
                }
                if (!$.trim(value.prveDescuentoPrecioPorcentaje)) {
                    dscto_porc = "";
                } else {
                    dscto_porc = formatNumeroDecimalFour(value.prveDescuentoPrecioPorcentaje);
                }
                if (!$.trim(value.prveDescuentoPrecio)) {
                    dscto_soles = "";
                } else {
                    dscto_soles = formatNumeroDecimal(value.prveDescuentoPrecio);
                }
                body1 = "<tr id='trTablaVentasPreciosVentaCreditoBody" + value.prodId + "' class='tr-row-table'>\
                            <td align='center' id='" + value.prodId + "'>" + (index + 1) + "</td>\
                            <td align='left'>" + producto + "</td>\
                            <td align='left'>" + descripcion + "</td>\
                            <td align='left'>" + categoria + "</td>\
                            <td align='left'>" + unidad + "</td>\
                            <td align='center'>" + precio + "</td>\
                            <td align='center'>" + alterno1 + "</td>\
                            <td align='center'>" + alterno2 + "</td>\
                            <td align='center'>" + dscto_porc + "</td>\
                            <td align='center'>" + dscto_soles + "</td>\
                            <td align='center'>\
                              <button class='btn btn-light btn-sm' title='Editar'>\
                                <i class='fa fa-edit'></i>\
                              </button>\
                            </td>\
                         </tr>";
                $("#tablaVentasPreciosVentaCreditoBody").append(body1);
            });

            $('#tablaVentasPreciosVentaCreditoBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaVentasPreciosVentaCreditoBody tr.tr-row-table').removeClass('hide');
                $("#trTablaVentasPreciosVentaCreditoBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Ventas?url=update_producto_precio_venta&prod_id=" + array[0] + "&tive_id=2";
                $("#formUpdateVentasPreciosVentaCredito").attr("action", actionTrForm);
                var input = '<tr id="trTablaVentasPreciosVentaCreditoBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: letf;">' + arrayHtml[2] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[3] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[4] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaPrecioCredito" name="prve_precio_unitario" type="text" class="form-control" required \
                                  value="' + arrayHtml[5].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaAlterno1Credito" name="prve_precio_alterno1" type="text" class="form-control" \
                                  value="' + arrayHtml[6].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaAlterno2Credito" name="prve_precio_alterno2" type="text" class="form-control" \
                                  value="' + arrayHtml[7].replace(/,/g, '') + '" onkeypress="return soloNumDecimal(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaDsctoPorcCredito" name="prve_descuento_precio_porcentaje" type="text" class="form-control no-updt1" \
                                  value="' + arrayHtml[8].replace(/,/g, '') + '" onkeypress="return soloNumDecimalVentasPrecioVentaDsctoPorcCredito(event, this.value)">\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptVentasPrecioVentaDsctoCredito" name="prve_descuento_precio" type="text" class="form-control no-updt2" \
                                  value="' + arrayHtml[9].replace(/,/g, '') + '" onkeypress="return soloNumDecimalVentasPrecioVentaDsctoCredito(event, this.value)">\
                                </td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdVentasPreciosVentaCredito" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanVentasPreciosVentaCredito" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#trTablaVentasPreciosVentaCreditoBodyForm").click(function (subevt) {

                    if (!$(subevt.target).hasClass('no-updt1') && !$(subevt.target).hasClass('no-updt2')) {
                        if ($("#iptVentasPrecioVentaDsctoPorcCredito").hasClass("ipt-edit") && $("#iptVentasPrecioVentaDsctoCredito").hasClass("ipt-edit")) {
                        } else {
                            if ($("#iptVentasPrecioVentaDsctoPorcCredito").hasClass("ipt-edit")) {
                                if (!$.trim($("#iptVentasPrecioVentaDsctoPorcCredito").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioCredito").val())) {
                                        $("#iptVentasPrecioVentaDsctoCredito").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioCredito").val();
                                        var ipt1 = $("#iptVentasPrecioVentaDsctoPorcCredito").val();
                                        var ipt2 = ((ipt0 * ipt1) / 100).toFixed(2);
                                        $("#iptVentasPrecioVentaDsctoCredito").val(ipt2);
                                    }
                                }
                            }
                            if ($("#iptVentasPrecioVentaDsctoCredito").hasClass("ipt-edit")) {
                                if (!$.trim($("#iptVentasPrecioVentaDsctoCredito").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioCredito").val())) {
                                        $("#iptVentasPrecioVentaDsctoPorcCredito").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioCredito").val();
                                        var ipt2 = $("#iptVentasPrecioVentaDsctoCredito").val();
                                        var ipt1 = (100 * (ipt2 / ipt0)).toFixed(4);
                                        $("#iptVentasPrecioVentaDsctoPorcCredito").val(ipt1);
                                    }
                                }
                            }
                        }
                    } else {
                        if ($(subevt.target).hasClass('no-updt1')) {
                            if ($("#iptVentasPrecioVentaDsctoCredito").hasClass("ipt-edit")) {
                                $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoPorcCredito").addClass("ipt-edit");
                                if (!$.trim($("#iptVentasPrecioVentaDsctoCredito").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioCredito").val())) {
                                        $("#iptVentasPrecioVentaDsctoPorcCredito").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioCredito").val();
                                        var ipt2 = $("#iptVentasPrecioVentaDsctoCredito").val();
                                        var ipt1 = (100 * (ipt2 / ipt0)).toFixed(4);
                                        $("#iptVentasPrecioVentaDsctoPorcCredito").val(ipt1);
                                    }
                                }
                            } else {
                                $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoPorcCredito").addClass("ipt-edit");
                            }
                        }
                        if ($(subevt.target).hasClass('no-updt2')) {
                            if ($("#iptVentasPrecioVentaDsctoPorcCredito").hasClass("ipt-edit")) {
                                $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").addClass("ipt-edit");
                                if (!$.trim($("#iptVentasPrecioVentaDsctoPorcCredito").val())) {
                                } else {
                                    if (!$.trim($("#iptVentasPrecioVentaPrecioCredito").val())) {
                                        $("#iptVentasPrecioVentaDsctoCredito").val('');
                                    } else {
                                        var ipt0 = $("#iptVentasPrecioVentaPrecioCredito").val();
                                        var ipt1 = $("#iptVentasPrecioVentaDsctoPorcCredito").val();
                                        var ipt2 = ((ipt0 * ipt1) / 100).toFixed(2);
                                        $("#iptVentasPrecioVentaDsctoCredito").val(ipt2);
                                    }
                                }
                            } else {
                                $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
                                $("#iptVentasPrecioVentaDsctoCredito").addClass("ipt-edit");
                            }
                        }
                    }
                });

                $("#btnCanVentasPreciosVentaCredito").click(function () {
                    $('#tablaVentasPreciosVentaCreditoBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaVentasPreciosVentaCreditoBodyForm").remove();
                });

            });

            $('#tablaVentasPreciosVentaCredito').dataTable().fnDestroy();
            $('#tablaVentasPreciosVentaCredito').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_precios_venta_credito',
                        title: 'LISTA DE PRECIOS DE VENTA DE PRODUCTOS A CREDITO',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });

        }
    });
}

function soloNumDecimalVentasPrecioVentaDsctoPorcContado(event, value) {
    $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoPorcContado").addClass("ipt-edit");
    soloNumDecimalFour(event, value);
}

function soloNumDecimalVentasPrecioVentaDsctoContado(event, value) {
    $("#iptVentasPrecioVentaDsctoPorcContado").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoContado").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoContado").addClass("ipt-edit");
    soloNumDecimal(event, value);
}

function soloNumDecimalVentasPrecioVentaDsctoPorcCredito(event, value) {
    $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoPorcCredito").addClass("ipt-edit");
    soloNumDecimalFour(event, value);
}

function soloNumDecimalVentasPrecioVentaDsctoCredito(event, value) {
    $("#iptVentasPrecioVentaDsctoPorcCredito").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoCredito").removeClass("ipt-edit");
    $("#iptVentasPrecioVentaDsctoCredito").addClass("ipt-edit");
    soloNumDecimal(event, value);
}