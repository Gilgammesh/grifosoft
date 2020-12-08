/*
 ========================
 @author carlos santander
 ========================
 */

function llenarMaestrasBancosCuenta() {
    $("#nlistMaestrasBancos").empty();
    $("#elistMaestrasBancos").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_bancos",
        success: function (response) {
            $.each(response.listBancos, function (index, value) {
                var nombre;
                if (!$.trim(value.bancSigla)) {
                    nombre = value.bancNombre;
                } else {
                    nombre = value.bancNombre + " (" + value.bancSigla + ")";
                }
                var banc = "<option value=" + value.bancId + ">" + nombre + "</option>";
                $("#nlistMaestrasBancos").append(banc);
                $("#elistMaestrasBancos").append(banc);
            });
            document.getElementById("nlistMaestrasBancos").value = 0;
            document.getElementById("elistMaestrasBancos").value = 0;
        }
    });
}

function sub_menu_cuentas_banco() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">CUENTAS BANCARIAS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevaCuentaBanco" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevaCuentaBanco">\
                                  <span class="fa fa-btc"></span> Nueva Cuenta Bancaria\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevaCuentaBanco" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevaCuentaBanco" method="post" action="./TablasMaestras?url=nueva_cuenta_banco">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-btc"></i> Nueva Cuenta Bancaria</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasCuentaBancoNumero" class="col-form-label">Número de Cuenta Bancaria :</label>\
					  <input id="nMaestrasCuentaBancoNumero" type="text" name="cuba_cuenta" class="form-control" \
                                            placeholder="Ingrese número de cuenta bancaria" required>\
					</div>\
					<div class="form-group">\
					  <label for="nMaestrasCuentaBancoDescripcion" class="col-form-label">Descripción de Cuenta Bancaria :</label>\
					  <textarea rows="3" id="nMaestrasCuentaBancoDescripcion" name="cuba_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de cuenta bancaria" form="formMaestrasNuevaCuentaBanco" />\
					</div>\
					<div class="form-group">\
                                          <label for="nlistMaestrasBancos" class="col-form-label">Banco :</label>\
                                          <select id="nlistMaestrasBancos" class="form-select" name="banc_id"></select>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasCuentaBancoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarCuentaBanco" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarCuentaBanco" method="post" >\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-btc"></i> Editar Cuenta Bancaria</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasCuentaBancoNumero" class="col-form-label">Número de Cuenta Bancaria :</label>\
					  <input id="eMaestrasCuentaBancoNumero" type="text" name="cuba_cuenta" class="form-control" \
                                            placeholder="Ingrese número de cuenta bancaria" required>\
					</div>\
					<div class="form-group">\
					  <label for="eMaestrasCuentaBancoDescripcion" class="col-form-label">Descripción de Cuenta Bancaria :</label>\
					  <textarea rows="3" id="eMaestrasCuentaBancoDescripcion" name="cuba_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de cuenta bancaria" form="formMaestrasEditarCuentaBanco" />\
					</div>\
					<div class="form-group">\
                                          <label for="elistMaestrasBancos" class="col-form-label">Banco :</label>\
                                          <select id="elistMaestrasBancos" class="form-select" name="banc_id"></select>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasCuentaBancoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasCuentasBanco" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasBancosCuenta();
    llenarMaestrasCuentasBanco();
    eventFormMaestrasNuevaCuentaBanco();

}

function limpiarMaestrasNuevaCuentaBanco() {
    $("#nMaestrasCuentaBancoNumero").val('');
    $("#nMaestrasCuentaBancoDescripcion").val('');
    llenarMaestrasCuentasBanco();
}

function eventFormMaestrasNuevaCuentaBanco() {
    $("#formMaestrasNuevaCuentaBanco").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevaCuentaBanco();
                    $('#modalMaestrasNuevaCuentaBanco').modal('hide');
                    llenarMaestrasCuentasBanco();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function limpiarMaestrasEditarCuentaBanco() {
    $("#eMaestrasCuentaBancoNumero").val('');
    $("#eMaestrasCuentaBancoDescripcion").val('');
    llenarMaestrasCuentasBanco();
}

function llenarMaestrasEditarCuentaBancoInfo(cuba_id) {
    limpiarMaestrasEditarCuentaBanco();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_cuenta_banco&cuba_id=" + cuba_id,
        success: function (response) {
            $("#eMaestrasCuentaBancoNumero").val(response.cuenta);
            $("#eMaestrasCuentaBancoDescripcion").val(response.descripcion);
            document.getElementById("elistMaestrasBancos").value = response.banco;
        }
    });
}

function llenarMaestrasCuentasBanco() {
    $("#tablaMaestrasCuentasBanco").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_cuentas_banco",
        success: function (response) {
            $("#tablaMaestrasCuentasBanco").empty();
            var tabla = '<thead id="tablaMaestrasCuentasBancoHead"></thead>\
                         <tbody id="tablaMaestrasCuentasBancoBody"></tbody>';
            $("#tablaMaestrasCuentasBanco").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Número de Cuenta</th>\
                          <th style='text-align: center;'>Descripción de la Cuenta</th>\
                          <th style='text-align: center;'>Bancoo</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasCuentasBancoHead").append(head);
            $.each(response.listCuentasBanco, function (index, value) {
                var cuenta, descripcion, banco;
                if (!$.trim(value.cubaCuenta)) {
                    cuenta = "";
                } else {
                    cuenta = value.cubaCuenta;
                }
                if (!$.trim(value.cubaDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.cubaDescripcion;
                }
                if (!$.trim(value.bancSigla)) {
                    banco = value.bancNombre;
                } else {
                    banco = value.bancNombre + " (" + value.bancSigla + ")";
                }
                var body = "";
                if (value.cubaId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + cuenta + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + banco + "</td>\
                                <td align='center'></td>\
                            </tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + cuenta + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + banco + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasCuentaBancoEdit" + value.cubaId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarCuentaBanco'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasCuentaBancoDelete" + value.cubaId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasCuentasBancoBody").append(body);

                $("#btnMaestrasCuentaBancoEdit" + value.cubaId).click(function () {

                    var action = "./TablasMaestras?url=editar_cuenta_banco&cuba_id=" + value.cubaId + "";
                    $("#formMaestrasEditarCuentaBanco").attr("action", action);
                    llenarMaestrasEditarCuentaBancoInfo(value.cubaId);

                    $("#formMaestrasEditarCuentaBanco").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarCuentaBanco();
                                    $('#modalMaestrasEditarCuentaBanco').modal('hide');
                                    llenarMaestrasCuentasBanco();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasCuentaBancoDelete" + value.cubaId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta cuenta bancaria?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_cuenta_banco&cuba_id=" + value.cubaId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasCuentasBanco();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasCuentasBanco').dataTable().fnDestroy();

            $('#tablaMaestrasCuentasBanco').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'cuentas_bancarias',
                        title: 'Lista de Cuentas Bancarias',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}