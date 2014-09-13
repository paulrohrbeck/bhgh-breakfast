$(document).ready(function(){

    // scroll to:
    function scrollToAnchor(element){
        var elementClicked = typeof element == 'string' ? element : element.attr("href");
        var destination = $(elementClicked).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-15}, 500 );
        return false;
    }

    $('.navbar a, .rsvp-button').click(function() {
        scrollToAnchor($(this));
    });

    // automatically submit form
    $('#anet-form').submit();

    // messages:
    var successMessage = '<h2>Thank you!</h2><p class="alert alert-success"><span class="glyphicon glyphicon-envelope"></span> Thanks for your RSVP. See you on November 6!</p><p class="text-center"><img src="images/slideshow/2013_rayburn.jpg" alt=""  class="img-thumbnail register-success-img" /></p>';
    var errorMessage = '<p class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> There was an error submitting your RSVP.</p>';

    // show success message when url contains (?thankyou):
    /*
    var showSuccessMessage = window.location.search.indexOf("thankyou") != -1;
    if(showSuccessMessage){

        // hide form:
        registerForm.hide();

        registerForm.after(successMessage);
        scrollToAnchor('#rsvp');
    }*/

    // submit
    var registerForm = $('#rsvp-form');
    registerForm.submit(function(event){
        event.preventDefault();

        // change submit button:
        $('#rsvp-submit').button('loading');

        // serialize data
        var data = registerForm.serialize();

        // disable inputs:
        registerForm.find('input').attr('disabled', 'disabled');

        // send data to ga
        ga('send', 'event', 'RSVP', 'submitted', {
            'hitCallback': function() {

                $.post('rsvp.php', data, function(response) {

                    // hide form:
                    registerForm.hide();

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

                        // show error message:
                        registerForm.after(errorMessage);

                    });
            }
        });

    });

});