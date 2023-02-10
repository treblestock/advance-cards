import { defineStore } from "pinia"
import { computed, watch } from "vue"


import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'
import { useStoreStats } from '@/stores/stats.js'

// helpers
import { shuffledSet, isShouldRevisedQuestion } from '@/assets/helpers'


import useGlobalProp from '@/composables/useGlobalProp.js'

function* _createTaskIterator(toRevise) {
  while(toRevise.size) {
    for (const questionData of toRevise) {
      yield questionData
    }
  }
}

let _taskIterator

export const useStoreTask = defineStore('task', {
  state: () => ({
    // task
    setName: null,
    toRevise: new Set(),
    cardsCount: null,
    timeStart: null,
    timeFinish: null,
    currentCard: {
      question: null,
      answer: null,
    },
    
    // stats
    stats: new Set(),
      // stats implementations:
      // set is better than arr, because cards shows is undefined initially
      // 1) set.push(revisionAnswer) - just collect the full data and 
      //    the report will know how to format
      //    if you want extract data as array use:
      //    
      //      const arr = []
      //      set.forEach(item => mut(arr, item) )
      //      return arr
      // 2) {}, but object collects data refered to question, not revision
      //    That is why with such case you have to know formatting of stats
      //    during task iteration, not report display.
      //    You'll have to make complex structure:
      //    task.stats.question = {
      //      success: Number,
      //      fail: Number,
      //      date: Date // what should be date? the first answer, the last?
      //    }
  }),
  getters: {
    
  },
  actions: {
    reset() {
      this.timeFinish = null,
      this.timeStart = null,
      this.cardsCount = null,
      this.currentCard.answer = null,
      this.currentCard.question = null,
      this.toRevise.clear()
      this.stats.clear()
    },
    // initialization
    createTask() {
      const setData = computed(() => useStoreSets().sets[this.setName])
      const setRevisionStats = computed(() => useStoreSetsRevisions().sets[this.setName])
      watch(
        [setData, setRevisionStats],
        () => {
          if (!setData.value || !setRevisionStats.value) return // make logic, when loaded data 

          for (const question in setData.value) {
            const answer = setData.value[question]
            if (isShouldRevisedQuestion(setRevisionStats.value[question])) {
              this.toRevise.add({
                question,
                answer,
              })
            }
          }
          this.toRevise = shuffledSet(this.toRevise)
          // task
          _taskIterator = _createTaskIterator(this.toRevise)
          this.cardsCount = this.toRevise.size
          this.timeStart = Date.now()
          this.currentCard = _taskIterator.next().value
        },
        {immediate: true,}
      )
    }, 

    // stats
    _updateTaskStats(revisionAnswer) {
      this.stats.add(revisionAnswer)
    },
    
    // flow
    _updateTask(revisionAnswer) {
      if (revisionAnswer.isCorrect) this.toRevise.delete(this.currentCard)
      this.currentCard = _taskIterator.next().value
      // this.$patch({currentCard: _taskIterator.next().value}) // pinia.autoCacher
      if (!this.currentCard) this.onFinish()
    },

    onAnswer(revisionAnswer) {
      // stats
      this._updateTaskStats(revisionAnswer)
      const stats = useStoreStats()
      stats.onAnswer(revisionAnswer)
      // revisions
      useStoreSetsRevisions().updateRevisionCardData(revisionAnswer)
      // task flow
      this._updateTask(revisionAnswer)
    },

    // end
    onFinish() {
      // mutate(stats.prevTask)
      this.timeFinish = Date.now()
      this.$router.push({name: 'taskReport'})
    },
  },
})