/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTipoGasto() {
    $("#nMaestrasTipoGastoNombre").val('');
}

function eventFormMaestrasNuevoTipoGasto() {
    $("#formMaestrasNuevoTipoGasto").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTipoGasto();
                    $('#modalMaestrasNuevoTipoGasto').modal('hide');
                    llenarMaestrasTiposGasto();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_tipos_gasto() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TIPOS DE GASTO</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTipoGasto" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTipoGasto">\
                                  <span class="fa fa-hdd-o"></span> Nuevo Tipo Gasto\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTipoGasto" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTipoGasto" method="post" action="./TablasMaestras?url=nuevo_tipo_gasto">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-hdd-o"></i> Nuevo Tipo Gasto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTipoGastoNombre" class="col-form-label">Nombre Tipo de Gasto :</label>\
					  <input id="nMaestrasTipoGastoNombre" type="text" name="tiga_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de gasto" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTipoGastoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTipoGasto" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTipoGasto" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-hdd-o"></i> Editar Tipo de Gasto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTipoGastoNombre" class="col-form-label">Nombre Tipo de Gasto :</label>\
					  <input id="eMaestrasTipoGastoNombre" type="text" name="tiga_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de gasto" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTipoGastoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTiposGasto" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasTiposGasto();
    eventFormMaestrasNuevoTipoGasto();

}

function limpiarMaestrasEditarTipoGasto() {
    $("#eMaestrasTipoGastoNombre").val('');
}

function llenarMaestrasEditarTipoGastoInfo(tiga_id) {
    limpiarMaestrasEditarTipoGasto();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_tipo_gasto&tiga_id=" + tiga_id,
        success: function (response) {
            $("#eMaestrasTipoGastoNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasTiposGasto() {
    $("#tablaMaestrasTiposGasto").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_gasto",
        success: function (response) {
            $("#tablaMaestrasTiposGasto").empty();
            var tabla = '<thead id="tablaMaestrasTiposGastoHead"></thead>\
                         <tbody id="tablaMaestrasTiposGastoBody"></tbody>';
            $("#tablaMaestrasTiposGasto").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTiposGastoHead").append(head);
            $.each(response.listTiposGasto, function (index, value) {
                var nombre;
                if (!$.trim(value.tigaNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tigaNombre;
                }
                var body = "";
                if (value.tigaId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTipoGastoEdit" + value.tigaId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTipoGasto'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTipoGastoDelete" + value.tigaId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTiposGastoBody").append(body);

                $("#btnMaestrasTipoGastoEdit" + value.tigaId).click(function () {

                    var action = "./TablasMaestras?url=editar_tipo_gasto&tiga_id=" + value.tigaId + "";
                    $("#formMaestrasEditarTipoGasto").attr("action", action);
                    llenarMaestrasEditarTipoGastoInfo(value.tigaId);

                    $("#formMaestrasEditarTipoGasto").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTipoGasto();
                                    $('#modalMaestrasEditarTipoGasto').modal('hide');
                                    llenarMaestrasTiposGasto();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTipoGastoDelete" + value.tigaId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este tipo de gasto?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_tipo_gasto&tiga_id=" + value.tigaId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTiposGasto();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTiposGasto').dataTable().fnDestroy();

            $('#tablaMaestrasTiposGasto').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'tipos_gasto',
                        title: 'Lista de Tipos de Gasto',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}