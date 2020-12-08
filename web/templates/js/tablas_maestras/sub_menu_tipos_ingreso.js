/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTipoIngreso() {
    $("#nMaestrasTipoIngresoNombre").val('');
}

function eventFormMaestrasNuevoTipoIngreso() {
    $("#formMaestrasNuevoTipoIngreso").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTipoIngreso();
                    $('#modalMaestrasNuevoTipoIngreso').modal('hide');
                    llenarMaestrasTiposIngreso();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_tipos_ingreso() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TIPOS DE INGRESO</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTipoIngreso" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTipoIngreso">\
                                  <span class="fa fa-thumb-tack"></span> Nuevo Tipo Ingreso\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTipoIngreso" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTipoIngreso" method="post" action="./TablasMaestras?url=nuevo_tipo_ingreso">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-thumb-tack"></i> Nuevo Tipo Ingreso</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTipoIngresoNombre" class="col-form-label">Nombre Tipo de Ingreso :</label>\
					  <input id="nMaestrasTipoIngresoNombre" type="text" name="tiin_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de ingreso" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTipoIngresoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTipoIngreso" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTipoIngreso" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-thumb-tack"></i> Editar Tipo de Ingreso</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTipoIngresoNombre" class="col-form-label">Nombre Tipo de Ingreso :</label>\
					  <input id="eMaestrasTipoIngresoNombre" type="text" name="tiin_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de ingreso" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTipoIngresoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTiposIngreso" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);
    llenarMaestrasTiposIngreso();
    eventFormMaestrasNuevoTipoIngreso();
}

function limpiarMaestrasEditarTipoIngreso() {
    $("#eMaestrasTipoIngresoNombre").val('');
}

function llenarMaestrasEditarTipoIngresoInfo(tiin_id) {
    limpiarMaestrasEditarTipoIngreso();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_tipo_ingreso&tiin_id=" + tiin_id,
        success: function (response) {
            $("#eMaestrasTipoIngresoNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasTiposIngreso() {
    $("#tablaMaestrasTiposIngreso").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_ingreso",
        success: function (response) {
            $("#tablaMaestrasTiposIngreso").empty();
            var tabla = '<thead id="tablaMaestrasTiposIngresoHead"></thead>\
                         <tbody id="tablaMaestrasTiposIngresoBody"></tbody>';
            $("#tablaMaestrasTiposIngreso").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTiposIngresoHead").append(head);
            $.each(response.listTiposIngreso, function (index, value) {
                var nombre;
                if (!$.trim(value.tiinNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiinNombre;
                }
                var body = "";
                if (value.tiinId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTipoIngresoEdit" + value.tiinId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTipoIngreso'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTipoIngresoDelete" + value.tiinId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTiposIngresoBody").append(body);
                $("#btnMaestrasTipoIngresoEdit" + value.tiinId).click(function () {

                    var action = "./TablasMaestras?url=editar_tipo_ingreso&tiin_id=" + value.tiinId + "";
                    $("#formMaestrasEditarTipoIngreso").attr("action", action);
                    llenarMaestrasEditarTipoIngresoInfo(value.tiinId);
                    $("#formMaestrasEditarTipoIngreso").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTipoIngreso();
                                    $('#modalMaestrasEditarTipoIngreso').modal('hide');
                                    llenarMaestrasTiposIngreso();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });
                });
                $("#btnMaestrasTipoIngresoDelete" + value.tiinId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este tipo de ingreso?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_tipo_ingreso&tiin_id=" + value.tiinId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTiposIngreso();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });
            });
            $('#tablaMaestrasTiposIngreso').dataTable().fnDestroy();
            $('#tablaMaestrasTiposIngreso').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'tipos_ingreso',
                        title: 'Lista de Tipos de Ingreso',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

