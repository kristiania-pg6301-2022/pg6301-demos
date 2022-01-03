import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {Login} from "./login";

function FrontPage({accessToken}) {
    return <>
        <h1>Hello Github</h1>
        {accessToken && <div><Link to={"/projects"}>My projects</Link></div>}
        {accessToken && <div><Link to={"/login/endsession"}>Logout</Link></div>}
        {!accessToken && <div><Link to={"/login"}>Log in</Link></div>}
        </>;
}

export function Application() {
    const [accessToken, setAccessToken] = useState();

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage accessToken={accessToken} />} />
            {accessToken && <Route path={"/projects"} element={<h1>My projects</h1>} />}
            <Route path={"/login/*"} element={<Login setAccessToken={setAccessToken} />} />
            <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
    </BrowserRouter>;
}
