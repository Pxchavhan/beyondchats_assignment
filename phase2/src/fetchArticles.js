import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PHASE1_API = process.env.PHASE1_API;

export async function fetchArticles() {
  try {
    const response = await axios.get(PHASE1_API);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles from Phase 1 API:", error.message);
    throw error;
  }
}
