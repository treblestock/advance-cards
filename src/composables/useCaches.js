function useCaches(itemName, value) {
  function _get(itemName) {
    return JSON.parse(localStorage.getItem(itemName) )
  }
  function _set(itemName, value) {
    return localStorage.setItem(itemName, JSON.stringify(value) )
  }
  return value ? _set(itemName, value) : _get(itemName)
}
export default useCaches