import { defineStore } from "pinia"
import { watch } from "vue"





// function getLeaves(obj) {
//   const props = Object.keys(obj)
//   props.forEach()
// }





export const useStoreAutoCacher = defineStore('autoCacher', {
  state: () => ({
    task: {
      currentCard: true
    },
  }),
  getters: {
  },
  actions: {
    handle(storeId) {
      const iId = setInterval( () => {
        const store = this.$pinia._s.get(storeId)
        const isSetedup = !!store
        if (!isSetedup) return
        
        // this._watchImpl(store)
        this._subscribeImpl(store)
        clearInterval(iId)
      }, 1000)
    },
    onRegister() {
      // for (const storeId in this.$state) {
      //   this.handle(storeId)
      // }
    },


    // watch implementation
    _watchImpl(store) {
      function toWatchGetters(that, store) {
        return Object.keys(that[store.$id])
        .map(storeProp => () => store[storeProp])
      }
      function watchHandler(newValue, oldValue) {
        console.log({newValue})
        console.log({oldValue})
      }
      
      watch(
        toWatchGetters(this, store),
        watchHandler
      )
    },
    // subscribe implementation
    // requires mutations strictly through store.$patch(object)
    _subscribeImpl(store) {
      var subscribeHandler = (mutation, state) => {
        console.log({state})
        console.log({mutation})
        console.log({payload: mutation.payload})
        if (!mutation.payload) return

        const targetProp = Object.keys(mutation.payload)[0]
        if (!(this[store.$id][targetProp]) ) return
        const newVal = mutation.payload[targetProp]
        console.log(`catched a change in [${store.$id + '.' + targetProp}]
        with new value: [${JSON.stringify(newVal)}]`)
      }

      store.$subscribe(subscribeHandler)
    },
  },
})