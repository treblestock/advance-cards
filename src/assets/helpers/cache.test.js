import { cache } from '@/assets/helpers'

const TEST_PREFIX = '_test_'

const r = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const r2 = /\d{4}-\d{2}-\d{2}/

const reviver = (key, value) => {
  return value.match(r)
    ? new Date(value)
    : value
}

// cache[TEST_PREFIX] = 'value'
// cache[TEST_PREFIX] = null
console.log((TEST_PREFIX in cache))
// // cache[TEST_PREFIX] = '2023-12-04'
// cache[TEST_PREFIX] = JSON.stringify(new Date() )

console.log(cache[TEST_PREFIX])