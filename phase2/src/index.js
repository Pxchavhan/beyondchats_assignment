import dotenv from "dotenv";
dotenv.config();

import { fetchArticles } from "./fetchArticles.js";
import { searchGoogle } from "./googleSearch.js";
import { scrapeContent } from "./scrapeContent.js";
import { updateArticleWithLLM } from "./llmUpdate.js";
import { publishArticle } from "./publishArticle.js";

async function processArticles() {
  try {
    const articles = await fetchArticles();

    for (const article of articles) {
      console.log(`Processing: ${article.title}`);

      // 1. Search Google for reference articles
      let references = [];
      try {
        const searchResults = await searchGoogle(article.title); // fixed function name
        const topLinks = searchResults.slice(0, 2);

        for (const link of topLinks) {
          try {
            const content = await scrapeContent(link); // fixed function name
            references.push({ text: content, sourceUrl: link });
          } catch (scrapeErr) {
            console.error(`Failed to scrape ${link}:`, scrapeErr.message);
          }
        }
      } catch (err) {
        console.error("Google Search failed:", err.message);
      }

      // 2. Update article with LLM (or fallback to original if quota exceeded)
      let updatedContent;
      try {
        updatedContent = await updateArticleWithLLM(article.content, references.map(r => r.text));
      } catch (err) {
        console.error("LLM update failed, using original content:", err.message);
        updatedContent = article.content;
      }

      // 3. Append reference URLs at the bottom
      if (references.length > 0) {
        updatedContent += "\n\nReferences:\n";
        references.forEach((r, i) => {
          updatedContent += `Reference ${i + 1}: ${r.sourceUrl || "Unknown URL"}\n`;
        });
      }

      // 4. Publish the article
      try {
        await publishArticle({
          id: article.id,
          title: article.title,
          content: updatedContent,
        });
        console.log(`Published successfully: ${article.title}`);
      } catch (err) {
        console.error(`Failed to publish article: ${article.title}`, err.message);
      }
    }

    console.log("Phase 2 processing complete!");
  } catch (err) {
    console.error("Phase 2 failed:", err.message);
  }
}

processArticles();
