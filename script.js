const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37dc8fe3863669edc2545c1d7ad8f68f&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/movie?&api_key=37dc8fe3863669edc2545c1d7ad8f68f&query=";
const addFavoritesButton = document.getElementById('favorites-button');
const favoriteMovies = []


// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

// AP working on how to set up a map in the website

//  avigator.geolocation.getCurrentPosition(function(position) {
//     var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//  }});


//     map.setCenter(pos);
//     //Put marker of the Geolocated user location
//     var userMarker = new google.maps.Marker({
//         map: map,
//         position: pos
//     });

//     google.maps.event.addListener(userMarker, 'click', function() {
//         infoWindow.setContent('Your location');
//         infoWindow.open(map, this);
//     });

//     var requestMoviesTheater = {
//         location: pos,
//         radius: '10000',
//         type: ['moviesTheater']
//     };

//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(requestmoviesTheater, callback);

//     function callback(results, status) {
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//                 var place = results[i];
//                 createMarker(results[i]);
//             }
//         }
//     }

//     var type = place.types;
//     var iconStyle;
//     //loop to all the type of the place
//     for (var i = 0; i < type.length; i++) {
//         //put array of Place types in placeType variable
//         var placeType = type[i];        
//         //Check the placeType and set the icon according to the placeType value
//         switch (placeType) {
//             case "moviesTheater":
//                 iconStyle = "/v2/showtimes/views/current-location/2-24-2017/38.91/-94.64"
//                 // iconStyle = "http://maps.google.com/mapfiles/kml/shapes/pharmacy_rx.png"
//                 break;
//         }}

//         //put marker of the places in the map
//     var marker = new google.maps.Marker({
//         map: map,
//         icon: iconStyle,
//         position: place.geometry.location
//     });

//     google.maps.event.addListener(marker, 'click', function() {
//         infoWindow.setContent(place.name);
//         infoWindow.open(map, this);
    // });
// this where i stop working for today 05/23/24
