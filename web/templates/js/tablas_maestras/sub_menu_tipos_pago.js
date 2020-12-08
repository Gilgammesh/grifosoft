/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTipoPago() {
    $("#nMaestrasTipoPagoNombre").val('');
}

function eventFormMaestrasNuevoTipoPago() {
    $("#formMaestrasNuevoTipoPago").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTipoPago();
                    $('#modalMaestrasNuevoTipoPago').modal('hide');
                    llenarMaestrasTiposPago();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_tipos_pago() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TIPOS DE PAGO</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTipoPago" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTipoPago">\
                                  <span class="fa fa-money"></span> Nuevo Tipo Pago\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTipoPago" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTipoPago" method="post" action="./TablasMaestras?url=nuevo_tipo_pago">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-money"></i> Nuevo Tipo Pago</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTipoPagoNombre" class="col-form-label">Nombre Tipo de Pago :</label>\
					  <input id="nMaestrasTipoPagoNombre" type="text" name="tipa_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de pago" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTipoPagoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTipoPago" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTipoPago" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-money"></i> Editar Tipo de Pago</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTipoPagoNombre" class="col-form-label">Nombre Tipo de Pago :</label>\
					  <input id="eMaestrasTipoPagoNombre" type="text" name="tipa_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de pago" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTipoPagoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTiposPago" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasTiposPago();
    eventFormMaestrasNuevoTipoPago();

}

function limpiarMaestrasEditarTipoPago() {
    $("#eMaestrasTipoPagoNombre").val('');
}

function llenarMaestrasEditarTipoPagoInfo(tipa_id) {
    limpiarMaestrasEditarTipoPago();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_tipo_pago&tipa_id=" + tipa_id,
        success: function (response) {
            $("#eMaestrasTipoPagoNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasTiposPago() {
    $("#tablaMaestrasTiposPago").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_pago",
        success: function (response) {
            $("#tablaMaestrasTiposPago").empty();
            var tabla = '<thead id="tablaMaestrasTiposPagoHead"></thead>\
                         <tbody id="tablaMaestrasTiposPagoBody"></tbody>';
            $("#tablaMaestrasTiposPago").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTiposPagoHead").append(head);
            $.each(response.listTiposPago, function (index, value) {
                var nombre;
                if (!$.trim(value.tipaNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tipaNombre;
                }
                var body = "";
                if (value.tipaId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTipoPagoEdit" + value.tipaId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTipoPago'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTipoPagoDelete" + value.tipaId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTiposPagoBody").append(body);

                $("#btnMaestrasTipoPagoEdit" + value.tipaId).click(function () {

                    var action = "./TablasMaestras?url=editar_tipo_pago&tipa_id=" + value.tipaId + "";
                    $("#formMaestrasEditarTipoPago").attr("action", action);
                    llenarMaestrasEditarTipoPagoInfo(value.tipaId);

                    $("#formMaestrasEditarTipoPago").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTipoPago();
                                    $('#modalMaestrasEditarTipoPago').modal('hide');
                                    llenarMaestrasTiposPago();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTipoPagoDelete" + value.tipaId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este tipo de pago?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_tipo_pago&tipa_id=" + value.tipaId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTiposPago();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTiposPago').dataTable().fnDestroy();

            $('#tablaMaestrasTiposPago').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'tipos_pago',
                        title: 'Lista de Tipos de Pago',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}