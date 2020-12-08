/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTipoEmision() {
    $("#nMaestrasTipoEmisionNombre").val('');
}

function eventFormMaestrasNuevoTipoEmision() {
    $("#formMaestrasNuevoTipoEmision").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTipoEmision();
                    $('#modalMaestrasNuevoTipoEmision').modal('hide');
                    llenarMaestrasTiposEmision();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_tipos_emision() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TIPOS DE EMISIÓN</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTipoEmision" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTipoEmision">\
                                  <span class="fa fa-clipboard"></span> Nuevo Tipo Emisión\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTipoEmision" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTipoEmision" method="post" action="./TablasMaestras?url=nuevo_tipo_emision">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-clipboard"></i> Nuevo Tipo Emisión</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTipoEmisionNombre" class="col-form-label">Nombre Tipo de Emisión :</label>\
					  <input id="nMaestrasTipoEmisionNombre" type="text" name="tiem_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de emisión" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTipoEmisionSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTipoEmision" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTipoEmision" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-clipboard"></i> Editar Tipo de Emisión</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTipoEmisionNombre" class="col-form-label">Nombre Tipo de Emisión :</label>\
					  <input id="eMaestrasTipoEmisionNombre" type="text" name="tiem_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de emisión" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTipoEmisionSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTiposEmision" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasTiposEmision();
    eventFormMaestrasNuevoTipoEmision();

}

function limpiarMaestrasEditarTipoEmision() {
    $("#eMaestrasTipoEmisionNombre").val('');
}

function llenarMaestrasEditarTipoEmisionInfo(tiem_id) {
    limpiarMaestrasEditarTipoEmision();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_tipo_emision&tiem_id=" + tiem_id,
        success: function (response) {
            $("#eMaestrasTipoEmisionNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasTiposEmision() {
    $("#tablaMaestrasTiposEmision").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_emision",
        success: function (response) {
            $("#tablaMaestrasTiposEmision").empty();
            var tabla = '<thead id="tablaMaestrasTiposEmisionHead"></thead>\
                         <tbody id="tablaMaestrasTiposEmisionBody"></tbody>';
            $("#tablaMaestrasTiposEmision").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTiposEmisionHead").append(head);
            $.each(response.listTiposEmision, function (index, value) {
                var nombre;
                if (!$.trim(value.tiemNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiemNombre;
                }
                var body = "";
                if (value.tiemId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTipoEmisionEdit" + value.tiemId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTipoEmision'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTipoEmisionDelete" + value.tiemId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTiposEmisionBody").append(body);

                $("#btnMaestrasTipoEmisionEdit" + value.tiemId).click(function () {

                    var action = "./TablasMaestras?url=editar_tipo_emision&tiem_id=" + value.tiemId + "";
                    $("#formMaestrasEditarTipoEmision").attr("action", action);
                    llenarMaestrasEditarTipoEmisionInfo(value.tiemId);

                    $("#formMaestrasEditarTipoEmision").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTipoEmision();
                                    $('#modalMaestrasEditarTipoEmision').modal('hide');
                                    llenarMaestrasTiposEmision();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTipoEmisionDelete" + value.tiemId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este tipo de emisión?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_tipo_emision&tiem_id=" + value.tiemId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTiposEmision();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTiposEmision').dataTable().fnDestroy();

            $('#tablaMaestrasTiposEmision').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'tipos_emision',
                        title: 'Lista de Tipos de Emisión',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

