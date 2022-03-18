import 'dotenv/config'
import {Context, Telegraf} from "telegraf";
import {Update} from "typegram";
import {RAE} from "rae-api";
import {DefinitionService, RaeApiDefinitionService} from "./rae_service";
import {errorMessage} from "./errors";
import {manageDefinitionFormat} from "./DefinitionsFormatter";

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string
);

const rae = new RAE();
const raeService: DefinitionService = new RaeApiDefinitionService(rae);

bot.start((context) => context.reply("Bienvenido " + context.from.first_name));
bot.help((context) => {
	context.reply("Escribe una palabra para obtener su definición");
});

const showDefinitions = (context: any) => {
	let chatMessage = context.message.text
	raeService.findDefinitionsFor(chatMessage)
		.then((definitions) => context.reply(manageDefinitionFormat(definitions), {parse_mode: "HTML"}))
		.catch(() => context.reply(errorMessage(chatMessage)));
}
bot.on("text", showDefinitions);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
