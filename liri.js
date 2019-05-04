require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

if (process.argv[2] == "spotify-this-song") {
    // Display Artist Info
    // Preview Link to Song
    // Album that song is from

    // Otherwise, default to The Sign by Ace of Base
}