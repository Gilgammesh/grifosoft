/*
 ========================
 @author carlos santander
 ========================
 */

function limpiarMaestrasNuevaCategoria() {
    $("#nMaestrasCategNombre").val('');
}

function eventFormMaestrasNuevaCategoria() {
    $("#formMaestrasNuevaCategoria").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    limpiarMaestrasNuevaCategoria();
                    $('#modalMaestrasNuevaCategoria').modal('hide');
                    llenarMaestrasCategorias();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function sub_menu_categorias() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">CATEGORÍAS DE PRODUCTOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevaCategoria" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevaCategoria">\
                                  <span class="fa fa-bookmark"></span> Nueva Categoría\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevaCategoria" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasNuevaCategoria" method="post" action="./TablasMaestras?url=nueva_categoria">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-bookmark"></i> Nueva Categoría de Producto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasCategNombre" class="col-form-label">Nombre Categoría :</label>\
					  <input id="nMaestrasCategNombre" type="text" name="prca_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de categoría de producto" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasCategSave" type="submit" class="btn btn-primary">\
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
                              <div id="modalMaestrasEditarCategoria" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formMaestrasEditarCategoria" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-bookmark-o"></i> Editar Categoría de Producto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasCategNombre" class="col-form-label">Nombre Categoría :</label>\
					  <input id="eMaestrasCategNombre" type="text" name="prca_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de categoría de producto" required>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasCategSave" type="submit" class="btn btn-primary">\
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
                                <table id="tablaMaestrasCategorias" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasCategorias();
    eventFormMaestrasNuevaCategoria();

}

function limpiarMaestrasEditarCategoria() {
    $("#eMaestrasCategNombre").val('');
}

function llenarMaestrasEditarCategoriaInfo(prca_id) {
    limpiarMaestrasEditarCategoria();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_categoria&prca_id=" + prca_id,
        success: function (response) {
            $("#eMaestrasCategNombre").val(response.nombre);
        }
    });
}

function llenarMaestrasCategorias() {
    $("#tablaMaestrasCategorias").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_categorias",
        success: function (response) {
            $("#tablaMaestrasCategorias").empty();
            var tabla = '<thead id="tablaMaestrasCategoriasHead"></thead>\
                         <tbody id="tablaMaestrasCategoriasBody"></tbody>';
            $("#tablaMaestrasCategorias").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasCategoriasHead").append(head);
            $.each(response.listCategorias, function (index, value) {
                var nombre;
                if (!$.trim(value.prcaNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prcaNombre;
                }
                var body = "";
                if (value.prcaId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'></tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasCategEdit" + value.prcaId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarCategoria'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasCategDelete" + value.prcaId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasCategoriasBody").append(body);

                $("#btnMaestrasCategEdit" + value.prcaId).click(function () {

                    var action = "./TablasMaestras?url=editar_categoria&prca_id=" + value.prcaId + "";
                    $("#formMaestrasEditarCategoria").attr("action", action);
                    llenarMaestrasEditarCategoriaInfo(value.prcaId);

                    $("#formMaestrasEditarCategoria").submit(function (evt) {
                        evt.preventDefault();
                        $.ajax({
                            dataType: 'json',
                            type: 'post',
                            url: $(this).attr("action"),
                            data: $(this).serialize(),
                            success: function (response) {
                                if (response.success) {
                                    alertify.success(response.msg);
                                    limpiarMaestrasEditarCategoria();
                                    $('#modalMaestrasEditarCategoria').modal('hide');
                                    llenarMaestrasCategorias();
                                } else {
                                    alertify.error(response.msg);
                                }
                            }
                        });
                    });

                });

                $("#btnMaestrasCategDelete" + value.prcaId).click(function () {
                    alertify.confirm("¿Está seguro que desea eliminar esta categoría de producto?", function (evt) {
                        if (evt) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_categoria&prca_id=" + value.prcaId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasCategorias();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasCategorias').dataTable().fnDestroy();

            $('#tablaMaestrasCategorias').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'categoria_productos',
                        title: 'Lista de Categoría de Productos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

