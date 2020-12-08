/*
 ========================
 @author carlos santander
 ========================
 */

function sub_menu_liquidacion() {

    //checkAlertStockMail();
    //checkAlertStock();

    $('#divMenuContenido').empty();
    var cont = '<div class="card">\
                    <div class="card-header bg-danger text-white">LIQUIDACIÓN DIARIA</div>\
                    <div id="divVentasLiquidacionDiaria"></div>\
                    <div id="modalVentasRegistroVentasLiquidEntregado" class="modal fade" ></div>\
                    <div id="modalVentasRegistroVentasLiquidDevolu" class="modal fade" ></div>\
                    <div id="modalVentasRegistroVentasLiquidGasto" class="modal fade" ></div>\
                    <div id="modalVentasRegistroVentasLiquidIngreso" class="modal fade" ></div>\
                </div>';
    $('#divMenuContenido').append(cont);

    validarVentasLiquidacionDiaria();

}

function validarVentasLiquidacionDiaria() {
    $('#divVentasLiquidacionDiaria').empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=ventas_registro_inicio",
        success: function (response) {
            if (response.cerrado) {
                var turn_last;
                if (response.estado) {
                    turn_last = response.turn_nombre_last;
                } else {
                    turn_last = response.fecha_last + " - " + response.turn_nombre_last + " ( " + response.turn_inicio_last + " - " + response.turn_fin_last + " )";
                }
                var cont = '<div class="card-body" >\
                                 <div class="form-row" style="background-color: #F7F7F7;">\
                                      <div class="form-group col-md-3">\
                                        <label class="col-form-label text-bold text-bold" >Último Turno Liquidado :</label>\
                                      </div>\
                                      <div class="form-group col-md-9">\
                                        <label class="col-form-label">' + turn_last + '</label>\
                                      </div>\
                                    </div><br>\
                                  <form id="formVentasLiquidacionRegistrarTurno" method="post" action="./Ventas?url=registrar_turno&tipo=nuevo">\
                                    <div class="form-row">\
                                      <div class="form-group col-md-2">\
                                        <label class="col-form-label text-bold text-bold" >Elija Fecha :</label>\
                                      </div>\
                                      <div class="form-group col-md-2">\
                                        <input id="datePickVentasLiquidacionFecha" name="fecha" required />\
                                      </div>\
                                    </div>\
                                    <div class="form-row">\
                                      <div class="form-group col-md-2">\
                                        <label class="col-form-label text-bold" >Elija Turno :</label>\
                                      </div>\
                                      <div class="form-group col-md-5">\
                                        <select id="listVentasLiquidacionTurnos" class="form-select" name="turn_id" required></select>\
                                      </div>\
                                    </div>\
                                    <div class="form-group checktreeDiv">\
                                      <label class="col-form-label text-bold">Seleccione los trabajadores que estarán en el turno :</label>\
                                      <ul id="ulVentasLiquidacionTrabajadores" class="checktree"></ul>\
                                    </div>\
                                    <div class="form-group checktreeDiv">\
                                      <label class="col-form-label text-bold">Seleccione los surtidores disponibles en este turno :</label>\
                                      <ul id="ulVentasLiquidacionSurtidores" class="checktree"></ul>\
                                    </div>\
                                    <div id="divVentasLiquidacionLecturaInicio"></div>\
                                    <div class="form-group">\
                                      <button type="submit" class="btn btn-success">\
                                        <i class="fa fa-tachometer"></i> Registrar Turno\
                                      </button>\
                                    </div>\
                                </form>\
                             </div>';
                $('#divVentasLiquidacionDiaria').append(cont);

                $('#datePickVentasLiquidacionFecha').datepicker({
                    locale: 'es-es',
                    format: 'dd/mm/yyyy',
                    uiLibrary: 'bootstrap4',
                    iconsLibrary: 'fontawesome',
                    value: response.fecha_last,
                    minDate: response.fecha_last,
                    maxDate: new Date()
                });

                llenarListaVentasLiquidacionTurnos();
                llenarListaVentasLiquidacionTrabajadores();
                llenarListaVentasLiquidacionSurtidores();
                llenarTablaVentasLiquidacionLecturaInicio();
                eventFormVentasLiquidacionRegistrarTurno();
            } else {
                llenarVentasLiquidacionDiaria(response);
            }
        }
    });
}

function llenarListaVentasLiquidacionTurnos() {
    $("#listVentasLiquidacionTurnos").empty();
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
                $("#listVentasLiquidacionTurnos").append(turn);
            });
            document.getElementById("listVentasLiquidacionTurnos").value = response.turn_id;
        }
    });
}

function llenarListaVentasLiquidacionTrabajadores() {
    $("#ulVentasLiquidacionTrabajadores").empty();
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
                              <input id="iptVentasLiquidacionTrabajador_' + value.trabId + '" type="checkbox" name="trabIds" value="' + value.trabId + '" \
                                class="filled-in chk-col-danger" checked="" >&nbsp;&nbsp;\
                              <label for="iptVentasLiquidacionTrabajador_' + value.trabId + '" >' + nombres + '</label>\
                            </li>';
                $("#ulVentasLiquidacionTrabajadores").append(trab);
            });
        }
    });
}

function llenarListaVentasLiquidacionSurtidores() {
    $("#ulVentasLiquidacionSurtidores").empty();
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
                              <input id="iptVentasLiquidacionSurtidor_' + value.surtId + '" type="checkbox" name="surt_Ids" value="' + value.surtId + '" \
                                class="filled-in chk-col-danger" checked="" >&nbsp;&nbsp;\
                              <label for="iptVentasLiquidacionSurtidor_' + value.surtId + '" >' + nombre + '</label>\
                            </li>';
                $("#ulVentasLiquidacionSurtidores").append(trab);
            });
        }
    });
}

function llenarTablaVentasLiquidacionLecturaInicio() {
    $("#divVentasLiquidacionLecturaInicio").empty();
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_lectura_inicio_turno",
        success: function (response) {
            if (response.vacio) {
                $("#divVentasLiquidacionLecturaInicio").empty();
            } else {
                $("#divVentasLiquidacionLecturaInicio").empty();
                var tabla = '<div class="table-responsive">\
                                <table id="tablaVentasLiquidacionLecturaInicio" class="table table-hover display" style="width: 100%;">\
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
                                  <tbody id="tablaVentasLiquidacionLecturaInicioBody"></tbody>\
                                </table>\
                             </div>';
                $("#divVentasLiquidacionLecturaInicio").append(tabla);
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
                                    <input name="sude_id" type="text" value="' + value.sudeId + '" >\
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
                    $("#tablaVentasLiquidacionLecturaInicioBody").append(body);
                });

                $('#tablaVentasLiquidacionLecturaInicio').dataTable().fnDestroy();

                $('#tablaVentasLiquidacionLecturaInicio').DataTable({
                    dom: 'rt',
                    paging: false,
                    ordering: false
                });
            }
        }
    });
}

function eventFormVentasLiquidacionRegistrarTurno() {
    $("#formVentasLiquidacionRegistrarTurno").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    sub_menu_liquidacion();
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });
}

