const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config()

async function getYearsMovies(){
    try{
        const response = await axios.get(process.env.LK21_BASE_MOVIE, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
        });
        const $ = cheerio.load(response.data);
        const years = [];
        $('#primary-menu > ul:nth-child(1) > li:nth-child(6) > ul > li > div > ul > li > a').each((i, el) => {
            const name = $(el).text().trim();
            const link = $(el).attr("href");
            const href = new URL(link, process.env.LK21_BASE_MOVIE).pathname.split('/').filter(Boolean).pop();
            years.push({name, href});
        });
        return years;
    } catch (err){
        console.log("error: ", err);
        throw err;
    }
}

module.exports = {
    getYearsMovies
}