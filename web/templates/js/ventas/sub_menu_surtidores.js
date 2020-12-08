/*
 ========================
 @author carlos santander
 ========================
 */

function llenarVentasMatriz() {
    $('#divVentasMatrizSeleccion').empty();
    $('#divVentasMatrizDisenho').empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=matriz",
        success: function (response) {
            if (response.activo) {
                $('#divVentasMatrizDisenho').empty();
                var dise = '<div class="card">\
                                <div class="card-header text-center bg-gray-light text-bold">\
                                  <label>' + response.calle_nombre.toUpperCase() + '</label>&nbsp;&nbsp;\
                                  <button id="btnVentasMatrizDisenhoEditCalle" class="btn btn-secondary" title="Editar" data-toggle="modal" data-target="#modalVentasMatrizDisenhoEditCalle">\
                                    <i class="fa fa-edit"></i>\
                                  </button>\
                                </div>\
                                <div class="card-body">\
                                    <div id="modalVentasMatrizDisenhoEditCalle" class="modal fade"></div>\
                                    <div id="divVentasMatrizDisenhoBody" class="row text-center"></div>\
                                </div>\
                            </div>';
                $('#divVentasMatrizDisenho').append(dise);
                $("#btnVentasMatrizDisenhoEditCalle").click(function () {
                    llenarModalVentasMatrizDisenhoEditCalle();
                });
                eventFormVentasMatrizDisenhoEditCalle();
                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=list_surtidores_matriz&matr_id=" + response.matr_id + "",
                    success: function (response) {
                        $('#divVentasMatrizDisenhoBody').empty();
                        if (response.estado) {
                            $('#btnDelVentasMatrizDisenho').addClass('hide');
                        } else {
                            var filas = response.filas;
                            var cols = response.cols;
                            $.each(response.listSurtidores, function (index, value) {
                                var id = value.surtId;
                                var nombre = value.surtNombre;
                                var classBtn = "";
                                if (value.surtActivo) {
                                    classBtn = "btn-dark";
                                } else {
                                    classBtn = "btn-danger";
                                }
                                var estado = value.surtActivo;
                                var surt = '<div id="divVentasMatrizDisenhoBodyFilaCol_' + id + '" class="col-md-' + (12 / cols) + ' m-b-2 m-t-1 p-t-2 p-b-2" style="border: 1px dotted #E4E4E4;">\
                                              <button id="btnVentasMatrizDisenhoBodyFilaCol_' + id + '" class="btn ' + classBtn + '" data-toggle="modal" data-target="#modalVentasDisenhoCardSurt">\
                                                ' + nombre + '\
                                              </button>\
                                              <div id="divVentasMatrizDisenhoBodyLados_' + id + '" class="m-t-1"></div>\
                                            </div>';
                                $('#divVentasMatrizDisenhoBody').append(surt);
                                $('#btnDelVentasMatrizDisenho').removeClass('hide');
                                llenarDivVentasMatrizDisenhoBodyLados(id);
                                $('#btnVentasMatrizDisenhoBodyFilaCol_' + id).click(function () {
                                    llenarModalVentasDisenhoCardSurt(id, nombre, estado);
                                });
                            });
                        }
                    }
                });
            } else {
                var cont = '<div class="form-group">\
                                <label class="col-form-label">Seleccione la matriz diseño : </label>\
                            </div>\
                            <div id="divVentasMatriz" class="form-group"></div>';
                $('#divVentasMatrizSeleccion').append(cont);
                for (var i = 1; i <= response.regMatriz; i++) {
                    $('#divVentasMatriz').append('<div id="divVentasMatrizFila_' + i + '" class="m-t-1">');
                }
                $.each(response.listMatriz, function (index, value) {
                    var btn = '<button id="btnVentasMatriz_' + value.matrId + '" type="button" \
                            class="btn btn-outline-secondary m-r-1">' + value.matrFilas + ' x ' + value.matrColumnas + '</button>';
                    $('#divVentasMatrizFila_' + value.matrFilas).append(btn);
                    $('#btnVentasMatriz_' + value.matrId).click(function () {
                        $('#divVentasMatriz .btn').removeClass('btn-success');
                        $('#divVentasMatriz .btn').addClass('btn-outline-secondary');
                        $('#btnVentasMatriz_' + value.matrId).removeClass('btn-outline-secondary');
                        $('#btnVentasMatriz_' + value.matrId).addClass('btn-success');
                        llenarVentasMatrizDisenhoSelect(value.matrId, value.matrFilas, value.matrColumnas);
                    });
                });
            }
        }
    });
}

