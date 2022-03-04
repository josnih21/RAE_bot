import 'dotenv/config'
import { Context, Telegraf } from "telegraf";
import { Update } from "typegram";
import { Definition, RAE } from "rae-api";

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string
);

const rae = new RAE();

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});

const errorMessage = (word: String) => `No he encontrado una definición para ${word}`
const showDefinitions = (context: any) =>
	rae.searchWord(context.message.text)
		.then((response) => rae.fetchWord(response.getRes()[0].getId()))
		.then((result) => result.getDefinitions())
		.then((definitions) => definitions.map((value) => context.reply(value.getDefinition())))
		.catch((error) => context.reply(errorMessage(context.message.text)));

bot.on("text", showDefinitions);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
