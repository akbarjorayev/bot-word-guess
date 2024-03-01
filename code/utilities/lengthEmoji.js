import * as EMOJI from '../emoji/emoji.js'

function lengthWithEmoji(num) {
  const digits = String(num).split('')
  const emojis = digits.map((d) => EMOJI.numbers[d - 1]).join('')

  return emojis
}

export { lengthWithEmoji }
