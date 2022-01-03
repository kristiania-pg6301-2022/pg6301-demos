import express from "express";
import path from "path";


const app = express();

const reactPath = path.resolve("..", "client", "dist");
app.use(express.static(reactPath));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("..", "client", "dist", "index.html"));
    } else {
        next();
    }
});


const server = app.listen(3000, () => {
    console.log("Listening on http://localhost:" + server.address().port)
});
