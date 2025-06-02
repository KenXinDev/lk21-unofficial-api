const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config()

async function getMovieByGenre(genreid, page = 1){
    try{
        let url = `${process.env.LK21_BASE_MOVIE}genre/${genreid}`;
        if (page > 1){
            url = `${process.env.LK21_BASE_MOVIE}genre/${genreid}/page/${page}/`;
        }
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
        });
        const $ = cheerio.load(response.data);
        const h3Text = $("body > main > div > section > div:nth-child(2) > div > header > h3").text();
        const match = h3Text.match(/Halaman\s+\d+\s+dari\s+(\d+)/i);
        const total_pages = match && match[1] ? parseInt(match[1]) : 1;
        const movies = [];
        $("#grid-wrapper > div > article").each((i, el) => {
            const images = $(el).find("figure > a > picture > img").attr("src");
            const title = $(el).find("header > h1 > a").text().trim();
            const rating = $(el).find("figure > div > div.rating").text().trim() || "N/A";
            const quality = $(el).find("figure > div > div.quality").text().trim() || "N/A";
            const link = $(el).find("figure > a").attr("href");
            const slug = new URL(link, process.env.LK21_BASE_MOVIE).pathname.split("/").filter(Boolean).pop();
            const trailer = $(el).find("footer > p:nth-child(2) > a").attr("href") || "N/A";
            movies.push({slug, title, rating, quality, images, trailer})
        });
        return {
            total_pages,
            movies
        };

    } catch(err){
        console.log("error: ", err.message);
        throw err;
    }
}

module.exports = {
    getMovieByGenre,
}