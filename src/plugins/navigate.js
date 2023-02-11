import { modifyRouteTo } from '@/router/helpers'
function getNavigate(router) {
  return function Navigate(routeData) {
    const to = modifyRouteTo(routeData)
    router.push(to)
  }
}
export default (app, options) => {
  const router = options.router
  if (!router) throw new Error('Router wasn\'t passed or undefined in plugins/navigate.js')
  const navigate = getNavigate(router)
  app.config.globalProperties.$navigate = navigate
  app.provide('navigate', navigate)
}