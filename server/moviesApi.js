import express from "express";

export const moviesApi = express.Router();


const movies = [];
moviesApi.get("/", (req, res) => {
    res.json(movies);
});

moviesApi.get("/:id", (req, res) => {
    const {id} = req.params;
    res.json(movies.find(m => m.id === id));
});

moviesApi.post("/", (req, res) => {
    const { title, plot } = req.body;
    const id = movies.length.toString();
    movies.push({id, title, plot})
    res.status(200).end();
});