function llenarVentasLiquidacionDiaria(response) {
    var turn_last;
    if (response.estado) {
        turn_last = response.turn_nombre_last;
    } else {
        turn_last = response.fecha_last + " - " + response.turn_nombre_last + " ( " + response.turn_inicio_last + " - " + response.turn_fin_last + " )";
    }
    var turn = response.turn_nombre + " ( " + response.turn_inicio + " - " + response.turn_fin + " )";
    var cont = '<div class="card-body">\
                    <div class="form-row" style="background-color: #F7F7F7;">\
                                      <div class="form-group col-md-3">\
                                        <label class="col-form-label text-bold" >Último Turno Liquidado :</label>\
                                      </div>\
                                      <div class="form-group col-md-9">\
                                        <label class="col-form-label">' + turn_last + '</label>\
                                      </div>\
                                    </div><br>\
                                  <form id="formVentasLiquidacionRemoverTurno" method="post" action="./Ventas?url=remover_turno&tudi_id=' + response.tudi_id + '" >\
                                    <div class="form-row" style="color: black;">\
                                      <div class="form-group col-md-1">\
                                        <label class="col-form-label text-bold" >Fecha :</label>\
                                      </div>\
                                      <div class="form-group col-md-2">\
                                        <label class="col-form-label">' + response.fecha + '</label>\
                                      </div>\
                                      <div class="form-group col-md-1">\
                                        <label class="col-form-label text-bold" >Turno :</label>\
                                      </div>\
                                      <div class="form-group col-md-4">\
                                        <label class="col-form-label">' + turn + '</label>\
                                      </div>\
                                      <div class="form-group col-md-2">\
                                        <button type="submit" class="btn btn-danger">\
                                          <i class="fa fa-remove"></i> Remover\
                                        </button>\
                                      </div>\
                                    </div>\
                                   </form>\
                                    <br>\
                                    <form id="formVentasRegistroVentasLecturaFinal" method="post" action="./Ventas?url=update_lectura_fin_turno&tudi_id=' + response.tudi_id + '" >\
					<div id="divVentasRegistroVentasLecturaFinal" class="form-group">\
					  <label class="col-form-label">Ingrese Lecturas de Surtidores :</label>&nbsp;&nbsp;&nbsp;\
                                          <button type="submit" class="btn btn-secondary">\
                                            <i class="fa fa-refresh"></i>&nbsp;Actualizar\
                                          </button>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasLecturaFinal" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th class="hide">ledi_id</th>\
                                                  <th style="text-align: center;">Surtidor</th>\
                                                  <th style="text-align: center;">Lado</th>\
                                                  <th style="text-align: center;">Manguera</th>\
                                                  <th style="text-align: center;">Producto</th>\
                                                  <th style="text-align: center;" class="hide">Precio Unitario</th>\
                                                  <th style="text-align: center;">Precio</th>\
                                                  <th style="text-align: center;">Lectura Inicial</th>\
                                                  <th style="text-align: center;">Lectura Final</th>\
                                                  <th style="text-align: center;">Venta</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasLecturaFinalBody"></tbody>\
                                            </table>\
                                        </div>\
                                       </form>\
					<div class="form-group">\
					  <label class="col-form-label">Devoluciones Tanque :</label>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasDevolucionTurno" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th style="text-align: center;">Id</th>\
                                                  <th style="text-align: center;">Surtidor</th>\
                                                  <th style="text-align: center;">Producto</th>\
                                                  <th style="text-align: center;">Devolución (galones)</th>\
                                                  <th style="text-align: center;">Precio Venta</th>\
                                                  <th style="text-align: center;">Monto (S/)</th>\
                                                  <th style="text-align: center;" class="notexport">Acción</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasDevolucionTurnoBody"></tbody>\
                                            </table>\
                                        </div>\
					<div class="form-group">\
					  <label class="col-form-label">Gastos Turno :</label>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasGastosTurno" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th style="text-align: center;">Id</th>\
                                                  <th style="text-align: center;">Surtidor</th>\
                                                  <th style="text-align: center;">Tipo Gasto</th>\
                                                  <th style="text-align: center;">Descripción</th>\
                                                  <th style="text-align: center;">Monto (S/)</th>\
                                                  <th style="text-align: center;" class="notexport">Acción</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasGastosTurnoBody"></tbody>\
                                            </table>\
                                        </div>\
					<div class="form-group">\
					  <label class="col-form-label">Ingresos Turno :</label>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasIngresosTurno" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th style="text-align: center;">Id</th>\
                                                  <th style="text-align: center;">Surtidor</th>\
                                                  <th style="text-align: center;">Tipo Ingreso</th>\
                                                  <th style="text-align: center;">Descripción</th>\
                                                  <th style="text-align: center;">Monto (S/)</th>\
                                                  <th style="text-align: center;" class="notexport">Acción</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasIngresosTurnoBody"></tbody>\
                                            </table>\
                                        </div>\
					<div class="form-group">\
					  <label class="col-form-label">Liquidación de Turno :</label>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasLiquidacionTurno" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th class="hide">surt_id</th>\
                                                  <th style="text-align: center;">Surtidor</th>\
                                                  <th style="text-align: center;">Nombre de Trabajador</th>\
                                                  <th style="text-align: center;">Monto Vendido</th>\
                                                  <th style="text-align: center;">Monto Entregado</th>\
                                                  <th style="text-align: center;"></th>\
                                                  <th style="text-align: center;">Devolución Tanque</th>\
                                                  <th style="text-align: center;"></th>\
                                                  <th style="text-align: center;">Gastos</th>\
                                                  <th style="text-align: center;"></th>\
                                                  <th style="text-align: center;">Ingresos</th>\
                                                  <th style="text-align: center;"></th>\
                                                  <th style="text-align: center;">Faltante</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasLiquidacionTurnoBody"></tbody>\
                                              <tfoot id="tablaVentasRegistroVentasLiquidacionTurnoFoot"></tfoot>\
                                            </table>\
                                        </div>\
                                       <form id="formVentasRegistroVentasLecturaLiquidacionStock" method="post" action="./Ventas?url=liquidar_stock&tudi_id=' + response.tudi_id + '" >\
					<div class="form-group">\
					  <label class="col-form-label">Stock de Productos :</label>&nbsp;&nbsp;&nbsp;\
                                          <button type="submit" class="btn btn-secondary">\
                                            <i class="fa fa-refresh"></i>&nbsp;Actualizar\
                                          </button>\
					</div>\
					<div class="table-responsive">\
                                            <table id="tablaVentasRegistroVentasLecturaProducto" class="table table-hover display" style="width: 100%;">\
                                              <thead>\
                                                <tr>\
                                                  <th class="hide">prod_id</th>\
                                                  <th style="text-align: center;">Id</th>\
                                                  <th style="text-align: center;">Producto</th>\
                                                  <th style="text-align: center;">Stock Anterior</th>\
                                                  <th style="text-align: center;">Galones Comprados</th>\
                                                  <th style="text-align: center;">Galones Vendidos</th>\
                                                  <th style="text-align: center;">Devoluciones</th>\
                                                  <th style="text-align: center;">Stock Actual</th>\
                                                  <th style="text-align: center;">Lectura Física (galones)</th>\
                                                  <th style="text-align: center;">Merma</th>\
                                                </tr>\
                                              </thead>\
                                              <tbody id="tablaVentasRegistroVentasLecturaProductoBody"></tbody>\
                                            </table>\
                                        </div>\
                                       </form>\
                                       <form id="formVentasRegistroVentasCierreTurno" method="post" action="./Ventas?url=cerrar_turno&tudi_id=' + response.tudi_id + '" >\
                                        <div class="form-row">\
                                          <button type="submit" class="btn btn-primary">\
                                            <i class="fa fa-flash"></i> Liquidar Turno\
                                          </button>\
                                        </div>\
                                       </form>\
                                </div>';
    $('#divVentasLiquidacionDiaria').append(cont);

    eventFormVentasLiquidacionRemoverTurno();
    controlVentasRegistroVentasLecturaFinal(response.tudi_id);
    llenarVentasRegistroVentasLiquidacionDevolucion(response.tudi_id);
    llenarVentasRegistroVentasLiquidacionGastos(response.tudi_id);
    llenarVentasRegistroVentasLiquidacionIngresos(response.tudi_id);
    eventFormVentasRegistroVentasLecturaFinal();
    eventFormVentasRegistroVentasLiquidarStock();
    eventFormVentasRegistroVentasCierreTurno();

    $('#tablaVentasRegistroVentasDevolucionTurno').dataTable().fnDestroy();
    $('#tablaVentasRegistroVentasDevolucionTurno').DataTable({
        dom: 'rt',
        paging: false,
        ordering: false
    });

    $('#tablaVentasRegistroVentasGastosTurno').dataTable().fnDestroy();
    $('#tablaVentasRegistroVentasGastosTurno').DataTable({
        dom: 'rt',
        paging: false,
        ordering: false
    });

    $('#tablaVentasRegistroVentasIngresosTurno').dataTable().fnDestroy();
    $('#tablaVentasRegistroVentasIngresosTurno').DataTable({
        dom: 'rt',
        paging: false,
        ordering: false
    });

}

function eventFormVentasLiquidacionRemoverTurno() {

    $("#formVentasLiquidacionRemoverTurno").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea remover el turno?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formVentasLiquidacionRemoverTurno").attr("action"),
                    data: $("#formVentasLiquidacionRemoverTurno").serialize(),
                    success: function (response) {
                        sub_menu_liquidacion();
                    }
                });
            } else {
                alertify.error("Cancelado");
            }
        });
    });

}

