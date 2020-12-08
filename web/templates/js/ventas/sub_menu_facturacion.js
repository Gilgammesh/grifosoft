/*
 ========================
 @author carlos santander
 ========================
 */

function llenarListFacturacionFiltroTiposComprobante() {
    $("#listEFacturacionTiposComprobante").empty();
    $("#listAFacturacionTiposComprobante").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_emision",
        success: function (response) {
            $("#listEFacturacionTiposComprobante").append("<option value=todos>--TODOS--</option>");
            $("#listAFacturacionTiposComprobante").append("<option value=todos>--TODOS--</option>");
            $.each(response.listTiposEmision, function (index, value) {
                var nombre;
                if (!$.trim(value.tiemNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiemNombre;
                }
                var emis = "<option value=" + value.tiemId + ">" + nombre + "</option>";
                $("#listEFacturacionTiposComprobante").append(emis);
                $("#listAFacturacionTiposComprobante").append(emis);
            });
            llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
        }
    });
}

function sub_menu_facturacion() {

    //checkAlertStockMail();
    //checkAlertStock();

    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">FACTURACIÓN ELECTRÓNICA DE COMPROBANTES DE VENTA</div>\
                      <div class="card-body">\
                            <div class="m-b-2">\
                              <button id="btnFacturacionEmitirFactura" class="btn btn-primary" data-toggle="modal" data-target="#modalFacturacionEmitirComprobante">\
                                <span class="fa fa-file-text"></span>&nbsp;&nbsp;Emitir Factura\
                              </button>&nbsp;&nbsp;&nbsp;&nbsp;\
                              <button id="btnFacturacionEmitirBoleta" class="btn btn-primary" data-toggle="modal" data-target="#modalFacturacionEmitirComprobante">\
                                <span class="fa fa-file"></span>&nbsp;&nbsp;Emitir Boleta\
                              </button>\
                            </div>\
                            <div id="modalFacturacionEmitirComprobante" class="modal fade"></div>\
                            <ul class="nav nav-tabs customtab" role="tablist">\
                              <li class="nav-item">\
                                <a class="nav-link active show" data-toggle="tab" href="#divFacturacionTablaComprobantesEmitidos" role="tab" aria-selected="false">\
                                  <span class="hidden-sm-up"><i class="fa fa-magic"></i></span>\
                                  <span class="hidden-xs-down">COMPROBANTES EMITIDOS</span>\
                                </a>\
                              </li>\
                              <li class="nav-item">\
                                <a class="nav-link" data-toggle="tab" href="#divFacturacionTablaComprobantesAnulados" role="tab" aria-selected="false">\
                                  <span class="hidden-sm-up"><i class="fa fa-clock-o"></i></span>\
                                  <span class="hidden-xs-down">COMPROBANTES ANULADOS</span>\
                                </a>\
                              </li>\
                            </ul>\
                            <div class="tab-content m-t-2">\
                              <div class="tab-pane active show" id="divFacturacionTablaComprobantesEmitidos" role="tabpanel">\
			          <div class="form-row">\
                                    <div class="form-group col-md-2">\
                                      <label for="listEFacturacionTiposComprobante" class="col-form-label" style="font-weight: 600;">Tipo Comprobante:</label>\
                                      <select id="listEFacturacionTiposComprobante" class="form-select"></select>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="datePickEFacturacionFechaInicio" class="col-form-label" style="font-weight: 600;">Fecha Inicio:</label>\
				      <input id="datePickEFacturacionFechaInicio" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="datePickEFacturacionFechaFin" class="col-form-label" style="font-weight: 600;">Fecha Fin:</label>\
				      <input id="datePickEFacturacionFechaFin" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="listEFacturacionEstadoEnvioOse" class="col-form-label" style="font-weight: 600;">Estado Envio OSE:</label>\
                                      <select id="listEFacturacionEstadoEnvioOse" class="form-select">\
                                        <option value=todos>--TODOS--</option>\
                                        <option value=enviado>Enviado</option>\
                                        <option value=pendiente selected>Pendiente</option>\
                                        <option value=error>Error</option>\
                                      </select>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="listEFacturacionEstadoSunat" class="col-form-label" style="font-weight: 600;">Estado SUNAT:</label>\
                                      <select id="listEFacturacionEstadoSunat" class="form-select">\
                                        <option value=todos>--TODOS--</option>\
                                        <option value=true>Aceptado</option>\
                                        <option value=false>Pendiente</option>\
                                      </select>\
                                    </div>\
				  </div>\
                                  <br>\
                                  <div class="table-responsive">\
                                    <form id="formFacturacionComprobantesEmitidosEnvioOse" method="post" action="./Facturacion?url=enviar_facturacion">\
                                      <div class="form-row">\
                                        <div class="form-group col-md-3">\
					  <input type="checkbox" id="checkSelectAll" class="filled-in chk-col-danger" name="reve_id_all" checked>\
					  <label for="checkSelectAll" style="font-weight: 600;">Seleccione todos los Comprobantes</label>\
                                        </div>\
                                        <div class="form-group col-md-2">\
                                          <button id="btnFacturacionEnvioAOse" type="submit" class="btn btn-danger btn-lg" style="font-size: 15px;">\
                                            <i class="fa fa-paper-plane"></i>&nbsp;&nbsp;&nbsp;Enviar a OSE\
                                          </button>\
                                        </div>\
                                      </div>\
                                      <table id="tablaFacturacionComprobantesEmitidos" class="table table-bordered table-hover" style="width: 100%;"></table>\
                                    </form>\
                                  </div>\
                              </div>\
                              <div class="tab-pane" id="divFacturacionTablaComprobantesAnulados" role="tabpanel">\
			          <div class="form-row">\
                                    <div class="form-group col-md-2">\
                                      <label for="listAFacturacionTiposComprobante" class="col-form-label" style="font-weight: 600;">Tipo Comprobante:</label>\
                                      <select id="listAFacturacionTiposComprobante" class="form-select"></select>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="datePickAFacturacionFechaInicio" class="col-form-label" style="font-weight: 600;">Fecha Inicio:</label>\
				      <input id="datePickAFacturacionFechaInicio" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="datePickAFacturacionFechaFin" class="col-form-label" style="font-weight: 600;">Fecha Fin:</label>\
				      <input id="datePickAFacturacionFechaFin" />\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="listAFacturacionEstadoEnvioOse" class="col-form-label" style="font-weight: 600;">Estado Envio OSE:</label>\
                                      <select id="listAFacturacionEstadoEnvioOse" class="form-select">\
                                        <option value=todos>--TODOS--</option>\
                                        <option value=enviado>Enviado</option>\
                                        <option value=pendiente>Pendiente</option>\
                                        <option value=error>Error</option>\
                                      </select>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="listAFacturacionEstadoSunat" class="col-form-label" style="font-weight: 600;">Estado SUNAT:</label>\
                                      <select id="listAFacturacionEstadoSunat" class="form-select">\
                                        <option value=todos>--TODOS--</option>\
                                        <option value=true>Aceptado</option>\
                                        <option value=false>Pendiente</option>\
                                      </select>\
                                    </div>\
				  </div>\
                                  <div class="table-responsive">\
                                    <form id="formEnvioFacturacionComprobantesAnulados" method="post">\
                                      <table id="tablaFacturacionComprobantesAnulados" class="table table-bordered table-hover" style="width: 100%;"></table>\
                                    </form>\
                                  </div>\
                              </div>\
                            </div>\
                            <div id="modalFacturacionEnviando" class="modal fade">\
                              <div class="modal-dialog">\
                                <div class="modal-content border-light">\
                                  <div class="modal-body">\
                                    <div style="padding: 5px;">\
                                      <img class="img-responsive img-center" src="./templates/gif/enviando.gif" alt="Enviando...">\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>\
                            <div id="modalFacturacionCorregirComprobante" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formFacturacionCorregirComprobante" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-twitter">\
                                        <h5 class="modal-title text-white"><i class="fa fa-magic"></i> Corregir Comprobante Electrónico</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true" class="text-white">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-header bg-light">\
                                        <h5 id="lblcFactCompro" class="modal-title"></h5>\
                                      </div>\
                                      <div class="modal-body">\
                                        <div class="card bg-warning mb-3" style="color: black;">\
                                          <div class="card-body">\
                                            <i class="fa fa-warning"></i>&nbsp;\
                                            <label style="font-weight: 600;">SUGERENCIA</label>\
                                            <p id="lblcFactSuger"></p>\
                                          </div>\
                                        </div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					    <label for="datePickcFactFechaComprobante" class="col-form-label">Fecha Comprobante :</label>\
					    <input id="datePickcFactFechaComprobante" name="reve_fecha_hora" required/>\
					  </div>\
					  <div class="form-group col-md-6">\
					    <label for="listcFactTipoDoc" class="col-form-label">Tipo de Documento :</label>\
                                            <select id="listcFactTipoDoc" class="form-select" name="tido_id"></select>\
					  </div>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label id="lblcFactClieDoc" for="iptcFactClieDoc" class="col-form-label"></label>\
					     <input id="iptcFactClieDoc" type="text" name="reve_documento" class="form-control" onkeypress="return soloNumero(event)">\
					  </div>\
					  <div id="divFactBuscarDocu" class="form-group col-md-6 hide">\
					    <label class="col-form-label">&nbsp;</label>\
                                            <div>\
                                              <button id="btncFactBuscarDocu" type="button" class="btn btn-secondary" >\
                                                <span class="fa fa-search"></span>&nbsp;Buscar\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
					<div class="form-group">\
					  <label id="lblcFactClieNombre" for="iptcFactClieNombre" class="col-form-label"></label>\
                                          <input id="iptcFactClieNombre" type="text" name="reve_nombres" class="form-control">\
					</div>\
					<div class="form-group">\
					  <label for="iptcFactClieDirec" class="col-form-label">Dirección :</label>\
                                          <input id="iptcFactClieDirec" type="text" name="reve_direccion" class="form-control">\
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
                               </div>\
                            </div>\
                      </div>\
                   </div>\
                 </div>';
    $('#divMenuContenido').append(cont);

    $("#btnFacturacionEmitirFactura").click(function () {
        llenarModalFacturacionEmitirComprobante(2);
    });

    $("#btnFacturacionEmitirBoleta").click(function () {
        llenarModalFacturacionEmitirComprobante(1);
    });

    $('#modalFacturacionEnviando').modal({backdrop: 'static', keyboard: false, show: false});

    actualizarFacturacionComprobantesPendientes();
    llenarListFacturacionFiltroTiposComprobante();
    llenarFacturacionFiltroDatePickers();
    eventFormFacturacionComprobantesEmitidosEnvioOse();
    controlFacturacionFiltroComprobantesEmitidos();

}

