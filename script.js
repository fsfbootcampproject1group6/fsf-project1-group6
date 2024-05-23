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


// Enable users to add their favorites to be tracked to a table

const trackFavorites = function () {
    let addAnother = true;
    while (addAnother) {
        let title = prompt("please add movie title");
        let rating = prompt("please add a rating from 1 - 10 with 10 being the highest");
        let platform = prompt("please add what platform you watched this movie on");
        if(isNaN(rating)) {
            rating = 1;
        }
        const favorites = {
            title: title,
            rating: rating,
            platform: platform
        };
        favoriteMovies.push(favorites);
addAnother = confirm("Do you want to add another favorite?");

    };
    return favoriteMovies;
};

console.log(favoriteMovies)

// addFavoritesButton.addEventListener('click',trackFavorites);

// Display their favorites in an HTML table

const displayFavorites = function(moviesArray) {
    const tableBody = document.getElementById('favorites-table');
    tableBody.innerHTML = '';
    for (let i = 0; i < moviesArray.length; i++) {
        const currentMovie = moviesArray[i];
       
        const newTableRow = document.createElement("tr");
       
        const titleCell = document.createElement("td");
        titleCell.textContent=currentMovie.title;
        newTableRow.append(titleCell);
        
        const ratingCell = document.createElement("td");
        ratingCell.textContent = currentMovie.rating;
        newTableRow.append(ratingCell);

        const platformCell = document.createElement("td");
        platformCell.textContent = currentMovie.platform;
        newTableRow.append(platformCell);

        tableBody.append(newTableRow);
    }
}

const movieSubmissions = function () {
    const favoriteMovies = trackFavorites();
    
    displayFavorites(favoriteMovies);
}

addFavoritesButton.addEventListener('click', movieSubmissions);
