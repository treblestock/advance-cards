import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import useCaches from '@/composables/useCaches.js'

const CARD_SETS_DIR_PATH = './setsCards'
const getCardSetPath = (setName) => CARD_SETS_DIR_PATH + '/' + setName + '.json'


import setList from './setsCards/index.json'


export const useStoreSets = defineStore('storeSets', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})
  
  // cache
  function saveSetCache(setName, value) {
    useCaches('sets.' + setName, value)
  }
  
  async function loadSet(setName) {
    // by cache
    const cachedSet = useCaches('sets.' + setName)
    if (cachedSet) {
      sets.value[setName] = cachedSet
      return 
    }

    // byNetwork
    const setPath = getCardSetPath(setName)
    const setData = (await import(setPath) ).default
    const set = Array.isArray(setData) 
      ? setData.reduce((acc, question) => (acc[question] = null, acc), {})
      : setData
    sets.value[setName] = set
    saveSetCache(setName, set)
  }


  var getSetCardsLength = (setData) => {
    const set = typeof setData === 'string' ? sets.value[setData] : setData
    return Object.keys(set).length 
  }


  // all
  const allSetCardsLength = computed(() => {
    return Object.values(sets.value).reduce((acc, set) => {
      return acc += getSetCardsLength(set)
    }, 0)
  })

    
  function onRegister() {
    setsNames.value.forEach(setName => loadSet(setName))    
  }

  return {
    setsNames,
    sets,
    loadSet,
    getSetCardsLength,
    allSetCardsLength,

    onRegister,
  }
})