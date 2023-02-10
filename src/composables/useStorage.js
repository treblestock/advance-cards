import { watch } from "vue"
function useStorage(itemName, value) {
  function _get(itemName) {
    return JSON.parse(localStorage.getItem(itemName) )
  }
  function _set(itemName, value) {
    return localStorage.setItem(itemName, JSON.stringify(value) )
  }
  function _delete(itemName, value) {
    return localStorage.removeItem(itemName)
  }
  return value 
    ? _set(itemName, value) 
    : value === null 
      ? _delete(itemName)
      : _get(itemName)
}
export default useStorage



function setAutoCaching(storageKey, dep) {
  watch(
    dep,
    newValue => useStorage(storageKey, newValue),
    { deep: true }
  )
}


