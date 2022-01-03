import express from "express";
import path from "path";

export const staticFiles = express.Router();

const reactPath = path.resolve("..", "client", "dist");
staticFiles.use(express.static(reactPath));
staticFiles.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.join(reactPath, "index.html"));
    } else {
        next();
    }
});
