const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

async function streamMovies(idmovies) {
    try {
        const url = `${process.env.LK21_BASE_MOVIE}${idmovies}/`;
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
            }
        });

        const $ = cheerio.load(response.data);

        const title = $("#movie-detail blockquote > a").text().trim() || "N/A";
        const image = $("#movie-detail .content-poster img").attr("src") || null;
        const quality = $("#movie-detail .content h3").eq(0).text().trim() || "N/A";
        const country = $("#movie-detail .content h3").eq(1).text().trim() || "N/A";
        const genres = $("#movie-detail .content").find("div:contains('Genre')").text().replace("Genre", "").trim() || "N/A";
        const diterbitkan = $("#movie-detail .content").find("div:contains('Diterbitkan')").text().replace("Diterbitkan", "").trim() || "N/A";
        const rating = $("#movie-detail .content").find("div:contains('IMDb')").text().replace("IMDb", "").trim() || "N/A";

        // Ambil sinopsis setelah <a> di dalam blockquote
        let synopsis = "N/A";
        const block = $("#movie-detail blockquote")[0];
        if (block) {
            const children = block.children;
            for (let i = 0; i < children.length; i++) {
                const el = children[i];
                if (el.name === "a") {
                    const nextNode = children[i + 1];
                    if (nextNode && nextNode.type === "text") {
                        const text = nextNode.data.trim();
                        if (text) {
                            synopsis = text;
                            break;
                        }
                    }
                }
            }
        }

        // Streaming link
        const stream = [];
        $("#loadProviders > li > a").each((i, el) => {
            const href = $(el).attr("href") || null;
            const text = $(el).text().trim();
            if (href) stream.push({ text, href });
        });

        return {
            slug: idmovies,
            title,
            image,
            quality,
            rating,
            country,
            genres,
            synopsis,
            diterbitkan,
            stream
        };

    } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data streamMovies:", err.message);
        throw err;
    }
}

module.exports = {
    streamMovies
};