function llenarModalVentasMatrizDisenhoEditCalle() {
    $("#modalVentasMatrizDisenhoEditCalle").empty();
    var modal = '<div class="modal-dialog">\
                                    <form id="formVentasMatrizDisenhoEditCalle" method="post" action="./Ventas?url=insert_calle_matriz">\
                                      <div class="modal-content border-light">\
                                        <div class="modal-header bg-light">\
                                          <h5 class="modal-title"><i class="fa fa-road"></i> Editar nombre de la vía principal</h5>\
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                            <span aria-hidden="true">&times;</span>\
                                          </button>\
                                        </div>\
                                        <div class="modal-body">\
                                          <div class="form-group">\
                                            <label for="eVentasMatrizDisenhoNombreCalle" class="col-form-label">Nombre :</label>\
                                            <input id="eVentasMatrizDisenhoNombreCalle" type="text" name="nombre" class="form-control" \
                                              placeholder="Ingrese nombre de la vía principal o calle" required>\
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
    $("#modalVentasMatrizDisenhoEditCalle").append(modal);
    eventFormVentasMatrizDisenhoEditCalle();
}

function eventFormVentasMatrizDisenhoEditCalle() {
    $("#formVentasMatrizDisenhoEditCalle").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function () {
                $('#modalVentasMatrizDisenhoEditCalle').modal('hide');
                $('.modal-backdrop').remove();
                llenarVentasMatriz();
            }
        });
    });
}

function sub_menu_surtidores() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">DISEÑO DE SURTIDORES</div>\
                    <div class="card-body">\
                        <div class="row">\
                            <div class="col-md-12">\
                                <label class="col-form-label">Diseña los surtidores de tu grifo de manera dinámica</label>\
                                <button id="btnDelVentasMatrizDisenho" type="button" class="btn btn-danger float-right hide">\
                                   <i class="fa fa-trash"></i> Borrar\
                                </button>\
                            </div>\
                        </div>\
                        <div id="divVentasMatrizSeleccion">\
                            <div class="form-group">\
                                <label class="col-form-label">Seleccione la matriz diseño : </label>\
                            </div>\
                            <div id="divVentasMatriz" class="form-group"></div>\
                        </div></br>\
                        <div id="divVentasMatrizDisenho"></div>\
                    </div>\
                </div>\
                <div id="modalVentasDisenhoCardSurt" class="modal fade"></div>\
                <div id="modalVentasDisenhoCardSurtLado" class="modal fade"></div>';
    $('#divMenuContenido').append(cont);
    $("#btnDelVentasMatrizDisenho").click(function () {
        alertify.confirm("¿Está seguro que desea eliminar el diseño de surtidores?", function (evt) {
            if (evt) {
                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=delete_surtidores",
                    success: function (responseDel) {
                        if (responseDel.success) {
                            $('#btnDelVentasMatrizDisenho').addClass('hide');
                            llenarVentasMatriz();
                        } else {
                            alertify.error(responseDel.msg);
                        }
                    }
                });
            } else {
                alertify.error("Cancelado");
            }
        });
    });
    llenarVentasMatriz();
}

