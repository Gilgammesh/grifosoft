/*
 ========================
 @author carlos santander
 ========================
 */

function eventFormMaestrasNuevaUnidad() {
    $("#formMaestrasNuevaUnidad").submit(function (evt) {
        evt.preventDefault();
        if ($("#nIptMaestrasUnidadMedSunatSelect").val().toLowerCase() === "elija unidad de medida") {
            alertify.error("Seleccione Unidad de Medida de SUNAT");
        } else {
            $.ajax({
                dataType: 'json',
                type: 'post',
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (response) {
                    if (response.success) {
                        alertify.success(response.msg);
                        $('#modalMaestrasNuevaUnidad').modal('hide');
                        llenarMaestrasUnidades();
                    } else {
                        alertify.error(response.msg);
                    }
                }
            });
        }

    });
}

function sub_menu_unidades() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">UNIDADES DE MEDIDA</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevaUnidad" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevaUnidad">\
                                  <span class="fa fa-ticket"></span> Nueva Unidad de Medida\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevaUnidad" class="modal fade"></div>\
                              <div id="modalMaestrasEditarUnidad" class="modal fade"></div>\
                              <div class="table-responsive">\
                                <table id="tablaMaestrasUnidades" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasUnidades();

    $("#btnMaestrasNuevaUnidad").click(function () {
        llenarModalMaestrasNuevaUnidad();
    });
    
}

function llenarModalMaestrasNuevaUnidad() {
    $("#modalMaestrasNuevaUnidad").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasNuevaUnidad" method="post" action="./TablasMaestras?url=nueva_unidad">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-ticket"></i> Nueva Unidad de Medida</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasUnidadNombre" class="col-form-label">Nombre de la Unidad de Medida :</label>\
					  <input id="nMaestrasUnidadNombre" type="text" name="unme_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de la unidad de medida" required>\
					</div>\
					<div class="form-group">\
					  <label for="nMaestrasUnidadSimbolo" class="col-form-label">Simbolo de la Unidad de Medida :</label>\
					  <input id="nMaestrasUnidadSimbolo" type="text" name="unme_simbolo" class="form-control" \
                                            placeholder="Ingrese simbolo o sigla de la unidad de medida" >\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Unidad de Medida (SUNAT) :</label>\
                                          <input id="nIptMaestrasUnidadMedSunat" type="text" name="unme_ose" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="nIptMaestrasUnidadMedSunatSelect" type="text" class="form-control" \
                                              value="Elija Unidad de Medida" disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="nIptMaestrasUnidadMedSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Unidad de Medida" onkeyup="controlMaestrasNuevoUlUnidaMedSunat()" >\
                                            </div>\
                                            <ul id="nUlMaestrasUnidadMedSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasUnidadSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasNuevaUnidad").append(modal);

    llenarMaestrasNuevaUnidadMedidaSunat();
    eventFormMaestrasNuevaUnidad();

}

function llenarMaestrasNuevaUnidadMedidaSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades_sunat",
        success: function (response) {
            $('#nUlMaestrasUnidadMedSunat').empty();
            $.each(response.listUnidades, function (index, value) {
                var li = '<li>\
                            <a id="nAMaestrasUnidadMedSunat_' + value.unmeIdSunat + '" href="javaScript:void(0);">\
                              ' + value.unmeIdSunat + ' - ' + value.unmeNombreSunat + '\
                            </a>\
                          </li>';
                $('#nUlMaestrasUnidadMedSunat').append(li);

                $("#nAMaestrasUnidadMedSunat_" + value.unmeIdSunat).click(function () {
                    $('#nIptMaestrasUnidadMedSunat').val(value.unmeIdSunat);
                    $('#nIptMaestrasUnidadMedSunatSelect').val(value.unmeIdSunat + ' - ' + value.unmeNombreSunat);
                });

            });
        }
    });
}

function controlMaestrasNuevoUlUnidaMedSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("nIptMaestrasUnidadMedSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("nUlMaestrasUnidadMedSunat");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function llenarMaestrasUnidades() {
    $("#tablaMaestrasUnidades").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades",
        success: function (response) {
            $("#tablaMaestrasUnidades").empty();
            var tabla = '<thead id="tablaMaestrasUnidadesHead"></thead>\
                         <tbody id="tablaMaestrasUnidadesBody"></tbody>';
            $("#tablaMaestrasUnidades").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Simbolo o Sigla</th>\
                          <th style='text-align: center;'>Unidad Medida (SUNAT)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasUnidadesHead").append(head);
            $.each(response.listUnidades, function (index, value) {
                var nombre, simbolo, unidad;
                if (!$.trim(value.unmeNombre)) {
                    nombre = "";
                } else {
                    nombre = value.unmeNombre;
                }
                if (!$.trim(value.unmeSimbolo)) {
                    simbolo = "";
                } else {
                    simbolo = value.unmeSimbolo;
                }
                if (!$.trim(value.unmeIdSunat)) {
                    unidad = "";
                } else {
                    if (!$.trim(value.unmeNombreSunat)) {
                        unidad = value.unmeIdSunat;
                    } else {
                        unidad = value.unmeIdSunat + " - " + value.unmeNombreSunat;
                    }
                }
                var body = "";
                if (value.unmeId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + simbolo + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='center'></td>\
                            </tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + simbolo + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasUnidadEdit" + value.unmeId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarUnidad'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasUnidadDelete" + value.unmeId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasUnidadesBody").append(body);

                $("#btnMaestrasUnidadEdit" + value.unmeId).click(function () {
                    llenarModalMaestrasEditarUnidad(value.unmeId);
                });

                $("#btnMaestrasUnidadDelete" + value.unmeId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta unidad de medida?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_unidad&unme_id=" + value.unmeId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasUnidades();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasUnidades').dataTable().fnDestroy();

            $('#tablaMaestrasUnidades').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'unidades_medida',
                        title: 'Lista de Unidades de medida',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function llenarModalMaestrasEditarUnidad(unme_id) {
    $("#modalMaestrasEditarUnidad").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasEditarUnidad" method="post" action="./TablasMaestras?url=editar_unidad&unme_id=' + unme_id + '" >\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-ticket"></i> Editar la Unidad de Medida</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasUnidadNombre" class="col-form-label">Nombre de la Unidad de Medida :</label>\
					  <input id="eMaestrasUnidadNombre" type="text" name="unme_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de la unidad de medida"  required>\
					</div>\
					<div class="form-row">\
					  <label for="eMaestrasUnidadSimbolo" class="col-form-label">Simbolo de la Unidad de Medida :</label>\
					  <input id="eMaestrasUnidadSimbolo" type="text" name="unme_simbolo" class="form-control" \
                                            placeholder="Ingrese simbolo o sigla de la unidad de medida" >\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Unidad de Medida (SUNAT) :</label>\
                                          <input id="eIptMaestrasUnidadMedSunat" type="text" name="unme_ose" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="eIptMaestrasUnidadMedSunatSelect" type="text" class="form-control" \
                                              disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="eIptMaestrasUnidadMedSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Unidad de Medida" onkeyup="controlMaestrasEditarUlUnidaMedSunat()" >\
                                            </div>\
                                            <ul id="eUlMaestrasUnidadMedSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasUnidadSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasEditarUnidad").append(modal);

    llenarMaestrasEditarUnidadMedidaSunat();

    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_unidad&unme_id=" + unme_id,
        success: function (response) {
            var nombre, simbolo, idSunat, unidad;
            if (!$.trim(response.nombre)) {
                nombre = "";
            } else {
                nombre = response.nombre;
            }
            if (!$.trim(response.simbolo)) {
                simbolo = "";
            } else {
                simbolo = response.simbolo;
            }
            if (!$.trim(response.idSunat)) {
                idSunat = "";
                unidad = "";
            } else {
                idSunat = response.idSunat;
                if (!$.trim(response.nombreSunat)) {
                    unidad = response.idSunat;
                } else {
                    unidad = response.idSunat + " - " + response.nombreSunat;
                }
            }
            $("#eMaestrasUnidadNombre").val(nombre);
            $("#eMaestrasUnidadSimbolo").val(simbolo);
            $("#eIptMaestrasUnidadMedSunat").val(idSunat);
            $("#eIptMaestrasUnidadMedSunatSelect").val(unidad);
        }
    });

    eventFormMaestrasEditarUnidad();
}

function llenarMaestrasEditarUnidadMedidaSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades_sunat",
        success: function (response) {
            $('#eUlMaestrasUnidadMedSunat').empty();
            $.each(response.listUnidades, function (index, value) {
                var li = '<li>\
                            <a id="eAMaestrasUnidadMedSunat_' + value.unmeIdSunat + '" href="javaScript:void(0);">\
                              ' + value.unmeIdSunat + ' - ' + value.unmeNombreSunat + '\
                            </a>\
                          </li>';
                $('#eUlMaestrasUnidadMedSunat').append(li);

                $("#eAMaestrasUnidadMedSunat_" + value.unmeIdSunat).click(function () {
                    $('#eIptMaestrasUnidadMedSunat').val(value.unmeIdSunat);
                    $('#eIptMaestrasUnidadMedSunatSelect').val(value.unmeIdSunat + ' - ' + value.unmeNombreSunat);
                });

            });
        }
    });
}

function controlMaestrasEditarUlUnidaMedSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("eIptMaestrasUnidadMedSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("eUlMaestrasUnidadMedSunat");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function eventFormMaestrasEditarUnidad() {
    $("#formMaestrasEditarUnidad").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalMaestrasEditarUnidad').modal('hide');
                    llenarMaestrasUnidades();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}