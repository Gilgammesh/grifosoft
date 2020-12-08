/*
 ========================
 @author carlos santander
 ========================
 */

function llenarListaVentasRegistroVentasTurnos() {
    $("#listVentasRegistroVentasTurnos").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_turnos",
        success: function (response) {
            $.each(response.listTurnos, function (index, value) {
                var nombre, inicio, fin;
                if (!$.trim(value.turnNombre)) {
                    nombre = "";
                } else {
                    nombre = value.turnNombre;
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
                var turn = "<option value=" + value.turnId + ">" + nombre + " ( " + inicio + " - " + fin + " )</option>";
                $("#listVentasRegistroVentasTurnos").append(turn);
            });
            document.getElementById("listVentasRegistroVentasTurnos").value = response.turn_id;
        }
    });
}

function llenarListaVentasRegistroVentasTrabajadores() {
    $("#ulVentasRegistroVentasTrabajadores").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_trabajadores",
        success: function (response) {
            $.each(response.listTrabajadores, function (index, value) {
                var nombre, paterno, materno;
                if (!$.trim(value.trabNombres)) {
                    nombre = "";
                } else {
                    nombre = value.trabNombres;
                }
                if (!$.trim(value.trabApellidoPaterno)) {
                    paterno = "";
                } else {
                    paterno = value.trabApellidoPaterno;
                }
                if (!$.trim(value.trabApellidoMaterno)) {
                    materno = "";
                } else {
                    materno = value.trabApellidoMaterno;
                }
                var nombres = nombre + " " + paterno + " " + materno;
                var trab = '<li>\
                              <input id="iptVentasRegistroTrabajador_' + value.trabId + '" type="checkbox" name="trabIds" value="' + value.trabId + '" \
                                class="filled-in chk-col-danger" checked="" >&nbsp;&nbsp;\
                              <label for="iptVentasRegistroTrabajador_' + value.trabId + '" >' + nombres + '</label>\
                            </li>';
                $("#ulVentasRegistroVentasTrabajadores").append(trab);
            });
        }
    });
}

function llenarListaVentasRegistroVentasSurtidores() {
    $("#ulVentasRegistroVentasSurtidores").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_surtidores",
        success: function (response) {
            $.each(response.listSurtidores, function (index, value) {
                var nombre;
                if (!$.trim(value.surtNombre)) {
                    nombre = "";
                } else {
                    nombre = value.surtNombre;
                }
                var trab = '<li>\
                              <input id="iptVentasRegistroSurtidor_' + value.surtId + '" type="checkbox" name="surt_Ids" value="' + value.surtId + '" \
                                class="filled-in chk-col-danger" checked="" >&nbsp;&nbsp;\
                              <label for="iptVentasRegistroSurtidor_' + value.surtId + '" >' + nombre + '</label>\
                            </li>';
                $("#ulVentasRegistroVentasSurtidores").append(trab);
            });
        }
    });
}

function llenarTablaVentasRegistroVentasLecturaInicio() {
    $("#divVentasRegistroVentasLecturaInicio").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_lectura_inicio_turno",
        success: function (response) {
            if (response.vacio) {
                $("#divVentasRegistroVentasLecturaInicio").empty();
            } else {
                $("#divVentasRegistroVentasLecturaInicio").empty();
                var tabla = '<div class="table-responsive">\
                                <table id="tablaVentasRegistroVentasLecturaInicio" class="table table-hover display" style="width: 100%;">\
                                  <thead>\
                                    <tr>\
                                      <th class="hide">sude_id</th>\
                                      <th style="text-align: center;">Surtidor</th>\
                                      <th style="text-align: center;">Lado</th>\
                                      <th style="text-align: center;">Manguera</th>\
                                      <th style="text-align: center;">Producto</th>\
                                      <th style="text-align: center;">Lectura Inicial</th>\
                                    </tr>\
                                  </thead>\
                                  <tbody id="tablaVentasRegistroVentasLecturaInicioBody"></tbody>\
                                </table>\
                             </div>';
                $("#divVentasRegistroVentasLecturaInicio").append(tabla);
                $.each(response.listLecturaInicio, function (index, value) {
                    var surtidor, lado, manguera, producto, lectura;
                    if (!$.trim(value.surtNombre)) {
                        surtidor = "";
                    } else {
                        surtidor = value.surtNombre;
                    }
                    if (!$.trim(value.ladoNombre)) {
                        lado = "";
                    } else {
                        lado = value.ladoNombre;
                    }
                    if (!$.trim(value.mangNombre)) {
                        manguera = "";
                    } else {
                        manguera = value.mangNombre;
                    }
                    if (!$.trim(value.mangNombre)) {
                        manguera = "";
                    } else {
                        manguera = value.mangNombre;
                    }
                    if (!$.trim(value.prodDescripcion)) {
                        producto = "";
                    } else {
                        producto = value.prodDescripcion + " - " + value.prodNombre;
                    }
                    if (!$.trim(value.sudeLecturaApertura)) {
                        lectura = "";
                    } else {
                        lectura = formatNumeroDecimal(value.sudeLecturaApertura);
                    }
                    var body = '<tr>\
                                  <td class="hide">\
                                    <input name="sude_id" type="password" value="' + value.sudeId + '" >\
                                  </td>\
                                  <td style="text-align: left;">' + surtidor + '</td>\
                                  <td style="text-align: left;">' + lado + '</td>\
                                  <td style="text-align: left;">' + manguera + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="sude_lectura_apertura" type="text" value="' + lectura + '" \
                                    onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                </tr>';
                    $("#tablaVentasRegistroVentasLecturaInicioBody").append(body);
                });

                $('#tablaVentasRegistroVentasLecturaInicio').dataTable().fnDestroy();

                $('#tablaVentasRegistroVentasLecturaInicio').DataTable({
                    dom: 'rt',
                    paging: false,
                    ordering: false
                });
            }
        }
    });
}

function sub_menu_ventas() {

    //checkAlertStockMail();
    //checkAlertStock();

    $('#divMenuContenido').empty();
    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">REGISTRO DE VENTAS</div>\
                    <div class="card-body">\
                        <div id="divVentasRegistroInicio"></div>\
                    </div>\
                </div>';
    $('#divMenuContenido').append(cont);

    ventasValidarRegistroInicio();

}

function ventasValidarRegistroInicio() {
    $('#divVentasRegistroInicio').empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=ventas_registro_inicio",
        success: function (response) {
            if (response.vacio) {
                var cont = '<form id="formVentasRegistroVentasNuevoTurno" method="post" action="./Ventas?url=nuevo_turno&tipo=vacio">\
                                <div class="form-group">\
                                  <label class="col-form-label text-bold">Esta es la primera vez que se va a iniciar un turno.</label>\
                                </div>\
                                <div class="form-row">\
                                  <div class="form-group col-md-2">\
                                    <label for="listVentasRegistroVentasTurnos text-bold" class="col-form-label text-bold">Fecha de hoy :</label>\
                                  </div>\
                                  <div class="form-group col-md-4">\
                                    <label class="col-form-label">' + response.fecha + '</label>\
                                  </div>\
                                </div>\
                                <div class="form-row">\
                                  <div class="form-group col-md-2">\
                                    <label for="listVentasRegistroVentasTurnos text-bold" class="col-form-label text-bold">Seleccione Turno :</label>\
                                  </div>\
                                  <div class="form-group col-md-4">\
                                    <select id="listVentasRegistroVentasTurnos" class="form-select" name="turn_id" required></select>\
                                  </div>\
                                </div>\
                                <div class="form-group checktreeDiv">\
                                  <label class="col-form-label text-bold">Seleccione los trabajadores que estarán en el turno :</label>\
                                  <ul id="ulVentasRegistroVentasTrabajadores" class="checktree"></ul>\
                                </div>\
                                <div class="form-group checktreeDiv">\
                                  <label class="col-form-label text-bold">Seleccione los surtidores disponibles en este turno :</label>\
                                  <ul id="ulVentasRegistroVentasSurtidores" class="checktree"></ul>\
                                </div>\
                                <div class="form-group checktreeDiv">\
                                  <label class="col-form-label text-bold">Lecturas iniciales de surtidores :</label>\
                                </div>\
                                <div id="divVentasRegistroVentasLecturaInicio"></div>\
                                <div class="form-group">\
                                  <button type="submit" class="btn btn-success">\
                                    <i class="fa fa-tachometer"></i> Iniciar Turno\
                                  </button>\
                                </div>\
                            </form>';
                $('#divVentasRegistroInicio').append(cont);

                llenarListaVentasRegistroVentasTurnos();
                llenarListaVentasRegistroVentasTrabajadores();
                llenarListaVentasRegistroVentasSurtidores();
                llenarTablaVentasRegistroVentasLecturaInicio();
                eventFormVentasRegistroVentasNuevoTurno();

            } else {                
                llenarVentasRegistroVentas(response);
            }
        }
    });
}

