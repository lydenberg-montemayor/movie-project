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
    const thumbnail = await getTMDBThumbnail(data.results[0]);
    const movies = data.results.map((movie) => {
        return {
            ...movie,
            genre: genres.genres.find((genre) => genre.id === movie.genre_ids[0]).name,
            thumbnail: thumbnail,
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

const getTMDBThumbnail = async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/images`;
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