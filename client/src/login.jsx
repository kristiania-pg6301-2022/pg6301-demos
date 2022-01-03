import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function StartLogin() {
    useEffect(async () => {
        const res = await fetch("/api/login");
        const {authorization} = (await res.json());
        const {client_id, scope, authorization_endpoint} = authorization;
        const params = {scope, client_id};
        window.location.href = authorization_endpoint + "?" + new URLSearchParams(params);
    }, []);
    return <div>Please wait</div>;
}

function LoginCallback({setAccessToken}) {
    let navigate = useNavigate();
    useEffect(async () => {
        const query = Object.fromEntries(
            new URLSearchParams(window.location.search.substr(1))
        );
        const {code} = query;
        const res = await fetch("/api/login/callback", {
            method: "post",
            body: new URLSearchParams({code})
        });
        const {access_token} = await res.json();
        setAccessToken(access_token);
        navigate("/");
    }, []);
    return <div>Please wait</div>;
}

export function Login({setAccessToken}) {
    return <Routes>
        <Route path={"/"} element={<StartLogin/>}/>
        <Route path={"/callback"} element={<LoginCallback setAccessToken={setAccessToken}/>}/>
    </Routes>;
}