function eventFormVentasRegistroVentasNuevoTurno() {
    $("#formVentasRegistroVentasNuevoTurno").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    llenarVentasRegistroVentas(response);
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarVentasRegistroVentas(response) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=insert_registro_venta",
        success: function (responseI) {
            if (responseI.success) {
                var reve_id = responseI.reve_id;
                var igv_abreviatura = responseI.igv_abreviatura;
                var igv_porcentaje = responseI.igv_porcentaje;
                var checked;
                if (responseI.igv_estado) {
                    checked = "checked";
                } else {
                    checked = "";
                }
                $('#divVentasRegistroInicio').empty();
                var cont = '<form id="formVentasRegistroVentasNuevo" method="post" \
                            action="./Ventas?url=update_registro_venta&reve_id=' + reve_id + '&tudi_id=' + response.tudi_id + '">\
                              <input id="iptVentasRegistroVentasRegVentId" type="hidden" value="' + reve_id + '" >\
                              <div class="card">\
                                <div class="card-header bg-gray-light">\
                                  <div class="row">\
                                    <div class="col-md-1">\
                                      <label class="col-form-label text-bold">TURNO :</label>\
                                    </div>\
                                    <div class="col-md-3">\
                                      <label class="col-form-label">' + response.turn_nombre + ' ( ' + response.turn_inicio + ' - ' + response.turn_fin + ' )</label>\
                                    </div>\
                                    <div class="col-md-1"></div>\
                                    <div class="col-md-1">\
                                      <label class="col-form-label text-bold">FECHA :</label>\
                                    </div>\
                                    <div class="col-md-1">\
                                      <label class="col-form-label">' + response.fecha + '</label>\
                                    </div>\
                                    <div class="col-md-1"></div>\
                                    <div class="col-md-2 hide">\
                                      <button id="btnVentasRegistroVentasCerrarTurno" type="button" class="btn btn-warning" \
                                        data-toggle="modal" data-target="#modalVentasRegistroVentasLecturaFinal">\
                                        <i class="fa fa-sign-out"></i> Cerrar Turno\
                                      </button>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="card-body">\
                                  <div class="form-group">\
                                      <label for="listVentasRegistroVentasTrabajadoresTurno" class="col-form-label">Trabajador de Turno :</label>\
                                      <select id="listVentasRegistroVentasTrabajadoresTurno" class="form-select" name="trab_id"></select>\
                                  </div>\
                                  <div class="form-row">\
                                    <div class="form-group col-md-4">\
                                      <label for="listVentasRegistroVentasTipoEmision" class="col-form-label">Tipo de Emisión :</label>\
                                      <select id="listVentasRegistroVentasTipoEmision" class="form-select" name="tiem_id"></select>\
                                    </div>\
                                    <div class="form-group col-md-4">\
                                      <label for="listVentasRegistroVentasTipoVenta" class="col-form-label">Tipo de Venta :</label>\
                                      <select id="listVentasRegistroVentasTipoVenta" class="form-select" name="tive_id"></select>\
                                    </div>\
                                    <div class="form-group col-md-4">\
                                      <label for="listVentasRegistroVentasTipoCliente" class="col-form-label">Tipo de Cliente :</label>\
                                      <select id="listVentasRegistroVentasTipoCliente" class="form-select" name="ticl_id"></select>\
                                    </div>\
                                  </div>\
                                  <div class="form-row">\
                                    <div class="form-group col-md-4">\
                                      <label for="listVentasRegistroVentasTipoDocumento" class="col-form-label">Tipo de Documento :</label>\
                                      <select id="listVentasRegistroVentasTipoDocumento" class="form-select" name="tido_id"></select>\
                                    </div>\
                                  </div>\
                                  <div class="form-row">\
                                    <div class="form-group col-md-1">\
                                      <label id="lblVentasRegistroVentasClienteDocumento" for="iptVentasRegistroVentasClienteDocumento" class="col-form-label">Documento :</label>\
                                    </div>\
                                    <div class="form-group col-md-3">\
                                      <input id="iptVentasRegistroVentasClienteDocumento" type="text" name="reve_documento" class="form-control" \
                                      placeholder="Ingrese DNI del cliente" maxlength="8" onkeypress="return soloNumero(event)" >\
                                    </div>\
                                    <div id="divVentasRegistroVentasClienteBuscar" class="col">\
                                      <button id="btnVentasRegistroVentasClienteBuscarDocu" title="Buscar Cliente" type="button" class="btn btn-social-icon btn-info" >\
                                        <span class="fa fa-search"></span>\
                                      </button>\
                                      <button id="btnVentasRegistroVentasClienteBuscarClean" title="Limpiar" type="button" class="btn btn-social-icon btn-secondary" >\
                                        <span class="fa fa-refresh"></span>\
                                      </button>\
                                      <button id="btnVentasRegistroVentasClienteBuscarClient" title="Registrar Cliente" type="button" class="btn btn-social-icon btn-dark" \
                                        data-toggle="modal" data-target="#modalVentasRegistroVentasNuevoClie" >\
                                          <span class="fa fa-users"></span>\
                                      </button>\
                                    </div>\
                                  </div>\
                                  <div class="form-row">\
                                    <div class="form-group col-md-1">\
                                      <label id="lblVentasRegistroVentasClienteNombres" for="iptVentasRegistroVentasClienteNombres" class="col-form-label">Nombres :</label>\
                                    </div>\
                                    <div class="form-group col-md-4">\
                                      <input id="iptVentasRegistroVentasClienteNombres" type="text" name="reve_nombres" class="form-control" \
                                      placeholder="Ingrese nombres del cliente" value="Clientes Varios" >\
                                    </div>\
                                    <div class="form-group col-md-1">\
                                      <label id="lblVentasRegistroVentasClienteDireccion" for="iptVentasRegistroVentasClienteDireccion" class="col-form-label">Dirección :</label>\
                                    </div>\
                                    <div class="form-group col-md-6">\
                                      <input id="iptVentasRegistroVentasClienteDireccion" type="text" name="reve_direccion" class="form-control" \
                                      placeholder="Ingrese dirección del cliente" >\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="card-body" style="border-top: 1px solid rgba(0,0,0,.125);">\
                                  <div class="form-row">\
                                    <div class="form-group col-md-4">\
                                      <label for="listVentasRegistroVentasProducto" class="col-form-label">Producto:</label>\
                                      <select id="listVentasRegistroVentasProducto" class="form-select" ></select>\
                                    </div>\
                                    <div class="form-group col-md-1">\
                                      <label for="listVentasRegistroVentasPrecios" class="col-form-label">Precio:</label>\
                                      <select id="listVentasRegistroVentasPrecios" class="form-select" ></select>\
                                    </div>\
                                    <div class="form-group col-md-1">\
                                      <label for="iptVentasRegistroVentasDescuento" class="col-form-label">Dscto(%):</label>\
                                      <input id="iptVentasRegistroVentasDescuento" type="text" class="form-control" \
                                      onkeypress="return soloNumDecimalFour(event, this.value)" readonly>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label id="lblVentasRegistroVentasUnidad" for="iptVentasRegistroVentasUnidad" class="col-form-label"></label>\
                                      <input id="iptVentasRegistroVentasUnidad" type="text" class="form-control no-updt1" \
                                      onkeypress="return soloNumDecimalRegVentaUnidad(event, this.value)" >\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <label for="iptVentasRegistroVentasMonto" class="col-form-label">Monto (S/):</label>\
                                      <input id="iptVentasRegistroVentasMonto" type="text" class="form-control no-updt2" \
                                      onkeypress="return soloNumDecimalRegVentaMonto(event, this.value)" >\
                                    </div>\
                                    <div class="form-group col-md-1 text-center">\
                                      <label class="col-form-label">Añadir:</label>\
                                      <div>\
                                          <button id="btnAddVentasRegistroVentasConsumo" title="Añadir" type="button" class="btn btn-social-icon btn-rounded btn-success">\
                                            <i class="fa fa-plus"></i>\
                                          </button>\
                                      </div>\
                                    </div>\
                                    <div class="form-group col-md-1 text-center">\
                                      <label class="col-form-label">Limpiar:</label>\
                                      <div>\
                                          <button id="btnCleanVentasRegistroVentasConsumo" title="Limpiar" type="button" class="btn btn-social-icon btn-rounded btn-secondary">\
                                            <i class="fa fa-refresh"></i>\
                                          </button>\
                                      </div>\
                                    </div>\
                                  </div>\
                                  <div class="table-responsive">\
                                    <table id="tablaVentasRegistroVentasConsumo" class="table table-hover" style="width: 100%;">\
                                      <thead id="tablaVentasRegistroVentasConsumoHead">\
                                        <tr>\
                                          <th style="text-align: center;">Producto</th>\
                                          <th style="text-align: center;">Precio Unitario (S/)</th>\
                                          <th style="text-align: center;">Descuento (%)</th>\
                                          <th style="text-align: center;">Unidad Medida</th>\
                                          <th style="text-align: center;">Cantidad</th>\
                                          <th style="text-align: center;">Monto (S/)</th>\
                                          <th style="text-align: center;">Acción</th>\
                                        </tr>\
                                      </thead>\
                                      <tbody id="tablaVentasRegistroVentasConsumoBody">\
                                        <tr>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                          <td style="text-align: center;"></td>\
                                        </tr>\
                                      </tbody>\
                                      <tfoot>\
                                        <tr>\
                                          <th colSpan="2"></th>\
                                          <th colSpan="2" style="text-align: center;">\
                                            <input type="checkbox" name="reve_igv" class="filled-in chk-col-danger" onclick="return false;" ' + checked + '>&nbsp;&nbsp;\
                                            <label>Con IGV</label>\
                                          </th>\
                                          <th class="foot-bordered foot-background" style="text-align: center;">SUB-TOTAL</th>\
                                          <th id="thVentasRegistroVentasConsumoFootSubTotalMonto" class="foot-bordered foot-background" style="text-align: right;"></th>\
                                          <th></th>\
                                        </tr>\
                                        <tr>\
                                          <th colSpan="4"></th>\
                                          <th class="foot-bordered foot-background" style="text-align: center;">' + igv_abreviatura + ' (' + igv_porcentaje + '%)</th>\
                                          <th id="thVentasRegistroVentasConsumoFootIGVMonto" class="foot-bordered foot-background" style="text-align: right;"></th>\
                                          <th></th>\
                                        </tr>\
                                        <tr>\
                                          <th colSpan="4"></th>\
                                          <th class="foot-bordered foot-background" style="text-align: center;">TOTAL</th>\
                                          <th id="thVentasRegistroVentasConsumoFootTotalMonto" class="foot-bordered foot-background" style="text-align: right;"></th>\
                                          <th></th>\
                                        </tr>\
                                      </tfoot>\
                                    </table>\
                                  </div>\
                                </div>\
                                <div class="card-body" style="border-top: 1px solid rgba(0,0,0,.125);">\
                                  <div class="form-row">\
                                    <div class="form-group col-md-1">\
                                      <label for="iptVentasRegistroVentasClienteVehiculoChofer" class="col-form-label">Chofer :</label>\
                                    </div>\
                                    <div class="form-group col-md-4">\
                                      <input id="iptVentasRegistroVentasClienteVehiculoChofer" type="text" name="reve_chofer" class="form-control" \
                                      placeholder="Ingrese nombres de chofer del vehículo" >\
                                    </div>\
                                    <div class="form-group col-md-1">\
                                      <label for="iptVentasRegistroVentasClienteVehiculoPlaca" class="col-form-label">Placa :</label>\
                                    </div>\
                                    <div class="form-group col-md-3">\
                                      <input id="iptVentasRegistroVentasClienteVehiculoPlaca" type="text" name="reve_placa" class="form-control" \
                                      placeholder="Ingrese placa del vehículo" >\
                                    </div>\
                                    <div class="form-group col-md-1">\
                                      <label for="iptVentasRegistroVentasClienteVehiculoKm" class="col-form-label">Kilometraje :</label>\
                                    </div>\
                                    <div class="form-group col-md-2">\
                                      <input id="iptVentasRegistroVentasClienteVehiculoKm" type="text" name="reve_kilometraje" class="form-control" \
                                      placeholder="Ingrese kilometraje" onkeypress="return soloNumDecimal(event, this.value)" >\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="card-footer text-center">\
                                  <div class="row">\
                                    <div class="col">\
                                      <button id="btnVentasRegistroVentasConsumoEmitir" type="submit" class="btn btn-success">\
                                        <span class="ti-server"></span> Emitir\
                                      </button>\
                                    </div>\
                                    <div class="col">\
                                      <button id="btnVentasRegistroVentasConsumoImprimir" type="button" class="btn btn-primary" disabled >\
                                        <span class="ti-printer"></span> Imprimir\
                                      </button>\
                                    </div>\
                                    <div class="col">\
                                      <button id="btnVentasRegistroVentasConsumoAnular" type="button" class="btn btn-danger" disabled >\
                                        <span class="ti-na"></span> Anular\
                                      </button>\
                                    </div>\
                                    <div class="col">\
                                      <button id="btnVentasRegistroVentasConsumoNuevo" type="button" class="btn btn-secondary">\
                                        <span class="ti-clipboard"></span> Nuevo\
                                      </button>\
                                    </div>\
                                  </div>\
                                </div>\
                              </div>\
                            </form>';
                var modal_1 = '<div id="modalVentasRegistroVentasNuevoClie" class="modal fade">\
                               <div class="modal-dialog">\
                                  <form id="formVentasRegistroVentasNuevoClie" method="post">\
                                    <div class="modal-content border-light">\
                                      <div class="modal-header bg-light">\
                                        <h5 class="modal-title"><i class="fa fa-address-card"></i> Registrar Cliente</h5>\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                          <span aria-hidden="true">&times;</span>\
                                        </button>\
                                      </div>\
                                      <div class="modal-body">\
					<div class="form-row">\
                                            <div class="form-group col-md-6">\
                                              <label for="listVentasRegistroVentasClieTipoDocumento" class="col-form-label">Tipo de Documento :</label>\
                                              <select id="listVentasRegistroVentasClieTipoDocumento" class="form-select" name="tido_id"></select>\
                                            </div>\
					    <div id="nDivVentasRegistroVentasClieDocumen" class="form-group col-md-6"></div>\
                                        </div>\
					<div id="nDivVentasRegistroVentasClieNombres" class="form-group"></div>\
					<div class="form-group">\
					  <label for="nVentasRegistroVentasClieDirec" class="col-form-label">Dirección :</label>\
					  <input id="nVentasRegistroVentasClieDirec" type="text" name="clie_direccion" class="form-control" \
                                            placeholder="Ingrese dirección de cliente" >\
					</div>\
					<div class="form-row">\
					  <div class="form-group col-md-6">\
					     <label for="nVentasRegistroVentasClieTelef" class="col-form-label">Teléfono :</label>\
					     <input id="nVentasRegistroVentasClieTelef" type="text" name="clie_telefono" class="form-control" \
                                               placeholder="Ingrese número de teléfono" />\
					  </div>\
					</div>\
					<div class="form-group">\
					     <label for="nVentasRegistroVentasClieCorreo" class="col-form-label">Correo :</label>\
					     <input id="nVentasRegistroVentasClieCorreo" type="text" name="clie_correo" class="form-control" \
                                               placeholder="Ingrese correo electrónico" />\
					</div>\
                                      </div>\
                                      <div class="modal-footer">\
                                        <button id="nBtnVentasRegistroVentasClieSave" type="submit" class="btn btn-primary">\
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

                $('#divVentasRegistroInicio').append(cont + modal_1);

                llenarListaVentasRegistroVentasTrabajadoresTurno(response.tudi_id);
                llenarListaVentasRegistroVentasTiposEmision();
                llenarListaVentasRegistroVentasTiposVenta();
                llenarListaVentasRegistroVentasTiposCliente();
                controlVentasRegistroVentasClienteBuscar();
                llenarListaVentasRegistroVentasProductos();
                controlVentasRegistroVentasConsumo();
                controlVentasRegistroVentasConsumoAdd();
                controlVentasRegistroVentasConsumoClean();
                eventFormVentasRegistroVentasNuevo();
                controlVentasRegistroVentasImprimir();
                controlVentasRegistroVentasAnular(response.tudi_id);
                controlVentasRegistroVentasNuevo(response.tudi_id, response.turn_id);

                eventFormVentasRegistroVentasNuevoClie();

                $('#tablaVentasRegistroVentasConsumo').dataTable().fnDestroy();

                $('#tablaVentasRegistroVentasConsumo').DataTable({
                    dom: 'rt',
                    paging: false,
                    ordering: false,
                    columnDefs: [
                        {width: 40, targets: 1},
                        {width: 450, targets: 2},
                        {width: 160, targets: 3},
                        {width: 110, targets: 4},
                        {width: 140, targets: 5}
                    ]
                });

                $('#tablaVentasRegistroVentasConsumo thead tr th').removeClass('sorting_asc');

            }
        }
    });
}

