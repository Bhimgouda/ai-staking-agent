const axios = require("axios");
const OpenAI = require("openai");
const openai = new OpenAI();

exports.generateAIResponse = async (message) => {
  let poolData = (await axios.get("https://yields.llama.fi/pools")).data;

  const data = poolData.data.filter((pool) => pool.tvlUsd > 500000000);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Give a one-liner based on market data ${JSON.stringify(
          data
        )}. Avoid TVLs below 1 billion.`,
      },
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
};
