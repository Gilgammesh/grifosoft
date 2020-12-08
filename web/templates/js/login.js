/*
 ========================
 @author carlos santander
 ========================
 */

$(function () {

    $("#formLogin").submit(function (evt) {
        evt.preventDefault();
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    window.location = response.msg;
                } else {
                    alertify.error(response.msg);
                }
            }
        });
    });

});