function eventFormVentasRegistroVentasNuevo() {
    $("#formVentasRegistroVentasNuevo").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    blockInputVentasRegistroVentas(true);
                    $('#iptVentasRegistroVentasRegVentId:hidden').val(response.reve_id);
                    llenarVentasRegistroVentasImpresion(response);
                    //checkAlertStockMail();
                    //checkAlertStock();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function controlVentasRegistroVentasImprimir() {
    $('#btnVentasRegistroVentasConsumoImprimir').click(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            url: "./Ventas?url=impresion_registro_venta&reve_id=" + $('#iptVentasRegistroVentasRegVentId:hidden').val(),
            success: function (response) {
                llenarVentasRegistroVentasImpresion(response);
            }
        });
    });
}

function llenarVentasRegistroVentasImpresion(response) {

    var tabla_consumo = [];
    var tabla_consumoHead = [];
    tabla_consumoHead.push({text: 'CANT', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
    tabla_consumoHead.push({text: 'UM', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
    tabla_consumoHead.push({text: 'DESCRIPCION', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
    tabla_consumoHead.push({text: 'PU', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
    tabla_consumoHead.push({text: 'DCTO', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
    tabla_consumoHead.push({text: 'TOTAL', style: 'tablaHead', alignment: 'center', border: [false, true, false, true]});
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
        var cantidad, unidad, descripcion, precio, descuento, total;
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
        if (!$.trim(value.revdDescuentoPrecio)) {
            descuento = "";
        } else {
            descuento = formatNumeroDecimal(value.revdDescuentoPrecio);
        }
        if (!$.trim(value.revdMonto)) {
            total = "";
        } else {
            total = formatNumeroDecimal(value.revdMonto);
            totalT += value.revdMonto;
        }
        var tabla_consumoBody = [];
        tabla_consumoBody.push({text: cantidad, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
        tabla_consumoBody.push({text: unidad, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
        tabla_consumoBody.push({text: descripcion, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
        tabla_consumoBody.push({text: precio, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
        tabla_consumoBody.push({text: descuento, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
        tabla_consumoBody.push({text: total, style: 'tablaBody', alignment: 'right', border: [false, false, false, true]});
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
    tabla_consumoFoot1.push({text: formatNumeroDecimal(totalT), colSpan: 2, style: 'tablaBodyEsp', alignment: 'right', border: [false, false, false, true]});
    tabla_consumoFoot1.push({});
    tabla_consumo.push(tabla_consumoFoot1);

    var tabla_consumoFoot2 = [];
    tabla_consumoFoot2.push({text: tipo_igv, colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot2.push({});
    tabla_consumoFoot2.push({});
    tabla_consumoFoot2.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, false]});
    tabla_consumoFoot2.push({text: formatNumeroDecimal(tipo_igv_valor), colSpan: 2, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot2.push({});
    tabla_consumo.push(tabla_consumoFoot2);

    var tabla_consumoFoot3 = [];
    tabla_consumoFoot3.push({text: igv_abreviatura + " (" + igv_porcentaje + "%)", colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot3.push({});
    tabla_consumoFoot3.push({});
    tabla_consumoFoot3.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, false]});
    tabla_consumoFoot3.push({text: formatNumeroDecimal(totalT - tipo_igv_valor), colSpan: 2, style: 'tablaBody', alignment: 'right', border: [false, false, false, false]});
    tabla_consumoFoot3.push({});
    tabla_consumo.push(tabla_consumoFoot3);

    var tabla_consumoFoot4 = [];
    tabla_consumoFoot4.push({text: "IMPORTE TOTAL", colSpan: 3, style: 'tablaBody', alignment: 'right', border: [false, false, false, true]});
    tabla_consumoFoot4.push({});
    tabla_consumoFoot4.push({});
    tabla_consumoFoot4.push({text: mone_abreviatura, style: 'tablaBody', alignment: 'center', border: [false, false, false, true]});
    tabla_consumoFoot4.push({text: formatNumeroDecimal(totalT), colSpan: 2, style: 'tablaBody', alignment: 'right', border: [false, false, false, true]});
    tabla_consumoFoot4.push({});
    tabla_consumo.push(tabla_consumoFoot4);

    var tabla_consumoFoot5 = [];
    tabla_consumoFoot5.push({text: '', border: [false, false, false, false]});
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
    var clie_placa;
    if (!$.trim(response.clie_placa)) {
        clie_placa = "";
    } else {
        clie_placa = response.clie_placa;
    }
    var clie_chofer;
    if (!$.trim(response.clie_chofer)) {
        clie_chofer = "";
    } else {
        clie_chofer = response.clie_chofer;
    }
    var clie_kilometraje;
    if (!$.trim(response.clie_kilometraje)) {
        clie_kilometraje = "";
    } else {
        clie_kilometraje = response.clie_kilometraje;
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
            pageSize: {
                width: 220,
                height: 820
            },
            pageMargins: [5, 10, 5, 10],
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
                        widths: [60, '*'],
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
                            ],
                            [
                                {text: 'Placa Vehículo:', alignment: 'left', style: 'subtitulo'},
                                {text: clie_placa, alignment: 'left', style: 'subtitulo'}
                            ],
                            [
                                {text: 'Chofer:', alignment: 'left', style: 'subtitulo'},
                                {text: clie_chofer, alignment: 'left', style: 'subtitulo'}
                            ],
                            [
                                {text: 'Kilometraje:', alignment: 'left', style: 'subtitulo'},
                                {text: clie_kilometraje, alignment: 'left', style: 'subtitulo'}
                            ]
                        ]
                    },
                    layout: {
                        hLineColor: 'white',
                        vLineColor: 'white'
                    }
                },
                {
                    style: 'tableConsumo',
                    table: {
                        headerRows: 1,
                        body: tabla_consumo
                    },
                    layout: {
                        hLineColor: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? '#808080' : '#E4E4E4';
                        }
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
                },
                tableConsumo: {
                    margin: [5, 5, 5, 5]
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
                pageSize: {
                    width: 220,
                    height: 820
                },
                pageMargins: [5, 10, 5, 10],
                content: [
                    {
                        image: base64Img.toString(),
                        width: 150,
                        alignment: 'center'
                    },
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
                            widths: [60, '*'],
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
                                ],
                                [
                                    {text: 'Placa Vehículo:', alignment: 'left', style: 'subtitulo'},
                                    {text: clie_placa, alignment: 'left', style: 'subtitulo'}
                                ],
                                [
                                    {text: 'Chofer:', alignment: 'left', style: 'subtitulo'},
                                    {text: clie_chofer, alignment: 'left', style: 'subtitulo'}
                                ],
                                [
                                    {text: 'Kilometraje:', alignment: 'left', style: 'subtitulo'},
                                    {text: clie_kilometraje, alignment: 'left', style: 'subtitulo'}
                                ]
                            ]
                        },
                        layout: {
                            hLineColor: 'white',
                            vLineColor: 'white'
                        }
                    },
                    {
                        style: 'tableConsumo',
                        table: {
                            headerRows: 1,
                            body: tabla_consumo
                        },
                        layout: {
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? '#808080' : '#E4E4E4';
                            }
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
                    },
                    tableConsumo: {
                        margin: [5, 5, 5, 5]
                    }
                }
            };
            pdfMake.createPdf(docDefinition).print();
        });
    }

}

function controlVentasRegistroVentasAnular(tudi_id) {
    $('#btnVentasRegistroVentasConsumoAnular').one("click", function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea anular este registro de venta?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=anular_registro_venta&reve_id=" + $('#iptVentasRegistroVentasRegVentId:hidden').val(),
                    success: function (response) {
                        if (response.success) {
                            alertify.success(response.msg);
                            $('#iptVentasRegistroVentasRegVentId:hidden').val(response.new_reve_id);
                            var action = './Ventas?url=update_registro_venta&reve_id=' + $('#iptVentasRegistroVentasRegVentId:hidden').val() + '&tudi_id=' + tudi_id;
                            $("#formVentasRegistroVentasNuevo").attr("action", action);
                            blockInputVentasRegistroVentas(false);
                            llenarTablaVentasRegistroVentasConsumoBody(response, $('#iptVentasRegistroVentasRegVentId:hidden').val());
                            $('#btnVentasRegistroVentasConsumoEmitir').empty();
                            $('#btnVentasRegistroVentasConsumoEmitir').append('<span class="ti-server"></span> Volver a Emitir');
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            } else {
                alertify.error("Cancelado");
            }
        });
    });

}

function controlVentasRegistroVentasNuevo(tudi_id, turn_id) {
    $('#btnVentasRegistroVentasConsumoNuevo').one("click", function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            url: "./Ventas?url=nuevo_registro_venta&tudi_id=" + tudi_id + "&turn_id=" + turn_id,
            success: function (response) {
                llenarVentasRegistroVentas(response);
            }
        });
    });
}

function blockInputVentasRegistroVentas(estado) {

    $('#listVentasRegistroVentasTrabajadoresTurno').prop('disabled', estado);
    $('#listVentasRegistroVentasTipoEmision').prop('disabled', estado);
    $('#listVentasRegistroVentasTipoVenta').prop('disabled', estado);
    $('#listVentasRegistroVentasTipoCliente').prop('disabled', estado);
    $('#listVentasRegistroVentasTipoDocumento').prop('disabled', estado);
    $('#iptVentasRegistroVentasClienteDocumento').prop('disabled', estado);
    $('#iptVentasRegistroVentasClienteNombres').prop('disabled', estado);
    $('#iptVentasRegistroVentasClienteDireccion').prop('disabled', estado);

    $('#btnVentasRegistroVentasClienteBuscarDocu').prop('disabled', estado);
    $('#btnVentasRegistroVentasClienteBuscarClean').prop('disabled', estado);
    $('#btnVentasRegistroVentasClienteBuscarClient').prop('disabled', estado);

    //$('#listVentasRegistroVentasSurtidor').prop('disabled', estado);
    //$('#listVentasRegistroVentasLado').prop('disabled', estado);
    $('#listVentasRegistroVentasProducto').prop('disabled', estado);
    $('#listVentasRegistroVentasPrecios').prop('disabled', estado);
    $('#iptVentasRegistroVentasDescuento').prop('disabled', estado);
    $('#iptVentasRegistroVentasUnidad').prop('disabled', estado);
    $('#iptVentasRegistroVentasMonto').prop('disabled', estado);
    $('#btnAddVentasRegistroVentasConsumo').prop('disabled', estado);
    $('#btnCleanVentasRegistroVentasConsumo').prop('disabled', estado);
    $('#tablaVentasRegistroVentasConsumoBody tr button').prop('disabled', estado);

    $('#iptVentasRegistroVentasClienteVehiculoChofer').prop('disabled', estado);
    $('#iptVentasRegistroVentasClienteVehiculoPlaca').prop('disabled', estado);
    $('#iptVentasRegistroVentasClienteVehiculoKm').prop('disabled', estado);

    $('#btnVentasRegistroVentasConsumoEmitir').prop('disabled', estado);
    $('#btnVentasRegistroVentasConsumoImprimir').prop('disabled', !estado);
    $('#btnVentasRegistroVentasConsumoAnular').prop('disabled', !estado);

}

function llenarListaVentasRegistroVentasTrabajadoresTurno(tudi_id) {
    $("#listVentasRegistroVentasTrabajadoresTurno").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_trabajadores_turno&tudi_id=" + tudi_id,
        success: function (response) {
            $.each(response.listTrabajadoresTurno, function (index, value) {
                var nombres = value.trabNombres + " " + value.trabApellidoPaterno + " " + value.trabApellidoMaterno;
                var trab = "<option value=" + value.trabId + ">" + nombres + "</option>";
                $("#listVentasRegistroVentasTrabajadoresTurno").append(trab);
            });
        }
    });
}

function llenarListaVentasRegistroVentasTiposEmision() {
    $("#listVentasRegistroVentasTipoEmision").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_emision",
        success: function (response) {
            $.each(response.listTiposEmision, function (index, value) {
                var nombre;
                if (!$.trim(value.tiemNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiemNombre;
                }
                var emis = "<option value=" + value.tiemId + ">" + nombre + "</option>";
                $("#listVentasRegistroVentasTipoEmision").append(emis);
            });
            $("#listVentasRegistroVentasTipoEmision").bind("change", function () {
                if ($('#listVentasRegistroVentasTipoEmision option:selected').text().toLowerCase().includes("boleta")) {
                    document.getElementById("listVentasRegistroVentasTipoCliente").value = 1;
                    llenarListaVentasRegistroVentasTiposDocumento($("#listVentasRegistroVentasTipoCliente").val());
                    $("#listVentasRegistroVentasTipoCliente").bind("change", function () {
                        var ticlId = $("#listVentasRegistroVentasTipoCliente").val();
                        llenarListaVentasRegistroVentasTiposDocumento(ticlId);
                    });
                    $("#iptVentasRegistroVentasClienteVehiculoPlaca").prop('required', false);
                } else if ($('#listVentasRegistroVentasTipoEmision option:selected').text().toLowerCase().includes("factura")) {
                    document.getElementById("listVentasRegistroVentasTipoCliente").value = 2;
                    llenarListaVentasRegistroVentasTiposDocumento($("#listVentasRegistroVentasTipoCliente").val());
                    $("#listVentasRegistroVentasTipoCliente").bind("change", function () {
                        var ticlId = $("#listVentasRegistroVentasTipoCliente").val();
                        llenarListaVentasRegistroVentasTiposDocumento(ticlId);
                    });
                    $("#iptVentasRegistroVentasClienteVehiculoPlaca").prop('required', true);
                } else {
                    $("#iptVentasRegistroVentasClienteVehiculoPlaca").prop('required', false);
                }
                $("#iptVentasRegistroVentasUnidad").val('');
                $("#iptVentasRegistroVentasMonto").val('');
                llenarListaVentasRegistroVentasPrecioProducto($("#listVentasRegistroVentasProducto").val(), $("#listVentasRegistroVentasTipoVenta").val());
            });

        }
    });
}

function llenarListaVentasRegistroVentasTiposVenta() {
    $("#listVentasRegistroVentasTipoVenta").empty();
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_venta",
        success: function (response) {
            $.each(response.listTiposVenta, function (index, value) {
                var nombre;
                if (!$.trim(value.tiveNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiveNombre;
                }
                var vent = "<option value=" + value.tiveId + ">" + nombre + "</option>";
                $("#listVentasRegistroVentasTipoVenta").append(vent);
            });
        }
    });
}

function llenarListaVentasRegistroVentasTiposCliente() {
    $("#listVentasRegistroVentasTipoCliente").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=tipos_cliente",
        success: function (response) {
            $.each(response.listTiposCliente, function (index, value) {
                var nombre;
                if (!$.trim(value.ticlNombre)) {
                    nombre = "";
                } else {
                    nombre = value.ticlNombre;
                }
                var clie = "<option value=" + value.ticlId + ">" + nombre + "</option>";
                $("#listVentasRegistroVentasTipoCliente").append(clie);
            });
            document.getElementById("listVentasRegistroVentasTipoCliente").value = 1;
            llenarListaVentasRegistroVentasTiposDocumento($("#listVentasRegistroVentasTipoCliente").val());
            $("#listVentasRegistroVentasTipoCliente").bind("change", function () {
                var ticlId = $("#listVentasRegistroVentasTipoCliente").val();
                llenarListaVentasRegistroVentasTiposDocumento(ticlId);
            });
        }
    });
}

