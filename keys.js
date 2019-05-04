console.log('Querying request...');

exports.key = {
    spotify: {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    },
    omdb: process.env.OMDB_ID,
    bands: process.env.BAND_ID

};