/*
 ========================
 @author carlos santander
 ========================
 */

function llenarVentasControlDiario(fecha) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=reporte_control_ventas&fecha=" + fecha,
        success: function (response) {
            $("#tablaVentasControlDiarioLiquidacionTurno").empty();
            var tabla = '<thead id="tablaVentasControlDiarioLiquidacionTurnoHead"></thead>\
                         <tbody id="tablaVentasControlDiarioLiquidacionTurnoBody"></tbody>\
                         <tfoot id="tablaVentasControlDiarioLiquidacionTurnoFoot"></tfoot>';
            $("#tablaVentasControlDiarioLiquidacionTurno").append(tabla);
            var head = '<tr>\
                            <th class="hide">tudi_id</th>\
                            <th style="text-align: center;">Id</th>\
                            <th style="text-align: center;">Turno</th>\
                            <th style="text-align: center;">Galones Vendidos</th>\
                            <th style="text-align: center;">Monto Vendido</th>\
                            <th style="text-align: center;">Monto Entregado</th>\
                            <th style="text-align: center;">Devolución</th>\
                            <th style="text-align: center;">Gastos</th>\
                            <th style="text-align: center;">Ingresos</th>\
                            <th style="text-align: center;">Faltante</th>\
                            <th style="text-align: center;">Acción</th>\
                        </tr>';
            $("#tablaVentasControlDiarioLiquidacionTurnoHead").append(head);

            var galVenT, ventaT, entregaT, devoluT, gastoT, ingresoT, faltanteT;
            galVenT = ventaT = entregaT = devoluT = gastoT = ingresoT = faltanteT = 0.00;
            $.each(response.listLiquidacion, function (index, value) {
                var turno, galVen, venta, entrega, devolu, gasto, ingreso;
                var faltante = 0.00;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.galonesVendidos)) {
                    galVen = "";
                } else {
                    galVen = formatNumeroDecimal(value.galonesVendidos);
                    galVenT += value.galonesVendidos;
                }
                if (!$.trim(value.venta)) {
                    venta = "";
                } else {
                    venta = formatNumeroDecimal(value.venta);
                    ventaT += value.venta;
                    faltante += value.venta;
                }
                if (!$.trim(value.entregado)) {
                    entrega = "";
                } else {
                    entrega = formatNumeroDecimal(value.entregado);
                    entregaT += value.entregado;
                    faltante -= value.entregado;
                }
                if (!$.trim(value.devolucion)) {
                    devolu = "";
                } else {
                    devolu = formatNumeroDecimal(value.devolucion);
                    devoluT += value.devolucion;
                    faltante -= value.devolucion;
                }
                if (!$.trim(value.gasto)) {
                    gasto = "";
                } else {
                    gasto = formatNumeroDecimal(value.gasto);
                    gastoT += value.gasto;
                    faltante -= value.gasto;
                }
                if (!$.trim(value.ingreso)) {
                    ingreso = "";
                } else {
                    ingreso = formatNumeroDecimal(value.ingreso);
                    ingresoT += value.ingreso;
                    faltante += value.ingreso;
                }
                faltanteT += faltante;
                var body = '<tr>\
                              <td class="hide">' + value.tudiId + '</td>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + turno + '</td>\
                              <td style="text-align: center;">' + galVen + '</td>\
                              <td style="text-align: center;">' + venta + '</td>\
                              <td style="text-align: center;">' + entrega + '</td>\
                              <td style="text-align: center;">' + devolu + '</td>\
                              <td style="text-align: center;">' + gasto + '</td>\
                              <td style="text-align: center;">' + ingreso + '</td>\
                              <td style="text-align: center;">' + formatNumeroDecimal(faltante) + '</td>\
                              <td align="center">\
                                <button type="button" id="btnVentasPrintControlDiarioTurno_' + value.tudiId + '" title="Imprimir" class="btn btn-social-icon btn-vk">\
                                  <span class="fa fa-print"></span>\
                                </button>\
                              </td>\
                            </tr>';
                $("#tablaVentasControlDiarioLiquidacionTurnoBody").append(body);

                $("#btnVentasPrintControlDiarioTurno_" + value.tudiId).click(function () {
                    $.ajax({
                        dataType: 'json',
                        url: "./Ventas?url=imprimir_turno&tudi_id=" + value.tudiId,
                        success: function (responseImp) {
                            imprimirVentasRegistroVentasCierreTurnoReporte(responseImp);
                        }
                    });
                });

            });

            $('#tablaVentasControlDiarioLiquidacionTurno').dataTable().fnDestroy();

            $("#tablaVentasControlDiarioLiquidacionTurnoFoot").empty();
            var foot = "<tr>\
                            <th class='hide'></th>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;' class='bordered'>TOTAL</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(galVenT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ventaT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(entregaT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(devoluT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(gastoT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ingresoT) + "</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(faltanteT) + "</th>\
                            <th style='text-align: center;'></th>\
                        </tr>";
            $("#tablaVentasControlDiarioLiquidacionTurnoFoot").append(foot);

            $('#tablaVentasControlDiarioLiquidacionTurno').dataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });

            if (response.estado) {
                $("#tablaVentasControlDiarioStockProducto").empty();
                var tabla1 = '<thead id="tablaVentasControlDiarioStockProductoHead"></thead>\
                          <tbody id="tablaVentasControlDiarioStockProductoBody"></tbody>';
                $("#tablaVentasControlDiarioStockProducto").append(tabla1);
                var head1 = '<tr>\
                            <th class="hide">prod_id</th>\
                            <th style="text-align: center;">Id</th>\
                            <th style="text-align: center;">Producto</th>\
                            <th style="text-align: center;">Stock Anterior</th>\
                            <th style="text-align: center;">Galones Comprados</th>\
                            <th style="text-align: center;">Galones Vendidos</th>\
                            <th style="text-align: center;">Devoluciones</th>\
                            <th style="text-align: center;">Stock Actual</th>\
                         </tr>';
                $("#tablaVentasControlDiarioStockProductoHead").append(head1);

                $('#tablaVentasControlDiarioStockProducto').dataTable().fnDestroy();

                $('#tablaVentasControlDiarioStockProducto').dataTable({
                    dom: 'rt',
                    paging: false,
                    ordering: false
                });
            } else {
                $("#tablaVentasControlDiarioStockProducto").empty();
                var tabla1 = '<thead id="tablaVentasControlDiarioStockProductoHead"></thead>\
                          <tbody id="tablaVentasControlDiarioStockProductoBody"></tbody>';
                $("#tablaVentasControlDiarioStockProducto").append(tabla1);
                var head1 = '<tr>\
                            <th class="hide">prod_id</th>\
                            <th style="text-align: center;">Id</th>\
                            <th style="text-align: center;">Producto</th>\
                            <th style="text-align: center;">Stock Anterior</th>\
                            <th style="text-align: center;">Galones Comprados</th>\
                            <th style="text-align: center;">Galones Vendidos</th>\
                            <th style="text-align: center;">Devoluciones</th>\
                            <th style="text-align: center;">Stock Actual</th>\
                         </tr>';
                $("#tablaVentasControlDiarioStockProductoHead").append(head1);
                $.each(response.listStock, function (index, value) {
                    var producto, galIni, galMaq, devTanq, galVen, galDev;
                    var stockAnt = 0.00;
                    var stock = 0.00;
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
                    }
                    if (!$.trim(value.galonesCompradosFactAnt)) {
                    } else {
                        stockAnt += value.galonesCompradosFactAnt;
                        stock += value.galonesCompradosFactAnt;
                    }
                    if (!$.trim(value.galonesCompradosAnt)) {
                    } else {
                        stockAnt += value.galonesCompradosAnt;
                        stock += value.galonesCompradosAnt;
                    }
                    var galComp = 0.00;
                    if (!$.trim(value.galonesCompradosFact)) {
                    } else {
                        galComp += value.galonesCompradosFact;
                        stock += value.galonesCompradosFact;
                    }
                    if (!$.trim(value.galonesComprados)) {
                    } else {
                        galComp += value.galonesComprados;
                        stock += value.galonesComprados;
                    }
                    if (!$.trim(value.lecturaMaquina)) {
                        galMaq = "";
                    } else {
                        galMaq = formatNumeroDecimal(value.lecturaMaquina);
                        stockAnt -= value.lecturaMaquina;
                        stock -= value.lecturaMaquina;
                    }

                    if (!$.trim(value.devolucionTanque)) {
                        devTanq = "";
                    } else {
                        devTanq = formatNumeroDecimal(value.devolucionTanque);
                        stockAnt += value.devolucionTanque;
                        stock += value.devolucionTanque;
                    }
                    if (!$.trim(value.galonesVendidos)) {
                        galVen = "";
                    } else {
                        galVen = formatNumeroDecimal(value.galonesVendidos);
                        stock -= value.galonesVendidos;
                    }
                    if (!$.trim(value.galonesDevueltos)) {
                        galDev = "";
                    } else {
                        galDev = formatNumeroDecimal(value.galonesDevueltos);
                        stock += value.galonesDevueltos;
                    }
                    var body1 = '<tr>\
                                  <td class="hide">\
                                    <input name="prod_id" type="password" value="' + value.prodId + '" >\
                                  </td>\
                                  <td style="text-align: center;">' + (index + 1) + '</td>\
                                  <td style="text-align: left;">' + producto + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stockAnt) + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(galComp) + '</td>\
                                  <td style="text-align: center;">' + galVen + '</td>\
                                  <td style="text-align: center;">' + galDev + '</td>\
                                  <td style="text-align: center;">' + formatNumeroDecimal(stock) + '</td>\
                                </tr>';
                    $("#tablaVentasControlDiarioStockProductoBody").append(body1);
                });

                $('#tablaVentasControlDiarioStockProducto').dataTable().fnDestroy();

                $('#tablaVentasControlDiarioStockProducto').dataTable({
                    dom: 'rt',
                    paging: false,
                    ordering: false
                });
            }

            $("#tablaVentasControlDiarioGastos").empty();
            var tabla2 = '<thead id="tablaVentasControlDiarioGastosHead"></thead>\
                          <tbody id="tablaVentasControlDiarioGastosBody"></tbody>\
                          <tfoot id="tablaVentasControlDiarioGastosFoot"></tfoot>';
            $("#tablaVentasControlDiarioGastos").append(tabla2);
            var head2 = '<tr>\
                            <th style="text-align: center;">Id</th>\
                            <th style="text-align: center;">Turno</th>\
                            <th style="text-align: center;">Tipo Gasto</th>\
                            <th style="text-align: center;">Descripción</th>\
                            <th style="text-align: center;">Monto (S/)</th>\
                         </tr>';
            $("#tablaVentasControlDiarioGastosHead").append(head2);
            var gastoTotal = 0.00;
            $.each(response.listGastos, function (index, value) {
                var turno, tipo, descr, monto;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.tigaNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tigaNombre;
                }
                if (!$.trim(value.gadiDescripcion)) {
                    descr = "";
                } else {
                    descr = value.gadiDescripcion;
                }
                if (!$.trim(value.gadiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.gadiMonto);
                    gastoTotal += value.gadiMonto;
                }
                var body2 = '<tr>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + turno + '</td>\
                              <td style="text-align: left;">' + tipo + '</td>\
                              <td style="text-align: left;">' + descr + '</td>\
                              <td style="text-align: center;">' + monto + '</td>\
                            </tr>';
                $("#tablaVentasControlDiarioGastosBody").append(body2);
            });

            $('#tablaVentasControlDiarioGastos').dataTable().fnDestroy();

            $("#tablaVentasControlDiarioGastosFoot").empty();
            var foot2 = "<tr>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;' class='bordered'>TOTAL</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(gastoTotal) + "</th>\
                        </tr>";
            $("#tablaVentasControlDiarioGastosFoot").append(foot2);

            $('#tablaVentasControlDiarioGastos').dataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });


            $("#tablaVentasControlDiarioIngresos").empty();
            var tabla3 = '<thead id="tablaVentasControlDiarioIngresosHead"></thead>\
                          <tbody id="tablaVentasControlDiarioIngresosBody"></tbody>\
                          <tfoot id="tablaVentasControlDiarioIngresosFoot"></tfoot>';
            $("#tablaVentasControlDiarioIngresos").append(tabla3);
            var head3 = '<tr>\
                            <th style="text-align: center;">Id</th>\
                            <th style="text-align: center;">Turno</th>\
                            <th style="text-align: center;">Tipo Ingreso</th>\
                            <th style="text-align: center;">Descripción</th>\
                            <th style="text-align: center;">Monto (S/)</th>\
                         </tr>';
            $("#tablaVentasControlDiarioIngresosHead").append(head3);

            var ingresoTotal = 0.00;
            $.each(response.listIngresos, function (index, value) {
                var turno, tipo, descr, monto;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.tiinNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tiinNombre;
                }
                if (!$.trim(value.indiDescripcion)) {
                    descr = "";
                } else {
                    descr = value.indiDescripcion;
                }
                if (!$.trim(value.indiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.indiMonto);
                    ingresoTotal += value.indiMonto;
                }
                var body3 = '<tr>\
                              <td style="text-align: center;">' + (index + 1) + '</td>\
                              <td style="text-align: left;">' + turno + '</td>\
                              <td style="text-align: left;">' + tipo + '</td>\
                              <td style="text-align: left;">' + descr + '</td>\
                              <td style="text-align: center;">' + monto + '</td>\
                            </tr>';
                $("#tablaVentasControlDiarioIngresosBody").append(body3);
            });

            $('#tablaVentasControlDiarioIngresos').dataTable().fnDestroy();

            $("#tablaVentasControlDiarioIngresosFoot").empty();
            var foot3 = "<tr>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;'></th>\
                            <th style='text-align: center;' class='bordered'>TOTAL</th>\
                            <th style='text-align: center;' class='bordered'>" + formatNumeroDecimal(ingresoTotal) + "</th>\
                        </tr>";
            $("#tablaVentasControlDiarioIngresosFoot").append(foot3);

            $('#tablaVentasControlDiarioIngresos').dataTable({
                dom: 'rt',
                paging: false,
                ordering: false
            });

        }
    });
}