function controlVentasRegistroVentasLecturaFinal(tudi_id) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_lectura_fin_turno&tudi_id=" + tudi_id,
        success: function (response) {
            $("#tablaVentasRegistroVentasLecturaFinalBody").empty();
            $.each(response.listLecturaFinal, function (index, value) {
                var surtidor, lado, manguera, producto, precio, lectura_inicial, lectura_final;
                var venta = 0.00;
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
                if (!$.trim(value.prvePrecioUnitario)) {
                    precio = "";
                } else {
                    precio = formatNumeroDecimal(value.prvePrecioUnitario);
                }
                if (!$.trim(value.lediLecturaInicial)) {
                    lectura_inicial = "";
                } else {
                    lectura_inicial = formatNumeroDecimal(value.lediLecturaInicial);
                }
                if (!$.trim(value.lediLecturaFinal)) {
                    lectura_final = "";
                } else {
                    lectura_final = value.lediLecturaFinal;
                    if (!$.trim(value.lediLecturaInicial)) {
                    } else {
                        if (!$.trim(value.prvePrecioUnitario)) {
                        } else {
                            venta = (value.lediLecturaFinal - value.lediLecturaInicial) * (value.prvePrecioUnitario);
                        }
                    }
                }
                var body = '<tr>\
                                  <td class="hide">\
                                    <input name="ledi_id[]" type="text" value="' + value.lediId + '" >\
                                  </td>\
                                  <td style="text-align: left;">' + surtidor + '</td>\
                                  <td style="text-align: left;">' + lado + '</td>\
                                  <td style="text-align: left;">' + manguera + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;" class="hide">\
                                    <input name="ledi_precio_unitario" value="' + precio + '" type="text">\
                                  </td>\
                                  <td style="text-align: center;">' + precio + '</td>\
                                  <td style="text-align: center;">' + lectura_inicial + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="ledi_lectura_final[]" value="' + lectura_final + '" type="text" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(venta) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLecturaFinalBody").append(body);
            });

            $('#tablaVentasRegistroVentasLecturaFinal').dataTable().fnDestroy();

            $('#tablaVentasRegistroVentasLecturaFinal').DataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });

            $("#tablaVentasRegistroVentasLecturaProductoBody").empty();
            $.each(response.listStock, function (index, value) {
                var producto, galIni, galMaq, devTanq, lecturaGal, galVen, galDev;
                var stockAnt = 0.00;
                var stock = 0.00;
                var merma = 0.00;
                if (!$.trim(value.prodDescripcion)) {
                    producto = "";
                } else {
                    if (!$.trim(value.prodNombre)) {
                        producto = value.prodDescripcion;
                    } else {
                        producto = value.prodDescripcion + " - " + value.prodNombre;
                    }
                }
                if (!$.trim(value.galonesIniciales)) {
                    galIni = "";
                } else {
                    galIni = formatNumeroDecimal(value.galonesIniciales);
                    stockAnt += value.galonesIniciales;
                    stock += value.galonesIniciales;
                    merma += value.galonesIniciales;
                }
                if (!$.trim(value.galonesCompradosFactAnt)) {
                } else {
                    stockAnt += value.galonesCompradosFactAnt;
                    stock += value.galonesCompradosFactAnt;
                    merma += value.galonesCompradosFactAnt;
                }
                if (!$.trim(value.galonesCompradosAnt)) {
                } else {
                    stockAnt += value.galonesCompradosAnt;
                    stock += value.galonesCompradosAnt;
                    merma += value.galonesCompradosAnt;
                }
                var galComp = 0.00;
                if (!$.trim(value.galonesCompradosFact)) {
                } else {
                    galComp += value.galonesCompradosFact;
                    stock += value.galonesCompradosFact;
                    merma += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesComprados)) {
                } else {
                    galComp += value.galonesComprados;
                    stock += value.galonesComprados;
                    merma += value.galonesComprados;
                }
                if (!$.trim(value.lecturaMaquina)) {
                    galMaq = "";
                } else {
                    galMaq = formatNumeroDecimal(value.lecturaMaquina);
                    stockAnt -= value.lecturaMaquina;
                    stock -= value.lecturaMaquina;
                    merma -= value.lecturaMaquina;
                }
                if (!$.trim(value.devolucionTanque)) {
                    devTanq = "";
                } else {
                    devTanq = formatNumeroDecimal(value.devolucionTanque);
                    stockAnt += value.devolucionTanque;
                    stock += value.devolucionTanque;
                    merma += value.devolucionTanque;
                }
                if (!$.trim(value.galonesVendidos)) {
                    galVen = "";
                } else {
                    galVen = formatNumeroDecimal(value.galonesVendidos);
                    stock -= value.galonesVendidos;
                    merma -= value.galonesVendidos;
                }
                if (!$.trim(value.galonesDevueltos)) {
                    galDev = "";
                } else {
                    galDev = formatNumeroDecimal(value.galonesDevueltos);
                    stock += value.galonesDevueltos;
                    merma += value.galonesDevueltos;
                }
                if (!$.trim(value.leprLecturaFisica)) {
                    lecturaGal = "";
                } else {
                    lecturaGal = value.leprLecturaFisica;
                    merma -= value.leprLecturaFisica;
                }
                var body = '<tr>\
                                  <td class="hide">\
                                    <input name="prod_id" type="text" value="' + value.prodId + '" >\
                                  </td>\
                                  <td style="text-align: center;">' + (index + 1) + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stockAnt) + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(galComp) + '</td>\
                                  <td style="text-align: center;">' + galVen + '</td>\
                                  <td style="text-align: center;">' + galDev + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stock) + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="lepr_lectura_fisica" value="' + lecturaGal + '" type="text" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(merma) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLecturaProductoBody").append(body);
            });

            $('#tablaVentasRegistroVentasLecturaProducto').dataTable().fnDestroy();

            $('#tablaVentasRegistroVentasLecturaProducto').DataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });

            var montoT, entregadoT, devolucionT, gastoT, ingresoT, faltanteT;
            montoT = entregadoT = devolucionT = gastoT = ingresoT = faltanteT = 0.00;
            $("#tablaVentasRegistroVentasLiquidacionTurnoBody").empty();
            $.each(response.listLecturaLiquidacion, function (index, value) {
                var surtidor, monto, entregado, devolucion, gasto, ingreso;
                var faltante = 0.00;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.tusuMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.tusuMonto);
                    faltante += value.tusuMonto;
                    montoT += value.tusuMonto;
                }
                if (!$.trim(value.tusuEntregado)) {
                    entregado = "";
                } else {
                    entregado = formatNumeroDecimal(value.tusuEntregado);
                    faltante -= value.tusuEntregado;
                    entregadoT += value.tusuEntregado;
                }
                if (!$.trim(value.devolucion)) {
                    devolucion = "";
                } else {
                    devolucion = formatNumeroDecimal(value.devolucion);
                    faltante -= value.devolucion;
                    devolucionT += value.devolucion;
                }
                if (!$.trim(value.gadiMonto)) {
                    gasto = "";
                } else {
                    gasto = formatNumeroDecimal(value.gadiMonto);
                    faltante -= value.gadiMonto;
                    gastoT += value.gadiMonto;
                }
                if (!$.trim(value.indiMonto)) {
                    ingreso = "";
                } else {
                    ingreso = formatNumeroDecimal(value.indiMonto);
                    faltante += value.indiMonto;
                    ingresoT += value.indiMonto;
                }
                faltanteT += faltante;
                var body = '<tr>\
                                  <td align="center" class="hide">\
                                    <input name="surt_id" type="text" value="' + value.surtId + '" >\
                                  </td>\
                                  <td align="center">' + surtidor + '</td>\
                                  <td align="center">\
                                    <select id="listVentasRegistroVentasLiquidTrabTurno_' + value.surtId + '" class="form-select" name="trab_id" required></select>\
                                  </td>\
                                  <td align="center">' + monto + '</td>\
                                  <td align="center">' + entregado + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddEntrega_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidEntregado">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + devolucion + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddDevolu_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidDevolu">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + gasto + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddGasto_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidGasto">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + ingreso + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddIngreso_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidIngreso">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + formatNumeroDecimal(faltante) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLiquidacionTurnoBody").append(body);

                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=list_trabajadores_turno&tudi_id=" + tudi_id,
                    success: function (responseX) {
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append("<option value=''>--Seleccione Trabajador--</option>");
                        $.each(responseX.listTrabajadoresTurno, function (indexX, valueX) {
                            var nombres = valueX.trabNombres + " " + valueX.trabApellidoPaterno + " " + valueX.trabApellidoMaterno;
                            var trab = "<option value=" + valueX.trabId + ">" + nombres + "</option>";
                            $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append(trab);
                            if (!$.trim(value.trabId)) {
                                $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).prop('selectedIndex', 0);
                            } else {
                                document.getElementById("listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).value = value.trabId;
                            }
                        });
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).bind("change", function () {
                            updateVentasLiquidaTrabajadorSurt(tudi_id, value.surtId, $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).val());
                        });
                    }
                });

                $("#btnVentasLiquidaAddEntrega_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddEntrega(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddDevolu_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddDevolu(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddGasto_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddGasto(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddIngreso_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddIngreso(tudi_id, value.surtId);
                });

            });

            $('#tablaVentasRegistroVentasLiquidacionTurno').dataTable().fnDestroy();

            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").empty();
            var foot = "<tr>\
                              <th class='hide'></th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>TOTAL</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(montoT) + "</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(entregadoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(devolucionT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(gastoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ingresoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(faltanteT) + "</th>\
                            </tr>";
            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").append(foot);

            $('#tablaVentasRegistroVentasLiquidacionTurno').DataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });

        }
    });
}

function llenarVentasRegistroVentasLiquidacionLecturasSurtidores(tudi_id) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_lectura_fin_turno&tudi_id=" + tudi_id,
        success: function (response) {
            $("#tablaVentasRegistroVentasLecturaFinalBody").empty();
            $.each(response.listLecturaFinal, function (index, value) {
                var surtidor, lado, manguera, producto, precio, lectura_inicial, lectura_final;
                var venta = 0.00;
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
                if (!$.trim(value.prvePrecioUnitario)) {
                    precio = "";
                } else {
                    precio = formatNumeroDecimal(value.prvePrecioUnitario);
                }
                if (!$.trim(value.lediLecturaInicial)) {
                    lectura_inicial = "";
                } else {
                    lectura_inicial = formatNumeroDecimal(value.lediLecturaInicial);
                }
                if (!$.trim(value.lediLecturaFinal)) {
                    lectura_final = "";
                } else {
                    lectura_final = value.lediLecturaFinal;
                    if (!$.trim(value.lediLecturaInicial)) {
                    } else {
                        if (!$.trim(value.prvePrecioUnitario)) {
                        } else {
                            venta = (value.lediLecturaFinal - value.lediLecturaInicial) * (value.prvePrecioUnitario);
                        }
                    }
                }
                var body = '<tr>\
                                  <td class="hide">\
                                    <input name="ledi_id" type="text" value="' + value.lediId + '" >\
                                  </td>\
                                  <td style="text-align: left;">' + surtidor + '</td>\
                                  <td style="text-align: left;">' + lado + '</td>\
                                  <td style="text-align: left;">' + manguera + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">' + precio + '</td>\
                                  <td style="text-align: center;">' + lectura_inicial + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="ledi_lectura_final" value="' + lectura_final + '" type="text" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(venta) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLecturaFinalBody").append(body);
            });

            $("#tablaVentasRegistroVentasLecturaProductoBody").empty();
            $.each(response.listStock, function (index, value) {
                var producto, galIni, galMaq, devTanq, lecturaGal, galVen, galDev;
                var stockAnt = 0.00;
                var stock = 0.00;
                var merma = 0.00;
                if (!$.trim(value.prodDescripcion)) {
                    producto = "";
                } else {
                    if (!$.trim(value.prodNombre)) {
                        producto = value.prodDescripcion;
                    } else {
                        producto = value.prodDescripcion + " - " + value.prodNombre;
                    }
                }
                if (!$.trim(value.galonesIniciales)) {
                    galIni = "";
                } else {
                    galIni = formatNumeroDecimal(value.galonesIniciales);
                    stockAnt += value.galonesIniciales;
                    stock += value.galonesIniciales;
                    merma += value.galonesIniciales;
                }
                if (!$.trim(value.galonesCompradosFactAnt)) {
                } else {
                    stockAnt += value.galonesCompradosFactAnt;
                    stock += value.galonesCompradosFactAnt;
                    merma += value.galonesCompradosFactAnt;
                }
                if (!$.trim(value.galonesCompradosAnt)) {
                } else {
                    stockAnt += value.galonesCompradosAnt;
                    stock += value.galonesCompradosAnt;
                    merma += value.galonesCompradosAnt;
                }
                var galComp = 0.00;
                if (!$.trim(value.galonesCompradosFact)) {
                } else {
                    galComp += value.galonesCompradosFact;
                    stock += value.galonesCompradosFact;
                    merma += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesComprados)) {
                } else {
                    galComp += value.galonesComprados;
                    stock += value.galonesComprados;
                    merma += value.galonesComprados;
                }
                if (!$.trim(value.lecturaMaquina)) {
                    galMaq = "";
                } else {
                    galMaq = formatNumeroDecimal(value.lecturaMaquina);
                    stockAnt -= value.lecturaMaquina;
                    stock -= value.lecturaMaquina;
                    merma -= value.lecturaMaquina;
                }
                if (!$.trim(value.devolucionTanque)) {
                    devTanq = "";
                } else {
                    devTanq = formatNumeroDecimal(value.devolucionTanque);
                    stockAnt += value.devolucionTanque;
                    stock += value.devolucionTanque;
                    merma += value.devolucionTanque;
                }
                if (!$.trim(value.galonesVendidos)) {
                    galVen = "";
                } else {
                    galVen = formatNumeroDecimal(value.galonesVendidos);
                    stock -= value.galonesVendidos;
                    merma -= value.galonesVendidos;
                }
                if (!$.trim(value.galonesDevueltos)) {
                    galDev = "";
                } else {
                    galDev = formatNumeroDecimal(value.galonesDevueltos);
                    stock += value.galonesDevueltos;
                    merma += value.galonesDevueltos;
                }
                if (!$.trim(value.leprLecturaFisica)) {
                    lecturaGal = "";
                } else {
                    lecturaGal = value.leprLecturaFisica;
                    merma -= value.leprLecturaFisica;
                }
                var body = '<tr>\
                                  <td class="hide">\
                                    <input name="prod_id" type="text" value="' + value.prodId + '" >\
                                  </td>\
                                  <td style="text-align: center;">' + (index + 1) + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stockAnt) + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(galComp) + '</td>\
                                  <td style="text-align: center;">' + galVen + '</td>\
                                  <td style="text-align: center;">' + galDev + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stock) + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="lepr_lectura_fisica" value="' + lecturaGal + '" type="text" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(merma) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLecturaProductoBody").append(body);
            });

            var montoT, entregadoT, devolucionT, gastoT, ingresoT, faltanteT;
            montoT = entregadoT = devolucionT = gastoT = ingresoT = faltanteT = 0.00;
            $("#tablaVentasRegistroVentasLiquidacionTurnoBody").empty();
            $.each(response.listLecturaLiquidacion, function (index, value) {
                var surtidor, monto, entregado, devolucion, gasto, ingreso;
                var faltante = 0.00;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.tusuMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.tusuMonto);
                    faltante += value.tusuMonto;
                    montoT += value.tusuMonto;
                }
                if (!$.trim(value.tusuEntregado)) {
                    entregado = "";
                } else {
                    entregado = formatNumeroDecimal(value.tusuEntregado);
                    faltante -= value.tusuEntregado;
                    entregadoT += value.tusuEntregado;
                }
                if (!$.trim(value.devolucion)) {
                    devolucion = "";
                } else {
                    devolucion = formatNumeroDecimal(value.devolucion);
                    faltante -= value.devolucion;
                    devolucionT += value.devolucion;
                }
                if (!$.trim(value.gadiMonto)) {
                    gasto = "";
                } else {
                    gasto = formatNumeroDecimal(value.gadiMonto);
                    faltante -= value.gadiMonto;
                    gastoT += value.gadiMonto;
                }
                if (!$.trim(value.indiMonto)) {
                    ingreso = "";
                } else {
                    ingreso = formatNumeroDecimal(value.indiMonto);
                    faltante += value.indiMonto;
                    ingresoT += value.indiMonto;
                }
                faltanteT += faltante;
                var body = '<tr>\
                                  <td align="center" class="hide">\
                                    <input name="surt_id" type="text" value="' + value.surtId + '" >\
                                  </td>\
                                  <td align="center">' + surtidor + '</td>\
                                  <td align="center">\
                                    <select id="listVentasRegistroVentasLiquidTrabTurno_' + value.surtId + '" class="form-select" name="trab_id" required></select>\
                                  </td>\
                                  <td align="center">' + monto + '</td>\
                                  <td align="center">' + entregado + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddEntrega_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidEntregado">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + devolucion + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddDevolu_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidDevolu">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + gasto + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddGasto_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidGasto">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + ingreso + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddIngreso_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidIngreso">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + formatNumeroDecimal(faltante) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLiquidacionTurnoBody").append(body);

                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=list_trabajadores_turno&tudi_id=" + tudi_id,
                    success: function (responseX) {
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append("<option value=''>--Seleccione Trabajador--</option>");
                        $.each(responseX.listTrabajadoresTurno, function (indexX, valueX) {
                            var nombres = valueX.trabNombres + " " + valueX.trabApellidoPaterno + " " + valueX.trabApellidoMaterno;
                            var trab = "<option value=" + valueX.trabId + ">" + nombres + "</option>";
                            $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append(trab);
                            if (!$.trim(value.trabId)) {
                                $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).prop('selectedIndex', 0);
                            } else {
                                document.getElementById("listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).value = value.trabId;
                            }
                        });
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).bind("change", function () {
                            updateVentasLiquidaTrabajadorSurt(tudi_id, value.surtId, $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).val());
                        });
                    }
                });

                $("#btnVentasLiquidaAddEntrega_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddEntrega(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddDevolu_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddDevolu(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddGasto_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddGasto(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddIngreso_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddIngreso(tudi_id, value.surtId);
                });

            });

            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").empty();
            var foot = "<tr>\
                              <th class='hide'></th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>TOTAL</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(montoT) + "</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(entregadoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(devolucionT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(gastoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ingresoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(faltanteT) + "</th>\
                            </tr>";
            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").append(foot);
        }
    });

}

