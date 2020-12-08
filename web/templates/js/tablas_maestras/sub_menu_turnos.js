/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTurno() {
    $("#nMaestrasTurnoNombre").val('');
    $("#nMaestrasTurnoDescripcion").val('');
}

function eventFormMaestrasNuevoTurno() {
    $("#formMaestrasNuevoTurno").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTurno();
                    $('#modalMaestrasNuevoTurno').modal('hide');
                    llenarMaestrasTurnos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}


function sub_menu_turnos() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TURNOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTurno" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTurno">\
                                  <span class="fa fa-tachometer"></span> Nuevo Turno\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTurno" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTurno" method="post" action="./TablasMaestras?url=nuevo_turno">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-tachometer"></i> Nuevo Turno</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTurnoNombre" class="col-form-label">Nombre del Turno :</label>\
					  <input id="nMaestrasTurnoNombre" type="text" name="turn_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de turno" required>\
					</div>\
					<div class="form-row">\
					  <label for="nMaestrasTurnoDescripcion" class="col-form-label">Descripción del Turno :</label>\
					  <input id="nMaestrasTurnoDescripcion" type="text" name="turn_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción del turno" >\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="nMaestrasTurnoInicio" class="col-form-label">Inicio :</label>\
                                            <input id="nMaestrasTurnoInicio" name="turn_inicio" required />\
 					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="nMaestrasTurnoFin" class="col-form-label">Fin :</label>\
                                            <input id="nMaestrasTurnoFin" name="turn_fin" required /> \
					  </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTurnoSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTurno" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTurno" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-tachometer"></i> Editar Turno</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTurnoNombre" class="col-form-label">Nombre del Turno :</label>\
					  <input id="eMaestrasTurnoNombre" type="text" name="turn_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de turno" required>\
					</div>\
					<div class="form-row">\
					  <label for="eMaestrasTurnoDescripcion" class="col-form-label">Descripción del Turno :</label>\
					  <input id="eMaestrasTurnoDescripcion" type="text" name="turn_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción del turno" >\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="eMaestrasTurnoInicio" class="col-form-label">Inicio :</label>\
                                            <input id="eMaestrasTurnoInicio" name="turn_inicio" required /> \
					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="eMaestrasTurnoFin" class="col-form-label">Fin :</label>\
                                            <input id="eMaestrasTurnoFin" name="turn_fin" required /> \
					  </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTurnoSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTurnos" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = "AM";
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    if (hours === 0) {
        hours = 12;
    }
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    var hoy = hours + ":" + minutes + " " + ampm;

    $('#nMaestrasTurnoInicio').timepicker({
        locale: 'es-es',
        format: 'hh:MM TT',
        uiLibrary: 'bootstrap4',
        value: hoy,
        modal: false,
        header: true,
        footer: false
    });
    $('#nMaestrasTurnoFin').timepicker({
        locale: 'es-es',
        format: 'hh:MM TT',
        uiLibrary: 'bootstrap4',
        value: hoy,
        modal: false,
        header: true,
        footer: false
    });
    $('#eMaestrasTurnoInicio').timepicker({
        locale: 'es-es',
        format: 'hh:MM TT',
        uiLibrary: 'bootstrap4',
        modal: false,
        header: true,
        footer: false
    });
    $('#eMaestrasTurnoFin').timepicker({
        locale: 'es-es',
        format: 'hh:MM TT',
        uiLibrary: 'bootstrap4',
        modal: false,
        header: true,
        footer: false
    });

    llenarMaestrasTurnos();
    eventFormMaestrasNuevoTurno();

}

function limpiarMaestrasEditarTurno() {
    $("#eMaestrasTurnoNombre").val('');
    $("#eMaestrasTurnoDescripcion").val('');
}

function llenarMaestrasEditarTurnoInfo(turn_id) {
    limpiarMaestrasEditarTurno();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_turno&turn_id=" + turn_id,
        success: function (response) {
            $("#eMaestrasTurnoNombre").val(response.nombre);
            $("#eMaestrasTurnoDescripcion").val(response.descripcion);
            $("#eMaestrasTurnoInicio").val(response.inicio);
            $("#eMaestrasTurnoFin").val(response.fin);
        }
    });
}

function llenarMaestrasTurnos() {
    $("#tablaMaestrasTurnos").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_turnos",
        success: function (response) {
            $("#tablaMaestrasTurnos").empty();
            var tabla = '<thead id="tablaMaestrasTurnosHead"></thead>\
                         <tbody id="tablaMaestrasTurnosBody"></tbody>';
            $("#tablaMaestrasTurnos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Inicio</th>\
                          <th style='text-align: center;'>Fin</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTurnosHead").append(head);
            $.each(response.listTurnos, function (index, value) {
                var nombre, descripcion, inicio, fin;
                if (!$.trim(value.turnNombre)) {
                    nombre = "";
                } else {
                    nombre = value.turnNombre;
                }
                if (!$.trim(value.turnDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.turnDescripcion;
                }
                if (!$.trim(value.turnInicio)) {
                    inicio = "";
                } else {
                    inicio = value.turnInicio;
                }
                if (!$.trim(value.turnFin)) {
                    fin = "";
                } else {
                    fin = value.turnFin;
                }
                var body = "";
                if (value.turnId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='center'>" + inicio + "</td>\
                                <td align='center'>" + fin + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='center'>" + inicio + "</td>\
                                <td align='center'>" + fin + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTurnoEdit" + value.turnId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTurno'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTurnoDelete" + value.turnId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTurnosBody").append(body);

                $("#btnMaestrasTurnoEdit" + value.turnId).click(function () {

                    var action = "./TablasMaestras?url=editar_turno&turn_id=" + value.turnId + "";
                    $("#formMaestrasEditarTurno").attr("action", action);
                    llenarMaestrasEditarTurnoInfo(value.turnId);

                    $("#formMaestrasEditarTurno").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTurno();
                                    $('#modalMaestrasEditarTurno').modal('hide');
                                    llenarMaestrasTurnos();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTurnoDelete" + value.turnId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este turno?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_turno&turn_id=" + value.turnId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTurnos();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTurnos').dataTable().fnDestroy();

            $('#tablaMaestrasTurnos').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'turnos',
                        title: 'Lista de Turnos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

