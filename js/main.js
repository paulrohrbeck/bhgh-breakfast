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
    registerForm.submit(function(event){
        event.preventDefault();

        // change submit button:
        $('#register-submit').button('loading');

        // disable inputs:
        registerForm.find('input').attr('disabled', 'disabled');

        // make ajax call
        var data = registerForm.serialize();
        $.post('register.php', {data:data}, function (data) {

            registerForm.hide();
            $('#pre-register-form').hide();
            registerForm.after('<p class="alert alert-success"><span class="glyphicon glyphicon-envelope"></span> Your registration was successfully sent.</p>');
            registerForm.after('<p class="text-center"><img src="images/slideshow/2013_rayburn.jpg" alt=""  class="img-thumbnail register-success-img" /></p>');

        })
        .fail(function() {

            registerForm.hide();
            $('#pre-register-form').hide();
            registerForm.after('<p class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> There was an error sending your registration.</p>');

        });

    });

});