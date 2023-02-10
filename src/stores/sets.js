import { defineStore, setMapStoreSuffix } from "pinia"
import {ref, computed } from 'vue'

import useStorage from '@/composables/useStorage.js'
import useDownload from '@/composables/useDownload.js'

const CARD_SETS_DIR_PATH = './setsCards'
const getCardSetPath = (setName) => CARD_SETS_DIR_PATH + '/' + setName + '.json'


const IS_ALLOWED_FS_IMPORT_JSON_DATA = false
// import _setsList from './_SETS.json'


export const useStoreSets = defineStore('sets', () => {
  // all the card sets
  // const setsList = ref(_setsList)
  const setsList = ref(useStorage('setsList') || [])
  
  const sets = ref({})
  
  function saveSetCache(setName, cards) {
    useStorage('sets.cards.' + setName, cards)
  }
  
  async function loadSet(setName) {
    // by cache
    const cachedSet = useStorage('sets.cards.' + setName)
    if (cachedSet) {
      sets.value[setName] = cachedSet
      return
    }
    // byNetwork

    if (!IS_ALLOWED_FS_IMPORT_JSON_DATA) return 
    _loadDataFromFS(setName)
  }

  async function _loadDataFromFS(setName) {
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
  function deleteSet(setName) {
    delete sets.value[setName]
    setsList.value = setsList.value.filter(name => name !== setName)
    useStorage('sets.cards.' + setName, null)
    useStorage('setsList', setsList.value)
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

    // up-download
    exportSet,
    importSet,
    deleteSet,

    onRegister,
  }
})