function actualizarFacturacionComprobantesPendientes() {
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=actualizar_comprobantes_pendientes",
        success: function (response) {
            response.success;
        }
    });
}

function llenarFacturacionFiltroDatePickers() {

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var hoy = day + "/" + month + "/" + year;

    $('#datePickEFacturacionFechaInicio').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: function () {
            return $('#datePickEFacturacionFechaFin').val();
        }
    });
    $('#datePickEFacturacionFechaFin').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        minDate: function () {
            return $('#datePickEFacturacionFechaInicio').val();
        },
        maxDate: today
    });

    $('#datePickAFacturacionFechaInicio').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        maxDate: function () {
            return $('#datePickAFacturacionFechaFin').val();
        }
    });
    $('#datePickAFacturacionFechaFin').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoy,
        minDate: function () {
            return $('#datePickAFacturacionFechaInicio').val();
        },
        maxDate: today
    });

}

function eventFormFacturacionComprobantesEmitidosEnvioOse() {
    $("#formFacturacionComprobantesEmitidosEnvioOse").submit(function (evt) {
        evt.preventDefault();

        var countChecks = 0;
        $("input[name$='reve_id']").each(function () {
            if (this.checked) {
                countChecks++;
            }
        });
        if (countChecks === 0) {
            alertify.error("No hay documentos para enviar");
        } else {
            document.body.style.cursor = 'wait';
            $("#modalFacturacionEnviando").modal("show");
            $.ajax({
                dataType: 'json',
                type: 'post',
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (response) {
                    document.getElementById("listEFacturacionEstadoEnvioOse").selectedIndex = "0";
                    llenarTablaFacturacionComprobantesEmitidos("todos");
                    document.body.style.cursor = 'default';
                    $("#modalFacturacionEnviando").modal("toggle");
                }
            });
        }
    });
}

function controlFacturacionFiltroComprobantesEmitidos() {
    $("#listEFacturacionTiposComprobante").bind("change", function () {
        llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
    });
    $("#datePickEFacturacionFechaInicio").bind("change", function () {
        llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
    });
    $("#datePickEFacturacionFechaFin").bind("change", function () {
        llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
    });
    $("#listEFacturacionEstadoEnvioOse").bind("change", function () {
        llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
    });
    $("#listEFacturacionEstadoSunat").bind("change", function () {
        llenarTablaFacturacionComprobantesEmitidos($('#listEFacturacionEstadoEnvioOse').val());
    });
}

