const guessing = { word: '', tries: 0, description: '' }

function over() {
  guessing.word = ''
  guessing.tries = 0
}

async function won(chatId, bot) {
  over()
  await bot.sendMessage(chatId, `Siz yutdingiz 🎉`)
  await bot.sendMessage(
    chatId,
    `Yangi o'yinni boshlash uchun /new_word ni bosing`
  )
}

async function lose(chatId, bot) {
  const { word } = guessing
  over()
  await bot.sendMessage(chatId, `Siz yutqazdingiz`)
  await bot.sendMessage(chatId, `So'z **${word}** edi`, {
    parse_mode: 'Markdown',
  })
  await bot.sendMessage(
    chatId,
    `Yangi o'yinni boshlash uchun /new_word ni bosing`
  )
}

export { over, won, lose, guessing }
