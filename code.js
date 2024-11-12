const TelegramApi = require('node-telegram-bot-api');
const { callbackify } = require('util');

const token = '8171740039:AAG8tzdeGCuOgIlMOaYho0VK6MSX38v8-s0'
const bot = new TelegramApi(token,
  {polling: true})

  const chats = {};
  const startGame = async (chatId) => {
    await bot.sendMessage(chatId, ' Я загадал цифру от 0 до 9, попробуй ее угадать!')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)

  }

  const gameOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '1', callback_data: '1' }],    [{ text: '4', callback_data: '4' }], [{ text: '7', callback_data: '7' }],
        [{ text: '2', callback_data: '2' }],    [{ text: '5', callback_data: '5' }], [{ text: '8', callback_data: '8' }],
        [{ text: '3', callback_data: '3' }],    [{ text: '6', callback_data: '6' }],  [{ text: '9', callback_data: '9' }],
                                                [{ text: '0', callback_data: '0' }],
       
      
       
      ]
    })
  };

  const againOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
   [{ text: 'играть еще раз', callback_data: '/again' }],
       
      
       
      ]
    })
  };

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
  {command: '/info', description: 'Информация о пользователе' },
  {command: '/game', description: 'игра угадай цифру'}
  ]);
bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;
 if (text === '/start'){
await bot.sendSticker(chatId,'https://sl.combot.org/piraty_karibskogo_morya_c0460_by_tgemodzibot/webp/2xf09fa4a9.webp')
return bot.sendMessage(chatId,`добро пожаловать`)
 }
 if (text === '/info'){
 return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
 }
 if (text === '/game') {
  return startGame (chatId);
 
 }
 return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
} )
bot.on('callback_query', async msg => {
  const data = msg.data 
  const chatId = msg.message.chat.id
  if (data === '/again'){
    return startGame (chatId);

  }
  if (data === chats[chatId].toString()) {
    await bot.sendMessage(chatId, `Поздравляю! Ты угадал цифру: ${chats[chatId]}`, againOptions);
  } else {
    await bot.sendMessage(chatId, `К сожалению, ты не угадал. Бот загадал цифру ${chats[chatId]}. Попробуй еще раз!`, againOptions);
  }
 
    bot.answerCallbackQuery(msg.id)
})

}
start()