function llenarListaVentasRegistroVentasTiposDocumento(ticl_id) {
    $("#listVentasRegistroVentasTipoDocumento").empty();
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
                $("#listVentasRegistroVentasTipoDocumento").append(doc);
                $("#listVentasRegistroVentasClieTipoDocumento").append(doc);
            });
            $("#iptVentasRegistroVentasClienteDocumento").val('');
            $("#iptVentasRegistroVentasClienteNombres").val("Clientes Varios");
            $("#iptVentasRegistroVentasClienteDireccion").val('');

            $.ajax({
                dataType: 'json',
                url: "./TablasMaestras?url=info_tipo_documento&tido_id=" + $("#listVentasRegistroVentasTipoDocumento").val(),
                success: function (responseI) {
                    llenarVentasRegistroVentasDatosCliente(responseI);
                }
            });

            llenarVentasRegistroVentasModalRegCliente($("#listVentasRegistroVentasTipoCliente").val());
            $("#listVentasRegistroVentasTipoDocumento").bind("change", function () {
                $.ajax({
                    dataType: 'json',
                    url: "./TablasMaestras?url=info_tipo_documento&tido_id=" + $("#listVentasRegistroVentasTipoDocumento").val(),
                    success: function (responseI) {
                        $("#iptVentasRegistroVentasClienteDocumento").val('');
                        $("#iptVentasRegistroVentasClienteNombres").val("Clientes Varios");
                        $("#iptVentasRegistroVentasClienteDireccion").val('');
                        var ticlId = $("#listVentasRegistroVentasTipoCliente").val();
                        llenarVentasRegistroVentasModalRegCliente(ticlId);
                        llenarVentasRegistroVentasDatosCliente(responseI);
                    }
                });
            });
        }
    });
}

