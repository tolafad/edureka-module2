const express = require("express");
const fs = require('fs');


const app = express();


app.get("/", (req, res) => {
    res.send("Hello World");
});


app.get('/getMovies', function (req, res) {
    fs.readFile("./movies.json", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(JSON.parse(result))
        }

    })

})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});