/*
 ========================
 @author carlos santander
 ========================
 */

function llenarMaestrasNuevoProductosCategorias() {
    $("#nlistMaestrasProductoCateg").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_categorias",
        success: function (response) {
            $("#nlistMaestrasProductoCateg").append("<option value=''>--Seleccione Categoría--</option>");
            $.each(response.listCategorias, function (index, value) {
                var categ = "<option value=" + value.prcaId + ">" + value.prcaNombre + "</option>";
                $("#nlistMaestrasProductoCateg").append(categ);
            });
        }
    });
}

function llenarMaestrasNuevoProductosUnidades() {
    $("#nlistMaestrasProductoUnidad").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades",
        success: function (response) {
            $("#nlistMaestrasProductoUnidad").append("<option value=''>--Seleccione Unidad--</option>");
            $.each(response.listUnidades, function (index, value) {
                var nombre;
                if (!$.trim(value.unmeSimbolo)) {
                    nombre = value.unmeNombre;
                } else {
                    nombre = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                }
                var unid = "<option value=" + value.unmeId + ">" + nombre + "</option>";
                $("#nlistMaestrasProductoUnidad").append(unid);
            });
        }
    });
}

function sub_menu_productos() {

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">PRODUCTOS</div>\
                      <div class="card-body">\
                              <div class="m-b-2">\
                                <button id="btnMaestrasNuevoProducto" class="btn btn-primary" data-toggle="modal" data-target="#modalMaestrasNuevoProducto">\
                                  <span class="fa fa-flask"></span> Nuevo Producto\
                                </button>\
                              </div>\
                              <div id="modalMaestrasNuevoProducto" class="modal fade"></div>\
                              <div id="modalMaestrasEditarProducto" class="modal fade"></div>\
                              <div class="table-responsive">\
                                <table id="tablaMaestrasProductos" class="table table-bordered table-hover"></table>\
                              </div>\
                          </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    llenarMaestrasProductos();

    $("#btnMaestrasNuevoProducto").click(function () {
        llenarModalMaestrasNuevoProducto();
    });

}

function llenarModalMaestrasNuevoProducto() {
    $("#modalMaestrasNuevoProducto").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasNuevoProducto" method="post" action="./TablasMaestras?url=nuevo_producto">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-flask"></i> Nuevo Producto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="nMaestrasProductoNombre" class="col-form-label">Código o Nombre Corto Producto :</label>\
					  <input id="nMaestrasProductoNombre" type="text" name="prod_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de producto" required >\
					</div>\
					<div class="form-group">\
					  <label for="nMaestrasProductoDescripcion" class="col-form-label">Nombre Largo o Descripción Producto :</label>\
					  <textarea rows="3" id="nMaestrasProductoDescripcion" name="prod_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de producto" form="formMaestrasNuevoProducto" required />\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="nlistMaestrasProductoCateg" class="col-form-label">Categoría de Producto :</label>\
                                             <select id="nlistMaestrasProductoCateg" class="form-select" name="prca_id" required ></select>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="nlistMaestrasProductoUnidad" class="col-form-label">Unidad de Medida :</label>\
                                             <select id="nlistMaestrasProductoUnidad" class="form-select" name="unme_id" required ></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Catálogo de Productos (SUNAT) :</label>\
                                          <input id="nIptMaestrasProductoCatalogoProdSunat" type="text" name="prod_codigo_sunat" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="nIptMaestrasProductoCatalogoProdSunatSelect" type="text" class="form-control" \
                                              value="Elija Producto" disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="nIptMaestrasProductoCatalogoProdSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Producto" onkeyup="controlMaestrasNuevoUlCatalogoProdSunat()" >\
                                            </div>\
                                            <ul id="nUlMaestrasCatalogoProdSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
					<div class="form-group" style="margin-top: 25px;">\
					  <input type="checkbox" id="nMaestrasProductoEsProdGrifo" value="true" name="prod_grifo" class="filled-in chk-col-danger" >\
					  <label for="nMaestrasProductoEsProdGrifo">¿El Producto es vendido en los surtidores del Grifo?</label>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnMaestrasProductoSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasNuevoProducto").append(modal);

    llenarMaestrasNuevoProductosCategorias();
    llenarMaestrasNuevoProductosUnidades();
    llenarMaestrasNuevoProductosCatalogoProdSunat();
    eventFormMaestrasNuevoProducto();

}

