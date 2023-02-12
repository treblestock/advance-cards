import { createRouter, createWebHistory } from 'vue-router'


function propsParser(route) {
  return Object.entries(route.params).reduce((props, [key, value]) => 
    // required to ignore params auto fitted by router,
    // which were not provided by developer passing params: {}
    value  ? (props[key] = JSON.parse(value), props) : props 
  , {})
}


const routes = [
  {
    path: import.meta.env.BASE_URL,
    name: 'home',
    props: true,
    component: () => import('@/layouts/default.vue'),
    redirect: { name: 'sets' },
    children: [
      {
        path: 'sets',
        name: 'sets',
        props: propsParser,
        component: () => import('@/pages/sets.vue'),
        redirect: {name: 'newSet' },
        children: [
          {
            path: 'newSet',
            name: 'newSet',
            props: propsParser,
            component: () => import('@/pages/newSet.vue'),
            redirect: { name: 'newSetUploadForm' },
            children: [
              {
                path: 'manual/:setName?',
                name: 'newSetManualForm',
                props: propsParser,
                component: () => import('@/pages/newSetManualForm.vue'),
                children: [
                  
                ],
              },
              {
                path: 'upload',
                name: 'newSetUploadForm',
                props: propsParser,
                component: () => import('@/pages/newSetUploadForm.vue'),
                children: [
                  
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'sets/:setName',
        name: 'set',
        props: propsParser,
        component: () => import('@/pages/set.vue'),
        redirect: to => ({
            name: 'taskViewSingleCard',
            params: { setName: to.params.setName },
        }),
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