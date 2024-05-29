const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37dc8fe3863669edc2545c1d7ad8f68f&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=37dc8fe3863669edc2545c1d7ad8f68f&query=";
const addFavoritesButton = document.getElementById('favorites-button');
var title = [];
var rating = [];
var platform = [];


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




// addFavoritesButton.addEventListener('click',trackFavorites);

// Display their favorites in an HTML table

function displayFavorites() {
    const tableBody = document.getElementById('favorites-table');
    tableBody.innerHTML = '';
    for (let i = 0; i < title.length; i++) {
        const curtitle = title[i];
        const currating = rating[i];
        const curplatform = platform[i];

        const newTableRow = document.createElement("tr");
       
        const titleCell = document.createElement("td");
        titleCell.textContent=curtitle;
        newTableRow.append(titleCell);
        
        const ratingCell = document.createElement("td");
        ratingCell.textContent = currating;
        newTableRow.append(ratingCell);

        const platformCell = document.createElement("td");
        platformCell.textContent = curplatform;
        newTableRow.append(platformCell);

        tableBody.append(newTableRow);
    }
}
    function start() {
        const storedtitle = JSON.parse(localStorage.getItem('title'));
        const storedrating = JSON.parse(localStorage.getItem('rating'));
        const storedplatform = JSON.parse(localStorage.getItem('platform'));

        if (storedplatform !== null) {
        title = storedtitle;
        rating = storedrating;
        platform = storedplatform;
        }

        displayFavorites();
    }

// Enable users to add their favorites to be tracked to a table
function storefavorites() {
    localStorage.setItem('title', JSON.stringify(title))
    localStorage.setItem('rating', JSON.stringify(rating))
    localStorage.setItem('platform', JSON.stringify(platform))
}
addFavoritesButton.addEventListener('click', function() {
    let addAnother = true;
    while (addAnother) {
        let temptitle = prompt("please add movie title");
        let temprating = prompt("please add a rating from 1 - 10 with 10 being the highest");
        let tempplatform = prompt("please add what platform you watched this movie on");
        if(isNaN(temprating)) {
            temprating = 1;
        }
        title.push(temptitle);
        rating.push(temprating);
        platform.push(tempplatform);
addAnother = confirm("Do you want to add another favorite?");

    };
    storefavorites();
    displayFavorites();
});

start()