function llenarMaestrasNuevoProductosCatalogoProdSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_sunat",
        success: function (response) {
            $('#nUlMaestrasCatalogoProdSunat').empty();
            $.each(response.listCatalogo, function (index, value) {
                var li = '<li>\
                            <a id="nMaestrasCatalogoProdSunat_' + value.caprId + '" href="javaScript:void(0);">\
                              ' + value.caprId + ' - ' + value.caprNombre + '\
                            </a>\
                          </li>';
                $('#nUlMaestrasCatalogoProdSunat').append(li);

                $("#nMaestrasCatalogoProdSunat_" + value.caprId).click(function () {
                    $('#nIptMaestrasProductoCatalogoProdSunat').val(value.caprId);
                    $('#nIptMaestrasProductoCatalogoProdSunatSelect').val(value.caprId + ' - ' + value.caprNombre);
                });

            });
        }
    });
}

function controlMaestrasNuevoUlCatalogoProdSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("nIptMaestrasProductoCatalogoProdSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("nUlMaestrasCatalogoProdSunat");
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

function eventFormMaestrasNuevoProducto() {
    $("#formMaestrasNuevoProducto").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalMaestrasNuevoProducto').modal('hide');
                    llenarMaestrasProductos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarMaestrasProductos() {
    $("#tablaMaestrasProductos").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
        success: function (response) {
            $("#tablaMaestrasProductos").empty();
            var tabla = '<thead id="tablaMaestrasProductosHead"></thead>\
                         <tbody id="tablaMaestrasProductosBody"></tbody>';
            $("#tablaMaestrasProductos").append(tabla);
            var head = "<tr>\
                          <th style='text-align: center;'>Id</th>\
                          <th style='text-align: center;'>Nombre</th>\
                          <th style='text-align: center;'>Descripción</th>\
                          <th style='text-align: center;'>Categoría de Producto</th>\
                          <th style='text-align: center;'>Unidad de Medida</th>\
                          <th style='text-align: center;'>Catalogo Producto (SUNAT)</th>\
                          <th style='text-align: center;'>Producto Grifo</th>\
                          <th style='text-align: center;' class='notexport'>Acción</th>\
                        </tr>";
            $("#tablaMaestrasProductosHead").append(head);
            $.each(response.listProductos, function (index, value) {
                var nombre, descripcion, categoria, unidad, catalogo, esGrifo;
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
                categoria = value.prcaNombre;
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
                if (value.prodGrifo) {
                    esGrifo = "SI";
                } else {
                    esGrifo = "NO";
                }
                var body = "";
                if (value.prodId === 0) {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + categoria + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='left'>" + catalogo + "</td>\
                                <td align='center'>" + esGrifo + "</td>\
                                <td align='center'></td>\
                            </tr>";
                } else {
                    body = "<tr>\
                                <td align='center'>" + (index + 1) + "</td>\
                                <td align='left'>" + nombre + "</td>\
                                <td align='left'>" + descripcion + "</td>\
                                <td align='left'>" + categoria + "</td>\
                                <td align='left'>" + unidad + "</td>\
                                <td align='left'>" + catalogo + "</td>\
                                <td align='center'>" + esGrifo + "</td>\
                                <td align='center'>\
                                    <button id='btnMaestrasProductoEdit" + value.prodId + "' class='btn btn-light btn-sm'\
                                      title='Editar' data-toggle='modal' data-target='#modalMaestrasEditarProducto'>\
                                      <i class='fa fa-edit'></i>\
                                    </button>\
                                    <button id='btnMaestrasProductoDelete" + value.prodId + "' title='Eliminar' class='btn btn-danger btn-sm'>\
                                      <i class='fa fa-trash'></i>\
                                    </button>\
                                </td>\
                            </tr>";
                }
                $("#tablaMaestrasProductosBody").append(body);

                $("#btnMaestrasProductoEdit" + value.prodId).click(function (evt) {
                    
                    llenarModalMaestrasEditarProducto(value.prodId);

                });

                $("#btnMaestrasProductoDelete" + value.prodId).click(function (evt) {
                    evt.preventDefault();
                    alertify.confirm("¿Está seguro que desea eliminar este producto?", function (e) {
                        if (e) {
                            $.ajax({
                                dataType: 'json',
                                url: "./TablasMaestras?url=delete_producto&prod_id=" + value.prodId + "",
                                success: function (response) {
                                    alertify.success(response.msg);
                                    llenarMaestrasProductos();
                                }
                            });
                        } else {
                            alertify.error("Cancelado");
                        }
                    });
                });

            });

            $('#tablaMaestrasProductos').dataTable().fnDestroy();

            $('#tablaMaestrasProductos').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        //footer: true,
                        filename: 'productos',
                        title: 'Lista de Productos',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });
        }
    });
}

