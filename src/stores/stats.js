import { defineStore } from "pinia"

import useStorage from '@/composables/useStorage.js'

export const useStoreStats = defineStore('stats', {
  state: () => ({
    total: {
      setsCount: null,
      revisedSetsCount: null,
      cardsCount: null,
      revisedCardsCount: null,

      accurance: null,
      time: null,
      timePerCard: null,
      timePerSet: null,
    },
    today: {
      setsCount: null,
      revisedSetsCount: null,
      cardsCount: null,
      revisedCardsCount: null,

      accurance: null,
      time: null,
      timePerCard: null,
      timePerSet: null,
    },
    // set: {
    //   cardsCount: null,
    //   revisedCardsCount: null,
    //   revisedSetCount: null,

    //   accurance: null,
    //   time: null,
    //   timePerCard: null,

    //   totalRevisionsCount: null,
    //   loadingRevisionsCount: null,
    //   afterLoadingRevisionsCount: null,
    //   timePerRevision: null,

    //   creationDate: null,
    //   revisionCycleNumber: null,
    //   prevRevision: null,
    //   nextRevision: null,
    // },
    prevTask: {

    },


    sets: {

    },
  }),
  getters: {
    
  },
  actions: {
    onAnswer(revisionAnswer) {
      
    },
    _loadTodayStats() {
      const lastSaveDate = new Date(useStorage('stats.today') || 0)
      const isCachedStatsActual = lastSaveDate.getDate() === new Date().getDate()
      if (!isCachedStatsActual) {
        for (const statName in this.today) {
          useStorage('stats.today.' + statName, 0)
        }
        useStorage('stats.today', new Date())
      } else {
        for (const statName in this.today) {
          this.today[statName] = useStorage('stats.today.' + statName)
        }
      }
    },

    loadSetStats() {

    },
    onRegister() {
      
    }
  },
})