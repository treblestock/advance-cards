import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import { cache } from '@/assets/helpers'

import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  parseDateHandler,
} from '@/assets/helpers'



const INITIAL_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON() // format: "2022-09-12"
}







// =============

export const useStoreSetsRevisions = defineStore('setsRevisions', () => {
  // all the card sets
  const setsList = ref(cache['setsList'] || [])
  const sets = ref({})

  // cache
  function saveSetRevisionsCache(setName, value) {
    cache['setRevisions' + setName] = value
  }
  
  async function loadSetRevisions(setName) {
    const cachedSetRevisions = JSON.parse(localStorage.getItem('setRevisions' + setName), parseDateHandler)
    if (cachedSetRevisions) {
      sets.value[setName] = cachedSetRevisions
      return
    }

    const setCards = setsCards.sets[setName]
    sets.value[setName] = createInitialStats(setCards)
    saveSetRevisionsCache(setName, sets.value[setName])
  }
  function onRegister() {
    setsList.value.forEach(setName => loadSetRevisions(setName))
  }

  // update stats
  function createInitialStats(setName, setCards) {
    function _createInitialStats(setCards) {
      const stats = {}
      for (const question in setCards) {
        if (!setCards.hasOwnProperty(question) ) continue
        stats[question] = {...INITIAL_ANSWER_STATS}
      }
      return stats
    }
    const initialRevisions = _createInitialStats(setCards)
    sets.value[setName] = initialRevisions
    saveSetRevisionsCache(setName, initialRevisions)
  }
  function updateRevisions(setName, setCards) {
    // creation
    const updatedRevisions = {}
    const currentRevisions = sets.value[setName]
    for (const question in setCards) {
      updatedRevisions[question] = question in currentRevisions
        ? currentRevisions[question]
        : {...INITIAL_ANSWER_STATS}
    }

    // update
    sets.value[setName] = updatedRevisions
    cache['setRevisions' + setName] = updatedRevisions
  }
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
  function deleteRevisions(setName) {
    delete sets.value[setName]
    cache['setRevisions' + setName] = null
  }


  return {
    setsList,
    sets,
    loadSetRevisions,

    createInitialStats,
    updateRevisions,
    updateRevisionCardData,
    deleteRevisions,

    onRegister,
  }
})