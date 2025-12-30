import axios from "axios";

const API_URL = "http://127.0.0.1:8000/articles";

async function fetchArticles() {
    try {
        const response = await axios.get(API_URL);
        const articles = response.data;

        console.log("Fetched Articles:");
        articles.forEach(article => {
            console.log({
                id: article.id,
                title: article.title,
                url: article.url
            });
        });

        return articles;
    } catch (error) {
        console.error("Error fetching articles:", error.message);
    }
}

fetchArticles();
