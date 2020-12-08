/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevoTipoVenta() {
    $("#nMaestrasTipoVentaNombre").val('');
}

function eventFormMaestrasNuevoTipoVenta() {
    $("#formMaestrasNuevoTipoVenta").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevoTipoVenta();
                    $('#modalMaestrasNuevoTipoVenta').modal('hide');
                    llenarMaestrasTiposVenta();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_tipos_venta() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">TIPOS DE VENTA</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoTipoVenta" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoTipoVenta">\
                                  <span class="fa fa-shopping-cart"></span> Nuevo Tipo Venta\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoTipoVenta" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevoTipoVenta" method="post" action="./TablasMaestras?url=nuevo_tipo_venta">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-shopping-cart"></i> Nuevo Tipo Venta</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasTipoVentaNombre" class="col-form-label">Nombre Tipo de Venta :</label>\
					  <input id="nMaestrasTipoVentaNombre" type="text" name="tive_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de venta" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasTipoVentaSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarTipoVenta" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarTipoVenta" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-shopping-cart"></i> Editar Tipo de Venta</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasTipoVentaNombre" class="col-form-label">Nombre Tipo de Venta :</label>\
					  <input id="eMaestrasTipoVentaNombre" type="text" name="tive_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de tipo de venta" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasTipoVentaSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasTiposVenta" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasTiposVenta();
    eventFormMaestrasNuevoTipoVenta();

}

function limpiarMaestrasEditarTipoVenta() {
    $("#eMaestrasTipoVentaNombre").val('');
}

function llenarMaestrasEditarTipoVentaInfo(tive_id) {
    limpiarMaestrasEditarTipoVenta();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_tipo_venta&tive_id=" + tive_id,
        success: function (response) {
            $("#eMaestrasTipoVentaNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasTiposVenta() {
    $("#tablaMaestrasTiposVenta").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_venta",
        success: function (response) {
            $("#tablaMaestrasTiposVenta").empty();
            var tabla = '<thead id="tablaMaestrasTiposVentaHead"></thead>\
                         <tbody id="tablaMaestrasTiposVentaBody"></tbody>';
            $("#tablaMaestrasTiposVenta").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasTiposVentaHead").append(head);
            $.each(response.listTiposVenta, function (index, value) {
                var nombre;
                if (!$.trim(value.tiveNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiveNombre;
                }
                var body = "";
                if (value.tiveId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasTipoVentaEdit" + value.tiveId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarTipoVenta'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasTipoVentaDelete" + value.tiveId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasTiposVentaBody").append(body);

                $("#btnMaestrasTipoVentaEdit" + value.tiveId).click(function () {

                    var action = "./TablasMaestras?url=editar_tipo_venta&tive_id=" + value.tiveId + "";
                    $("#formMaestrasEditarTipoVenta").attr("action", action);
                    llenarMaestrasEditarTipoVentaInfo(value.tiveId);

                    $("#formMaestrasEditarTipoVenta").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarTipoVenta();
                                    $('#modalMaestrasEditarTipoVenta').modal('hide');
                                    llenarMaestrasTiposVenta();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasTipoVentaDelete" + value.tiveId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar este tipo de venta?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_tipo_venta&tive_id=" + value.tiveId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasTiposVenta();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasTiposVenta').dataTable().fnDestroy();

            $('#tablaMaestrasTiposVenta').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'tipos_venta',
                        title: 'Lista de Tipos de Venta',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

