import { defineStore } from "pinia"
import {ref, computed} from 'vue'


const CARD_SETS_DIR_PATH = './cardSets'
const getCardSetPath = (setName) => CARD_SETS_DIR_PATH + '/' + setName + '.json'


import setList from './setList.json'


export const useStoreSets = defineStore('storeSets', () => {
  const setsNames = ref(setList)
  const sets = ref({})

  var loadSet = async (setName) => {
    const setPath = getCardSetPath(setName)
    const setData = (await import(setPath) ).default
    sets.value[setName] = setData
  }


  return {
    setsNames,
    sets,
    loadSet,
  }
})