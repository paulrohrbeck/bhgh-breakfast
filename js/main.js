$(document).ready(function(){

    // scroll to:
    function scrollToAnchor(element){
        var elementClicked = typeof element == 'string' ? element : element.attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-15}, 500 );
        return false;
    }

    $('.navbar a, .register-button, #pay-now-link, #pay-later-link').click(function() {
        scrollToAnchor($(this));
    });

    // paynow button:
    var paynowForm = $('#paynow-form');
    $('#pay-now-link').click(function(){
        paynowForm.removeClass('hidden');
        registerForm.addClass('hidden');
    });

    // automatically submit form
    $('#anet-form').submit();

    // register button:
    var registerForm = $('#register-form');
    $('#pay-later-link').click(function(){
        registerForm.removeClass('hidden');
        paynowForm.addClass('hidden');
    });

    // messages:
    var successMessage = '<h2>Thank you!</h2><p class="alert alert-success"><span class="glyphicon glyphicon-envelope"></span> Your registration was successfully sent.</p><p class="text-center"><img src="images/slideshow/2013_rayburn.jpg" alt=""  class="img-thumbnail register-success-img" /></p>';
    var errorMessage = '<p class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> There was an error sending your registration.</p>';

    // show success message when url contains (?thankyou):
    var showSuccessMessage = window.location.search.indexOf("thankyou") != -1;
    if(showSuccessMessage){

        // hide form:
        registerForm.hide();
        $('#pre-register-form').hide();

        registerForm.after(successMessage);
        scrollToAnchor('#register');
    }

    // submit
    registerForm.submit(function(event){
        event.preventDefault();

        // change submit button:
        $('#register-submit').button('loading');

        // serialize data
        var data = registerForm.serialize();

        // disable inputs:
        registerForm.find('input').attr('disabled', 'disabled');

        // send data to ga
        ga('send', 'event', 'Registration', 'submitted', {
            'hitCallback': function() {

                $.post('register.php', data, function(response) {

                    // hide form:
                    registerForm.hide();
                    $('#pre-register-form').hide();

                    // show message:
                    if(response.success == true){
                        registerForm.after(successMessage);
                    } else {
                        registerForm.after(errorMessage);
                    }

                }, "json")
                    .fail(function() {

                        // hide form:
                        registerForm.hide();
                        $('#pre-register-form').hide();

                        // show error message:
                        registerForm.after(errorMessage);

                    });
            }
        });

    });

});