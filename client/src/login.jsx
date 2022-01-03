import {Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

function StartLogin() {
    const [authorization, setAuthorization] = useState();
    useEffect(async () => {
       const res = await fetch("/api/login");
       setAuthorization((await res.json()).authorization);
    }, []);

    if (!authorization) {
        return <div>Please wait</div>;
    }
    const { client_id, scope, authorization_endpoint } = authorization;
    const params = {
        scope, client_id
    };
    const link = authorization_endpoint  + "?" + new URLSearchParams(params);
    return <a href={link}>Click here</a>;
}

function LoginCallback({setAccessToken}) {
    const query = Object.fromEntries(
        new URLSearchParams(window.location.search.substr(1))
    );
    const {code} = query;
    console.log({code});

    return <Link to={"/"}>Front page</Link>
}

export function Login({setAccessToken}) {
    return <Routes>
        <Route path={"/"} element={<StartLogin/>}/>
        <Route path={"/callback"} element={<LoginCallback setAccessToken={setAccessToken}/>}/>
    </Routes>;
}
