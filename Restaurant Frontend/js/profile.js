$(document).ready(function () {
    logout = () => {
        localStorage.setItem('login', 0);
        localStorage.setItem('userName', 'user');
    }

    if (localStorage.getItem('userName') != 'null') {
        document.getElementById('user').innerText = localStorage.getItem('userName');
    }
    // if (localStorage.getItem("login") == 0) {
    //     window.location.replace("../html/signup.html");
    // }

    $('#editProfile').click((e) => {
        e.preventDefault()
        console.log('cklick asklkal')
        $('.editable').removeAttr('disabled');
        $('#DoneArrow').css('display', 'block');
        $('#editProfile').css('display', 'none');
        $('#close').show();
    });

    $('#close').click((e)=>{
        e.preventDefault();
        window.location.reload();
    });
    $.getJSON("http://127.0.0.1:8080/users",
        function (data, status) {
            //  console.log(data);
            let profileHtml = "";
            data.forEach(e => {
                if (e.FirstName == localStorage.getItem('userName')) {
                    profileHtml = `
               <div class="text-center">
                <i class="fas fa-user-circle" style="font-size: 90px;"></i>
                <p style="font-size: 28px;">${e.FirstName}</p>
            </div>
            <div class="container w-50 mb-5">
                <form action="#">
                    <div class="mb-3 row">
                        <label for="emailAddress" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control editable" id="inputEmail" disabled
                              value='${e.Email}'>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="mobileNumber" class="col-sm-2 col-form-label">Mobile</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control editable" id="mobileNumber" disabled
                            value='${e.mobileNumber}'>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-8">
                            <input type="text" id="profileAddress" class="form-control editable" disabled value="${e.Address}">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="editable form-control" id="inputPassword" disabled value="${e.Password}">
                        </div>
                    </div>
                </form>
            </div>
               `;
                }
            });
            $('#profileUserData').append(profileHtml);
        }
    );

   
    updateUserData = () => {
        $.ajax({
            url: `http://127.0.0.1:8080/users/${localStorage.getItem('user_id')}`,
            type: 'PUT',
            data: {
                user_id: localStorage.getItem('user_id'),
                Password: $('#inputPassword').val(),
                mobileNumber: $('#mobileNumber').val(),
                Address: $('#profileAddress').val(),
                Email: $('#inputEmail').val(),
            },
            success: function (result) {
                $('#DoneArrow').hide();
                $('#editProfile').show();
                $('#close').hide();
            }
        });
    }
});