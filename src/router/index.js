import { createRouter, createWebHistory } from 'vue-router'



import layoutDefault from '@/layouts/default.vue'

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
    props: true,
    component: layoutDefault,
    children: [
      {
        path: 'sets',
        name: 'sets',
        props: propsParser,
        component: () => import('@/pages/sets.vue'),
        children: [
          
        ],
      },
      {
        path: 'sets/:setName',
        name: 'set',
        props: propsParser,
        component: () => import('@/pages/set.vue'),
        children: [
          
        ],
      },
      {
        path: 'task-view-single-card/:setName',
        name: 'taskViewSingleCard',
        props: propsParser,
        component: () => import('@/pages/taskViewSingleCard.vue'),
        children: [
          
        ],
      },
      {
        path: 'task-view-cards-list/:setName',
        name: 'taskViewCardsList',
        props: propsParser,
        component: () => import('@/pages/taskViewCardsList.vue'),
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
      {
        path: 'settings',
        name: 'settings',
        props: propsParser,
        component: () => import('@/pages/settings.vue'),
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