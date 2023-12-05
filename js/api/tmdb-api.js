import {keys} from "../keys.js";

export const getTMDBMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${keys.TMDB}&language=en-US&page=1`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const genres = await getTMDBGenres();
    const images = await getTMDBImages(data.results[0].id);
    const movies = data.results.map((movie) => {
        return {
            ...movie,
            genre: genres.genres.find((genre) => genre.id === movie.genre_ids[0]).name,
            images
        }
    });
    return movies;
}

export const getTMDBMovie = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${keys.TMDB}&language=en-US`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

const getTMDBGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${keys.TMDB}&language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

const getTMDBImages = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${keys.TMDB}&language=en-US&include_image_language=en,null`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    const response = await fetch(url, options);
    const thumbnail = await response.json();
    return thumbnail;
}