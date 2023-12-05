import {getTMDBMovie, getTMDBMovies} from "./api/tmdb-api.js";
import {getMovies, deleteMovie, postMovie, patchMovie, getMovie} from "./api/movies-api.js";

const renderFavoriteMovies = async () => {
    const movies = await getMovies();
    console.log(movies);
    const moviesContainer = document.querySelector(".movies-container");
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.genre}</p>
        <p>${movie.rating}</p>
        <p>${movie.overview}</p>
        <p>${movie.year}</p>
        <button class="edit-movie" data-id="${movie.id}">Edit</button>
        <button class="delete-movie" data-id="${movie.id}">Delete</button>
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
    movieDiv.classList.add("movie", `col-3`, `d-flex`, `flex-column`);
    movieDiv.innerHTML = `
    <img src="${movie.images.posters[0].file_path}" alt="movie-thumbnail" />
    <h3>${movie.title}</h3>
    <p>genre: ${movie.genre}</p>
    <p>vote average: ${movie.vote_average}</p>
    <p>summary: ${movie.overview}</p>
    <button class="add-favorite-movie">Add to Favorites</button>
    `;
    const favBtn = movieDiv.querySelector(".add-favorite-movie");
    favBtn.addEventListener("click", handleAddFavoriteMovie);
    moviesContainer.appendChild(movieDiv);
}
const renderTMDBMovies = (movies) => {
    const moviesContainer = document.querySelector(".tmdb-movies-container");
    moviesContainer.innerHTML = "";
    movies.forEach((movie, index) => {
        console.log("Rendering movie", movie);
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
    const movie = await getMovie(id);
    const title = prompt("Enter a new title", movie.title);
    const rating = prompt("Enter a new rating", movie.rating);
    await patchMovie({
        id,
        title,
        rating,
    });
    await renderFavoriteMovies();
}
const handleAddFavoriteMovie = async (event) => {
    const id = event.target.dataset.id;
    const movie = await getTMDBMovie(id);
    await postMovie({
        title: movie.title,
        genre: movie.genre_ids,
        rating: movie.vote_average,
        overview: movie.overview,
    });
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
        if(!movieGenre){
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

(async()=>{
    // loading showing default
    const tmdbMovies = await getTMDBMovies();
    await renderFavoriteMovies();
    console.log("getTMDBMovies() => ", tmdbMovies);
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
