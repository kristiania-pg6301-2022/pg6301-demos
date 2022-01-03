import * as React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Movies} from "./movies";

export function FrontPage() {
    return <>
        <h1>My App</h1>
        <ul>
            <li><Link to={"/movies"}>View movies</Link></li>
            <li><Link to={"/movies/new"}>Add movie</Link></li>
        </ul>
    </>;
}

export function Application() {
    return <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>
                <Route path={"/movies/*"} element={<Movies/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
}
