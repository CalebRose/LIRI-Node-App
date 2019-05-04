require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.key.spotify);
var omdb = keys.key.omdb;
var band = keys.key.bands;
var queryUrl = "";

var spotifyThis = (song) => {
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log("Error: " + err);
        }
        // Album
        console.log("========= Spotify ==========");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        logger();
    });
}

var movieThis = (movie) => {
    queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdb;
    axios.get(queryUrl).then(
        function (response) {
            console.log("========= OMDB ==========");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            if (response.data.Ratings[0]["Rotten Tomatoes"] !== undefined) console.log("Rotten Tomatoes: " + response.data.Ratings[0]["Rotten Tomatoes"]);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            logger();
        }
    );
}

var concertThis = (artist) => {
    //
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + band;
    axios.get(queryUrl).then(
        function (response) {
            var concert = response.data;
            // Grabs the Top 5 Results
            for (let i = 0; i < 5; i++) {
                console.log("========= Concert " + (i + 1) + " =========");
                console.log("Venue: " + concert[i].venue.name);
                console.log("City: " + concert[i].venue.city);
                console.log("Country: " + concert[i].venue.country);
                console.log("Artist: " + concert[i].lineup[0]);
                console.log("Date: " + moment(concert[i].datetime, moment.ISO_8601).format("MM/DD/YYYY"));
                console.log("=============================");
            }
            logger();
        }
    );
}

var doWhat = () => {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) return console.log(error);
        var dataArr = data.split(", ");
        if (dataArr[0] === "spotify-this-song") spotifyThis(dataArr[1]);
    });
}

var logger = () => {
    var text = process.argv.slice(2).join(", ");
    fs.appendFile("log.txt", " \n" + text, function (err) {
        if (err) console.log(err);
        else console.log("Appending to log. Thank you for using LIRI.");
    });
}

var algo = (algorithm) => {
    console.log("========= ALGORITHM ==========");
    if (algorithm === "sort") {
        var arr = [2, 1, 10, 53, 24, 50, 3, 7, 27];
        console.log("Here is an array: " + arr);
        console.log("Running Select Sort...");
        arr = selectThis(arr);
        console.log("Result: " + arr);
    } else if (algorithm === "reverse") {
        var str = "Language Interpretation and Recognition Interface";
        console.log("String to Reverse: " + str);
        console.log("Reversing...");
        str = reversal(str);
        console.log("PRESTO! Here you go: " + str);
    }
    console.log("==============================");

    logger();
}

var selectThis = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        var noSwap = true;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
                noSwap = false;
            }
        }
        if (!noSwap) {
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

var reversal = (str) => {
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) newStr += str[i];
    return newStr
}

if (process.argv[2] == "spotify-this-song") {
    if (process.argv[3]) {
        spotifyThis(process.argv[3]);
    } else {
        spotifyThis("The Sign - Aces of Base");
    }
} else if (process.argv[2] === "movie-this") {
    movieThis(process.argv[3]);
} else if (process.argv[2] === "concert-this") {
    concertThis(process.argv[3]);
} else if (process.argv[2] === "do-what-it-says") {
    doWhat();
} else if (process.argv[2] === "algo-this") {
    algo(process.argv[3]);
} else console.log("I'm sorry, I don't understand what you're asking for.");