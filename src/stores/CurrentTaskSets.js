import { defineStore } from "pinia"

import { shuffled, shouldRevise, shuffledSet } from "@/assets/helpers"


import { useStoreSets } from '@/stores/Sets.js'
import { useStoreSetsStats } from '@/stores/SetsStats.js'


export const useStoreCurrentTaskSets = defineStore('storeCurrentTaskSets', {
  state: () => ({
    currentTaskSetName: null,
    currentTaskResaults: {},
  }),
  getters: {
    setQuestionsToRevise: null, 
      // := computed(Stats) => setQs.import
      // imp-1) setQs.qs.filter(isShould(Stats[q]) ) |
      // imp-2) Stats.reduce.(isShould(qStats) ? acc.push(setQs[q]) : null, ([]) )
  },
  actions: {
    answerQuestion(answerResault) {}, 
      // mutate Stats (:=provide data) -> Stats changed -> getter "toRevise" recalc
      // if answer() && !toRevies.length  => onFinish()
    onFinish() {}, 
      // showReport() || setNe(w|xt)Task
      // when there isn't any question and should show report
  },
})

