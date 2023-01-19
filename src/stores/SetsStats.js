import { defineStore } from "pinia"


const setNameToPath = (setName) => './Set' + setName[0].toUpperCase() + setName.slice(1) + 'Stats' + '.js'

function reviver(key, value) {
  if (key === 'dateStart') return new Date(value)
  return value
}


export const useStoreSetsStats = defineStore('storeSetsStats', {
  state: () => ({
    sets: {}
  }),
  getters: {
    
  },
  actions: {
    // ini
    _setSetStats(setName, setData) {
      this.sets[setName] = setData
    },
    async loadSetStatsByNetwork(setName) {
      const r = await import(setNameToPath(setName) )
      this._setSetStats(setName, r.default)
    },
    loadSetStatsByCache(setName) {
      const rawSetData = localStorage.getItem('stats.sets.' + setName)
      this._setSetStats(setName, JSON.parse(rawSetData, reviver))
    },
    saveSetStatsCache(setName) {
      localStorage.setItem('stats.sets.' + setName, JSON.stringify(this.sets[setName]) )
    },
    clearSetStatsCache() {
      localStorage.removeItem('stats.sets.')
    },

    // flow
    reciveAnswer(setName, question, res) {
      this.sets[setName][question].n++
      console.log('updated value: ' + this.sets[setName][question].n)
    },




  },
})