function llenarVentasMatrizDisenhoSelect(id, filas, cols) {
    $('#divVentasMatrizDisenho').empty();
    var dise = '<div class="card text-center">\
                  <div class="card-header bg-gray-light text-bold">VIA PRINCIPAL QUE DA AL FRENTE</div>\
                  <div id="divVentasMatrizDisenhoBody" class="card-body"></div>\
                  <div class="card-footer">\
                    <button id="btnSaveVentasMatrizDisenhoFooter_' + id + '" type="button" class="btn btn-primary">\
                       <i class="fa fa-save"></i> Guardar\
                    </button>\
                  </div>\
                </div>';
    $('#divVentasMatrizDisenho').append(dise);
    $('#btnDelVentasMatrizDisenho').addClass('hide');
    for (var i = 1; i <= filas; i++) {
        $('#divVentasMatrizDisenhoBody').append('<div id="divVentasMatrizDisenhoFila_' + i + '" class="row" ></div>');
        for (var j = 1; j <= cols; j++) {
            var surt = '<div id="divVentasMatrizDisenhoFilaCol_' + i + '_' + j + '" class="col">\
                          <button type="button" class="btn btn-secondary col-md-9 m-t-2 m-b-2 p-t-1_5 p-b-1_5">Surtidor</button>\
                        </div>';
            $('#divVentasMatrizDisenhoFila_' + i).append(surt);
        }
    }

    $("#btnSaveVentasMatrizDisenhoFooter_" + id).click(function () {
        $.ajax({
            dataType: 'json',
            url: "./Ventas?url=insert_surtidores&matr_id=" + id + "",
            success: function (response) {
                if (response.success) {
                    llenarVentasMatriz();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarModalVentasDisenhoCardSurt(id, nombre, estado) {
    $('#modalVentasDisenhoCardSurt').empty();
    var checked = estado ? "checked" : "";
    var modal = '<div class="modal-dialog">\
                                  <form id="formVentasSurtidoresEditSurt" method="post" action="./Ventas?url=editar_surtidor&surt_id=' + id + '">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-life-ring"></i> Editar Surtidor</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
                                          <div class="form-group col-md-6">\
                                            <label for="eVentasSurtidoresEditSurtNombre" class="col-form-label">Nombre :</label>\
                                            <input id="eVentasSurtidoresEditSurtNombre" type="text" name="nombre" class="form-control" \
                                              placeholder="Ingrese nombre de surtidor" value="' + nombre + '" required>\
                                          </div>\
                                          <div class="form-group col-md-6">\
                                            <label class="col-form-label">Estado :</label>\
                                            <div class="check-control">\
                                                <input type="checkbox" id="eVentasSurtidoresEditSurtEstado" value="true" name="activo" class="filled-in chk-col-danger" ' + checked + '>\
                                                <label for="eVentasSurtidoresEditSurtEstado">Activo</label>\
                                            </div>\
                                          </div>\
					</div>\
					<div class="form-group">\
                                          <label for="eVentasSurtidoresEditSurtLado" class="col-form-label">Lados :</label>\
                                          <ul id="ulVentasSurtidoresEditSurtLados" class="list-group"></ul>\
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
    $('#modalVentasDisenhoCardSurt').append(modal);

    llenarVentasDisenhoCardSurtLados(id);
    eventFormVentasSurtidoresEditSurt();

}

function llenarVentasDisenhoCardSurtLados(id) {
    $("#ulVentasSurtidoresEditSurtLados").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=surtidor_lados&surt_id=" + id,
        success: function (response) {
            $.each(response.listLados, function (index, value) {
                var checked = value.sulaActivo ? "checked" : "";
                var li = '<li class="list-group-item d-flex justify-content-between align-items-center">\
                            <label style="font-weight: bold;">Lado ' + value.ladoNombre + '</label>\
                            <input type="text" name="lados[]" class="form-control hide" value="' + value.ladoId + '"/>\
                            <input type="checkbox" name="estados[]" value="' + value.ladoId + '" ' + checked + '>\
                          </li>';
                $('#ulVentasSurtidoresEditSurtLados').append(li);
            });
            $('input[name="estados[]"]').bootstrapToggle({
                onstyle: "success",
                offstyle: "light",
                on: 'SI',
                off: 'NO'
            });
            if (document.getElementById("eVentasSurtidoresEditSurtEstado").checked === false) {
                $('input[name="estados[]"]').bootstrapToggle('off');
            }
            $("#eVentasSurtidoresEditSurtEstado").on("change", function () {
                if (!this.checked) {
                    $('input[name="estados[]"]').bootstrapToggle('off');
                }
            });
        }
    });
}

function eventFormVentasSurtidoresEditSurt() {
    $("#formVentasSurtidoresEditSurt").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function () {
                $('#modalVentasDisenhoCardSurt').modal('hide');
                $('.modal-backdrop').remove();
                llenarVentasMatriz();
            }
        });
    });
}

function llenarDivVentasMatrizDisenhoBodyLados(id) {
    $('#divVentasMatrizDisenhoBodyLados_' + id).empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=surtidor_lados&surt_id=" + id,
        success: function (response) {
            $.each(response.listLados, function (index, value) {
                var activo = value.sulaActivo ? "habilitado" : "inhabilitado";
                var div = '<div id="divVentasMatrizDisenhoBodyLado_' + value.surtId + '_' + value.ladoId + '" class="col-md-10 offset-md-1 surtidores ' + activo + '" \
                             data-toggle="modal" data-target="#modalVentasDisenhoCardSurtLado">\
                             <label style="margin: auto; cursor: pointer;">Lado ' + value.ladoNombre + '</label>\
                           </div>\
                           <div id="divVentasMatrizDisenhoBodyLadoDetalleHead_' + value.surtId + '_' + value.ladoId + '" class="col-md-10 offset-md-1 detalle"></div>\
                           <div id="divVentasMatrizDisenhoBodyLadoDetalleBody_' + value.surtId + '_' + value.ladoId + '" class="col-md-10 offset-md-1 detalle"></div>';
                $('#divVentasMatrizDisenhoBodyLados_' + value.surtId).append(div);

                llenarDivVentasMatrizDisenhoBodyLadoDetalle(value.surtId, value.ladoId);

                $('#divVentasMatrizDisenhoBodyLado_' + value.surtId + '_' + value.ladoId).click(function () {
                    llenarModalVentasDisenhoCardSurtLado(value.surtId, value.ladoId, value.surtNombre, value.ladoNombre);
                });
            });
        }
    });
}

