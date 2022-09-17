import { gTTS } from "simple-gtts";

const chatIdVoice = process.env.CHAT_ID_VOICE;
const chatIdText = process.env.CHAT_ID_TEXT;

// функция перевода сообщения текстового в голосовое
const updateMessageMain = async (ctx) => {
    try {
        if (ctx.update.message.chat.id == chatIdText) {
            //получаем текст сообщения
            const speech = ctx.update.message.text;
            // получаем буффер преобразованного голосвого сообщения на русском языка
            const buff = await gTTS(speech, {
                lang: "ru",
            })
            // отправляем как аудио с параметрами подписи, автора и названия аудио
            await ctx.telegram.sendAudio(chatIdVoice, {
                source: buff
            }, {
                caption: `@${ctx.update.message.from.username}`,
                performer: `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`,
                title: `${speech.slice(0, 15)}...`
            })
        }
    } catch (error) {
        console.log(error)
        ctx.telegram.sendMessage(chatIdText, `Произошла ошибка отправки ${error?.name}`)
    }
}

// пересылка остальных сообщений (кроме текстовых)
const replyMessageOther = ctx => {
    if (ctx.update.message.chat.id == chatIdText) {
        ctx.telegram.forwardMessage(chatIdVoice, chatIdText, ctx.update.message.message_id)
    }
}

const startBot = ctx => {
    ctx.reply('💡 Привет. Я бот.\n🎖 Умею переводить голосовые для людей с огр.возможностями.')
}

export {
    updateMessageMain,
    replyMessageOther,
    startBot
}