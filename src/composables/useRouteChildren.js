import { useRouter } from "vue-router"
export default function(routeName, childRouteProp) {
  const router = useRouter()
  const routes = router.getRoutes()
  routeName ||= router.currentRoute.value.name
  const route = routes.find(item => item.name === routeName)
  
  if (!childRouteProp) return route.children // full option case
  return route.children.map(option => option[childRouteProp])
}