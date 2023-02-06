import { defineStore } from "pinia"
import { computed, watch } from "vue"

import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsAnswersStats } from '@/stores/setsAnswersStats.js'

// helpers
import { shuffledSet, isShouldRevisedQuestion } from '@/assets/helpers'

function* _createTaskIterator(toRevise) {
  while(toRevise.size) {
    for (const questionData of toRevise) {
      yield questionData
    }
  }
}

let _taskIterator

export const useStoreTask = defineStore('storeTask', {
  state: () => ({
    setName: null,

    toRevise: new Set(),
    currentQuestionData: {
      question: null,
      answer: null,
    },

    stats: {},
  }),
  getters: {
    
  },
  actions: {
    // initialization
    createTask() {
      const setData = computed(() => useStoreSets().sets[this.setName])
      const setAnswersStats = computed(() => useStoreSetsAnswersStats().sets[this.setName])
      watch(
        [setData, setAnswersStats],
        () => {
          if (!setData.value || !setAnswersStats.value) return // make logic, when loaded data 

          this.toRevise.clear()
          for (const question in setData.value) {
            const answer = setData.value[question]
            if (isShouldRevisedQuestion(setAnswersStats.value[question])) {
              this.toRevise.add({
                question,
                answer,
              })
            }
          }
          this.toRevise = shuffledSet(this.toRevise)
          _taskIterator = _createTaskIterator(this.toRevise)
          this._iterateTask()
        },
        {
          immediate: true,
        }
      )
    }, 
    
    // flow
    _iterateTask() {
      this.currentQuestionData = _taskIterator.next().value
    },
    answerQuestion(answerResault) {
      if (!answerResault) { // iterate to answer later
        this._iterateTask()
        return
      }
      
      // stats
      this.stats[this.currentQuestionData.question] = true
      useStoreSetsAnswersStats().updateAnswerStats(this.setName, this.currentQuestionData.question)
      
      // iterate
      this.toRevise.delete(this.currentQuestionData)
      this._iterateTask()
    },
    onFinish() {
      // mutate(stats.prevTask)
      // redirect('/reportPage')
    },
  },
})