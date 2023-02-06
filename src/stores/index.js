import { createPinia } from 'pinia'
const pinia = createPinia()


import { onRegister } from './plugins/onRegister'
pinia.use(onRegister)

export default pinia