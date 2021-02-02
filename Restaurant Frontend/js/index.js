$(document).ready(function () {

    logout = () => {
        localStorage.setItem('login', 0);
        localStorage.setItem('userName', 'user');
    }
    if (localStorage.getItem('login') == 0) {
        $('#loginerror').css('display', 'flex')
    }
    else {

        function getResturantData(callback) {
            $.get("http://127.0.0.1:8080/restaurants", function (data, success) {
                callback(data);
            })
        }
        if (localStorage.getItem('userName') != 'null') {
            document.getElementById('user').innerText = localStorage.getItem('userName');
        }

        function displayRestaurant(data) {
            console.log(data);
            let restrauntHtml = "";
            let backgroundColor = 'yellow';
            data.forEach(e => {
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
                    `<div class="col-md-3 text-center mt-5" id="signleRestarant">
                 <a class="text-decoration-none" href="../html/restrauant.html?restaurant_id=${e.restaurant_id}">
                    <img class="img-fluid restrauantImg" src="${e.Photo}" alt="">
                <p class="p-1 ps-1">${e.restaurantName}</p>
                </a>
            <div class="d-flex justify-content-center">
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 1 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 2 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 3 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating >= 4 ? backgroundColor : '#CCC'}"></i></span>
                <span><i class="fa fa-star p-2" style="color: ${e.avgRating == 5 ? backgroundColor : '#CCC'}"></i></span>
            </div>
        </div>`;
                restrauntHtml += restrauntPhoto;
            });
            $('#restrauantPhotoList').append(restrauntHtml);
        }

        // filter search result 
        function onKeyup(e) {
            const Searchvalue = e.target.value.toLowerCase();
            getResturantData(function (data) {
                const filteredArray = data.filter((char) => {
                    return (
                        char.restaurantName.toLowerCase().includes(Searchvalue)
                    );
                });
                if (filteredArray.length === 0) {
                    $('#restrauantPhotoList').css('display', 'none');
                    $('#noResult').css('display', 'block');
                }
                else {
                    $('#restrauantPhotoList').empty();
                    displayRestaurant(filteredArray);
                    $('#noResult').css('display', 'none');
                }
            })
        }
        $('#searchBtn').on('keyup', onKeyup);

        getResturantData(function (data) {
            displayRestaurant(data);
        });
    }

    // cuisine search 
    // get cuisine names 
    $.getJSON("http://127.0.0.1:8080/cuisines",
        function (data, Status) {
            let allCuisines = "";
            let cuisine = "";
            data.forEach(e => {
                cuisine = e.cuisineName;
                let cuisineData = `
                        <li><a class="dropdown-item" href="#" onclick="getRestaurantForCuisine('${cuisine}')">${e.cuisineName}</a></li> `;
                allCuisines += cuisineData;
            });
            $('#cuisineMain').append(allCuisines);
        }
    );

    getRestaurantForCuisine = (cuisineClickName) => {
        // get Restaurant array using cuisine 
        $.getJSON(`http://127.0.0.1:8080/cuisine/${cuisineClickName}`,
            function (data, Status) {
                $('#restrauantPhotoList').empty();
                displayRestaurant(data);
            });
    }

    
    // Region Filter 
    // get cuisine names 
    $.getJSON("http://127.0.0.1:8080/region",
        function (data, Status) {
            let allregions = "";
            let region = "";
            data.forEach(e => {
                region = e.regionName;
                let regionData = `
                        <li><a class="dropdown-item" href="#" onclick="getRestaurantForRegion('${region}')">${e.regionName}</a></li> `;
                        allregions += regionData;
            });
            $('#regionMain').append(allregions);
        }
    );

    getRestaurantForRegion = (regionClickName) => {
        console.log(regionClickName);
        // get Restaurant array using region 
        $.getJSON(`http://127.0.0.1:8080/region/${regionClickName}`,
            function (data, Status) {
                console.log("this is my cup",data);
                $('#restrauantPhotoList').empty();
                displayRestaurant(data);
            });
    }



});