const getRandom = (from, to) => Math.floor(from + Math.random() * (to - from + 1))
const getRandomItem = (arr) => arr[getRandom(0, arr.length - 1) ]

const setOfSubsets = (arr) =>
  arr.reduce((sets, item) => sets.concat(sets.map(set => [...set, item]) ), [[]])

const arrShuffled = (arr) => {
  let res = [...arr]
  res.forEach( (item, ind) => {
    const ind2 = getRandom(0, res.length - 1)
    ;([res[ind], res[ind2]] = [res[ind2], res[ind]])
  })
  return res
}
const strShuffled = (str, sep=' ') => arrShuffled(str.split(sep)).join(' ')
const shuffled = (arg) => Array.isArray(arg) ? arrShuffled(arg) : strShuffled(arg)
const shuffledSet = (set) => new Set(arrShuffled([...set]) )
  



export {
  getRandom,
  getRandomItem,
  setOfSubsets,

  shuffled,
  shuffledSet,
}