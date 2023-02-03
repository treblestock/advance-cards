import { defineStore } from "pinia"
import { computed, watch } from "vue"

import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsAnswersStats } from '@/stores/setsAnswersStats.js'
// const sets = useStoreSets()
// const setAnswersStats = useStoreSetsAnswersStats()

// helpers
function isShouldRevisedQuestion(answerStats) {
  
}


export const useStoreTask = defineStore('storeTask', {
  state: () => ({
    // toRevise f(set, answerStats(set) ) => set.slice()
    // createTask 
    // sliceToRevise
    // currentQuestionData f(toRevise) => toRevise.slice()
    // stats onAnswer = f() => mut(stats, answerData) => stats
    // _iterateTask
    // answerQuestion -> mutate(task.stats) + _iterateTask

    setName: null,

    toRevise: new Set(),
    currentQuestionData: {
      question: null,
      answer: null,
    },
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
          if (!setData.value || !setAnswersStats.value) return 
          for (const question in setData.value) {
            const answer = setData.value[question]
            if (isShouldRevisedQuestion()) {
              this.toRevise.add( {
                question,
                answer,
              } )
            }
          }
          console.log(this.toRevise.size)
        },
      )
    }, 
    
    // flow
    answerQuestion(answerResault) {
      // mutate(this.stats)
      // mutate(this.toRevise)
      // this.iterateTask()
    },
    onFinish() {
      // mutate(stats.prevTask)
      // redirect('/reportPage')
    },
  },
})