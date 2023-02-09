import { defineStore } from "pinia"
import {ref, computed } from 'vue'

import useCaches from '@/composables/useCaches.js'

import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  parseDateHandler,
} from '@/assets/helpers'

const SET_ANSWERS_STATS_DIR_PATH = './setsRevisions'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


import setList from './_SETS.json'
 
const INITIAL_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON().split('T')[0] // format: "2022-09-12"
}








// =============

export const useStoreSetsRevisions = defineStore('setsRevisions', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})


  // cache
  function saveSetRevisionsCache(setName, value) {
    useCaches('sets.revisions.' + setName, value)
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
      const answerStats = setRevisions[question]
      answerStats.dateStart = new Date(answerStats.dateStart)
    }
    sets.value[setName] = setRevisions
    saveSetRevisionsCache(setName, setRevisions)
  }
  function onRegister() {
    setsNames.value.forEach(setName => loadSetRevisions(setName))
  }

  // update stats
  function updateAnswerStats (setName, question) {
    const answerStats = sets.value[setName][question]
    if (!answerStats) {
      sets.value[setName][question] = INITIAL_ANSWER_STATS
      saveSetRevisionsCache(setName, sets.value[setName])
    }
    if (!isLoadingKnowledgeFinished(answerStats.dateStart) ) return
    if (getNextReviseDate(answerStats) < Date.now() ) {
      sets.value[setName][question].n++
      saveSetRevisionsCache(setName, sets.value[setName])
    }
  }

  return {
    setsNames,
    sets,
    loadSetRevisions,

    updateAnswerStats,

    onRegister,
  }
})