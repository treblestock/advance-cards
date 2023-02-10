import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import useStorage from '@/composables/useStorage.js'

import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  parseDateHandler,
} from '@/assets/helpers'

const SET_ANSWERS_STATS_DIR_PATH = './setsRevisions'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


// import setList from './_SETS.json'


const INITIAL_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON().split('T')[0] // format: "2022-09-12"
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
    if (cachedSetRevisions) {
      sets.value[setName] = cachedSetRevisions
      return 
    }


    // by network
    const setRevisionsPath = getCardSetPath(setName)
    const setRevisions = (await import(setRevisionsPath) ).default
    for (const question in setRevisions) {
      const revisionCardData = setRevisions[question]
      revisionCardData.dateStart = new Date(revisionCardData.dateStart)
    }
    sets.value[setName] = setRevisions
    saveSetRevisionsCache(setName, setRevisions)
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