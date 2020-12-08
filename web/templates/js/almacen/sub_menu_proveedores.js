/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarAlmacenNuevoProveedor() {
    $("#iptAlmacenNProveeDocu").val('');
    $("#iptAlmacenNProveeNombre").val('');
    $("#iptAlmacenNProveeDirec").val('');
    $("#iptAlmacenNProveeContacto").val('');
    $("#iptAlmacenNProveeTelefonos").val('');
    $("#iptAlmacenNProveeCorreo").val('');
}

function sub_menu_proveedores() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">PROVEEDORES</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnAlmacenNuevoProveedor" class="btn btn-primary" data-toggle="modal" data-target="#modalAlmacenNuevoProveedor">\
                                  <span class="fa fa-building"></span>&nbsp;&nbsp;Nuevo Proveedor\
                                </button>\
                              </div>\
                              <div id="modalAlmacenNuevoProveedor" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formAlmacenNuevoProveedor" method="post" action="./Almacen?url=nuevo_proveedor">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-building"></i> Nuevo Proveedor</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="iptAlmacenNProveeDocu" class="col-form-label">RUC :</label>\
					     <input id="iptAlmacenNProveeDocu" type="text" name="prov_documento" class="form-control" \
                                             placeholder="Ingrese RUC de Proveedor" maxlength="11" onkeypress="return soloNumero(event)" required >\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label class="col-form-label">&nbsp;</label>\
                                            <div>\
                                              <button id="btnAlmacenNBuscarDocu" type="button" class="btn btn-secondary" >\
                                                <span class="fa fa-search"></span>&nbsp;Buscar\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenNProveeNombre" class="col-form-label">Razón Social :</label>\
                                          <input id="iptAlmacenNProveeNombre" type="text" name="prov_nombres" class="form-control" \
                                          placeholder="Ingrese Razón Social de Proveedor" required >\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenNProveeDirec" class="col-form-label">Dirección :</label>\
                                          <input id="iptAlmacenNProveeDirec" type="text" name="prov_direccion" class="form-control" \
                                          placeholder="Ingrese Dirección de Proveedor" required >\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenNProveeContacto" class="col-form-label">Persona de Contacto :</label>\
                                          <input id="iptAlmacenNProveeContacto" type="text" name="prov_contacto" class="form-control" \
                                          placeholder="Ingrese nombres de persona de contacto" >\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenNProveeTelefonos" class="col-form-label">Teléfonos :</label>\
					    <input id="iptAlmacenNProveeTelefonos" type="text" name="prov_telefonos" class="form-control" \
                                            placeholder="Ingrese teléfonos de contacto" >\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenNProveeCorreo" class="col-form-label">Correo Electrónico :</label>\
					    <input id="iptAlmacenNProveeCorreo" type="email" name="prov_correo" class="form-control" \
                                            placeholder="Ingrese correo electrónico de contacto" >\
					  </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAlmacenNuevoProvSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalAlmacenEditProveedor" class="modal fade"></div>\
                              <div id="modalAlmacenProveedorPlantas" class="modal fade"></div>\
                              <div class="table-responsive">\
                                <table id="tablaAlmacenProveedores" class="table table-hover display" style="width: 100%;"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    limpiarAlmacenNuevoProveedor();

    $('#btnAlmacenNuevoProveedor').click(function (evt) {
        evt.preventDefault();
        limpiarAlmacenNuevoProveedor();
    });

    buscarAlmacenNProveeDocu();
    llenarAlmacenListaProveedores();
    eventFormAlmacenNuevoProveedor();

}

function buscarAlmacenNProveeDocu() {
    $('#btnAlmacenNBuscarDocu').click(function (evt) {
        evt.preventDefault();
        var str1 = "./Ventas?url=buscar_registro_venta_cliente";
        var str2 = "&ticl_id=2";
        var str3 = "&tido_id=1";
        var str4 = "&clie_documento=" + $("#iptAlmacenNProveeDocu").val();
        var url = str1.concat(str2, str3, str4);
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (responseB) {
                if (responseB.success) {
                    $("#iptAlmacenNProveeNombre").val(responseB.clie_nombres);
                    $("#iptAlmacenNProveeDirec").val(responseB.clie_direccion);
                } else {
                    alertify.error(responseB.msg);
                }
            }
        });
    });
}

function eventFormAlmacenNuevoProveedor() {
    $("#btnAlmacenNuevoProvSave").one("click", function () {
        $("#formAlmacenNuevoProveedor").submit(function (evt) {
            evt.preventDefault();
            $.ajax({
                dataType: 'json',
                type: 'post',
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (response) {
                    if (response.success) {
                        alertify.success(response.msg);
                        limpiarAlmacenNuevoProveedor();
                        $('#modalAlmacenNuevoProveedor').modal('hide');
                        llenarAlmacenListaProveedores();
                    } else {
                        alertify.error(response.msg);
                    }
                }
            });
        });
    });
}

