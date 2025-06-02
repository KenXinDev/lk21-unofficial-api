module.exports = {
    getGenresMovies: require("./genres").getGenresMovies,
    getMovieByGenre: require("./bygenre").getMovieByGenre,
    getCountriesMovies: require("./country").getCountriesMovies,
    getMovieByCountry: require("./bycountry").getMovieByCountry,
    getYearsMovies: require("./years").getYearsMovies,
    getMovieByYears: require("./byyears").getMovieByYears,
    searchMovie: require("./search").searchMovie,
    latestMovies: require("./latest").latestMovies,
    streamMovies: require("./stream").streamMovies
};
