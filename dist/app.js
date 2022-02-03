"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const rae_api_1 = require("rae-api");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
const rae = new rae_api_1.RAE();
const handleWordSearch = async () => {
    let value = await rae.searchWord('hola');
    const wordId = value.getRes()[0].getId();
    const result = await rae.fetchWord(wordId);
    return result.getDefinitions();
};
// const wordId = async () => await search.getRes()
const result = async () => (await handleWordSearch()).map((val, index) => console.log(val.getType()));
result();
let insults = Array();
const getRandomElement = (array) => {
    console.log('eeeeeeee tio');
    return array.length ? array[Math.floor(Math.random() * array.length)] : 'empty';
};
insults = ['Jediondo de mierda', 'Los putos zokete', 'Callate ya hijodelagranputa que eres tontisimo', 'Poco se dice que me cago en tus muertos', '¿Conoces a Marcelo? Agaxate y conoselo'];
bot.start((context) => context.reply('Hello ' + context.from.first_name));
bot.help((context) => { context.reply('Send /hijodeputa to recieve a lil bit of love'); });
bot.command('hijodeputa', (context) => { context.reply(getRandomElement(insults)); });
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map