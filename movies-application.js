

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

(async()=>{



})()
