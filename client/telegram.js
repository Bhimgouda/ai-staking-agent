const { Telegraf } = require("telegraf");
const { generateAIResponse } = require("../controllers/generator");
const { message } = require("telegraf/filters");

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

exports.launchTelegramBot = async () => {
  const bot = new Telegraf(telegramBotToken);

  bot.on("text", async (ctx) => {
    try {
      const aiResponse = await generateAIResponse(ctx.message.text);
      await ctx.reply(aiResponse);
    } catch (error) {
      console.error("Error generating AI response:", error);
      await ctx.reply("Sorry, something went wrong!");
    }
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
