/*
 ========================
 @author carlos santander
 ========================
 */

function llenarAdminFactIgv() {
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=datos_igv",
        success: function (response) {
            if (response.igvEstado) {
                $("#iptFactIGVEstado").prop("checked", true);
            } else {
                $("#iptFactIGVEstado").prop("checked", false);
            }
            var porc;
            if (!$.trim(response.igvPorc)) {
                porc = "";
            } else {
                porc = response.igvPorc;
            }
            $("#iptFactIGVPorc").val(formatNumeroDecimal(porc));
        }
    });
}

function llenarListaAdminFactTipoIGV() {
    $("#listFactIGVTipo").empty();
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=lista_tipo_igv",
        success: function (response) {
            $.each(response.listTipoIgv, function (index, value) {
                var nombre;
                if (!$.trim(value.tigvNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tigvNombre;
                }
                var selected;
                if (value.tigvEstado) {
                    selected = "selected";
                } else {
                    selected = "";
                }
                var opt = "<option value=" + value.tigvId + " " + selected + ">" + nombre + "</option>";
                $("#listFactIGVTipo").append(opt);
            });
        }
    });
}

function llenarListaAdminFactMoneda() {
    $("#listFactMoneda").empty();
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=lista_moneda",
        success: function (response) {
            $.each(response.listMoneda, function (index, value) {
                var nombre;
                if (!$.trim(value.moneNombrePlural)) {
                    nombre = "";
                } else {
                    nombre = value.moneNombrePlural;
                    if (!$.trim(value.moneAbreviatura)) {
                        nombre += "";
                    } else {
                        nombre += " ( " + value.moneAbreviatura + " ) ";
                    }
                }
                var selected;
                if (value.moneEstado) {
                    selected = "selected";
                } else {
                    selected = "";
                }
                var opt = "<option value=" + value.moneId + " " + selected + ">" + nombre + "</option>";
                $("#listFactMoneda").append(opt);
            });
        }
    });
}

function llenarListaAdminFactSunatTrans() {
    $("#listFactSunatTrans").empty();
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=lista_sunat_transaccion",
        success: function (response) {
            $.each(response.listSunatTrans, function (index, value) {
                var nombre;
                if (!$.trim(value.sutrNombre)) {
                    nombre = "";
                } else {
                    nombre = value.sutrNombre;
                }
                var selected;
                if (value.sutrEstado) {
                    selected = "selected";
                } else {
                    selected = "";
                }
                var opt = "<option value=" + value.sutrId + " " + selected + ">" + nombre + "</option>";
                $("#listFactSunatTrans").append(opt);
            });
        }
    });
}

function sub_menu_config_factura() {

    var cont = '<div class="card">\
                  <div class="card-header bg-danger text-white">CONFIGURACIÓN DE FACTURACIÓN ELECTRÓNICA</div>\
                  <form id="formAdminUpdateFactConfig" action="./Facturacion?url=actualizar_configuracion_fact" method="post">\
                    <div class="card-body">\
                        <div class="form-group">\
                          <input id="iptFactIGVEstado" type="checkbox" name="igvEstado" class="filled-in chk-col-danger"/>&nbsp;&nbsp;\
                          <label for="iptFactIGVEstado">¿Se factura con IGV?</label>\
                        </div>\
                        <div class="form-row">\
                          <div class="form-group col-md-4">\
                            <label for="iptFactIGVPorc" class="col-form-label">Tasa o Porcentaje IGV :</label>\
                            <div class="input-group">\
                              <input id="iptFactIGVPorc" type="text" name="igvPorc" class="form-control" maxlength="6" \
                              placeholder="Ingrese porcentaje IGV" onkeypress="return soloNumDecimal(event, this.value)" required/>\
                              <span class="input-group-addon">%</span>\
                            </div>\
                          </div>\
                          <div class="form-group col-md-8">\
                            <label for="listFactIGVTipo" class="col-form-label">Tipo de IGV :</label>\
                            <select id="listFactIGVTipo" class="form-select" name="igvTipo"></select>\
                          </div>\
                        </div>\
                        <div class="form-row">\
                          <div class="form-group col-md-4">\
                            <label for="listFactMoneda" class="col-form-label">Moneda :</label>\
                            <select id="listFactMoneda" class="form-select" name="moneda"></select>\
                          </div>\
                          <div class="form-group col-md-8">\
                            <label for="listFactSunatTrans" class="col-form-label">Transacción SUNAT :</label>\
                            <select id="listFactSunatTrans" class="form-select" name="sunatTrans"></select>\
                          </div>\
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
                </div>\
                <div class="card">\
                  <div class="card-header bg-light text-bold">CORRELATIVOS DE EMISIÓN</div>\
                  <div class="card-body">\
                    <div class="table-responsive">\
                      <form id="formUpdateAdministradorCorrelativosEmision" method="post">\
                        <table id="tablaAdministradorCorrelativosEmision" class="table table-bordered table-hover"></table>\
                      </form>\
                    </div>\
                  </div>\
                </div>';
    $('#divMenuContenido').append(cont);

    llenarAdminFactIgv();
    llenarListaAdminFactTipoIGV();
    llenarListaAdminFactMoneda();
    llenarListaAdminFactSunatTrans();
    eventFormAdminUpdateFactConfig();

    llenarTablaAdministradorCorrelativosEmision();
    eventFormUpdateAdministradorCorrelativosEmision();

}

function eventFormAdminUpdateFactConfig() {
    $("#formAdminUpdateFactConfig").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formAdminUpdateFactConfig").attr("action"),
                    data: $("#formAdminUpdateFactConfig").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}

