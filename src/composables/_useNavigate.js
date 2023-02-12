import { inject } from "vue"
export default function useNavigate(arg) {
  const navigate = inject('$navigate')
  console.log(navigate)
  return navigate(arg)
}