function llenarVentasLiquidacionDiariaStock(tudi_id) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=list_liquidacion_stock&tudi_id=" + tudi_id,
        success: function (response) {
            $("#tablaVentasRegistroVentasLecturaProductoBody").empty();
            $.each(response.listStock, function (index, value) {
                var producto, galIni, galMaq, devTanq, lecturaGal, galVen, galDev;
                var stockAnt = 0.00;
                var stock = 0.00;
                var merma = 0.00;
                if (!$.trim(value.prodDescripcion)) {
                    producto = "";
                } else {
                    if (!$.trim(value.prodNombre)) {
                        producto = value.prodDescripcion;
                    } else {
                        producto = value.prodDescripcion + " - " + value.prodNombre;
                    }
                }
                if (!$.trim(value.galonesIniciales)) {
                    galIni = "";
                } else {
                    galIni = formatNumeroDecimal(value.galonesIniciales);
                    stockAnt += value.galonesIniciales;
                    stock += value.galonesIniciales;
                    merma += value.galonesIniciales;
                }
                if (!$.trim(value.galonesCompradosFactAnt)) {
                } else {
                    stockAnt += value.galonesCompradosFactAnt;
                    stock += value.galonesCompradosFactAnt;
                    merma += value.galonesCompradosFactAnt;
                }
                if (!$.trim(value.galonesCompradosAnt)) {
                } else {
                    stockAnt += value.galonesCompradosAnt;
                    stock += value.galonesCompradosAnt;
                    merma += value.galonesCompradosAnt;
                }
                var galComp = 0.00;
                if (!$.trim(value.galonesCompradosFact)) {
                } else {
                    galComp += value.galonesCompradosFact;
                    stock += value.galonesCompradosFact;
                    merma += value.galonesCompradosFact;
                }
                if (!$.trim(value.galonesComprados)) {
                } else {
                    galComp += value.galonesComprados;
                    stock += value.galonesComprados;
                    merma += value.galonesComprados;
                }
                if (!$.trim(value.lecturaMaquina)) {
                    galMaq = "";
                } else {
                    galMaq = formatNumeroDecimal(value.lecturaMaquina);
                    stockAnt -= value.lecturaMaquina;
                    stock -= value.lecturaMaquina;
                    merma -= value.lecturaMaquina;
                }
                if (!$.trim(value.devolucionTanque)) {
                    devTanq = "";
                } else {
                    devTanq = formatNumeroDecimal(value.devolucionTanque);
                    stockAnt += value.devolucionTanque;
                    stock += value.devolucionTanque;
                    merma += value.devolucionTanque;
                }
                if (!$.trim(value.galonesVendidos)) {
                    galVen = "";
                } else {
                    galVen = formatNumeroDecimal(value.galonesVendidos);
                    stock -= value.galonesVendidos;
                    merma -= value.galonesVendidos;
                }
                if (!$.trim(value.galonesDevueltos)) {
                    galDev = "";
                } else {
                    galDev = formatNumeroDecimal(value.galonesDevueltos);
                    stock += value.galonesDevueltos;
                    merma += value.galonesDevueltos;
                }
                if (!$.trim(value.leprLecturaFisica)) {
                    lecturaGal = "";
                } else {
                    lecturaGal = value.leprLecturaFisica;
                    merma -= value.leprLecturaFisica;
                }
                var body = '<tr>\
                                  <td class="hide">\
                                    <input name="prod_id" type="text" value="' + value.prodId + '" >\
                                  </td>\
                                  <td style="text-align: center;">' + (index + 1) + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stockAnt) + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(galComp) + '</td>\
                                  <td style="text-align: center;">' + galVen + '</td>\
                                  <td style="text-align: center;">' + galDev + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stock) + '</td>\
                                  <td style="text-align: center;">\
                                    <input name="lepr_lectura_fisica" value="' + lecturaGal + '" type="text" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                  </td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(merma) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLecturaProductoBody").append(body);
            });
        }
    });

}

function updateVentasLiquidaTrabajadorSurt(tudiId, surtId, trabId) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=update_liquida_trabajador&tudi_id=" + tudiId + "&surt_id=" + surtId + "&trab_id=" + trabId,
        success: function (response) {
        }
    });
}

function llenarVentasLiquidaAddEntrega(tudiId, surtId) {
    $("#modalVentasRegistroVentasLiquidEntregado").empty();
    var modal = '<div class="modal-dialog">\
                  <form id="formVentasLiquidaAddMontoEntregado" method="post" action="./Ventas?url=add_monto_entregado&tudi_id=' + tudiId + '&surt_id=' + surtId + '">\
                    <div class="modal-content border-light">\
                      <div class="modal-header bg-light">\
                        <h5 class="modal-title"><i class="fa fa-inbox"></i> Añadir Monto Entregado</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                          <span aria-hidden="true">&times;</span>\
                        </button>\
                      </div>\
                      <div class="modal-body">\
			<div class="form-group">\
			  <label for="iptVentasLiquidaAddMontoEntregado" class="col-form-label">Monto (S/) :</label>\
			  <input id="iptVentasLiquidaAddMontoEntregado" type="text" name="tusu_entregado" class="form-control" \
                          placeholder="Ingrese monto entregado por el trabajador" onkeypress="return soloNumDecimal(event, this.value)" required >\
			</div>\
                      </div>\
                      <div class="modal-footer">\
                        <button type="submit" class="btn btn-primary">\
                          <i class="fa fa-save"></i> Guardar\
                        </button>\
                        <button id="dismissModalVentasRegistroVentasLiquidMontoEntreg" type="button" class="btn btn-danger" data-dismiss="modal" >\
                          <i class="fa fa-ban"></i> Cerrar\
                        </button>\
                      </div>\
                    </div>\
		  </form>\
                 </div>';
    $("#modalVentasRegistroVentasLiquidEntregado").append(modal);
    $("#formVentasLiquidaAddMontoEntregado").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasLiquidaAddMontoEntregado").attr("action"),
            data: $("#formVentasLiquidaAddMontoEntregado").serialize(),
            success: function (responseX) {
                llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                $("#dismissModalVentasRegistroVentasLiquidMontoEntreg").trigger("click");
            }
        });
    });
}

