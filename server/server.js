
const express = require("express");

const app = express();

const server = app.listen(3000, () => {
    console.log("Started on http://localhost:" + server.address().port)
})
