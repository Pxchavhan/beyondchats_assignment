import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PHASE1_API = process.env.PHASE1_API;

export async function publishArticle(article) {
  try {
    const response = await axios.post(PHASE1_API, article, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Published article:", article.title);
    return response.data;
  } catch (error) {
    console.error("Failed to publish article:", article.title, error.message);
    return null;
  }
}
