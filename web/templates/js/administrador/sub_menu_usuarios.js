/*
 ========================
 @author carlos santander
 ========================
 */

function llenarAdminListPerfiles() {
    $("#nlistPerfil").empty();
    $("#elistPerfil").empty();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=perfiles",
        success: function (response) {
            $.each(response.listPerfiles, function (index, value) {
                var perf = "<option value=" + value.perfId + ">" + value.perfNombre + "</option>";
                $("#nlistPerfil").append(perf);
                $("#elistPerfil").append(perf);
            });
            //document.getElementById("nlistPerfil").value = 2;
        }
    });
}

function sub_menu_usuarios() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">GESTIÓN DE USUARIOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnAdminNuevoUsuario" class="btn btn-primary" data-toggle="modal" data-target="#modalNuevoUsua">\
                                  <span class="fa fa-user-o"></span> Nuevo Usuario\
                                </button>\
                              </div>\
                              <div id="modalNuevoUsua" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formNuevoUsua" method="post" action="./Usuario?url=nuevo">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-user"></i> Nuevo Usuario</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nNombres" class="col-form-label">Nombres :</label>\
					  <input id="nNombres" type="text" name="nombres" class="form-control" \
                                            placeholder="Ingrese nombres completos" required>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="nPaterno" class="col-form-label">Apellido Paterno :</label>\
					     <input id="nPaterno" type="text" name="paterno" class="form-control" \
                                               placeholder="Ingrese Apellido Paterno" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nMaterno" class="col-form-label">Apellido Materno :</label>\
					     <input id="nMaterno" type="text" name="materno" class="form-control" \
                                               placeholder="Ingrese Apellido Materno" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="nUsuario" class="col-form-label">Usuario de Ingreso :</label>\
                                             <input id="nUsuario" type="text" name="usuario" class="form-control" maxlength="30" \
                                               placeholder="INGRESE USUARIO DE INGRESO" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nPassword" class="col-form-label">Contraseña :</label>\
                                             <input id="nPassword" type="password" name="password" class="form-control" \
                                               placeholder="INGRESE CONTRASEÑA" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="nlistSexo" class="col-form-label">Género :</label>\
                                             <select id="nlistSexo" class="form-select" name="genero">\
                                                <option value="M">MASCULINO</option>\
                                                <option value="F">FEMENINO</option>\
                                             </select>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nlistPerfil" class="col-form-label">Perfil :</label>\
                                             <select id="nlistPerfil" class="form-select" name="perf_id"></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <input type="checkbox" id="nEstado" value="true" name="estado" class="filled-in chk-col-danger" checked>\
					  <label for="nEstado">Activo</label>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAdmNewUsuaSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalEditUsua" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formEditUsua" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-user-circle"></i> Editar Usuario</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eNombres" class="col-form-label">Nombres :</label>\
					  <input id="eNombres" type="text" name="nombres" class="form-control" \
                                            placeholder="Ingrese nombres completos" required>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="ePaterno" class="col-form-label">Apellido Paterno :</label>\
					     <input id="ePaterno" type="text" name="paterno" class="form-control" \
                                               placeholder="Ingrese Apellido Paterno" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="eMaterno" class="col-form-label">Apellido Materno :</label>\
					     <input id="eMaterno" type="text" name="materno" class="form-control" \
                                               placeholder="Ingrese Apellido Materno" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="eUsuario" class="col-form-label">Usuario de Ingreso :</label>\
                                             <input id="eUsuario" type="text" name="usuario" class="form-control" maxlength="30" \
                                               placeholder="USUARIO DE INGRESO" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="ePassword" class="col-form-label">Contraseña :</label>\
                                             <input id="ePassword" type="password" name="password" class="form-control" \
                                               placeholder="INGRESE CONTRASEÑA" required/>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="elistSexo" class="col-form-label">Género :</label>\
                                             <select id="elistSexo" class="form-select" name="genero">\
                                                <option value="M">MASCULINO</option>\
                                                <option value="F">FEMENINO</option>\
                                             </select>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="elistPerfil" class="col-form-label">Perfil :</label>\
                                             <select id="elistPerfil" class="form-select" name="perf_id"></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <input type="checkbox" id="eEstado" value="true" name="estado" class="filled-in chk-col-danger" checked>\
					  <label for="eEstado">Activo</label>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAdmEditUsuaSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaAdminUsuarios" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarAdminListPerfiles();
    llenarAdminUsuarios();
    eventFormNuevoUsua();

}

function eventFormNuevoUsua() {
    $("#btnAdmNewUsuaSave").one("click", function () {
        $("#formNuevoUsua").submit(function (evt) {
            evt.preventDefault();
            $.ajax({
                dataType: 'json',
                type: 'post',
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (response) {
                    if (response.success) {
                        alertify.success(response.msg);
                        limpiarAdminNuevoUsuario();
                        $('#modalNuevoUsua').modal('hide');
                        llenarAdminUsuarios();
                    } else {
                        alertify.error(response.msg);
                    }
                }
            });
        });
    });
}

