import { createPinia } from 'pinia'
const pinia = createPinia()


import { onRegister } from './plugins/onRegister'
import exportImportState from './plugins/exportImportState'

pinia.use(onRegister)
pinia.use(exportImportState)


export default pinia