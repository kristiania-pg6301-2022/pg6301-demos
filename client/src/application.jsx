import * as React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

export function FrontPage() {
    return <>
        <h1>My App</h1>
        <ul>
            <li><Link to={"/movies"}>View movies</Link></li>
            <li><Link to={"/movies/new"}>Add movie</Link></li>
        </ul>
    </>;
}

function Movies() {
    return <Routes>
        <Route path={"/"} element={<h1>Movie List</h1>} />
        <Route path={"/new"} element={<h1>Add new movie</h1>} />
    </Routes>;
}

export function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/movies/*"} element={<Movies />} />
        </Routes>
    </BrowserRouter>
}