function llenarTablaFacturacionComprobantesEmitidos(estado) {

    var servlt = "./Facturacion?url=lista_comprobantes";
    var param1 = "&estado=emitido";
    var param2 = "&tiem_id=" + $("#listEFacturacionTiposComprobante").val();
    var param3 = "&fecha_ini=" + $('#datePickEFacturacionFechaInicio').val();
    var param4 = "&fecha_fin=" + $('#datePickEFacturacionFechaFin').val();
    var param5 = "&estado_envio=" + estado;
    var param6 = "&estado_sunat=" + $('#listEFacturacionEstadoSunat').val();
    var url = servlt.concat(param1, param2, param3, param4, param5, param6);

    $.ajax({
        dataType: 'json',
        url: url,
        success: function (response) {
            $("#tablaFacturacionComprobantesEmitidos").empty();
            var tabla = '<thead id="tablaFacturacionComprobantesEmitidosHead"></thead>\
                         <tbody id="tablaFacturacionComprobantesEmitidosBody"></tbody>';
            $("#tablaFacturacionComprobantesEmitidos").append(tabla);
            var mone_abreviatura = response.mone_abreviatura;
            var head = "<tr>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;' class='notexport'></th>\
                            <th style='text-align: center;'>Fecha</th>\
                            <th style='text-align: center;'>Tipo</th>\
                            <th style='text-align: center;'>Comprobante</th>\
                            <th style='text-align: center;'>Serie</th>\
                            <th style='text-align: center;'>Número</th>\
                            <th style='text-align: center;'>Cliente</th>\
                            <th style='text-align: center;'>Documento</th>\
                            <th style='text-align: center;'>Monto (" + mone_abreviatura + ")</th>\
                            <th style='text-align: center;' class='notexport'>Imprimir</th>\
                            <th style='text-align: center;'>Enviado al OSE</th>\
                            <th style='text-align: center;' class='notexport'>Enviado al OSE</th>\
                            <th style='text-align: center;'>Estado en OSE</th>\
                            <th style='text-align: center;'>Estado en SUNAT</th>\
                            <th style='text-align: center;' class='notexport'>PDF</th>\
                            <th style='text-align: center;' class='notexport'>XML</th>\
                            <th style='text-align: center; ' class='notexport'>CDR</th>\
                            <th style='text-align: center;' class='notexport'>&nbsp;&nbsp;Acciones&nbsp;&nbsp;</th>\
                        </tr>";
            $("#tablaFacturacionComprobantesEmitidosHead").append(head);
            var countReg = 0;
            $.each(response.listComprobantes, function (index, value) {
                var reveId = value.reveId;
                var check, estadoEnvioHide, estadoEnvio, acciones;
                if (value.reveEnvioOse === "enviado") {
                    check = "";
                    estadoEnvioHide = "Enviado";
                    estadoEnvio = "<span class='label label-success'>Enviado</span>";
                    acciones = "<button type='button' id='btnEFacturacionAnularComprobante_" + reveId + "' class='btn btn-social-icon btn-danger' title='Anular'>\
                                  <span class='fa fa-ban'></span>\
                                </button>";
                }
                if (value.reveEnvioOse === "pendiente") {
                    check = '<input id=' + reveId + ' type="checkbox" value=' + reveId + ' name="reve_id" class="filled-in chk-col-danger" checked>\
                             <label for=' + reveId + '></label>';
                    estadoEnvioHide = "Pendiente";
                    estadoEnvio = "<span class='label label-warning'>Pendiente</span>";
                    acciones = "";
                    countReg++;
                }
                if (value.reveEnvioOse === "error") {
                    check = '<input id=' + reveId + ' type="checkbox" value=' + reveId + ' name="reve_id" class="filled-in chk-col-danger" checked>\
                             <label for=' + reveId + '></label>';
                    estadoEnvioHide = "Error";
                    estadoEnvio = "<span class='label label-danger'>Error</span>";
                    acciones = "<button type='button' id='btnEFacturacionCorregirComprobante_" + reveId + "' class='btn btn-social-icon btn-twitter' \
                                  title='Corregir' data-toggle='modal' data-target='#modalFacturacionCorregirComprobante'>\
                                  <span class='fa fa-magic'></span>\
                                </button>";
                    countReg++;
                }
                var fechaEmision;
                if (!$.trim(value.reveFechaHora)) {
                    fechaEmision = "";
                } else {
                    fechaEmision = value.reveFechaHora;
                }
                var tipoComp;
                if (!$.trim(value.ticoNombre)) {
                    tipoComp = "";
                } else {
                    tipoComp = value.ticoNombre;
                }
                var comprobanteArray = [];
                var comprobante, serie, correl;
                if (!$.trim(value.reveNroComprobante)) {
                    comprobante = "";
                    serie = "";
                    correl = "";
                } else {
                    comprobanteArray = (value.reveNroComprobante).split("-");
                    comprobante = value.reveNroComprobante;
                    serie = comprobanteArray[0];
                    correl = comprobanteArray[1];
                }
                var cliente;
                if (!$.trim(value.reveNombres)) {
                    cliente = "";
                } else {
                    cliente = value.reveNombres;
                }
                var docum;
                if (!$.trim(value.reveDocumento)) {
                    docum = "";
                } else {
                    docum = value.reveDocumento;
                }
                var monto;
                if (!$.trim(value.revdMonto)) {
                    monto = "";
                } else {
                    monto = value.revdMonto;
                }
                var oseDesc;
                if (!$.trim(value.reveEnvioError)) {
                    oseDesc = "";
                } else {
                    oseDesc = value.reveEnvioError;
                }
                var sunatDesc;
                if (!$.trim(value.faelSunatDescripcion)) {
                    sunatDesc = "";
                } else {
                    sunatDesc = value.faelSunatDescripcion;
                }
                var pdf;
                if (!$.trim(value.faelPdf)) {
                    pdf = "";
                } else {
                    pdf = '<a target="_blank" rel="noopener noreferrer" href=' + value.faelPdf + '>\
                             <img class="img-responsive" src="./templates/img/pdf-file.png" alt="PDF">\
                           </a>';
                }
                var xml;
                if (!$.trim(value.faelXml)) {
                    xml = "";
                } else {
                    xml = '<a target="_blank" rel="noopener noreferrer" href=' + value.faelXml + '>\
                             <img class="img-responsive" src="./templates/img/xml-file.png" alt="XML">\
                           </a>';
                }
                var cdr;
                if (!$.trim(value.faelCdr)) {
                    cdr = "";
                } else {
                    cdr = '<a target="_blank" rel="noopener noreferrer" href=' + value.faelCdr + '>\
                             <img class="img-responsive" src="./templates/img/cdr-file.png" alt="CDR">\
                           </a>';
                }
                var body = "<tr>\
                                <td>" + (index + 1) + "</td>\
                                <td align='center'>" + check + "</td>\
                                <td align='center'>" + fechaEmision + "</td>\
                                <td align='left'>" + tipoComp + "</td>\
                                <td align='left'>" + comprobante + "</td>\
                                <td align='left'>" + serie + "</td>\
                                <td align='left'>" + correl + "</td>\
                                <td align='left'>" + cliente + "</td>\
                                <td align='left'>" + docum + "</td>\
                                <td align='right'>" + formatNumeroDecimal(monto) + "&nbsp;</td>\
                                <td align='center'>\
                                  <button type='button' id='btnEFacturacionImprimirComprobante_" + reveId + "' class='btn btn-social-icon btn-vk' title='Imprimir'>\
                                    <span class='fa fa-print'></span>\
                                  </button>\
                                </td>\
                                <td align='left'>" + estadoEnvioHide + "</td>\
                                <td align='center'>" + estadoEnvio + "</td>\
                                <td align='left'>" + oseDesc + "</td>\
                                <td align='left'>" + sunatDesc + "</td>\
                                <td align='center'>" + pdf + "</td>\
                                <td align='center'>" + xml + "</td>\
                                <td align='center'>" + cdr + "</td>\
                                <td align='center'>" + acciones + "</td>\
                            </tr>";
                $("#tablaFacturacionComprobantesEmitidosBody").append(body);

                $("#btnEFacturacionImprimirComprobante_" + reveId).click(function (evt) {
                    evt.preventDefault();
                    $.ajax({
                        dataType: 'json',
                        url: "./Ventas?url=impresion_registro_venta&reve_id=" + reveId,
                        success: function (response) {
                            llenarVentasRegistroVentasImpresion(response);
                        }
                    });
                });

                $("#btnEFacturacionCorregirComprobante_" + reveId).click(function (evt) {

                    evt.preventDefault();
                    var action = "./Facturacion?url=corregir_comprobante&reve_id=" + reveId + "";
                    $("#formFacturacionCorregirComprobante").attr("action", action);
                    llenarModalFacturacionCorregirComprobante(reveId);

                    $("#formFacturacionCorregirComprobante").submit(function (evt) {
                        evt.preventDefault();
                        alertify.confirm("¿Está seguro que desea guardar los cambios?", function (e) {
                            if (e) {
                                $.ajax({
                                    dataType: 'json',
                                    type: 'post',
                                    url: $("#formFacturacionCorregirComprobante").attr("action"),
                                    data: $("#formFacturacionCorregirComprobante").serialize(),
                                    success: function (response) {
                                        if (response.success) {
                                            alertify.success(response.msg);
                                            $("#modalFacturacionCorregirComprobante").modal("toggle");
                                            llenarTablaFacturacionComprobantesEmitidos("error");
                                        } else {
                                            alertify.error(response.msg);
                                        }
                                    }
                                });
                            }
                        });
                    });

                });

            });

            $('#tablaFacturacionComprobantesEmitidos').dataTable().fnDestroy();
            $('#tablaFacturacionComprobantesEmitidos').DataTable({
                dom: '<"centrar-div-tabla"lfB>rt<"centrar-div-tabla"ip>',
                columnDefs: [
                    {orderable: false, targets: [1]},
                    {visible: false, targets: [0, 4, 11]}
                ],
                buttons: [
                    {
                        extend: 'excel',
                        filename: 'lista_comprobantes_emitidos',
                        title: 'LISTA DE COMPROBANTES EMITIDOS',
                        exportOptions: {
                            columns: ':not(.notexport)'
                        }
                    }
                ]
            });

            $("#checkSelectAll").change(function () {
                if (this.checked) {
                    $("input[name$='reve_id']").prop("checked", true);
                } else {
                    $("input[name$='reve_id']").prop("checked", false);
                }
            });

            $("input[name$='reve_id']").change(function () {
                if (this.checked) {
                    var countChecks = 0;
                    $("input[name$='reve_id']").each(function () {
                        if (this.checked) {
                            countChecks++;
                        }
                    });
                    if (countChecks === countReg) {
                        $("#checkSelectAll").prop("checked", true);
                    } else {
                        $("#checkSelectAll").prop("checked", false);
                    }
                } else {
                    $("#checkSelectAll").prop("checked", false);
                }
            });

        }
    });

}