function llenarDivVentasMatrizDisenhoBodyLadoDetalle(surtId, ladoId) {
    $('#divVentasMatrizDisenhoBodyLadoDetalleHead_' + surtId + '_' + ladoId).empty();
    $('#divVentasMatrizDisenhoBodyLadoDetalleBody_' + surtId + '_' + ladoId).empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=surtidores_detalle_lado_prods&surt_id=" + surtId + "&lado_id=" + ladoId,
        success: function (response) {
            var size = response.size;
            if (size > 0) {
                $.each(response.listDetalle, function (index, value) {
                    var classDiv = value.sudeActivo ? "bg-blue text-white" : "bg-gray-light";
                    var classSpan = value.sudeActivo ? "span-mang-a text-white" : "span-mang-i";
                    var head = '<div class="col-md-' + (12 / size) + ' detalle-surtidores-head ' + classDiv + '">\
                                    <span class="' + classSpan + '">' + value.mangId + '</label>\
                                </div>';
                    var body = '<div class="col-md-' + (12 / size) + ' detalle-surtidores-body ' + classDiv + '">\
                                    <label style="margin: auto;">' + value.prodNombre + '</label>\
                                </div>';
                    $('#divVentasMatrizDisenhoBodyLadoDetalleHead_' + value.surtId + '_' + value.ladoId).prepend(head);
                    $('#divVentasMatrizDisenhoBodyLadoDetalleBody_' + value.surtId + '_' + value.ladoId).prepend(body);
                });
            }
        }
    });
}

