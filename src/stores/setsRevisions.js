import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import useStorage from '@/composables/useStorage.js'

import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  parseDateHandler,
} from '@/assets/helpers'


import { useStoreSets } from '@/stores/sets.js'
const setsStore = useStoreSets()


const INITIAL_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON() // format: "2022-09-12"
}

function createInitialStats(setCards) {
  const stats = {}
  for (const question in setCards) {
    if (!setCards.hasOwnProperty(question) ) continue
    stats[question] = {...INITIAL_ANSWER_STATS}
  }
  console.log(stats)
  return stats
}






// =============

export const useStoreSetsRevisions = defineStore('setsRevisions', () => {
  // all the card sets
  const setsList = ref(useStorage('setsList') || [])
  const sets = ref({})

  // cache
  function saveSetRevisionsCache(setName, value) {
    useStorage('sets.revisions.' + setName, value)
  }
  
  async function loadSetRevisions(setName) {
    // by cache
    const cachedSetRevisions = JSON.parse(localStorage.getItem('sets.revisions.' + setName), parseDateHandler)
    // console.log(cachedSetRevisions)
    if (cachedSetRevisions) {
      sets.value[setName] = cachedSetRevisions
      return
    }

    const setCards = setsStore.sets[setName]
    sets.value[setName] = createInitialStats(setCards)
    saveSetRevisionsCache(setName, sets.value[setName])
  }
  function onRegister() {
    setsList.value.forEach(setName => loadSetRevisions(setName))
  }

  // update stats
  function updateRevisionCardData ({setName, question, isCorrect}) {
    if (!isCorrect) return
    const revisionCardData = sets.value[setName][question]
    if (!revisionCardData) {
      sets.value[setName][question] = INITIAL_ANSWER_STATS
      saveSetRevisionsCache(setName, sets.value[setName])
    }
    if (!isLoadingKnowledgeFinished(revisionCardData.dateStart) ) return
    if (getNextReviseDate(revisionCardData) < Date.now() ) {
      sets.value[setName][question].n++
      saveSetRevisionsCache(setName, sets.value[setName])
    }
  }

  return {
    setsList,
    sets,
    loadSetRevisions,

    updateRevisionCardData,

    onRegister,
  }
})