function llenarVentasLiquidaAddDevolu(tudiId, surtId) {
    $("#modalVentasRegistroVentasLiquidDevolu").empty();
    var modal = '<div class="modal-dialog">\
                  <form id="formVentasLiquidaAddDevolu" method="post" action="./Ventas?url=add_devolucion_tanque&tudi_id=' + tudiId + '&surt_id=' + surtId + '">\
                    <div class="modal-content border-light">\
                      <div class="modal-header bg-light">\
                        <h5 class="modal-title"><i class="fa fa-inbox"></i> Añadir Devolucion a Tanque</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                          <span aria-hidden="true">&times;</span>\
                        </button>\
                      </div>\
                      <div class="modal-body">\
			<div class="form-group">\
                          <label for="listVentasLiquidaAddDevoluProduc" class="col-form-label">Producto :</label>\
                          <select id="listVentasLiquidaAddDevoluProduc" class="form-select" name="prod_id" required></select>\
			</div>\
			<div class="form-group">\
			  <label for="iptVentasLiquidaAddDevoluCant" class="col-form-label">Devolución (galones) :</label>\
			  <input id="iptVentasLiquidaAddDevoluCant" type="text" name="deta_devolucion" class="form-control" \
                          placeholder="Ingrese devolución al tanque" onkeypress="return soloNumDecimal(event, this.value)" required >\
			</div>\
                      </div>\
                      <div class="modal-footer">\
                        <button type="submit" class="btn btn-primary">\
                          <i class="fa fa-save"></i> Guardar\
                        </button>\
                        <button id="dismissModalVentasRegistroVentasLiquidDevolu" type="button" class="btn btn-danger" data-dismiss="modal" >\
                          <i class="fa fa-ban"></i> Cerrar\
                        </button>\
                      </div>\
                    </div>\
		  </form>\
                 </div>';
    $("#modalVentasRegistroVentasLiquidDevolu").append(modal);
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_productos",
        success: function (response) {
            $("#listVentasLiquidaAddDevoluProduc").empty();
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
                var opt = "<option value=" + value.prodId + ">" + descripcion + " - " + nombre + "</option>";
                $("#listVentasLiquidaAddDevoluProduc").append(opt);
            });
        }
    });
    $("#formVentasLiquidaAddDevolu").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasLiquidaAddDevolu").attr("action"),
            data: $("#formVentasLiquidaAddDevolu").serialize(),
            success: function (response) {
                llenarVentasRegistroVentasLiquidacionDevolucion(tudiId);
                llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                llenarVentasLiquidacionDiariaStock(tudiId);
                $("#dismissModalVentasRegistroVentasLiquidDevolu").trigger("click");
            }
        });
    });
}

function llenarVentasRegistroVentasLiquidacionDevolucion(tudiId) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_devolucion_tanque&tudi_id=" + tudiId,
        success: function (response) {
            $("#tablaVentasRegistroVentasDevolucionTurnoBody").empty();
            $.each(response.listDevolucion, function (index, value) {
                var surtidor, producto, devolucion, precio, monto;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.prodDescripcion)) {
                    producto = "";
                } else {
                    producto = value.prodDescripcion + " - " + value.prodNombre;
                }
                if (!$.trim(value.detaDevolucion)) {
                    devolucion = "";
                } else {
                    devolucion = formatNumeroDecimal(value.detaDevolucion);
                    if (!$.trim(value.prvePrecioUnitario)) {
                        monto = "";
                    } else {
                        monto = formatNumeroDecimal(value.detaDevolucion * value.prvePrecioUnitario);
                    }
                }
                if (!$.trim(value.prvePrecioUnitario)) {
                    precio = "";
                } else {
                    precio = formatNumeroDecimal(value.prvePrecioUnitario);
                }
                var body = '<tr>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + surtidor + '</td>\
                              <td style="text-align: left;">' + producto + '</td>\
                              <td style="text-align: center;">' + devolucion + '</td>\
                              <td style="text-align: center;">' + precio + '</td>\
                              <td style="text-align: center;">' + monto + '</td>\
                              <td align="center">\
                                <button type="button" id="btnVentasRegistroVentasDevolucionTurnoDel' + value.detaId + '" title="Quitar" class="btn btn-danger btn-sm">\
                                  <i class="fa fa-remove"></i>\
                                </button>\
                              </td>\
                            </tr>';
                $("#tablaVentasRegistroVentasDevolucionTurnoBody").append(body);

                $("#btnVentasRegistroVentasDevolucionTurnoDel" + value.detaId).click(function () {
                    $.ajax({
                        dataType: 'json',
                        url: "./Ventas?url=del_devolucion_tanque&deta_id=" + value.detaId,
                        success: function (responseX) {
                            llenarVentasRegistroVentasLiquidacionDevolucion(tudiId);
                            llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                        }
                    });
                });

            });

        }
    });

}

function llenarVentasLiquidaAddGasto(tudiId, surtId) {
    $("#modalVentasRegistroVentasLiquidGasto").empty();
    var modal = '<div class="modal-dialog">\
                  <form id="formVentasLiquidaAddGasto" method="post" action="./Ventas?url=add_gasto_turno&tudi_id=' + tudiId + '&surt_id=' + surtId + '">\
                    <div class="modal-content border-light">\
                      <div class="modal-header bg-light">\
                        <h5 class="modal-title"><i class="fa fa-inbox"></i> Añadir Gasto</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                          <span aria-hidden="true">&times;</span>\
                        </button>\
                      </div>\
                      <div class="modal-body">\
			<div class="form-group">\
                          <label for="listVentasLiquidaAddGastoTipo" class="col-form-label">Tipo de Gasto :</label>\
                          <select id="listVentasLiquidaAddGastoTipo" class="form-select" name="tiga_id" required></select>\
			</div>\
			<div class="form-group">\
                          <label for="textVentasLiquidaAddGastoDesc" class="col-form-label">Descripción :</label>\
                          <textarea rows="3" id="textVentasLiquidaAddGastoDesc" name="gadi_descripcion" class="form-control" \
                          placeholder="Ingrese descripción o concepto del gasto" form="formVentasLiquidaAddGasto" required></textarea>\
			</div>\
			<div class="form-group hide">\
			  <input type="checkbox" id="iptVentasLiquidaAddGastoCombustible" value="true" name="tiga_combustible" class="filled-in chk-col-danger" >\
			  <label for="iptVentasLiquidaAddGastoCombustible">Es Combustible</label>\
			</div>\
			<div id="divModalVentasRegistroVentasLiquidGastoCompra"></div>\
			<div class="form-group">\
			  <label for="iptVentasLiquidaAddGastoMonto" class="col-form-label">Monto (S/) :</label>\
			  <input id="iptVentasLiquidaAddGastoMonto" type="text" name="gadi_monto" class="form-control" \
                          placeholder="Ingrese monto de gasto en soles" onkeypress="return soloNumDecimal(event, this.value)" required >\
			</div>\
                      </div>\
                      <div class="modal-footer">\
                        <button type="submit" class="btn btn-primary">\
                          <i class="fa fa-save"></i> Guardar\
                        </button>\
                        <button id="dismissModalVentasRegistroVentasLiquidGasto" type="button" class="btn btn-danger" data-dismiss="modal" >\
                          <i class="fa fa-ban"></i> Cerrar\
                        </button>\
                      </div>\
                    </div>\
		  </form>\
                 </div>';
    $("#modalVentasRegistroVentasLiquidGasto").append(modal);
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_gasto",
        success: function (response) {
            $("#listVentasLiquidaAddGastoTipo").append("<option value=''>--Seleccione Tipo de Gasto--</option>");
            $.each(response.listTiposGasto, function (index, value) {
                var nombre;
                if (!$.trim(value.tigaNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tigaNombre;
                }
                var opt = "<option value=" + value.tigaId + ">" + nombre + "</option>";
                $("#listVentasLiquidaAddGastoTipo").append(opt);
            });

            $("#listVentasLiquidaAddGastoTipo").change(function () {
                $.ajax({
                    dataType: 'json',
                    url: "./TablasMaestras?url=info_tipo_gasto&tiga_id=" + $("#listVentasLiquidaAddGastoTipo").val(),
                    success: function (responseInfo) {
                        if (responseInfo.esCombustible) {
                            $("#iptVentasLiquidaAddGastoCombustible").prop("checked", true);
                            var comb = '<div class="form-group">\
                                            <label for="listVentasLiquidaAddGastoProducto" class="col-form-label">Producto :</label>\
                                            <select id="listVentasLiquidaAddGastoProducto" class="form-select" name="prod_id" required></select>\
                                        </div>\
                                        <div class="form-group">\
                                            <label for="iptVentasLiquidaAddGastoGalones" class="col-form-label">Galones :</label>\
                                            <input id="iptVentasLiquidaAddGastoGalones" type="text" name="cotu_galones" class="form-control" \
                                            placeholder="Ingrese galones de combustible" onkeypress="return soloNumDecimal(event, this.value)" required >\
                                        </div>';
                            $("#divModalVentasRegistroVentasLiquidGastoCompra").append(comb);
                            llenarVentasRegistroVentasLiquidacionGastosProductos();
                        } else {
                            $("#iptVentasLiquidaAddGastoCombustible").prop("checked", false);
                            $("#divModalVentasRegistroVentasLiquidGastoCompra").empty();
                        }
                    }
                });
            });

        }
    });
    $("#formVentasLiquidaAddGasto").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasLiquidaAddGasto").attr("action"),
            data: $("#formVentasLiquidaAddGasto").serialize(),
            success: function (response) {
                llenarVentasRegistroVentasLiquidacionGastos(tudiId);
                llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                $("#dismissModalVentasRegistroVentasLiquidGasto").trigger("click");
            }
        });
    });
}

function llenarVentasRegistroVentasLiquidacionGastosProductos() {
    $("#listVentasLiquidaAddGastoProducto").empty();
    $("#listVentasLiquidaAddGastoProducto").append('<option value="" style="font-weight: 600;">--Seleccione Producto--</option>');
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
                $("#listVentasLiquidaAddGastoProducto").append(opt);
            });
        }
    });
}

