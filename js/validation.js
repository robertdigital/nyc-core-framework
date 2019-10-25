$(document).ready(function () {

    (function () {
        
        'use strict';

        window.addEventListener('load', function () {

            var forms = document.getElementsByClassName('needs-validation');

            var validation = Array.prototype.filter.call(forms, function (form) {
                
                form.addEventListener('submit', function (event) {

                    if (form.checkValidity() === false) {

                        event.preventDefault();
                        event.stopPropagation();
                        
                        var invalid_target = $(':invalid');
                        invalid_target.closest('.validate-parent').addClass('is-invalid');
                        
                        var alert_target = $('.is-invalid:first');
                        alert_target.removeClass('d-none');
                                
                        $('html, body').animate({
                            scrollTop: alert_target.offset().top - 16
                        }, {
                            duration: 600,
                            complete: function () {
                                alert_target.attr("tabindex", "-1");
                                alert_target.focus();
                            }
                        });
                    }

                    form.classList.add('was-validated');

                }, false);
            });
        }, false);

    })();
    
    
    var requiredCheckboxes = $('.checkbox-group :checkbox[required]');
    
    // Required checkbox group

    requiredCheckboxes.change(function () {

        if (requiredCheckboxes.is(':checked')) {
            requiredCheckboxes.removeAttr('required');
            $(this).closest('.validate-parent').removeClass('is-invalid');
        } else if ($(this).closest('.needs-validation').hasClass('was-validated')) {
            requiredCheckboxes.attr('required', 'required');
            $(this).closest('.validate-parent').addClass('is-invalid');
        }

    });

    $('.form-control').blur(function () {
        if (!$(this).is(":invalid")) {
            $(this).closest('.validate-parent').removeClass('is-invalid');
        } else if ($(this).closest('.needs-validation').hasClass('was-validated') && $(this).is(":invalid")) {
            $(this).closest('.validate-parent').addClass('is-invalid');
        }
    });

    $('.custom-control-input').change(function () {
        if (!$(this).is(":invalid")) {
            $(this).closest('.validate-parent').removeClass('is-invalid');
        } else if ($(this).closest('.needs-validation').hasClass('was-validated') && $(this).is(":invalid")) {
            $(this).closest('.validate-parent').addClass('is-invalid');
        }
    });

});