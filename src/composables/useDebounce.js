export default function(f, delay) {
  let isCooldown = false
  return (...args) => {
    if (isCooldown) return

    isCooldown = true
    setTimeout( () => isCooldown = false, delay)
    return f(...args)
  }
}