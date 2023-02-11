const impl = {
  set(itemName, itemValue) {
    return localStorage.setItem(itemName, JSON.stringify(itemValue))
  },
  get(itemName) {
    return JSON.parse(localStorage.getItem(itemName) )
  },
  has(itemName) {
    return !!localStorage.getItem(itemName)
  },
  delete(itemName) {
    localStorage.removeItem(itemName)
  },
}
export default impl