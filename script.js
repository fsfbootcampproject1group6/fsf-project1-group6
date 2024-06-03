const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37dc8fe3863669edc2545c1d7ad8f68f&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=37dc8fe3863669edc2545c1d7ad8f68f&query=";
const addFavoritesButton = document.getElementById('favorites-button');
var title = [];
var rating = [];
var platform = [];

//Modal Code Authorization
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2RjOGZlMzg2MzY2OWVkYzI1NDVjMWQ3YWQ4ZjY4ZiIsInN1YiI6IjY2NGUwMWM5NjE4NmRlZGQ3YzA2MTM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SgyxibMJR_A2R-Vqh40ykjh15Fl-1m_g_5b336ms11Q'
    }
  };
  
  fetch(APIURL, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  //fetch api and list as cards
  fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37dc8fe3863669edc2545c1d7ad8f68f&page=1', options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
  
      data.results.forEach((value, index, array) => {
        let card = document.createElement("div");
        card.className = "card card-clickable col-lg-3 col-md-3 col-sm-3 m-1";
        card.setAttribute("data-movie-id", value.id); // to store movie id
  
        let cardImage = document.createElement("img");
        cardImage.className = "card-img-top img-fluid";
        let posterUrl = `${IMGPATH}${value.poster_path}`;
        cardImage.setAttribute("src", posterUrl);
        // cardImage.style.height = "auto";
        // cardImage.style.width = "100%";
        
  
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
  
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = value.title;
  
        let cardText = document.createElement("p");
        cardText.className = "card-text fs-6";
  
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        document.getElementById("appendData").appendChild(card);
      });
    })
    .catch(err => console.error(err));
  
  //a function to get movie detail object taking movie id as a parameter
  function getMovieDetail(id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch(err => console.error(err));
  }
  
  // Function to open the modal and populate it with movie details
  function openMovieModal(movie) {
    const modalTitle = document.getElementById("movieModalLabel");
    const modalPoster = document.getElementById("modalPoster");
    const modalReleaseDate = document.getElementById("modalReleaseDate");
    const modalRuntime = document.getElementById("modalRuntime");
    const modalOverview = document.getElementById("modalOverview");
    const modalVoteAverage = document.getElementById("modalVoteAverage");  

    // Populate modal
    modalTitle.textContent = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;
    modalPoster.src = `${IMGPATH}${movie.poster_path}`;
    modalReleaseDate.textContent = movie.release_date;
    modalRuntime.textContent = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`;
    modalOverview.textContent = movie.overview;
    modalVoteAverage.textContent = movie.vote_average;
  
    // Open the modal
    const movieModal = new bootstrap.Modal(document.getElementById("movieModal"));
    movieModal.show();
  }
  
  //to launch modal on click of card
  document.getElementById("appendData").addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".card-clickable");
    if (clickedCard) {
      const movieID = clickedCard.dataset.movieId;
      console.log("Clicked on movie ID:", movieID);
      getMovieDetail(movieID)
        .then((ourMovie) => {
          console.log(ourMovie);
          openMovieModal(ourMovie)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
   

//Modal Code End

//initially get fav movies
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

        // movieEl.innerHTML = `
        //     <img
        //         src="${IMGPATH + poster_path}"
        //         alt="${title}"
        //     />
        //     <div class="movie-info">
        //         <h3>${title}</h3>
        //         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        //     </div>
        //     <div class="overview">
        //         <h3>Overview:</h3>
        //         ${overview}
        //     </div>
        // `;

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
r
        search.value = "";
    }
});

// AP working on how to set up a map in the website
        // request the user's current location
 navigator.geolocation.getCurrentPosition(position => {
const {latitude, longitude} = position.coords;
//     // show a map centered at latitude/ Longitude,
Map.innerHTLM = '<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d448599.79196334456!2d-81.79310678552966!3d28.54916010154584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smovies%20theater!5e0!3m2!1sen!2sus!4v1716506777041!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
});

// watching position
const watchId = navigator.geolocation.watchPosition(position => {
    const {latitude, longitude } = position.coords;
    // show a map center at latitude/longtude,
    console.log("watchId - "+watchId);
})



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

// Add Carousel API Hook
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovies(respData.results);
    carouselRandomizer(respData.results); // hook Api to Carousel
}

// Add Carousel Randomizer
const carouselRandomizer = async (movies) => {
    const carouselContainer = document.getElementsByClassName("carousel-indicators")[0];
    const carouselContent = document.getElementsByClassName("carousel-inner")[0];
    
    let randomMovies = movies.sort(() => Math.random() - 0.5).slice(0, 3);
    console.log("random movies", randomMovies);

    randomMovies.forEach((movie, i) => {
        
        const isCurrentSlide = i === 0;

        const carouselItem = `
        <div class="carousel-item ${isCurrentSlide? "active" : ""}">
          <img src="${IMGPATH + movie.poster_path}" class="d-block mx-auto" style="height: 500px" alt="movie image">            
        </div>
      `;
      carouselContent.innerHTML += carouselItem;

      const carouselSlide = `
        <button type="button" data-bs-target="#randomGen-carousel" data-bs-slide-to="${i}" class="${isCurrentSlide ? 'active' : ''}"></button>
      `;
      carouselContainer.innerHTML += carouselSlide;
    });
};