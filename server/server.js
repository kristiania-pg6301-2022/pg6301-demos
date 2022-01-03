import express from "express";
import bodyParser from "body-parser";
import {moviesApi} from "./moviesApi.js";
import {staticFiles} from "./staticFiles.js";

const app = express();

app.use(bodyParser.json());
app.use("/api/movies", moviesApi);
app.use(staticFiles);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on http://localhost:" + server.address().port)
});