function llenarAlmacenListaProveedores() {
    $("#tablaAlmacenProveedores").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=lista_proveedores",
        success: function (response) {
            $("#tablaAlmacenProveedores").empty();
            var tabla = '<thead id="tablaAlmacenProveedoresHead"></thead>\
                         <tbody id="tablaAlmacenProveedoresBody"></tbody>';
            $("#tablaAlmacenProveedores").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombres</th>\
                          <th style='text-align: center;'>RUC</th>\
                          <th style='text-align: center;'>Dirección</th>\
                          <th style='text-align: center;' class='hide'>Contacto</th>\
                          <th style='text-align: center;' class='hide'>Teléfonos</th>\
                          <th style='text-align: center;' class='hide'>Correo</th>\
                          <th style='text-align: center;' class='notexport'>Acciones</th>\
                        </tr>";
            $("#tablaAlmacenProveedoresHead").append(head);

            $.each(response.listProveedores, function (index, value) {

                var contacto, telefonos, correo;
                if (!$.trim(value.provContacto)) {
                    contacto = "";
                } else {
                    contacto = value.provContacto;
                }
                if (!$.trim(value.provTelefonos)) {
                    telefonos = "";
                } else {
                    telefonos = value.provTelefonos;
                }
                if (!$.trim(value.provCorreo)) {
                    correo = "";
                } else {
                    correo = value.provCorreo;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='left'>" + value.provNombres + "</td>\
                              <td align='center'>" + value.provDocumento + "</td>\
                              <td align='left'>" + value.provDireccion + "</td>\
                              <td align='left' class='hide'>" + contacto + "</td>\
                              <td align='left' class='hide'>" + telefonos + "</td>\
                              <td align='left' class='hide'>" + correo + "</td>\
                              <td align='center'>\
                                <button id='btnAlmacenEditProve" + value.provId + "' class='btn btn-light btn-sm'\
                                  title='Editar' data-toggle='modal' data-target='#modalAlmacenEditProveedor'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                                <button id='btnAlmacenPlantasProve" + value.provId + "' class='btn btn-primary btn-sm'\
                                  title='Añadir Plantas' data-toggle='modal' data-target='#modalAlmacenProveedorPlantas'>\
                                  <i class='fa fa-map-marker'></i>\
                                </button>\
                                <button id='btnAlmacenDeleteProve" + value.provId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenProveedoresBody").append(body);

                $("#btnAlmacenEditProve" + value.provId).click(function () {

                    llenarAlmacenInfoProveedor(value.provId);

                });

                $("#btnAlmacenPlantasProve" + value.provId).click(function () {

                    llenarAlmacenInfoProveedorPlantas(value.provId);

                });

                $("#btnAlmacenDeleteProve" + value.provId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este Proveedor?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Almacen?url=delete_proveedor&prov_id=" + value.provId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarAlmacenListaProveedores();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaAlmacenProveedores').dataTable().fnDestroy();

            $('#tablaAlmacenProveedores').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_proveedores',
                        title: 'Lista de Proveedores',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function buscarAlmacenEProveeDocu() {
    $('#btnAlmacenEBuscarDocu').click(function (evt) {
        evt.preventDefault();
        var str1 = "./Ventas?url=buscar_registro_venta_cliente";
        var str2 = "&ticl_id=2";
        var str3 = "&tido_id=1";
        var str4 = "&clie_documento=" + $("#iptAlmacenEProveeDocu").val();
        var url = str1.concat(str2, str3, str4);
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (responseB) {
                if (responseB.success) {
                    $("#iptAlmacenEProveeNombre").val(responseB.clie_nombres);
                    $("#iptAlmacenEProveeDirec").val(responseB.clie_direccion);
                } else {
                    alertify.error(responseB.msg);
                }
            }
        });
    });
}

function llenarAlmacenInfoProveedor(provId) {
    $("#modalAlmacenEditProveedor").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formAlmacenEditProveedor" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-building-o"></i> Editar Proveedor</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="iptAlmacenEProveeDocu" class="col-form-label">RUC :</label>\
					     <input id="iptAlmacenEProveeDocu" type="text" name="prov_documento" class="form-control" \
                                             placeholder="Ingrese RUC de Proveedor" maxlength="11" onkeypress="return soloNumero(event)" required >\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label class="col-form-label">&nbsp;</label>\
                                            <div>\
                                              <button id="btnAlmacenEBuscarDocu" type="button" class="btn btn-secondary" >\
                                                <span class="fa fa-search"></span>&nbsp;Buscar\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenEProveeNombre" class="col-form-label">Razón Social :</label>\
                                          <input id="iptAlmacenEProveeNombre" type="text" name="prov_nombres" class="form-control" \
                                          placeholder="Ingrese Razón Social de Proveedor" required >\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenEProveeDirec" class="col-form-label">Dirección :</label>\
                                          <input id="iptAlmacenEProveeDirec" type="text" name="prov_direccion" class="form-control" \
                                          placeholder="Ingrese Dirección de Proveedor" required >\
					</div>\
					<div class="form-group">\
					  <label for="iptAlmacenEProveeContacto" class="col-form-label">Persona de Contacto :</label>\
                                          <input id="iptAlmacenEProveeContacto" type="text" name="prov_contacto" class="form-control" \
                                          placeholder="Ingrese nombres de persona de contacto" >\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenEProveeTelefonos" class="col-form-label">Teléfonos :</label>\
					    <input id="iptAlmacenEProveeTelefonos" type="text" name="prov_telefonos" class="form-control" \
                                            placeholder="Ingrese teléfonos de contacto" >\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenEProveeCorreo" class="col-form-label">Correo Electrónico :</label>\
					    <input id="iptAlmacenEProveeCorreo" type="email" name="prov_correo" class="form-control" \
                                            placeholder="Ingrese correo electrónico de contacto" >\
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
                               </div>';
    $("#modalAlmacenEditProveedor").append(modal);
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=info_proveedor&prov_id=" + provId,
        success: function (response) {
            var action = "./Almacen?url=editar_proveedor&prov_id=" + response.provId + "";
            $("#formAlmacenEditProveedor").attr("action", action);
            var contacto, telefonos, correo;
            if (!$.trim(response.contacto)) {
                contacto = "";
            } else {
                contacto = response.contacto;
            }
            if (!$.trim(response.telefonos)) {
                telefonos = "";
            } else {
                telefonos = response.telefonos;
            }
            if (!$.trim(response.correo)) {
                correo = "";
            } else {
                correo = response.correo;
            }
            $("#iptAlmacenEProveeDocu").val(response.documento);
            $("#iptAlmacenEProveeNombre").val(response.nombres);
            $("#iptAlmacenEProveeDirec").val(response.direccion);
            $("#iptAlmacenEProveeContacto").val(contacto);
            $("#iptAlmacenEProveeTelefonos").val(telefonos);
            $("#iptAlmacenEProveeCorreo").val(correo);
            buscarAlmacenEProveeDocu();
            eventFormAlmacenEditarProveedor();
        }
    });
}

function eventFormAlmacenEditarProveedor() {
    $("#formAlmacenEditProveedor").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalAlmacenEditProveedor').modal('hide');
                    llenarAlmacenListaProveedores();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function limpiarAlmacenInfoProveedorPlantas() {
    $("#iptAlmacenPProveePlantaNombre").val('');
    $("#iptAlmacenPProveePlantaDirec").val('');
    $("#iptAlmacenPProveePlantaTelefonos").val('');
    $("#iptAlmacenPProveePlantaCorreo").val('');
}

function llenarAlmacenInfoProveedorPlantas(provId) {
    $("#modalAlmacenProveedorPlantas").empty();
    var modal = '<div class="modal-dialog modal-full">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-map-marker"></i> Agregar Plantas de Proveedor</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                    <form id="formAlmacenProveedorPlantas" method="post">\
                                      <div class="modal-body">\
					<div class="form-row">\
					  <div class="form-group col-md-3">\
					    <label for="iptAlmacenPProveeDoc" class="col-form-label">Proveedor RUC :</label>\
					    <input id="iptAlmacenPProveeDoc" type="text" class="form-control" disabled>\
					  </div>\
					  <div class="form-group col-md-9">\
					    <label for="iptAlmacenPProveeNombres" class="col-form-label">Proveedor Razón Social :</label>\
					    <input id="iptAlmacenPProveeNombres" type="text" class="form-control" disabled>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-4">\
					    <label for="iptAlmacenPProveePlantaNombre" class="col-form-label">Nombre :</label>\
					    <input id="iptAlmacenPProveePlantaNombre" type="text" name="prpl_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de la planta" required >\
					  </div>\
					  <div class="form-group col-md-8">\
					    <label for="iptAlmacenPProveePlantaDirec" class="col-form-label">Dirección :</label>\
					    <input id="iptAlmacenPProveePlantaDirec" type="text" name="prpl_direccion" class="form-control" \
                                            placeholder="Ingrese dirección de la planta" required >\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenPProveePlantaTelefonos" class="col-form-label">Teléfonos :</label>\
					    <input id="iptAlmacenPProveePlantaTelefonos" type="text" name="prpl_telefonos" class="form-control" \
                                            placeholder="Ingrese teléfonos de la planta" >\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="iptAlmacenPProveePlantaCorreo" class="col-form-label">Correo Electrónico :</label>\
					    <input id="iptAlmacenPProveePlantaCorreo" type="email" name="prpl_correo" class="form-control" \
                                            placeholder="Ingrese correo electrónico de la planta" >\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-4">\
                                            <button type="submit" class="btn btn-success">\
                                              <i class="fa fa-plus"></i> Añadir\
                                            </button>\
					  </div>\
					</div>\
                                      </div>\
				    </form>\
                                      <div class="modal-footer">\
                                        <div class="table-responsive">\
                                          <table id="tablaAlmacenProveedoresPlantas" class="table table-hover display" style="width: 100%;"></table>\
                                        </div>\
                                      </div>\
                                    </div>\
                               </div>';
    $("#modalAlmacenProveedorPlantas").append(modal);
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=info_proveedor_planta&prov_id=" + provId,
        success: function (response) {
            var action = "./Almacen?url=nuevo_proveedor_planta&prov_id=" + response.provId + "";
            $("#formAlmacenProveedorPlantas").attr("action", action);
            var documento, nombres;
            if (!$.trim(response.documento)) {
                documento = "";
            } else {
                documento = response.documento;
            }
            if (!$.trim(response.nombres)) {
                nombres = "";
            } else {
                nombres = response.nombres;
            }
            $("#iptAlmacenPProveeDoc").val(documento);
            $("#iptAlmacenPProveeNombres").val(nombres);
            llenarAlmacenListaProveedorPlantas(response.provId);
            eventFormAlmacenAddProveedorPlanta();
        }
    });
}

function eventFormAlmacenAddProveedorPlanta() {
    $("#formAlmacenProveedorPlantas").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarAlmacenInfoProveedorPlantas();
                    llenarAlmacenListaProveedorPlantas(response.provId);
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarAlmacenListaProveedorPlantas(provId) {
    $("#tablaAlmacenProveedoresPlantas").empty();
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=lista_proveedores_plantas&prov_id=" + provId,
        success: function (response) {
            $("#tablaAlmacenProveedoresPlantas").empty();
            var tabla = '<thead id="tablaAlmacenProveedoresPlantasHead"></thead>\
                         <tbody id="tablaAlmacenProveedoresPlantasBody"></tbody>';
            $("#tablaAlmacenProveedoresPlantas").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Dirección</th>\
                          <th style='text-align: center;'>Teléfonos</th>\
                          <th style='text-align: center;'>Correo</th>\
                          <th style='text-align: center;' class='notexport'>Accion</th>\
                        </tr>";
            $("#tablaAlmacenProveedoresPlantasHead").append(head);

            $.each(response.listPlantas, function (index, value) {
                var nombre, direccion, telefonos, correo;
                if (!$.trim(value.prplNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prplNombre;
                }
                if (!$.trim(value.prplDireccion)) {
                    direccion = "";
                } else {
                    direccion = value.prplDireccion;
                }
                if (!$.trim(value.prplTelefonos)) {
                    telefonos = "";
                } else {
                    telefonos = value.prplTelefonos;
                }
                if (!$.trim(value.prplCorreo)) {
                    correo = "";
                } else {
                    correo = value.prplCorreo;
                }
                var body = "<tr>\
                              <td align='center'>" + (index + 1) + "</td>\
                              <td align='left'>" + nombre + "</td>\
                              <td align='left'>" + direccion + "</td>\
                              <td align='left'>" + telefonos + "</td>\
                              <td align='left'>" + correo + "</td>\
                              <td align='center'>\
                                <button id='btnAlmacenDeleteProvePlanta" + value.prplId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                              </td>\
                            </tr>";
                $("#tablaAlmacenProveedoresPlantasBody").append(body);

                $("#btnAlmacenDeleteProvePlanta" + value.prplId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta Planta?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Almacen?url=delete_proveedor_planta&prpl_id=" + value.prplId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    limpiarAlmacenInfoProveedorPlantas();
                                    llenarAlmacenListaProveedorPlantas(provId);
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaAlmacenProveedoresPlantas').dataTable().fnDestroy();

            $('#tablaAlmacenProveedoresPlantas').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_plantas_proveedor_' + response.documento,
                        title: 'Lista de Plantas de Proveedor',
                        messageTop: 'Razón Social : ' + response.nombres + " | RUC : " + response.documento,
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}