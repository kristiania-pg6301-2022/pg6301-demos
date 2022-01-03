import {Link, Route, Routes} from "react-router-dom";

function StartLogin({authorizationEndpoint = "https://github.com/login/oauth/authorize"}) {
    const params = {
        scope: "user:email", client_id: "b3d323b25d823f9e3e97"
    };
    const link = authorizationEndpoint  + "?" + new URLSearchParams(params);
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