function llenarVentasRegistroVentasDatosCliente(responseI) {
    if (responseI.tido_id === 1) {
        $("#lblVentasRegistroVentasClienteDocumento").empty();
        $("#lblVentasRegistroVentasClienteDocumento").append(responseI.tido_nombre + " :");
        $("#iptVentasRegistroVentasClienteDocumento").attr("placeholder", "Ingrese " + responseI.tido_nombre + " del cliente");
        $("#iptVentasRegistroVentasClienteDocumento").attr('maxlength', responseI.tido_caracteres);
        $("#lblVentasRegistroVentasClienteNombres").empty();
        $("#lblVentasRegistroVentasClienteNombres").append("Razón Social :");
        $("#iptVentasRegistroVentasClienteNombres").attr("placeholder", "Ingrese razón social del cliente");
        $("#iptVentasRegistroVentasClienteNombres").val("Clientes Varios");
        $('#btnVentasRegistroVentasClienteBuscarClient').remove();
    } else {
        $("#lblVentasRegistroVentasClienteDocumento").empty();
        $("#lblVentasRegistroVentasClienteDocumento").append("Documento :");
        $("#iptVentasRegistroVentasClienteDocumento").attr("placeholder", "Ingrese " + responseI.tido_nombre + " del cliente");
        $("#iptVentasRegistroVentasClienteDocumento").attr('maxlength', responseI.tido_caracteres);
        $("#lblVentasRegistroVentasClienteNombres").empty();
        $("#lblVentasRegistroVentasClienteNombres").append("Nombres :");
        $("#iptVentasRegistroVentasClienteNombres").attr("placeholder", "Ingrese nombres del cliente");
        $("#iptVentasRegistroVentasClienteNombres").val("Clientes Varios");
        $("#btnVentasRegistroVentasClienteBuscarClient").remove();
        var clie = '<button id="btnVentasRegistroVentasClienteBuscarClient" title="Registrar Cliente" type="button" class="btn btn-social-icon btn-dark" \
                                          data-toggle="modal" data-target="#modalVentasRegistroVentasNuevoClie" >\
                                          <span class="fa fa-users"></span>\
                                        </button>';
        $("#divVentasRegistroVentasClienteBuscar").append(clie);
        $('#btnVentasRegistroVentasClienteBuscarClient').click(function (evt) {
            evt.preventDefault();
        });
    }
}

