
module.exports = {
    getGenresSeries: require("./genres").getGenresSeries,
    getSeriesByGenre: require("./bygenre").getSeriesByGenre,
    getCountriesSeries: require("./country").getCountriesSeries,
    getSeriesByCountry: require("./bycountry").getSeriesByCountry,
    getYearsSeries: require("./years").getYearsSeries,
    getSeriesByYears: require("./byyears").getSeriesByYears,
    streamSeries: require("./stream").streamSeries,
    getEpisode: require("./details").getEpisode
}