function llenarModalFacturacionCorregirComprobante(reveId) {
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=info_comprobante&reve_id=" + reveId,
        success: function (response) {
            $("#lblcFactCompro").empty();
            $("#lblcFactCompro").append(response.comprobante);
            $("#lblcFactSuger").empty();
            $("#lblcFactSuger").append(response.sugerencia);
            var today = new Date();
            $('#datePickcFactFechaComprobante').datepicker({
                locale: 'es-es',
                format: 'dd/mm/yyyy',
                uiLibrary: 'bootstrap4',
                iconsLibrary: 'fontawesome',
                value: response.fecha,
                maxDate: today
            });
            llenarListaFacturacionCorregirTipoDoc(response.tidoId);
            $("#iptcFactClieDoc").val(response.documento);
            $("#iptcFactClieNombre").val(response.nombres);
            $("#iptcFactClieDirec").val(response.direccion);

            $('#btncFactBuscarDocu').click(function (evt) {
                evt.preventDefault();
                var str1 = "./Ventas?url=buscar_registro_venta_cliente";
                var str2 = "&ticl_id=2";
                var str3 = "&tido_id=" + $("#listcFactTipoDoc").val().split("_")[0];
                var str4 = "&clie_documento=" + $("#iptcFactClieDoc").val();
                var url = str1.concat(str2, str3, str4);
                $.ajax({
                    dataType: 'json',
                    url: url,
                    success: function (responseB) {
                        if (responseB.success) {
                            $("#iptcFactClieNombre").val(responseB.clie_nombres);
                            $("#iptcFactClieDirec").val(responseB.clie_direccion);
                        } else {
                            alertify.error(responseB.msg);
                        }
                    }
                });
            });

        }
    });
}

function llenarListaFacturacionCorregirTipoDoc(tidoId) {
    $("#listcFactTipoDoc").empty();
    $.ajax({
        dataType: 'json',
        url: "./Facturacion?url=lista_tipos_documento",
        success: function (response) {
            $.each(response.listTiposDocumento, function (index, value) {
                var nombre;
                if (!$.trim(value.tidoNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tidoNombre;
                }
                var selected;
                if (value.tidoId === tidoId) {
                    selected = "selected";
                    if (value.tidoNombre.toLowerCase().includes("ruc")) {
                        $("#lblcFactClieDoc").empty();
                        $("#lblcFactClieDoc").append("RUC :");
                        $("#lblcFactClieNombre").empty();
                        $("#lblcFactClieNombre").append("Razón Social :");
                        $("#divFactBuscarDocu").removeClass("hide");
                    } else {
                        $("#lblcFactClieDoc").empty();
                        $("#lblcFactClieDoc").append("Documento :");
                        $("#lblcFactClieNombre").empty();
                        $("#lblcFactClieNombre").append("Nombres :");
                        $("#divFactBuscarDocu").addClass("hide");
                    }
                    $("#iptcFactClieDoc").attr('maxlength', value.tidoCaracteres);
                } else {
                    selected = "";
                }
                var opt = "<option value=" + value.tidoId + "_" + value.tidoCaracteres + " " + selected + ">" + nombre + "</option>";
                $("#listcFactTipoDoc").append(opt);
            });

            $("#listcFactTipoDoc").bind("change", function () {
                if ($('#listcFactTipoDoc option:selected').text().toLowerCase().includes("ruc")) {
                    $("#lblcFactClieDoc").empty();
                    $("#lblcFactClieDoc").append("RUC :");
                    $("#lblcFactClieNombre").empty();
                    $("#lblcFactClieNombre").append("Razón Social :");
                    $("#divFactBuscarDocu").removeClass("hide");
                } else {
                    $("#lblcFactClieDoc").empty();
                    $("#lblcFactClieDoc").append("Documento :");
                    $("#lblcFactClieNombre").empty();
                    $("#lblcFactClieNombre").append("Nombres :");
                    $("#divFactBuscarDocu").addClass("hide");
                }
                var array = $("#listcFactTipoDoc").val().split("_");
                $("#iptcFactClieDoc").attr('maxlength', array[1]);
            });
        }
    });
}

function llenarListaFacturacionTiposDocumento(ticl_id) {
    $("#listFacturacionTipoDocumento").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_documento&ticl_id=" + ticl_id,
        success: function (response) {
            $.each(response.listTiposDocumento, function (index, value) {
                var nombre;
                if (!$.trim(value.tidoNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tidoNombre;
                }
                var doc = "<option value=" + value.tidoId + ">" + nombre + "</option>";
                $("#listFacturacionTipoDocumento").append(doc);
            });
            $("#iptFacturacionClienteDocumento").val('');
            if (ticl_id === 1) {
                $("#divListFacturacionTipoDocumento").removeClass("hide");
                $("#iptFacturacionClienteNombres").val('Clientes Varios');
            } else {
                $("#divListFacturacionTipoDocumento").addClass("hide");
                $("#iptFacturacionClienteNombres").val('');
            }
            $("#iptFacturacionClienteDireccion").val('');

            $.ajax({
                dataType: 'json',
                url: "./TablasMaestras?url=info_tipo_documento&tido_id=" + $("#listFacturacionTipoDocumento").val(),
                success: function (responseI) {
                    llenarFacturacionDatosCliente(responseI);
                }
            });

            $("#listFacturacionTipoDocumento").bind("change", function () {
                $.ajax({
                    dataType: 'json',
                    url: "./TablasMaestras?url=info_tipo_documento&tido_id=" + $("#listFacturacionTipoDocumento").val(),
                    success: function (responseI) {
                        $("#iptFacturacionClienteDocumento").val('');
                        if (ticl_id === 1) {
                            $("#divListFacturacionTipoDocumento").removeClass("hide");
                            $("#iptFacturacionClienteNombres").val('Clientes Varios');
                        } else {
                            $("#divListFacturacionTipoDocumento").addClass("hide");
                            $("#iptFacturacionClienteNombres").val('');
                        }
                        $("#iptFacturacionClienteDireccion").val('');
                        llenarFacturacionDatosCliente(responseI);
                    }
                });
            });
        }
    });
}

function llenarFacturacionDatosCliente(responseI) {
    if (responseI.tido_id === 1) {
        $("#lblFacturacionClienteDocumento").empty();
        $("#lblFacturacionClienteDocumento").append(responseI.tido_nombre + " :");
        $("#iptFacturacionClienteDocumento").attr("placeholder", "Ingrese " + responseI.tido_nombre + " del cliente");
        $("#iptFacturacionClienteDocumento").attr('maxlength', responseI.tido_caracteres);
        $("#lblFacturacionClienteNombres").empty();
        $("#lblFacturacionClienteNombres").append("Razón Social :");
        $("#iptFacturacionClienteNombres").attr("placeholder", "Ingrese razón social del cliente");
        $("#iptFacturacionClienteNombres").val("Clientes Varios");
    } else {
        $("#lblFacturacionClienteDocumento").empty();
        $("#lblFacturacionClienteDocumento").append("Documento :");
        $("#iptFacturacionClienteDocumento").attr("placeholder", "Ingrese " + responseI.tido_nombre + " del cliente");
        $("#iptFacturacionClienteDocumento").attr('maxlength', responseI.tido_caracteres);
        $("#lblFacturacionClienteNombres").empty();
        $("#lblFacturacionClienteNombres").append("Nombres :");
        $("#iptFacturacionClienteNombres").attr("placeholder", "Ingrese nombres del cliente");
        $("#iptFacturacionClienteNombres").val("Clientes Varios");
    }
}

