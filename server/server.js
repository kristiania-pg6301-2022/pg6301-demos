import express from "express";
import path from "path";
import bodyParser from "body-parser";
import {moviesApi} from "./moviesApi.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/movies", moviesApi);

const reactPath = path.resolve("..", "client", "dist");
app.use(express.static(reactPath));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("..", "client", "dist", "index.html"));
    } else {
        next();
    }
});


const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on http://localhost:" + server.address().port)
});
