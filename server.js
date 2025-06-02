const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const {
    getGenresMovies,
    getMovieByGenre,
    getCountriesMovies,
    getMovieByCountry,
    getYearsMovies,
    getMovieByYears,
    searchMovie,
    latestMovies,
    streamMovies
} = require("./scrapper/movies");

const { 
    getGenresSeries,
    getSeriesByGenre,
    getCountriesSeries,
    getSeriesByCountry,
    getYearsSeries,
    getSeriesByYears,
    streamSeries,
    getEpisode

 } = require("./scrapper/series");
const app = express();
const PORT = process.env.PORT || 3000;

// Developer info
const Developers = {
    name: "LK21 Unofficial API",
    author: "KenXinDev",
    github: "https://github.com/KenXinDev/"
};

// Middleware
app.use(cors());
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Routes
app.get("/", (_, res) => {
    res.json({
        status: true,
        developers: Developers,
        message: "Welcome to LK21 Unofficial API"
    });
});

app.get("/movies/:slug/stream", async (req, res) => {
    try {
        const stream = await streamMovies(req.params.slug);
        if (!stream) {
            return res.status(404).json({ status: false, developers: Developers, message: "Movie not found" });
        }
        res.json({ status: true, developers: Developers, result: stream });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/search", async (req, res) => {
    try {
        const query = req.query.s;
        if (!query) return res.status(400).json({ status: false, developers: Developers, message: "Missing search query (?s=)" });

        const movies = await searchMovie(query);
        res.json({ status: true, developers: Developers, results: movies });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/latest", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, movies } = await latestMovies(page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: movies });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/genres", async (_, res) => {
    try {
        const genres = await getGenresMovies();
        res.json({ status: true, developers: Developers, results: genres });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/years", async (_, res) => {
    try {
        const years = await getYearsMovies();
        res.json({ status: true, developers: Developers, results: years });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/countries", async (_, res) => {
    try {
        const countries = await getCountriesMovies();
        res.json({ status: true, developers: Developers, results: countries });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/genre/:genre", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, movies } = await getMovieByGenre(req.params.genre, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: movies });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/year/:year", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, movies } = await getMovieByYears(req.params.year, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: movies });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/movies/country/:country", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, movies } = await getMovieByCountry(req.params.country, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: movies });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/genres", async (_, res) => {
    try {
        const genres = await getGenresSeries();
        res.json({ status: true, developers: Developers, results: genres });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/genre/:genre", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, series } = await getSeriesByGenre(req.params.genre, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: series });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/countries", async (_, res) => {
    try {
        const countries = await getCountriesSeries();
        res.json({ status: true, developers: Developers, results: countries });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/country/:country", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, series } = await getSeriesByCountry(req.params.country, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: series });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/years", async (_, res) => {
    try {
        const years = await getYearsSeries();
        res.json({ status: true, developers: Developers, results: years });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/year/:year", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const { total_pages, series } = await getSeriesByYears(req.params.year, page);
        res.json({ status: true, developers: Developers, current_page: page, total_pages, results: series });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/:slug/stream", async (req, res) => {
    try {
        const stream = await streamSeries(req.params.slug);
        if (!stream) {
            return res.status(404).json({ status: false, developers: Developers, message: "Series not found" });
        }
        res.json({ status: true, developers: Developers, result: stream });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

app.get("/series/:slug/", async (req, res) => {
    try {
        const detail = await getEpisode(req.params.slug);
        if (!detail) {
            return res.status(404).json({ status: false, developers: Developers, message: "Series not found" });
        }
        res.json({ status: true, developers: Developers, result: detail });
    } catch (err) {
        res.status(500).json({ status: false, developers: Developers, message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
