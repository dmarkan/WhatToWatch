const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
    const query = req.body.movieTitle;
    const key = "&apikey=41efbfaf";
    const url = "https://www.omdbapi.com/?t=" + query + key;
    https.get(url, function (response) {
        console.log(response.statusCode);
        let finalData = '';
        response.on("data", function (data) {
            finalData += data.toString();
        })
        response.on("end", function() {
            const parsedData = JSON.parse(finalData);
            const poster = parsedData.Poster;
            const title = parsedData.Title;
            const year = parsedData.Year;
            const runtime = parsedData.Runtime;
            const genre = parsedData.Genre;
            const director = parsedData.Director;
            const writer = parsedData.Writer;
            const actors = parsedData.Actors;
            const plot = parsedData.Plot;
            const imdb = parsedData.imdbRating;
            res.setHeader("Content-Type", "text/html");
            res.write("<img style='width:30rem;height:35rem;border:solid #dc3545 0.1rem;margin: auto; margin-top:3.5vh; display: block;' src=" + poster + ">");
            res.write("<body style='background-image: url(images/background2.jpg); background-size: cover;background-position: center; background-attachment: fixed; background-repeat: no-repeat;'>")
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Title: " + title + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Year: " + year + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Runtime: " + runtime + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Genre: " + genre + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Director: " + director + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Writer: " + writer + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Actors: " + actors + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>Plot: " + plot + "</p>");
            res.write("<p style='text-align:center;color:#fff;font-size:2rem;'>IMDB Rating: " + imdb + "</p>");
            res.send();   
         })
        })
    
    })

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})