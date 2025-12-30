import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

const articles = [
  {
    title: "Chatbots Magic: Beginner’s Guidebook",
    links: [
      "https://beyondchats.com/blogs/introduction-to-chatbots/"
    ],
  },
  {
    title: "7 ways a Live Chatbot transforms customer interaction",
    links: [
      "https://beyondchats.com/blogs/live-chatbot/"
    ],
  },
];

// Scrape webpage and return cleaned text
async function scrapeText(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    $("script, style, iframe").remove();
    const text = $("body").text().replace(/\s+/g, " ").trim();
    return text;
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return "";
  }
}

// Rewrite article using Cohere Chat API
async function rewriteArticle(articleText) {
  const cleanedText = articleText.trim();
  if (!cleanedText) return "";

  try {
    const res = await axios.post(
      "https://api.cohere.com/v1/chat",
      {
        model: "command-a-03-2025",
        messages: [
          {
            role: "system",
            content: "You are a professional content writer."
          },
          {
            role: "user",
            content: `Rewrite the following article professionally, SEO friendly and human-written. Do not copy verbatim:\n\n${cleanedText}`
          }
        ],
        max_tokens: 1500
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content || "";
  } catch (err) {
    console.error("Cohere Chat API error:", err.response?.data || err.message);
    return articleText; // fallback
  }
}

// Save rewritten article to a .txt file
function publishArticle(title, content) {
  const fileName = title.toLowerCase().replace(/[^a-z0-9]+/g, "_") + ".txt";
  const filePath = path.join(process.cwd(), fileName);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Published: ${fileName}`);
}

// Main function
async function main() {
  for (const article of articles) {
    console.log(`\n📝 Processing: ${article.title}`);
    let combinedText = "";

    for (const url of article.links) {
      const text = await scrapeText(url);
      console.log(`📄 Scraped length for ${url}: ${text.length}`);
      if (text) combinedText += text + "\n\n";
    }

    if (!combinedText.trim()) {
      console.log("⚠️ No valid text to rewrite, skipping.");
      continue;
    }

    const rewritten = await rewriteArticle(combinedText);
    console.log("=== PREVIEW ===\n", rewritten.slice(0, 500), "...\n");
    publishArticle(article.title, rewritten);
  }
}

main();
