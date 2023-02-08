import { useRouter } from "vue-router"
export default function(routeName) {
  const router = useRouter()
  const routes = router.getRoutes()
  routeName ||= router.currentRoute.value.name
  const route = routes.find(item => item.name === routeName)
  return route.children
}