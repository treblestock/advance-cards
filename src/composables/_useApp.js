import { getCurrentInstance } from "vue"
export default function() {
  return getCurrentInstance().appContext.app
}