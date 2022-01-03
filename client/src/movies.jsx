import {Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";

function ListMovies({moviesApi}) {
    const [movies, setMovies] = useState();
    useEffect(async () => {
        setMovies(await moviesApi.listMovies());
    }, [])

    return <>
        <h1>All movies</h1>
        <Link to={"new"}>Add movie</Link>
        {movies && movies.map(({id, title}) =>
            <div key={id}><Link to={id}>{title}</Link></div>
        )}
    </>;
}

function AddMovie({moviesApi}) {
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        await moviesApi.createMovie({
            title, plot
        });
        navigate("..");
    }

    return <form onSubmit={handleSubmit}>
        <h1>Add Movie</h1>
        <div>
            <label>Title:</label>
            <input value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
            <label>Plot:</label>
            <input value={plot} onChange={e => setPlot(e.target.value)}/>
        </div>
        <div>
            <button disabled={title.length === 0 || plot.length === 0}>Submit</button>
        </div>
    </form>;
}

function ShowMovie({moviesApi}) {
    const {id} = useParams();
    const [movie, setMovie] = useState();
    useEffect(async () => {
        setMovie(await moviesApi.getMovie(id));
    }, [id])


    if (!movie) {
        return <div>Please wait</div>;
    }

    return <>
        <h1>{movie.title}</h1>
        <div>{movie.plot}</div>
        </>;
}

export function Movies() {
    const [movies, setMovies] = useState([]);

    async function createMovie(movie) {
        setMovies(value => [...value, {id: value.length.toString(), ...movie}]);
    }

    async function listMovies() {
        return movies;
    }

    async function getMovie(id) {
        const movie = movies.find(m => m.id === id);
        if (!movie) {
            console.log({id, movies});
        }
        return movie;
    }

    const moviesApi = {
        createMovie, listMovies, getMovie
    };

    return <Routes>
        <Route path={"/"} element={<ListMovies moviesApi={moviesApi}/>}/>
        <Route path={"/new"} element={<AddMovie moviesApi={moviesApi}/>}/>
        <Route path={"/:id"} element={<ShowMovie moviesApi={moviesApi}/>}/>
    </Routes>;
}
