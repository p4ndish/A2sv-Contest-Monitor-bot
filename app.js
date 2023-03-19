const { isInteger } = require('lodash');
require = require('esm')(module /*, options*/);
const TelegramBot = require('node-telegram-bot-api');
const { GetRank } = require('./scrape');
// let rank = GetRank(430578)
const token = 'bot-token';

const bot = new TelegramBot(token, { polling: true });
const contestIds = [419532, 420178, 421700, 422879, 424233, 425122, 426951, 428258, 429357, 430578, 431213, 432138, 433100, 433716]

bot.onText(/\/?\.help/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
        .then(() => console.log('Message deleted successfully.'))
        .catch((error) => console.error(error));


    var msg = `Welcome to the bot.\nCommands:\n	.fetch <contest_id_number>\n\n   \teg: url = ..../contests/<430578>\n\t      .fetch 430578 \n\n.list (list past contests)\n\n.help or /help ~ help\n .about\n\n\n**update coming soon....**`

    bot.sendMessage(chatId, msg);
});


bot.onText(/\/?\.about/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    var msg = `I Am A2SV's Contest winners and Contest analysis Bot\nmade by A2SVian @lucid_404 `;
    bot.sendMessage(chatId, msg);
});
bot.onText(/\/?\.list/, (msg, match) => {
    const chatId = msg.chat.id;
    var msg = `Choose one from past contests`;
    bot.sendMessage(chatId, msg, {
        reply_markup: {
            inline_keyboard: contestIds.map((id, i) => [{ text: `#${i + 1}. ${id}`, callback_data: id }]),
            resize_keyboard: true
        }
    });
});
const codeforcesResult = (resp, chatId) => {
    GetRank(resp, function (err, result) {
        if (err) {
            // handle error
            console.log(err);
            return;
        }
        var msgs = result.rank
        global.m = `\t **${result.title.name} ** \n  \t\t\t** Top 5 Performers ** \n\n${emojies[1]} ${msgs[0]}${emojies[6]}\n${emojies[2]} ${msgs[1]}${emojies[7]}\n${emojies[3]}${msgs[2]}${emojies[8]}\n${emojies[4]} ${msgs[3]} \n${emojies[5]} ${msgs[4]} \n\nGood Job Guys👏👏👏`

        bot.sendMessage(chatId, m);

        return [result.rank, result.title.name]
    });
}
bot.on("callback_query", ({ data, message }) => {
    const chatId = message.chat.id;
    codeforcesResult(Number(data),chatId)
})
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    var msg = `Welcome to the bot. Use @help or /help to get started`
    bot.sendMessage(chatId, msg,{
        reply_markup:{
            keyboard:[[{text:".list"}],[{text:".about"}],[{text:".help"}]],
            resize_keyboard:true
        }
    });
});

bot.onText(/\.fetch (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
        .then(() => console.log('Message deleted successfully.'))
        .catch((error) => console.error(error));
    var resp = match[1];
    resp = parseInt(resp)
    if (!resp || !isInteger(resp)) { resp = "Unknown Id!!!" }

    // now fetch the standings 430578
    codeforcesResult(resp,chatId)
});
emojies = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
    4: "🏅",
    5: "🎖",
    6: "🏆",
    7: "",
    8: ""
}
