/*
 ========================
 @author carlos santander
 ========================
 */

function llenarIGRegistroTiposIngreso() {
    $("#listIGRegistroTipoIngreso").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_ingreso",
        success: function (response) {
            $.each(response.listTiposIngreso, function (index, value) {
                var nombre;
                if (!$.trim(value.tiinNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiinNombre;
                }
                var opt = "<option value=" + value.tiinId + ">" + nombre + "</option>";
                $("#listIGRegistroTipoIngreso").append(opt);
            });
        }
    });
}

function sub_menu_ingresos() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">REGISTRO DE INGRESOS DIARIOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2 hide">\
                                <button id="btnIGRegistroNuevoIngreso" class="btn btn-primary" data-toggle="modal" data-target="#modalIGRegistroNuevoIngreso">\
                                  <span class="fa fa-life-ring"></span>&nbsp;&nbsp;Nuevo Ingreso\
                                </button>\
                              </div>\
                              <div id="modalIGRegistroNuevoIngreso" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formIGRegistroNuevoIngreso" method="post" action="./Ventas?url=insert_ingreso">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-life-ring"></i>&nbsp;Nuevo Ingreso</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
                                          <label for="listIGRegistroTipoIngreso" class="col-form-label">Tipo de Ingreso :</label>\
                                          <select id="listIGRegistroTipoIngreso" class="form-select" name="tiin_id" required></select>\
					</div>\
					<div class="form-group">\
                                          <label for="textIGRegistroIngresoDesc" class="col-form-label">Descripción :</label>\
                                          <textarea rows="3" id="textIGRegistroIngresoDesc" name="indi_descripcion" class="form-control" \
                                          placeholder="Ingrese descripción o concepto del ingreso" form="formIGRegistroNuevoIngreso" ></textarea>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="iptIGRegistroIngresoMonto" class="col-form-label">Monto Ingreso (S/) :</label>\
					    <input id="iptIGRegistroIngresoMonto" type="text" name="indi_monto" class="form-control" \
                                            placeholder="Ingrese monto de ingreso en soles" onkeypress="return soloNumDecimal(event, this.value)" required >\
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
                                <table id="tablaIGRegistroListIngresos" class="table table-hover display" style="width: 100%;"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarIGRegistroTiposIngreso();
    llenarIGRegistroListaIngresos();

    $("#btnIGRegistroNuevoIngreso").click(function () {
        limpiarIGRegistroNuevoIngreso();
    });

    eventFormIGRegistroNuevoIngreso();

}

function limpiarIGRegistroNuevoIngreso() {
    document.getElementById("listIGRegistroTipoIngreso").selectedIndex = "0";
    $("#textIGRegistroIngresoDesc").val('');
    $("#iptIGRegistroIngresoMonto").val('');
}

function eventFormIGRegistroNuevoIngreso() {
    $("#formIGRegistroNuevoIngreso").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarIGRegistroNuevoIngreso();
                    $('#modalIGRegistroNuevoIngreso').modal('hide');
                    llenarIGRegistroListaIngresos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarIGRegistroListaIngresos() {
    $("#tablaIGRegistroListIngresos").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_ingresos",
        success: function (response) {
            $("#tablaIGRegistroListIngresos").empty();
            var tabla = '<thead id="tablaIGRegistroListIngresosHead"></thead>\
                         <tbody id="tablaIGRegistroListIngresosBody"></tbody>\
                         <tfoot id="tablaIGRegistroListIngresosFoot"></tfoot>';
            $("#tablaIGRegistroListIngresos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Fecha</th>\
                          <th style='text-align: center;'>Tipo Ingreso</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Monto (S/)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaIGRegistroListIngresosHead").append(head);

            var montoT = 0.00;
            $.each(response.listIngresos, function (index, value) {

                var fecha, tipo, descripcion, monto;
                if (!$.trim(value.indiFechaHora)) {
                    fecha = "";
                } else {
                    fecha = value.indiFechaHora;
                }
                if (!$.trim(value.tiinNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tiinNombre;
                }
                if (!$.trim(value.indiDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.indiDescripcion;
                }
                if (!$.trim(value.indiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.indiMonto);
                    montoT += value.indiMonto;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='center'>" + fecha + "</td>\
                              <td align='left'>" + tipo + "</td>\
                              <td align='left'>" + descripcion + "</td>\
                              <td align='right'>" + monto + "</td>\
                              <td align='center'>\
                                <button id='btnIGRegistroDeleteIngreso" + value.indiId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaIGRegistroListIngresosBody").append(body);

                $("#btnIGRegistroDeleteIngreso" + value.indiId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este Ingreso?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Ventas?url=delete_ingreso&indi_id=" + value.indiId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarIGRegistroListaIngresos();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaIGRegistroListIngresos').dataTable().fnDestroy();
            
            $("#tablaIGRegistroListIngresosFoot").empty();
            var foot = "<tr>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: center;'></th>\
                          <th style='text-align: right;'>TOTAL INGRESOS</th>\
                          <th style='text-align: right; padding-right: 0.75rem;'>" + formatNumeroDecimal(montoT) + "</th>\
                          <th style='text-align: center;'></th>\
                        </tr>";
            $("#tablaIGRegistroListIngresosFoot").append(foot);

            $('#tablaIGRegistroListIngresos').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_registro_ingresos',
                        title: 'Lista de Ingresos',
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