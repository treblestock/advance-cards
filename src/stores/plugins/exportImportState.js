import download from '@/composables/useDownload'

// pinia.store
function importStoreState(state, reviver) {
  this.$patch(typeof state === 'string' ? JSON.parse(state, reviver) : state)
}
function toJSON() {
  return JSON.stringify(this.$state)
}
function exportStoreState() {
  return download('pinia_' + this.$id, this.toJSON() )
}

// pinia
function importPiniaState() {
  this._s.forEach(store => store.importState() )
}
function exportPiniaState() {
  this._s.forEach(store => store.exportState() )
}




export default function exportImportStoreState({app, pinia, store, options}) {
  store.toJSON = toJSON
  store.exportState = exportStoreState
  store.importState = importStoreState


  pinia.$exportState = exportPiniaState
  pinia.$importState = importPiniaState
  
  // test
  // if (store.$id === 'stats') __test_doesReplaceCorrect(store)
  // if (store.$id === 'stats') __test_downLoad(store)


  // if (store.$id === 'stats') store.exportState()
}




// tests