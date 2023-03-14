export default {
  mounted(el, binding) {
    if (binding.value) {
      console.log('added...')
      el.classList.add(binding.arg)
    }
  }
}