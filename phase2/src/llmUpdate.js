import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function updateArticleWithLLM(original, references) {
  const referenceText = references.map((r, i) => `Reference ${i+1}:\n${r}`).join("\n\n");

  const prompt = `
You are a professional content writer.
Update the following article to make its style, formatting, and content similar to these reference articles:

Original Article:
${original}

Reference Articles:
${referenceText}

Keep the core idea of the original article intact and cite the references at the bottom.
Return only the updated article text.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional content writer." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return (response.data.choices?.[0]?.message?.content || original).trim();
  } catch (error) {
    if (error.response) {
      console.error("LLM update failed:", error.response.status, error.response.data);
    } else {
      console.error("LLM update failed:", error.message);
    }
    return original;
  }
}
