import { defineStore } from "pinia"

import useCaches from '@/composables/useCaches.js'

export const useStoreStats = defineStore('stats', {
  state: () => ({
    /*
      todo: 
        - update global
        - update today
        - define computed props
        - define onAnswer updates (global, today)
    */ 

    // typeof global === typeof today === typeof prevTask
    // onAnswer: () => {mut(global), mut(today) }
    // task.onFinish: () => stats.prevTask = task.stats, task.stats = null
    global: {
      setsAnswered: useCaches('stats.global.' + 'setsAnswered'),
      questionsAnswered: useCaches('stats.global.' + 'questionsAnswered'),
      questionsAnsweredSuccessfully: useCaches('stats.global.' + 'questionsAnsweredSuccessfully'),
      accurance: useCaches('stats.global.' + 'accurance'),
      time: useCaches('stats.global.' + 'time'),
      timePerQuestionsAnsweredSuccessfully: useCaches('stats.global.' + 'timePerQuestionsAnsweredSuccessfully'),
    },
    today: {
      setsAnswered: null,
      questionsAnswered: null,
      questionsAnsweredSuccessfully: null,
      accurance: null,
      time: null,
      timePerQuestionsAnsweredSuccessfully: null,
    },
    prevTask: {

    },
  }),
  getters: {
    
  },
  actions: {
    onAnswer(answerResault) {

    },
    _loadTodayStats() {
      const lastSaveDate = new Date(useCaches('stats.today') || 0)
      const isCachedStatsActual = lastSaveDate.getDate() === new Date().getDate()
      if (!isCachedStatsActual) {
        for (const statName in this.today) {
          useCaches('stats.today.' + statName, 0)
        }
        useCaches('stats.today', new Date())
      } else {
        for (const statName in this.today) {
          this.today[statName] = useCaches('stats.today.' + statName)
        }
      }
    },
    _updateTodayStats() {
      this.setsAnswered = 12
      this.questionsAnswered = 12
      this.questionsAnsweredSuccessfully = 12
      this.accurance = 12
      this.time = 12
      this.timePerQuestionsAnsweredSuccessfully = 12
    },
    onRegister() {
      this._loadTodayStats()
      this._updateTodayStats()
    }
  },
})