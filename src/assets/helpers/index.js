const getRandom = (from, to) => Math.floor(from + Math.random() * (to - from + 1))
const getRandomItem = (arr) => arr[getRandom(0, arr.length - 1) ]

const setOfSubsets = (arr) =>
  arr.reduce((sets, item) => sets.concat(sets.map(set => [...set, item]) ), [[]])

// replacements
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


// Strings
const doesIncludeWords = (str, substr) => {
  str = str.toLowerCase()
  substr = substr.toLowerCase()
  const substrWords = substr.split(' ').filter(item => item != ' ' && item != '')
  const regexCond = substrWords.reduce((reg, word) => reg += `(${word}.*)` , '.*')
  const r = new RegExp(regexCond)

  return r.exec(str)
}


// date
const monthMap = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'Novemmbar', 'December',
]
const timeInMs = {
  second: 1000,
  minute: 1000 * 60,
  hour:   1000 * 60 * 60,
  date:   1000 * 60 * 60 * 24,
  month:  1000 * 60 * 60 * 24 * 30,
  year:   1000 * 60 * 60 * 24 * 365,
}


function separateDate(date) {
  return {
    date: date.getDate(),
    month: monthMap[date.getMonth()],
    year: date.getFullYear(),
  }
}

// JSON-dateParser
const r = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const isDate = str => r.exec(str)

const parseDateHandler = (key, value) => 
  isDate(value) ? new Date(value) : value

// toJSDate 
const toJSDate = (dateObj) =>
  new Date(dateObj.year, monthMap.indexOf(dateObj.month), dateObj.date )
  

// duration
const getDuration = (dateA, dateB, period = 'month') => {
  dateA = typeof dateA === 'date' ? dateA : toJSDate(dateA)
  dateB = typeof dateB === 'date' ? dateB : toJSDate(dateB)
  const time = Math.abs(dateB - dateA)
  return time / timeInMs[period]
}
  
// revise logic
function isLoadingKnowledgeFinished(dateStart) {
  return new Date(Date.now() - dateStart).getDate() > 3 // actually "4"
}
function getNextReviseDate({n, dateStart}) {
  return dateStart.getDate() + 2 ** n
}
function isShouldRevisedQuestion({dateStart, n}) {
  if (!arguments || !isLoadingKnowledgeFinished(dateStart)) return true 
    // case, when there wasn't answer before: !arguments
  return getNextReviseDate({n, dateStart}) < new Date().getDate()
}

// export {default as parseFunction} from './parseFunction'

export { toHumanCase } from './str.js'

export
{
  getRandom,
  getRandomItem,
  setOfSubsets,

  shuffled,
  shuffledSet,
  // strings
  doesIncludeWords,

  // date
  parseDateHandler,
  toJSDate,
  getDuration,


  // revise logic
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  isShouldRevisedQuestion,
}