function sub_menu_control() {

    var cont = '<div class="card">\
                  <div class="card-header bg-danger text-white">REPORTE DE CONTROL DE VENTAS</div>\
                  <div class="card-body">\
                    <div class="form-row">\
		      <div class="form-group col-md-2">\
                        <label for="datePickVentasControlDiario" class="col-form-label" style="font-weight: 600;">Fecha :</label>\
                        <input id="datePickVentasControlDiario" />\
                      </div>\
		      <div class="form-group col-md-2">\
                        <label class="col-form-label" style="font-weight: 600;">&nbsp;</label>\
                        <div>\
                          <button type="button" id="btnVentasPrintControlDiarioFecha" title="Imprimir" class="btn btn-info">\
                            <span class="fa fa-print"></span>&nbsp;Imprimir\
                          </button>\
                        </div>\
                      </div>\
                    </div>\
                    <div id="divVentasControlDiario">\
                        <div class="form-group">\
                            <label class="col-form-label">Liquidación de Turnos :</label>\
                        </div>\
                        <div class="table-responsive">\
                            <table id="tablaVentasControlDiarioLiquidacionTurno" class="table table-hover display" style="width: 100%;"></table>\
                        </div>\
			<div class="form-group">\
			    <label class="col-form-label">Stock de Productos :</label>\
			</div>\
			<div class="table-responsive">\
                            <table id="tablaVentasControlDiarioStockProducto" class="table table-hover display" style="width: 100%;"></table>\
                        </div>\
                        <div class="form-group">\
                            <label class="col-form-label">Gastos :</label>\
                        </div>\
                        <div class="table-responsive">\
                            <table id="tablaVentasControlDiarioGastos" class="table table-hover display" style="width: 100%;"></table>\
                        </div>\
			<div class="form-group">\
			    <label class="col-form-label">Ingresos :</label>\
			</div>\
			<div class="table-responsive">\
                            <table id="tablaVentasControlDiarioIngresos" class="table table-hover display" style="width: 100%;"></table>\
                        </div>\
                    </div>\
                  </div>\
                </div>';
    $('#divMenuContenido').append(cont);

    var todayC = new Date();
    var dayC = todayC.getDate();
    var monthC = todayC.getMonth() + 1;
    var yearC = todayC.getFullYear();
    if (dayC < 10) {
        dayC = "0" + dayC;
    }
    if (monthC < 10) {
        monthC = "0" + monthC;
    }
    var hoyC = dayC + "/" + monthC + "/" + yearC;

    $('#datePickVentasControlDiario').datepicker({
        locale: 'es-es',
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        value: hoyC,
        maxDate: todayC
    }).on("change", function () {
        llenarVentasControlDiario($('#datePickVentasControlDiario').val());
    });

    llenarVentasControlDiario(hoyC);

    $("#btnVentasPrintControlDiarioFecha").click(function () {
        imprimirVentasPrintControlDiarioFecha($('#datePickVentasControlDiario').val());
    });

}

