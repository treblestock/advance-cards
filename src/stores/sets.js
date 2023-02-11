import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import useStorage from '@/composables/useStorage.js'


// const _useStoreSets = defineStore('sets', () => {
export const useStoreSets = defineStore('sets', () => {
  // all the card sets
  const setsList = ref(useStorage('setsList') || [])
  const sets = ref({})
  function saveSetCache(setName, cards) {
    useStorage('sets.cards.' + setName, cards)
  }
  
  async function loadSet(setName) {
    const cachedSet = useStorage('sets.cards.' + setName)
    if (cachedSet) sets.value[setName] = cachedSet
  }

  function getSetCardsLength(setData) {
    const set = typeof setData === 'string' ? sets.value[setData] : setData
    return Object.keys(set).length 
  }


  // all
  const allSetCardsLength = computed(() => {
    return Object.values(sets.value).reduce((acc, set) => {
      return acc += getSetCardsLength(set)
    }, 0)
  })



  // curd
  function createSet(setName, cards) {
    if (sets.value[setName]) throw new Error('Set with name ' + setName + ' already exists')
    sets.value[setName] = cards
    saveSetCache(setName, cards)

    setsList.value.push(setName)
    useStorage('setsList', setsList.value)
  }
  function getSet(setName) {
    return sets.value[setName]
  }
  function updateSet(setName, newSetName, cards) {
    if (!sets.value[setName]) throw new Error('there is no set with name ' + setName)
    sets.value[setName] = cards
    saveSetCache(setName, cards)
  }
  function deleteSet(setName) {
    delete sets.value[setName]
    useStorage('sets.cards.' + setName, null)
    setsList.value = setsList.value.filter(name => name !== setName)
    useStorage('setsList', setsList.value)
  }

  // up-download
  function exportSet(setName) {
    const json = JSON.stringify(sets.value[setName])
    return json
  }
  function importSet(setName, data) {
    const cards = typeof data === "string" ? JSON.parse(data) : data
    sets.value[setName] = cards
    if (!setsList.value.includes(setName) ) {
      setsList.value.push(setName)
      useStorage('setsList', setsList.value)
    }
    saveSetCache(setName, cards)
  }


    
  function onRegister() {
    setsList.value.forEach(setName => loadSet(setName))    
  }

  return {
    setsList,
    sets,
    loadSet,
    getSetCardsLength,
    allSetCardsLength,

    // crud
    createSet,
    getSet,
    updateSet,
    deleteSet,
    // up-download
    exportSet,
    importSet,

    // lyfecycle hook
    onRegister,
  }
})

// const useStoreSets = () => {
//   console.log('before')
//   const store = _useStoreSets()
//   console.log('after')
//   return store
// }
// export {useStoreSets,}