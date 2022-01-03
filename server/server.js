import express from "express";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import bodyparser from "body-parser";

dotenv.config()

const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/api/login", (req, res) => {
    res.json({
        authorization: {
            authorization_endpoint: "https://github.com/login/oauth/authorize",
            scope: "user:email",
            client_id
        }
    });
});

app.post("/api/login/callback", async (req, res) => {
    const {code} = req.body;
    try {
        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "accept": "application/json"
            },
            body: new URLSearchParams({code, client_id, client_secret})
        });
        res.json(await response.json());
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});


app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("..", "client", "dist", "index.html"));
    } else {
        next();
    }
})


const server = app.listen(3000, () => {
    console.log("Started on http://localhost:" + server.address().port)
})
