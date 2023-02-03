import { createApp, ref, computed, watch } from 'vue'
import App from './App.vue'
const app = createApp(App)


import comPonentsLib from './plugins/componentsLib'
app.use(comPonentsLib)
// import directivesLib from './plugins/directivesLib'
// app.use(directivesLib)
import helpers from './plugins/helpers'
app.use(helpers)




import router from '@/router'
app.use(router)

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)




app.mount('#app')