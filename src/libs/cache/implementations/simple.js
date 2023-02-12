const impl = {
  set(itemName, itemValue) {
    localStorage.setItem(itemName, JSON.stringify(itemValue))
    return true
  },
  get(itemName, reviver) {
    return JSON.parse(localStorage.getItem(itemName), reviver )
  },
  has(itemName) {
    return !!localStorage.getItem(itemName)
  },
  delete(itemName) {
    localStorage.removeItem(itemName)
    return true
  },
}
export default impl