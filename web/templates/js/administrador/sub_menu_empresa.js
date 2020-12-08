/*
 ========================
 @author carlos santander
 ========================
 */

function llenarAdminDatosEmpresa() {
    $.ajax({
        dataType: 'json',
        url: "./Usuario?url=datos_empresa",
        success: function (response) {
            if (!$.trim(response.ruc)) {
                $("#eRuc").val("");
            } else {
                $("#eRuc").val(response.ruc);
            }
            if (!$.trim(response.razon)) {
                $("#eRazon").val("");
            } else {
                $("#eRazon").val(response.razon);
            }
            if (!$.trim(response.direccion)) {
                $("#eDireccion").val("");
            } else {
                $("#eDireccion").val(response.direccion);
            }
            if (!$.trim(response.sede)) {
                $("#eSede").val("");
            } else {
                $("#eSede").val(response.sede);
            }
            if (!$.trim(response.telefonos)) {
                $("#eTelefonos").val("");
            } else {
                $("#eTelefonos").val(response.telefonos);
            }
            if (!$.trim(response.correo)) {
                $("#eCorreo").val("");
            } else {
                $("#eCorreo").val(response.correo);
            }
            if (!$.trim(response.pagweb)) {
                $("#ePagweb").val("");
            } else {
                $("#ePagweb").val(response.pagweb);
            }
            if (!$.trim(response.repreNombres)) {
                $("#eRepre").val("");
            } else {
                $("#eRepre").val(response.repreNombres);
            }
            if (!$.trim(response.repreDNI)) {
                $("#eDNI").val("");
            } else {
                $("#eDNI").val(response.repreDNI);
            }
            if (!$.trim(response.repreCargo)) {
                $("#eCargo").val("");
            } else {
                $("#eCargo").val(response.repreCargo);
            }
            $('#eLogo').dropify({
                "messages": {
                    default: 'Arrastre una imagen o haga clic aquí',
                    replace: 'Arrastre una imagen o haga clic en reemplazar',
                    remove: 'Remover',
                    error: 'Lo sentimos, la imagen es demasiado grande'
                }
            });
            var src;
            if (!$.trim(response.urlLogo)) {
                src = "";
            } else {
                src = "./Imagen?ruta=" + response.urlLogo + "&type=" + response.logoTipo;
                $('#divAdminEmpreLogo .dropify-wrapper').addClass('has-preview');
                $('#divAdminEmpreLogo .dropify-loader').hide();
                $('#divAdminEmpreLogo .dropify-preview').show();
                $('#divAdminEmpreLogo .dropify-filename-inner').append(response.fileName);
                $('#divAdminEmpreLogo .dropify-render').append("<img src='" + src + "' style='maxheight: 400px;'></img>");
            }


            var drEvent = $('#input-file-events').dropify();
            drEvent.on('dropify.beforeClear', function (event, element) {
                return confirm("Desear borrar el archivo \"" + element.file.name + "\" ?");
            });
            drEvent.on('dropify.afterClear', function (event, element) {
                alert('Archivo borrado');
            });
            drEvent.on('dropify.errors', function (event, element) {
                console.log('Tiene errores');
            });
            var drDestroy = $('#input-file-to-destroy').dropify();
            drDestroy = drDestroy.data('dropify');
            $('#toggleDropify').on('click', function (e) {
                e.preventDefault();
                if (drDestroy.isDropified()) {
                    drDestroy.destroy();
                } else {
                    drDestroy.init();
                }
            });
        }
    });
}

