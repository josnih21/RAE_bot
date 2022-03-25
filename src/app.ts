import "dotenv/config";
import { Context, Telegraf } from "telegraf";
import { Update } from "typegram";
import { RAE } from "rae-api";
import { DefinitionService, RaeApiDefinitionService } from "./definition-service";
import { format } from "./definitions-formatter";
import { NotDefinitionFoundError, NotMatchingWordFoundError } from "./errors";

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

const rae = new RAE();
const raeService: DefinitionService = new RaeApiDefinitionService(rae);

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});

const showDefinitions = (chatMessage: string) => {
	const matchingWord = raeService.getFirstMatchingWord(chatMessage);
	const definitions = matchingWord.then((firstMatchingWord) => raeService.findDefinitionsFor(firstMatchingWord.text));

	return Promise.all([matchingWord, definitions]).then(([firstMatchingWord, definitions]) =>
		format(firstMatchingWord, definitions)
	);
};

bot.on("inline_query", async (context) => {
	const chatMessage = context.update.inline_query.query;
	if (chatMessage.length > 0) {
		showDefinitions(chatMessage)
			.then(([headerMessage, formattedDefinitions]) =>
				context.answerInlineQuery([
					{
						type: "article",
						id: context.update.inline_query.id,
						title: headerMessage,
						input_message_content: {
							message_text: formattedDefinitions,
							parse_mode: "HTML",
						},
					},
				])
			)
			.catch((error: NotMatchingWordFoundError) => console.log(error.message))
			.catch((error: NotDefinitionFoundError) => console.log(error.message));
	}
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
