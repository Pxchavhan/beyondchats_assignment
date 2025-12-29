import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Get all paragraph text as main content
    let content = "";
    $("p").each((i, el) => {
      content += $(el).text() + "\n";
    });

    return content.trim();
  } catch (error) {
    console.error("Failed to scrape", url, ":", error.message);
    return "";
  }
}