function llenarModalVentasDisenhoCardSurtLado(surtId, ladoId, surtNombre, ladoNombre) {
    $('#modalVentasDisenhoCardSurtLado').empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formVentasSurtidoresEditSurtLado" method="post" action="./Ventas?url=editar_surtidor_lado&surt_id=' + surtId + '&lado_id=' + ladoId + '">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-ticket"></i> Editar Surtidor Lado</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
                                          <div class="form-group col-md-6">\
                                            <label class="col-form-label">Surtidor :</label>\
                                            <input type="text" class="form-control" value="' + surtNombre + '" readonly>\
                                          </div>\
                                          <div class="form-group col-md-6">\
                                            <label class="col-form-label">Lado :</label>\
                                            <input type="text" class="form-control" value="Lado ' + ladoNombre + '" readonly>\
                                          </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                            <label for="listVentasDisenhoCardSurtLadoProducto" class="col-form-label">Producto :</label>\
                                            <select id="listVentasDisenhoCardSurtLadoProducto" class="form-select" ></select>\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label class="col-form-label">Añadir :</label>\
                                            <div>\
					      <button id="btnAddVentasDisenhoCardSurtLadoProducto" title="Añadir Producto" type="button" class="btn btn-social-icon btn-rounded btn-success">\
                                                <i class="fa fa-plus"></i>\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
					<div class="form-row">\
                                          <div class="table-responsive">\
                                            <table class="table">\
                                              <thead class="bg-gray-light">\
                                                <tr>\
                                                  <th scope="col" class="hide">mang_id</th>\
                                                  <th scope="col">Manguera</th>\
                                                  <th scope="col" class="hide">prod_id</th>\
                                                  <th scope="col">Producto</th>\
                                                  <th scope="col">Activo</th>\
                                                  <th scope="col">Acción</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tblVentasDisenhoCardSurtLadoMangProds"></tbody>\
                                            </table>\
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
    $('#modalVentasDisenhoCardSurtLado').append(modal);

    llenarVentasDisenhoCardSurtLadoProductos();

    var size = llenarTblVentasDisenhoCardSurtLadoMangProds(surtId, ladoId);

    $('#btnAddVentasDisenhoCardSurtLadoProducto').click(function () {
        var prodId = $('#listVentasDisenhoCardSurtLadoProducto').val();
        var prodNombre = $('#listVentasDisenhoCardSurtLadoProducto option:selected').text();
        if (llenarTblVentasDisenhoCardSurtLadoMangProdsAdd(size + 1, prodId, prodNombre)) {
            size++;
        }
    });

    eventFormVentasSurtidoresEditSurtLado();

}

function eventFormVentasSurtidoresEditSurtLado() {
    $("#formVentasSurtidoresEditSurtLado").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro quieres guardar?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formVentasSurtidoresEditSurtLado").attr("action"),
                    data: $("#formVentasSurtidoresEditSurtLado").serialize(),
                    success: function () {
                        $('#modalVentasDisenhoCardSurtLado').modal('hide');
                        $('.modal-backdrop').remove();
                        llenarVentasMatriz();
                    }
                });
            } else {
                alertify.error("Cancelado");
            }
        });
    });
}

function llenarVentasDisenhoCardSurtLadoProductos() {
    $("#listVentasDisenhoCardSurtLadoProducto").empty();
    $("#listVentasDisenhoCardSurtLadoProducto").append('<option value="" style="font-weight: 600;">--Seleccione Producto--</option>');
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_combustible",
        success: function (response) {
            $.each(response.listProductos, function (index, value) {
                var nombre, descripcion;
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    descripcion = "";
                } else {
                    descripcion = value.prodDescripcion;
                }
                var opt = "<option value=" + value.prodId + ">" + descripcion + " (" + nombre + ")</option>";
                $("#listVentasDisenhoCardSurtLadoProducto").append(opt);
            });
        }
    });
}

