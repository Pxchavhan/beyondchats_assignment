import google from "googlethis";

export async function searchGoogle(title) {
  const options = {
    page: 0,
    safe: false,
    additional_params: {
      hl: "en",
    },
  };

  try {
    const results = await google.search(title, options);
    // Return top 2 links
    return results.results.slice(0, 2).map(r => r.url);
  } catch (error) {
    console.error("Google Search failed:", error.message);
    return [];
  }
}
