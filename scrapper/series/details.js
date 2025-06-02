const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

async function getEpisode(idSeries) {
    try{
        const url = `${process.env.LK21_BASE_SERIES}${idSeries}`;
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
        });
        const $ = cheerio.load(response.data);
        const title = $("body > main > section.post-wrapper > div > div:nth-child(2) > div > article > header > h1 > a").text().trim().replace("Download Film BluRay Layarkaca21 Lk21 Dunia21", "") || "N/A";
        const image = $("#movie-detail > div > div.col-xs-3.content-poster > figure > picture > img").attr("src") || null;
        const status = $("#movie-detail .content h3").eq(0).text().trim() || "N/A";
        const genres = $("#movie-detail .content").find("div:contains('Genre')").text().replace("Genre", "").trim() || "N/A";
        const diterbitkan = $("#movie-detail .content").find("div:contains('Diterbitkan')").text().replace("Diterbitkan", "").trim() || "N/A";
        let bintang_film = [];
        $("#movie-detail > div > div.col-xs-9.content > div:nth-child(2) h3 a").each((i, el) => {
            const nama = $(el).text().trim();
            if (nama) bintang_film.push(nama);
        });
        bintang_film = bintang_film.length > 0 ? bintang_film.join(", ") : "N/A";
        let synopsis = "N/A";
        const block = $("#movie-detail > div > div.col-xs-9.content > blockquote");

        if (block.length) {
            // Ambil isi blockquote tanpa isi <strong> dan <span>
            block.find("strong").remove();
            block.find("span").remove();

            synopsis = block.text().trim().replace(/\s+/g, " ");
        }

        const episode = [];
        $("body > main > section.post-wrapper > div > div:nth-child(2) > div > div.serial-wrapper > div.episode-list a").each((i, el) => {
            const link = $(el).attr("href");
            const text = $(el).text().trim();

            if (!link || text === "Info") return; // lewati jika tidak ada link atau text-nya "Info"

            const slug = new URL(link, process.env.LK21_BASE_SERIES).pathname.split("/").filter(Boolean).pop();
            episode.push({ slug, text });
        });


        return {
            slug: idSeries,
            title,
            image,
            bintang_film,
            status,
            genres,
            synopsis,
            diterbitkan,
            episode
        }
    } catch (err){
        console.log("error: ", err);
        throw err;
    }
}

module.exports = {
    getEpisode
}