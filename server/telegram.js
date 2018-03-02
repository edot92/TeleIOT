process.env['NTBA_FIX_319'] = 1 // https://github.com/yagop/node-telegram-bot-api/issues/484
const TelegramBot = require('node-telegram-bot-api')
const token =
  process.env.BOT_TOKEN || '472777709:AAEJaaYdGAyzHY5pukKcdwIwNKOpBlu-Jic'
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp)
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', msg => {
  const chatId = msg.chat.id
  console.log(msg)
  if (msg.text === 'myid') {
    bot.sendMessage(chatId, chatId)
  } else {
    bot.sendMessage(chatId, 'Invalid Command')
  }
  // send a message to the chat acknowledging receipt of their message
})
// bot.sendMessage('+6282111583799', 'Received your message')
// bot.sendMessage(347915626, '222222222')

// try {
//   bot.sendMessage('+6283876989317', 'lllllll')
// } catch (error) {
//   console.log(error)
// }
