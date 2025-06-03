// Ai.services.js (CommonJS)
require("dotenv").config(); // 👈 load .env variables
const { OpenAI } = require("openai/index.js");
async function getAIResponse(description) {
  const { default: OpenAI } = await import("openai/index.js");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("API Key is:", process.env.OPENAI_API_KEY); // it should NOT be undefined

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Create a campaign message based on this description: ${description}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { getAIResponse };
