import {BrowserRouter, Route, Routes} from "react-router-dom";

export function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<h1>Hello Github</h1>} />
            <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
    </BrowserRouter>;
}