function limpiarAdminNuevoUsuario() {
    $("#nNombres").val('');
    $("#nPaterno").val('');
    $("#nMaterno").val('');
    $("#nUsuario").val('');
    $("#nPassword").val('');
    document.getElementById("nlistSexo").value = "M";
    document.getElementById("nlistPerfil").value = 2;
}

function llenarAdminUsuarios() {
    $("#tablaAdminUsuarios").empty();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=usuarios",
        success: function (response) {
            $("#tablaAdminUsuarios").empty();
            var tabla = '<thead id="tablaAdminUsuariosHead"></thead>\
                         <tbody id="tablaAdminUsuariosBody"></tbody>';
            $("#tablaAdminUsuarios").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombres</th>\
                          <th style='text-align: center;'>Apellido Paterno</th>\
                          <th style='text-align: center;'>Apellido Materno</th>\
                          <th style='text-align: center;'>Usuario</th>\
                          <th style='text-align: center;'>Género</th>\
                          <th style='text-align: center;'>Perfil</th>\
                          <th style='text-align: center;'>Estado</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaAdminUsuariosHead").append(head);
            $.each(response.listUsuarios, function (index, value) {
                var nombres, paterno, materno, genero, estado;
                if (!$.trim(value.usuaNombres)) {
                    nombres = "";
                } else {
                    nombres = value.usuaNombres;
                }
                if (!$.trim(value.usuaApellidoPaterno)) {
                    paterno = "";
                } else {
                    paterno = value.usuaApellidoPaterno;
                }
                if (!$.trim(value.usuaApellidoMaterno)) {
                    materno = "";
                } else {
                    materno = value.usuaApellidoMaterno;
                }
                if (value.usuaGenero.toLowerCase() === "m") {
                    genero = "masculino";
                }
                if (value.usuaGenero.toLowerCase() === "f") {
                    genero = "femenino";
                }
                if (value.usuaEstado === true) {
                    estado = "Activo";
                }
                if (value.usuaEstado === false) {
                    estado = "Inactivo";
                }
                var body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombres + "</td>\
                                <td align='left'>" + paterno + "</td>\
                                <td align='left'>" + materno + "</td>\
                                <td align='center'>" + value.usuaUsuario + "</td>\
                                <td align='left'>" + genero.toUpperCase() + "</td>\
                                <td align='left'>" + value.perfNombre + "</td>\
                                <td align='center'>" + estado + "</td>\
                                ";
                if (value.usuaId !== 1) {
                    body += "<td align='center'>\
                                <button id='btnAdminEditUser" + value.usuaId + "' class='btn btn-light btn-sm'\
                                  title='Editar' data-toggle='modal' data-target='#modalEditUsua'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                                <button id='btnAdminDelUser" + value.usuaId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                             </td>";
                } else {
                    body += "<td align='center'>\
                                <button id='btnAdminEditUser" + value.usuaId + "' class='btn btn-light btn-sm'\
                                  title='Editar' data-toggle='modal' data-target='#modalEditUsua'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                             </td>";
                }
                body += "</tr>";
                $("#tablaAdminUsuariosBody").append(body);

                $("#btnAdminEditUser" + value.usuaId).click(function () {

                    var action = "./Usuario?url=editar&usua_id=" + value.usuaId + "";
                    $("#formEditUsua").attr("action", action);
                    llenarAdminInfoUsuario(value.usuaId);

                    $("#btnAdmEditUsuaSave").one("click", function () {
                        $("#formEditUsua").submit(function (evt) {
                            evt.preventDefault();
                            $.ajax({
                                dataType: 'json',
                                type: 'post',
                                url: $(this).attr("action"),
                                data: $(this).serialize(),
                                success: function (response) {
                                    if (response.success) {
                                        alertify.success(response.msg);
                                        limpiarAdminEditUsuario();
                                        $('#modalEditUsua').modal('hide');
                                        llenarAdminUsuarios();
                                    } else {
                                        alertify.error(response.msg);
                                    }
                                }
                            });
                        });
                    });

                });

                $("#btnAdminDelUser" + value.usuaId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este usuario?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Usuario?url=delete&usua_id=" + value.usuaId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarAdminUsuarios();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaAdminUsuarios').dataTable().fnDestroy();

            $('#tablaAdminUsuarios').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'usuarios_software',
                        title: 'Lista de Usuarios del Software',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function limpiarAdminEditUsuario() {
    $("#eNombres").val('');
    $("#ePaterno").val('');
    $("#eMaterno").val('');
    $("#eUsuario").val('');
    $("#ePassword").val('');
}

function llenarAdminInfoUsuario(usua_id) {
    limpiarAdminEditUsuario();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=info_usuario&usua_id=" + usua_id,
        success: function (response) {
            $("#eNombres").val(response.nombres);
            $("#ePaterno").val(response.paterno);
            $("#eMaterno").val(response.materno);
            $("#eUsuario").val(response.usuario);
            $("#ePassword").val(response.password);
            document.getElementById("elistSexo").value = response.genero;
            document.getElementById("elistPerfil").value = response.perfil;
            $("#eEstado").prop("checked", response.estado);
        }
    });
}