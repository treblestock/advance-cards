import { createApp, ref, computed, watch } from 'vue'
import App from './App.vue'
const app = createApp(App)


import comPonentsLib from './plugins/componentsLib'
// import directivesLib from './plugins/directivesLib'

app.use(comPonentsLib)
// app.use(directivesLib)



import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)




app.mount('#app')
