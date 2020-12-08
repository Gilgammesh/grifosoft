/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarAdminNuevoPerfil() {
    $("#nPerfil").val('');
    $("#nDescripcion").text('');
}

function sub_menu_perfiles() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">GESTION DE PERFILES Y PERMISOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnAdminNuevoPerfil" class="btn btn-primary" data-toggle="modal" data-target="#modalNuevoPerfil">\
                                  <span class="fa fa-address-card"></span> Nuevo Perfil\
                                </button>\
                              </div>\
                              <div id="modalNuevoPerfil" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formNuevoPerfil" method="post" action="./Usuario?url=nuevo_perfil">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-address-card"></i> Nuevo Perfil</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nPerfil" class="col-form-label">Perfil :</label>\
					  <input id="nPerfil" type="text" name="perfil" class="form-control" \
                                            placeholder="Ingrese nombres de perfil" required>\
					</div>\
					<div class="form-group">\
					  <label for="nDescripcion" class="col-form-label">Descripción del Perfil :</label>\
					  <textarea id="nDescripcion" type="text" rows="4" name="descripcion" class="form-control" \
                                            placeholder="Ingrese descripción del perfil" />\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAdmNewPerfSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalEditPerfil" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formEditPerfil" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-address-book-o"></i> Editar Perfil</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="ePerfil" class="col-form-label">Perfil :</label>\
					  <input id="ePerfil" type="text" name="perfil" class="form-control" \
                                            placeholder="Ingrese nombres de perfil" required>\
					</div>\
					<div class="form-group">\
					  <label for="eDescripcion" class="col-form-label">Descripción del Perfil :</label>\
					  <textarea id="eDescripcion" type="text" rows="4" name="descripcion" class="form-control" \
                                            placeholder="Ingrese descripción del perfil" />\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAdmEditPerfSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalEditPermisos" class="modal fade">\
                               <div class="modal-dialog modal-lg">\
                                  <form id="formEditPermisos" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-cubes"></i> Editar Permisos</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="pPerfil" class="col-form-label">Perfil :</label>\
					  <input id="pPerfil" type="text" name="perfil" class="form-control" \
                                            placeholder="Ingrese Nombre del Perfil" readonly>\
					</div>\
                                      </div>\
                                      <div class="checktreeDiv">\
                                        <span class="list-group-item list-group-item-action active"> Módulos del Software </span>\
                                        <ul id="ulAdminAsignPerm" class="checktree"></ul>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnAdmEditPermSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaAdminPerfiles" class="table table-bordered table-hover"></table>\
                              </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarAdminPerfiles();
    eventFormNuevoPerfil();

}

function eventFormNuevoPerfil() {
    $("#btnAdmNewPerfSave").one("click", function () {
        $("#formNuevoPerfil").submit(function (evt) {
            evt.preventDefault();
            $.ajax({
                dataType: 'json',
                type: 'post',
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (response) {
                    if (response.success) {
                        alertify.success(response.msg);
                        limpiarAdminNuevoPerfil();
                        $('#modalNuevoPerfil').modal('hide');
                        llenarAdminPerfiles();
                    } else {
                        alertify.error(response.msg);
                    }
                }
            });
        });
    });
}

