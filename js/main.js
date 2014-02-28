$(document).ready(function(){

    // scroll to:
    $('.navbar a, .register-button').click(function() {
        var elementClicked = $(this).attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-15}, 500 );
        return false;
    });

    // register button:
    $('#pay-now').click(function(){
        $('#register-form').toggleClass('hidden');
    });

    // register form
    var registerForm = $('#register-form');
    var successMessage = '<h2>Thank you!</h2><p class="alert alert-success"><span class="glyphicon glyphicon-envelope"></span> Your registration was successfully sent.</p><p class="text-center"><img src="images/slideshow/2013_rayburn.jpg" alt=""  class="img-thumbnail register-success-img" /></p>';
    var errorMessage = '<p class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> There was an error sending your registration.</p>';

    // submit
    registerForm.submit(function(event){
        event.preventDefault();

        // change submit button:
        $('#register-submit').button('loading');

        // make ajax call
        var data = registerForm.serialize();
        console.log("registerForm:", registerForm);
        console.log("Data:", data);

        // disable inputs:
        registerForm.find('input').attr('disabled', 'disabled');

        $.post('register.php', data, function(response) {

            // hide form:
            registerForm.hide();
            $('#pre-register-form').hide();

            console.log("Response:", response);
            console.log("response.success:", response.success);

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

    });

});