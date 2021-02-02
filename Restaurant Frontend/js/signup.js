$(document).ready(function () {
    // predefine elements 
    $("#signupBtnChange").css('border-bottom', '2px solid black')
    $("#loginSection").css('display', 'none')

    $('#signupBtnChange').click(function (e) {
        e.preventDefault();
        $("#signupBtnChange").css('border-bottom', '2px solid black')
        $(".LogInBtnChange").css('border-bottom', 'none')

        $("#signupSection").css('display', 'block')
        $("#loginSection").css('display', 'none')
        localStorage.setItem("login", 1);
    });

    $('.LogInBtnChange').click(function (e) {
        e.preventDefault();
        $(".LogInBtnChange").css('border-bottom', '2px solid black')
        $("#signupBtnChange").css('border-bottom', 'none')

        $("#loginSection").css('display', 'block')
        $("#signupSection").css('display', 'none')
    });

    // Sign up form 
    $('#signUpForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/adduser",
            data:
            {
                FirstName: $('#firstName').val(),
                LastName: $('#lastName').val(),
                Password: $('#password').val(),
                Gender: $('[name=gender]:selected').val(),
                Address: $('#address').val(),
                Email: $('#emailid').val(),
                mobileNumber: $('#mobileNumber').val()
            }
            ,
            success: function (response) {
                $(".LogInBtnChange").click()
                alert('Thank you for signing up, Please log in ');
            }
        });
    });

    // Log in form 
    $('#logInForm').submit(function (e) {
        e.preventDefault();
        let username = document.getElementById('userNameLogIn').value;
        let password = document.getElementById('passwordLogIn').value;
        $.getJSON("http://127.0.0.1:8080/users",
            function (data, status) {
                let filterValue = data.filter(e =>
                    (e.FirstName == username && e.Password == password)
                );
                if (filterValue.length > 0) {
                    localStorage.setItem("login", 1);
                    localStorage.setItem("userName", filterValue[0].FirstName);
                    localStorage.setItem("user_id", filterValue[0].user_id);
                    $('#incorrectlogin').css('display', 'none')
                    window.location.replace("../index.html");
                }
                else {
                    localStorage.setItem("login", 0);
                    $('#incorrectlogin').css('display', 'block')
                }
            }
        );
    });

});
