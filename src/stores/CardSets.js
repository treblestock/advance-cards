import { defineStore } from "pinia"
import {ref, computed, onMounted} from 'vue'


const CARD_SETS_DIR_PATH = './cardSets'
const getCardSetPath = (setName) => CARD_SETS_DIR_PATH + '/' + setName + '.json'


import setList from './setList.json'


export const useStoreCardSets = defineStore('storeCardSets', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})
  
  
  var loadSet = async (setName) => {
    const setPath = getCardSetPath(setName)
    const setData = (await import(setPath) ).default
    sets.value[setName] = setData
  }
  
  // current task
  const currentCardSetName = ref(null)
  const currentCardSetQuestions = computed(() => {
    return sets.value[currentCardSetName.value]
  })
    
  onMounted(() => {
    loadSet('nlc')
  })

  return {
    setsNames,
    sets,
    loadSet,

    currentCardSetName,
    currentCardSetQuestions,
  }
})