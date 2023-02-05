import { defineStore } from "pinia"
import {ref, computed, onMounted} from 'vue'


import { isShouldRevisedQuestion } from '@/assets/helpers'

const SET_ANSWERS_STATS_DIR_PATH = './setsAnswersStats'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


import setList from './setsAnswersStats/index.json'


export const useStoreSetsAnswersStats = defineStore('storeSetsAnswersStats', () => {
  // all the card sets
  const setsNames = ref(setList)
  const sets = ref({})
  
  
  async function loadSetAnswersStats(setName) {
    const setAnswersStatsPath = getCardSetPath(setName)
    const setAnswersStats = (await import(setAnswersStatsPath) ).default
    for (const question in setAnswersStats) {
      const answerStats = setAnswersStats[question]
      answerStats.dateStart = new Date(answerStats.dateStart)
    }
    sets.value[setName] = setAnswersStats
  }
  onMounted(() => {
    loadSetAnswersStats('nlc')
  })

  // update stats
  function updateAnswerStats (setName, question) {
    if (isShouldRevisedQuestion(sets.value[question]) ) {
      console.log('updated')
      sets.value[setName][question].n++
    }
  }

  return {
    setsNames,
    sets,
    loadSetAnswersStats,

    updateAnswerStats,
  }
})