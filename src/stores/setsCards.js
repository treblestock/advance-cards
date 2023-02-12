import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import { cache } from '@/assets/helpers'

import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'

export const useStoreSetsCards = defineStore('setsCards', () => {
  // all the card setsCards
  const setsList = ref(cache.setsList || [])
  const sets = ref({})
  function saveSetCache(setName, cards) {
    cache['setCards' + setName] = cards
  }
  
  async function loadSet(setName) {
    const cachedSet = cache['setCards' + setName]
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
    cache.setsList = setsList.value

    const revisions = useStoreSetsRevisions()
    revisions.createInitialStats(setName, cards)
  }
  function getSet(setName) {
    return sets.value[setName]
  }
  function updateSet(setName, cards) {
    if (!sets.value[setName]) throw new Error('there is no set with name ' + setName)
    sets.value[setName] = cards
    cache['setCards' + setName] = cards
    
    const revisions = useStoreSetsRevisions()
    revisions.updateRevisions(setName, cards)
  }
  function deleteSet(setName) {
    delete sets.value[setName]
    cache['setCards' + setName] = null
    setsList.value = setsList.value.filter(name => name !== setName)
    cache.setsList = setsList.value

    const revisions = useStoreSetsRevisions()
    revisions.deleteRevisions(setName)
  }

  // up-download
  function exportSet(setName) {
    const json = JSON.stringify(sets.value[setName])
    return json
  }
  function importSet(setName, data) {
    const cards = typeof data === "string" ? JSON.parse(data) : data
    !setsList.value.includes(setName) 
      ? createSet(setName, cards)
      : updateSet(setName, cards)
  }
  // function importSet(setName, data) {
  //   const cards = typeof data === "string" ? JSON.parse(data) : data
  //   sets.value[setName] = cards
  //   if (!setsList.value.includes(setName) ) {
  //     setsList.value.push(setName)
  //     cache.setsList = setsList.value
  //   }
  //   saveSetCache(setName, cards)
  // }


    
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