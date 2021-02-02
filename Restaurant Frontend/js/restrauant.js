
$(document).ready(function () {
    function getURLParameter(url, name) {
        return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
    }


    logout = () => {
        localStorage.setItem('login', 0);
        localStorage.setItem('userName', 'user');
    }

    let url = window.location.href;
    let restaurantId = getURLParameter(url, 'restaurant_id')

    // console.log('using regx restrorant id',restaurantId )

    $('#review_rating').hide();
    // star rating 
    $('#s1').click(function (e) {
        e.preventDefault();
        $('#s1').css('color', 'yellow')
        $('#s2, #s3, #s4, #s5').css('color', '#ccc')
        let rate = 1;
        $('#review_rating').val(rate);
    });
    $('#s2').click(function (e) {
        e.preventDefault();
        $('#s1, #s2').css('color', 'yellow')
        $('#s3, #s4, #s5').css('color', '#ccc')
        let rate = 2;
        $('#review_rating').val(rate);
    });
    $('#s3').click(function (e) {
        e.preventDefault();
        $('#s1, #s2, #s3').css('color', 'yellow')
        $('#s4, #s5').css('color', '#ccc')
        let rate = 3;
        $('#review_rating').val(rate);
    });
    $('#s4').click(function (e) {
        e.preventDefault();
        $('#s1, #s2, #s3, #s4').css('color', 'yellow')
        $('#s5').css('color', '#ccc');
        let rate = 4;
        $('#review_rating').val(rate);
    });
    $('#s5').click(function (e) {
        e.preventDefault();
        $('#s1, #s2, #s3, #s4, #s5').css('color', 'yellow')
        let rate = 5;
        $('#review_rating').val(rate);
    });

    // for edit review 
    $('#reviewEditRating').hide();
    // star rating 
    $(document).on('click', '#se1' , function(e) {
        e.preventDefault();
        $('#se1').css('color', 'yellow')
        $('#se2, #se3, #se4, #se5').css('color', '#ccc')
        let rate = 1;
        $('#reviewEditRating').val(rate);
   });
    $(document).on('click', '#se2' , function(e) {
        e.preventDefault();
        $('#se1, #se2').css('color', 'yellow')
        $('#se3, #se4, #se5').css('color', '#ccc')
        let rate = 2;
        $('#reviewEditRating').val(rate);
    });
    $(document).on('click', '#se3' , function(e) {
        e.preventDefault();
        $('#se1, #se2, #se3').css('color', 'yellow')
        $('#se4, #se5').css('color', '#ccc')
        let rate = 3;
        $('#reviewEditRating').val(rate);
    });
    $(document).on('click', '#se4' , function(e) {
        e.preventDefault();
        $('#se1, #se2, #se3, #se4').css('color', 'yellow')
        $('#se5').css('color', '#ccc');
        let rate = 4;
        $('#reviewEditRating').val(rate);
    });
    $(document).on('click', '#se5' , function(e) {
        e.preventDefault();
        $('#se1, #se2, #se3, #se4, #se5').css('color', 'yellow')
        let rate = 5;
        $('#reviewEditRating').val(rate);
    });

    // Display restraunt data 
    $.getJSON("http://127.0.0.1:8080/restaurants",
        function (data, status) {
            let restrauntHtml = "";
            let backgroundColor = 'yellow';
            data.forEach(e => {
                if (e.restaurant_id == restaurantId) {

                    switch (e.avgRating) {
                        case 5:
                            backgroundColor = 'yellow'
                            break;
                        case 4:
                            backgroundColor = 'yellow'
                            break;
                        case 3:
                            backgroundColor = 'yellow'
                            break;
                        case 2:
                            backgroundColor = 'yellow'
                            break;
                        case 1:
                            backgroundColor = 'yellow'
                            break;
                    }
                    let restrauntPhoto =
                        `<div class="container">
            <div id="carouselExampleControls" class="carousel slide container" data-bs-ride="carousel">
                 <div class="carousel-inner">
                  <div class="carousel-item active">
                      <img src="${e.Photo}" class="d-block" alt="...">
                   </div>
                   <div class="carousel-item">
                      <img src="${e.Photo1}" class="d-block" alt="...">
                    </div>
            <div class="carousel-item">
                <img src="${e.Photo2}" class="d-block" alt="...">
            </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>
        <div class="container">
            <div class="d-flex justify-content-between mt-3">
                <h2>${e.restaurantName}</h2>
                <div class="d-flex justify-content-center">
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 1 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 2 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 3 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 4 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating == 5 ? backgroundColor : '#CCC'}"></i></span>    
                </div>
            </div>
            <p >${e.description}</p>
            <div class="d-flex">
                <h5>Restaurant Opening Hours :</h5>
                <h6 class="ms-2 mt-1">${e.openingHours} </h6>
            </div>
            <div class="d-flex mt-2">
                <h5>Restaurant Address :</h5>
                <h6 class="ms-2 mt-1">${e.Address}</h6>
            </div>
        </div>
    </div>`;
                    restrauntHtml += restrauntPhoto;
                }
            });
            $('#RestoCarosal').append(restrauntHtml);
        }
    );

    // Display review data 
    $.get("http://127.0.0.1:8080/reviews",
        function (data, status) {
            let reviewHtml = "";
            let backgroundColor = 'yellow';
            data.forEach(e => {

                if (restaurantId == e.restaurant_id) {
                    switch (e.avgRating) {
                        case 5:
                            backgroundColor = 'yellow'
                            break;
                        case 4:
                            backgroundColor = 'yellow'
                            break;
                        case 3:
                            backgroundColor = 'yellow'
                            break;
                        case 2:
                            backgroundColor = 'yellow'
                            break;
                        case 1:
                            backgroundColor = 'yellow'
                            break;
                    }

                    let shouldEditReview = false;
                    if(localStorage.getItem('user_id') == e.user_id ){
                        shouldEditReview = true;
                    }
                    let reviewData =
                        `<div class="d-flex justify-content-between">
                    <div>
                        <h5>${e.FirstName}</h5>
                        <div class="d-flex align-content-center">
                            <h6>Review : </h6>
                            <p style="font-style:italic;" class="ms-2">${e.content}</p>
                        </div>
                        <div class="d-flex align-content-center">
                            <h6>Posted Time : </h6>
                            <p class="ms-2">${e.PostedTime}</p>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-end">
                            <span><i class="fa fa-star p-2" style="color: ${e.Rating >= 1 ? backgroundColor : '#CCC'}"></i></span>
                            <span><i class="fa fa-star p-2" style="color: ${e.Rating >= 2 ? backgroundColor : '#CCC'}"></i></span>
                            <span><i class="fa fa-star p-2" style="color: ${e.Rating >= 3 ? backgroundColor : '#CCC'}"></i></span>
                            <span><i class="fa fa-star p-2" style="color: ${e.Rating >= 4 ? backgroundColor : '#CCC'}"></i></span>
                            <span><i class="fa fa-star p-2" style="color: ${e.Rating == 5 ? backgroundColor : '#CCC'}"></i></span>
                        </div>
                        <div class="d-flex justify-content-end">
                        <p class="text-end me-2" style="display: ${shouldEditReview? 'block': 'none'}" onclick="onEditClick('${shouldEditReview}')" style="font-size:20px"><i class="fas fa-pencil-alt"></i></p>
                        <p class="text-end ms-3" style="display: ${shouldEditReview? 'block': 'none'}" onclick="deleteReview('${e.review_id}')" style="font-size:20px"><i class="fas fa-trash"></i></p>
                        </div>
                    </div>     
                </div>
                ${ 
                    shouldEditReview ?
                    `<div id="editForm" style="display: none">  
                        <div class="container ps-4 my-5">
                            <div class="mb-3 ">
                                <textarea class="form-control" id="reviewEditContent" rows="3"></textarea>
                            </div>
                            
                            <div>
                                <input id="reviewEditRating" class="d-none">
                            </div>
                            
                            <div class="d-flex justify-content-between">
                                <div class="d-flex justify-content-start mb-3">
                                    <span><i class="fa fa-star p-2" id="se1"></i></span>
                                    <span><i class="fa fa-star p-2" id="se2"></i></span>
                                    <span><i class="fa fa-star p-2" id="se3"></i></span>
                                    <span><i class="fa fa-star p-2" id="se4"></i></span>
                                    <span><i class="fa fa-star p-2" id="se5"></i></span>
                                </div>
                                <button type="submit" onclick="submitEditedReview('${e.review_id}')" id="review_submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>` :  ``
                }
                
             </div>
             `;
                    reviewHtml += reviewData;
                }
            });
            $('#reviewofRestaurant').append(reviewHtml);
        });

       
    // edit review data 
    onEditClick = (shouldEditReview) =>{
        console.log('edit btn clicked !')
        
        if(shouldEditReview) {
            $('#editForm').css('display','block')
        }
    }


    submitEditedReview = (reviewId) => {
        console.log('edit  review');
        $.ajax({
            url: `http://127.0.0.1:8080/reviews/${reviewId}`,
            type: 'PUT',
            data: {
                content:$('#reviewEditContent').val(),
                Rating:$('#reviewEditRating').val(),
                review_id:reviewId
            },
            success: function (result) {
                window.location.reload();
            }
        });
    }

    // delete review 
    deleteReview = (reviewId) => {
        console.log('delete review');
            $.ajax({
                url: `http://127.0.0.1:8080/reviews/${reviewId}`,
                type: 'DELETE',
                success: function (result) {
                    window.location.reload();
                }
            });
    }
});