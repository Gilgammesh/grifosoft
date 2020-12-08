/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoBanco() {
    $("#nMaestrasBancoNombre").val('');
    $("#nMaestrasBancoSigla").val('');
}

function eventFormMaestrasNuevoBanco() {
    $("#formMaestrasNuevoBanco").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoBanco();
                    $('#modalMaestrasNuevoBanco').modal('hide');
                    llenarMaestrasBancos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_bancos() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">BANCOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoBanco" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoBanco">\
                                  <span class="fa fa-bank"></span> Nuevo Banco\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoBanco" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoBanco" method="post" action="./TablasMaestras?url=nuevo_banco">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-bank"></i> Nuevo Banco</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasBancoNombre" class="col-form-label">Nombre del Banco :</label>\
					  <input id="nMaestrasBancoNombre" type="text" name="banc_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de banco" required>\
					</div>\
					<div class="form-row">\
					  <label for="nMaestrasBancoSigla" class="col-form-label">Sigla del Banco :</label>\
					  <input id="nMaestrasBancoSigla" type="text" name="banc_sigla" class="form-control" \
                                            placeholder="Ingrese sigla del banco" >\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasBancoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarBanco" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarBanco" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-bank"></i> Editar Banco</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasBancoNombre" class="col-form-label">Nombre Banco :</label>\
					  <input id="eMaestrasBancoNombre" type="text" name="banc_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de banco" required>\
					</div>\
					<div class="form-row">\
					  <label for="eMaestrasBancoSigla" class="col-form-label">Sigla del Banco :</label>\
					  <input id="eMaestrasBancoSigla" type="text" name="banc_sigla" class="form-control" \
                                            placeholder="Ingrese sigla del banco" >\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasBancoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasBancos" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasBancos();
    eventFormMaestrasNuevoBanco();

}

function limpiarMaestrasEditarBanco() {
    $("#eMaestrasBancoNombre").val('');
    $("#eMaestrasBancoSigla").val('');
}

function llenarMaestrasEditarBancoInfo(banc_id) {
    limpiarMaestrasEditarBanco();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_banco&banc_id=" + banc_id,
        success: function (response) {
            $("#eMaestrasBancoNombre").val(response.nombre);
            $("#eMaestrasBancoSigla").val(response.sigla);
        }
    });
}

function llenarMaestrasBancos() {
    $("#tablaMaestrasBancos").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_bancos",
        success: function (response) {
            $("#tablaMaestrasBancos").empty();
            var tabla = '<thead id="tablaMaestrasBancosHead"></thead>\
                         <tbody id="tablaMaestrasBancosBody"></tbody>';
            $("#tablaMaestrasBancos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Sigla</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasBancosHead").append(head);
            $.each(response.listBancos, function (index, value) {
                var nombre, sigla;
                if (!$.trim(value.bancNombre)) {
                    nombre = "";
                } else {
                    nombre = value.bancNombre;
                }
                if (!$.trim(value.bancSigla)) {
                    sigla = "";
                } else {
                    sigla = value.bancSigla;
                }
                var body = "";
                if (value.bancId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + sigla + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + sigla + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasBancoEdit" + value.bancId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarBanco'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasBancoDelete" + value.bancId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasBancosBody").append(body);

                $("#btnMaestrasBancoEdit" + value.bancId).click(function () {

                    var action = "./TablasMaestras?url=editar_banco&banc_id=" + value.bancId + "";
                    $("#formMaestrasEditarBanco").attr("action", action);
                    llenarMaestrasEditarBancoInfo(value.bancId);

                    $("#formMaestrasEditarBanco").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarBanco();
                                    $('#modalMaestrasEditarBanco').modal('hide');
                                    llenarMaestrasBancos();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasBancoDelete" + value.bancId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este banco?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_banco&banc_id=" + value.bancId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasBancos();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasBancos').dataTable().fnDestroy();

            $('#tablaMaestrasBancos').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'bancos',
                        title: 'Lista de Bancos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}