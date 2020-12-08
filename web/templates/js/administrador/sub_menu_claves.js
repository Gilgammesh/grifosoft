/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarAdminNuevaClave() {
    $("#nAdminClave").val('');
}

function eventFormAdminNuevaClave() {
    $("#formAdminNuevaClave").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarAdminNuevaClave();
                    $('#modalAdminNuevaClave').modal('hide');
                    llenarAdminClavesTurnos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_claves() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">GESTIÓN DE CLAVES DE AUTORIZACIÓN DE TURNOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnAdminNuevoUsuario" class="btn btn-primary" data-toggle="modal" data-target="#modalAdminNuevaClave">\
                                  <span class="fa fa-key"></span> Nueva Clave\
                                </button>\
                              </div>\
                              <div id="modalAdminNuevaClave" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formAdminNuevaClave" method="post" action="./Usuario?url=nueva_clave">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-key"></i> Nueva Clave de Autorización</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nAdminClave" class="col-form-label">Clave :</label>\
					  <input id="nAdminClave" type="text" name="cltu_clave" class="form-control" \
                                            placeholder="Ingrese clave" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnAdminClaveSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaAdminClavesTurnos" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarAdminClavesTurnos();
    eventFormAdminNuevaClave();
}

function llenarAdminClavesTurnos() {
    $("#tablaAdminClavesTurnos").empty();
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=list_claves",
        success: function (response) {
            $("#tablaAdminClavesTurnos").empty();
            var tabla = '<thead id="tablaAdminClavesTurnosHead"></thead>\
                         <tbody id="tablaAdminClavesTurnosBody"></tbody>';
            $("#tablaAdminClavesTurnos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Clave</th>\
                          <th style='text-align: center;'>Fecha y Hora de creación</th>\
                          <th style='text-align: center;'>Estado</th>\
                          <th style='text-align: center;' class='notexport'></th>\
                        </tr>";
            $("#tablaAdminClavesTurnosHead").append(head);
            $.each(response.listClaves, function (index, value) {
                var clave, fecha, estado, estado_add;
                if (!$.trim(value.cltuClave)) {
                    clave = "";
                } else {
                    clave = value.cltuClave;
                }
                if (!$.trim(value.cltuFechaHora)) {
                    fecha = "";
                } else {
                    fecha = value.cltuFechaHora;
                }
                if (value.cltuActivo === true) {
                    estado = "Activo";
                    estado_add = '<span class="fa fa-check" style="color: green;"></span>';
                }
                if (value.cltuActivo === false) {
                    estado = "Inactivo";
                    estado_add = '<span class="fa fa-ban" style="color: red;"></span>';
                }
                var body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='center'>" + clave + "</td>\
                                <td align='center'>" + fecha + "</td>\
                                <td align='center'>" + estado + "</td>\
                                <td align='center'>" + estado_add + "</td>\
                            </tr>";
                $("#tablaAdminClavesTurnosBody").append(body);
            });

            $('#tablaAdminClavesTurnos').dataTable().fnDestroy();

            $('#tablaAdminClavesTurnos').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'claves_turnos',
                        title: 'Lista de Claves de Turnos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}