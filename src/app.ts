import 'dotenv/config'
import { Context, Telegraf } from "telegraf";
import { Update } from "typegram";
import { Definition, RAE } from "rae-api";

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string
);

const rae = new RAE();
type DefinitionFunction = (definitions: Definition[]) => void;
const handleWordSearch2 = (word: string) => {
	return new Promise((resolve: DefinitionFunction, reject) => {
		rae.searchWord(word)
			.then((response) => rae.fetchWord(response.getRes()[0].getId()))
			.then((result) => result.getDefinitions()) //TODO: rename
			.then(resolve)
			.catch(reject);
	});
};

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});

const showDefinitions = (context: any) =>
	handleWordSearch2(context.message.text).then((definitions) =>
		definitions.map((value) => context.reply(value.getDefinition()))
	);
bot.on("text", showDefinitions);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
