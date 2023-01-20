import { computed, ref, watch } from "vue"

export const setShuffled = (obj) => {
  const copy = Object.entries(obj)

  copy.forEach((_, ind) => {
    const randomInd = ~~(Math.random() * copy.length)
    ;[copy[ind], copy[randomInd]] = [copy[randomInd], copy[ind]]
  })
  return copy
}