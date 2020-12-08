/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTrabajador() {
    $("#nMaestrasTrabajadorNombres").val('');
    $("#nMaestrasTrabajadorApellidoPaterno").val('');
    $("#nMaestrasTrabajadorApellidoMaterno").val('');
    $("#nMaestrasTrabajadorDni").val('');
    $("#nMaestrasTrabajadorCelular").val('');
    $("#nMaestrasTrabajadorDireccion").val('');
}

function eventFormMaestrasNuevoTrabajador() {
    $("#formMaestrasNuevoTrabajador").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTrabajador();
                    $('#modalMaestrasNuevoTrabajador').modal('hide');
                    llenarMaestrasTrabajadores();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_trabajadores() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TRABAJADORES</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTrabajador" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTrabajador">\
                                  <span class="fa fa-users"></span> Nuevo Trabajador\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTrabajador" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTrabajador" method="post" action="./TablasMaestras?url=nuevo_trabajador">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-users"></i> Nuevo Trabajador</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTrabajadorNombres" class="col-form-label">Nombres :</label>\
					  <input id="nMaestrasTrabajadorNombres" type="text" name="trab_nombres" class="form-control" \
                                            placeholder="Ingrese nombres completos" required>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="nMaestrasTrabajadorApellidoPaterno" class="col-form-label">Apellido Paterno :</label>\
					     <input id="nMaestrasTrabajadorApellidoPaterno" type="text" name="trab_apellido_paterno" class="form-control" \
                                               placeholder="Ingrese Apellido Paterno" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nMaestrasTrabajadorApellidoMaterno" class="col-form-label">Apellido Materno :</label>\
					     <input id="nMaestrasTrabajadorApellidoMaterno" type="text" name="trab_apellido_materno" class="form-control" \
                                               placeholder="Ingrese Apellido Materno" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="nMaestrasTrabajadorDni" class="col-form-label">DNI :</label>\
					     <input id="nMaestrasTrabajadorDni" type="text" name="trab_dni" class="form-control" maxlength="8" \
                                               placeholder="Ingrese número de dni" onkeypress="return soloNumero(event)" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nMaestrasTrabajadorCelular" class="col-form-label">Celular :</label>\
					     <input id="nMaestrasTrabajadorCelular" type="text" name="trab_celular" class="form-control" maxlength="9" \
                                               placeholder="Ingrese número de celular" onkeypress="return soloNumero(event)" />\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label for="nMaestrasTrabajadorDireccion" class="col-form-label">Dirección :</label>\
					  <input id="nMaestrasTrabajadorDireccion" type="text" name="trab_direccion" class="form-control" \
                                            placeholder="Ingrese dirección de domicilio" >\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTrabajadorSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTrabajador" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTrabajador" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-users"></i> Editar Trabajador</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTrabajadorNombres" class="col-form-label">Nombres :</label>\
					  <input id="eMaestrasTrabajadorNombres" type="text" name="trab_nombres" class="form-control" \
                                            placeholder="Ingrese nombres completos" required>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="eMaestrasTrabajadorApellidoPaterno" class="col-form-label">Apellido Paterno :</label>\
					     <input id="eMaestrasTrabajadorApellidoPaterno" type="text" name="trab_apellido_paterno" class="form-control" \
                                               placeholder="Ingrese Apellido Paterno" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="eMaestrasTrabajadorApellidoMaterno" class="col-form-label">Apellido Materno :</label>\
					     <input id="eMaestrasTrabajadorApellidoMaterno" type="text" name="trab_apellido_materno" class="form-control" \
                                               placeholder="Ingrese Apellido Materno" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="eMaestrasTrabajadorDni" class="col-form-label">DNI :</label>\
					     <input id="eMaestrasTrabajadorDni" type="text" name="trab_dni" class="form-control" maxlength="8" \
                                               placeholder="Ingrese número de dni" onkeypress="return soloNumero(event)" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="eMaestrasTrabajadorCelular" class="col-form-label">Celular :</label>\
					     <input id="eMaestrasTrabajadorCelular" type="text" name="trab_celular" class="form-control" maxlength="9" \
                                               placeholder="Ingrese número de celular" onkeypress="return soloNumero(event)" />\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label for="eMaestrasTrabajadorDireccion" class="col-form-label">Dirección :</label>\
					  <input id="eMaestrasTrabajadorDireccion" type="text" name="trab_direccion" class="form-control" \
                                            placeholder="Ingrese dirección de domicilio" >\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTrabajadorSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTrabajadores" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasTrabajadores();
    eventFormMaestrasNuevoTrabajador();

}