function llenarMaestrasEditarProductosCategorias() {
    $("#elistMaestrasProductoCateg").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_categorias",
        success: function (response) {
            $("#elistMaestrasProductoCateg").append("<option value=''>--Seleccione Categoría--</option>");
            $.each(response.listCategorias, function (index, value) {
                var categ = "<option value=" + value.prcaId + ">" + value.prcaNombre + "</option>";
                $("#elistMaestrasProductoCateg").append(categ);
            });
        }
    });
}

function llenarMaestrasEditarProductosUnidades() {
    $("#elistMaestrasProductoUnidad").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_unidades",
        success: function (response) {
            $("#elistMaestrasProductoUnidad").append("<option value=''>--Seleccione Unidad--</option>");
            $.each(response.listUnidades, function (index, value) {
                var nombre;
                if (!$.trim(value.unmeSimbolo)) {
                    nombre = value.unmeNombre;
                } else {
                    nombre = value.unmeNombre + " (" + value.unmeSimbolo + ")";
                }
                var unid = "<option value=" + value.unmeId + ">" + nombre + "</option>";
                $("#elistMaestrasProductoUnidad").append(unid);
            });
        }
    });
}

function llenarModalMaestrasEditarProducto(prod_id) {
    $("#modalMaestrasEditarProducto").empty();
    var modal = '<div class="modal-dialog">\
                                  <form id="formMaestrasEditarProducto" method="post" action="./TablasMaestras?url=editar_producto&prod_id=' + prod_id + '" >\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-flask"></i> Editar Producto</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-group">\
					  <label for="eMaestrasProductoNombre" class="col-form-label">Código o Nombre Corto Producto :</label>\
					  <input id="eMaestrasProductoNombre" type="text" name="prod_nombre" class="form-control" \
                                            placeholder="Ingrese nombre de producto" required>\
					</div>\
					<div class="form-group">\
					  <label for="eMaestrasProductoDescripcion" class="col-form-label">Nombre Largo o Descripción Producto :</label>\
					  <textarea rows="3" id="eMaestrasProductoDescripcion" name="prod_descripcion" class="form-control" \
                                            placeholder="Ingrese descripción de producto" form="formMaestrasEditarProducto" />\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
                                             <label for="elistMaestrasProductoCateg" class="col-form-label">Categoría de Producto :</label>\
                                             <select id="elistMaestrasProductoCateg" class="form-select" name="prca_id"></select>\
					  </div>\
					  <div class="form-group col-md-6">\
					     <label for="elistMaestrasProductoUnidad" class="col-form-label">Unidad de Medida :</label>\
                                             <select id="elistMaestrasProductoUnidad" class="form-select" name="unme_id"></select>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label class="col-form-label">Catálogo de Productos (SUNAT) :</label>\
                                          <input id="eIptMaestrasProductoCatalogoProdSunat" type="text" name="prod_codigo_sunat" class="form-control hide">\
                                          <div class="input-group dropdown-toggle drop-no-after" style="cursor: pointer;" data-toggle="dropdown">\
                                            <input id="eIptMaestrasProductoCatalogoProdSunatSelect" type="text" class="form-control" \
                                              value="Elija Producto" disabled style="cursor: pointer;" >\
                                            <div class="input-group-addon" style="background-color: #e9ecef; cursor: pointer;">\
                                              <i class="fa fa-chevron-down"></i>\
                                            </div>\
                                          </div>\
                                          <div class="dropdown-menu">\
                                            <div class="input-group">\
                                              <div class="input-group-addon"">\
                                                  <i class="fa fa-search"></i>\
                                              </div>\
                                              <input id="eIptMaestrasProductoCatalogoProdSunatBuscar" type="text" class="form-control" \
                                                placeholder="Buscar Producto" onkeyup="controlMaestrasEditarUlCatalogoProdSunat()" >\
                                            </div>\
                                            <ul id="eUlMaestrasCatalogoProdSunat" class="ulListBoxSearch"></ul>\
                                          </div>\
					</div>\
					<div class="form-group" style="margin-top: 25px;">\
					  <input type="checkbox" id="eMaestrasProductoEsProdGrifo" value="true" name="prod_grifo" class="filled-in chk-col-danger" >\
					  <label for="eMaestrasProductoEsProdGrifo">¿El Producto es vendido en los surtidores del Grifo?</label>\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="eBtnMaestrasProductoSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>';
    $("#modalMaestrasEditarProducto").append(modal);

    llenarMaestrasEditarProductosCategorias();
    llenarMaestrasEditarProductosUnidades();
    llenarMaestrasEditarProductosCatalogoProdSunat();
    
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=info_producto&prod_id=" + prod_id,
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
            $("#eMaestrasProductoNombre").val(nombre);
            $("#eMaestrasProductoDescripcion").val(descripcion);
            document.getElementById("elistMaestrasProductoCateg").value = response.categoria;
            document.getElementById("elistMaestrasProductoUnidad").value = response.unidad;
            $("#eIptMaestrasProductoCatalogoProdSunat").val(idCata);
            $("#eIptMaestrasProductoCatalogoProdSunatSelect").val(catalogo);
            $("#eMaestrasProductoEsProdGrifo").prop("checked", response.esGrifo);
        }
    });
    
    eventFormMaestrasEditarProducto();

}

function llenarMaestrasEditarProductosCatalogoProdSunat() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos_sunat",
        success: function (response) {
            $('#eUlMaestrasCatalogoProdSunat').empty();
            $.each(response.listCatalogo, function (index, value) {
                var li = '<li>\
                            <a id="eMaestrasCatalogoProdSunat_' + value.caprId + '" href="javaScript:void(0);">\
                              ' + value.caprId + ' - ' + value.caprNombre + '\
                            </a>\
                          </li>';
                $('#eUlMaestrasCatalogoProdSunat').append(li);

                $("#eMaestrasCatalogoProdSunat_" + value.caprId).click(function () {
                    $('#eIptMaestrasProductoCatalogoProdSunat').val(value.caprId);
                    $('#eIptMaestrasProductoCatalogoProdSunatSelect').val(value.caprId + ' - ' + value.caprNombre);
                });

            });
        }
    });
}

function controlMaestrasEditarUlCatalogoProdSunat() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("eIptMaestrasProductoCatalogoProdSunatBuscar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("eUlMaestrasCatalogoProdSunat");
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

function eventFormMaestrasEditarProducto() {
    $("#formMaestrasEditarProducto").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalMaestrasEditarProducto').modal('hide');
                    llenarMaestrasProductos();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}