/*
 ========================
 @author carlos santander
 ========================
 */

$(document).ready(function () {
    $(document).on({
        'show.bs.modal': function () {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        },
        'hidden.bs.modal': function () {
            if ($('.modal:visible').length > 0) {
                // restore the modal-open class to the body element, so that scrolling works
                // properly after de-stacking a modal.
                setTimeout(function () {
                    $(document.body).addClass('modal-open');
                }, 0);
            }
        }
    }, '.modal');
});

$(function () {
    datosUsuario();
    //checkAlertStockMail();

});

function checkAlertStockMail() {
    $.ajax({
        dataType: 'json',
        url: "./Almacen?url=alerta_stock_productos_mail",
        success: function (response) {
        }
    });
}

function menuActive(id) {
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=menuActivo&menu_id=" + id,
        success: function (response) {
            $('#ulMenuBarra li').removeClass('active');
            $('#li_menu_' + response.id).addClass('active');
        }
    });
}

function submenuActive(id) {
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=submenuActivo&sub_menu_id=" + id,
        success: function (response) {
            $('ul.sub-menu li').removeClass('active');
            $('#li_sub_menu_' + response.id).addClass('active');
        }
    });
}

function datosUsuario() {
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataLogin",
        success: function (response) {
            var genero;
            if (response.genero.toLowerCase() === "m") {
                genero = "masculino";
            }
            if (response.genero.toLowerCase() === "f") {
                genero = "femenino";
            }
            $("#imgUserHead").attr("src", "./templates/img/" + genero + ".png");
            $("#imgUserBody").attr("src", "./templates/img/" + genero + ".png");
            var nombres;
            if (!$.trim(response.nombres)) {
                nombres = "";
            } else {
                nombres = response.nombres;
            }
            var nombreP;
            if (!$.trim(response.nombreP)) {
                nombreP = "";
            } else {
                nombreP = response.nombreP;
            }
            var paterno;
            if (!$.trim(response.apellido_paterno)) {
                paterno = "";
            } else {
                paterno = response.apellido_paterno;
            }
            var materno;
            if (!$.trim(response.apellido_materno)) {
                materno = "";
            } else {
                materno = response.apellido_materno;
            }
            $('#nameUserHead').append(nombreP);
            $('#nameUserBody').append('<small>' + nombres + '</small> <small>' + paterno + ' ' + materno + '</small>');

            var perfil = response.perfil;

            $("#ulMenuBarra").empty();
            $("#ulMenuBarra").append('<li class="header" style="font-weight: bold;">MENÚ</li>');
            $.each(response.listPermisos, function (index, value) {
                var active;
                var open;
                var display;
                if (value.menuId === response.menuId) {
                    active = "active";
                    open = "menu-open";
                    display = "display: block;";
                    if (value.menuId === 0) {
                        window[value.menuCodigo]();
                    }
                } else {
                    active = "";
                    open = "";
                    display = "display: none;";
                }

                var right = '';
                if (value.menuId > 0) {
                    right = '<span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i> </span>';
                }
                var menu = '<li id="li_menu_' + value.menuId + '" class="treeview ' + active + ' ' + open + '" >\
                               <a id="a_menu_' + value.menuId + '" href="javaScript:void(0);" >\
                                  <i class="' + value.menuIcono + '"></i> \
                                  <span>' + value.menuNombre + '</span>' + right + '\
                               </a>\
                               <ul id="ul_menu_' + value.menuId + '" class="treeview-menu sub-menu" style="' + display + '">\
                            </li>';
                $("#ulMenuBarra").append(menu);

                $('#a_menu_' + value.menuId).click(function () {
                    menuActive(value.menuId);
                    $('#divMenuContenido').empty();
                    if (value.menuId === 0) {
                        window[value.menuCodigo]();
                    }
                });

                $.ajax({
                    dataType: 'json',
                    url: "./GsonData?url=DataSubMenuPerf&menu_id=" + value.menuId + "&perf_id=" + perfil,
                    success: function (responseS) {
                        $.each(responseS.listSubMenus, function (indexS, valueS) {
                            var subactive;
                            if (valueS.subMenuId === response.subMenuId) {
                                subactive = "active";
                                window[valueS.subMenuCodigo]();
                            } else {
                                subactive = "";
                            }
                            var submenu = '<li id="li_sub_menu_' + valueS.subMenuId + '" class="' + subactive + '">\
                                             <a id="a_sub_menu_' + valueS.subMenuId + '" href="javaScript:void(0);">\
                                               <i class="fa fa-angle-right"></i> ' + valueS.subMenuNombre + '\
                                             </a>\
                                           </li>';
                            $("#ul_menu_" + responseS.menuId).append(submenu);

                            $('#a_sub_menu_' + valueS.subMenuId).click(function () {
                                submenuActive(valueS.subMenuId);
                                $('#divMenuContenido').empty();
                                window[valueS.subMenuCodigo]();
                            });

                        });
                    }
                });

            });

            $('#aLogOut').click(function () {
                $.ajax({
                    dataType: 'json',
                    url: "./Usuario?url=disconnect",
                    success: function (response) {
                        window.location = response.window;
                    }
                });
            });

            $("#formCambiaContra").submit(function (evt) {
                evt.preventDefault();
                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    success: function (response) {
                        if (response.success) {
                            window.location = response.window;
                        } else {
                            alertify.error(response.msg);
                        }
                    }
                });
            });
        }
    });
}