function llenarAdminPerfiles() {
    $("#tablaAdminPerfiles").empty();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=perfiles",
        success: function (response) {
            $("#tablaAdminPerfiles").empty();
            var tabla = '<thead id="tablaAdminPerfilesHead"></thead>\
                         <tbody id="tablaAdminPerfilesBody"></tbody>';
            $("#tablaAdminPerfiles").append(tabla);
            var head = "<tr>\
                        <th style='text-align: center;'>Id</th>\
                        <th style='text-align: center;'>Nombres</th>\
                        <th style='text-align: center;'>Descripción</th>";
            var countMenu = 0;
            $.each(response.listMenu, function (index, value) {
                head += "<th style='text-align: center;' class='notexport'>" + value.menuNombre + "</th>";
                countMenu++;
            });
            head += "<th style='text-align: center; width:120px;' class='notexport'>Acción</th>\
                     </tr>";
            $("#tablaAdminPerfilesHead").append(head);

            $.each(response.listPerfiles, function (index, value) {
                var body = "<tr>\
                            <td align='center'>" + (index + 1) + "</td>\
                            <td align='left'>" + value.perfNombre + "</td>\
                            <td align='left'>" + value.perfDescripcion + "</td>";

                for (var i = 1; i <= countMenu; i++) {
                    body += "<td id='td_perf_" + value.perfId + "_" + i + "' align='center'></td>";
                    $.ajax({
                        dataType: 'json',
                        url: "./Usuario?url=permisos&perf_id=" + value.perfId + "&menu_id=" + i,
                        success: function (responseP) {
                            var activo;
                            if (responseP.activo) {
                                activo = '<span class="label label-success">Activo</span>';
                            } else {
                                activo = '<span class="label label-danger">Inactivo</span>';
                            }
                            var detalle = activo;
                            $("#td_perf_" + responseP.perf_id + "_" + responseP.menu_id).append(detalle);
                        }
                    });
                }
                if (value.perfId !== 1) {
                    body += "<td align='center'>\
                                <button id='btnAdminEditPerf" + value.perfId + "' class='btn btn-light btn-sm'\
                                  title='Editar' data-toggle='modal' data-target='#modalEditPerfil'>\
                                  <i class='fa fa-edit'></i>\
                                </button>\
                                <button id='btnAdminAsigPerf" + value.perfId + "' class='btn btn-primary btn-sm'\
                                  title='Asignar Permisos' data-toggle='modal' data-target='#modalEditPermisos'>\
                                  <i class='fa fa-map-marker'></i>\
                                </button>\
                                <button id='btnAdminDelPerf" + value.perfId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                  <i class='fa fa-trash'></i>\
                                </button>\
                             </td>";
                } else {
                    body += "<td align='center'></td>";
                }
                body += "</tr>";

                $("#tablaAdminPerfilesBody").append(body);

                $("#btnAdminEditPerf" + value.perfId).click(function () {

                    var action = "./Usuario?url=editar_perfil&perf_id=" + value.perfId + "";
                    $("#formEditPerfil").attr("action", action);

                    llenarAdminInfoPerfil(value.perfId);

                    $("#btnAdmEditPerfSave").one("click", function () {
                        $("#formEditPerfil").submit(function (evt) {
                            evt.preventDefault();
                            $.ajax({
                                dataType: 'json',
                                type: 'post',
                                url: $(this).attr("action"),
                                data: $(this).serialize(),
                                success: function (response) {
                                    if (response.success) {
                                        alertify.success(response.msg);
                                        limpiarAdminEditPerfil();
                                        $('#modalEditPerfil').modal('hide');
                                        llenarAdminPerfiles();
                                    } else {
                                        alertify.error(response.msg);
                                    }
                                }
                            });
                        });
                    });

                });

                $("#btnAdminAsigPerf" + value.perfId).click(function () {

                    llenarAdminInfoPerfil(value.perfId);
                    llenarAdminInfoPermisos(value.perfId);

                    $("#btnAdmEditPermSave").one("click", function () {
                        $("#formEditPermisos").submit(function (evt) {
                            evt.preventDefault();
                            $.ajax({
                                dataType: 'json',
                                type: 'post',
                                url: $(this).attr("action"),
                                data: $(this).serialize(),
                                success: function (response) {
                                    if (response.success) {
                                        alertify.success(response.msg);
                                        limpiarAdminEditPerfil();
                                        $('#modalEditPermisos').modal('hide');
                                        llenarAdminPerfiles();
                                    } else {
                                        alertify.error(response.msg);
                                    }
                                }
                            });
                        });
                    });

                });

                $("#btnAdminDelPerf" + value.perfId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este perfil de usuario?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./Usuario?url=delete_perfil&perf_id=" + value.perfId,
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarAdminPerfiles();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaAdminPerfiles').dataTable().fnDestroy();

            $('#tablaAdminPerfiles').dataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'perfiles_usuario',
                        title: 'Perfiles de Usuario',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function limpiarAdminEditPerfil() {
    $("#ePerfil").val('');
    $("#pPerfil").val('');
    $("#eDescripcion").text('');
    $("#pDescripcion").text('');
}

function llenarAdminInfoPerfil(perf_id) {
    limpiarAdminEditPerfil();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=info_perfil&perf_id=" + perf_id,
        success: function (response) {
            $("#ePerfil").val(response.perfil);
            $("#pPerfil").val(response.perfil);
            $("#eDescripcion").text(response.descripcion);
            $("#pDescripcion").text(response.descripcion);
        }
    });
}

function llenarAdminInfoPermisos(perf_id) {
    $("#ulAdminAsignPerm").empty();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=permisos&perf_id=" + perf_id,
        success: function (response) {
            $("#ulAdminAsignPerm").empty();
            var countM = 0;
            $.each(response.listPermisos, function (index, value) {
                var checked;
                if (value.permActivo) {
                    checked = "checked";
                } else {
                    checked = "";
                }
                countM++;
                var contM = '<li>\
                                <input type="checkbox" id="permisoMenu_' + value.menuId + '" name="activo_' + value.menuId + '" \
                                value=' + value.menuId + ' class="filled-in chk-col-danger" ' + checked + '>&nbsp;&nbsp; \
                                <label for="permisoMenu_' + value.menuId + '" style="font-weight: bold;">' + value.menuNombre + '</label>\
                                <ul id="ulsubModPerm_' + value.menuId + '"></ul>\
                             </li>';
                $("#ulAdminAsignPerm").append(contM);

                $.ajax({
                    dataType: 'json',
                    url: "./GsonData?url=DataSubMenu&menu_id=" + value.menuId + "&perf_id=" + perf_id,
                    success: function (responseS) {
                        $.each(responseS.listSubMPerm, function (indexS, valueS) {
                            var subchecked;
                            if (valueS.permActivo) {
                                subchecked = "checked";
                            } else {
                                subchecked = "";
                            }
                            var submenuS = '<li id="lisubModPerm_' + responseS.menuId + '_' + valueS.subMenuId + '" >\
                                                <input type="checkbox" id="permisoSubMenu_' + responseS.menuId + '_' + valueS.subMenuId + '" \
                                                name="subactivo_' + responseS.menuId + '_' + valueS.subMenuId + '" \
                                                value=' + responseS.menuId + '_' + valueS.subMenuId + ' class="filled-in chk-col-danger" ' + subchecked + '>&nbsp;&nbsp; \
                                                <label for="permisoSubMenu_' + responseS.menuId + '_' + valueS.subMenuId + '" >' + valueS.subMenuNombre + '</label>\
                                            </li>';
                            $("#ulsubModPerm_" + responseS.menuId).append(submenuS);

                            $("#permisoSubMenu_" + responseS.menuId + '_' + valueS.subMenuId).change(function () {
                                if (this.checked) {
                                    $("#permisoMenu_" + responseS.menuId).prop("checked", true);
                                } else {
                                    var countSubCheck = 0;
                                    $("#ulsubModPerm_" + value.menuId + " input").each(function () {
                                        if (this.checked) {
                                            countSubCheck++;
                                        }
                                    });
                                    if (countSubCheck === 0) {
                                        $("#permisoMenu_" + responseS.menuId).prop("checked", false);
                                    }
                                }
                            });
                        });
                    }
                });

                $("#permisoMenu_" + value.menuId).change(function () {
                    if (this.checked) {
                        $("#ulsubModPerm_" + value.menuId + " input").prop("checked", true);
                    } else {
                        $("#ulsubModPerm_" + value.menuId + " input").prop("checked", false);
                    }
                });

            });
            var action = "./Usuario?url=update_permisos&perf_id=" + response.id;
            $("#formEditPermisos").attr("action", action);

        }
    });
}