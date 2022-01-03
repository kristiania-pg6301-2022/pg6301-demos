const express = require("express");
const path = require("path");

const app = express();


app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
    } else {
        next();
    }
})


const server = app.listen(3000, () => {
    console.log("Started on http://localhost:" + server.address().port)
})
