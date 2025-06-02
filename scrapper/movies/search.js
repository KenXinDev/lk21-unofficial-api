const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

async function searchMovie(params) {
    try{
        const url = `${process.env.LK21_BASE_MOVIE}search.php?s=${params}`;
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
        });
        const $ = cheerio.load(response.data);
        const movies = [];
        $("body > main > div > section > div:nth-child(2) > div > div > div.search-item").each((i, el) => {
            const titleNodes = $(el).find("div > div.col-xs-9.col-sm-10.search-content > h3 > a")
            const title = titleNodes.text().trim();
            const link = titleNodes.attr("href");
            const slug = new URL(link, process.env.LK21_BASE_MOVIE).pathname.split("/").filter(Boolean).pop();
            const image = $(el).find("div > div.col-xs-3.col-sm-1.search-poster > figure > a:nth-child(2) > img").attr("src");
            let type = "";
            if (title.includes("Series")) {
                type = "series";
            } else {
                type = "movie";
            }
            const ratingText = $(el).find("div > div.col-xs-9.col-sm-10.search-content > p:nth-child(4)").text().trim();
            const rating = ratingText.replace("Rating:", "").trim() || "N/A";
            const genreText = $(el).find("div > div.col-xs-9.col-sm-10.search-content > p:nth-child(2)").text().trim();
            const genres = genreText.replace("Genres:", "").trim() || "N/A";
            const countryText = $(el).find("div > div.col-xs-9.col-sm-10.search-content > p:nth-child(3)").text().trim();
            const country = countryText.replace("Negara:", "").trim() || "N/A";
            movies.push({slug, title, image, type, rating, genres, country})
        });
        return movies;
    } catch (err){
        console.log("error: ", err);
        throw err;
    }
}

module.exports = {
    searchMovie
}