function controlVentasRegistroVentasClienteBuscar() {
    $('#btnVentasRegistroVentasClienteBuscarDocu').click(function (evt) {
        evt.preventDefault();
        var str1 = "./Ventas?url=buscar_registro_venta_cliente";
        var str2 = "&ticl_id=" + $("#listVentasRegistroVentasTipoCliente").val();
        var str3 = "&tido_id=" + $("#listVentasRegistroVentasTipoDocumento").val();
        var str4 = "&clie_documento=" + $("#iptVentasRegistroVentasClienteDocumento").val();
        var url = str1.concat(str2, str3, str4);
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (response) {
                if (response.success) {
                    $("#iptVentasRegistroVentasClienteNombres").val(response.clie_nombres);
                    $("#iptVentasRegistroVentasClienteDireccion").val(response.clie_direccion);
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
    $('#btnVentasRegistroVentasClienteBuscarClient').click(function (evt) {
        evt.preventDefault();
    });
    $('#btnVentasRegistroVentasClienteBuscarClean').click(function (evt) {
        evt.preventDefault();
        $('#listVentasRegistroVentasTipoDocumento').prop('selectedIndex', 0);
        $("#iptVentasRegistroVentasClienteDocumento").val('');
        $("#iptVentasRegistroVentasClienteNombres").val("Clientes Varios");
        $("#iptVentasRegistroVentasClienteDireccion").val('');
    });
}

function llenarListaVentasRegistroVentasProductos() {
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
        success: function (response) {
            $("#listVentasRegistroVentasProducto").empty();
            $.each(response.listProductos, function (index, value) {
                var nombre;
                if (!$.trim(value.prodNombre)) {
                    nombre = "";
                } else {
                    nombre = value.prodNombre;
                }
                var prod = "<option value=" + value.prodId + ">" + nombre + "</option>";
                $("#listVentasRegistroVentasProducto").append(prod);
            });
            llenarListaVentasRegistroVentasPrecioProducto($("#listVentasRegistroVentasProducto").val(), $("#listVentasRegistroVentasTipoVenta").val());
            $("#listVentasRegistroVentasProducto").bind("change", function () {
                $("#iptVentasRegistroVentasUnidad").val('');
                $("#iptVentasRegistroVentasMonto").val('');
                llenarListaVentasRegistroVentasPrecioProducto($("#listVentasRegistroVentasProducto").val(), $("#listVentasRegistroVentasTipoVenta").val());
            });
        }
    });
}

function llenarListaVentasRegistroVentasPrecioProducto(prod_id, tive_id) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=precio_venta_producto&prod_id=" + prod_id + "&tive_id=" + tive_id,
        success: function (response) {
            var precio, alterno1, alterno2, descuento;
            var list_precios = '';
            if (!$.trim(response.precio)) {
                precio = "";
            } else {
                precio = formatNumeroDecimal(response.precio);
                list_precios += '<option value="' + precio + '">' + precio + '</option>';
            }
            if (!$.trim(response.alterno1)) {
                alterno1 = "";
            } else {
                alterno1 = formatNumeroDecimal(response.alterno1);
                list_precios += '<option value="' + alterno1 + '">' + alterno1 + '</option>';
            }
            if (!$.trim(response.alterno2)) {
                alterno2 = "";
            } else {
                alterno2 = formatNumeroDecimal(response.alterno2);
                list_precios += '<option value="' + alterno2 + '">' + alterno2 + '</option>';
            }
            if (!$.trim(response.descuento)) {
                descuento = "";
            } else {
                descuento = formatNumeroDecimalFour(response.descuento);
            }
            var unidad;
            if (!$.trim(response.unidad_nombre)) {
                unidad = "";
            } else {
                unidad = response.unidad_nombre;
            }
            $("#listVentasRegistroVentasPrecios").empty();
            $("#listVentasRegistroVentasPrecios").append(list_precios);
            $("#iptVentasRegistroVentasDescuento").val(descuento);
            $("#lblVentasRegistroVentasUnidad").empty();
            $("#lblVentasRegistroVentasUnidad").append("Cantidad ("+unidad + "):");
            $("#listVentasRegistroVentasPrecios").bind("change", function () {
                $("#iptVentasRegistroVentasUnidad").val('');
                $("#iptVentasRegistroVentasMonto").val('');
            });
        }
    });
}

