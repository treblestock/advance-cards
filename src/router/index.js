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
    redirect: 'sets',
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
        path: 'taskReport',
        name: 'taskReport',
        props: propsParser,
        component: () => import('@/pages/taskReport.vue'),
        children: [
          
        ],
      },
      {
        path: 'stats',
        name: 'stats',
        redirect: {
          name: 'statsTotal',
        },
        props: propsParser,
        component: () => import('@/pages/stats.vue'),
        children: [
          {
            path: 'total',
            name: 'statsTotal',
            props: propsParser,
            component: () => import('@/pages/statsTotal.vue'),
            children: [
              
            ],
          },
          {
            path: 'today',
            name: 'statsToday',
            props: propsParser,
            component: () => import('@/pages/statsToday.vue'),
            children: [
              
            ],
          },
          {
            path: 'prevTask',
            name: 'statsPrevTask',
            props: propsParser,
            component: () => import('@/pages/statsPrevTask.vue'),
            children: [
              
            ],
          },          
        ],
      },
      {
        path: 'settings',
        name: 'settings',
        props: propsParser,
        component: () => import('@/pages/settings.vue'),
        children: [
          {
            path: 'setsUpDownload',
            name: 'settingsSetsUpDownload',
            props: propsParser,
            component: () => import('@/pages/settingsSetsUpDownload.vue'),
            children: [
              
            ],
          },
          {
            path: 'pinia',
            name: 'settingsPinia',
            props: propsParser,
            component: () => import('@/pages/settingsPinia.vue'),
            children: [
              
            ],
          },
          {
            path: 'appConfig',
            name: 'settingsAppConfig',
            props: propsParser,
            component: () => import('@/pages/settingsAppConfig.vue'),
            children: [
              
            ],
          },
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