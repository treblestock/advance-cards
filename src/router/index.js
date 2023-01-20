import { createRouter, createWebHistory } from 'vue-router'


function propsParser(route) {
  return Object.entries(route.params).reduce((props, [key, value]) => {
    // required to ignore params auto fitted by router,
    // which were not provided by developer passing params: {}
    return value  ? (props[key] = JSON.parse(value), props) : props 
  }
  , {})
}


const routes = [
  {
    path: '/', alias: '',
    name: 'home',
    redirect: {
      name: 'cardSets',
    },
    props: true,
    // component: home,
    children: [
      {
        path: 'cardSets/:cardSetName',
        name: 'cardSet',
        props: propsParser,
        component: () => import('@/pages/cardSet.vue'),
        children: [
          
        ],
      },
      {
        path: 'cardSets',
        name: 'cardSets',
        props: propsParser,
        component: () => import('@/pages/cardSets.vue'),
        children: [
          
        ],
      },
      {
        path: 'stats/:cardSetName',
        name: 'statsCardSet',
        props: propsParser,
        component: () => import('@/pages/statsCardSet.vue'),
        children: [
          
        ],
      },
      {
        path: 'stats',
        name: 'stats',
        props: propsParser,
        component: () => import('@/pages/stats.vue'),
        children: [
          
        ],
      },
    ],
  },
]


const router = createRouter({
  routes,
  history: createWebHistory(),
})


export default router