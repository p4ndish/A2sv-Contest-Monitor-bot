const { isInteger } = require('lodash');
require = require('esm')(module /*, options*/);
const TelegramBot = require('node-telegram-bot-api');
const {GetRank} = require('./scrape');
// let rank = GetRank(430578)
const token = 'bot-token';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/?\.help/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
            .then(() => console.log('Message deleted successfully.'))
            .catch((error) => console.error(error));
 

    var msg = `Welcome to the bot.\nCommands:\n	.fetch <contest_id_number>\n\n   \teg: url = ..../contests/<430578>\n\t      .fetch 430578 \n\n.help or /help ~ help\n .about\n\n\n**update comming soon....**`
    
    bot.sendMessage(chatId, msg);
});


bot.onText(/\/?\.about/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    var msg = `I Am A2SV's Contest winners and Contest analysis Bot\nmade by A2SVian @lucid_404 `;
    bot.sendMessage(chatId, msg);
});
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    var msg = `Welcome to the bot. Use @help or /help to get started`
    bot.sendMessage(chatId, msg);
});

bot.onText(/\.fetch (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
            .then(() => console.log('Message deleted successfully.'))
            .catch((error) => console.error(error));
    var resp = match[1]; 
    resp = parseInt(resp)
    if (!resp || !isInteger(resp)){resp = "Unknown Id!!!"}
    
    // now fetch the standings 430578
    GetRank(resp, function(err, result) {
        if (err) {
          // handle error
          console.log(err);
          return;
        }
        var msgs =result.rank
        global.m = `\t **${result.title.name} ** \n  \t\t\t** Top 5 Performers ** \n\n${emojies[1]} ${msgs[0]}${emojies[6]}\n${emojies[2]} ${msgs[1]}${emojies[7]}\n${emojies[3]}${msgs[2]}${emojies[8]}\n${emojies[4]} ${msgs[3]} \n${emojies[5]} ${msgs[4]} \n\nGood Job Guys👏👏👏` 
            
        bot.sendMessage(chatId, m);
        return [result.rank, result.title.name]
    });
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
