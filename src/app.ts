import "dotenv/config";
import {Context, Telegraf} from "telegraf";
import {Update} from "typegram";
import {RAE} from "rae-api";
import {DefinitionService, RaeApiDefinitionService} from "./definition-service";
import {format} from "./definitions-formatter";
import {NotDefinitionFoundError} from "./errors";

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

const rae = new RAE();
const raeService: DefinitionService = new RaeApiDefinitionService(rae);

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});


const showDefinitions = async (context: any) => {
	let chatMessage = context.update.inline_query.query;
	const matchingWord = await raeService.getFirstMatchingWord(chatMessage)
	const definitions = await raeService
		.findDefinitionsFor(matchingWord.text)
		.catch((error: NotDefinitionFoundError) => context.reply(error.message));

	return format(matchingWord, definitions)
};

bot.on("inline_query",  async context => {
	const [headerMessage, formattedDefinitions] = await showDefinitions(context)
	return context.answerInlineQuery([{
		type: "article",
		id: context.update.inline_query.id,
		title: headerMessage,
		input_message_content: {
			message_text: formattedDefinitions,
			parse_mode: "HTML",
		},
	}])
})
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
