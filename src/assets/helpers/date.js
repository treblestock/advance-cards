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
const r = /([0-9]{4})-([0-9]{2})-([0-9]{2})/ // (1)
const r2 = /("|^)\d{4}-\d{2}-\d{2}/ // (2)
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

var toTimeInSec = time => (time / 1000).toFixed(1) + ' sec'


export {
  parseDateHandler,
  toJSDate,
  getDuration,

  toTimeInSec,
}