function imprimirVentasPrintControlDiarioFecha(fecha) {
    $.ajax({
        dataType: 'json',
        url: "./Ventas?url=reporte_control_ventas&fecha=" + fecha,
        success: function (response) {

            var tablaLiquidacion = [];
            var tablaLiquidacionHead = [];
            tablaLiquidacionHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Turno', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Galones Vendidos', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Monto Vendido', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Monto Entregado', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Devolución', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Gastos', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Ingresos', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacionHead.push({text: 'Faltante', style: 'tablaHead', alignment: 'center'});
            tablaLiquidacion.push(tablaLiquidacionHead);

            var galVenT, ventaT, entregaT, devoluT, gastoT, ingresoT, faltanteT;
            galVenT = ventaT = entregaT = devoluT = gastoT = ingresoT = faltanteT = 0.00;
            $.each(response.listLiquidacion, function (index, value) {
                var turno, galVen, venta, entrega, devolu, gasto, ingreso;
                var faltante = 0.00;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.galonesVendidos)) {
                    galVen = "";
                } else {
                    galVen = formatNumeroDecimal(value.galonesVendidos);
                    galVenT += value.galonesVendidos;
                }
                if (!$.trim(value.venta)) {
                    venta = "";
                } else {
                    venta = formatNumeroDecimal(value.venta);
                    ventaT += value.venta;
                    faltante += value.venta;
                }
                if (!$.trim(value.entregado)) {
                    entrega = "";
                } else {
                    entrega = formatNumeroDecimal(value.entregado);
                    entregaT += value.entregado;
                    faltante -= value.entregado;
                }
                if (!$.trim(value.devolucion)) {
                    devolu = "";
                } else {
                    devolu = formatNumeroDecimal(value.devolucion);
                    devoluT += value.devolucion;
                    faltante -= value.devolucion;
                }
                if (!$.trim(value.gasto)) {
                    gasto = "";
                } else {
                    gasto = formatNumeroDecimal(value.gasto);
                    gastoT += value.gasto;
                    faltante -= value.gasto;
                }
                if (!$.trim(value.ingreso)) {
                    ingreso = "";
                } else {
                    ingreso = formatNumeroDecimal(value.ingreso);
                    ingresoT += value.ingreso;
                    faltante += value.ingreso;
                }
                faltanteT += faltante;
                var tablaLiquidacionBody = [];
                tablaLiquidacionBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: turno, style: 'tablaBody', alignment: 'left'});
                tablaLiquidacionBody.push({text: galVen, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: venta, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: entrega, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: devolu, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: gasto, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: ingreso, style: 'tablaBody', alignment: 'center'});
                tablaLiquidacionBody.push({text: formatNumeroDecimal(faltante), style: 'tablaBody', alignment: 'center'});
                tablaLiquidacion.push(tablaLiquidacionBody);

            });

            var tablaLiquidacionFoot = [];
            tablaLiquidacionFoot.push({text: 'TOTAL', style: 'tablaTotal', alignment: 'center', colSpan: 2});
            tablaLiquidacionFoot.push("");
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(galVenT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(ventaT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(entregaT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(devoluT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(gastoT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(ingresoT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacionFoot.push({text: formatNumeroDecimal(faltanteT), style: 'tablaTotal', alignment: 'center'});
            tablaLiquidacion.push(tablaLiquidacionFoot);


            var tablaStock = [];
            var tablaStockHead = [];
            tablaStockHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Producto', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Stock Anterior', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Galones Comprados', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Galones Vendidos', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Devoluciones', style: 'tablaHead', alignment: 'center'});
            tablaStockHead.push({text: 'Stock Actual', style: 'tablaHead', alignment: 'center'});
            tablaStock.push(tablaStockHead);

            if (response.estado) {

            } else {
                $.each(response.listStock, function (index, value) {
                    var producto, galIni, galMaq, devTanq, galVen, galDev;
                    var stockAnt = 0.00;
                    var stock = 0.00;
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
                    }                   
                    if (!$.trim(value.galonesCompradosFactAnt)) {
                    } else {
                        stockAnt += value.galonesCompradosFactAnt;
                        stock += value.galonesCompradosFactAnt;
                    }
                    if (!$.trim(value.galonesCompradosAnt)) {
                    } else {
                        stockAnt += value.galonesCompradosAnt;
                        stock += value.galonesCompradosAnt;
                    }
                    var galComp = 0.00;
                    if (!$.trim(value.galonesCompradosFact)) {
                    } else {
                        galComp += value.galonesCompradosFact;
                        stock += value.galonesCompradosFact;
                    }
                    if (!$.trim(value.galonesComprados)) {
                    } else {
                        galComp += value.galonesComprados;
                        stock += value.galonesComprados;
                    }
                    if (!$.trim(value.lecturaMaquina)) {
                        galMaq = "";
                    } else {
                        galMaq = formatNumeroDecimal(value.lecturaMaquina);
                        stockAnt -= value.lecturaMaquina;
                        stock -= value.lecturaMaquina;
                    }
                    if (!$.trim(value.devolucionTanque)) {
                        devTanq = "";
                    } else {
                        devTanq = formatNumeroDecimal(value.devolucionTanque);
                        stockAnt += value.devolucionTanque;
                        stock += value.devolucionTanque;
                    }                    
                    if (!$.trim(value.galonesVendidos)) {
                        galVen = "";
                    } else {
                        galVen = formatNumeroDecimal(value.galonesVendidos);
                        stock -= value.galonesVendidos;
                    }
                    if (!$.trim(value.galonesDevueltos)) {
                        galDev = "";
                    } else {
                        galDev = formatNumeroDecimal(value.galonesDevueltos);
                        stock += value.galonesDevueltos;
                    }
                    var tablaStockBody = [];
                    tablaStockBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
                    tablaStockBody.push({text: producto, style: 'tablaBody', alignment: 'left'});
                    tablaStockBody.push({text: formatNumeroDecimal(stockAnt), style: 'tablaBody', alignment: 'center'});
                    tablaStockBody.push({text: formatNumeroDecimal(galComp), style: 'tablaBody', alignment: 'center'});
                    tablaStockBody.push({text: galVen, style: 'tablaBody', alignment: 'center'});
                    tablaStockBody.push({text: galDev, style: 'tablaBody', alignment: 'center'});
                    tablaStockBody.push({text: formatNumeroDecimal(stock), style: 'tablaBody', alignment: 'center'});
                    tablaStock.push(tablaStockBody);
                });
            }

            var tablaGastos = [];
            var tablaGastosHead = [];
            tablaGastosHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
            tablaGastosHead.push({text: 'Turno', style: 'tablaHead', alignment: 'center'});
            tablaGastosHead.push({text: 'Tipo Gasto', style: 'tablaHead', alignment: 'center'});
            tablaGastosHead.push({text: 'Descripción', style: 'tablaHead', alignment: 'center'});
            tablaGastosHead.push({text: 'Monto (S/)', style: 'tablaHead', alignment: 'center'});
            tablaGastos.push(tablaGastosHead);
            var gastoTotal = 0.00;
            $.each(response.listGastos, function (index, value) {
                var turno, tipo, descr, monto;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.tigaNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tigaNombre;
                }
                if (!$.trim(value.gadiDescripcion)) {
                    descr = "";
                } else {
                    descr = value.gadiDescripcion;
                }
                if (!$.trim(value.gadiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.gadiMonto);
                    gastoTotal += value.gadiMonto;
                }
                var tablaGastosBody = [];
                tablaGastosBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
                tablaGastosBody.push({text: turno, style: 'tablaBody', alignment: 'left'});
                tablaGastosBody.push({text: tipo, style: 'tablaBody', alignment: 'left'});
                tablaGastosBody.push({text: descr, style: 'tablaBody', alignment: 'left'});
                tablaGastosBody.push({text: monto, style: 'tablaBody', alignment: 'center'});
                tablaGastos.push(tablaGastosBody);

            });
            var tablaGastosFoot = [];
            tablaGastosFoot.push("");
            tablaGastosFoot.push("");
            tablaGastosFoot.push("");
            tablaGastosFoot.push({text: 'TOTAL', style: 'tablaTotal', alignment: 'center'});
            tablaGastosFoot.push({text: formatNumeroDecimal(gastoTotal), style: 'tablaTotal', alignment: 'center'});
            tablaGastos.push(tablaGastosFoot);

            var tablaIngresos = [];
            var tablaIngresosHead = [];
            tablaIngresosHead.push({text: 'Id', style: 'tablaHead', alignment: 'center'});
            tablaIngresosHead.push({text: 'Turno', style: 'tablaHead', alignment: 'center'});
            tablaIngresosHead.push({text: 'Tipo Ingreso', style: 'tablaHead', alignment: 'center'});
            tablaIngresosHead.push({text: 'Descripción', style: 'tablaHead', alignment: 'center'});
            tablaIngresosHead.push({text: 'Monto (S/)', style: 'tablaHead', alignment: 'center'});
            tablaIngresos.push(tablaIngresosHead);
            var ingresoTotal = 0.00;
            $.each(response.listIngresos, function (index, value) {
                var turno, tipo, descr, monto;
                if (!$.trim(value.turnNombre)) {
                    turno = "";
                } else {
                    turno = value.turnNombre;
                }
                if (!$.trim(value.tiinNombre)) {
                    tipo = "";
                } else {
                    tipo = value.tiinNombre;
                }
                if (!$.trim(value.indiDescripcion)) {
                    descr = "";
                } else {
                    descr = value.indiDescripcion;
                }
                if (!$.trim(value.indiMonto)) {
                    monto = "";
                } else {
                    monto = formatNumeroDecimal(value.indiMonto);
                    ingresoTotal += value.indiMonto;
                }
                var tablaIngresosBody = [];
                tablaIngresosBody.push({text: (index + 1), style: 'tablaBody', alignment: 'center'});
                tablaIngresosBody.push({text: turno, style: 'tablaBody', alignment: 'left'});
                tablaIngresosBody.push({text: tipo, style: 'tablaBody', alignment: 'left'});
                tablaIngresosBody.push({text: descr, style: 'tablaBody', alignment: 'left'});
                tablaIngresosBody.push({text: monto, style: 'tablaBody', alignment: 'center'});
                tablaIngresos.push(tablaIngresosBody);

            });
            var tablaIngresosFoot = [];
            tablaIngresosFoot.push("");
            tablaIngresosFoot.push("");
            tablaIngresosFoot.push("");
            tablaIngresosFoot.push({text: 'TOTAL', style: 'tablaTotal', alignment: 'center'});
            tablaIngresosFoot.push({text: formatNumeroDecimal(ingresoTotal), style: 'tablaTotal', alignment: 'center'});
            tablaIngresos.push(tablaIngresosFoot);

            var imageUrl_logo = './templates/img/logo.png';
            convertImgToDataURLviaCanvas(imageUrl_logo, function (base64Img) {
                var docDefinition = {
                    //pageOrientation: 'landscape',
                    info: {
                        title: 'reporte_control_ventas_' + fecha.split("/").join("_")
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
                                    {text: 'REPORTE DE CONTROL DE VENTAS', alignment: 'center', style: 'titulo'},
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
                            text: 'LIQUIDACIÓN DE TURNOS', alignment: 'center', style: 'subtitulo'
                        },
                        {
                            table: {
                                widths: [40, '*', 50, 50, 50, 50, 50, 50, 50],
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
                            text: 'STOCK DE PRODUCTOS', alignment: 'center', style: 'subtitulo'
                        },
                        {
                            table: {
                                widths: [40, '*', 50, 50, 50, 50, 50],
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
                            text: 'GASTOS', alignment: 'center', style: 'subtitulo'
                        },
                        {
                            table: {
                                widths: [20, '*', '*', '*', 50],
                                body: tablaGastos
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
                            text: 'INGRESOS', alignment: 'center', style: 'subtitulo'
                        },
                        {
                            table: {
                                widths: [20, '*', '*', '*', 50],
                                body: tablaIngresos
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
    });

}