function controlFacturacionClienteBuscar(ticl_id) {
    $('#btnFacturacionClienteBuscarDocu').click(function (evt) {
        evt.preventDefault();
        var str1 = "./Ventas?url=buscar_registro_venta_cliente";
        var str2 = "&ticl_id=" + ticl_id;
        var str3 = "&tido_id=" + $("#listFacturacionTipoDocumento").val();
        var str4 = "&clie_documento=" + $("#iptFacturacionClienteDocumento").val();
        var url = str1.concat(str2, str3, str4);
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (response) {
                if (response.success) {
                    $("#iptFacturacionClienteNombres").val(response.clie_nombres);
                    $("#iptFacturacionClienteDireccion").val(response.clie_direccion);
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
    $('#btnFacturacionClienteBuscarClean').click(function (evt) {
        evt.preventDefault();
        $("#iptFacturacionClienteDocumento").val('');
        if (ticl_id === 1) {
            $("#iptFacturacionClienteNombres").val('Clientes Varios');
        } else {
            $("#iptFacturacionClienteNombres").val('');
        }
        $("#iptFacturacionClienteDireccion").val('');
    });
}

function llenarModalFacturacionEmitirComprobante(ticl_id) {
    $("#modalFacturacionEmitirComprobante").empty();
    var modal = '<div class="modal-dialog modal-full">\
                                  <form id="formFacturacionEmitirComprobante" method="post" action="./Facturacion?url=emitir_comprobante&ticl_id=' + ticl_id + '">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-file-text-o"></i>&nbsp;Emitir Factura</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
                                        <div id="divListFacturacionTipoDocumento" class="form-row">\
                                          <div class="form-group col-md-4">\
                                            <label for="listFacturacionTipoDocumento" class="col-form-label">Tipo de Documento :</label>\
                                            <select id="listFacturacionTipoDocumento" class="form-select" name="tido_id"></select>\
                                          </div>\
                                        </div>\
                                        <div class="form-row">\
                                          <div class="form-group col-md-1">\
                                            <label id="lblFacturacionClienteDocumento" for="iptFacturacionClienteDocumento" class="col-form-label">Documento :</label>\
                                          </div>\
                                          <div class="form-group col-md-3">\
                                            <input id="iptFacturacionClienteDocumento" type="text" name="reve_documento" class="form-control" onkeypress="return soloNumero(event)" >\
                                          </div>\
                                          <div id="divFacturacionClienteBuscar" class="col">\
                                            <button id="btnFacturacionClienteBuscarDocu" title="Buscar Cliente" type="button" class="btn btn-social-icon btn-info" >\
                                              <span class="fa fa-search"></span>\
                                            </button>\
                                            <button id="btnFacturacionClienteBuscarClean" title="Limpiar" type="button" class="btn btn-social-icon btn-secondary" >\
                                              <span class="fa fa-refresh"></span>\
                                            </button>\
                                          </div>\
                                        </div>\
                                        <div class="form-row">\
                                          <div class="form-group col-md-1">\
                                            <label id="lblFacturacionClienteNombres" for="iptFacturacionClienteNombres" class="col-form-label"></label>\
                                          </div>\
                                          <div class="form-group col-md-11">\
                                            <input id="iptFacturacionClienteNombres" type="text" name="reve_nombres" class="form-control" required >\
                                          </div>\
                                        </div>\
                                        <div class="form-row">\
                                          <div class="form-group col-md-1">\
                                            <label id="lblFacturacionClienteDireccion" for="iptFacturacionClienteDireccion" class="col-form-label">Dirección :</label>\
                                          </div>\
                                          <div class="form-group col-md-11">\
                                            <input id="iptFacturacionClienteDireccion" type="text" name="reve_direccion" class="form-control" \
                                            placeholder="Ingrese dirección del cliente" >\
                                          </div>\
                                        </div>\
					<div class="form-group" style="margin-top: 25px;">\
					  <input type="checkbox" id="iptFacturacionTipoProducto" value="true" name="esProducto" class="filled-in chk-col-danger" checked >\
					  <label for="iptFacturacionTipoProducto">Producto</label>\
					  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
					  <input type="checkbox" id="iptFacturacionTipoServicio" value="true" name="esServicio" class="filled-in chk-col-danger" >\
					  <label for="iptFacturacionTipoServicio">Servicio</label>\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-5">\
                                            <label id="lblFacturacionTipoBien" for="listFacturacionTipoBien" class="col-form-label">Producto :</label>\
                                            <select id="listFacturacionTipoBien" class="form-select" ></select>\
					  </div>\
					  <div class="form-group col-md-2">\
					    <label for="iptFacturacionCantidad" class="col-form-label">Cantidad :</label>\
					    <input id="iptFacturacionCantidad" type="text" class="form-control" \
                                            placeholder="Ingrese cantidad" onkeypress="return soloNumDecimalFour(event, this.value)" >\
					  </div>\
					  <div class="form-group col-md-2">\
					    <label for="iptFacturacionPrecioUnitario" class="col-form-label">Precio Unitario :</label>\
					    <input id="iptFacturacionPrecioUnitario" type="text" class="form-control" \
                                            placeholder="Ingrese precio unitario" onkeypress="return soloNumDecimal(event, this.value)" >\
					  </div>\
					  <div class="form-group col-md-2">\
					    <label for="iptFacturacionMonto" class="col-form-label">Monto :</label>\
					    <input id="iptFacturacionMonto" type="text" class="form-control" \
                                            placeholder="Ingrese monto" onkeypress="return soloNumDecimal(event, this.value)" >\
					  </div>\
					  <div class="form-group col-md-1">\
					    <label class="col-form-label">Añadir :</label>\
                                            <div>\
					      <button id="btnFacturacionComprobanteAddBien" title="Añadir" type="button" class="btn btn-social-icon btn-rounded btn-success">\
                                                <i class="fa fa-plus"></i>\
                                              </button>\
                                            </div>\
					  </div>\
					</div>\
                                        <div class="table-responsive">\
                                          <table id="tablaFacturacionComprobanteBienes" class="table table-hover display" style="width: 100%;">\
                                            <thead id="tablaFacturacionComprobanteBienesHead">\
                                              <tr>\
                                                <th class="hide">id</th>\
                                                <th class="hide">nombre</th>\
                                                <th id="thTablaFacturacionComprobanteBienesHeadTipo" style="text-align: center;">Producto</th>\
                                                <th style="text-align: center;">Cantidad</th>\
                                                <th class="hide">Cantidad</th>\
                                                <th style="text-align: center;">Precio Unitario</th>\
                                                <th class="hide">Precio Unitario</th>\
                                                <th style="text-align: center;">Monto</th>\
                                                <th class="hide">Monto</th>\
                                                <th style="text-align: center;">Acción</th>\
                                              </tr>\
                                            </thead>\
                                            <tbody id="tablaFacturacionComprobanteBienesBody"></tbody>\
                                            <tfoot id="tablaFacturacionComprobanteBienesFoot">\
                                              <tr>\
                                                <th class="hide"></th>\
                                                <th class="hide"></th>\
                                                <th style="text-align: center;">TOTAL</th>\
                                                <th id="tdTablaFacturacionComprobanteBienesTotalGal" style="text-align: center;">0</th>\
                                                <th class="hide"></th>\
                                                <th id="tdTablaFacturacionComprobanteBienesTotalPrecio" style="text-align: center;">0</th>\
                                                <th class="hide"></th>\
                                                <th id="tdTablaFacturacionComprobanteBienesTotalMonto" style="text-align: center;">0</th>\
                                                <th class="hide"></th>\
                                                <th style="text-align: center;"></th>\
                                              </tr>\
                                            </tfoot>\
                                          </table>\
                                        </div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="btnFacturacionEmitirComprobanteSave" type="submit" class="btn btn-primary">\
                                          <i class="fa fa-save"></i> Guardar\
                                        </button>\
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">\
                                          <i class="fa fa-ban"></i> Cerrar\
                                        </button>\
                                      </div>\
                                    </div>\
				 </form>\
                               </div>\
                              </div>';
    $("#modalFacturacionEmitirComprobante").append(modal);

    llenarListaFacturacionTiposDocumento(ticl_id);
    controlFacturacionClienteBuscar(ticl_id);
    llenarFacturacionComprobanteProductos();
    controlFacturacionTipoBien();
    eventFacturacionAddBien();

    $('#tablaFacturacionComprobanteBienes').dataTable().fnDestroy();
    $('#tablaFacturacionComprobanteBienes').dataTable({
        dom: 'rt',
        footer: true,
        pageLength: 100
    });
    $("#tablaFacturacionComprobanteBienesBody").empty();

    eventFormFacturacionEmitirComprobante();

}

function controlFacturacionTipoBien() {
    $("#iptFacturacionTipoProducto").change(function () {
        if (this.checked) {
            $("#lblFacturacionTipoBien").empty();
            $("#lblFacturacionTipoBien").append("Producto :");
            $("#iptFacturacionTipoProducto").prop("checked", true);
            $("#iptFacturacionTipoServicio").prop("checked", false);
            llenarFacturacionComprobanteProductos();
            $("#tablaFacturacionComprobanteBienesBody").empty();
        } else {
            $("#iptFacturacionTipoProducto").prop("checked", true);
            $("#iptFacturacionTipoServicio").prop("checked", false);
        }
    });
    $("#iptFacturacionTipoServicio").change(function () {
        if (this.checked) {
            $("#lblFacturacionTipoBien").empty();
            $("#lblFacturacionTipoBien").append("Servicio :");
            $("#iptFacturacionTipoServicio").prop("checked", true);
            $("#iptFacturacionTipoProducto").prop("checked", false);
            llenarFacturacionComprobanteServicios();
            $("#tablaFacturacionComprobanteBienesBody").empty();
        } else {
            $("#iptFacturacionTipoServicio").prop("checked", true);
            $("#iptFacturacionTipoProducto").prop("checked", false);
        }
    });
}

function llenarFacturacionComprobanteProductos() {
    $("#listFacturacionTipoBien").empty();
    $("#listFacturacionTipoBien").append('<option value="" style="font-weight: 600;">--Seleccione Producto--</option>');
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
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
                $("#listFacturacionTipoBien").append(opt);
            });
        }
    });
}