function llenarTblVentasDisenhoCardSurtLadoMangProds(surtId, ladoId) {
    $("#tblVentasDisenhoCardSurtLadoMangProds").empty();
    var size = 0;
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=surtidores_detalle_lado_prods&surt_id=" + surtId + "&lado_id=" + ladoId,
        success: function (response) {
            $.each(response.listDetalle, function (index, value) {
                var checked = value.sudeActivo ? "checked" : "";
                var body = '<tr id="trTblVentasDisenhoCardSurtLadoMangProds_' + value.mangId + '">\
                                <td class="hide">\
                                  <input type="text" class="form-control" name="mang_id[]" value="' + value.mangId + '">\
                                </td>\
                                <td>Manguera ' + value.mangId + '</td>\
                                <td class="hide">\
                                  <input type="text" class="form-control" name="prod_id[]" value="' + value.prodId + '">\
                                </td>\
                                <td>' + value.prodDescripcion + ' (' + value.prodNombre + ')</td>\
                                <td>\
                                  <input id="iptTblVentasDisenhoCardSurtLadoMangProds_' + value.mangId + '" type="checkbox" \
                                    name="activo_' + value.mangId + '" class="filled-in chk-col-danger" ' + checked + '>\
                                  <label for="iptTblVentasDisenhoCardSurtLadoMangProds_' + value.mangId + '"></label>\
                                </td>\
                                <td>\
                                  <button id="btnTblVentasDisenhoCardSurtLadoMangProdsRemove_' + value.mangId + '" type="button" class="btn btn-sm btn-danger" tittle="Quitar">\
                                     <i class="fa fa-times"></i>\
                                  </button>\
                                </td>\
                            </tr>';
                $('#tblVentasDisenhoCardSurtLadoMangProds').append(body);
                size++;
                $('#btnTblVentasDisenhoCardSurtLadoMangProdsRemove_' + value.mangId).click(function () {
                    $('#trTblVentasDisenhoCardSurtLadoMangProds_' + value.mangId).remove();
                    var n = $('tbody#tblVentasDisenhoCardSurtLadoMangProds tr').length;
                    var table = document.getElementById("tblVentasDisenhoCardSurtLadoMangProds");
                    var tr = table.getElementsByTagName("tr");
                    for (var i = 0; i < n; i++) {
                        var td0 = tr[i].getElementsByTagName("td")[0];
                        td0.getElementsByTagName("input")[0].setAttribute("value", (i + 1));
                        tr[i].getElementsByTagName("td")[1].innerHTML = "Manguera " + (i + 1);
                        var td4 = tr[i].getElementsByTagName("td")[4];
                        td4.getElementsByTagName("input")[0].setAttribute("name", "activo_" + (i + 1));
                    }
                });
            });
        }
    });
    return size;
}

function llenarTblVentasDisenhoCardSurtLadoMangProdsAdd(size, prodId, prodNombre) {
    var m = $('tbody#tblVentasDisenhoCardSurtLadoMangProds tr').length;
    if (prodId === "") {
        alertify.error("Debe seleccionar un producto");
        return false;
    } else if (m === 6) {
        alertify.error("No se pueden agregar más mangueras");
        return false;
    } else {
        document.getElementById("listVentasDisenhoCardSurtLadoProducto").selectedIndex = 0;
        var body = '<tr id="trTblVentasDisenhoCardSurtLadoMangProds_' + size + '">\
                        <td class="hide">\
                          <input type="text" class="form-control" name="mang_id[]" value="' + (m + 1) + '">\
                        </td>\
                        <td>Manguera ' + (m + 1) + '</td>\
                        <td class="hide">\
                          <input type="text" class="form-control" name="prod_id[]" value="' + prodId + '">\
                        </td>\
                        <td>' + prodNombre + '</td>\
                        <td>\
                          <input id="iptTblVentasDisenhoCardSurtLadoMangProds_' + size + '" type="checkbox" name="activo_' + (m + 1) + '" class="filled-in chk-col-danger" checked>\
                          <label for="iptTblVentasDisenhoCardSurtLadoMangProds_' + size + '"></label>\
                        </td>\
                        <td>\
                          <button id="btnTblVentasDisenhoCardSurtLadoMangProdsRemove_' + size + '" type="button" class="btn btn-sm btn-danger" tittle="Quitar">\
                             <i class="fa fa-times"></i>\
                          </button>\
                        </td>\
                    </tr>';
        $('#tblVentasDisenhoCardSurtLadoMangProds').append(body);
        $('#btnTblVentasDisenhoCardSurtLadoMangProdsRemove_' + size).click(function () {
            $('#trTblVentasDisenhoCardSurtLadoMangProds_' + size).remove();
            var n = $('tbody#tblVentasDisenhoCardSurtLadoMangProds tr').length;
            var table = document.getElementById("tblVentasDisenhoCardSurtLadoMangProds");
            var tr = table.getElementsByTagName("tr");
            for (var i = 0; i < n; i++) {
                var td0 = tr[i].getElementsByTagName("td")[0];
                td0.getElementsByTagName("input")[0].setAttribute("value", (i + 1));
                tr[i].getElementsByTagName("td")[1].innerHTML = "Manguera " + (i + 1);
                var td4 = tr[i].getElementsByTagName("td")[4];
                td4.getElementsByTagName("input")[0].setAttribute("name", "activo_" + (i + 1));
            }
        });
        return true;
    }
}