export const onRegister = ({pinia, app, store, options}) => {
  if (store.onRegister) return store.onRegister()
  if (options.onRegister) return options.onRegister.call(store, store)
}