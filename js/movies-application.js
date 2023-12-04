

const getMovies = async () => {
    const url = "http://localhost:3000/movies";
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

const getMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
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

const postMovie = async (movie) => {

        const newMovie = {
            ...movie,
        }

        const body = JSON.stringify(newMovie);

        const url = `http://localhost:3000/movies`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        }
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
}

const patchMovie = async (movie) => {

            const updatedMovie = {
                ...movie,
            }

            const body = JSON.stringify(updatedMovie);

            const url = `http://localhost:3000/movies/${movie.id}`;
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
}

const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

const renderMovies = async () => {
    const movies = await getMovies();
    console.log(movies);
    const moviesContainer = document.querySelector(".movies-container");
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.rating}</p>
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

const handleDeleteMovie = async (event) => {
    console.log(event.target.dataset.id);
    const id = event.target.dataset.id;
    await deleteMovie(id);
    await renderMovies();
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
    await renderMovies();
}

(async()=>{

    await renderMovies();
    document.querySelector(".add-movie").addEventListener("click", async () => {
        const title = prompt("Enter a title");
        const rating = prompt("Enter a rating");
        await postMovie({
            title,
            rating,
        });
        await renderMovies();
    });

})()