function llenarVentasRegistroVentasLiquidacionGastos(tudiId) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_gastos_turno&tudi_id=" + tudiId,
        success: function (response) {
            $("#tablaVentasRegistroVentasGastosTurnoBody").empty();
            $.each(response.listGastos, function (index, value) {
                var surtidor, tipo, descrip, monto;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.tigaNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tigaNombre;
                }
                if (!$.trim(value.gadiDescripcion)) {
                    descrip = "";
                } else {
                    descrip = value.gadiDescripcion;
                }
                if (!$.trim(value.gadiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.gadiMonto);
                }
                var body = '<tr>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + surtidor + '</td>\
                              <td style="text-align: left;">' + tipo + '</td>\
                              <td style="text-align: left;">' + descrip + '</td>\
                              <td style="text-align: center;">' + monto + '</td>\
                              <td align="center">\
                                <button type="button" id="btnVentasRegistroVentasGastoTurnoDel' + value.gadiId + '" title="Quitar" class="btn btn-danger btn-sm">\
                                  <i class="fa fa-remove"></i>\
                                </button>\
                              </td>\
                            </tr>';
                $("#tablaVentasRegistroVentasGastosTurnoBody").append(body);

                $("#btnVentasRegistroVentasGastoTurnoDel" + value.gadiId).click(function () {
                    $.ajax({
                        dataType: 'json',
                        url: "./Ventas?url=del_gasto_turno&gadi_id=" + value.gadiId,
                        success: function (responseX) {
                            llenarVentasRegistroVentasLiquidacionGastos(tudiId);
                            llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                        }
                    });
                });

            });
        }
    });

}

function llenarVentasLiquidaAddIngreso(tudiId, surtId) {
    $("#modalVentasRegistroVentasLiquidIngreso").empty();
    var modal = '<div class="modal-dialog">\
                  <form id="formVentasLiquidaAddIngreso" method="post" action="./Ventas?url=add_ingreso_turno&tudi_id=' + tudiId + '&surt_id=' + surtId + '">\
                    <div class="modal-content border-light">\
                      <div class="modal-header bg-light">\
                        <h5 class="modal-title"><i class="fa fa-inbox"></i> Añadir Ingreso</h5>\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                          <span aria-hidden="true">&times;</span>\
                        </button>\
                      </div>\
                      <div class="modal-body">\
			<div class="form-group">\
                          <label for="listVentasLiquidaAddIngresoTipo" class="col-form-label">Tipo de Ingreso :</label>\
                          <select id="listVentasLiquidaAddIngresoTipo" class="form-select" name="tiin_id" required></select>\
			</div>\
			<div class="form-group">\
                          <label for="textVentasLiquidaAddIngresoDesc" class="col-form-label">Descripción :</label>\
                          <textarea rows="3" id="textVentasLiquidaAddIngresoDesc" name="indi_descripcion" class="form-control" \
                          placeholder="Ingrese descripción o concepto del ingreso" form="formVentasLiquidaAddIngreso" required></textarea>\
			</div>\
			<div class="form-group">\
			  <label for="iptVentasLiquidaAddIngresoMonto" class="col-form-label">Monto (S/) :</label>\
			  <input id="iptVentasLiquidaAddIngresoMonto" type="text" name="indi_monto" class="form-control" \
                          placeholder="Ingrese monto de gasto en soles" onkeypress="return soloNumDecimal(event, this.value)" required >\
			</div>\
                      </div>\
                      <div class="modal-footer">\
                        <button type="submit" class="btn btn-primary">\
                          <i class="fa fa-save"></i> Guardar\
                        </button>\
                        <button id="dismissModalVentasRegistroVentasLiquidIngreso" type="button" class="btn btn-danger" data-dismiss="modal" >\
                          <i class="fa fa-ban"></i> Cerrar\
                        </button>\
                      </div>\
                    </div>\
		  </form>\
                 </div>';
    $("#modalVentasRegistroVentasLiquidIngreso").append(modal);
    $.ajax({
        dataType: 'json',
        url: "./TablasMaestras?url=lista_tipos_ingreso",
        success: function (response) {
            $.each(response.listTiposIngreso, function (index, value) {
                var nombre;
                if (!$.trim(value.tiinNombre)) {
                    nombre = "";
                } else {
                    nombre = value.tiinNombre;
                }
                var opt = "<option value=" + value.tiinId + ">" + nombre + "</option>";
                $("#listVentasLiquidaAddIngresoTipo").append(opt);
            });
        }
    });
    $("#formVentasLiquidaAddIngreso").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasLiquidaAddIngreso").attr("action"),
            data: $("#formVentasLiquidaAddIngreso").serialize(),
            success: function (response) {
                llenarVentasRegistroVentasLiquidacionIngresos(tudiId);
                llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                $("#dismissModalVentasRegistroVentasLiquidIngreso").trigger("click");
            }
        });
    });
}

function llenarVentasRegistroVentasLiquidacionIngresos(tudiId) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_ingresos_turno&tudi_id=" + tudiId,
        success: function (response) {
            $("#tablaVentasRegistroVentasIngresosTurnoBody").empty();
            $.each(response.listIngresos, function (index, value) {
                var surtidor, tipo, descrip, monto;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.tiinNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tiinNombre;
                }
                if (!$.trim(value.indiDescripcion)) {
                    descrip = "";
                } else {
                    descrip = value.indiDescripcion;
                }
                if (!$.trim(value.indiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.indiMonto);
                }
                var body = '<tr>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + surtidor + '</td>\
                              <td style="text-align: left;">' + tipo + '</td>\
                              <td style="text-align: left;">' + descrip + '</td>\
                              <td style="text-align: center;">' + monto + '</td>\
                              <td align="center">\
                                <button type="button" id="btnVentasRegistroVentasIngresoTurnoDel' + value.indiId + '" title="Quitar" class="btn btn-danger btn-sm">\
                                  <i class="fa fa-remove"></i>\
                                </button>\
                              </td>\
                            </tr>';
                $("#tablaVentasRegistroVentasIngresosTurnoBody").append(body);

                $("#btnVentasRegistroVentasIngresoTurnoDel" + value.indiId).click(function () {
                    $.ajax({
                        dataType: 'json',
                        url: "./Ventas?url=del_ingreso_turno&indi_id=" + value.indiId,
                        success: function (responseX) {
                            llenarVentasRegistroVentasLiquidacionIngresos(tudiId);
                            llenarVentasRegistroVentasLiquidacionUpdateCampos(tudiId);
                        }
                    });
                });

            });
        }
    });

}

function eventFormVentasRegistroVentasLecturaFinal() {
    $("#formVentasRegistroVentasLecturaFinal").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasRegistroVentasLecturaFinal").attr("action"),
            data: $("#formVentasRegistroVentasLecturaFinal").serialize(),
            success: function (responseF) {
                llenarVentasRegistroVentasLiquidacionLecturasSurtidores(responseF.tudi_id);
            }
        });
    });
}

function llenarVentasRegistroVentasLiquidacionUpdateCampos(tudi_id) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=lista_lectura_fin_turno&tudi_id=" + tudi_id,
        success: function (response) {

            var montoT, entregadoT, devolucionT, gastoT, ingresoT, faltanteT;
            montoT = entregadoT = devolucionT = gastoT = ingresoT = faltanteT = 0.00;
            $("#tablaVentasRegistroVentasLiquidacionTurnoBody").empty();
            $.each(response.listLecturaLiquidacion, function (index, value) {
                var surtidor, monto, entregado, devolucion, gasto, ingreso;
                var faltante = 0.00;
                if (!$.trim(value.surtNombre)) {
                    surtidor = "";
                } else {
                    surtidor = value.surtNombre;
                }
                if (!$.trim(value.tusuMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.tusuMonto);
                    faltante += value.tusuMonto;
                    montoT += value.tusuMonto;
                }
                if (!$.trim(value.tusuEntregado)) {
                    entregado = "";
                } else {
                    entregado = formatNumeroDecimal(value.tusuEntregado);
                    faltante -= value.tusuEntregado;
                    entregadoT += value.tusuEntregado;
                }
                if (!$.trim(value.devolucion)) {
                    devolucion = "";
                } else {
                    devolucion = formatNumeroDecimal(value.devolucion);
                    faltante -= value.devolucion;
                    devolucionT += value.devolucion;
                }
                if (!$.trim(value.gadiMonto)) {
                    gasto = "";
                } else {
                    gasto = formatNumeroDecimal(value.gadiMonto);
                    faltante -= value.gadiMonto;
                    gastoT += value.gadiMonto;
                }
                if (!$.trim(value.indiMonto)) {
                    ingreso = "";
                } else {
                    ingreso = formatNumeroDecimal(value.indiMonto);
                    faltante += value.indiMonto;
                    ingresoT += value.indiMonto;
                }
                faltanteT += faltante;
                var body = '<tr>\
                                  <td align="center" class="hide">\
                                    <input name="surt_id" type="text" value="' + value.surtId + '" >\
                                  </td>\
                                  <td align="center">' + surtidor + '</td>\
                                  <td align="center">\
                                    <select id="listVentasRegistroVentasLiquidTrabTurno_' + value.surtId + '" class="form-select" name="trab_id" required></select>\
                                  </td>\
                                  <td align="center">' + monto + '</td>\
                                  <td align="center">' + entregado + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddEntrega_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidEntregado">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + devolucion + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddDevolu_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidDevolu">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + gasto + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddGasto_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidGasto">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + ingreso + '</td>\
                                  <td align="center">\
                                    <button type="button" id="btnVentasLiquidaAddIngreso_' + value.surtId + '" title="Añadir" class="btn btn-success btn-sm" \
                                    data-toggle="modal" data-target="#modalVentasRegistroVentasLiquidIngreso">\
                                      <i class="fa fa-plus"></i>\
                                    </button>\
                                  </td>\
                                  <td align="center">' + formatNumeroDecimal(faltante) + '</td>\
                                </tr>';
                $("#tablaVentasRegistroVentasLiquidacionTurnoBody").append(body);

                $.ajax({
                    dataType: 'json',
                    url: "./Ventas?url=list_trabajadores_turno&tudi_id=" + tudi_id,
                    success: function (responseX) {
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append("<option value=''>--Seleccione Trabajador--</option>");
                        $.each(responseX.listTrabajadoresTurno, function (indexX, valueX) {
                            var nombres = valueX.trabNombres + " " + valueX.trabApellidoPaterno + " " + valueX.trabApellidoMaterno;
                            var trab = "<option value=" + valueX.trabId + ">" + nombres + "</option>";
                            $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).append(trab);
                            if (!$.trim(value.trabId)) {
                                $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).prop('selectedIndex', 0);
                            } else {
                                document.getElementById("listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).value = value.trabId;
                            }
                        });
                        $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).bind("change", function () {
                            updateVentasLiquidaTrabajadorSurt(tudi_id, value.surtId, $("#listVentasRegistroVentasLiquidTrabTurno_" + value.surtId).val());
                        });
                    }
                });

                $("#btnVentasLiquidaAddEntrega_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddEntrega(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddDevolu_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddDevolu(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddGasto_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddGasto(tudi_id, value.surtId);
                });

                $("#btnVentasLiquidaAddIngreso_" + value.surtId).click(function () {
                    llenarVentasLiquidaAddIngreso(tudi_id, value.surtId);
                });

            });

            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").empty();
            var foot = "<tr>\
                              <th class='hide'></th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>TOTAL</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(montoT) + "</th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(entregadoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(devolucionT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(gastoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ingresoT) + "</th>\
                              <th style='text-align: center;'></th>\
                              <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(faltanteT) + "</th>\
                            </tr>";
            $("#tablaVentasRegistroVentasLiquidacionTurnoFoot").append(foot);
        }
    });

}

