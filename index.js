//TG: https://t.me/atom_baytovich

import { setupBot } from './bot.js';

const bot = setupBot();

bot.launch()
    .then(() => {
        console.log('Бот успешно запущен')
    })
    .catch(err => {
        console.log('Ошибка запуска: ', err)
    })