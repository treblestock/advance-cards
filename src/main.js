import { createApp, ref, computed, watch, markRaw } from 'vue'
import App from './App.vue'
const app = createApp(App)


import useAppProvider from './plugins/useAppProvider'
app.use(useAppProvider)
import comPonentsLib from './plugins/componentsLib'
app.use(comPonentsLib)
import helpers from './plugins/helpers'
app.use(helpers)


import router from '@/router'
app.use(router)

import navigate from './plugins/navigate'
app.use(navigate, {
  router,
})

import pinia from '@/stores'
// this plugin is used here, because both
// router and pinia are defined.
// Therefore, router doesn't have to be defined before pinia
// and still is able to use pinia at the time

// Otherwise, a circular dependensy appears
// (pinia using router -> router defined before pinia)
// (router using pinia -> pinia defined before router)
// This is imposible with js modules
// Such an approach gives you less restrictions further
pinia.use( ({store}) => {
  store.$router = markRaw(router)
  store.$pinia = markRaw(pinia)
})


app.use(pinia)




app.mount('#app')