function eventFormVentasRegistroVentasLiquidarStock() {
    $("#formVentasRegistroVentasLecturaLiquidacionStock").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $("#formVentasRegistroVentasLecturaLiquidacionStock").attr("action"),
            data: $("#formVentasRegistroVentasLecturaLiquidacionStock").serialize(),
            success: function (responseL) {
                llenarVentasLiquidacionDiariaStock(responseL.tudi_id);
            }
        });
    });
}

function eventFormVentasRegistroVentasCierreTurno() {

    $("#formVentasRegistroVentasCierreTurno").submit(function (evt) {
        evt.preventDefault();
        alertify.confirm("¿Está seguro que desea liquidar el turno?", function (e) {
            if (e) {
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $("#formVentasRegistroVentasCierreTurno").attr("action"),
                    data: $("#formVentasRegistroVentasCierreTurno").serialize(),
                    success: function (response) {
                        if (response.success) {
                            sub_menu_liquidacion();
                            imprimirVentasRegistroVentasCierreTurnoReporte(response);
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

function imprimirVentasRegistroVentasCierreTurnoReporte(response) {

    var tablaLectura = [];
    var tablaLecturaHead = [];
    tablaLecturaHead.push({text: 'Surtidor', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Lado', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Manguera', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Producto', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Precio', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Lectura Inicial', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Lectura Final', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Galones', style: 'tablaHead', alignment: 'center'});
    tablaLecturaHead.push({text: 'Venta', style: 'tablaHead', alignment: 'center'});
    tablaLectura.push(tablaLecturaHead);
    var ventaT, galonesT;
    ventaT = galonesT = 0.00;
    $.each(response.listLecturaFinal, function (index, value) {
        var surtidor, lado, manguera, producto, precio, lectura_inicial, lectura_final, galones;
        var venta = 0.00;
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
        if (!$.trim(value.prvePrecioUnitario)) {
            precio = "";
        } else {
            precio = formatNumeroDecimal(value.prvePrecioUnitario);
        }
        if (!$.trim(value.lediLecturaInicial)) {
            lectura_inicial = "";
        } else {
            lectura_inicial = formatNumeroDecimal(value.lediLecturaInicial);
        }
        if (!$.trim(value.lediLecturaFinal)) {
            lectura_final = "";
            galones = "";
        } else {
            lectura_final = formatNumeroDecimal(value.lediLecturaFinal);
            if (!$.trim(value.lediLecturaInicial)) {
            } else {
                if (!$.trim(value.prvePrecioUnitario)) {
                } else {
                    venta = (value.lediLecturaFinal - value.lediLecturaInicial) * (value.prvePrecioUnitario);
                    galones = (value.lediLecturaFinal - value.lediLecturaInicial);
                    galonesT += (value.lediLecturaFinal - value.lediLecturaInicial);
                    ventaT += (value.lediLecturaFinal - value.lediLecturaInicial) * (value.prvePrecioUnitario);
                }
            }
        }
        var tablaLecturaBody = [];
        tablaLecturaBody.push({text: surtidor, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: lado, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: manguera, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: producto, style: 'tablaBody', alignment: 'left'});
        tablaLecturaBody.push({text: precio, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: lectura_inicial, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: lectura_final, style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: formatNumeroDecimal(galones), style: 'tablaBody', alignment: 'center'});
        tablaLecturaBody.push({text: formatNumeroDecimal(venta), style: 'tablaBody', alignment: 'right'});
        tablaLectura.push(tablaLecturaBody);
    });
    var tablaLecturaFoot = [];
    tablaLecturaFoot.push({text: 'TOTAL', style: 'tablaTotal', alignment: 'right', colSpan: 7});
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push("");
    tablaLecturaFoot.push({text: formatNumeroDecimal(galonesT), style: 'tablaTotal', alignment: 'center'});
    tablaLecturaFoot.push({text: formatNumeroDecimal(ventaT), style: 'tablaTotal', alignment: 'right'});
    tablaLectura.push(tablaLecturaFoot);

    var tablaStock = [];
    var tablaStockHead = [];
    tablaStockHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Producto', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Stock Anterior', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Galones Comprados', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Galones Vendidos', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Devoluciones', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Stock Actual', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Lectura Física (galones)', style: 'tablaHead', alignment: 'center'});
    tablaStockHead.push({text: 'Merma', style: 'tablaHead', alignment: 'center'});
    tablaStock.push(tablaStockHead);
    $.each(response.listStock, function (index, value) {
        var producto, galIni, galMaq, devTanq, lecturaGal, galVen, galDev;
        var stockAnt = 0.00;
        var stock = 0.00;
        var merma = 0.00;
        if (!$.trim(value.prodDescripcion)) {
            producto = "";
        } else {
            if (!$.trim(value.prodNombre)) {
                producto = value.prodDescripcion;
            } else {
                producto = value.prodDescripcion + " - " + value.prodNombre;
            }
        }
        if (!$.trim(value.galonesIniciales)) {
            galIni = "";
        } else {
            galIni = formatNumeroDecimal(value.galonesIniciales);
            stockAnt += value.galonesIniciales;
            stock += value.galonesIniciales;
            merma += value.galonesIniciales;
        }
        if (!$.trim(value.galonesCompradosFactAnt)) {
        } else {
            stockAnt += value.galonesCompradosFactAnt;
            stock += value.galonesCompradosFactAnt;
            merma += value.galonesCompradosFactAnt;
        }
        if (!$.trim(value.galonesCompradosAnt)) {
        } else {
            stockAnt += value.galonesCompradosAnt;
            stock += value.galonesCompradosAnt;
            merma += value.galonesCompradosAnt;
        }
        var galComp = 0.00;
        if (!$.trim(value.galonesCompradosFact)) {
        } else {
            galComp += value.galonesCompradosFact;
            stock += value.galonesCompradosFact;
            merma += value.galonesCompradosFact;
        }
        if (!$.trim(value.galonesComprados)) {
        } else {
            galComp += value.galonesComprados;
            stock += value.galonesComprados;
            merma += value.galonesComprados;
        }
        if (!$.trim(value.lecturaMaquina)) {
            galMaq = "";
        } else {
            galMaq = formatNumeroDecimal(value.lecturaMaquina);
            stockAnt -= value.lecturaMaquina;
            stock -= value.lecturaMaquina;
            merma -= value.lecturaMaquina;
        }
        if (!$.trim(value.devolucionTanque)) {
            devTanq = "";
        } else {
            devTanq = formatNumeroDecimal(value.devolucionTanque);
            stockAnt += value.devolucionTanque;
            stock += value.devolucionTanque;
            merma += value.devolucionTanque;
        }
        if (!$.trim(value.galonesVendidos)) {
            galVen = "";
        } else {
            galVen = formatNumeroDecimal(value.galonesVendidos);
            stock -= value.galonesVendidos;
            merma -= value.galonesVendidos;
        }
        if (!$.trim(value.galonesDevueltos)) {
            galDev = "";
        } else {
            galDev = formatNumeroDecimal(value.galonesDevueltos);
            stock += value.galonesDevueltos;
            merma += value.galonesDevueltos;
        }
        if (!$.trim(value.leprLecturaFisica)) {
            lecturaGal = "";
        } else {
            lecturaGal = value.leprLecturaFisica;
            merma -= value.leprLecturaFisica;
        }
        var tablaStockBody = [];
        tablaStockBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: producto, style: 'tablaBody', alignment: 'left'});
        tablaStockBody.push({text: formatNumeroDecimal(stockAnt), style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: formatNumeroDecimal(galComp), style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: galVen, style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: galDev, style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: formatNumeroDecimal(stock), style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: formatNumeroDecimal(lecturaGal), style: 'tablaBody', alignment: 'center'});
        tablaStockBody.push({text: formatNumeroDecimal(merma), style: 'tablaBody', alignment: 'center'});
        tablaStock.push(tablaStockBody);
    });

    var tablaTurnoDevolu = [];
    var tablaTurnoDevoluHead = [];
    tablaTurnoDevoluHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevoluHead.push({text: 'Surtidor', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevoluHead.push({text: 'Producto', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevoluHead.push({text: 'Devolución (galones)', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevoluHead.push({text: 'Precio Venta', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevoluHead.push({text: 'Monto (S/)', style: 'tablaHead', alignment: 'center'});
    tablaTurnoDevolu.push(tablaTurnoDevoluHead);
    $.each(response.listDevolucion, function (index, value) {
        var surtidor, producto, devolucion, precio, monto;
        if (!$.trim(value.surtNombre)) {
            surtidor = "";
        } else {
            surtidor = value.surtNombre;
        }
        if (!$.trim(value.prodDescripcion)) {
            producto = "";
        } else {
            producto = value.prodDescripcion + " - " + value.prodNombre;
        }
        if (!$.trim(value.detaDevolucion)) {
            devolucion = "";
        } else {
            devolucion = formatNumeroDecimal(value.detaDevolucion);
            if (!$.trim(value.prvePrecioUnitario)) {
                monto = "";
            } else {
                monto = formatNumeroDecimal(value.detaDevolucion * value.prvePrecioUnitario);
            }
        }
        if (!$.trim(value.prvePrecioUnitario)) {
            precio = "";
        } else {
            precio = formatNumeroDecimal(value.prvePrecioUnitario);
        }
        var tablaTurnoDevoluBody = [];
        tablaTurnoDevoluBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
        tablaTurnoDevoluBody.push({text: surtidor, style: 'tablaBody', alignment: 'center'});
        tablaTurnoDevoluBody.push({text: producto, style: 'tablaBody', alignment: 'left'});
        tablaTurnoDevoluBody.push({text: devolucion, style: 'tablaBody', alignment: 'center'});
        tablaTurnoDevoluBody.push({text: precio, style: 'tablaBody', alignment: 'center'});
        tablaTurnoDevoluBody.push({text: monto, style: 'tablaBody', alignment: 'right'});
        tablaTurnoDevolu.push(tablaTurnoDevoluBody);
    });

    var tablaTurnoGastos = [];
    var tablaTurnoGastosHead = [];
    tablaTurnoGastosHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
    tablaTurnoGastosHead.push({text: 'Surtidor', style: 'tablaHead', alignment: 'center'});
    tablaTurnoGastosHead.push({text: 'Tipo Gasto', style: 'tablaHead', alignment: 'center'});
    tablaTurnoGastosHead.push({text: 'Descripción', style: 'tablaHead', alignment: 'center'});
    tablaTurnoGastosHead.push({text: 'Monto (S/)', style: 'tablaHead', alignment: 'center'});
    tablaTurnoGastos.push(tablaTurnoGastosHead);
    $.each(response.listGastos, function (index, value) {
        var surtidor, tipo, descrip, monto;
        if (!$.trim(value.surtNombre)) {
            surtidor = "";
        } else {
            surtidor = value.surtNombre;
        }
        if (!$.trim(value.tigaNombre)) {
            tipo = "";
        } else {
            tipo = value.tigaNombre;
        }
        if (!$.trim(value.gadiDescripcion)) {
            descrip = "";
        } else {
            descrip = value.gadiDescripcion;
        }
        if (!$.trim(value.gadiMonto)) {
            monto = "";
        } else {
            monto = formatNumeroDecimal(value.gadiMonto);
        }
        var tablaTurnoGastosBody = [];
        tablaTurnoGastosBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
        tablaTurnoGastosBody.push({text: surtidor, style: 'tablaBody', alignment: 'center'});
        tablaTurnoGastosBody.push({text: tipo, style: 'tablaBody', alignment: 'left'});
        tablaTurnoGastosBody.push({text: descrip, style: 'tablaBody', alignment: 'left'});
        tablaTurnoGastosBody.push({text: monto, style: 'tablaBody', alignment: 'right'});
        tablaTurnoGastos.push(tablaTurnoGastosBody);
    });

    var tablaTurnoIngresos = [];
    var tablaTurnoIngresosHead = [];
    tablaTurnoIngresosHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
    tablaTurnoIngresosHead.push({text: 'Surtidor', style: 'tablaHead', alignment: 'center'});
    tablaTurnoIngresosHead.push({text: 'Tipo Ingreso', style: 'tablaHead', alignment: 'center'});
    tablaTurnoIngresosHead.push({text: 'Descripción', style: 'tablaHead', alignment: 'center'});
    tablaTurnoIngresosHead.push({text: 'Monto (S/)', style: 'tablaHead', alignment: 'center'});
    tablaTurnoIngresos.push(tablaTurnoIngresosHead);
    $.each(response.listIngresos, function (index, value) {
        var surtidor, tipo, descrip, monto;
        if (!$.trim(value.surtNombre)) {
            surtidor = "";
        } else {
            surtidor = value.surtNombre;
        }
        if (!$.trim(value.tiinNombre)) {
            tipo = "";
        } else {
            tipo = value.tiinNombre;
        }
        if (!$.trim(value.indiDescripcion)) {
            descrip = "";
        } else {
            descrip = value.indiDescripcion;
        }
        if (!$.trim(value.indiMonto)) {
            monto = "";
        } else {
            monto = formatNumeroDecimal(value.indiMonto);
        }
        var tablaTurnoIngresosBody = [];
        tablaTurnoIngresosBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
        tablaTurnoIngresosBody.push({text: surtidor, style: 'tablaBody', alignment: 'center'});
        tablaTurnoIngresosBody.push({text: tipo, style: 'tablaBody', alignment: 'left'});
        tablaTurnoIngresosBody.push({text: descrip, style: 'tablaBody', alignment: 'left'});
        tablaTurnoIngresosBody.push({text: monto, style: 'tablaBody', alignment: 'right'});
        tablaTurnoIngresos.push(tablaTurnoIngresosBody);
    });

    var tablaLiquidacion = [];
    var tablaLiquidacionHead = [];
    tablaLiquidacionHead.push({text: 'Surtidor', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Trabajador', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Monto Vendido', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Monto Entregado', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Devolución Tanque', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Gastos', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Ingresos', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacionHead.push({text: 'Faltante', style: 'tablaHead', alignment: 'center'});
    tablaLiquidacion.push(tablaLiquidacionHead);
    var montoT, entregadoT, devolucionT, gastoT, ingresoT, faltanteT;
    montoT = entregadoT = devolucionT = gastoT = ingresoT = faltanteT = 0.00;
    $("#tablaVentasRegistroVentasLiquidacionTurnoBody").empty();
    $.each(response.listLecturaLiquidacion, function (index, value) {
        var surtidor, trabajador, monto, entregado, devolucion, gasto, ingreso;
        var faltante = 0.00;
        if (!$.trim(value.surtNombre)) {
            surtidor = "";
        } else {
            surtidor = value.surtNombre;
        }
        if (!$.trim(value.trabId)) {
            trabajador = "";
        } else {
            trabajador = value.trabNombres + " " + value.trabApellidoPaterno + " " + value.trabApellidoMaterno;
        }
        if (!$.trim(value.tusuMonto)) {
            monto = "";
        } else {
            monto = formatNumeroDecimal(value.tusuMonto);
            faltante += value.tusuMonto;
            montoT += value.tusuMonto;
        }
        if (!$.trim(value.tusuEntregado)) {
            entregado = "";
        } else {
            entregado = formatNumeroDecimal(value.tusuEntregado);
            faltante -= value.tusuEntregado;
            entregadoT += value.tusuEntregado;
        }
        if (!$.trim(value.devolucion)) {
            devolucion = "";
        } else {
            devolucion = formatNumeroDecimal(value.devolucion);
            faltante -= value.devolucion;
            devolucionT += value.devolucion;
        }
        if (!$.trim(value.gadiMonto)) {
            gasto = "";
        } else {
            gasto = formatNumeroDecimal(value.gadiMonto);
            faltante -= value.gadiMonto;
            gastoT += value.gadiMonto;
        }
        if (!$.trim(value.indiMonto)) {
            ingreso = "";
        } else {
            ingreso = formatNumeroDecimal(value.indiMonto);
            faltante += value.indiMonto;
            ingresoT += value.indiMonto;
        }
        faltanteT += faltante;
        var tablaLiquidacionBody = [];
        tablaLiquidacionBody.push({text: surtidor, style: 'tablaBody', alignment: 'center'});
        tablaLiquidacionBody.push({text: trabajador, style: 'tablaBody', alignment: 'left'});
        tablaLiquidacionBody.push({text: monto, style: 'tablaBody', alignment: 'right'});
        tablaLiquidacionBody.push({text: entregado, style: 'tablaBody', alignment: 'right'});
        tablaLiquidacionBody.push({text: devolucion, style: 'tablaBody', alignment: 'right'});
        tablaLiquidacionBody.push({text: gasto, style: 'tablaBody', alignment: 'right'});
        tablaLiquidacionBody.push({text: ingreso, style: 'tablaBody', alignment: 'right'});
        tablaLiquidacionBody.push({text: formatNumeroDecimal(faltante), style: 'tablaBody', alignment: 'right'});
        tablaLiquidacion.push(tablaLiquidacionBody);
    });
    var tablaLiquidacionFoot = [];
    tablaLiquidacionFoot.push({text: 'TOTAL', style: 'tablaTotal', alignment: 'center', colSpan: 2});
    tablaLiquidacionFoot.push("");
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(montoT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(entregadoT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(devolucionT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(gastoT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(ingresoT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacionFoot.push({text: formatNumeroDecimal(faltanteT), style: 'tablaTotal', alignment: 'right'});
    tablaLiquidacion.push(tablaLiquidacionFoot);

    var fecha = response.fecha;
    var turno = response.turno;

    var imageUrl_logo = './templates/img/logo.png';
    convertImgToDataURLviaCanvas(imageUrl_logo, function (base64Img) {
        var docDefinition = {
            //pageOrientation: 'landscape',
            info: {
                title: 'reporte_liquidacion_' + turno.toLowerCase() + '_' + fecha.split("/").join("_")
            },
            pageMargins: [10, 40, 10, 10],
            header: {
                margin: 10,
                table: {
                    widths: [15, '*', '*', '*', 15],
                    body: [
                        [
                            "",
                            {image: base64Img, width: 100, alignment: 'left'},
                            {text: 'REPORTE DE LIQUIDACIÓN - ' + turno.toUpperCase(), alignment: 'center', style: 'titulo'},
                            {text: 'FECHA : ' + fecha, alignment: 'right', style: 'titulo'},
                            ""
                        ]
                    ]
                },
                layout: {
                    hLineColor: 'white',
                    vLineColor: 'white'
                }
            },
            content: [
                {
                    text: 'LECTURA DE SURTIDORES', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [45, 30, 50, '*', 45, 60, 60, 60, 50],
                        body: tablaLectura
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                {
                    text: '\n'
                },
                {
                    text: 'STOCK DE PRODUCTOS', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [20, '*', 50, 50, 50, 50, 50, 50, 50, 50],
                        body: tablaStock
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                {
                    text: '\n'
                },
                {
                    text: 'LIQUIDACIÓN DE TURNO', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [40, '*', 60, 60, 60, 50, 50, 50],
                        body: tablaLiquidacion
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                {
                    text: '\n'
                },
                {
                    text: 'DEVOLUCIONES AL TANQUE', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [20, 40, '*', 80, 50, 50],
                        body: tablaTurnoDevolu
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                {
                    text: 'GASTOS DEL TURNO', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [20, 40, 50, '*', 60],
                        body: tablaTurnoGastos
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                },
                {
                    text: 'INGRESOS DEL TURNO', alignment: 'center', style: 'subtitulo'
                },
                {
                    table: {
                        widths: [20, 40, 50, '*', 60],
                        body: tablaTurnoIngresos
                    },
                    layout: {
                        hLineColor: '#ECECEC',
                        vLineColor: '#ECECEC'
                    }
                }
            ],
            styles: {
                titulo: {
                    fontSize: 9,
                    bold: true
                },
                subtitulo: {
                    fontSize: 7,
                    bold: true
                },
                tablaHead: {
                    color: 'white',
                    fillColor: '#DC3545',
                    fontSize: 7,
                    bold: true
                },
                tablaBody: {
                    fontSize: 7
                },
                tablaTotal: {
                    fillColor: '#F8F9FA',
                    fontSize: 7,
                    bold: true
                }
            }
        };
        pdfMake.createPdf(docDefinition).open();
    });
}