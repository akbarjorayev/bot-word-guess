function number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function array(arr) {
  const i = number(0, arr.length - 1)
  return arr[i]
}

function object(obj) {
  const keys = Object.keys(obj)
  const k = array(keys)

  return { res: array(obj[k]), from: k }
}

export { number, array, object }
