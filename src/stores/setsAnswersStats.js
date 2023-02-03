import { defineStore } from "pinia"
import {ref, computed, onMounted} from 'vue'


const SET_ANSWERS_STATS_DIR_PATH = './setsAnswersStats'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


import setList from './setsAnswersStats/index.json'


export const useStoreSetsAnswersStats = defineStore('storeSetsAnswersStats', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})
  
  
  var loadSetAnswersStats = async (setName) => {
    const setPath = getCardSetPath(setName)
    const setData = (await import(setPath) ).default
    const set = Array.isArray(setData) 
      ? setData.reduce((acc, question) => (acc[question] = null, acc), {})
      : setData
    sets.value[setName] = set
  }

    
  onMounted(() => {
    loadSetAnswersStats('nlc')
    loadSetAnswersStats('words')
  })

  return {
    setsNames,
    sets,
    loadSetAnswersStats,

  }
})