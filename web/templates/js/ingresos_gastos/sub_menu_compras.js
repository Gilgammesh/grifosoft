/*
 ========================
 @author carlos santander
 ========================
 */

function sub_menu_compras() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">COMPRAS DIARIAS DE COMBUSTIBLE</div>\
                      <div class="card-body">\
                              <div class="table-responsive">\
                                <table id="tablaIGRegistroListCompras" class="table table-hover display" style="width: 100%;"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarIGRegistroListaCompras();

}

function llenarIGRegistroListaCompras() {
    $("#tablaIGRegistroListCompras").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_compras",
        success: function (response) {
            $("#tablaIGRegistroListCompras").empty();
            var tabla = '<thead id="tablaIGRegistroListComprasHead"></thead>\
                         <tbody id="tablaIGRegistroListComprasBody"></tbody>\
                         <tfoot id="tablaIGRegistroListComprasFoot"></tfoot>';
            $("#tablaIGRegistroListCompras").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Producto</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Galones</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaIGRegistroListComprasHead").append(head);

            var montoT = 0.00;
            var galonesT = 0.00;
            $.each(response.listCompras, function (index, value) {

                var producto, fecha, descripcion, galones, monto;
                if (!$.trim(value.prodDescripcion)) {
                        producto = "";
                    } else {
                        producto = value.prodDescripcion + " - " + value.prodNombre;
                    }
                if (!$.trim(value.cotuFechaHora)) {
                    fecha = "";
                } else {
                    fecha = value.cotuFechaHora;
                }
                if (!$.trim(value.cotuDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.cotuDescripcion;
                }
                if (!$.trim(value.cotuGalones)) {
                    galones = "";
                } else {
                    galones = formatNumeroDecimal(value.cotuGalones);
                    galonesT += value.cotuGalones;
                }
                if (!$.trim(value.cotuMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.cotuMonto);
                    montoT += value.cotuMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + producto + "</td>\
                              <td align='center'>" + fecha + "</td>\
                              <td align='left'>" + descripcion + "</td>\
                              <td align='right'>" + galones + "</td>\
                              <td align='right'>" + monto + "</td>\
                              <td align='center'>\
                                <button id='btnIGRegistroDeleteCompra" + value.cotuId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaIGRegistroListComprasBody").append(body);

                $("#btnIGRegistroDeleteCompra" + value.cotuId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta Compra?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Ventas?url=delete_compra&cotu_id=" + value.cotuId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarIGRegistroListaCompras();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaIGRegistroListCompras').dataTable().fnDestroy();

            $("#tablaIGRegistroListComprasFoot").empty();
            var foot = "<tr>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: right;'>TOTAL</th>\
                          <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(galonesT) + "</th>\
                          <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(montoT) + "</th>\
                          <th style='text-align: center;'></th>\
                        </tr>";
            $("#tablaIGRegistroListComprasFoot").append(foot);

            $('#tablaIGRegistroListCompras').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_registro_compras',
                        title: 'Lista de Compras',
                        footer: true,
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}