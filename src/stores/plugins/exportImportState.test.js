export function __test_doesReplaceCorrect(store) {
  store.$subscribe((mutation, state) => {
    console.log({mutation, state})
    
    console.log(
      JSON.stringify(mutation.payload) ===
      JSON.stringify(state)
      )
    })

    const before = JSON.stringify(store.$state)
    const exportedState = store.exportState()  
    const after = JSON.stringify(store.$state)
    
    store.importState(exportedState)
  }
  
export function __test_downLoad(store) {
  store.exportState()
}

export function __test_piniaExport() {

}
