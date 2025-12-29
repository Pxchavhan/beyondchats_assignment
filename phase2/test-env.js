import 'dotenv/config';

console.log(process.env.OPENAI_API_KEY ? "OpenAI OK" : "OpenAI Missing");
console.log(process.env.SERPAPI_KEY ? "SerpAPI OK" : "SerpAPI Missing");