function llenarFacturacionComprobanteServicios() {
    $("#listFacturacionTipoBien").empty();
    $("#listFacturacionTipoBien").append('<option value="" style="font-weight: 600;">--Seleccione Servicio--</option>');
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_servicios",
        success: function (response) {
            $.each(response.listServicios, function (index, value) {
                var nombre;
                if (!$.trim(value.servNombre)) {
                    nombre = "";
                } else {
                    nombre = value.servNombre;
                }
                var opt = "<option value=" + value.servId + ">" + nombre + "</option>";
                $("#listFacturacionTipoBien").append(opt);
            });
        }
    });
}

function eventFacturacionAddBien() {
    $("#btnFacturacionComprobanteAddBien").click(function () {
        if ($("#listFacturacionTipoBien").val() === "") {
            if ($("#iptFacturacionTipoProducto").is(':checked')) {
                alertify.error("Debe elegir un producto");
            }
            if ($("#iptFacturacionTipoServicio").is(':checked')) {
                alertify.error("Debe elegir un servicio");
            }
        } else if ($("#iptFacturacionCantidad").val() === "") {
            alertify.error("Debe ingresar cantidad");
        } else if ($("#iptFacturacionPrecioUnitario").val() === "") {
            alertify.error("Debe ingresar precio unitario");
        } else if ($("#iptFacturacionMonto").val() === "") {
            alertify.error("Debe ingresar monto");
        } else {
            var body = "";
            if ($("#iptFacturacionTipoProducto").is(':checked')) {
                body = "<tr id='trAddFacturacionComprobanteBien_" + $('#listFacturacionTipoBien').val() + "'>\
                            <td class='hide'><input type='text' value=" + $('#listFacturacionTipoBien').val() + " name='prod_id'></td>\
                            <td class='hide'><input type='text' value=" + $('#listFacturacionTipoBien option:selected').text() + " name='prod_nombre'></td>\
                            <td align='center'>" + $('#listFacturacionTipoBien option:selected').text() + "</td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionCantidad').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionCantidad').val() + " name='revd_cantidad'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionPrecioUnitario').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionPrecioUnitario').val() + " name='revd_precio_unitario'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionMonto').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionMonto').val() + " name='revd_monto'></td>\
                            <td align='center'>\
                              <button id='" + $('#listFacturacionTipoBien').val() + "' type='button' title='Eliminar' class='btn btn-danger btn-sm'>\
                                <i class='fa fa-remove'></i>\
                              </button>\
                            </td>\
                        </tr>";
            }
            if ($("#iptFacturacionTipoServicio").is(':checked')) {
                body = "<tr id='trAddFacturacionComprobanteBien_" + $('#listFacturacionTipoBien').val() + "'>\
                            <td class='hide'><input type='text' value=" + $('#listFacturacionTipoBien').val() + " name='serv_id'></td>\
                            <td class='hide'><input type='text' value=" + $('#listFacturacionTipoBien option:selected').text() + " name='serv_nombre'></td>\
                            <td align='center'>" + $('#listFacturacionTipoBien option:selected').text() + "</td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionCantidad').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionCantidad').val() + " name='revd_cantidad'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionPrecioUnitario').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionPrecioUnitario').val() + " name='revd_precio_unitario'></td>\
                            <td align='center'>" + formatNumeroDecimal($('#iptFacturacionMonto').val()) + "</td>\
                            <td class='hide'><input type='text' value=" + $('#iptFacturacionMonto').val() + " name='revd_monto'></td>\
                            <td align='center'>\
                              <button id='" + $('#listFacturacionTipoBien').val() + "' type='button' title='Eliminar' class='btn btn-danger btn-sm'>\
                                <i class='fa fa-remove'></i>\
                              </button>\
                            </td>\
                        </tr>";
            }
            $("#tablaFacturacionComprobanteBienesBody").append(body);

            limpiarAddSubTotFacturacionComprobanteBien();
            limpiarAddFacturacionComprobanteBien();

            $("#tablaFacturacionComprobanteBienesBody button").click(function () {
                $("#trAddFacturacionComprobanteBien_" + this.id).remove();
                limpiarAddSubTotFacturacionComprobanteBien();
            });
        }
    });
}

function limpiarAddFacturacionComprobanteBien() {
    document.getElementById("listFacturacionTipoBien").selectedIndex = "0";
    $('#iptFacturacionCantidad').val('');
    $('#iptFacturacionPrecioUnitario').val('');
    $('#iptFacturacionMonto').val('');
}

function limpiarAddSubTotFacturacionComprobanteBien() {
    var tdTablaFacturacionComprobanteBienesTotalGal = 0.00;
    var tdTablaFacturacionComprobanteBienesTotalPrecio = 0.00;
    var tdTablaFacturacionComprobanteBienesTotalMonto = 0.00;
    $("#tdTablaFacturacionComprobanteBienesTotalGal").empty();
    $("input[name=revd_cantidad]").each(function () {
        tdTablaFacturacionComprobanteBienesTotalGal += Number(this.value);
    });
    $("#tdTablaFacturacionComprobanteBienesTotalGal").append(formatNumeroDecimal(tdTablaFacturacionComprobanteBienesTotalGal));
    $("#tdTablaFacturacionComprobanteBienesTotalPrecio").empty();
    $("input[name=revd_precio_unitario]").each(function () {
        tdTablaFacturacionComprobanteBienesTotalPrecio += Number(this.value);
    });
    $("#tdTablaFacturacionComprobanteBienesTotalPrecio").append(formatNumeroDecimal(tdTablaFacturacionComprobanteBienesTotalPrecio));
    $("#tdTablaFacturacionComprobanteBienesTotalMonto").empty();
    $("input[name=revd_monto]").each(function () {
        tdTablaFacturacionComprobanteBienesTotalMonto += Number(this.value);
    });
    $("#tdTablaFacturacionComprobanteBienesTotalMonto").append(formatNumeroDecimal(tdTablaFacturacionComprobanteBienesTotalMonto));
}

