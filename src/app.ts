import "dotenv/config";
import {Context, Telegraf} from "telegraf";
import {Update} from "typegram";
import {RAE} from "rae-api";
import {DefinitionService, RaeApiDefinitionService} from "./definition-service";
import {manageDefinitionFormat} from "./definitions-formatter";
import {NotDefinitionFoundError} from "./errors";

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

const rae = new RAE();
const raeService: DefinitionService = new RaeApiDefinitionService(rae);

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});

const showDefinitions = (context: any) => {
	let chatMessage = context.message.text;
	const matchingWord = raeService.getFirstMatchingWord(chatMessage)
	const definitions = raeService
		.findDefinitionsFor(chatMessage)
		.catch((error: NotDefinitionFoundError) => context.reply(error.message));

	Promise.all([matchingWord, definitions])
		.then(([matchingWord, definitions]) => context.reply(manageDefinitionFormat(matchingWord, definitions), {
			parse_mode: "HTML",
		}))
};
bot.on("text", showDefinitions);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
