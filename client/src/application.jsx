import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {Login} from "./login";

function FrontPage({user}) {
    return <>
        {user && <h2>{user.name}</h2>}
        <h1>Hello Github</h1>
        {user && <div><Link to={"/repos"}>My repos</Link></div>}
        {user && <div><Link to={"/login/endsession"}>Logout</Link></div>}
        {!user && <div><Link to={"/login"}>Log in</Link></div>}
        </>;
}

function Repositories({accessToken}) {
    const [repos, setRepos] = useState();
    useEffect(async () => {
        const res = await fetch("https://api.github.com/orgs/kristiania-pgr203-2021/repos", {
            headers: {
                accept: "application/vnd.github.v3+json",
                authorization: `Bearer ${accessToken}`
            }
        });
        setRepos(await res.json());
    }, [accessToken]);
    return <>
        <h1>My projects</h1>
        {repos && repos.map(r => (
            <div>{r.full_name}</div>
        ))}
        </>;
}

export function Application() {
    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();
    useEffect(async () => {
        if (accessToken) {
            const res = await fetch("https://api.github.com/user", {
                headers: {
                    accept: "application/vnd.github.v3+json",
                    authorization: `Bearer ${accessToken}`
                }
            });
            const user = await res.json();
            setUser(user);
        }
    }, [accessToken]);

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage user={user} />} />
            {accessToken && <Route path={"/repos"} element={<Repositories accessToken={accessToken}/>} />}
            <Route path={"/login/*"} element={<Login setAccessToken={setAccessToken} />} />
            <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
    </BrowserRouter>;
}