function controlVentasRegistroVentasConsumo() {
    $("#divVentasRegistroInicio").click(function (evt) {
        if (!$(evt.target).hasClass('no-updt1') && !$(evt.target).hasClass('no-updt2')) {
            if ($("#iptVentasRegistroVentasUnidad").hasClass("ipt-edit") && $("#iptVentasRegistroVentasMonto").hasClass("ipt-edit")) {
            } else {
                if ($("#iptVentasRegistroVentasUnidad").hasClass("ipt-edit")) {
                    if (!$.trim($("#iptVentasRegistroVentasUnidad").val())) {
                    } else {
                        if (!$.trim($("#listVentasRegistroVentasPrecios").val())) {
                            $("#iptVentasRegistroVentasMonto").val('');
                        } else {
                            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
                            var iptD = $("#iptVentasRegistroVentasDescuento").val();
                            var ipt1 = $("#iptVentasRegistroVentasUnidad").val();
                            var ipt2 = (ipt0 * ipt1 * (1 - (iptD / 100))).toFixed(2);
                            $("#iptVentasRegistroVentasMonto").val(ipt2);
                        }
                    }
                }
                if ($("#iptVentasRegistroVentasMonto").hasClass("ipt-edit")) {
                    if (!$.trim($("#iptVentasRegistroVentasMonto").val())) {
                    } else {
                        if (!$.trim($("#listVentasRegistroVentasPrecios").val())) {
                            $("#iptVentasRegistroVentasUnidad").val('');
                        } else {
                            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
                            var iptD = $("#iptVentasRegistroVentasDescuento").val();
                            var ipt2 = $("#iptVentasRegistroVentasMonto").val();
                            var ipt1 = (ipt2 / (ipt0 * (1 - (iptD / 100)))).toFixed(4);
                            $("#iptVentasRegistroVentasUnidad").val(ipt1);
                        }
                    }
                }
            }
        } else {
            if ($(evt.target).hasClass('no-updt1')) {
                if ($("#iptVentasRegistroVentasMonto").hasClass("ipt-edit")) {
                    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasUnidad").addClass("ipt-edit");
                    if (!$.trim($("#iptVentasRegistroVentasMonto").val())) {
                    } else {
                        if (!$.trim($("#listVentasRegistroVentasPrecios").val())) {
                            $("#iptVentasRegistroVentasUnidad").val('');
                        } else {
                            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
                            var iptD = $("#iptVentasRegistroVentasDescuento").val();
                            var ipt2 = $("#iptVentasRegistroVentasMonto").val();
                            var ipt1 = (ipt2 / (ipt0 * (1 - (iptD / 100)))).toFixed(4);
                            $("#iptVentasRegistroVentasUnidad").val(ipt1);
                        }
                    }
                } else {
                    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasUnidad").addClass("ipt-edit");
                }
            }
            if ($(evt.target).hasClass('no-updt2')) {
                if ($("#iptVentasRegistroVentasUnidad").hasClass("ipt-edit")) {
                    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").addClass("ipt-edit");
                    if (!$.trim($("#iptVentasRegistroVentasUnidad").val())) {
                    } else {
                        if (!$.trim($("#listVentasRegistroVentasPrecios").val())) {
                            $("#iptVentasRegistroVentasMonto").val('');
                        } else {
                            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
                            var iptD = $("#iptVentasRegistroVentasDescuento").val();
                            var ipt1 = $("#iptVentasRegistroVentasUnidad").val();
                            var ipt2 = (ipt0 * ipt1 * (1 - (iptD / 100))).toFixed(2);
                            $("#iptVentasRegistroVentasMonto").val(ipt2);
                        }
                    }
                } else {
                    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").addClass("ipt-edit");
                }
            }
        }
    });
}

