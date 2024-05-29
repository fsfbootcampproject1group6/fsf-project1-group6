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
        // request the user's current location
navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    // show a map centered at latitude/ Longitude,
 Map.innerHTLM = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55947.89174300336!2d-81.2746844!3d28.786917550000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e7130dec2388f7%3A0xc3317e4e9680554c!2sSanford%2C%20FL!5e0!3m2!1sen!2sus!4v1716945010343!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
});

// watching position
// const watchId = navigator.geolocation.watchPosition(position => {
//     const {latitude, longitude } = position.coords;
//     // show a map center at latitude/longtude,
//     console.log("watchId - "+watchId);
// })