function limpiarMaestrasEditarTrabajador() {
    $("#eMaestrasTrabajadorNombres").val('');
    $("#eMaestrasTrabajadorApellidoPaterno").val('');
    $("#eMaestrasTrabajadorApellidoMaterno").val('');
    $("#eMaestrasTrabajadorDni").val('');
    $("#eMaestrasTrabajadorCelular").val('');
    $("#eMaestrasTrabajadorDireccion").val('');
}

function llenarMaestrasEditarTrabajadorInfo(trab_id) {
    limpiarMaestrasEditarTrabajador();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_trabajador&trab_id=" + trab_id,
        success: function (response) {
            $("#eMaestrasTrabajadorNombres").val(response.nombres);
            $("#eMaestrasTrabajadorApellidoPaterno").val(response.paterno);
            $("#eMaestrasTrabajadorApellidoMaterno").val(response.materno);
            $("#eMaestrasTrabajadorDni").val(response.dni);
            $("#eMaestrasTrabajadorCelular").val(response.celular);
            $("#eMaestrasTrabajadorDireccion").val(response.direccion);
        }
    });
}

function llenarMaestrasTrabajadores() {
    $("#tablaMaestrasTrabajadores").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_trabajadores",
        success: function (response) {
            $("#tablaMaestrasTrabajadores").empty();
            var tabla = '<thead id="tablaMaestrasTrabajadoresHead"></thead>\
                         <tbody id="tablaMaestrasTrabajadoresBody"></tbody>';
            $("#tablaMaestrasTrabajadores").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombres</th>\
                          <th style='text-align: center;'>Apellido Paterno</th>\
                          <th style='text-align: center;'>Apellido Materno</th>\
                          <th style='text-align: center;'>DNI</th>\
                          <th style='text-align: center;'>Celular</th>\
                          <th style='text-align: center;'>Dirección</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTrabajadoresHead").append(head);
            $.each(response.listTrabajadores, function (index, value) {
                var nombres, paterno, materno, dni, celular, direccion;
                if (!$.trim(value.trabNombres)) {
                    nombres = "";
                } else {
                    nombres = value.trabNombres;
                }
                if (!$.trim(value.trabApellidoPaterno)) {
                    paterno = "";
                } else {
                    paterno = value.trabApellidoPaterno;
                }
                if (!$.trim(value.trabApellidoMaterno)) {
                    materno = "";
                } else {
                    materno = value.trabApellidoMaterno;
                }
                if (!$.trim(value.trabDni)) {
                    dni = "";
                } else {
                    dni = value.trabDni;
                }
                if (!$.trim(value.trabCelular)) {
                    celular = "";
                } else {
                    celular = value.trabCelular;
                }
                if (!$.trim(value.trabDireccion)) {
                    direccion = "";
                } else {
                    direccion = value.trabDireccion;
                }
                var body = "";
                if (value.trabId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombres + "</td>\
                                <td align='left'>" + paterno + "</td>\
                                <td align='left'>" + materno + "</td>\
                                <td align='center'>" + dni + "</td>\
                                <td align='center'>" + celular + "</td>\
                                <td align='left'>" + direccion + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombres + "</td>\
                                <td align='left'>" + paterno + "</td>\
                                <td align='left'>" + materno + "</td>\
                                <td align='center'>" + dni + "</td>\
                                <td align='center'>" + celular + "</td>\
                                <td align='left'>" + direccion + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTrabajadorEdit" + value.trabId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTrabajador'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTrabajadorDelete" + value.trabId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTrabajadoresBody").append(body);

                $("#btnMaestrasTrabajadorEdit" + value.trabId).click(function () {

                    var action = "./TablasMaestras?url=editar_trabajador&trab_id=" + value.trabId + "";
                    $("#formMaestrasEditarTrabajador").attr("action", action);
                    llenarMaestrasEditarTrabajadorInfo(value.trabId);

                    $("#formMaestrasEditarTrabajador").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTrabajador();
                                    $('#modalMaestrasEditarTrabajador').modal('hide');
                                    llenarMaestrasTrabajadores();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTrabajadorDelete" + value.trabId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este trabajador?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_trabajador&trab_id=" + value.trabId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTrabajadores();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTrabajadores').dataTable().fnDestroy();

            $('#tablaMaestrasTrabajadores').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'trabajadores',
                        title: 'Lista de Trabajadores',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