function sub_menu_empresa() {

    var cont = '<div class="card">\
                  <form id="formAdminUpdateEmpresa" method="post" enctype="multipart/form-data">\
                    <div class="card-header bg-danger text-white">DATOS EMPRESA</div>\
                    <div class="card-body">\
                        <div class="form-row">\
                          <div class="form-group col-md-3">\
                            <label for="eRuc" class="col-form-label">RUC :</label>\
                            <input id="eRuc" type="text" name="ruc" class="form-control" maxlength="11" \
                            placeholder="Ingrese RUC de la empresa" onkeypress="return soloNumero(event)" required/>\
                          </div>\
                          <div class="form-group col-md-9">\
                            <label for="eRazon" class="col-form-label">Razón Social :</label>\
                            <input id="eRazon" type="text" name="razon" class="form-control" \
                            placeholder="Ingrese razón social de la empresa" required/>\
                          </div>\
                        </div>\
                        <div class="form-group">\
                          <label for="eDireccion" class="col-form-label">Dirección :</label>\
                          <input id="eDireccion" type="text" name="direccion" class="form-control" \
                          placeholder="Ingrese dirección de la empresa" required>\
                        </div>\
                        <div class="form-row">\
                          <div class="form-group col-md-6">\
                            <label for="eSede" class="col-form-label">Nombre Sede :</label>\
                            <input id="eSede" type="text" name="sede" class="form-control" \
                            placeholder="Ingrese nombre de sede de la empresa"/>\
                          </div>\
                          <div class="form-group col-md-6">\
                            <label for="eTelefonos" class="col-form-label">Teléfonos :</label>\
                            <input id="eTelefonos" type="text" name="telefonos" class="form-control" \
                            placeholder="Ingrese teléfonos de la empresa"/>\
                          </div>\
                        </div>\
                        <div class="form-row">\
                          <div class="form-group col-md-6">\
                            <label for="eCorreo" class="col-form-label">Correo Electrónico :</label>\
                            <input id="eCorreo" type="email" name="correo" class="form-control" \
                            placeholder="Ingrese correo electrónico de la empresa"/>\
                          </div>\
                          <div class="form-group col-md-6">\
                            <label for="ePagweb" class="col-form-label">Página Web :</label>\
                            <input id="ePagweb" type="text" name="pagweb" class="form-control" \
                            placeholder="Ingrese dirección de página web"/>\
                          </div>\
                        </div>\
                        <div class="form-row">\
                          <div class="form-group col-md-6">\
                            <label for="eRepre" class="col-form-label">Nombres :</label>\
                            <input id="eRepre" type="text" name="representante" class="form-control" \
                            placeholder="Ingrese nombre de representante legal"/>\
                          </div>\
                          <div class="form-group col-md-2">\
                            <label for="eDNI" class="col-form-label">DNI :</label>\
                            <input id="eDNI" type="text" name="dni" class="form-control" maxlength="8" \
                            placeholder="Ingrese DNI" onkeypress="return soloNumero(event)"/>\
                          </div>\
                          <div class="form-group col-md-4">\
                            <label for="eCargo" class="col-form-label">Cargo :</label>\
                            <input id="eCargo" type="text" name="cargo" class="form-control" \
                            placeholder="Ingrese cargo"/>\
                          </div>\
                        </div>\
                        <div id="divAdminEmpreLogo" class="form-group">\
                          <label for="eLogo" class="col-form-label">Logo de la Empresa :</label>\
                          <input id="eLogo" type="file" name="logo" class="dropify" data-max-file-size="2M" data-height="400" accept="image/*" />\
                        </div>\
                    </div>\
                    <div class="card-footer text-center">\
                        <div class="row">\
                          <div class="col">\
                            <button type="submit" class="btn btn-primary">\
                              <i class="fa fa-save"></i> Guardar\
                            </button>\
                          </div>\
                        </div>\
                    </div>\
                  </form>\
                </div>';
    $('#divMenuContenido').append(cont);

    llenarAdminDatosEmpresa();
    ventFormUpdateEmpresa();
    
}

function ventFormUpdateEmpresa() {

    $("#formAdminUpdateEmpresa").submit(function (evt) {
        var action = "./Usuario?url=update_empresa&conteo=" + $("#divAdminEmpreLogo span.dropify-render").html().length;
        $("#formAdminUpdateEmpresa").attr("action", action);
        evt.preventDefault();
        var form = new FormData($("#formAdminUpdateEmpresa")[0]);
        $.ajax({
            dataType: 'json',
            processData: false,
            url: $(this).attr("action"),
            method: "POST",
            data: form,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}