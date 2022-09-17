import { Telegraf } from 'telegraf';
import {
    replyMessageOther,
    startBot,
    updateMessageMain
} from './controllers/commands.js';

// создаём новый инстанс бота
const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
    // команда "/start" аналог cmd.command('start', handler)
    bot.start(startBot)

    // прослушка на текстовые сообщения и передаём ссылку на функцию
    bot.on('text', updateMessageMain);
    // прослушка на все типы сообщения (текстовые не пройдут - блокируются выше другой прослушкой)
    bot.on('message', replyMessageOther);
    return bot;
}


export { setupBot }