import { defineStore } from "pinia"


const setNameToPath = (setName) => './Set' + setName[0].toUpperCase() + setName.slice(1) + 'Raws' + '.js'






export const useStoreSets = defineStore('storeSets', {
  state: () => ({
    sets: {},
  }),
  getters: {
    
  },
  actions: {
    _setSet(setName, setData) {
      this.sets[setName] = setData
    },
    async loadSetByNetwork(setName) {
      const r = await import(setNameToPath(setName) )
      this._setSet(setName, r.default)
    },
    loadSetByCache(setName) {
      const SetRawData = localStorage.getItem('sets.' + setName)
      this._setSet(setName, JSON.parse(SetRawData) )
    },
    saveSetCache(setName) {
      localStorage.setItem('sets.' + setName, JSON.stringify(this.sets[setName]) )
    },
    clearSetsCache() {
      localStorage.removeItem('sets.')
    },


    
  },
})