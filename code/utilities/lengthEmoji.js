import * as EMOJI from '../emoji/emoji.js'

function lengthWithEmoji(num) {
  const digits = `${num}`.split('')
  const emojis = digits.map((d) => EMOJI.numbers[d]).join('')

  return emojis
}

export { lengthWithEmoji }
