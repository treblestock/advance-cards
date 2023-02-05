import { defineStore } from "pinia"
import {ref, computed, onMounted} from 'vue'


import { 
  isShouldRevisedQuestion,
  isLoadingKnowledgeFinished,
} from '@/assets/helpers'

const SET_ANSWERS_STATS_DIR_PATH = './setsAnswersStats'
const getCardSetPath = (setName) => SET_ANSWERS_STATS_DIR_PATH + '/' + setName + '.json'


import setList from './setsAnswersStats/index.json'
 
const DEFAULT_ANSWER_STATS = {
  n: -1,
  dateStart: new Date().toJSON().split('T')[0] // format: "2022-09-12"
}








// =============

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
    const answerStats = sets.value[setName][question]
    if (!answerStats) return sets.value[setName][question] = DEFAULT_ANSWER_STATS
    if (!isLoadingKnowledgeFinished(answerStats.dateStart) ) return
    console.log('updated')
    if (isShouldRevisedQuestion(answerStats) ) return sets.value[setName][question].n++
  }

  return {
    setsNames,
    sets,
    loadSetAnswersStats,

    updateAnswerStats,
  }
})