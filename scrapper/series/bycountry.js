const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config()

async function getSeriesByCountry(countryid, page = 1) {
    try{
        let url = `${process.env.LK21_BASE_SERIES}country/${countryid}`;
        if (page > 1){
            url = `${process.env.LK21_BASE_SERIES}country/${countryid}/page/${page}/`;
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
        const series = [];
        $("#grid-wrapper > div > article").each((i, el) => {
            const images = $(el).find("figure > a > picture > img").attr("src");
            // Ambil elemen <a>
            const a = $(el).find("header > h1 > a");
            // Ambil teks tanpa <cite>
            const title = a.contents().filter(function () {
                return this.type === "text" && $(this).text().trim() !== "";
            }).text().trim() || "N/A";
            const rating = $(el).find("figure > div > div.rating").text().trim() || "N/A";
            const episode = $(el).find("figure > div > div.last-episode").text().trim().replace("EPS", "").trim() || "N/A";
            const link = $(el).find("figure > a").attr("href");
            const slug = new URL(link, process.env.LK21_BASE_MOVIE).pathname.split("/").filter(Boolean).pop();
            const trailer = $(el).find("footer > p:nth-child(2) > a").attr("href") || "N/A";
            series.push({slug, title, rating, episode, images, trailer})
        });
        return {
            total_pages,
            series
        };

    } catch(err){
        console.log("error: ", err.message);
        throw err;
    }
}

module.exports = {
    getSeriesByCountry
}