function eventFormUpdateAdministradorCorrelativosEmision() {
    $("#formUpdateAdministradorCorrelativosEmision").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formUpdateAdministradorCorrelativosEmision").attr("action"),
                    data: $("#formUpdateAdministradorCorrelativosEmision").serialize(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            llenarTablaAdministradorCorrelativosEmision();
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            }
        });
    });
}

function llenarTablaAdministradorCorrelativosEmision() {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_correlativos_emision",
        success: function (response) {
            $("#tablaAdministradorCorrelativosEmision").empty();
            var tabla = '<thead id="tablaAdministradorCorrelativosEmisionHead"></thead>\
                         <tbody id="tablaAdministradorCorrelativosEmisionBody"></tbody>';
            $("#tablaAdministradorCorrelativosEmision").append(tabla);
            head = "<tr>\
                        <th style='text-align: center;'>Id</th>\
                        <th style='text-align: center;'>Tipo Emisión</th>\
                        <th style='text-align: center;'>Sigla</th>\
                        <th style='text-align: center;'>Código de Sede</th>\
                        <th style='text-align: center;'>Número de Correlativo</th>\
                        <th style='text-align: center; width: 100px;' class='notexport'>&nbsp;&nbsp;Acción&nbsp;&nbsp;</th>\
                     </tr>";
            $("#tablaAdministradorCorrelativosEmisionHead").append(head);
            $.each(response.listCorrelativos, function (index, value) {
                var tipo, sigla, sede, correlativo;
                if (!$.trim(value.tiemNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tiemNombre;
                }
                if (!$.trim(value.coemSigla)) {
                    sigla = "";
                } else {
                    sigla = value.coemSigla;
                }
                if (!$.trim(value.coemSede)) {
                    sede = "";
                } else {
                    sede = value.coemSede;
                }
                if (!$.trim(value.coemCorrelativo)) {
                    correlativo = "";
                } else {
                    correlativo = value.coemCorrelativo;
                }
                body = "<tr id='trTablaAdministradorCorrelativosEmisionBody" + value.tiemId + "' class='tr-row-table'>\
                            <td align='center' id='" + value.tiemId + "'>" + (index + 1) + "</td>\
                            <td align='left'>" + tipo + "</td>\
                            <td align='center'>" + sigla + "</td>\
                            <td align='center'>" + sede + "</td>\
                            <td align='center'>" + correlativo + "</td>\
                            <td align='center'>\
                              <button class='btn btn-light btn-sm' title='Editar'>\
                                <i class='fa fa-edit'></i>\
                              </button>\
                            </td>\
                        </tr>";
                $("#tablaAdministradorCorrelativosEmisionBody").append(body);
            });

            $('#tablaAdministradorCorrelativosEmisionBody').on('click', 'tr.tr-row-table', function (evt) {

                evt.preventDefault();
                $('#tablaAdministradorCorrelativosEmisionBody tr.tr-row-table').removeClass('hide');
                $("#trTablaAdministradorCorrelativosEmisionBodyForm").remove();
                var array = [];
                var arrayHtml = [];
                $("#" + $(this).attr('id') + " td").each(function () {
                    array.push($(this).attr('id'));
                    arrayHtml.push($(this).text());
                });
                var actionTrForm = "./Ventas?url=upsert_correlativo_emision&tiem_id=" + array[0];
                $("#formUpdateAdministradorCorrelativosEmision").attr("action", actionTrForm);
                var input = '<tr id="trTablaAdministradorCorrelativosEmisionBodyForm" class="tr-row-editable">\
                                <td style="text-align: center;">' + arrayHtml[0] + '</td>\
                                <td style="text-align: left;">' + arrayHtml[1] + '</td>\
                                <td style="text-align: center;">\
                                  <input id="iptAdministradorCorrelativosEmisionSigla" name="coem_sigla" type="text" class="form-control" required \
                                  value="' + arrayHtml[2] + '" maxlength="4"  >\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptAdministradorCorrelativosEmisionSede" name="coem_sede" type="text" class="form-control" required \
                                  value="' + arrayHtml[3] + '" maxlength="4" >\
                                </td>\
                                <td style="text-align: center;">\
                                  <input id="iptAdministradorCorrelativosEmisionNumero" name="coem_correlativo" type="text" class="form-control" required \
                                  value="' + arrayHtml[4].replace(/,/g, '') + '" maxlength="8" onkeypress="return soloNumero(event)">\
                                </td>\
                                <td style="text-align: center;" >\
                                  <button type="submit" id="btnUpdAdministradorCorrelativosEmision" class="btn btn-success btn-sm" title="Actualizar">\
                                    <i class="fa fa-check"></i>\
                                  </button>\
                                  <button type="button" id="btnCanAdministradorCorrelativosEmision" class="btn btn-warning btn-sm" title="Cancelar" >\
                                    <i class="fa fa-remove"></i>\
                                  </button>\
                                </td>\
                             </tr>';
                $("#" + $(this).attr('id')).before(input);
                $(this).addClass('hide');

                $("#btnCanAdministradorCorrelativosEmision").click(function () {
                    $('#tablaAdministradorCorrelativosEmisionBody tr.tr-row-table').removeClass('hide');
                    $("#trTablaAdministradorCorrelativosEmisionBodyForm").remove();
                });

            });

            $('#tablaAdministradorCorrelativosEmision').dataTable().fnDestroy();
            $('#tablaAdministradorCorrelativosEmision').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_correlativos_tipos_emision',
                        title: 'LISTA DE CORRELATIVOS DE TIPOS DE EMISIÓN',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });

        }
    });
}