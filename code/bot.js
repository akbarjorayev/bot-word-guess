import TelegramBot from 'node-telegram-bot-api'
import API from './api/api.js'
import words from './wordList/words.js'
import * as CHECKER from './word/check.js'
import * as RANDOM from './utilities/getRandom.js'
import * as LENGTHEMOJI from './utilities/lengthEmoji.js'
import * as GAME from './game/game.js'

const bot = new TelegramBot(API.tgBot, { polling: true })

bot.setMyCommands([
  {
    command: '/new_word',
    description: `Yangi so'z topish`,
  },
])

bot.onText(/\/new_word/, async (msg) => {
  const chatId = msg.chat.id
  GAME.guessing.word = RANDOM.object(words)
  GAME.guessing.tries = GAME.guessing.word.length + 2

  await bot.sendMessage(chatId, `O'yin boshlandi`)
  await bot.sendMessage(
    chatId,
    `So'zning uzunligi: ${LENGTHEMOJI.lengthWithEmoji(
      GAME.guessing.word.length
    )}`
  )
  await bot.sendMessage(
    chatId,
    `Urinishlar: ${LENGTHEMOJI.lengthWithEmoji(GAME.guessing.tries)}`
  )
})

bot.on('message', async (msg) => {
  const chatId = msg.chat.id

  if (msg.text === '/new_word') return
  if (!GAME.guessing.word)
    return bot.sendMessage(chatId, `O'yinni boshlash uchun /new_word ni bosing`)

  if (await CHECKER.length(msg, bot)) return

  const checkedWord = CHECKER.word(msg.text, bot)
  await bot.sendMessage(chatId, checkedWord.msg)
  if (checkedWord.won) return GAME.won(chatId, bot)

  GAME.guessing.tries--

  if (GAME.guessing.tries)
    await bot.sendMessage(
      chatId,
      `Qolgan urinishlar: ${LENGTHEMOJI.lengthWithEmoji(GAME.guessing.tries)}`
    )

  if (!GAME.guessing.tries) GAME.lose(chatId, bot)
})