function controlVentasRegistroVentasConsumoAdd() {
    $('#btnAddVentasRegistroVentasConsumo').click(function (evt) {
        evt.preventDefault();
        if ($("#iptVentasRegistroVentasUnidad").hasClass("ipt-edit")) {
            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
            var iptD = $("#iptVentasRegistroVentasDescuento").val();
            var ipt1 = $("#iptVentasRegistroVentasUnidad").val();
            var ipt2 = (ipt0 * ipt1 * (1 - (iptD / 100))).toFixed(2);
            $("#iptVentasRegistroVentasMonto").val(ipt2);
        }
        if ($("#iptVentasRegistroVentasMonto").hasClass("ipt-edit")) {
            var ipt0 = $("#listVentasRegistroVentasPrecios").val();
            var iptD = $("#iptVentasRegistroVentasDescuento").val();
            var ipt2 = $("#iptVentasRegistroVentasMonto").val();
            var ipt1 = (ipt2 / (ipt0 * (1 - (iptD / 100)))).toFixed(4);
            $("#iptVentasRegistroVentasUnidad").val(ipt1);
        }
        var str1 = "./Ventas?url=insert_registro_venta_detalle";
        var str2 = "&reve_id=" + $('#iptVentasRegistroVentasRegVentId:hidden').val();
        var str3 = "&prod_id=" + $('#listVentasRegistroVentasProducto').val();
        var str4 = "&revd_precio_unitario=" + $('#listVentasRegistroVentasPrecios').val();
        var str5 = "&revd_descuento_precio=" + $('#iptVentasRegistroVentasDescuento').val();
        var str6 = "&revd_cantidad=" + $('#iptVentasRegistroVentasUnidad').val();
        var str7 = "&revd_monto=" + $('#iptVentasRegistroVentasMonto').val();
        var url = str1.concat(str2, str3, str4, str5, str6, str7);
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (response) {
                if (response.success) {
                    $("#iptVentasRegistroVentasUnidad").val('');
                    $("#iptVentasRegistroVentasMonto").val('');
                    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                    llenarTablaVentasRegistroVentasConsumoBody(response, $('#iptVentasRegistroVentasRegVentId:hidden').val());
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function controlVentasRegistroVentasConsumoClean() {
    $('#btnCleanVentasRegistroVentasConsumo').click(function (evt) {
        evt.preventDefault();
        $("#iptVentasRegistroVentasUnidad").val('');
        $("#iptVentasRegistroVentasMonto").val('');
        $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
        $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
        llenarTablaVentasRegistroVentasConsumoBodyVacio();
    });
}

function llenarTablaVentasRegistroVentasConsumoBodyVacio() {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=empty_registro_venta_detalle&reve_id=" + $("#iptVentasRegistroVentasRegVentId:hidden").val(),
        success: function (response) {
            if (response.success) {
                $("#tablaVentasRegistroVentasConsumoBody").empty();
                var empty = '<tr>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                                <td style="text-align: center;"></td>\
                             </tr>';
                $("#tablaVentasRegistroVentasConsumoBody").append(empty);
                $("#thVentasRegistroVentasConsumoFootSubTotalMonto").empty();
                $("#thVentasRegistroVentasConsumoFootIGVMonto").empty();
                $("#thVentasRegistroVentasConsumoFootTotalMonto").empty();
            }
        }
    });
}

function llenarTablaVentasRegistroVentasConsumoBody(response, reve_id) {
    if (response.vacio) {
        llenarTablaVentasRegistroVentasConsumoBodyVacio();
    } else {
        $("#tablaVentasRegistroVentasConsumoBody").empty();
        var montoT = 0.00;
        var igvEstado = response.igvEstado;
        var tasaIgv = response.tasaIgv;

        $.each(response.listRegistroVentaDetalle, function (index, value) {
            var producto, precio, descuento, unidad, cantidad, monto;
            if (!$.trim(value.revdProducto)) {
                producto = "";
            } else {
                producto = value.revdProducto;
            }
            if (!$.trim(value.revdPrecioUnitario)) {
                precio = "";
            } else {
                precio = formatNumeroDecimal(value.revdPrecioUnitario);
            }
            if (!$.trim(value.revdDescuentoPrecio)) {
                descuento = "";
            } else {
                descuento = formatNumeroDecimalFour(value.revdDescuentoPrecio);
            }
            if (!$.trim(value.revdUnidadMedida)) {
                unidad = "";
            } else {
                unidad = value.revdUnidadMedida;
            }
            if (!$.trim(value.revdCantidad)) {
                cantidad = "";
            } else {
                cantidad = formatNumeroDecimalFour(value.revdCantidad);
            }
            if (!$.trim(value.revdMonto)) {
                monto = "";
            } else {
                monto = formatNumeroDecimal(value.revdMonto);
                montoT += value.revdMonto;
            }
            var body = "<tr class='no-datatable'>\
                            <td align='left'>" + producto + "</td>\
                            <td align='right'>" + precio + "</td>\
                            <td align='center'>" + descuento + "</td>\
                            <td align='left'>" + unidad + "</td>\
                            <td align='center'>" + cantidad + "</td>\
                            <td align='right'>" + monto + "</td>\
                            <td align='center'>\
                              <button id='btnQuitarTablaVentasRegistroVentasConsumoBody" + value.revdId + "' title='Quitar' class='btn btn-danger btn-sm'>\
                                <i class='fa fa-times'></i>\
                              </button>\
                            </td>\
                        </tr>";
            $("#tablaVentasRegistroVentasConsumoBody").append(body);

            $("#btnQuitarTablaVentasRegistroVentasConsumoBody" + value.revdId).click(function (evt) {
                evt.preventDefault();
                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=delete_registro_venta_detalle&revd_id=" + value.revdId + "&reve_id=" + reve_id,
                    success: function (responseDel) {
                        if (responseDel.success) {
                            $("#iptVentasRegistroVentasUnidad").val('');
                            $("#iptVentasRegistroVentasMonto").val('');
                            $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
                            $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
                            llenarTablaVentasRegistroVentasConsumoBody(responseDel, reve_id);
                        }
                    }
                });
            });
        });

        $("#thVentasRegistroVentasConsumoFootSubTotalMonto").empty();
        $("#thVentasRegistroVentasConsumoFootIGVMonto").empty();
        $("#thVentasRegistroVentasConsumoFootTotalMonto").empty();
        if (igvEstado) {
            $("#thVentasRegistroVentasConsumoFootSubTotalMonto").append(formatNumeroDecimal(montoT / tasaIgv));
            $("#thVentasRegistroVentasConsumoFootIGVMonto").append(formatNumeroDecimal((montoT) - (montoT / tasaIgv)));
            $("#thVentasRegistroVentasConsumoFootTotalMonto").append(formatNumeroDecimal(montoT));
        } else {
            $("#thVentasRegistroVentasConsumoFootSubTotalMonto").append(formatNumeroDecimal(montoT));
            $("#thVentasRegistroVentasConsumoFootIGVMonto").append(formatNumeroDecimal(montoT - montoT));
            $("#thVentasRegistroVentasConsumoFootTotalMonto").append(formatNumeroDecimal(montoT));
        }

    }
}

function soloNumDecimalRegVentaUnidad(event, value) {
    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
    $("#iptVentasRegistroVentasUnidad").addClass("ipt-edit");
    var code = event.charCode;
    var pos = event.target.selectionStart;
    if (code >= 48 && code <= 57 || code === 46 || code === 0) {
        if (code === 46) {
            if (value.indexOf(".") !== -1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (value.indexOf(".") !== -1) {
                var size0 = value.split(".")[0].length;
                var size1 = value.split(".")[1].length;
                if (size1 >= 0 && size1 <= 1) {
                    return true;
                } else {
                    if (pos <= size0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function soloNumDecimalRegVentaMonto(event, value) {
    $("#iptVentasRegistroVentasUnidad").removeClass("ipt-edit");
    $("#iptVentasRegistroVentasMonto").removeClass("ipt-edit");
    $("#iptVentasRegistroVentasMonto").addClass("ipt-edit");
    var code = event.charCode;
    var pos = event.target.selectionStart;
    if (code >= 48 && code <= 57 || code === 46 || code === 0) {
        if (code === 46) {
            if (value.indexOf(".") !== -1) {
                return false;
            } else {
                return true;
            }
        } else {
            if (value.indexOf(".") !== -1) {
                var size0 = value.split(".")[0].length;
                var size1 = value.split(".")[1].length;
                if (size1 >= 0 && size1 <= 1) {
                    return true;
                } else {
                    if (pos <= size0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
    } else {
        return false;
    }
}

function llenarVentasRegistroVentasModalRegCliente(ticl_id) {

    var action = './Ventas?url=nuevo_cliente&ticl_id=' + ticl_id;
    $("#formVentasRegistroVentasNuevoClie").attr("action", action);

    var documen = '<label for="nVentasRegistroVentasClieDocumen" class="col-form-label">Documento :</label>\
		   <input id="nVentasRegistroVentasClieDocumen" type="text" name="clie_documento" class="form-control" maxlength="8" \
                   placeholder="Ingrese número de DNI" onkeypress="return soloNumero(event)" required />';
    var nombres = '<label for="nVentasRegistroVentasClieNombres" class="col-form-label">Nombres y Apellidos :</label>\
		   <input id="nVentasRegistroVentasClieNombres" type="text" name="clie_nombres" class="form-control" \
                   placeholder="Ingrese nombres y apellidos" required >';

    $('#nDivVentasRegistroVentasClieDocumen').empty();
    $('#nDivVentasRegistroVentasClieNombres').empty();
    $('#nDivVentasRegistroVentasClieDocumen').append(documen);
    $('#nDivVentasRegistroVentasClieNombres').append(nombres);

    $("#listVentasRegistroVentasClieTipoDocumento").bind("change", function () {
        $.ajax({
            dataType: 'json',
            url: "./TablasMaestras?url=info_tipo_documento&tido_id=" + $("#listVentasRegistroVentasClieTipoDocumento").val(),
            success: function (responseI) {
                $("#nVentasRegistroVentasClieDocumen").attr("placeholder", "Ingrese " + responseI.tido_nombre + " del cliente");
                $("#nVentasRegistroVentasClieDocumen").attr('maxlength', responseI.tido_caracteres);
                $("#nVentasRegistroVentasClieDocumen").val("");
                $("#nVentasRegistroVentasClieNombres").val("");
            }
        });
    });

}

function eventFormVentasRegistroVentasNuevoClie() {
    $("#formVentasRegistroVentasNuevoClie").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alertify.success(response.msg);
                    $('#modalVentasRegistroVentasNuevoClie').modal('hide');
                    document.getElementById("listVentasRegistroVentasTipoDocumento").value = response.tido_id;
                    $("#iptVentasRegistroVentasClienteDocumento").val(response.clie_documento);
                    $("#iptVentasRegistroVentasClienteNombres").val(response.clie_nombres);
                    $("#iptVentasRegistroVentasClienteDireccion").val(response.clie_direccion);
                    llenarTablaVentasRegistroVentasConsumoBodyVacio();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}