/*
 ========================
 @author carlos santander
 ========================
 */

function llenarMaestrasNuevoServiciosUnidades() {
    $("#nlistMaestrasServicioUnidad").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades",
        success: function (response) {
            $("#nlistMaestrasServicioUnidad").append("<option value=''>--Seleccione Unidad--</option>");
            $.each(response.listUnidades, function (index, value) {
                var nombre;
                if (!$.trim(value.unmeSimbolo)) {
                    nombre = value.unmeNombre;
                } else {
                    nombre = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                }
                var unid = "<option value=" + value.unmeId + ">" + nombre + "</option>";
                $("#nlistMaestrasServicioUnidad").append(unid);
            });
        }
    });
}

function sub_menu_servicios() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">SERVICIOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoServicio" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoServicio">\
                                  <span class="fa fa-suitcase"></span> Nuevo Servicio\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoServicio" class="modal fade"></div>\
                              <div id="modalMaestrasEditarServicio" class="modal fade"></div>\
                              <div class="table-responsive">\
                                <table id="tablaMaestrasServicios" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasServicios();

    $("#btnMaestrasNuevoServicio").click(function () {
        llenarModalMaestrasNuevoServicio();
    });

}

function llenarModalMaestrasNuevoServicio() {
    $("#modalMaestrasNuevoServicio").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasNuevoServicio" method="post" action="./TablasMaestras?url=nuevo_servicio">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-suitcase"></i> Nuevo Servicio</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasServicioNombre" class="col-form-label">Nombre Servicio :</label>\
					  <input id="nMaestrasServicioNombre" type="text" name="serv_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de servicio" required >\
					</div>\
					<div class="form-group">\
					  <label for="nMaestrasServicioDescripcion" class="col-form-label">Descripción Servicio :</label>\
					  <textarea rows="3" id="nMaestrasServicioDescripcion" name="serv_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de servicio" form="formMaestrasNuevoServicio" required />\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-12">\
					     <label for="nlistMaestrasServicioUnidad" class="col-form-label">Unidad de Medida :</label>\
                                             <select id="nlistMaestrasServicioUnidad" class="form-select" name="unme_id"></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Catálogo de Servicios (SUNAT) :</label>\
                                          <input id="nIptMaestrasServicioCatalogoProdSunat" type="text" name="serv_codigo_sunat" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="nIptMaestrasServicioCatalogoProdSunatSelect" type="text" class="form-control" \
                                              value="Elija Servicio" disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="nIptMaestrasServicioCatalogoProdSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Servicio" onkeyup="controlMaestrasNuevoUlCatalogoServSunat()" >\
                                            </div>\
                                            <ul id="nUlMaestrasCatalogoServSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasServicioSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasNuevoServicio").append(modal);

    llenarMaestrasNuevoServiciosUnidades();
    llenarMaestrasNuevoServiciosCatalogoProdSunat();
    eventFormMaestrasNuevoServicio();

}

function llenarMaestrasNuevoServiciosCatalogoProdSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_sunat",
        success: function (response) {
            $('#nUlMaestrasCatalogoServSunat').empty();
            $.each(response.listCatalogo, function (index, value) {
                var li = '<li>\
                            <a id="nMaestrasCatalogoProdSunat_' + value.caprId + '" href="javaScript:void(0);">\
                              ' + value.caprId + ' - ' + value.caprNombre + '\
                            </a>\
                          </li>';
                $('#nUlMaestrasCatalogoServSunat').append(li);

                $("#nMaestrasCatalogoProdSunat_" + value.caprId).click(function () {
                    $('#nIptMaestrasServicioCatalogoProdSunat').val(value.caprId);
                    $('#nIptMaestrasServicioCatalogoProdSunatSelect').val(value.caprId + ' - ' + value.caprNombre);
                });

            });
        }
    });
}

function controlMaestrasNuevoUlCatalogoServSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("nIptMaestrasServicioCatalogoProdSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("nUlMaestrasCatalogoServSunat");
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

function eventFormMaestrasNuevoServicio() {
    $("#formMaestrasNuevoServicio").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalMaestrasNuevoServicio').modal('hide');
                    llenarMaestrasServicios();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarMaestrasServicios() {
    $("#tablaMaestrasServicios").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_servicios",
        success: function (response) {
            $("#tablaMaestrasServicios").empty();
            var tabla = '<thead id="tablaMaestrasServiciosHead"></thead>\
                         <tbody id="tablaMaestrasServiciosBody"></tbody>';
            $("#tablaMaestrasServicios").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Unidad de Medida</th>\
                          <th style='text-align: center;'>Catalogo Servicio (SUNAT)</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasServiciosHead").append(head);
            $.each(response.listServicios, function (index, value) {
                var nombre, descripcion, unidad, catalogo;
                if (!$.trim(value.servNombre)) {
                    nombre = "";
                } else {
                    nombre = value.servNombre;
                }
                if (!$.trim(value.servDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.servDescripcion;
                }
                if (!$.trim(value.unmeSimbolo)) {
                    unidad = value.unmeNombre;
                } else {
                    unidad = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                }
                if (!$.trim(value.caprId)) {
                    catalogo = "";
                } else {
                    if (!$.trim(value.caprNombre)) {
                        catalogo = value.caprId;
                    } else {
                        catalogo = value.caprId + " - " + value.caprNombre;
                    }
                }
                var body = "";
                if (value.servId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='left'>" + catalogo + "</td>\
                                <td align='center'></td>\
                            </tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='left'>" + catalogo + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasServicioEdit" + value.servId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarServicio'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasServicioDelete" + value.servId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasServiciosBody").append(body);

                $("#btnMaestrasServicioEdit" + value.servId).click(function (evt) {
                    
                    llenarModalMaestrasEditarServicio(value.servId);

                });

                $("#btnMaestrasServicioDelete" + value.servId).click(function (evt) {
                    evt.preventDefault();
                    alertify.confirm("¿Está seguro que desea eliminar este servicio?", function (e) {
                        if (e) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_servicio&serv_id=" + value.servId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasServicios();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasServicios').dataTable().fnDestroy();

            $('#tablaMaestrasServicios').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'servicios',
                        title: 'Lista de Servicios',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function llenarMaestrasEditarServiciosUnidades() {
    $("#elistMaestrasServicioUnidad").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades",
        success: function (response) {
            $("#elistMaestrasServicioUnidad").append("<option value=''>--Seleccione Unidad--</option>");
            $.each(response.listUnidades, function (index, value) {
                var nombre;
                if (!$.trim(value.unmeSimbolo)) {
                    nombre = value.unmeNombre;
                } else {
                    nombre = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                }
                var unid = "<option value=" + value.unmeId + ">" + nombre + "</option>";
                $("#elistMaestrasServicioUnidad").append(unid);
            });
        }
    });
}

function llenarModalMaestrasEditarServicio(serv_id) {
    $("#modalMaestrasEditarServicio").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasEditarServicio" method="post" action="./TablasMaestras?url=editar_servicio&serv_id=' + serv_id + '" >\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-suitcase"></i> Editar Servicio</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasServicioNombre" class="col-form-label">Nombre Servicio :</label>\
					  <input id="eMaestrasServicioNombre" type="text" name="serv_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de servicio" required>\
					</div>\
					<div class="form-group">\
					  <label for="eMaestrasServicioDescripcion" class="col-form-label">Descripción Servicio :</label>\
					  <textarea rows="3" id="eMaestrasServicioDescripcion" name="serv_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de servicio" form="formMaestrasEditarServicio" />\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-12">\
					     <label for="elistMaestrasServicioUnidad" class="col-form-label">Unidad de Medida :</label>\
                                             <select id="elistMaestrasServicioUnidad" class="form-select" name="unme_id"></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Catálogo de Servicios (SUNAT) :</label>\
                                          <input id="eIptMaestrasServicioCatalogoProdSunat" type="text" name="serv_codigo_sunat" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="eIptMaestrasServicioCatalogoProdSunatSelect" type="text" class="form-control" \
                                              value="Elija Servicio" disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="eIptMaestrasServicioCatalogoProdSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Servicio" onkeyup="controlMaestrasEditarUlCatalogoServSunat()" >\
                                            </div>\
                                            <ul id="eUlMaestrasCatalogoServSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasServicioSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasEditarServicio").append(modal);

    llenarMaestrasEditarServiciosUnidades();
    llenarMaestrasEditarServiciosCatalogoProdSunat();
    
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_servicio&serv_id=" + serv_id,
        success: function (response) {
            var nombre, descripcion, idCata, catalogo;
            if (!$.trim(response.nombre)) {
                nombre = "";
            } else {
                nombre = response.nombre;
            }
            if (!$.trim(response.descripcion)) {
                descripcion = "";
            } else {
                descripcion = response.descripcion;
            }
            if (!$.trim(response.caprId)) {
                idCata = "";
                catalogo = "";
            } else {
                idCata = response.caprId;
                if (!$.trim(response.caprNombre)) {
                    catalogo = response.caprId;
                } else {
                    catalogo = response.caprId + " - " + response.caprNombre;
                }
            }
            $("#eMaestrasServicioNombre").val(nombre);
            $("#eMaestrasServicioDescripcion").val(descripcion);
            document.getElementById("elistMaestrasServicioUnidad").value = response.unidad;
            $("#eIptMaestrasServicioCatalogoProdSunat").val(idCata);
            $("#eIptMaestrasServicioCatalogoProdSunatSelect").val(catalogo);
        }
    });
    
    eventFormMaestrasEditarServicio();

}

function llenarMaestrasEditarServiciosCatalogoProdSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_sunat",
        success: function (response) {
            $('#eUlMaestrasCatalogoServSunat').empty();
            $.each(response.listCatalogo, function (index, value) {
                var li = '<li>\
                            <a id="eMaestrasCatalogoProdSunat_' + value.caprId + '" href="javaScript:void(0);">\
                              ' + value.caprId + ' - ' + value.caprNombre + '\
                            </a>\
                          </li>';
                $('#eUlMaestrasCatalogoServSunat').append(li);

                $("#eMaestrasCatalogoProdSunat_" + value.caprId).click(function () {
                    $('#eIptMaestrasServicioCatalogoProdSunat').val(value.caprId);
                    $('#eIptMaestrasServicioCatalogoProdSunatSelect').val(value.caprId + ' - ' + value.caprNombre);
                });

            });
        }
    });
}

function controlMaestrasEditarUlCatalogoServSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("eIptMaestrasServicioCatalogoProdSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("eUlMaestrasCatalogoServSunat");
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

function eventFormMaestrasEditarServicio() {
    $("#formMaestrasEditarServicio").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalMaestrasEditarServicio').modal('hide');
                    llenarMaestrasServicios();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}