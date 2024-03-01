import * as GAME from '../game/game.js'
import * as LENGTHEMOJI from '../utilities/lengthEmoji.js'

async function length(msg, bot) {
  const chatId = msg.chat.id
  const word = msg.text.toLowerCase()

  if (word.length !== GAME.guessing.word.length) {
    await bot.sendMessage(
      chatId,
      `So'z ${LENGTHEMOJI.lengthWithEmoji(
        GAME.guessing.word.length
      )} uzunlikda bo'lishi kerak.`
    )
    return true
  }
  return false
}

function word(guessed) {
  const { word } = GAME.guessing
  let won = true
  const res = []
  const correctI = []

  for (let i = 0; i < word.length; i++) {
    const guessedLower = guessed[i].toLowerCase()

    if (guessedLower === word[i].toLowerCase()) {
      res.push('✅')
      correctI.push(i)
      continue
    }
    if (won) won = false

    if (!correctI.includes(i) && word.includes(guessedLower)) {
      res.push('🟨')
      continue
    }

    res.push('🚫')
  }

  return { msg: getMsg(guessed, res), won }
}

function getMsg(word, res) {
  let msg = ''
  const upperWord = word.toUpperCase()

  for (let i = 0; i < word.length; i++) {
    msg += `${upperWord[i]} ${res[i]}\n`
  }

  return msg
}

export { word, length }
