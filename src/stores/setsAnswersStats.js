import { defineStore } from "pinia"
import {ref, computed, onMounted} from 'vue'

import useCaches from '@/composables/useCaches.js'

import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  parseDateHandler,
} from '@/assets/helpers'

const SET_ANSWERS_STATS_DIR_PATH = './setsAnswersStats'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


import setList from './setsAnswersStats/index.json'
import { onRegister } from "./plugins/onRegister"
 
const DEFAULT_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON().split('T')[0] // format: "2022-09-12"
}








// =============

export const useStoreSetsAnswersStats = defineStore('storeSetsAnswersStats', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})


  // cache
  function saveSetAnswersStatsCache(setName, value) {
    useCaches('sets.answersStats.' + setName, value)
  }
  
  async function loadSetAnswersStats(setName) {
    // by cache
    const cachedSetAnswersStats = JSON.parse(localStorage.getItem('sets.answersStats.' + setName), parseDateHandler)
    if (cachedSetAnswersStats) {
      sets.value[setName] = cachedSetAnswersStats
      return 
    }


    // by network
    const setAnswersStatsPath = getCardSetPath(setName)
    const setAnswersStats = (await import(setAnswersStatsPath) ).default
    for (const question in setAnswersStats) {
      const answerStats = setAnswersStats[question]
      answerStats.dateStart = new Date(answerStats.dateStart)
    }
    sets.value[setName] = setAnswersStats
    saveSetAnswersStatsCache(setName, setAnswersStats)
  }
  function onRegister() {
    setsNames.value.forEach(setName => loadSetAnswersStats(setName))
  }

  // update stats
  function updateAnswerStats (setName, question) {
    const answerStats = sets.value[setName][question]
    if (!answerStats) {
      sets.value[setName][question] = DEFAULT_ANSWER_STATS
      saveSetAnswersStatsCache(setName, sets.value[setName])
    }
    if (!isLoadingKnowledgeFinished(answerStats.dateStart) ) return
    if (getNextReviseDate(answerStats) < Date.now() ) {
      sets.value[setName][question].n++
      saveSetAnswersStatsCache(setName, sets.value[setName])
    }
  }

  return {
    setsNames,
    sets,
    loadSetAnswersStats,

    updateAnswerStats,

    onRegister,
  }
})