import {getTMDBMovie, getTMDBMovies, searchTMDBMovies} from "./api/tmdb-api.js";
import {getMovies, deleteMovie, postMovie, patchMovie, getMovie} from "./api/movies-api.js";

const renderFavoriteMovies = async () => {
    const movies = await getMovies();
    console.log(movies);
    const moviesContainer = document.querySelector(".movies-container");
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("col-12", "col-md-4", "col-lg-3");
        movieDiv.innerHTML = `
        <div class="movie">
            <img class="posterImg" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie-thumbnail" />
            <h3>${movie.title}</h3>
            <p>genre: ${movie.genre}</p>
            <p>rating: ${movie.rating}/10</p>
            <p>overview: ${movie.overview}</p>
            <p>release date:${movie.year}</p>
            <button class="edit-movie" data-id="${movie.id}">Edit</button>
            <button class="delete-movie" data-id="${movie.id}">Delete</button>
        </div>
        `;
        moviesContainer.append(movieDiv);
        });
    const deleteButtons = document.querySelectorAll(".delete-movie");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDeleteMovie);
    });
    const editButtons = document.querySelectorAll(".edit-movie");
    editButtons.forEach((button) => {
        button.addEventListener("click", handleEditMovie);
    });
}
const renderTMDBMovie = (movie) => {
    const moviesContainer = document.querySelector(".tmdb-movies-container");
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("col-12", "col-md-4", "col-lg-3");
    movieDiv.innerHTML = `
    <div class="movie d-flex flex-column">
        <img class="TMDBPoster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie-thumbnail" />
        <h3>${movie.title}</h3>
        <p>genre: ${movie.genre}</p>
        <p>vote average: ${movie.vote_average}/10</p>
        <p>summary: ${movie.overview}</p>
        <button class="add-favorite-movie">Add to Favorites</button>
    </div>
    `;
    const favBtn = movieDiv.querySelector(".add-favorite-movie");
    favBtn.addEventListener("click", ()=>{
        handleAddTMDBMovieToFavorites(movie);
    });
    moviesContainer.appendChild(movieDiv);
}
const renderTMDBMovies = (movies) => {
    const moviesContainer = document.querySelector(".tmdb-movies-container");
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
       renderTMDBMovie(movie);
    });
}
const handleDeleteMovie = async (event) => {
    console.log(event.target.dataset.id);
    const id = event.target.dataset.id;
    await deleteMovie(id);
    await renderFavoriteMovies();
}
const handleEditMovie = async (event) => {
    const id = event.target.dataset.id;
    const title = prompt("What is the title of this movie?");
    const genre = prompt("What is the genre of this movie?");
    const rating = prompt("What is the rating of this movie?");
    const overview = prompt("What is the overview of this movie?");
    const year = prompt("What year was this movie released?");
    await patchMovie({
        id: id,
        title: title,
        genre: genre,
        rating: rating,
        overview: overview,
        year: year,
    });
    await renderFavoriteMovies();
}
const handleAddTMDBMovieToFavorites = async (movie) => {
    const movieData = await getTMDBMovie(movie.id);
    await postMovie({
        ...movie,
        // title: movieData.title,
        // genre: movieData.genres[0].name,
        // rating: movieData.vote_average,
        // overview: movieData.overview,
        // year: movieData.release_date,
    });
    console.log(movieData);
    await renderFavoriteMovies();
}
const updateMovies = (movies) => {
    const moviesContainer = document.querySelector(".tmdb-movies-container");
    moviesContainer.innerHTML = "";
    const searchInput = document.querySelector(".search-input");
    const searchValue = searchInput.value.toLowerCase();
    let movieResults = movies;
    const movieGenre = document.querySelector(
        `input[name="genre"]:checked`
    ).value;
    movieResults = movieResults.filter((movie) => {
        if(!movieGenre || movieGenre === "all"){
            return true;
        }
        if (movie.genre.toLowerCase().includes(movieGenre)){
            return true;
        } else {
            return false;
        }
    });
    movieResults = movieResults.filter((movie) => {
        if(!searchValue){
            return true;
        }
        if (movie.title.toLowerCase().includes(searchValue)){
            return true;
        } else {
            return false;
        }
    });
    renderTMDBMovies(movieResults);
}
const handleCreateMovieBtn = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const genre = document.querySelector("#genre").value;
    const rating = document.querySelector("#rating").value;
    const overview = document.querySelector("#overview").value;
    const year = document.querySelector("#year").value;
    await postMovie({
        title,
        genre,
        rating,
        overview,
        year,
    });
    await renderFavoriteMovies();
}
const handleWalkingAnimation = () =>{


    const robot = document.querySelector(`#loadingCharacter`);

    const walkSrc0 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk0.png";
    const walkSrc1 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk1.png";
    const walkSrc2 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk2.png";
    const walkSrc3 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk3.png";
    const walkSrc4 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk4.png";
    const walkSrc5 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk5.png";
    const walkSrc6 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk6.png";
    const walkSrc7 = "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk7.png";

    if(robot.getAttribute('src') === walkSrc0){
        robot.src = walkSrc1;
    } else if(robot.getAttribute('src') === walkSrc1){
        robot.src = walkSrc2;
    } else if(robot.getAttribute('src') === walkSrc2){
        robot.src = walkSrc3;
    } else if(robot.getAttribute('src') === walkSrc3){
        robot.src = walkSrc4;
    } else if(robot.getAttribute('src') === walkSrc4){
        robot.src = walkSrc5;
    } else if(robot.getAttribute('src') === walkSrc5){
        robot.src = walkSrc6;
    } else if(robot.getAttribute('src') === walkSrc6){
        robot.src = walkSrc7;
    } else if(robot.getAttribute('src') === walkSrc7){
        robot.src = walkSrc0;
    }
}
const handleLoadingScreen = () =>{
    const loadingScreen = document.querySelector(`#loadingScreen`);
    loadingScreen.classList.add(`showLoading`);
    const animatedCharacter = document.querySelector(`#loadingCharacter`);
    animatedCharacter.setAttribute('src', "./kenney_toon-characters-1/Robot/PNG/Poses%20HD/character_robot_walk0.png");
    animatedCharacter.classList.add(`walkAnimation`);
    setInterval(()=>{
        handleWalkingAnimation();
    }, 62.5);
    setTimeout(()=>{
        loadingScreen.classList.remove(`showLoading`);
        animatedCharacter.classList.remove(`walkAnimation`);
    }, 4000);
}

(async()=>{
        handleLoadingScreen();
        const tmdbMovies = await getTMDBMovies();
        await renderFavoriteMovies();
        console.log(tmdbMovies);
        renderTMDBMovies(tmdbMovies);


    /// hide the loading screen
    const movieForm = document.querySelector(".container.modal");

    const createMovieBtn = document.querySelector(".create-movie");
    createMovieBtn.addEventListener("click", (event) => {
        handleCreateMovieBtn(event);
        movieForm.classList.toggle("active");
    });

    document.querySelector(".prompt-add-movie").addEventListener("click", async () => {
        movieForm.classList.toggle("active");
    });
    document.querySelector(".modal-bg").addEventListener("click", async () => {
        movieForm.classList.toggle("active");
    });

    const searchButton = document.querySelector(`.searchButton`);
    searchButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const movies = await getTMDBMovies();
        updateMovies(movies);
    });


})()
