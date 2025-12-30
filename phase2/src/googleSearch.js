import axios from "axios";

const SERP_API_KEY = process.env.SERP_API_KEY;


async function searchGoogle(query) {
    try {
        const response = await axios.get("https://serpapi.com/search", {
            params: {
                api_key: SERP_API_KEY,
                engine: "google",
                q: query,
                num: 5
            }
        });

        const results = response.data.organic_results || [];

        const articleLinks = results
            .map(item => item.link)
            .filter(link =>
                link.startsWith("http") &&
                !link.includes("youtube") &&
                !link.includes("pdf")
            )
            .slice(0, 2);

        return articleLinks;
    } catch (error) {
        console.error("Search error:", error.message);
        return [];
    }
}

// TEST
(async () => {
    const title = "Chatbots Magic Beginner’s Guidebook";
    const links = await searchGoogle(title);

    console.log("Top Article Links:");
    links.forEach(link => console.log(link));
})();
