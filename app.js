const { isInteger } = require('lodash');
const fetch = require('node-fetch');
require = require('esm')(module /*, options*/);
const TelegramBot = require('node-telegram-bot-api');
const { GetRank } = require('./scrape');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });
const contestIds = [419532, 420178, 421700, 422879, 424233, 425122, 426951, 428258, 429357, 430578, 431213, 432138, 433100, 433716, 434753, 436386, 438582, 439859, 440900, 442062]
 
 const sheetId = {
      "Binary Search": "1GFYZHg8XE2HghelM9qKU2F6_bQQB4PghLbrDBHqefrE",
      "Recursion": "1iUurRtQy3wwPTSYgtequ4BlDW9YDIl1OzdYW9FzV3HM",
      "Stacks": "1SutEYgtTSQHS1F58nYvgTwA3mrs8TXdXp353bwEspcw",
      "Sliding Window & Prefix": "1xNgSp44tV1luxPfyb0ywXqLwov7Wf6FFznNd5r13kSA",
      "Two Pointers": "11qSjVROH0xNIDiPSGpRgxZz0AwM1PRlsw-frl_AYzcg",
      "Sorting": "1Jg-ki9sMer8eJvIkDGAV5uslj8potAF5jcy2Z2sOxhw",
      "Arrays/Matrix": "1XRvMPWDRN4Bjh4qfkLKyOaQNjIxb-X2r7LOb1a32xrU",
      "Best Coding Practice": "1q1LOSb_ubg9bLmaF7miKZ7p8pWy2Jl9FBcvzjxVLC8U",
      "Time/Space Complexity": "1zT8bDKmd0hZ6FDX-QVk7nnVCdQd1LCnw2xE2BhE2SB0",
      "Numerics": "1y803BATqUFdGO0N4YNHFcsqrw1x9FUc7xLOpMuP4aO4",
      "Bitwise Operation" : "1YGnbIUC34GZEUlooJm-MpJXCcDrTLt6DgHS7NXBv-y0",
 }
 
const refer_video = {
    'Bitwise Operation ': 'https://anonfiles.com/6cteo4r3z6/BitwiseOperation_mp4',
    "Queue": "https://anonfiles.com/H5W6n2r5zb/screen_capture_queue_mp4",
    'Backtracking' : 'https://www.awesomescreenshot.com/video/16264406?key=d7d95f858356d87ea30805d11a911950',
    'Monotonocity':'https://www.awesomescreenshot.com/video/16939529?key=83e625fa4b20c2b5e306958a19408c81',
    'Recursion Recap': 'https://www.awesomescreenshot.com/video/16959271?key=fb763b9ff68c17f11a321dabd682179c',
    'Recursion II' : 'https://www.awesomescreenshot.com/video/16264406?key=d7d95f858356d87ea30805d11a911950',
}
bot.onText(/\/?\.help/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
        .then(() => console.log('Message deleted successfully.'))
        .catch((error) => console.error(error));


    var msg = `Welcome to the bot.\nCommands:`+
        `.fetch <contest_id_number>\n`+
        `eg: url = ..../contests/<430578>\n`+
        `.fetch 430578 \n`+
        `.list (list past contests)\n`+
        `.resource (To get all the lecture resources)`+
        `.help or /help ~ help\n`+
        `.about\n`+
        `.dquote (To get daily Quotes)`+
        `.updates (To check for updates logs)\n\n*****************`

    bot.sendMessage(chatId, msg);
});

// updates 
bot.onText(/\/?\.updates/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
        .then(() => console.log('Message deleted successfully.'))
        .catch((error) => console.error(error));
    var msg = `Bot Updated Log!\n`+
        `- Added past contest view option\n`+
        `- Added menu buttons\n`+
        `- Added All lecture resource file\n`+
        `- Daily Quotes\n`+
        `\n\n\n Contributors:\n @lucid_404 @Keni99 `;
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
bot.onText(/\/?\.resource/, (msg, match) => {
  const chatId = msg.chat.id;
  const keyboard = Object.keys(sheetId).map((key) => {
    return [{ text: `.${key}`, callback_data: `.${key}` }];
  });
  const inlineKeyboard = {
    inline_keyboard: keyboard,
  };
  bot.sendMessage(chatId, 'Please select a resource:', { reply_markup: inlineKeyboard });
});

const makeurl = (id, sid) =>{
    const url = `https://docs.google.com/presentation/d/${sid}/export/pdf`;
    const messagei = `Download/View Resource About: ${id}`
    const ViewUrl = 'https://docs.google.com/presentation/d/' + sid ;
    return {url, ViewUrl, messagei}
}
bot.on("callback_query", ({ data, message }) => {
    const chatId = message.chat.id;
    const messageId = message.message_id;
    // console.log(data.startsWith("."), )
    
    if(data.startsWith(".")){
        // console.log("i am in", data)
        
        let id = data.replace(".", "")
        if(id in refer_video){
            
            console.log("Found Video", refer_video[id]);
            bot.sendMessage(chatId, `Video Link For ${id}`, { 
            reply_markup: { 
                inline_keyboard: [
                    [{ text: "View Video", url: refer_video[id]  }]
                    ]
                } 
            });
        }else{
            
            let sid = sheetId[data.replace(".", "")]
            const {url, ViewUrl, messagei} = makeurl(id, sid)
            // console.log(url, ViewUrl, messagei)
            // console.log(url, messagei, id)
            bot.sendMessage(chatId, messagei, { 
                reply_markup: { 
                    inline_keyboard: [
                        [{ text: "Download PDF", url: url }],
                        [{ text: "View", url: ViewUrl }]
                    ]
                } 
            });

        }
    }
    else{
        codeforcesResult(Number(data),chatId)
    }
    
})



// Record Video 
bot.onText(/\/?\.video/, (msg, match) => {
  const chatId = msg.chat.id;
  const keyboard = Object.keys(refer_video).map((key) => {
    return [{ text: `.${key}`, callback_data: `.${key}` }];
  });
  const inlineKeyboard = {
    inline_keyboard: keyboard,
  };
  bot.sendMessage(chatId, 'Please select a resource Video:', { reply_markup: inlineKeyboard });
});
//adding quote feautures 

const quote = async () => {
  try {
    const res = await fetch("https://api.quotable.io/quotes/random?tags=inspirational|motivational");
    if (!res.ok) {
      throw new Error("Error...Try again....");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Net Error");
    throw error; // re-throw the error so the caller can handle it
  }
};

bot.onText(/\/?\.dquote/, (msg, match) => {

    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.deleteMessage(chatId, messageId)
        .then(() => console.log('Message deleted successfully.'))
        .catch((error) => console.error(error));
  quote().then((data) => {
    // console.log(data);
    let authors = data[0].author;
    let contents = data[0].content;
    let author = authors.replace(/[-.]/g, "\\$&");
    let content = contents.replace(/[-.]/g, "\\$&");
    
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    bot.sendMessage(chatId, "Daily Quote✨\n"+`*${content}*`+
                   "\n\n\\-||" + author + "||",{parse_mode: "MarkdownV2"} );

  }).catch((error) => {
    console.log(error);
    bot.sendMessage(
      msg.chat.id,
      "Failed to fetch a quote. Please try again later.",
      { parse_mode: "MarkdownV2" }
    );
  });
});


bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    var msg = `Welcome to the bot. Use @help or /help to get started`
    bot.sendMessage(chatId, msg,{
        reply_markup:{
            keyboard:[[{text:".list"}],[{text:".resource"}],[{text:".help"}],[{text:".about"}],[{text:".updates"}]],
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
