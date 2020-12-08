/*
 ========================
 @author carlos santander
 ========================
 */

function llenarIGRegistroTiposGasto() {
    $("#listIGRegistroTipoGasto").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_gasto",
        success: function (response) {
            $.each(response.listTiposGasto, function (index, value) {
                var nombre;
                if (!$.trim(value.tigaNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tigaNombre;
                }
                var opt = "<option value=" + value.tigaId + ">" + nombre + "</option>";
                $("#listIGRegistroTipoGasto").append(opt);
            });
        }
    });
}

function sub_menu_gastos() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">REGISTRO DE GASTOS DIARIOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2 hide">\
                                <button id="btnIGRegistroNuevoGasto" class="btn btn-primary" data-toggle="modal" data-target="#modalIGRegistroNuevoGasto">\
                                  <span class="icon-wallet"></span>&nbsp;&nbsp;Nuevo Gasto\
                                </button>\
                              </div>\
                              <div id="modalIGRegistroNuevoGasto" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formIGRegistroNuevoGasto" method="post" action="./Ventas?url=insert_gasto">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="icon-wallet"></i>&nbsp;Nuevo Gasto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
                                          <label for="listIGRegistroTipoGasto" class="col-form-label">Tipo de Gasto :</label>\
                                          <select id="listIGRegistroTipoGasto" class="form-select" name="tiga_id" required></select>\
					</div>\
					<div class="form-group">\
                                          <label for="textIGRegistroGastoDesc" class="col-form-label">Descripción :</label>\
                                          <textarea rows="3" id="textIGRegistroGastoDesc" name="gadi_descripcion" class="form-control" \
                                          placeholder="Ingrese descripción o concepto del gasto" form="formIGRegistroNuevoGasto" ></textarea>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="iptIGRegistroGastoMonto" class="col-form-label">Monto Gasto (S/) :</label>\
					    <input id="iptIGRegistroGastoMonto" type="text" name="gadi_monto" class="form-control" \
                                            placeholder="Ingrese monto de gasto en soles" onkeypress="return soloNumDecimal(event, this.value)" required >\
					  </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>\
                              </div>\
                              <div class="table-responsive">\
                                <table id="tablaIGRegistroListGastos" class="table table-hover display" style="width: 100%;"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarIGRegistroTiposGasto();
    llenarIGRegistroListaGastos();

    $("#btnIGRegistroNuevoGasto").click(function () {
        limpiarIGRegistroNuevoGasto();
    });

    eventFormIGRegistroNuevoGasto();

}

function limpiarIGRegistroNuevoGasto() {
    document.getElementById("listIGRegistroTipoGasto").selectedIndex = "0";
    $("#textIGRegistroGastoDesc").val('');
    $("#iptIGRegistroGastoMonto").val('');
}

function eventFormIGRegistroNuevoGasto() {
    $("#formIGRegistroNuevoGasto").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarIGRegistroNuevoGasto();
                    $('#modalIGRegistroNuevoGasto').modal('hide');
                    llenarIGRegistroListaGastos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarIGRegistroListaGastos() {
    $("#tablaIGRegistroListGastos").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_gastos",
        success: function (response) {
            $("#tablaIGRegistroListGastos").empty();
            var tabla = '<thead id="tablaIGRegistroListGastosHead"></thead>\
                         <tbody id="tablaIGRegistroListGastosBody"></tbody>\
                         <tfoot id="tablaIGRegistroListGastosFoot"></tfoot>';
            $("#tablaIGRegistroListGastos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Tipo Gasto</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaIGRegistroListGastosHead").append(head);

            var montoT = 0.00;
            $.each(response.listGastos, function (index, value) {

                var fecha, tipo, descripcion, monto;
                if (!$.trim(value.gadiFechaHora)) {
                    fecha = "";
                } else {
                    fecha = value.gadiFechaHora;
                }
                if (!$.trim(value.tigaNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tigaNombre;
                }
                if (!$.trim(value.gadiDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.gadiDescripcion;
                }
                if (!$.trim(value.gadiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.gadiMonto);
                    montoT += value.gadiMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + fecha + "</td>\
                              <td align='left'>" + tipo + "</td>\
                              <td align='left'>" + descripcion + "</td>\
                              <td align='right'>" + monto + "</td>\
                              <td align='center'>\
                                <button id='btnIGRegistroDeleteGasto" + value.gadiId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaIGRegistroListGastosBody").append(body);

                $("#btnIGRegistroDeleteGasto" + value.gadiId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este Gasto?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Ventas?url=delete_gasto&gadi_id=" + value.gadiId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarIGRegistroListaGastos();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaIGRegistroListGastos').dataTable().fnDestroy();

            $("#tablaIGRegistroListGastosFoot").empty();
            var foot = "<tr>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: right;'>TOTAL GASTOS</th>\
                          <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(montoT) + "</th>\
                          <th style='text-align: center;'></th>\
                        </tr>";
            $("#tablaIGRegistroListGastosFoot").append(foot);

            $('#tablaIGRegistroListGastos').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_registro_gastos',
                        title: 'Lista de Gastos',
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