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

});