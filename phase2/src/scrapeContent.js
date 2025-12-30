import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeArticle(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Select all paragraph tags inside the article
        let paragraphs = $("article p, p").map((i, el) => $(el).text()).get();

        // Join and trim
        const content = paragraphs.join("\n\n").trim();

        return content;
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return "";
    }
}

// TEST
(async () => {
    const urls = [
        "https://beyondchats.com/blogs/introduction-to-chatbots/",
        "https://www.amazon.com/Chatbot-Magic-Beginners-Creating-Chatbots/dp/B0F99NWJBN"
    ];

    for (const url of urls) {
        const content = await scrapeArticle(url);
        console.log(`\nContent from: ${url}\n`);
        console.log(content.slice(0, 500), "..."); // print first 500 chars
    }
})();