function eventFormFacturacionEmitirComprobante() {
    $("#formFacturacionEmitirComprobante").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                $('#modalFacturacionEmitirComprobante').modal('hide');
                $('body').removeClass('modal-open');
                $('div.modal-backdrop').remove();
                $('#divMenuContenido').empty();
                sub_menu_facturacion();
                imprimirFacturacionEmisionComprobante(response);
            }
        });
    });
}

function imprimirFacturacionEmisionComprobante(response) {

    var tabla_consumo = [];
    var tabla_consumoHead = [];
    tabla_consumoHead.push({text: 'CANTIDAD', style: 'tablaHead', alignment: 'center'});
    tabla_consumoHead.push({text: 'UNIDAD MEDIDA', style: 'tablaHead', alignment: 'center'});
    tabla_consumoHead.push({text: 'DESCRIPCION', style: 'tablaHead', alignment: 'center'});
    tabla_consumoHead.push({text: 'PRECIO UNITARIO', style: 'tablaHead', alignment: 'center'});
    tabla_consumoHead.push({text: 'TOTAL', style: 'tablaHead', alignment: 'center'});
    tabla_consumo.push(tabla_consumoHead);

    var totalT = 0.00;

    var mone_nombreP = response.mone_nombreP;
    var mone_nombreS = response.mone_nombreS;
    var mone_abreviatura = response.mone_abreviatura;

    var igv_abreviatura = response.igv_abreviatura;
    var igv_porcentaje = response.igv_porcentaje;
    var igv_estado = response.igv_estado;
    var tasaIgv = response.tasaIgv;
    var tipo_igv = response.tipo_igv;

    $.each(response.list, function (index, value) {
        var cantidad, unidad, descripcion, precio, total;
        if (!$.trim(value.revdCantidad)) {
            cantidad = "";
        } else {
            cantidad = formatNumeroDecimal(value.revdCantidad);
        }
        if (!$.trim(value.revdUnidadMedidaSimbolo)) {
            unidad = "";
        } else {
            unidad = value.revdUnidadMedidaSimbolo;
        }
        if (!$.trim(value.revdProducto)) {
            descripcion = "";
        } else {
            descripcion = value.revdProducto;
        }
        if (!$.trim(value.revdPrecioUnitario)) {
            precio = "";
        } else {
            precio = formatNumeroDecimal(value.revdPrecioUnitario);
        }
        if (!$.trim(value.revdMonto)) {
            total = "";
        } else {
            total = formatNumeroDecimal(value.revdMonto);
            totalT += value.revdMonto;
        }
        var tabla_consumoBody = [];
        tabla_consumoBody.push({text: cantidad, style: 'tablaBody', alignment: 'center'});
        tabla_consumoBody.push({text: unidad, style: 'tablaBody', alignment: 'center'});
        tabla_consumoBody.push({text: descripcion, style: 'tablaBody', alignment: 'center'});
        tabla_consumoBody.push({text: precio, style: 'tablaBody', alignment: 'center'});
        tabla_consumoBody.push({text: total, style: 'tablaBody', alignment: 'right'});
        tabla_consumo.push(tabla_consumoBody);
    });

    var tipo_igv_valor;
    if (igv_estado) {
        tipo_igv_valor = (totalT / tasaIgv);
    } else {
        tipo_igv_valor = totalT;
    }

    var tabla_consumoFoot1 = [];
    tabla_consumoFoot1.push({text: "TOTAL A PAGAR", colSpan: 3, style: 'tablaBodyEsp', alignment: 'right', border: [false, false, false, true]});
    tabla_consumoFoot1.push({});
    tabla_consumoFoot1.push({});
    tabla_consumoFoot1.push({text: mone_abreviatura, style: 'tablaBodyEsp', alignment: 'center', border: [false, false, false, true]});
    tabla_consumoFoot1.push({text: formatNumeroDecimal(totalT), style: 'tablaBodyEsp', alignment: 'right', border: [false, false, false, true]});
    tabla_consumo.push(tabla_consumoFoot1);

    var tabla_consumoFoot2 = [];
    tabla_consumoFoot2.push({text: tipo_igv, colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot2.push({});
    tabla_consumoFoot2.push({});
    tabla_consumoFoot2.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, false]});
    tabla_consumoFoot2.push({text: formatNumeroDecimal(tipo_igv_valor), style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumo.push(tabla_consumoFoot2);

    var tabla_consumoFoot3 = [];
    tabla_consumoFoot3.push({text: igv_abreviatura + " (" + igv_porcentaje + "%)", colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot3.push({});
    tabla_consumoFoot3.push({});
    tabla_consumoFoot3.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, false]});
    tabla_consumoFoot3.push({text: formatNumeroDecimal(totalT - tipo_igv_valor), style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumo.push(tabla_consumoFoot3);

    var tabla_consumoFoot4 = [];
    tabla_consumoFoot4.push({text: "IMPORTE TOTAL", colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, true]});
    tabla_consumoFoot4.push({});
    tabla_consumoFoot4.push({});
    tabla_consumoFoot4.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
    tabla_consumoFoot4.push({text: formatNumeroDecimal(totalT), style: 'tablaBody', alignment: 'right', border: [false, false, false, true]});
    tabla_consumo.push(tabla_consumoFoot4);

    var tabla_consumoFoot5 = [];
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
    tabla_consumo.push(tabla_consumoFoot5);

    var ruc;
    if (!$.trim(response.empr_ruc)) {
        ruc = "";
    } else {
        ruc = response.empr_ruc;
    }
    var tipo_comp;
    if (!$.trim(response.tipo_comp)) {
        tipo_comp = "";
    } else {
        tipo_comp = response.tipo_comp;
    }
    var emision_nombre = response.emision_nombre;
    var emision_serie = response.emision_serie;
    var emision_correlFormat = response.emision_correlFormat;
    var igv = formatNumeroDecimal(totalT - tipo_igv_valor);
    var monto = formatNumeroDecimal(totalT);
    var fechaE = response.fecha_emision;
    var d = new Date(fechaE),
            day = '' + (d.getMonth() + 1),
            month = '' + d.getDate(),
            year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var fechaQR = [day, month, year].join('/');

    var tipo_doc;
    if (!$.trim(response.tipo_doc)) {
        tipo_doc = "-";
    } else {
        tipo_doc = response.tipo_doc;
    }
    var docum;
    if (!$.trim(response.clie_documento)) {
        docum = "";
    } else {
        docum = response.clie_documento;
    }
    var docum_hash;
    if (!$.trim(response.clie_documento_hash)) {
        docum_hash = "-";
    } else {
        docum_hash = response.clie_documento_hash;
    }

    var codigo_hash = response.codigo_hash;

    var QR = ruc + " | " + tipo_comp + " | " + emision_serie + " | " + emision_correlFormat + " | " + igv + " | " + monto + " | " + fechaQR + " | " + tipo_doc + " | " + docum_hash + " | " + codigo_hash + " |";

    var ose_url = response.ose_url;
    var ose_resolucion = response.ose_resolucion;

    var text1 = "Representación impresa de la ";
    var text2 = emision_nombre + " Electrónica.";
    var text3 = "Visita: ";
    var text4 = ose_url;
    var text5 = "Autorizado mediante ";
    var text6 = ose_resolucion;
    var text7 = "Valor Resumen: ";
    var text8 = codigo_hash;
    var text9 = "Estimado cliente conserve su comprobante electrónico, por regulación de SUNAT es indispensable presentarlo para solicitar cambios o devoluciones";

    var clie_nombre;
    if (!$.trim(response.clie_nombre)) {
        clie_nombre = "";
    } else {
        clie_nombre = response.clie_nombre;
    }
    var clie_direccion;
    if (!$.trim(response.clie_direccion)) {
        clie_direccion = "";
    } else {
        clie_direccion = response.clie_direccion;
    }

    var empr_razon_social;
    if (!$.trim(response.empr_razon_social)) {
        empr_razon_social = "";
    } else {
        empr_razon_social = response.empr_razon_social;
    }
    var empr_direccion;
    if (!$.trim(response.empr_direccion)) {
        empr_direccion = "";
    } else {
        empr_direccion = response.empr_direccion;
    }

    if (!$.trim(response.empr_url_logo)) {
        var docDefinition = {
            pageMargins: [10, 40, 10, 10],
            content: [
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: empr_razon_social, alignment: 'center', style: 'tituloHeader'}
                            ],
                            [
                                {text: 'R.U.C. : ' + ruc, alignment: 'center', style: 'subtituloHeader'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: empr_direccion, alignment: 'center', style: 'subtituloHeader'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    text: '\n'
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: emision_nombre.toUpperCase() + " ELECTRÓNICA", alignment: 'center', style: 'titulo'}
                            ],
                            [
                                {text: emision_serie + "-" + emision_correlFormat, alignment: 'center', style: 'titulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: [70, '*'],
                        body: [
                            [
                                {text: 'Fecha de Emisión:', alignment: 'left', style: 'subtitulo'},
                                {text: fechaE, alignment: 'left', style: 'subtitulo'}
                            ],
                            [
                                {text: 'Cliente:', alignment: 'left', style: 'subtitulo'},
                                {text: clie_nombre, alignment: 'left', style: 'subtitulo'}
                            ],
                            [
                                {text: response.clie_documento_lbl + ':', alignment: 'left', style: 'subtitulo'},
                                {text: docum, alignment: 'left', style: 'subtitulo'}
                            ],
                            [
                                {text: 'Dirección:', alignment: 'left', style: 'subtitulo'},
                                {text: clie_direccion, alignment: 'left', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: [50, 50, '*', 50, 50],
                        body: tabla_consumo
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                //Numero a Letras
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: 'SON: ' + NumeroALetras(totalT, mone_nombreP, mone_nombreS), alignment: 'justified', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    text: '\n'
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {
                                    text: [
                                        text1,
                                        {text: text2, bold: true},
                                        '\n',
                                        text3,
                                        {text: text4, bold: true},
                                        '\n',
                                        text5,
                                        {text: text6, bold: true},
                                        '\n',
                                        text7,
                                        {text: text8, bold: true}
                                    ],
                                    alignment: 'center', style: 'subtitulo'
                                }
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {qr: QR, fit: 100, alignment: 'center'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: "=====================================================", alignment: 'justify', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: text9, alignment: 'justify', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {text: "=====================================================", alignment: 'justify', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                }
            ],
            styles: {
                tituloHeader: {
                    fontSize: 12,
                    bold: true
                },
                subtituloHeader: {
                    fontSize: 8
                },
                titulo: {
                    fontSize: 10,
                    bold: true
                },
                subtitulo: {
                    fontSize: 7
                },
                tablaHead: {
                    fillColor: '#E7E6E6',
                    fontSize: 7,
                    bold: true
                },
                tablaBody: {
                    fontSize: 7
                },
                tablaBodyEsp: {
                    fontSize: 7,
                    bold: true
                }
            }
        };
        pdfMake.createPdf(docDefinition).print();

    } else {
        var empr_url_logo = response.empr_url_logo;
        var empr_logo_tipo = response.empr_logo_tipo;
        var img_url = "./Imagen?ruta=" + empr_url_logo + "&type=" + empr_logo_tipo;
        convertImgToDataURLviaCanvas(img_url, function (base64Img) {
            var docDefinition = {
                pageMargins: [20, 20, 20, 20],
                content: [
                    {
                        image: base64Img.toString(),
                        width: 150,
                        alignment: 'left'
                    },
                    {
                        table: {
                            widths: ['*', 20, '*'],
                            body: [
                                [
                                    [
                                        [
                                            {text: empr_razon_social, alignment: 'left', style: 'tituloHeader'}
                                        ],
                                        [
                                            {text: 'R.U.C. : ' + ruc, alignment: 'left', style: 'subtituloHeader'}
                                        ],
                                        [
                                            {text: empr_direccion, alignment: 'left', style: 'subtituloHeader'}
                                        ]
                                    ],
                                    "",
                                    [
                                        {
                                            table: {
                                                widths: ['*'],
                                                body: [
                                                    [
                                                        {text: emision_nombre.toUpperCase() + " ELECTRÓNICA", alignment: 'center', style: 'titulo'}
                                                    ],
                                                    [
                                                        {text: emision_serie + "-" + emision_correlFormat, alignment: 'center', style: 'titulo'}
                                                    ]
                                                ]
                                            },
                                            layout: {
                                                hLineColor: 'black',
                                                vLineColor: 'black'
                                            }
                                        }
                                    ]
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: 'white',
                            vLineColor: 'white'
                        }
                    },
                    {
                        text: '\n'
                    },
                    {
                        table: {
                            widths: [80, '*'],
                            body: [
                                [
                                    {text: 'Fecha de Emisión :', alignment: 'left', style: 'subtitulo'},
                                    {text: fechaE, alignment: 'left', style: 'subtitulo'}
                                ],
                                [
                                    {text: 'Cliente :', alignment: 'left', style: 'subtitulo'},
                                    {text: clie_nombre, alignment: 'left', style: 'subtitulo'}
                                ],
                                [
                                    {text: response.clie_documento_lbl + ' :', alignment: 'left', style: 'subtitulo'},
                                    {text: docum, alignment: 'left', style: 'subtitulo'}
                                ],
                                [
                                    {text: 'Dirección :', alignment: 'left', style: 'subtitulo'},
                                    {text: clie_direccion, alignment: 'left', style: 'subtitulo'}
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: 'white',
                            vLineColor: 'white'
                        }
                    },
                    {
                        text: '\n'
                    },

                    {
                        table: {
                            widths: [50, 50, '*', 50, 50],
                            body: tabla_consumo
                        },
                        layout: {
                            hLineColor: '#ECECEC',
                            vLineColor: '#ECECEC'
                        }
                    },
                    //Numero a Letras
                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [
                                    {text: 'SON: ' + NumeroALetras(totalT, mone_nombreP, mone_nombreS), alignment: 'justified', style: 'subtitulo'}
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: 'white',
                            vLineColor: 'white'
                        }
                    },
                    {
                        text: '\n'
                    },
                    {
                        table: {
                            widths: ['*', 20, 100],
                            body: [
                                [
                                    {
                                        text: [
                                            text1,
                                            {text: text2, bold: true},
                                            '\n',
                                            text3,
                                            {text: text4, bold: true},
                                            '\n',
                                            text5,
                                            {text: text6, bold: true},
                                            '\n',
                                            text7,
                                            {text: text8, bold: true}
                                        ],
                                        alignment: 'left', style: 'subtitulo'
                                    },
                                    "",
                                    {qr: QR, fit: 85, alignment: 'center'}
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: 'white',
                            vLineColor: 'white'
                        }
                    },
                    {
                        text: '\n'
                    },
                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [
                                    {text: text9, alignment: 'justify', style: 'subtitulo'}
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: '#E7E6E6',
                            vLineColor: 'white'
                        }
                    }
                ],
                styles: {
                    tituloHeader: {
                        fontSize: 12,
                        bold: true
                    },
                    subtituloHeader: {
                        fontSize: 8
                    },
                    titulo: {
                        fontSize: 10,
                        bold: true
                    },
                    subtitulo: {
                        fontSize: 8
                    },
                    tablaHead: {
                        fillColor: '#E7E6E6',
                        fontSize: 7,
                        bold: true
                    },
                    tablaBody: {
                        fontSize: 7
                    },
                    tablaBodyEsp: {
                        fontSize: 7,
                        bold: true
                    }
                }
            };
            pdfMake.createPdf(docDefinition).print();
        });
    }

}
