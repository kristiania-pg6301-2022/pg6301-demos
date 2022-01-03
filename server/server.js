const express = require("express");
const path = require("path");

const app = express();

app.get("/api/login", (req, res) => {
    res.json({
       authorization: {
           authorization_endpoint: "https://github.com/login/oauth/authorize",
           client_id: "b3d323b25d823f9e3e97",
           scope: "user:email"
       }
    });
});

app.post("/api/login/callback", (req, res) => {

});


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
